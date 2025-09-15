# Guide Format Validator

A comprehensive validation tool for markdown guide files that ensures compliance with documentation style guide rules.

**🎯 Get started in seconds:**
```bash
./validate /path/to/your/guide.md
```

The validator supports both rule-based validation (fast, no API required) and LLM-based validation (more nuanced, requires API key).

## 🚀 Getting Started

1. **Install the validator:**
   ```bash
   cd guide-format-validator
   ./install.sh
   ```

2. **Validate any guide:**
   ```bash
   ./validate /path/to/your/guide.md
   ```

3. **That's it!** You'll get detailed validation results showing what needs to be fixed.

### Example Output
```bash
$ ./validate /path/to/guide.md

🔍 Validating: /path/to/guide.md
📁 Using prompts from: /path/to/guide-format-validator/prompts

# Guide Validation Results
**File:** /path/to/guide.md
**Overall Status:** FAIL

## Rule-Based Validation Results
# Validation Results - Overall: FAIL

## ✅ Overview Section [PASS]
## ✅ Prerequisites Section [PASS]
## ❌ Steps Section [FAIL]

**Issues:**
- ❌ Step numbers are not sequential: found [1, 2, 3, 7, 8], expected [1, 2, 3, 4, 5]
- ❌ Duplicate step numbers found
- ❌ Review section should be titled exactly "## Review", not "## Step Review"

## ✅ Troubleshooting Section [PASS]
## ✅ Callouts Section [PASS]
```

### ℹ️ Common Note: "LLM validation requested but no API key found"

If you see this note:
```
ℹ️  Note: LLM validation requested but no API key found. Using rule-based validation (recommended).
```

**Don't worry!** This is normal and expected. The validator automatically falls back to rule-based validation, which is:
- ✅ **Faster** - No API calls needed
- ✅ **Free** - No API costs
- ✅ **Reliable** - Works offline
- ✅ **Recommended** - Perfect for most use cases

**To fix the warning (optional):**
```bash
# Only if you specifically want LLM validation
export ANTHROPIC_API_KEY=your-api-key-here
./validate /path/to/guide.md
```

**Or simply ignore it** - rule-based validation works great for most guides!

## Features

- **Rule-based validation** (default): Fast, reliable validation without external dependencies
- **LLM validation** (optional): Advanced validation using Anthropic Claude for deeper analysis
- **Multiple validators**: Overview, Prerequisites, Steps, Troubleshooting, and Callout validation
- **Configuration-driven**: Validation rules defined in YAML within prompt files
- **Easy to extend**: Add new validators by creating prompt files with YAML rules
- **Configurable**: Customize validation behavior via configuration file
- **Flexible output**: Multiple output formats and verbosity levels
- **Error handling**: Graceful fallback when LLM is unavailable

## Validation Methods

### Rule-Based Validation (Default)
**Pros:**
- ✅ **Fast**: No API calls, instant results
- ✅ **Reliable**: Works offline, no network dependencies
- ✅ **Free**: No API costs or credits required
- ✅ **Deterministic**: Same input always produces same output
- ✅ **CI/CD Ready**: Perfect for automated pipelines

**Cons:**
- ❌ **Limited Scope**: Only checks formatting and basic structure
- ❌ **No Context**: Cannot understand content meaning or flow
- ❌ **Rigid Rules**: May miss subtle issues or edge cases

**Best For:** Development, CI/CD, quick checks, basic format validation

### LLM Validation (Optional)
**Pros:**
- ✅ **Contextual**: Understands content meaning and logical flow
- ✅ **Comprehensive**: Can catch content quality issues beyond formatting
- ✅ **Nuanced**: Identifies subtle problems rule-based validation misses
- ✅ **Intelligent**: Can suggest improvements and better practices

**Cons:**
- ❌ **Slower**: Requires API calls and network requests
- ❌ **Cost**: Requires Anthropic API credits
- ❌ **Dependency**: Needs internet connection and valid API key
- ❌ **Variable**: Results may vary slightly between runs

**Best For:** Final review, content quality validation, comprehensive documentation review

### Manual Validation (Prompt Helper)
**Pros:**
- ✅ **No Dependencies**: Works without Python or API keys
- ✅ **Flexible**: Use any LLM tool (ChatGPT, Claude, Cursor AI)
- ✅ **Educational**: Learn validation criteria by reading prompts
- ✅ **Customizable**: Modify prompts for specific needs

**Cons:**
- ❌ **Manual**: Requires copy-paste and manual review
- ❌ **Time-consuming**: Slower than automated validation
- ❌ **Inconsistent**: Results depend on user's LLM tool choice

**Best For:** Learning, one-off validation, custom validation workflows, when you don't want to install dependencies

## Quick Start

### 1. Installation

