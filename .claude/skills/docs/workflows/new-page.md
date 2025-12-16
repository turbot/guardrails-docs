# Create New Documentation Page Workflow

You are creating a new documentation page for Turbot Guardrails following the project's standards.

## Reference Context

Before starting, review:
- `../context/style.md` for formatting rules
- `../context/prevention.md` if working on prevention docs

## Workflow Steps

### 1. Understand the Requirements

Ask the user:
- What is the page about? (topic/feature)
- Where should it live in the docs structure?
- Is this for the prevention section or another area?
- Do they have any existing content or should you explore the feature first?

### 2. Create Folder Structure

Each page needs its own folder with `index.md`:

```bash
# Create folder
mkdir -p docs/[section]/[page-name]/

# Example:
mkdir -p docs/prevention/dashboard/explore/
```

### 3. Explore the Feature (if needed)

If documenting an existing feature:
- Navigate to the application using Chrome DevTools MCP
- Take notes on key functionality
- Identify what screenshots will be helpful
- Understand the user workflows and use cases

### 4. Write the Page

Create `index.md` with this structure:

```yaml
---
title: Page Title
sidebar_label: Page Title
---

# Page Title

Opening paragraph(s) explaining what this is and why it matters.
Write conversationally, focus on value and use cases.

## First Major Concept

Explain with examples and context...

## Second Major Concept

More explanation...

## Common Use Cases

Practical scenarios showing how users accomplish goals...

## Next Steps

- [Related page 1](/guardrails/docs/section/page1)
- [Related page 2](/guardrails/docs/section/page2)
```

**Critical rules:**
- One h1 matching frontmatter title exactly
- NO `## Overview` header - start content immediately
- Use h2 for all subsequent headers
- Write in second person (you)
- Explain WHY features matter, not just WHAT they do
- Include practical use cases and examples

### 5. Add Screenshots

If screenshots are needed:
- Invoke the `add-screenshots` workflow
- Or manually: resize viewport to 1280px width, capture, save to same directory

### 6. Update Sidebar

Add the new page to `docs/sidebar.json`:

```json
{
  "type": "category",
  "id": "section/parent",
  "items": [
    "section/existing-page",
    "section/new-page"  // Add here
  ]
}
```

**Ordering:**
- Detail pages appear immediately after their list page
- Group related pages together
- Use same labels as tab names in UI

### 7. Validate

Check:
- [ ] Folder structure: `docs/section/page-name/index.md`
- [ ] Frontmatter present with matching title/sidebar_label
- [ ] Single h1 matching frontmatter
- [ ] No `## Overview` header
- [ ] Conversational tone explaining value, not just describing UI
- [ ] Links use absolute paths `/guardrails/docs/...`
- [ ] Links omit `.md` and `index.md`
- [ ] Screenshots in same directory with relative paths `./image.png`
- [ ] Screenshots use markdown syntax `![alt](./image.png)`
- [ ] Added to sidebar.json

## Prevention-Specific Guidelines

If documenting prevention features:
- Explain security concepts, not just UI elements
- Address common workflows: finding gaps, prioritizing work, verifying coverage
- Explain relationships: Objectives vs Preventions, Layers, Types, Categories
- Use concrete examples: EBS encryption, S3 public access, SCPs
- Emphasize prevention-first approach (stop issues before they reach production)
- Avoid exhaustive "Page Layout" bullet lists
- Write in flowing prose, use bullets sparingly

## Example Outcomes

**Good:**
- Conversational tone that engages readers
- Explains why features exist and how to use them
- Includes practical scenarios and workflows
- Images show meaningful content
- Links are correct and non-repetitive

**Bad:**
- Dry bullet lists of every UI element
- Missing the "why" - just describes what's on screen
- Templated/repetitive structure
- Broken or incorrect link formats
- Missing or incorrectly formatted images
