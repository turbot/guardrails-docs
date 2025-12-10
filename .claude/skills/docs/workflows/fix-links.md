# Fix Links Workflow

You are fixing link formatting issues in Turbot Guardrails documentation to match the project's standards.

## Reference Context

Review `../context/style.md` for complete link formatting rules.

## Link Format Rules

**MUST follow these exactly:**

1. **Use absolute paths starting with `/guardrails`:**
   - ✅ `[Dashboard](/guardrails/docs/prevention/dashboard)`
   - ❌ `[Dashboard](./dashboard)` or `[Dashboard](dashboard.md)`

2. **Omit file extensions:**
   - ✅ `[Preventions](/guardrails/docs/prevention/preventions)`
   - ❌ `[Preventions](/guardrails/docs/prevention/preventions.md)`

3. **Omit `index.md` for directory pages:**
   - ✅ `[Dashboard](/guardrails/docs/prevention/dashboard)`
   - ❌ `[Dashboard](/guardrails/docs/prevention/dashboard/index)`

4. **Include filename for non-index pages:**
   - ✅ `[Explore](/guardrails/docs/prevention/dashboard/explore)`
   - ✅ `[Detail](/guardrails/docs/prevention/preventions/detail)`

5. **Link once per section maximum:**
   - Don't repeat the same link multiple times in the same section
   - Makes text unreadable with too many hyperlinks

## Workflow Steps

### 1. Identify the Scope

Ask the user:
- Which file(s) need link fixes?
- Specific pages or entire directory?
- Any particular link issues they've noticed?

### 2. Read the File(s)

Use the Read tool to get the current content:

```
Read: /Users/jsmyth/src/guardrails-docs/docs/[section]/[page]/index.md
```

### 3. Identify Link Issues

Common problems to look for:

**Relative paths:**
```markdown
❌ [page](./page)
❌ [page](../other/page)
❌ [page](page.md)
```

**File extensions:**
```markdown
❌ [page](/guardrails/docs/section/page.md)
❌ [page](/guardrails/docs/section/index.md)
```

**Incorrect index references:**
```markdown
❌ [Dashboard](/guardrails/docs/prevention/dashboard/index)
```

**Repeated links in same section:**
```markdown
## Section

[Objectives](/guardrails/docs/prevention/objectives) are important.
You can view [Objectives](/guardrails/docs/prevention/objectives) in the UI.
The [Objectives](/guardrails/docs/prevention/objectives) page shows...
```

### 4. Fix Each Issue

Use the Edit tool to fix links:

**Fix relative paths to absolute:**
```markdown
# Before
[Explore](./explore)

# After
[Explore](/guardrails/docs/prevention/dashboard/explore)
```

**Remove .md extensions:**
```markdown
# Before
[Preventions](/guardrails/docs/prevention/preventions.md)

# After
[Preventions](/guardrails/docs/prevention/preventions)
```

**Remove index.md references:**
```markdown
# Before
[Dashboard](/guardrails/docs/prevention/dashboard/index)

# After
[Dashboard](/guardrails/docs/prevention/dashboard)
```

**De-duplicate repeated links:**
Keep first occurrence, remove subsequent ones in same section:
```markdown
# Before
## Understanding Objectives

[Objectives](/guardrails/docs/prevention/objectives) help you track security goals.
The [Objectives](/guardrails/docs/prevention/objectives) page shows your progress.
Click [Objectives](/guardrails/docs/prevention/objectives) to see details.

# After
## Understanding Objectives

[Objectives](/guardrails/docs/prevention/objectives) help you track security goals.
The Objectives page shows your progress.
Click Objectives to see details.
```

### 5. Determine Correct Paths

To construct the correct path:

1. Start with `/guardrails/docs/`
2. Add section: `prevention/`, `guides/`, `concepts/`, etc.
3. Add subsection(s): `dashboard/`, `objectives/`, etc.
4. For directory index: stop there
5. For specific page: add filename without .md

**Examples:**
```
Directory index:
- File: docs/prevention/dashboard/index.md
- Link: /guardrails/docs/prevention/dashboard

Specific page:
- File: docs/prevention/dashboard/explore/index.md
- Link: /guardrails/docs/prevention/dashboard/explore

Detail page:
- File: docs/prevention/objectives/objective-detail/index.md
- Link: /guardrails/docs/prevention/objectives/objective-detail
```

### 6. Verify Fixed Links

Check each fixed link:
- [ ] Starts with `/guardrails/docs/`
- [ ] No `.md` extension
- [ ] No `index` or `index.md`
- [ ] Path matches file structure
- [ ] Not repeated in same section

### 7. Test (if possible)

If you can test:
- Click links to verify they work
- Check that anchor links (`#heading`) work
- Verify external links open correctly

## Common Patterns

### Prevention Section Links

```markdown
✅ [Dashboard](/guardrails/docs/prevention/dashboard)
✅ [Objectives](/guardrails/docs/prevention/objectives)
✅ [Benchmarks](/guardrails/docs/prevention/objectives/benchmarks)
✅ [Priorities](/guardrails/docs/prevention/objectives/priorities)
✅ [Preventions](/guardrails/docs/prevention/preventions)
✅ [Types](/guardrails/docs/prevention/preventions/types)
✅ [Recommendations](/guardrails/docs/prevention/objectives/recommendations)
✅ [Simulator](/guardrails/docs/prevention/simulator)
```

### Guides Section Links

```markdown
✅ [AWS Guides](/guardrails/docs/guides/aws)
✅ [Azure Guides](/guardrails/docs/guides/azure)
✅ [GCP Guides](/guardrails/docs/guides/gcp)
```

### Concepts Section Links

```markdown
✅ [Controls](/guardrails/docs/concepts/controls)
✅ [Policies](/guardrails/docs/concepts/policies)
✅ [Resources](/guardrails/docs/concepts/resources)
```

## Batch Fixing

If fixing multiple files:

1. Read all files first
2. Create a fix plan
3. Show user what will change
4. Fix one file at a time using Edit tool
5. Verify each fix before moving to next

## Report Changes

After fixing, summarize for the user:
- How many files were updated
- Types of issues fixed (relative paths, extensions, duplicates)
- Any issues that couldn't be fixed automatically
- Suggestions for prevention

## Example Complete Flow

```
1. User: "Fix all links in the prevention objectives folder"

2. Read files:
   - docs/prevention/objectives/index.md
   - docs/prevention/objectives/benchmarks/index.md
   - docs/prevention/objectives/priorities/index.md
   - etc.

3. Identify issues:
   - benchmarks/index.md has relative link: [Objectives](../objectives)
   - priorities/index.md has .md extension: [Categories](/guardrails/docs/prevention/objectives/categories.md)
   - objectives/index.md repeats link 3 times in same section

4. Fix issues:
   - Edit benchmarks/index.md: change to [Objectives](/guardrails/docs/prevention/objectives)
   - Edit priorities/index.md: remove .md extension
   - Edit objectives/index.md: keep first link, remove duplicates

5. Report:
   - Fixed 3 files
   - Corrected 1 relative path
   - Removed 1 file extension
   - De-duplicated 2 links
   - All links now follow project standards
```
