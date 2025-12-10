# Documentation Skill

This skill helps Claude Code write and maintain Turbot Guardrails documentation following the project's style guidelines and best practices.

## Structure

```
docs/
├── skill.md                    Main skill with routing logic
├── context/
│   ├── style.md               Complete formatting and structure rules
│   └── prevention.md          Prevention-specific documentation guidance
└── workflows/
    ├── new-page.md            Create new documentation pages
    ├── add-screenshots.md     Add/update screenshots
    ├── fix-links.md           Fix link formatting issues
    └── review.md              Review documentation for compliance
```

## How It Works

### Main Skill (skill.md)

The main skill file:
- Detects when you're working on documentation
- Recognizes your intent based on keywords
- Routes to the appropriate workflow
- Answers general questions about documentation standards

**Automatic activation** when:
- Working on files in the `docs/` directory
- Asking about documentation structure or standards
- Requesting doc-related tasks

**Manual invocation**: Just ask for documentation help and Claude Code will use this skill

### Context Files

**context/style.md** - Complete style guide including:
- Image management (markdown syntax, sizing, placement)
- Link formatting (absolute paths, no extensions)
- Document structure (frontmatter, headers, organization)
- Writing style (tone, voice, best practices)
- Code and UI element formatting
- File naming conventions

**context/prevention.md** - Prevention-specific guidance:
- Core concepts (Objectives, Preventions, Layers, Categories)
- Prevention-first security approach
- Documentation tone and style for prevention features
- Common use cases to address
- Section-specific guidance

### Workflows (Commands)

Each workflow is a focused task with step-by-step guidance:

**new-page.md** - Creating documentation pages:
1. Understand requirements
2. Create folder structure
3. Explore feature (if needed)
4. Write content with proper structure
5. Add screenshots
6. Update sidebar
7. Validate against checklist

**add-screenshots.md** - Screenshot workflow:
1. Identify what to capture
2. Navigate to page
3. Resize viewport to 1280px width
4. Set up view
5. Take screenshot
6. Add to documentation with proper markdown

**fix-links.md** - Link formatting fixes:
1. Identify scope
2. Read files
3. Find link issues (relative paths, extensions, duplicates)
4. Fix each issue
5. Verify corrections
6. Report changes

**review.md** - Documentation review:
1. Identify scope
2. Read files
3. Check against comprehensive checklist
4. Document findings
5. Fix or report issues
6. Provide summary

## Usage Examples

### Creating New Documentation

```
User: "Write a new page documenting the prevention simulator"
Claude: Uses skill.md routing → invokes new-page.md workflow
→ Creates folder structure
→ Explores simulator feature
→ Writes documentation
→ Adds screenshots
→ Updates sidebar
```

### Adding Screenshots

```
User: "Add screenshots to the recommendations page"
Claude: Uses skill.md routing → invokes add-screenshots.md workflow
→ Navigates to page
→ Resizes viewport to 1280px
→ Takes screenshots
→ Saves to correct directory
→ Adds markdown with relative paths
```

### Fixing Links

```
User: "Fix all the links in the prevention section"
Claude: Uses skill.md routing → invokes fix-links.md workflow
→ Reads all files in section
→ Identifies link issues
→ Fixes relative paths, extensions, duplicates
→ Reports changes
```

### Reviewing Documentation

```
User: "Review the objectives documentation for style compliance"
Claude: Uses skill.md routing → invokes review.md workflow
→ Reads files
→ Checks against full checklist
→ Reports issues by severity
→ Offers to fix or provides guidance
```

### General Questions

```
User: "How should I format images in the docs?"
Claude: Uses skill.md directly → references context/style.md
→ Explains markdown syntax
→ Describes sizing requirements
→ Shows viewport resizing steps
```

## Key Features

✅ **Automatic Intent Detection**: Understands what you want to do based on your request

✅ **Context-Aware**: References style and prevention guidelines automatically

✅ **Step-by-Step**: Workflows provide clear, ordered steps for each task

✅ **Validation**: Built-in checklists ensure compliance with standards

✅ **Flexible**: Can execute workflows or answer general questions

✅ **Comprehensive**: Covers creation, updating, fixing, and reviewing

## Advantages Over Prompt Files

**Before (prompts directory):**
- Static files that had to be manually referenced
- No automatic routing or intent detection
- Unclear which prompt to use for which task
- No modular organization

**Now (skill system):**
- Automatic activation when working on docs
- Intent-based routing to appropriate workflow
- Clear separation of concerns (context vs workflows)
- Modular, reusable components
- Better discoverability

## Testing the Skill

Try these commands to test the skill:

1. "Write a new page about [feature]"
2. "Add screenshots to [page]"
3. "Fix the links in [section]"
4. "Review [page] for style compliance"
5. "How should I structure documentation pages?"
6. "What's the correct format for internal links?"

The skill should automatically activate and route to the appropriate workflow or answer your question directly.

## Maintenance

When updating documentation standards:

1. **Style changes**: Update `context/style.md`
2. **Prevention guidance**: Update `context/prevention.md`
3. **Workflow improvements**: Update specific workflow files
4. **Routing logic**: Update `skill.md`

All workflows automatically reference the latest context files, so updating guidelines once applies everywhere.

## Related Documentation

- **Project instructions**: `/CLAUDE.md` - General guidance for working in this repository
- **Human-readable style guide**: `/style.md` - Original style guide for reference
- **Deprecated prompts**: `/prompts/` - Old prompt files kept for reference

## Future Enhancements

Potential additions:
- **Agent for bulk review**: Review multiple pages in parallel
- **Link validation agent**: Check all links across entire docs
- **Screenshot update agent**: Refresh all screenshots automatically
- **Consistency checker**: Ensure similar pages follow similar structure
