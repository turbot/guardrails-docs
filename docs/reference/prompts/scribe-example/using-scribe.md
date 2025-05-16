---
title: Using Scribe Exports
sidebar_label: Using Scribe Exports
---

# Converting Scribe DOCX Exports to Guides

> **Purpose:** This section provides instructions for extracting content from Scribe-exported DOCX files to create Guardrails documentation.

## Step 1: Extract Content from Scribe Export

Use this prompt template with Cursor to extract and structure the content:

```
Please help me extract and structure content from this Scribe export:

Input Parameters:
- Guide Title: [Your guide title]
- Guide Category: [e.g., hosting-guardrails, authentication, etc.]
- Target Path: docs/guides/<category>/<guide-name>/index.md

Scribe Export Content:
[Paste the content from your Scribe export here]

Required Actions:
1. Extract all text content
2. Identify and list all images
3. Structure the content into sections:
   - Overview
   - Prerequisites
   - Steps
   - Next Steps
   - Troubleshooting
```


## Next Steps

After extracting the content and images, follow the guide creation process in:
`docs/reference/prompt/prompt-new-guide.md`

> **Note:** The extracted content will need to be formatted according to the standards in the new guide template.