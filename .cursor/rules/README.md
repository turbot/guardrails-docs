# Turbot Markdown Validator Pack

## Includes

- ✅ `.cursorrules` to guide Cursor AI generation
- ✅ Custom markdownlint rules to enforce doc format
- ✅ GitHub Action to validate PRs
- ✅ Works with pre-commit if needed

## Setup

1. Copy to your repo root:
   - `.cursorrules`
   - `.markdownlint.json`
   - `.markdownlint/custom-turbot-markdown-rules.js`
   - `.github/workflows/markdown-lint.yml`

2. Install markdownlint locally (optional):
```bash
npm install -g markdownlint-cli2
```

3. Run validation:
```bash
markdownlint-cli2 '**/*.md'
```

4. See GitHub PR checks run automatically

**Note:** Here the workflow is designed to only capture the changed .md file.

 What `markdown-lint-pr-only` Does?

   - Runs only on Pull Requests to main
   - Installs markdownlint-cli2
   - Detects .md files changed in the PR
   - Lints only those files using your custom
   rules
   - Skips unrelated or legacy .md files