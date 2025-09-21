
# Documentation Style Guide

This document provides guidance on writing user documentation for Turbot's public sites, including:
  - https://turbot.com/pipes/docs
  - https://turbot.com/guardrails/docs
  - https://steampipe.io/docs
  - https://powerpipe.io/docs
  - https://flowpipe.io/docs

## General

- Usually, write in the second person (you). Tutorials may occasionally use 3rd person plural to feel collaborative (`Let's get started`, etc).:
  - Good:
    - `You can save a snapshot by clicking the camera icon`
    - `Click the camera icon to save a snapshot`
    - `Let's get started`
  - Bad:
    - `One may save a snapshot by clicking the camera icon`
    - `A user can click the camera icon to save a snapshot`

- Stay in markdown where possible; use HTML only where necessary:
  - prefer `![](/link/to/img)` over `<img src="/link/to/img" />`.
    - You may need to use the `<img>` tag to specify an image size for an image that is not full screen (like a modal), but for full-screen images, use markdown and don't specify the size.
  - use HTML `<table>` only when you absolutely have to, because all the nested elements then have to be HTML - you cant use markdown inside an HTML table like you can in a markdown table.

- Prefer example-driven guides and tutorials where people can learn by doing.
  - Use progressive disclosure - start with a simple, executable/completable example, then get progressively more complex.
  - Where possible, let the example explain the concept.

- Turn word wrap on in your editor and rely on it for wrapping text instead of putting linefeeds in yourself.
  - Grammar checkers and syntax highlighting get confused when linefeeds occur in expected places.
  - People edit on different screen sizes.

## File Names & Directory structure

