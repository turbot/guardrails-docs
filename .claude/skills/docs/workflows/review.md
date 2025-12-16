# Review Documentation Workflow

You are reviewing Turbot Guardrails documentation to ensure it follows the project's style guidelines and best practices.

## Reference Context

Review both context files before starting:
- `../context/style.md` for formatting and structure rules
- `../context/prevention.md` if reviewing prevention documentation

## Review Checklist

### Structure & Formatting

- [ ] **Frontmatter present and correct:**
  ```yaml
  ---
  title: Page Title
  sidebar_label: Page Title
  ---
  ```

- [ ] **Single h1 matching frontmatter exactly:**
  - One h1 per page: `# Page Title`
  - Matches `title` and `sidebar_label`

- [ ] **No `## Overview` header:**
  - Content starts immediately after h1
  - First paragraphs explain what/why without a header

- [ ] **Headers use proper hierarchy:**
  - H1 for page title only
  - H2 for main sections
  - H3 for subsections
  - All use Title Case

### Images

- [ ] **Images use markdown syntax:**
  - ✅ `![alt text](./image.png)`
  - ❌ `<img src="..." />` (unless size needed)

- [ ] **Images stored in same directory:**
  - Not in `/images/` directory
  - Use relative paths: `./image-name.png`

- [ ] **Alt text is descriptive:**
  - Explains what's shown
  - Not just "screenshot" or "image"

- [ ] **Screenshot specifications met:**
  - PNG format
  - 1280px width (height can vary)
  - Light mode
  - No browser chrome
  - Meaningful content (not empty states)

### Links

- [ ] **Links use absolute paths:**
  - ✅ `[Page](/guardrails/docs/section/page)`
  - ❌ `[Page](./page)` or `[Page](../section/page)`

- [ ] **No file extensions:**
  - ✅ `/guardrails/docs/prevention/dashboard`
  - ❌ `/guardrails/docs/prevention/dashboard.md`

- [ ] **No index.md references:**
  - ✅ `/guardrails/docs/prevention/dashboard`
  - ❌ `/guardrails/docs/prevention/dashboard/index`

- [ ] **Links not repeated in same section:**
  - Link on first mention only
  - Subsequent mentions use plain text

### File Organization

- [ ] **Page in its own folder:**
  - Path: `docs/section/page-name/index.md`
  - Not: `docs/section/page-name.md`

- [ ] **Images in same folder:**
  - `docs/section/page-name/index.md`
  - `docs/section/page-name/image.png`

- [ ] **Folder/file names use kebab-case:**
  - ✅ `prevention-dashboard.png`
  - ❌ `prevention_dashboard.png` or `preventionDashboard.png`

### Writing Style

- [ ] **Conversational tone:**
  - Writes naturally, explains WHY
  - Not dry/robotic reference style

- [ ] **Second person voice:**
  - Uses "you"
  - Exception: "let's" in tutorials

- [ ] **Explains value and purpose:**
  - Not just describing UI
  - Shows how features help accomplish goals

- [ ] **Includes practical examples:**
  - Real scenarios
  - Common use cases
  - Concrete examples (not abstract)

- [ ] **Appropriate use of lists:**
  - Prose paragraphs for explanation
  - Bullets for actual lists
  - Not bullet-heavy "Page Layout" sections

### Code & UI Elements

- [ ] **UI elements are bolded:**
  - ✅ Click the **Launch** button
  - ❌ Click the Launch button

- [ ] **Code/values use backticks:**
  - ✅ Enter `my-volume` in the field
  - ✅ Use the `--region` flag

- [ ] **Code blocks specify language:**
  ```bash
  # Good
  ```

  ```
  # Bad - no language specified
  ```

### Prevention-Specific (if applicable)

- [ ] **Explains security concepts:**
  - Not just UI descriptions
  - Explains relationships (Objectives vs Preventions)

- [ ] **Addresses common workflows:**
  - Finding gaps
  - Prioritizing work
  - Verifying coverage
  - Testing controls

- [ ] **Uses concrete examples:**
  - EBS encryption
  - S3 public access
  - Service Control Policies

