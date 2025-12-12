#!/usr/bin/env python3
"""
Guide Format Validator - Prompt Helper
=====================================

A simple CLI tool to display validation prompts and rules without running full validation.
Useful for manual validation or when you want to reference the validation criteria.

Usage:
    python3 scripts/prompt_helper.py [section] [--list] [--rules] [--prompt]

Examples:
    python3 scripts/prompt_helper.py                    # List all available sections
    python3 scripts/prompt_helper.py --list             # List all available sections
    python3 scripts/prompt_helper.py overview           # Show overview validation rules
    python3 scripts/prompt_helper.py steps --rules      # Show only rule-based validation rules
    python3 scripts/prompt_helper.py troubleshooting --prompt  # Show only LLM prompt
"""

import os
import sys
import argparse
import re
import yaml
from pathlib import Path

class PromptHelper:
    def __init__(self, prompts_dir=None):
        if prompts_dir is None:
            # Auto-detect prompts directory
            script_dir = Path(__file__).parent
            self.prompts_dir = script_dir.parent / "prompts"
        else:
            self.prompts_dir = Path(prompts_dir)

        if not self.prompts_dir.exists():
            print(f"❌ Prompts directory not found: {self.prompts_dir}")
            sys.exit(1)

    def list_sections(self):
        """List all available validation sections."""
        print("📋 Available Validation Sections:")
        print("=" * 40)

        prompt_files = list(self.prompts_dir.glob("*-section-validator-prompt.md"))
        if not prompt_files:
            print("❌ No validation prompt files found")
            return

        for i, prompt_file in enumerate(sorted(prompt_files), 1):
            section_name = prompt_file.stem.replace('-section-validator-prompt', '')
            print(f"{i:2d}. {section_name}")

        print(f"\n💡 Usage: python3 scripts/prompt_helper.py <section_name>")
        print("💡 Add --rules for rule-based validation only")
        print("💡 Add --prompt for LLM prompt only")

    def get_section_info(self, section_name, show_rules=True, show_prompt=True):
        """Get validation information for a specific section."""
        prompt_file = self.prompts_dir / f"{section_name}-section-validator-prompt.md"

        if not prompt_file.exists():
            print(f"❌ Section '{section_name}' not found")
            print(f"Available sections:")
            self.list_sections()
            return

        content = prompt_file.read_text(encoding='utf-8')

        print(f"📖 {section_name.title()} Section Validator")
        print("=" * 50)

        if show_rules:
            self._extract_and_display_rules(content, section_name)

        if show_prompt and show_rules:
            print("\n" + "─" * 50)

        if show_prompt:
            self._extract_and_display_prompt(content)

    def _extract_and_display_rules(self, content, section_name):
        """Extract and display rule-based validation rules."""
        print("🔧 Rule-Based Validation Rules:")
        print("-" * 30)

        # Extract YAML rules
        yaml_match = re.search(r'## Rule-Based Validation Rules\s*\n```yaml\n(.*?)\n```', content, re.DOTALL)
        if yaml_match:
            yaml_content = yaml_match.group(1)
            try:
                rules = yaml.safe_load(yaml_content)
                section_key = section_name.replace('-', '_')
                if section_key in rules:
                    rule_data = rules[section_key]
                    for key, value in rule_data.items():
                        if isinstance(value, list):
                            print(f"  {key}: {', '.join(map(str, value))}")
                        else:
                            print(f"  {key}: {value}")
                else:
                    print(f"  No rules found for {section_name}")
            except yaml.YAMLError as e:
                print(f"  ❌ Error parsing YAML rules: {e}")
        else:
            print("  No YAML rules found in this prompt file")

    def _extract_and_display_prompt(self, content):
        """Extract and display LLM validation prompt."""
        print("🤖 LLM Validation Prompt:")
        print("-" * 25)

        # Extract LLM prompt (everything after "## LLM Validation Prompt")
        prompt_match = re.search(r'## LLM Validation Prompt\s*\n(.*)', content, re.DOTALL)
        if prompt_match:
            prompt_content = prompt_match.group(1).strip()
            print(prompt_content)
        else:
            print("No LLM prompt found in this file")

def main():
    parser = argparse.ArgumentParser(
        description="Guide Format Validator - Prompt Helper",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )

    parser.add_argument(
        'section',
        nargs='?',
        help='Section name to display (e.g., overview, steps, troubleshooting)'
    )

    parser.add_argument(
        '--list', '-l',
        action='store_true',
        help='List all available sections'
    )

    parser.add_argument(
        '--rules', '-r',
        action='store_true',
        help='Show only rule-based validation rules'
    )

    parser.add_argument(
        '--prompt', '-p',
        action='store_true',
        help='Show only LLM validation prompt'
    )

    args = parser.parse_args()

    helper = PromptHelper()

    # If --list or no arguments, show list
    if args.list or not args.section:
        helper.list_sections()
        return

    # Determine what to show
    show_rules = args.rules or (not args.prompt)
    show_prompt = args.prompt or (not args.rules)

    # Show section information
    helper.get_section_info(args.section, show_rules, show_prompt)

if __name__ == "__main__":
    main()
