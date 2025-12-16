# Batch Edit Helper

When you need to make the same type of change across multiple files, this skill helps plan and execute the changes systematically.

## When to Use

- Terminology changes across multiple files
- Section title standardization
- Link updates after restructuring
- Formatting consistency improvements

## Process

1. **Planning Phase**
   - Use Grep to find all instances
   - Categorize instances (preserve vs replace)
   - Identify edge cases
   - Create todo list with one item per file

2. **Execution Phase**
   - Read each file before editing
   - Make replacements systematically
   - Update todo list after each file
   - Track progress visibly

3. **Verification Phase**
   - Use git diff to review changes
   - Check for unintended replacements
   - Verify links still work
   - Commit with detailed message

## Best Practices

- Always use Grep first to understand scope
- Read files before editing (required by Edit tool)
- Make one logical change per commit
- Use todo list to track progress across files
- Group related changes together
- Provide detailed commit messages explaining rationale

## Example

User: "Replace all instances of 'foo' with 'bar' in the docs"

1. Grep for 'foo' to see all uses
2. Categorize: generic foo (replace) vs FooClass (preserve) vs foo() (evaluate)
3. Create todo list with each file
4. Execute replacements file by file
5. Commit with explanation of what was changed and why