- [ ] **Emphasizes prevention-first:**
  - Stop issues before they reach production
  - Not just detection

- [ ] **Avoids exhaustive UI listings:**
  - No bullet lists of every field
  - Explains capabilities, not just enumerates

## Workflow Steps

### 1. Identify Scope

Ask the user:
- Which file(s) to review?
- Looking for specific issues or comprehensive review?
- Should you fix issues or just report them?

### 2. Read the File(s)

Use Read tool to get content:
```
Read: /Users/jsmyth/src/guardrails-docs/docs/[section]/[page]/index.md
```

### 3. Review Against Checklist

Go through each category systematically:
1. Structure & Formatting
2. Images
3. Links
4. File Organization
5. Writing Style
6. Code & UI Elements
7. Prevention-Specific (if applicable)

### 4. Document Findings

Create a report with sections:

**Compliant Items:**
- List what follows guidelines correctly

**Issues Found:**
- List each issue with location (line number)
- Categorize by severity: Critical, Important, Minor
- Show incorrect example and correct fix

**Recommendations:**
- Suggestions for improvement
- Not violations but enhancements

### 5. Fix or Report

Based on user preference:

**Option A - Fix Issues:**
- Use Edit tool to fix each issue
- Make one edit at a time
- Verify each fix

**Option B - Report Only:**
- Provide detailed report
- Let user decide what to fix
- Offer to fix if they want

### 6. Summary

Provide:
- Total issues found by category
- What was fixed (if applicable)
- Remaining issues (if any)
- Overall assessment (excellent, good, needs work)

## Issue Severity Levels

**Critical (must fix):**
- Broken image/link paths
- Missing frontmatter
- Wrong folder structure
- HTML `<img>` tags without reason

**Important (should fix):**
- Relative link paths
- `.md` extensions in links
- Repeated links in same section
- Missing alt text on images
- `## Overview` header present

**Minor (nice to fix):**
- Inconsistent capitalization
- Could improve alt text descriptions
- Writing could be more conversational
- Missing some contextual examples

## Example Report Format

```markdown
# Documentation Review: [Page Name]

## Summary
Reviewed: docs/prevention/objectives/index.md
Overall: Good - minor improvements needed
Issues found: 3 Important, 2 Minor

## Compliant Areas ✅
- Proper frontmatter and h1 structure
- Images use markdown syntax and relative paths
- Conversational tone with good examples
- No exhaustive UI bullet lists

## Issues Found

### Important Issues
1. **Line 45**: Link uses relative path
   - Current: `[Preventions](../preventions)`
   - Fix: `[Preventions](/guardrails/docs/prevention/preventions)`

2. **Line 67**: Link includes .md extension
   - Current: `[Dashboard](/guardrails/docs/prevention/dashboard.md)`
   - Fix: `[Dashboard](/guardrails/docs/prevention/dashboard)`

3. **Line 89**: Link repeated 3 times in same section
   - Keep first occurrence only
   - Remove repetitions on lines 92, 97

### Minor Issues
1. **Line 23**: Alt text could be more descriptive
   - Current: `![Screenshot](./objectives.png)`
   - Suggestion: `![Objectives view showing priority levels and scores](./objectives.png)`

2. **Line 134**: Could add concrete example
   - Add real scenario like EBS encryption requirement

## Recommendations
- Consider adding a "Common Use Cases" section
- Some paragraphs could explain "why" more deeply
- Screenshot at line 56 could show expanded view for clarity

## Next Steps
Would you like me to:
1. Fix all Important issues automatically
2. Fix specific issues only
3. Leave as-is and you'll fix manually
```

## Quick Review Mode

For fast checks, focus on critical items:
1. Frontmatter present?
2. Images and links working?
3. Folder structure correct?
4. Any obvious style violations?

Report: "Quick check: [Pass/Fail] with [N] issues needing attention"

## Comprehensive Review Mode

For thorough reviews:
1. Check every item on the full checklist
2. Read for tone and clarity
3. Verify all technical accuracy
4. Check consistency with similar pages
5. Provide detailed improvement suggestions

Report: Full formatted report with all sections
