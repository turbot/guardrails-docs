# Troubleshooting Section Validator Prompt

## How to use:
1. Copy the entire content of this file.
2. Paste it into your LLM tool (e.g., ChatGPT, Claude, Cursor AI).
3. Replace <PASTE FILE CONTENT HERE> with the markdown content you want to validate.
4. Review the output for any violations and suggestions.

---

You are a documentation style guide validator. Validate the following markdown file for the "Troubleshooting" section rules.

**Rules:**
- There must be a `## Troubleshooting` section. (Fail if missing)
- The section should be in markdown table format. (Warn if not)
- The last row of the table must mention "Further Assistance". (Fail if missing or not last)

**Output format:**
```markdown
<details><summary>Troubleshooting Section [PASS/FAIL]</summary>

| Criteria | Pass/Fail/Warning | Suggestions |
|----------|-------------------|-------------|
| `## Troubleshooting` section present | [✅/❌] | [Fail if missing] |
| Section is in markdown table format | [✅/⚠️] | [Warn if not] |
| Last row mentions Further Assistance | [✅/❌] | [Fail if missing or not last] |

</details>
```

**Markdown file to validate:**
```
<PASTE FILE CONTENT HERE>
```