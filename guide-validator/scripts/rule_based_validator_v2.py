"""
Enhanced Rule-based validator for documentation guides.
This module reads validation rules from prompt files and applies them dynamically.
"""

import re
import os
import yaml
from pathlib import Path
from typing import Dict, List, Tuple, Any, Optional

class RuleBasedValidatorV2:
    """
    Enhanced rule-based validator that reads validation rules from prompt files.
    This makes the system more maintainable and allows easy addition of new validators.
    """

    def __init__(self, prompts_dir: str = None):
        """
        Initialize the validator with the prompts directory.
        """
        if prompts_dir is None:
            # Auto-detect prompts directory
            current_dir = os.path.dirname(os.path.abspath(__file__))
            if current_dir.endswith('scripts'):
                self.prompts_dir = os.path.join(os.path.dirname(current_dir), 'prompts')
            else:
                self.prompts_dir = 'prompts'
        else:
            self.prompts_dir = prompts_dir

        self.rules = {}
        self._load_rules()

    def _load_rules(self):
        """
        Load validation rules from all prompt files.
        """
        validator_files = [
            'overview-section-validator-prompt.md',
            'prerequisites-section-validator-prompt.md',
            'steps-section-validator-prompt.md',
            'troubleshooting-section-validator-prompt.md',
            'callout-section-validator-prompt.md'
        ]

        for file_name in validator_files:
            file_path = os.path.join(self.prompts_dir, file_name)
            if os.path.exists(file_path):
                rules = self._extract_rules_from_file(file_path)
                if rules:
                    # Extract the validator name from filename
                    validator_name = file_name.replace('-section-validator-prompt.md', '').replace('-', '_')
                    self.rules[validator_name] = rules
                    print(f"Loaded rules for {validator_name}")

    def _extract_rules_from_file(self, file_path: str) -> Optional[Dict[str, Any]]:
        """
        Extract YAML rules from a prompt file.
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Find the YAML section between ```yaml and ```
            yaml_match = re.search(r'```yaml\n(.*?)\n```', content, re.DOTALL)
            if yaml_match:
                yaml_content = yaml_match.group(1)
                return yaml.safe_load(yaml_content)
        except Exception as e:
            print(f"Error loading rules from {file_path}: {e}")

        return None

    def validate_overview(self, content: str) -> Dict[str, Any]:
        """
        Validate the overview section using loaded rules.
        """
        result = {
            'section': 'Overview',
            'status': 'PASS',
            'issues': [],
            'warnings': []
        }

        if 'overview' not in self.rules:
            result['status'] = 'FAIL'
            result['issues'].append('Overview validation rules not found')
            return result

        rules = self.rules['overview']

        # Check if required
        if not rules.get('required', True):
            return result

        # Find content between H1 and first H2
        h1_match = re.search(r'^# (.+)$', content, re.MULTILINE)
        h2_match = re.search(r'^## (.+)$', content, re.MULTILINE)

        if not h1_match:
            result['status'] = 'FAIL'
            result['issues'].append('No H1 title found')
            return result

        if not h2_match:
            result['status'] = 'FAIL'
            result['issues'].append('No H2 sections found')
            return result

        # Extract overview content
        h1_end = h1_match.end()
        h2_start = h2_match.start()
        overview_content = content[h1_end:h2_start].strip()

        if not overview_content:
            result['status'] = 'FAIL'
            result['issues'].append('No overview content found between H1 and first H2')
            return result

        # Check if starts with required text
        start_with = rules.get('start_with')
        if start_with and not overview_content.startswith(start_with):
            result['status'] = 'FAIL'
            result['issues'].append(f'Overview must start with "{start_with}"')

        # Check for second person usage
        if rules.get('use_second_person', False) and 'you' not in overview_content.lower():
            result['warnings'].append('Overview should use second person ("you"/"your")')

        # Check for hyperlinks
        if rules.get('require_hyperlink', False) and not re.search(r'\[.*?\]\(.*?\)', overview_content):
            result['warnings'].append('Overview should contain at least one hyperlink')

        return result

    def validate_prerequisites(self, content: str) -> Dict[str, Any]:
        """
        Validate the prerequisites section using loaded rules.
        """
        result = {
            'section': 'Prerequisites',
            'status': 'PASS',
            'issues': [],
            'warnings': []
        }

        if 'prerequisites' not in self.rules:
            result['status'] = 'FAIL'
            result['issues'].append('Prerequisites validation rules not found')
            return result

        rules = self.rules['prerequisites']

        # Check if required
        if not rules.get('required', True):
            return result

        # Check for prerequisites section
        header = rules.get('header', '## Prerequisites')
        prereq_match = re.search(rf'^{re.escape(header)}\s*\n(.*?)(?=^## |\Z)', content, re.MULTILINE | re.DOTALL)

        if not prereq_match:
            result['status'] = 'FAIL'
            result['issues'].append(f'No {header} section found')
            return result

        prereq_content = prereq_match.group(1).strip()

        # Check format
        if rules.get('format') == 'bulleted_list':
            if not re.search(r'^\s*[-*]\s+', prereq_content, re.MULTILINE):
                result['warnings'].append('Prerequisites should be in bulleted list format')

        # Check second person usage
        if rules.get('use_second_person', False):
            if 'you' not in prereq_content.lower() and 'your' not in prereq_content.lower():
                result['warnings'].append('Prerequisites should use second person where appropriate')

        return result

    def validate_steps(self, content: str) -> Dict[str, Any]:
        """
        Validate the steps section using loaded rules.
        """
        result = {
            'section': 'Steps',
            'status': 'PASS',
            'issues': [],
            'warnings': []
        }

        if 'steps' not in self.rules:
            result['status'] = 'FAIL'
            result['issues'].append('Steps validation rules not found')
            return result

        rules = self.rules['steps']

        # Check if required
        if not rules.get('required', True):
            return result

        # Find all step headers
        step_matches = re.findall(r'^## Step (\d+): (.+)$', content, re.MULTILINE)

        if not step_matches:
            result['status'] = 'FAIL'
            result['issues'].append('No step sections found (## Step n: ...)')
            return result

        step_numbers = [int(match[0]) for match in step_matches]

        # Check sequential numbering
        if rules.get('sequential_numbering', True):
            expected_numbers = list(range(1, len(step_numbers) + 1))
            if step_numbers != expected_numbers:
                result['status'] = 'FAIL'
                result['issues'].append(f'Step numbers are not sequential: found {step_numbers}, expected {expected_numbers}')

        # Check for duplicates
        if rules.get('no_duplicates', True):
            if len(step_numbers) != len(set(step_numbers)):
                result['status'] = 'FAIL'
                result['issues'].append('Duplicate step numbers found')

        # Check step header format
        if rules.get('starts_with_verb', True):
            for step_num, step_title in step_matches:
                if not step_title[0].isupper():
                    result['warnings'].append(f'Step {step_num} title should start with uppercase letter')

        # Check for Review section
        review_header = rules.get('review_header', '## Review')
        review_match = re.search(rf'^## (Step )?Review\s*$', content, re.MULTILINE)
        if review_match and 'Step ' in review_match.group(0):
            result['status'] = 'FAIL'
            result['issues'].append(f'Review section should be titled exactly "{review_header}", not "## Step Review"')

        return result

    def validate_troubleshooting(self, content: str) -> Dict[str, Any]:
        """
        Validate the troubleshooting section using loaded rules.
        """
        result = {
            'section': 'Troubleshooting',
            'status': 'PASS',
            'issues': [],
            'warnings': []
        }

        if 'troubleshooting' not in self.rules:
            result['status'] = 'FAIL'
            result['issues'].append('Troubleshooting validation rules not found')
            return result

        rules = self.rules['troubleshooting']

        # Check if required
        if not rules.get('required', True):
            return result

        # Check for troubleshooting section
        header = rules.get('header', '## Troubleshooting')
        troubleshooting_match = re.search(rf'^{re.escape(header)}\s*\n(.*?)(?=^## |\Z)', content, re.MULTILINE | re.DOTALL)

        if not troubleshooting_match:
            result['status'] = 'FAIL'
            result['issues'].append(f'No {header} section found')
            return result

        troubleshooting_content = troubleshooting_match.group(1).strip()

        # Check format
        if rules.get('format') == 'markdown_table':
            if not re.search(r'^\|.*\|', troubleshooting_content, re.MULTILINE):
                result['warnings'].append('Troubleshooting section should be in markdown table format')

        # Check for required content in last row
        last_row_mentions = rules.get('last_row_mentions')
        if last_row_mentions:
            table_rows = re.findall(r'^\|.*\|', troubleshooting_content, re.MULTILINE)
            if table_rows:
                last_row = table_rows[-1].lower()
                if last_row_mentions.lower() not in last_row:
                    result['status'] = 'FAIL'
                    result['issues'].append(f'Last row of troubleshooting table must mention "{last_row_mentions}"')

        return result

    def validate_callouts(self, content: str) -> Dict[str, Any]:
        """
        Validate callout formatting using loaded rules.
        """
        result = {
            'section': 'Callouts',
            'status': 'PASS',
            'issues': [],
            'warnings': []
        }

        if 'callout' not in self.rules:
            result['status'] = 'FAIL'
            result['issues'].append('Callouts validation rules not found')
            return result

        rules = self.rules['callout']

        # Check if required
        if not rules.get('required', False):
            return result

        # Find all callouts
        callout_pattern = r'^> \[!(\w+)\]\s*\n> (.+?)(?=\n(?!>)|$)'
        callouts = re.findall(callout_pattern, content, re.MULTILINE | re.DOTALL)

        if not callouts:
            # No callouts found, which is okay if not required
            return result

        allowed_types = rules.get('allowed_types', ['NOTE', 'CAUTION', 'IMPORTANT', 'TIP', 'WARNING'])
        case_sensitive = rules.get('case_sensitive', False)

        for callout_type, callout_content in callouts:
            # Check if callout type is allowed
            if case_sensitive:
                if callout_type not in allowed_types:
                    result['warnings'].append(f'Unknown callout type: {callout_type}')
            else:
                if callout_type.upper() not in [t.upper() for t in allowed_types]:
                    result['warnings'].append(f'Unknown callout type: {callout_type}')

            # Check if callout content is not empty
            if not callout_content.strip():
                result['status'] = 'FAIL'
                result['issues'].append(f'Empty callout content for {callout_type}')

        # Check for old-style callouts
        if rules.get('detect_old_format', True):
            old_formats = rules.get('old_formats', ['**Note:**', ':warning:', '**Caution:**', '**Important:**', '**Tip:**'])
            for old_format in old_formats:
                if re.search(rf'^{re.escape(old_format)}', content, re.MULTILINE):
                    result['status'] = 'FAIL'
                    result['issues'].append(f'Found old-style callout: {old_format}. Use > [!TYPE] format instead.')

        return result

    def validate_all(self, content: str) -> Dict[str, Any]:
        """
        Run all validations and return combined results.
        """
        validators = [
            self.validate_overview,
            self.validate_prerequisites,
            self.validate_steps,
            self.validate_troubleshooting,
            self.validate_callouts
        ]

        results = {}
        overall_status = 'PASS'

        for validator in validators:
            result = validator(content)
            results[result['section']] = result

            if result['status'] == 'FAIL':
                overall_status = 'FAIL'

        return {
            'overall_status': overall_status,
            'sections': results
        }

    def format_results(self, results: Dict[str, Any]) -> str:
        """
        Format validation results for display.
        """
        output = []
        output.append(f"# Validation Results - Overall: {results['overall_status']}\n")

        for section_name, section_result in results['sections'].items():
            status_icon = "✅" if section_result['status'] == 'PASS' else "❌"
            output.append(f"## {status_icon} {section_name} Section [{section_result['status']}]")

            if section_result['issues']:
                output.append("\n**Issues:**")
                for issue in section_result['issues']:
                    output.append(f"- ❌ {issue}")

            if section_result['warnings']:
                output.append("\n**Warnings:**")
                for warning in section_result['warnings']:
                    output.append(f"- ⚠️ {warning}")

            output.append("")

        return "\n".join(output)
