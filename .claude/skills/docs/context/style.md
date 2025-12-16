# Documentation Style Guide for LLMs

This guide provides rules for writing and editing Turbot Guardrails documentation.

## Core Principles

1. **Voice**: Write in second person (you). Use collaborative third person plural only in tutorials (Let's get started).
2. **Format**: Stay in markdown. Avoid HTML unless necessary.
3. **Approach**: Use example-driven guides with progressive disclosure—start simple, then add complexity.

## Critical Rules

### Images

**MUST follow these rules exactly:**

1. **Use markdown syntax**: `![alt text](./image.png)` NOT `<img src="..." />`
   - Exception: Use `<img>` ONLY when you must specify image size for modals/dialogs
   - Full-screen images: Use markdown, no size specification

2. **File location**: Store screenshots in the same directory as the markdown file that uses them
   - DO NOT store in `/images/` directory (that's for shared icons only)
   - Use relative paths: `![description](./my-image.png)`

3. **Screenshot requirements**:
   - Format: PNG only
   - Size: 1280px width × 640px height (adjust height if needed to show content)
   - Mode: Light mode only
   - Border: No border for full-page, show border for modals
   - Content: Show active pane only, not browser chrome

4. **Taking screenshots with Chrome DevTools MCP**:

   **CRITICAL: You must resize the browser viewport BEFORE taking screenshots**

   a. **Resize the viewport to 1280px × 640px**:
      - Use `mcp__chrome-devtools__resize_page` tool with `width: 1280` and `height: 640`
      - This sets the viewport (content area) dimensions, NOT the browser window
      - The viewport size is what matters for consistent screenshot dimensions

   b. **Adjust height if needed for content**:
      - If content requires more vertical space, increase height: `height: 800`, `height: 1000`, etc.
      - ALWAYS keep width at 1280px - never vary the width
      - Taller screenshots are acceptable when necessary to show important content that won't fit in 640px

   c. **Take the screenshot**:
      - Use `mcp__chrome-devtools__take_screenshot` with appropriate parameters
      - For full-page screenshots: Use `fullPage: false` (captures current viewport)
      - For specific elements: Use `uid` parameter to capture just that element
      - Save to the same directory as the markdown file using `filePath` parameter
      - Use kebab-case filenames: `prevention-dashboard-overview.png`

   d. **Screenshot scope**:
      - Full-page screenshots: Include entire viewport width (1280px)
      - Modal/dialog screenshots: Can use `uid` to capture just the modal element
      - Always capture meaningful content, avoid empty states when possible

   **Example workflow**:
   ```
   1. Navigate to page: mcp__chrome-devtools__navigate_page
   2. Resize viewport: mcp__chrome-devtools__resize_page (width: 1280, height: 640)
   3. Take screenshot: mcp__chrome-devtools__take_screenshot (filePath: ./docs/prevention/dashboard/overview.png)
   ```

### File Naming

**All files and directories**: Use kebab-case with dashes (`-`), never underscores (`_`)
- URLs use dashes for SEO
- Apply to markdown files, directories, and images consistently

### Folder Structure for Documentation Pages

**CRITICAL: Each sub-page must have its own folder with its own images**

1. **Structure requirement**:
   - Each documentation page should be in its own folder as `index.md`
   - Store all images for that page in the same folder
   - Use relative paths `./image.png` to reference images

2. **Correct structure example**:
   ```
   docs/prevention/dashboard/
     index.md                    (main dashboard page)
     dashboard-overview.png       (image for main page)
     explore/
       index.md                  (explore tab page)
       explore-view.png          (image for explore page)
     reports/
       index.md                  (reports tab page)
       reports-view.png          (image for reports page)
   ```

3. **Incorrect structure** (DO NOT DO THIS):
   ```
   docs/prevention/objectives/
     index.md
     benchmarks.md              ❌ Should be benchmarks/index.md
     objectives.md              ❌ Should be objectives/index.md
     benchmark-detail.png       ❌ Should be in benchmark-detail/ folder
   ```

4. **Mirror the UI structure**:
   - One folder per sidebar item
   - Sub-folders for each tab within a section
   - Detail pages get their own folders too

5. **When creating new documentation**:
   - Always create a folder for the page: `mkdir -p docs/section/page`
   - Create `index.md` inside that folder
   - Take screenshots and save them in the same folder
   - Reference images with `./image-name.png`

### Document Structure

**Every page requires:**

```yaml
---
title: Page Title
sidebar_label: Page Title
---

# Page Title
```

- h1 (`#`) must match `title` and `sidebar_label` exactly
- Overview paragraph(s) immediately after h1—no `## Overview` header
- Subsequent headers start at h2 (`##`)
- All headers use Title Case

### Headers and Hierarchy

- One h1 per page (matches frontmatter title)
- Subheaders start at h2
- Use Title Case for all headers
- Keep section titles ≤5 words

### Links

**MUST follow these rules exactly:**

1. **Use absolute paths starting with `/guardrails`**: All internal documentation links must use absolute paths
   - Correct: `[Explore](/guardrails/docs/prevention/dashboard/explore)`
   - Incorrect: `[Explore](./explore)` or `[Explore](explore.md)`

2. **Omit file extensions**: Never include `.md` in links
   - Correct: `[Preventions](/guardrails/docs/prevention/preventions)`
   - Incorrect: `[Preventions](/guardrails/docs/prevention/preventions.md)`

3. **Omit `index.md` for directory default pages**: When linking to a directory's index page, use the directory path only
   - Correct: `[Dashboard](/guardrails/docs/prevention/dashboard)`
   - Incorrect: `[Dashboard](/guardrails/docs/prevention/dashboard/index)`
   - Incorrect: `[Dashboard](/guardrails/docs/prevention/dashboard/index.md)`

4. **Link specific pages with full path**: For non-index pages, include the full filename (without extension)
   - Correct: `[Explore](/guardrails/docs/prevention/dashboard/explore)`
   - Correct: `[Prevention Detail](/guardrails/docs/prevention/preventions/detail)`

5. **Frequency**: Hyperlink to relevant docs on first mention in a section only
   - Do NOT repeat the same link in the same section (makes text unreadable)

**Examples from the codebase:**
```markdown
- Use the [Explore](/guardrails/docs/prevention/dashboard/explore) tab to customize groupings
- Review [Reports](/guardrails/docs/prevention/dashboard/reports) for specialized views
- Click into any [prevention detail page](/guardrails/docs/prevention/preventions/detail) to see configuration
- Review [Objectives](/guardrails/docs/prevention/objectives) to understand which objectives
- Use [Recommendations](/guardrails/docs/prevention/recommendations) to prioritize new prevention
- Try the [Simulator](/guardrails/docs/prevention/simulator) to test Service Control Policies
```

### Code and UI Elements

**In guides and instructions:**

- **Bold** for UI elements: Select **Launch Product** button
- `Backticks` for:
  - Text values: Enter `my-volume` in the **Name** field
  - Code elements, CLI commands, flags: use `--var` flag
  - Constants: `CREATE_COMPLETE`, `CREATE_FAILED`
- Code blocks (triple backticks) for command examples
  - Always specify language: ```bash, ```json, ```hcl, ```sql
  - Use standard indenting (2 spaces for tabs, align HCL after `=`)

### Lists and Tables

**Bullets:**
- End with period (`.`) if items are sentences or fragments
- No period if list contains simple items/keywords

**Tables:**
- Use markdown tables when possible
- HTML `<table>` only when markdown formatting is insufficient
- Follow bullet punctuation rules in table cells

### Blockquotes

Use GitHub extended blockquote types:

- `> [!NOTE]` - Highlight important information
- `> [!TIP]` - Offer helpful advice or best practices
- `> [!IMPORTANT]` - Critical information users must not overlook
- `> [!WARNING]` - Urgent issues that may cause problems
- `> [!CAUTION]` - Potential risks or negative outcomes

## Guide-Specific Rules

For procedural Guardrails guides:

### Structure

1. Overview (no header)
   - What you'll do
   - What this is
   - Why it matters (1-2 sentences)
2. Prerequisites (bulleted list with links)
3. Step sections (h2 headers)
4. Next Steps
5. Troubleshooting (table format)

### Step Sections

**Format**: `## Step {number}: {Verb} {Object}`

Examples:
- `## Step 1: Access AWS Console`
- `## Step 2: Navigate to Products`
- `## Step 3: Find Version`

**Requirements:**
- Include `## Step N: Monitor {Operation}` step showing how to track progress
- Final step must be `## Step N: Review` with checklist to verify success
- Use `select` for on-screen actions, `choose` for lists/dropdowns
- Link terms to glossary on first use (except in overview bullets)

### Troubleshooting Section

Use table format:

| Issue | Description | Guide |
|-------|-------------|-------|
| Permission Issues | Description of the issue | [Link to guide](url) |
| Further Assistance | Contact support | [Open Support Ticket](url) |

## Quick Reference

### DO:
- Use markdown image syntax with relative paths for images
- Use absolute paths starting with `/guardrails` for documentation links
- Store screenshots with markdown files
- Use kebab-case for all filenames
- Bold UI elements, backtick code/values
- Use second person (you)
- Link terms once per section
- Omit `.md` extensions and `index.md` from links

### DON'T:
- Use `<img>` tags unless size specification required
- Use relative paths like `./page` or `../folder/page` for documentation links
- Include `.md` file extensions in links
- Store screenshots in `/images/` (that's for shared icons)
- Use underscores in filenames
- Repeat links in same section
- Use h1 for anything except page title
- Include `## Overview` header

## Common Mistakes to Avoid

1. **Image paths**: Writing `/images/docs/...` instead of `./image.png`
2. **Image tags**: Using `<img>` when markdown `![]()` works
3. **File location**: Putting screenshots in `/images/` instead of with markdown
4. **Link paths**: Using relative paths `./page` or `../folder/page` instead of absolute `/guardrails/docs/...`
5. **Link extensions**: Including `.md` or `index.md` in links
6. **Links**: Repeating the same link multiple times in a section
7. **Headers**: Using `## Overview` instead of starting content immediately after h1
8. **Naming**: Using underscores (`_`) instead of dashes (`-`)

## Validation Checklist

Before completing documentation work:

- [ ] All images use markdown syntax `![alt](./file.png)` unless size needed
- [ ] All images stored in same directory as markdown file
- [ ] Browser viewport resized to 1280×640 (or 1280×[taller]) BEFORE taking screenshots
- [ ] All screenshots are 1280px wide (height can vary if needed)
- [ ] All documentation links use absolute paths starting with `/guardrails`
- [ ] No `.md` extensions or `index.md` in links
- [ ] All filenames use kebab-case with dashes
- [ ] Frontmatter includes matching `title` and `sidebar_label`
- [ ] Single h1 that matches frontmatter exactly
- [ ] No `## Overview` header (content starts after h1)
- [ ] UI elements are **bolded**, code/values have `backticks`
- [ ] Links appear once per section maximum
- [ ] Code blocks specify language
- [ ] Screenshots are PNG format, light mode