**Option A: Automated Installation (Recommended)**
```bash
# Clone or download the validator
cd guide-format-validator

# Run the installation script
./install.sh
```

**Option B: Manual Installation**
```bash
# Clone or download the validator
cd guide-format-validator

# Install dependencies
pip install -r requirements.txt

# For LLM validation (optional)
pip install anthropic
```

The installation script will:
- Check for Python 3 and pip
- Install all required dependencies
- Make scripts executable
- Run tests to verify installation
- Provide usage instructions

### 2. Basic Usage

**🎯 Primary Method: Ultra-Simple Validation**
```bash
# Validate any guide file - everything is automatic
./validate /path/to/your/guide.md

# Real-world example
./validate /Users/raj/raj-professional-tasks/turbot/guardrails/guardrails-docs/docs/guides/hosting-guardrails/installation/install-ted/index.md

# Relative path example
./validate examples/bad-guide.md
```

**That's it!** The validator automatically:
- ✅ Uses the prompts folder for validation rules
- ✅ Runs rule-based validation (fast, reliable)
- ✅ Shows detailed results with pass/fail status
- ✅ Works with any markdown guide file

**Note:** You might see a warning about `ANTHROPIC_API_KEY` - this is normal! The validator automatically uses rule-based validation (which is recommended) and works perfectly without any API keys.

**🔧 Advanced Options (Optional)**
```bash
# Manual validation prompts (no dependencies)
./validate-prompt steps --prompt

# Full validation with LLM (requires API key)
export ANTHROPIC_API_KEY=your-api-key-here
python3 scripts/validate_guides.py guide.md --use-llm
```

### Quick Reference

| Command | Purpose | Example |
|---------|---------|---------|
| `./validate <file>` | **🎯 Primary method - Ultra-simple** | `./validate /path/to/guide.md` |
| `./validate-prompt <section>` | **Manual validation prompts** | `./validate-prompt steps --prompt` |
| `python3 scripts/validate_guides.py <file>` | **Advanced options** | `python3 scripts/validate_guides.py guide.md --use-llm` |

### 3. Manual Validation (Prompt Helper)

If you prefer to validate manually or want to reference the validation criteria without running the full validator, you can use the prompt helper:

```bash
# List all available validation sections
./validate-prompt --list

# Show validation rules for a specific section
./validate-prompt overview --rules

# Show LLM prompt for manual validation
./validate-prompt steps --prompt

# Show both rules and prompt
./validate-prompt troubleshooting
```

**Use Cases:**
- **Manual Review**: Copy the LLM prompt and paste it into ChatGPT, Claude, or Cursor AI
- **Reference**: Quickly check what rules apply to each section
- **Learning**: Understand the validation criteria without running the validator
- **Custom Validation**: Use the prompts as templates for your own validation tools

### 4. Configuration

Create a `config.yaml` file to customize validation:

```yaml
validators:
  overview: true
  prerequisites: true
  steps: true
  troubleshooting: true
  callouts: true

llm:
  enabled: false  # Set to true for LLM validation
  model: "claude-3-opus-20240229"

output:
  format: "markdown"
  show_warnings: true
  verbose: false
```

## Validators

### Overview Validator
- Ensures overview content exists between H1 and first H2
- Validates "In this guide, you will:" format
- Checks for second person usage
- Warns about missing hyperlinks

### Prerequisites Validator
- Verifies `## Prerequisites` section exists
- Checks for bulleted list format
- Validates second person usage

### Steps Validator
- Validates sequential step numbering (Step 1, Step 2, etc.)
- Checks for duplicate or missing step numbers
- Ensures proper step header format
- Validates Review section is titled exactly "## Review"

### Troubleshooting Validator
- Requires `## Troubleshooting` section
- Validates markdown table format
- Ensures last row mentions "Further Assistance"

### Callout Validator
- Validates callout format: `> [!TYPE]`
- Supports: NOTE, CAUTION, IMPORTANT, TIP, WARNING
- Detects and flags old-style callouts

## Usage Examples

### Basic Validation (Rule-Based - Default)
```bash
# Validate a single file (rule-based validation)
python3 scripts/validate_guides.py docs/guides/my-guide.md

# Validate with custom config
python3 scripts/validate_guides.py docs/guides/my-guide.md --config my-config.yaml

# Save results to file
python3 scripts/validate_guides.py docs/guides/my-guide.md --output results.md
```

### LLM Validation (Optional)
```bash
# Set API key
export ANTHROPIC_API_KEY=sk-ant-...

# Enable LLM validation
python3 scripts/validate_guides.py docs/guides/my-guide.md --use-llm

# Or set via environment variable
USE_LLM=true python3 scripts/validate_guides.py docs/guides/my-guide.md
```

