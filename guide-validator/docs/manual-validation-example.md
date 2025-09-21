# Manual Validation Example

This example shows how to use the prompt helper for manual validation.

## Step 1: Get the validation prompt

```bash
# Get the LLM prompt for steps validation
./validate-prompt steps --prompt
```

## Step 2: Copy the prompt

Copy the entire output from the command above, including the markdown table format.

## Step 3: Use with your preferred LLM tool

### Option A: ChatGPT
1. Open ChatGPT
2. Paste the entire prompt
3. Replace `<PASTE FILE CONTENT HERE>` with your guide content
4. Review the validation results

### Option B: Claude (Anthropic)
1. Open Claude
2. Paste the entire prompt
3. Replace `<PASTE FILE CONTENT HERE>` with your guide content
4. Review the validation results

### Option C: Cursor AI
1. Open Cursor AI
2. Paste the entire prompt
3. Replace `<PASTE FILE CONTENT HERE>` with your guide content
4. Review the validation results

## Step 4: Review the results

The LLM will provide a detailed validation report with:
- ✅ Pass/Fail status for each criteria
- 📍 Line numbers and locations of issues
- 💡 Specific suggestions for improvements
- ⚠️ Warnings for non-critical issues

## Benefits of Manual Validation

- **No Dependencies**: Works without installing Python or API keys
- **Flexible**: Use any LLM tool you prefer
- **Educational**: Learn validation criteria by reading the prompts
- **Customizable**: Modify prompts for specific needs
- **Portable**: Works anywhere you have access to an LLM

## Quick Reference

```bash
# List all available sections
./validate-prompt --list

# Show rules only (for quick reference)
./validate-prompt overview --rules

# Show prompt only (for manual validation)
./validate-prompt steps --prompt

# Show both (for complete understanding)
./validate-prompt troubleshooting
```
