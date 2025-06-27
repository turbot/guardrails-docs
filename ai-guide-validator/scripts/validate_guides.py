import sys
import os
import anthropic

"""
Instructions:
- Install the Anthropic SDK: pip install anthropic
- Set your API key: export ANTHROPIC_API_KEY=sk-ant-...

This script validates a markdown guide file using a series of documentation style guide validators.
It sends the guide content to Anthropic's Claude LLM for each validator prompt and prints the results.
"""

# Directory containing the validator prompt files (relative to this script)
PROMPT_DIR = '../prompts'

# List of validators to run, in order: (Display Name, Prompt Filename)
VALIDATORS = [
    ('Overview', 'overview-section-validator-prompt.md'),
    ('Prerequisites', 'prerequisites-section-validator-prompt.md'),
    ('Steps', 'steps-section-validator-prompt.md'),
    ('Troubleshooting', 'troubleshooting-section-validator-prompt.md'),
    ('Callout', 'callout-section-validator-prompt.md'),
]

# Initialize the Anthropic client using the API key from the environment
client = anthropic.Anthropic(
    api_key=os.environ.get("ANTHROPIC_API_KEY")
)

def read_file(path):
    """
    Read the entire contents of a file and return as a string.
    """
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def inject_guide_into_prompt(prompt, guide_content):
    """
    Replace the <PASTE FILE CONTENT HERE> placeholder in the validator prompt
    with the actual guide markdown content.
    """
    return prompt.replace('<PASTE FILE CONTENT HERE>', guide_content)

def run_validator_with_claude(prompt):
    """
    Send the prompt to Anthropic Claude and return the main text content of the response.
    """
    response = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=2048,
        temperature=0,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    # Return the main text content (first content block)
    return response.content[0].text if response.content else "[No response]"

def main():
    """
    Main execution flow:
    - Parse command line arguments for the guide file path
    - For each validator:
        - Read the validator prompt
        - Inject the guide content
        - Send to Claude and print the result
    """
    if len(sys.argv) < 2:
        print('Usage: python scripts/validate_guides.py <guide_markdown_file>')
        sys.exit(1)
    guide_path = sys.argv[1]
    if not os.path.isfile(guide_path):
        print(f'Guide file not found: {guide_path}')
        sys.exit(1)
    guide_content = read_file(guide_path)

    print(f'Validating guide: {guide_path}\n')
    for name, prompt_file in VALIDATORS:
        prompt_path = os.path.join(PROMPT_DIR, prompt_file)
        if not os.path.isfile(prompt_path):
            print(f'Validator prompt not found: {prompt_path}')
            continue
        prompt_content = read_file(prompt_path)
        # Insert the guide markdown into the validator prompt
        full_prompt = inject_guide_into_prompt(prompt_content, guide_content)
        print(f'---\n{name} Validator Prompt:\n---')
        # Send the prompt to Claude and print the result
        result = run_validator_with_claude(full_prompt)
        print(result)
        print('\n')

if __name__ == '__main__':
    main()