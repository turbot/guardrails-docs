# Callout Section Validator Prompt

## Rule-Based Validation Rules
```yaml
callouts:
  required: false
  format: "> [!TYPE]"
  allowed_types: ["NOTE", "CAUTION", "IMPORTANT", "TIP", "WARNING"]
  case_sensitive: false
  detect_old_format: true
  old_formats: ["**Note:**", ":warning:", "**Caution:**", "**Important:**", "**Tip:**"]
  validation_level: "strict"
```

## LLM Validation Prompt

## How to use:
1. Copy the entire content of this file.
2. Paste it into your LLM tool (e.g., ChatGPT, Claude, Cursor AI).
3. Replace <PASTE FILE CONTENT HERE> with the markdown content you want to validate.
4. Review the output for any violations and suggestions.

---

You are a documentation style guide validator. Validate the following markdown file for callout formatting rules.

**Rules:**
- All callouts (Note, Caution, Important, Tip, Warning, etc.) must use the following format:
  ```
  > [!TYPE]
  > Your message here.
  ```
  Where TYPE is one of: NOTE, CAUTION, IMPORTANT, TIP, WARNING (case-insensitive).
- Do not use other callout formats (e.g., "**Note:**", ":warning:", etc.).
- Warn if the callout type is not recognized.

**Output format:**
```markdown
<details><summary>Callout Section [PASS/FAIL]</summary>

| Criteria | Pass/Fail/Warning | Location | Suggestions |
|----------|-------------------|----------|-------------|
| All callouts use correct format | [✅/❌] | [line/section] | [Fail if not] |
| Only allowed callout types used | [✅/⚠️] | [line/section] | [Warn if not] |

</details>
```

**Markdown file to validate:**
```
<PASTE FILE CONTENT HERE>
```