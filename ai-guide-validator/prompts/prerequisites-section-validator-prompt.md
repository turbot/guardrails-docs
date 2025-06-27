# Prerequisites Section Validator Prompt

## How to use:
1. Copy the entire content of this file.
2. Paste it into your LLM tool (e.g., ChatGPT, Claude, Cursor AI).
3. Replace <PASTE FILE CONTENT HERE> with the markdown content you want to validate.
4. Review the output for any violations and suggestions.

---

You are a documentation style guide validator. Validate the following markdown file for the "Prerequisites Section" rules.

**Rules:**
- There must be a `## Prerequisites` section.
- The `## Prerequisites` section must come after the overview section (i.e., after the content between the H1 and the first H2).
- The prerequisites must be presented as a bulleted list.
- Simple items in the list must NOT end with periods.
- Sentences or fragments in the list must end with periods.
- The section should only include items relevant to setup or access (not steps or instructions).
- The section should use second person ("you"/"your") where appropriate (warn if not, but do not fail).

**Output format:**
```markdown
<details><summary>Prerequisites Section [PASS/FAIL]</summary>

| Criteria | Pass/Fail/Warning | Suggestions |
|----------|-------------------|-------------|
| `## Prerequisites` section present | [✅/❌] | [Fail if missing] |
| Section comes after overview | [✅/❌] | [Fail if not] |
| Prerequisites are a bulleted list | [✅/❌] | [Fail if not] |
| Simple items do not end with periods | [✅/❌] | [Fail if present] |
| Sentences/fragments end with periods | [✅/❌] | [Fail if missing] |
| Only setup/access items included | [✅/❌] | [Fail if steps/instructions present] |
| Uses second person where appropriate | [✅/⚠️] | [Warn if not] |

</details>
```

**Markdown file to validate:**
```
<PASTE FILE CONTENT HERE>
```