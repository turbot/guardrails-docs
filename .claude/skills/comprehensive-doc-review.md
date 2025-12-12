# Comprehensive Documentation Review Skill

Performs a thorough, multi-phase review of documentation sections including spelling, grammar, images, links, structure, and content quality.

## When to Use This Skill

Use this skill when the user requests:
- "comprehensive review" of documentation
- "thorough review" or "complete audit"
- Checking for spelling, grammar, broken links, missing images
- Verifying documentation consistency and quality
- Multi-phase review with interactive approval

## Review Phases

### Phase 1: Structural Inventory
**Goal**: Understand what exists and identify missing/unused resources

Tasks:
1. List all markdown files in the target section
2. List all image files (png, jpg, gif, jpeg)
3. Identify any orphaned pages (not in sidebar)
4. Identify any unused images (not referenced in any markdown)
5. Check for duplicate/redundant pages

**Outputs**:
- File inventory report
- Orphaned resources list
- Recommendations for cleanup

### Phase 2: Content Validation
**Goal**: Verify all references are valid and resources exist

Tasks:
1. Check that all image references point to existing files
2. Extract and validate all internal links
3. Check for broken fragments (#anchors)
4. Verify external links (if applicable)
5. Test sample links on localhost:3000/guardrails/docs

**Outputs**:
- Broken references report
- Link validation results
- Suggested fixes

### Phase 3: Spelling & Grammar
**Goal**: Identify typos, grammatical errors, and awkward phrasing

Tasks:
1. Review each file for spelling errors
2. Check for common grammar mistakes
3. Identify inconsistent terminology
4. Flag awkward or unclear sentences
5. Check for proper capitalization of product names

**Outputs**:
- Spelling/grammar issues by file
- Terminology inconsistencies
- Writing quality recommendations

### Phase 4: Structure & Formatting
**Goal**: Ensure docs follow style guidelines

Tasks:
1. Verify frontmatter presence and format
2. Check h1 matches title/sidebar_label
3. Verify no "## Overview" headers
4. Check heading hierarchy (no skipped levels)
5. Verify image syntax (markdown vs HTML)
6. Check link format (absolute paths, no .md extensions)
7. Verify code blocks have language tags

**Outputs**:
- Style violations by file and line
- Formatting fixes needed
- Compliance score per file

### Phase 5: Content Quality
**Goal**: Assess comprehensiveness, clarity, and usefulness

Tasks:
1. Check parent pages are overviews with links
2. Check detail pages have comprehensive content
3. Verify "Common Use Cases" sections exist and follow format
4. Check for "Next Steps" sections with working links
5. Assess tone (conversational vs robotic)
6. Verify practical examples are present
7. Check for duplicate content between parent/child pages

**Outputs**:
- Content quality assessment per file
- Missing sections report
- Improvement recommendations

### Phase 6: Prevention-Specific Checks
**Goal**: Ensure prevention docs follow domain-specific guidelines

Tasks:
1. Verify terminology (prevention vs control usage)
2. Check that security concepts are explained, not just UI
3. Verify common workflows are addressed
4. Check for concrete examples (EBS encryption, S3, etc.)
5. Verify emphasis on prevention-first approach
6. Check no exhaustive UI field listings

**Outputs**:
- Prevention-specific compliance report
- Terminology corrections needed
- Content depth assessment

## Interactive Review Process

For each phase:
1. **Present findings** to user with:
   - Summary of issues found
   - Severity levels (critical, important, minor)
   - Suggested fixes with examples

2. **Get user approval** for:
   - Which issues to fix automatically
   - Which to skip or handle manually
   - Whether to proceed to next phase

3. **Apply fixes** based on approval:
   - Make changes one file at a time
   - Show what was changed
   - Allow user to review before committing

## Severity Levels

**Critical (must fix)**:
- Broken image paths
- Broken internal links
- Missing frontmatter
- Wrong folder structure
- Missing required sections

**Important (should fix)**:
- Spelling errors
- Grammar mistakes
- Inconsistent terminology
- Wrong link format (relative paths, .md extensions)
- HTML image tags without reason
- Missing alt text
- "## Overview" headers

**Minor (nice to fix)**:
- Could improve alt text descriptions
- Writing could be more conversational
- Missing some examples
- Inconsistent capitalization
- Repeated links in same section

## Browser Testing for Links

When validating links against localhost:3000:
1. Use mcp__chrome-devtools tools to open pages
2. Navigate to http://localhost:3000/guardrails/docs/[path]
3. Check that page loads without 404
4. Verify images render correctly
5. Test navigation links work

## Report Format

For each phase, provide a structured report:

```markdown
# Phase [N]: [Phase Name]

## Summary
- Files reviewed: [count]
- Issues found: [count by severity]
- Time to fix: [estimate]

## Critical Issues
[List with file:line references and fixes]

## Important Issues
[List with file:line references and fixes]

## Minor Issues
[List with file:line references and fixes]

## Recommendations
[Improvement suggestions]

## Proposed Actions
1. [Action with estimated impact]
2. [Action with estimated impact]

Would you like me to proceed with these fixes?
```

## Usage Example

```
User: Perform comprehensive review of prevention docs
Claude: I'll perform a comprehensive 6-phase review of the prevention documentation. Let me start with Phase 1: Structural Inventory.

[Proceeds through each phase systematically, presenting findings and getting approval before fixes]
```

## Tools Required

- **Read**: Read markdown files
- **Glob**: Find files by pattern
- **Grep**: Search for patterns in files  
- **Bash**: Run commands to count, list, check files
- **Edit**: Fix issues in files
- **mcp__chrome-devtools**: Test links in browser

## Key Checks Per Phase

### Phase 1 Checks
```bash
# List all markdown files
find docs/prevention -name "*.md"

# List all images
find docs/prevention -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" \)

# Check for unused images (not referenced in any .md file)
# For each image, grep all markdown files for that image name
```

### Phase 2 Checks
```bash
# Extract image references from markdown
grep -h "!\[.*\](" docs/prevention/**/*.md
grep -h '<img.*src=' docs/prevention/**/*.md

# Extract internal links
grep -h "\[.*\](/guardrails" docs/prevention/**/*.md

# Check each image file exists
# Check each link path maps to existing markdown file
```

### Phase 3 Checks
- Common misspellings: guarentee, occured, seperate, recieve, etc.
- Grammar: its vs it's, your vs you're, affect vs effect
- Terminology consistency (prevention vs control, etc.)
- Product names: Turbot Guardrails, AWS, Azure, GCP (capitalized correctly)

### Phase 4 Checks
```bash
# Check frontmatter
grep -A 3 "^---$" docs/prevention/**/*.md

# Check for ## Overview headers
grep "^## Overview" docs/prevention/**/*.md

# Check for HTML img tags
grep "<img" docs/prevention/**/*.md

# Check for relative links
grep "\](\.\./" docs/prevention/**/*.md

# Check for .md extensions in links
grep "\.md)" docs/prevention/**/*.md
```

### Phase 5 Checks
- Parent pages (index.md files at category level) should be brief overviews
- Detail pages should have comprehensive content (3+ sections)
- "Common Use Cases" sections should exist on detail pages
- "Next Steps" sections should link to related pages
- Check for conversational vs robotic tone
- Verify practical examples exist

### Phase 6 Checks
```bash
# Check for generic "control" usage (should be "prevention")
grep -n "\bcontrol\b" docs/prevention/**/*.md | grep -v "Service Control Policy" | grep -v "Guardrails control"

# Look for UI description without value explanation
# Check for concrete examples (EBS, S3, etc.)
```

## Success Criteria

A successful comprehensive review will:
1. ✅ Identify all structural issues (missing files, broken references)
2. ✅ Find and fix all spelling/grammar errors
3. ✅ Verify all images exist and are used
4. ✅ Confirm all links work (tested in browser)
5. ✅ Ensure consistent structure and formatting
6. ✅ Validate content quality and comprehensiveness
7. ✅ Verify prevention-specific terminology and approach

## Output

At the end of all phases, provide:
1. **Summary report** with total issues found and fixed
2. **Remaining issues** that need manual attention
3. **Quality score** for each file (A-F grade)
4. **Overall assessment** of documentation health
5. **Recommendations** for future improvements
