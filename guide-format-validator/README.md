# Guide Format Validator

A simple validation tool for markdown guide files that ensures compliance with documentation style guide rules.

**🎯 Two Ways to Validate Your Guides:**

**Option 1: Ultra-Simple (Recommended)**
```bash
./validate /path/to/your/guide.md
```

**Option 2: Manual Validation**
```bash
./validate-prompt steps --prompt
```

## 🚀 Getting Started

1. **Install:**
   ```bash
   cd guide-format-validator
   ./install.sh
   ```

2. **Choose your validation method:**

   **Method 1: Automatic Validation (Recommended)**
   ```bash
   ./validate /path/to/your/guide.md
   ```
   - ✅ Fast and reliable
   - ✅ No setup required
   - ✅ Shows exactly what to fix

   **Method 2: Manual Validation**
   ```bash
   ./validate-prompt steps --prompt
   ```
   - ✅ Use with any LLM tool (ChatGPT, Claude, etc.)
   - ✅ Copy-paste validation prompts
   - ✅ No dependencies required

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

## Which Method Should You Use?

| Method | When to Use | Pros | Cons |
|--------|-------------|------|------|
| **Automatic** (`./validate`) | Most cases | ✅ Fast, reliable, no setup | ❌ Basic validation only |
| **Manual** (`./validate-prompt`) | Custom needs | ✅ Use any LLM tool, flexible | ❌ Requires copy-paste |

**Recommendation:** Start with **Automatic** validation. Use **Manual** validation only when you need custom analysis or want to use your own LLM tools.

## Examples

**Validate a guide:**
```bash
./validate /path/to/your/guide.md
```

**Get validation prompts for manual use:**
```bash
./validate-prompt steps --prompt
```

## Manual Validation Details

**List all sections:**
```bash
./validate-prompt --list
```

**Get validation rules:**
```bash
./validate-prompt overview --rules
```

**Get LLM prompt:**
```bash
./validate-prompt steps --prompt
```

**Use the prompt with any LLM tool:**
1. Copy the prompt output
2. Paste into ChatGPT, Claude, or Cursor AI
3. Replace `<PASTE FILE CONTENT HERE>` with your guide content
4. Review the validation results

## Configuration

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
