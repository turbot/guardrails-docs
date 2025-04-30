---
title: Prompt Library
sidebar_label: Prompt Library
---

# Guardrails Documentation Prompt Library

This document serves as a collection of prompts and best practices for creating and updating Guardrails documentation. Use these prompts as templates to maintain consistency and quality across all documentation.


## Guide Types

- **guide_type as guides**
  Reference: `docs/guides`

<!-- - **guide_type as concepts**
  Reference: `docs/concepts`

- **guide_type as getting-started**
  Reference: `docs/getting-started` -->

---

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
  - Use markdown image syntax for screenshots: `![Alt text](./image.png)`
  - Place images in the same directory as the guide with descriptive filenames
  - Use descriptive filenames and alt text.
  - Example: `![Update TED Stack Screenshot](./update-ted-step1.png)`

- **Sidebar Configuration**: To make your guide visible in the documentation navigation, you need to add it to the sidebar configuration. Here's how to do it:

  > **Note:** When using Cursor or similar tools, you can copy and paste these instructions to ensure proper sidebar configuration.

  1. **Choose the correct sidebar file**:
     - For main documentation: Use `docs/sidebar.json`
     - For section-specific guides: Use the section's sidebar.json (e.g., `docs/guides/hosting-guardrails/sidebar.json`)

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
  3. **Verify the configuration**:
     - Ensure the path matches your guide's location
     - Check that the `id` value doesn't include the .md extension
     - Confirm the guide appears in the correct section of the sidebar

### Guide Structure

Each guide should include the following sections:

- **Overview**: State what the user will do with this guide, provide additional context, and explain why it matters.

- **Prerequisites**: List any prerequisites with appropriate links.

- **Steps**: Detail each step with a title starting with a verb. Include Monitor and Review steps.

- **Next Steps**: Provide links to related guides and documentation.

- **Troubleshooting**: Use a tabular format to address common issues.

### Example Reference Guide

For a complete example of a properly formatted guide, refer to:
`docs/guides/hosting-guardrails/updating-stacks/update-ted/index.md`

This guide demonstrates:
- Proper YAML frontmatter
- Clear section structure
- Image handling
- Call-out usage
- Step formatting
- Troubleshooting section

> **How to Use:**
> To create a new guide under `docs/guides`, follow the requirements and reference the example guide above.
> For automation (e.g., Cursor), reference this section by its heading and file path:
> `docs/reference/prompt/prompt-library.md` → "New Guide Prompts - under (docs/guides)"
---

## Converting Scribe Exports to Guides

> **Purpose:** This section provides instructions for converting Scribe-exported DOCX files into properly formatted Guardrails documentation.

### Scribe Export Processing Template

When working with a Scribe-exported DOCX file, use the following prompt template to convert it into a properly formatted guide:

```
Please help me create a new Guardrails guide using this Scribe export:

Input Parameters:
- DOCX Content: [Paste the content from your Scribe export]
- Target Guide Type: [guides/concepts/getting-started]
- Guide Category: [e.g., hosting-guardrails, authentication, etc.]
- Target Audience: [e.g., administrators, developers, etc.]

Required Transformations:
1. Extract and organize the content following the standard guide structure
2. Convert screenshots to proper markdown image syntax
3. Add appropriate frontmatter
4. Format all headings in AP Title Case
5. Add necessary call-outs and annotations
6. Include proper prerequisites section
7. Structure steps with clear, action-oriented titles
```
### Processing Instructions

1. **Content Extraction**
   - Copy the raw content from the Scribe DOCX file
   - Remove any Scribe-specific formatting or metadata
   - Identify key sections and steps

2. **Image Processing**
   - Extract images from the DOCX file
   - Save them following the image guidelines
   - Update image references to use proper markdown syntax
   - Add descriptive alt text

3. **Structure Alignment**
   - Reorganize content to match the standard guide structure as mentioned [New Guide Prompts](#new-guide-prompts---docsguides)


**Quick Checklist:**

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


<!-- ## New Concepts - (`docs/concepts`)

Add prompts for creating new conceptual guides here -->

<!-- ## New Getting Started -  (`docs/getting-started`)

Add prompts for creating new getting started guides here -->

## Updating Existing Guides


## Best Practices

1. **Consistency**
   - Use consistent terminology
   - Follow established formatting
   - Maintain uniform structure
   - Use standard templates

2. **Clarity**
   - Write clear, concise instructions
   - Use simple language
   - Include examples
   - Add visual aids

3. **Completeness**
   - Cover all necessary steps
   - Include prerequisites
   - Address common issues
   - Provide next steps

4. **Maintenance**
   - Regular content reviews
   - Update outdated information
   - Remove deprecated features
   - Add new best practices

---

## Image Guidelines

1. **File Organization**
   - Store images in appropriate folders
   - Use descriptive filenames
   - Maintain consistent naming conventions
   - Update image references in guides

2. **Image Quality**
   - Use high-resolution screenshots
   - Maintain consistent styling
   - Add appropriate annotations
   - Optimize file size

3. **Accessibility**
   - Add alt text
   - Use appropriate contrast
   - Include text descriptions
   - Consider color blindness

---

## Review Checklist

Before publishing any guide, ensure:
- [ ] Content is accurate and up-to-date
- [ ] Structure follows standards
- [ ] Images are properly placed and referenced
- [ ] Links are working
- [ ] Code examples are tested
- [ ] Prerequisites are clearly stated
- [ ] Next steps are provided
- [ ] Common issues are addressed
- [ ] Best practices are included


Converted New Guide Format:
```markdown
---
title: Update TED Stack
guide_type: hosting-guardrails
sidebar_label: Update TED Stack
---

# Update TED Stack

## Overview
This guide walks you through the process of updating your TED stack configuration in Guardrails.

## Prerequisites
- Access to the Guardrails workspace
- Sufficient permissions to update stacks
- Backup of current configuration

## Steps

1. Navigate to TED Stack
   Access the TED Stack section in your Guardrails console.

2. Initiate Update Process
   Click the **Update** button to begin the process.

3. Upload Configuration
   ![Upload Configuration File](./images/update-ted-config.png)
   Select and upload your new configuration file.

4. Apply Changes
   ![Apply Configuration Changes](./images/apply-ted-changes.png)
   Review the changes and click **Apply** to implement the update.

## Next Steps
[Add relevant next steps...]

## Troubleshooting
[Add common issues and solutions...]
```

### Best Practices for Scribe Conversions

1. **Content Enhancement**
   - Add context and explanations beyond the basic steps
   - Include relevant warnings or notes
   - Expand prerequisites based on domain knowledge

2. **Image Optimization**
   - Crop screenshots to focus on relevant areas
   - Add annotations where needed
   - Ensure consistent image sizing

3. **Technical Accuracy**
   - Verify all commands and steps
   - Add technical prerequisites
   - Include version information if relevant

4. **User Experience**
   - Add estimated time for completion
   - Highlight important notes or warnings
   - Include troubleshooting tips

> **Note:** Always review the final guide against the documentation standards and ensure all sections are properly formatted and complete.