**When to use LLM validation:**
- Final review before publishing important documentation
- When you need content quality analysis beyond formatting
- Catching logical inconsistencies or flow issues
- Comprehensive documentation review

### Batch Validation
```bash
# Validate multiple files (rule-based - default)
for file in docs/guides/*.md; do
    python3 scripts/validate_guides.py "$file"
done

# Batch validation with LLM (if you have API access)
for file in docs/guides/*.md; do
    python3 scripts/validate_guides.py "$file" --use-llm
done
```

## Configuration Reference

### Validators Section
```yaml
validators:
  overview: true          # Enable/disable overview validation
  prerequisites: true     # Enable/disable prerequisites validation
  steps: true            # Enable/disable steps validation
  troubleshooting: true  # Enable/disable troubleshooting validation
  callouts: true         # Enable/disable callout validation
```

### LLM Section
```yaml
llm:
  enabled: false         # Enable LLM validation (default: false - rule-based validation)
  provider: "anthropic"  # LLM provider (currently only Anthropic)
  model: "claude-3-opus-20240229"  # Model to use
  max_tokens: 2048       # Maximum response tokens
  temperature: 0         # Response randomness (0 = deterministic)
```

**Note:** LLM validation is disabled by default. The validator uses fast, reliable rule-based validation unless explicitly enabled.

### Output Section
```yaml
output:
  format: "markdown"     # Output format: markdown, json, text
  show_warnings: true    # Include warnings in output
  show_issues: true      # Include issues/errors in output
  verbose: false         # Show detailed validation info
```

## Exit Codes

- `0`: Validation passed
- `1`: Validation failed (issues found)
- `2`: Error occurred during validation

## Troubleshooting

### Common Issues

**"No module named 'anthropic'"**
```bash
# Only needed if using LLM validation
pip install anthropic
# Or just use rule-based validation (default, no additional packages needed)
```

**"LLM validation requested but no API key found"**
```bash
# For LLM validation (optional)
export ANTHROPIC_API_KEY=your-api-key-here
# Or simply use rule-based validation (default, no API key needed)
```

**"Insufficient Anthropic credits"**
- The validator will automatically fall back to rule-based validation
- **Recommendation**: Use rule-based validation for most use cases (it's free and fast)
- Only use LLM validation when you specifically need content analysis

**"Validator prompt not found"**
- Ensure you're running from the correct directory
- Check that the `prompts/` directory exists and contains the validator files

### Choosing the Right Validation Method

**Use Rule-Based Validation (Default) When:**
- ✅ Quick development validation
- ✅ CI/CD pipelines
- ✅ Basic format checking
- ✅ No API budget or access
- ✅ Offline work

**Use LLM Validation When:**
- ✅ Final review before publishing
- ✅ Content quality analysis needed
- ✅ Catching logical inconsistencies
- ✅ Comprehensive documentation review
- ✅ You have API access and budget

### Getting Help

1. **Run the installation script** to ensure everything is set up correctly:
   ```bash
   ./install.sh
   ```

2. Check the configuration file format
3. Verify file paths are correct
4. Ensure all dependencies are installed
5. Check API key validity (for LLM validation)

## Integration

### GitHub Actions
```yaml
name: Validate Guides
on: [pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: |
          cd guide-format-validator
          pip install -r requirements.txt
      - name: Validate guides
        run: |
          cd guide-format-validator
          python3 scripts/validate_guides.py docs/guides/my-guide.md
```

### Pre-commit Hook
```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: validate-guides
        name: Validate Guide Format
        entry: python3 guide-format-validator/scripts/validate_guides.py
        language: system
        files: \.md$
        args: [--config, guide-format-validator/config.yaml]
```

## Adding New Validators

The validator uses a configuration-driven approach where validation rules are defined in YAML within prompt files. To add a new validator:

1. **Create a new prompt file** in the `prompts/` directory:
   ```bash
   touch prompts/new-section-validator-prompt.md
   ```

2. **Add YAML rules section** at the top of the file:
   ```markdown
   # New Section Validator Prompt

   ## Rule-Based Validation Rules
   ```yaml
   new_section:
     required: true
     header: "## New Section"
     format: "bulleted_list"
     validation_level: "strict"
   ```

   ## LLM Validation Prompt
   [LLM prompt content...]
   ```

3. **Add validation method** to `rule_based_validator_v2.py`:
   ```python
   def validate_new_section(self, content: str) -> Dict[str, Any]:
       # Implementation using self.rules['new_section']
   ```

4. **Update the validator list** in `validate_all()` method

5. **Test your new validator**:
   ```bash
   python3 scripts/validate_guides.py examples/test-guide.md
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

<!-- ## License

This project is licensed under the MIT License - see the LICENSE file for details. -->
