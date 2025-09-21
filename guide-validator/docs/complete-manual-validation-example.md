# Complete Manual Validation Example

This shows exactly what a user would do to manually validate the `bad-guide.md` example.

## Step 1: Get the Validation Prompt

Run this command:
```bash
./validate-prompt steps --prompt
```

## Step 2: Copy the Complete Prompt

The user would copy this entire output:

```
## How to use:
1. Copy the entire content of this file.
2. Paste it into your LLM tool (e.g., ChatGPT, Claude, Cursor AI).
3. Replace <PASTE FILE CONTENT HERE> with the markdown content you want to validate.
4. Review the output for any violations and suggestions.

---

You are a documentation style guide validator. Validate the following markdown file for the "Steps Section" rules.

**Rules:**
- There must be at least one step section, starting with `## Step 1:`.
- Each step uses an H2 header (`##`).
- Steps are sequentially numbered, with no missing or duplicate numbers.
- Each step header is in the format "Step {n}: Verb ..." in Title Case.
- The first word after the colon is a verb.
- Each step has at least one line of content.
- Steps come before Review, Next Steps, and Troubleshooting sections.
- The review section must be titled exactly `## Review` (not `## Step Review` or any variant).
- Step instructions use second person ("you"/"your") where appropriate (warn if not, but do not fail).
- Steps may include images or callouts.

**If the document does not use H2 step headers (## Step n: ...), or otherwise does not follow the standard guide structure, mark the section as FAIL and clearly state this in the summary and suggestions.**

**For each failure or warning, indicate the line number(s) and/or section header(s) where the issue occurs in the "Location" column.**

**Output format:**
```markdown
<details><summary>Steps Section [PASS/FAIL]</summary>

[If the overall format does not match the standard (e.g., missing H2 step headers), include a summary statement here, e.g.:]
**Major Issue:**
The steps section does not follow the required standard format. Steps are not defined using H2 headers (## Step n: ...). Please rewrite the steps to use H2 headers for each step.

| Criteria | Pass/Fail/Warning | Location | Suggestions |
|----------|-------------------|----------|-------------|
| At least one step section present | [✅/❌] | [line/section] | [Fail if missing] |
| Step headers are H2 | [✅/❌] | [line/section] | [Fail if not] |
| Step headers are sequential | [✅/❌] | [line/section] | [Fail if missing/duplicate numbers] |
| Step header format | [✅/❌] | [line/section] | [Fail if not "Step n: Verb ..."] |
| Step header starts with verb | [✅/❌] | [line/section] | [Fail if not] |
| Step content is present | [✅/❌] | [line/section] | [Fail if missing] |
| Steps are before Review/Next Steps/Troubleshooting | [✅/❌] | [line/section] | [Fail if not] |
| No skipped or duplicate step numbers | [✅/❌] | [line/section] | [Fail if not] |
| Uses second person where appropriate | [✅/⚠️] | [line/section] | [Warn if not] |
| Images/callouts are allowed | [✅] | - |  |
| Review section is titled exactly '## Review' | [✅/❌] | [line/section] | [Fail if not] |

</details>
```

**Markdown file to validate:**
```
<PASTE FILE CONTENT HERE>
```
```

## Step 3: Replace the Placeholder

The user would replace `<PASTE FILE CONTENT HERE>` with the content from `bad-guide.md`:

```
---
title: Example Bad Guide
sidebar_label: Example Bad Guide
---

# Example Bad Guide

This guide has multiple formatting issues that will fail validation.

## Prerequisites

- Missing overview section
- No "In this guide, you will:" format
- Incorrect step numbering

## Step 1: First Step

This step is correctly formatted.

## Step 3: Third Step

This step has incorrect numbering (missing Step 2).

## Step 1: Duplicate Step

This step has a duplicate number.

## Step Review

This should be "## Review" not "## Step Review".

## Next Steps

No troubleshooting section.

**Note:** This is an old-style callout that should use > [!NOTE] format.

:warning: This is another old-style callout.

## Troubleshooting

This troubleshooting section is not in table format and doesn't have "Further Assistance" in the last row.
```

## Step 4: Expected LLM Output

When the user pastes this into ChatGPT, Claude, or Cursor AI, they would get something like:

```markdown
<details><summary>Steps Section [FAIL]</summary>

| Criteria | Pass/Fail/Warning | Location | Suggestions |
|----------|-------------------|----------|-------------|
| At least one step section present | ✅ | Lines 16, 20, 24 | - |
| Step headers are H2 | ✅ | Lines 16, 20, 24 | - |
| Step headers are sequential | ❌ | Lines 16, 20, 24 | Found sequence [1, 3, 1], expected [1, 2, 3] |
| Step header format | ✅ | Lines 16, 20, 24 | - |
| Step header starts with verb | ✅ | Lines 16, 20, 24 | - |
| Step content is present | ✅ | Lines 16, 20, 24 | - |
| Steps are before Review/Next Steps/Troubleshooting | ❌ | Line 28 | Steps come after "Step Review" section |
| No skipped or duplicate step numbers | ❌ | Lines 16, 24 | Duplicate step numbers found: 1 |
| Uses second person where appropriate | ✅ | Lines 16, 20, 24 | - |
| Images/callouts are allowed | ✅ | - | - |
| Review section is titled exactly '## Review' | ❌ | Line 28 | Should be "## Review" not "## Step Review" |

</details>
```

## Summary

This manual validation approach gives users:

1. **Complete Control**: They can use any LLM tool they prefer
2. **No Dependencies**: No need to install Python or API keys
3. **Educational**: They learn the validation rules by reading the prompts
4. **Flexible**: They can modify prompts for specific needs
5. **Portable**: Works anywhere with access to an LLM

The user gets the same detailed validation results as the automated validator, but with the flexibility to use their preferred LLM tool!
