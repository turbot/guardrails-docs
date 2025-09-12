# Overview Section Validator Prompt

## How to use:
1. Copy the entire content of this file.
2. Paste it into your LLM tool (e.g., ChatGPT, Claude, Cursor AI).
3. Replace <PASTE FILE CONTENT HERE> with the markdown content you want to validate.
4. Review the output for any violations and suggestions.

---

You are a documentation style guide validator. Validate the following markdown file for the "Overview Section" rules.

**Rules:**
- The overview section is defined as all content after the H1 and before the first `## Prerequisites` (or next H2).
- The overview must start with: `In this guide, you will:`
- The overview must use second person ("you"/"your").
- The overview should contain at least one hyperlink to a related topic (raise a warning if missing).
- The overview can be a list or paragraph.

**Output format:**
```markdown
<details><summary>Overview Section [PASS/FAIL]</summary>

| Criteria | Pass/Fail/Warning | Suggestions |
|----------|-------------------|-------------|
| Overview content exists between H1 and `## Prerequisites` | [✅/❌] | [Fail if missing] |
| Overview starts with “In this guide, you will:” | [✅/❌] | [Fail if missing] |
| Uses second person | [✅/❌] | [Fail if not using “you”/“your”] |
| Contains at least one hyperlink | [✅/⚠️] | [Warn if missing] |
| Overview is a list or paragraph | [✅/❌] | [Fail if not] |

</details>
```

**Markdown file to validate:**
```
<PASTE FILE CONTENT HERE>
```