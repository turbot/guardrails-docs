# Documentation Skill

You are an expert at writing and maintaining documentation for Turbot Guardrails. This skill helps you create, update, and review documentation following the project's style guidelines and best practices.

## Context Files

Before performing any documentation task, familiarize yourself with these guides:

- **[Style Guide](context/style.md)** - Complete formatting, structure, and style rules
- **[Prevention Guide](context/prevention.md)** - Prevention-specific concepts and guidance

## When This Skill Applies

This skill activates when the user is:
- Writing or editing markdown documentation files
- Adding or updating screenshots
- Fixing formatting or link issues
- Reviewing documentation for compliance
- Asking about documentation standards or structure
- Working on files in the `docs/` directory

## Routing Logic

Based on the user's intent, route to the appropriate workflow:

### Creating New Documentation
**Trigger words:** "write", "create", "add new page", "document"
→ Use `workflows/new-page.md`

### Adding Screenshots
**Trigger words:** "screenshot", "add image", "take a picture", "capture"
→ Use `workflows/add-screenshots.md`

### Fixing Links
**Trigger words:** "fix links", "update links", "broken links", "link format"
→ Use `workflows/fix-links.md`

### Reviewing Documentation
**Trigger words:** "review", "check", "validate", "audit", "compliance check"
→ Use `workflows/review.md`

### General Questions
If the user asks about style, structure, or best practices, answer directly using the context files.

## Core Principles

When working on documentation:

1. **Conversational Tone**: Write naturally, explain WHY things matter, not just WHAT they are
2. **Image Management**:
   - Store in same directory as markdown
   - Use markdown syntax `![alt](./image.png)`
   - Must resize browser to 1280px width before taking screenshots
3. **Link Format**:
   - Absolute paths starting with `/guardrails`
   - Omit `.md` extensions and `index.md`
4. **Structure**:
   - Each page in its own folder as `index.md`
   - All images for that page in the same folder
5. **Headers**:
   - One h1 matching frontmatter title
   - No `## Overview` header
   - Start content immediately after h1

## Working with Prevention Documentation

When documenting the Prevention section:
- Focus on explaining security concepts, not just UI elements
- Address common use cases (finding gaps, prioritizing work, testing controls)
- Explain the relationship between Objectives, Preventions, Layers, and Categories
- Use real examples (EBS encryption, S3 public access, etc.)
- Emphasize prevention-first security (stop issues before they reach production)

## Quick Reference

**DO:**
- Write conversationally with purpose and context
- Explain capabilities and why they matter
- Include practical scenarios and use cases
- Use markdown image syntax and relative paths
- Use absolute link paths with `/guardrails` prefix

**DON'T:**
- Create exhaustive "Page Layout" bullet lists
- Just describe UI without explaining value
- Repeat the same link multiple times in a section
- Use HTML `<img>` tags (except when size specification needed)
- Use relative link paths or include `.md` extensions

## Example Invocations

- "Write a new page documenting the prevention dashboard"
- "Add screenshots to the simulator documentation"
- "Fix all the links in the prevention section"
- "Review the objectives documentation for style compliance"
- "How should I format images in the docs?"
- "What's the correct link format for cross-references?"
