---
description: Analyze and standardize section titles across documentation pages
---

You are analyzing documentation to identify inconsistent section titles and propose standardization.

## Process

1. **Scan the specified documentation directory** for common section patterns
2. **Identify variants** of similar sections:
   - "Common Tasks" vs "Common Use Cases" vs "Use Cases" vs "Using X"
   - "Getting Started" vs "Quick Start" vs "Starting Out"
   - "Configuration" vs "Setup" vs "Setting Up"
3. **Count occurrences** of each variant
4. **Propose a standard** based on:
   - Most common usage
   - Clarity and scannability
   - Consistency with existing conventions
5. **Present findings** with:
   - Current state (all variants found)
   - Recommended standard
   - Files that need updating
   - Example transformations

## Output Format

Provide a structured report:
- Section name variants found
- Frequency of each variant
- Recommended standard title
- List of files needing updates
- Risk assessment (breaking changes, link updates needed, etc.)

## Example Usage

When user runs `/standardize-sections docs/prevention`, analyze all prevention docs for section title inconsistencies and propose standardization.
