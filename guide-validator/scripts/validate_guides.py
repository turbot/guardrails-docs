#!/usr/bin/env python3
"""
Guide Format Validator

This script validates markdown guide files against documentation style guide rules.
It supports both LLM-based validation (using Anthropic Claude) and rule-based validation as fallback.

Usage:
    python validate_guides.py <guide_markdown_file> [--use-llm] [--config <config_file>]

Environment Variables:
    ANTHROPIC_API_KEY: Required for LLM validation
    USE_LLM: Set to 'true' to enable LLM validation (default: false)
    VALIDATOR_CONFIG: Path to configuration file (optional)
"""

import sys
import os
import argparse
import yaml
from pathlib import Path
from typing import Dict, Any, Optional

# Import our rule-based validator
from rule_based_validator_v2 import RuleBasedValidatorV2 as RuleBasedValidator

# Try to import Anthropic for LLM validation
try:
    import anthropic
    ANTHROPIC_AVAILABLE = True
except ImportError:
    ANTHROPIC_AVAILABLE = False

class GuideValidator:
    """
    Main validator class that coordinates between rule-based and LLM validation.
    """

    def __init__(self, config_path: Optional[str] = None, prompts_dir: Optional[str] = None):
        """
        Initialize the validator with optional configuration.
        """
        self.config = self._load_config(config_path)
        self.rule_validator = RuleBasedValidator(prompts_dir)
        self.llm_client = None

        # Initialize LLM client if available and enabled
        if self.config.get('llm', {}).get('enabled', False) and ANTHROPIC_AVAILABLE:
            api_key = os.environ.get('ANTHROPIC_API_KEY')
            if api_key:
                self.llm_client = anthropic.Anthropic(api_key=api_key)
            else:
                print("ℹ️  Note: LLM validation requested but no API key found. Using rule-based validation (recommended).")

    def _load_config(self, config_path: Optional[str]) -> Dict[str, Any]:
        """
        Load configuration from file or use defaults.
        """
        default_config = {
            'validators': {
                'overview': True,
                'prerequisites': True,
                'steps': True,
                'troubleshooting': True,
                'callout': True
            },
            'llm': {
                'enabled': os.environ.get('USE_LLM', 'false').lower() == 'true',
                'provider': 'anthropic',
                'model': 'claude-3-opus-20240229',
                'max_tokens': 2048,
                'temperature': 0
            },
            'output': {
                'format': 'markdown',
                'show_warnings': True,
                'show_issues': True
            }
        }

        if config_path and os.path.exists(config_path):
            try:
                with open(config_path, 'r') as f:
                    user_config = yaml.safe_load(f)
                    # Merge with defaults
                    for key, value in user_config.items():
                        if isinstance(value, dict) and key in default_config:
                            default_config[key].update(value)
                        else:
                            default_config[key] = value
            except Exception as e:
                print(f"Warning: Could not load config file {config_path}: {e}")

        return default_config

    def _read_file(self, file_path: str) -> str:
        """
        Read file content with proper encoding handling.
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            raise Exception(f"Could not read file {file_path}: {e}")

    def _is_llm_error(self, result: str) -> bool:
        """
        Check if the LLM validation result contains an error that should stop further validations.
        """
        if not result or not isinstance(result, str):
            return False

        # Check for common API errors that would affect all subsequent calls
        error_indicators = [
            "[LLM Error:",
            "credit balance is too low",
            "rate limit exceeded",
            "authentication failed",
            "invalid API key",
            "quota exceeded",
            "service unavailable"
        ]

        result_lower = result.lower()
        return any(indicator.lower() in result_lower for indicator in error_indicators)

    def _run_llm_validation(self, content: str, validator_name: str) -> str:
        """
        Run LLM-based validation for a specific validator.
        """
        if not self.llm_client:
            return "[LLM validation not available]"

        # Load the validator prompt
        prompt_file = f"prompts/{validator_name.lower().replace(' ', '_')}-section-validator-prompt.md"
        try:
            with open(prompt_file, 'r', encoding='utf-8') as f:
                prompt_template = f.read()
        except FileNotFoundError:
            return f"[Validator prompt not found: {prompt_file}]"

        # Inject content into prompt
        prompt = prompt_template.replace('<PASTE FILE CONTENT HERE>', content)

        try:
            response = self.llm_client.messages.create(
                model=self.config['llm']['model'],
                max_tokens=self.config['llm']['max_tokens'],
                temperature=self.config['llm']['temperature'],
                messages=[{"role": "user", "content": prompt}]
            )
            return response.content[0].text if response.content else "[No response]"
        except Exception as e:
            return f"[LLM Error: {str(e)}]"

    def validate_file(self, file_path: str) -> Dict[str, Any]:
        """
        Validate a single guide file.
        """
        print(f"Validating guide: {file_path}")

        # Read file content
        try:
            content = self._read_file(file_path)
        except Exception as e:
            return {
                'file': file_path,
                'status': 'ERROR',
                'error': str(e),
                'results': {}
            }

        # Run rule-based validation
        rule_results = self.rule_validator.validate_all(content)

        # Run LLM validation if enabled
        llm_results = {}
        if self.llm_client and self.config['llm']['enabled']:
            print("Running LLM validation...")
            validators_to_run = ['Overview', 'Prerequisites', 'Steps', 'Troubleshooting', 'Callout']
            validators_run = 0

            for validator_name in validators_to_run:
                if self.config['validators'].get(validator_name.lower(), True):
                    llm_result = self._run_llm_validation(content, validator_name)
                    llm_results[validator_name] = llm_result
                    validators_run += 1

                    # Stop on first error to avoid unnecessary API calls
                    if self._is_llm_error(llm_result):
                        remaining = len([v for v in validators_to_run[validators_run:]
                                       if self.config['validators'].get(v.lower(), True)])
                        if remaining > 0:
                            print(f"⚠️  LLM validation stopped due to error in {validator_name} validator")
                            print(f"ℹ️  Skipped {remaining} remaining validators to avoid unnecessary API calls")
                        break

        return {
            'file': file_path,
            'status': rule_results['overall_status'],
            'rule_based_results': rule_results,
            'llm_results': llm_results
        }

    def format_output(self, validation_result: Dict[str, Any]) -> str:
        """
        Format validation results for display.
        """
        output = []
        output.append(f"# Guide Validation Results")
        output.append(f"**File:** {validation_result['file']}")
        output.append(f"**Overall Status:** {validation_result['status']}")
        output.append("")

        # Rule-based results
        output.append("## Rule-Based Validation Results")
        output.append(self.rule_validator.format_results(validation_result['rule_based_results']))

        # LLM results if available
        if validation_result.get('llm_results'):
            output.append("## LLM Validation Results")
            for validator_name, result in validation_result['llm_results'].items():
                output.append(f"### {validator_name} Validator")
                output.append(result)
                output.append("")

        return "\n".join(output)

def main():
    """
    Main entry point for the validator script.
    """
    parser = argparse.ArgumentParser(
        description="Validate markdown guide files against documentation style guide rules",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python validate_guides.py guide.md
  python validate_guides.py guide.md --use-llm
  python validate_guides.py guide.md --config config.yaml
  USE_LLM=true python validate_guides.py guide.md
        """
    )

    parser.add_argument('file', help='Path to the markdown guide file to validate')
    parser.add_argument('--use-llm', action='store_true',
                       help='Enable LLM validation (requires ANTHROPIC_API_KEY)')
    parser.add_argument('--config', help='Path to configuration file')
    parser.add_argument('--output', help='Output file path (default: stdout)')
    parser.add_argument('--prompts-dir', help='Path to prompts directory (default: auto-detect)')

    args = parser.parse_args()

    # Check if file exists
    if not os.path.exists(args.file):
        print(f"Error: File not found: {args.file}")
        sys.exit(1)

    # Set environment variable if --use-llm is specified
    if args.use_llm:
        os.environ['USE_LLM'] = 'true'

    # Initialize validator
    try:
        validator = GuideValidator(args.config, args.prompts_dir)
    except Exception as e:
        print(f"Error initializing validator: {e}")
        sys.exit(1)

    # Validate file
    try:
        result = validator.validate_file(args.file)
        output = validator.format_output(result)

        # Output results
        if args.output:
            with open(args.output, 'w', encoding='utf-8') as f:
                f.write(output)
            print(f"Results written to: {args.output}")
        else:
            print(output)

        # Exit with appropriate code
        if result['status'] == 'FAIL':
            sys.exit(1)
        elif result['status'] == 'ERROR':
            sys.exit(2)
        else:
            sys.exit(0)

    except Exception as e:
        print(f"Error during validation: {e}")
        sys.exit(2)

if __name__ == '__main__':
    main()