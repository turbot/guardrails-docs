---
title: Prompt Library
sidebar_label: Prompt Library
---

# Guardrails Documentation Prompt Library

This document serves as a collection of prompts and best practices for creating and updating Guardrails documentation. Use these prompts as templates to maintain consistency and quality across all documentation.


## Guide Types

- **guide_type as guides**
  Reference: `docs/guides`


## New Guide Prompts - (`docs/guides`)

> **Purpose:** This section provides guidelines specifically for creating documentation for the Turbot Guardrails product.

When creating a new guide under `docs/guides/`, follow these requirements and best practices:

- **YAML Frontmatter**: All guides must include YAML frontmatter with at least the following fields:
  - `title`
  - `sidebar_label`
  - `guide_type`

- **Main Heading**:
  - The main heading (`#`) must match the `title` and `sidebar_label` exactly.

- **Section Headers**:
  - Use AP Title Case for all section headers. Ensure consistent capitalization in headers and titles.
  - Ensure step section titles are 5 words or less and start with a verb as applciable

- **Style requirements**:
  - Bold UI elements: **Button Name**, **Tab Names**
  - Use backticks for code and input text: `example-input`
  - Link terms to glossary on first mention
  - Use GitHub-style blockquote call-outs: > [!NOTE], > [!TIP], > [!IMPORTANT], etc.

- **Images**:
  - Place images in the same directory as the guide with descriptive filenames
  - Use descriptive filenames and alt text.
  - Example: `![Verify Status](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/update-ted/cfn-ted-update-complete.png)`

- **Sidebar Configuration**: To make your guide visible in the documentation navigation, you need to add it to the sidebar configuration. Here's how to do it:

  1. **Choose the correct sidebar file**:
     - For main documentation: Use `docs/sidebar.json` in case the parent folder does not contain it's specific sidebar.json
     - For section-specific guides: Use the section's sidebar.json (e.g., `docs/guides/aws/aws-sidebar.json`)
     - Add the same reference in main sidebar.json as below as example
      ```
      {
         "type": "placeholder",
         "file": "guides/aws/aws-sidebar.json"
      }
      ```

  2. **Add your guide to the sidebar**:
     - Open the appropriate sidebar.json file
     - Find the relevant section where your guide should appear
     - Add a new entry using this format:
       ```json
       {
         "type": "doc",
         "id": "path/to/your/guide"
       }
       ```
     - Replace `path/to/your/guide` with your guide's path (without the .md extension)
     - Example: If your guide is at `docs/guides/hosting-guardrails/updating-stacks/update-ted.md`, use:
       ```json
       {
         "type": "doc",
         "id": "guides/hosting-guardrails/updating-stacks/update-ted"
       }
       ```

## Guide Structure

Each guide should include the following sections for guide_type as guide


3. Structure the guide with these sections:
   - Step-by-step instructions with numbered step headings (each starting with a verb)
   - Review step: What to verify after completion
   - Next Steps: Related guides and documentation
   - Troubleshooting: Common issues in a tabular format


- **Overview** (no heading): State what the user will do with this guide, provide additional context, and explain why it matters.

- **Prerequisites**: Required access, permissions, and resources. Provide general available public links.

- **Steps**: Detail each step with a title starting with a verb. Steps must use `## Step X: <Action>` format and be clear, actionable, and numbered.

- **Review Step X**: What to verify after completion, It should be after all main steps.

<!-- Challenge is when we generate the images using scribe, how we make cursor know which one should be included as review steps, mean this has to be edited during the SOP creation at scribe? -->

- **Next Steps**: Provide links to related guides and documentation. This should match the purpose of existing guide and publicly matching references.

- **Troubleshooting**: Use a tabular format to address common issues. Refer the common format from docs/guides/hosting-guardrails/updating-stacks/update-ted/index.md > ## Troubleshooting.

## Example Reference Guide Format:

Refer Update TED Stack in docs/guides/hosting-guardrails/updating-stacks/update-ted/index.md


## Quick Checklist:

- [ ] YAML frontmatter with `title`, `sidebar_label`, and `guide_type`
- [ ] Main heading matches frontmatter exactly
- [ ] Overview section without heading
- [ ] Prerequisites section with all requirements
- [ ] Step sections with numbered headings starting with verbs
- [ ] Step sections are 5 words or less
- [ ] Monitor and Review steps included
- [ ] Next Steps with relevant links
- [ ] Troubleshooting section with table format
- [ ] GitHub-style blockquote call-outs used where appropriate
- [ ] UI elements in bold: **Button Name**
- [ ] Code and input text in backticks: `example-input`
- [ ] Images in correct location with descriptive alt text
- [ ] File follows kebab-case naming convention