- File names, directory names, and slugs should be kebab-case; URLs should use dashes (`-`) instead of underscores (`_`).
  - [Google recommends hyphens](https://developers.google.com/search/docs/crawling-indexing/url-structure) for SEO reasons.
  - This includes **all** file and directory names for consistency (even images).

- In general, place files in a directory structure that matches the site structure and sidebar navigation.
  - Avoid using the `slug` in the frontmatter in favor of relying on the file and directory naming.
  - The directory structure should usually follow the sidebar hierarchy.

- Store screenshot images in the same directory as the markdown files that use them.
  - This approach implies a directory for *every* page that uses screenshots, and that screenshots are no re-used across pages.

- Store shared images (icons, etc) in the `/images` directory at the root of the repo.


## Navigation bar

- Use [Title Case](https://capitalizemytitle.com/style/AP/) for sidebar items.
- The navigation bar title should usually match the page title.
- The file path name (and, therefore, the slug) should match the navigation bar.  For example, if you have a markdown page titled “Install TE,” the file name should be `install-te`, thus the slug would be `install-te`, so the the URL would be something like `https://www.example.com/install-te.`.


## Page Structure

Generally, each page should start with an h1 (`#`) that matches the page `title` and `sidebar_label` from the metadata, followed by a brief overview.

### Overview
- The overview should not have its own title - no `## Overview` section header
- The overview is usually only a paragraph or two but may link to other sections.
- Now that we are linking to the section headers from the auto-generated `On This Page`, avoid creating an index via table or bullets in the overview.
  - Reference docs are an exception to this rule.  Often, a table of the command/var/etc with a brief description makes sense in reference documentation (e.g., https://powerpipe.io/docs/reference/cli/benchmark)

### Frontmatter

- Include `title` and `sidebar_label`.  Usually, they should usually be the same:

 ```yaml
 ---
 title: Install TE
 sidebar_label: Install TE
 ```

- Avoid using the `slug` in the frontmatter in favor of relying on the file and directory naming.

- Generally, use AP Title case for the title and sidebar label.
  - Exceptions for items in reference documentation when titles are commands, environment variables, etc, that are case sensitive, for example:
    - [CLI reference](https://powerpipe.io/docs/reference/cli)
    - [Environment variable reference](https://powerpipe.io/docs/reference/env-vars)
    - [HCL reference](https://powerpipe.io/docs/powerpipe-hcl)

## Headers
- Every page should have a single h1 (`#`) that generally should match the metadata `title` and `sidebar_label` exactly (including case).

- Subsequent sub-headers should start at h2 (`##`).
- Sub-headers should be **Title Case**.

## Bullets
- Text in bulleted lists (and in table columns) should end with a period (`.`) if the items in the list are sentences or sentence fragments (because once you add a second sentence, you need the period):
 ```md
  This sentence:
    - is a sentence fragment.
    - is a sentence fragment followed by another sentence. This is the other sentence.
 ```

- If the bulleted list is just "items", no period is required:
 ```md
  Elements:
  - card
  - chart
  - query
  - control
 ```

## Tables

- Use HTML `<table>` only when you absolutely have to:
  - All the nested elements then have to be HTML - you can't use markdown inside an HTML table like you can in a markdown table.
  - Sometimes the markdown table formatting is insufficient, and there is no choice, usually when columns wrap weird.
- Follow the guidance in the [bullets](#bullets) section regarding periods.


## Images
- Use markdown image syntax (`![](/my/image.png`) instead of `<img>` tag where possible.
- Follow the suggested [guidance for screenshots](#screenshots).


## Links

- Hyperlink to relevant docs, but don't repeat the same link from the same section as it makes the text hard to read.
  - Good:
    > Powerpipe makes it easy to create your own [controls](https://powerpipe.io/docs/powerpipe-hcl/control) and [benchmarks](https://powerpipe.io/docs/powerpipe-hcl/benchmark). This allows you to define the controls that are important to you and your organization, and organize them into benchmarks that reflect your standards and practices.
  - Bad:
    > Powerpipe makes it easy to create your own [controls](https://powerpipe.io/docs/powerpipe-hcl/control) and [benchmarks](https://powerpipe.io/docs/powerpipe-hcl/benchmark). This allows you to define the [controls](https://powerpipe.io/docs/powerpipe-hcl/control) that are important to you and your organization, and organize them into [benchmarks](https://powerpipe.io/docs/powerpipe-hcl/benchmark) that reflect your standards and practices.


## Examples and Instructions

In Guides, How To's etc:

- **Bold** website element labels, e.g.,
  - Select **Launch product** (Button)
  - Select **Update** (It's a Button here)

- Use `backticks` when referring to the text, e.g.,
  - Enter `my-volume` in the **Name** field

- Use `backticks` when referring to code elements, CLI commands, etc.
  - For example,  "use the `--var` flag to pass a variable."
  - This includes constants like CloudFormation states, etc. `CREATE_COMPLETE`, `CREATE_FAILED`.

- Use code bocks (3 backticks) for commands instead of inlining them when providing examples and instructions. You can inline them when talking about them generally or informally, eg: "Powerpipe benchmarks automatically appear as dashboards when you run `powerpipe server` in the mod."


## Code Blocks
- Specify code block type (`json`, `hcl`, `sql`, `bash`, etc) for syntax highlighting.
- Use the standard indenting/formatting we use for the given language (e.g., 2 spaces for tab, align HCL after the `=`, etc.).

 ```json
  {
    "foo": "bar"
  }
 ```

 ```hcl
 image {
 src   = "https://steampipe.io/images/steampipe_logo_wordmark_color.svg"
 alt   = "Powerpipe Logo"
 width = 2
 }
 ```

## Blockquote Call-Outs (i.e., Tip, Note, Important, Warning & Caution)

Use the extended [GitHub](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) blockquote call-out types where appropriate


> [!NOTE]
> Used to call out information worth highlighting.
> Highlights crucial information that is necessary for success.
> Contains details that the reader must be aware of to avoid issues.
> Can include warnings, prerequisites, or important clarifications.

> [!TIP]
> Offers helpful advice or best practices.
> Focuses on enhancing the reader’s experience or efficiency.
> Often contains optional but helpful advice.
> Presented as an extra or nice-to-know piece of information.

> [!IMPORTANT]
> Highlights critical information that users should not overlook.

> [!WARNING]
> Alerts users to urgent issues or actions that may cause problems.

> [!CAUTION]
> Used to warn users about potential risks or negative outcomes.


## Screenshots

- Use light mode for screenshots.
- Screenshots should be PNG images.
- Full-page screenshots should not have a border.
- Modal dial screenshots should show the border because they are not full-width.
- Don't show the whole browser window - omit the toolbar, status bar, etc, and only show the active pane.
- Most screenshots should capture the entire active window area. The recommended size is **1280p** x **640p**.  The vertical height may be adjusted if you need to display information that would not appear at that height, but the width should always be 1280.


### Device
- Mac laptops are the most common device in Turbot, and are generally preferred when taking screenshots. Use the following display settings:
  - Apple XDR Display (P3-1600 nits)
  - Default resolution 1512x982
- If not using a Mac, take the screenshot on a 14" laptop (or something close) and follow the same [directions](#how-to-take-screenshot).


### How to take screenshot

- Use Chrome with 100% zoom.

- Resize the window:
  - Open `Developer Tools`.
  - Resize your window until it's **1280p** x **640p** (you can view the pixels in the top right of your window while you're resizing it).
  - Note that the size displayed by Developer Tools represents the size of the active content, and closing the `Developer Tools` would expand the width/height of the of the active content to fill the space it currently occupies.  Retain developer tools on the right side of the browser to make sure the width **1280p** is maintained. See the image below where the red highlighted portion is fixed at **1280p** but the vertical height has been adjusted to show information which would not be rendered within recommended height of **640p**.

- Take a screenshot of the browser area you want to capture. You can use the Mac screenshot app tool to capture the screen using `Command` + `Shift` + `5`; the highlighter can be set to the desired width of **1280p** and height of **640p**.

- When you take a screen capture:
  - Always include the full width of the browser window in the screenshot unless the screenshot is only for a modal dialog.
  - You may vary the vertical height from the recommended size (640p) to include enough to let users find the elements on their screen easily.
    - For example: https://aws.amazon.com/blogs/machine-learning/llm-experimentation-at-scale-using-amazon-sagemaker-pipelines-and-mlflow/
  - Modal windows can be shown alone.


### Annotations
Annotations may be used to mark up screenshots in order to provide more precise instructions.  Annotations should be reserved for step-wise, instructional content such as [Turbot Guardrails Guides](#writing-turbot-guardrails-guide).

There are two types of screenshot annotations:
- [Arrows](#arrows) are primarily used to highlight inactive (non-clickable) content.
- [Ovals](#ovals) are used to show where an action should be performed (click a button, tab, etc.)

You can add annotations with [ksnip](https://github.com/ksnip/ksnip).


#### Arrows

- Use arrows to point to non-clickable content.
- Leave a gap between the arrow and the target (button).
- Arrows should **never** be pointing vertically north/south; they should always be diagonal at 45 degrees. The arrow may face either direction depending on the content position.
- Use an arrow when there is a possibility of ovals overlapping any buttons or text beside it.
- On Mac, use a width of `8`, no shadow.
- On non-Mac screens, use width `16`, no shadow.

#### Ovals

- Use **Ovals** to show where the action is to be performed (clicking a  button, tab,  dropdown, etc.)
- Leave a gap around the target (text).
- On Mac, use a width of `5`, red border, no fill, no shadow
- On non-Mac screens, use width `10`, red border, no fill, no shadow


#### Redacting content
Sometimes you may need to redact sensitive content.  To do so, you may blur or pixelate the region on the screen.  Generally, we prefer **pixelate** to **blur**.

- Pixelate - 10 weight (Not in use for now)
- Blur - 18 weight


# Writing Turbot Guardrails Guides

- Section titles should be 5 words or less.
- Each section should start with a command, e.g., **Launch**, **Create**, **Access**.
- Use `select` when selecting something on screen or `choose` when choosing something from a list/drop down.
- Terms should be linked to the glossary the first time they are used except for the "in this guide, you will" bullets.

## Guide Sections

Each guide will have the following sections:
1. An [overview](#guide-overview)
2. [Prerequisites](#prerequisites)
3. One of more [Steps](#step-sections), conccluding with **Monitor** and **Review** steps
4. [Next Steps](#next-steps)
5. [Troubleshooting](#troubleshooting)


### Guide Overview

The overview should apprear immediately after the page title; do not include a `## Overview` header.

1. State what the user will do with this guide (what you'll do).
2. Provide any additional overview (what is this).
3. Provide 1 to 2 sentences (as long as it explains) about `why does it matter`.

### Prerequisites

List any prerequisites with appropriate links

### Step Sections

- Each step should have its own h2 header.
- The header format is `Step {number}: Step Title`.
  - As always, use title case in the header.
  - The step title should begin with a verb.
  - examples:
    - [`Step 1: Access AWS Console`](https://turbot.com/guardrails/docs/guides/hosting-guardrails/installation/install-te#step-1-access-aws-console)
    - [`Step 2: Navigate to Products`](https://turbot.com/guardrails/docs/guides/hosting-guardrails/installation/install-te#step-2-navigate-to-products)
    - [`Step 3: Find Version`](https://turbot.com/guardrails/docs/guides/hosting-guardrails/installation/install-te#step-3-find-version)

- Include a **Monitor** step to inform the user how they can monitor the progress or view the status of the operation.
  - Example: [`Step 7: Monitor Installation`](https://turbot.com/guardrails/docs/guides/hosting-guardrails/installation/install-te#step-7-monitor-installation)

- The final step should be a **Review** step. This should state what should have occurred, as well as a checklist of items to review and verify everything was run successfully.
  - Example: [`Step 8: Review`](https://turbot.com/guardrails/docs/guides/hosting-guardrails/installation/install-te#step-8-review)


### Next Steps
- Provide links to related guides, Guardrails documentation, or any external reference documentation.
    - Example: https://developer.hashicorp.com/terraform/tutorials/configuration-language/test#next-steps

### Troubleshooting

Use tabular format e.g.

| Issue              | Description                                                                                                                                                                                                 | Guide
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------
| Permission Issues  | If the current logged-in user lacks permission to modify, update, or create resources in the stack, or if IAM roles or SCPs have changed, preventing built-in roles from accessing needed configuration settings.   | [Troubleshoot Permission Issues](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators)
| Further Assistance | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)