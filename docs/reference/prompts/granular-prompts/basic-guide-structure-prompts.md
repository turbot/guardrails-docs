# Basic New Guide Structure Prompt

Create a Guardrails guide titled "{GUIDE_TITLE}" with guide_type "{GUIDE_TYPE}" in "{BASE_LOCATION}/{NEW_GUIDE_FOLDER_NAME}" following these requirements:

1. Structure:
   - File i.e. index.md be placed in {BASE_LOCATION}/{NEW_GUIDE_FOLDER_NAME}"
   - YAML frontmatter (title, sidebar_label, guide_type)
   - H1 title matching frontmatter
   - Overview (no heading) explaining what, why, and how
   - Prerequisites section with necessary items
   - Step sections (5 words or less, starting with verbs)
   - Monitor or Review steps
   - Next Steps section
   - Troubleshooting table

2. Style:
   - Second-person voice ("you")
   - Bold UI elements: **Button Name** and **Tab Names**
   - Code and input in backticks: `example-input`
   - GitHub-style call-outs: > [!NOTE], > [!TIP], etc.

3. File naming:
   - Use kebab-case for filename ({guide-name}.md)
   - Match URL structure

4. Image Related:

   - Provide correct relative path
   - Place images in the same directory as the guide with descriptive filenames i.e. All images be placed in {BASE_LOCATION}/{NEW_GUIDE_FOLDER_NAME}/{descriptive-file-name}"
  - Image file type should be .png or .jpg
  -  Generate proper markdown image syntax as example  `![Verify Status](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/update-ted/cfn-ted-update-complete.png)`

The guide should walk users through {BRIEF_DESCRIPTION_OF_TASK}.