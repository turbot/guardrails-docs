# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the documentation repository for Turbot Guardrails, a cloud governance and security compliance platform. The docs cover multi-cloud support (AWS, Azure, GCP, GitHub, Kubernetes) and are organized into Getting Started guides, core Concepts, procedural Guides, Developer documentation, Reference material, and FAQ sections.

## Documentation System Architecture

This uses a **custom Markdown-based documentation system** (not Docusaurus, Mintlify, or Gatsby):
- Markdown files in `docs/` folder with YAML frontmatter
- Custom sidebar navigation defined in JSON files
- Deployed via **Vercel** with CI/CD through GitHub Actions
- Images stored in `/images/` folder

### Document Structure Requirements

Each Markdown document requires frontmatter:
```yaml
---
title: Page Title
sidebar_label: Navigation Label
---
```

- Supports up to 2 levels of nesting (e.g., `docs/foo/bar/`)
- Entry-point document contains `slug: /`
- Images must be referenced using HTML tags: `<img src="/images/docs/..." />`

## Navigation & Sidebar Configuration

Navigation is defined through a hierarchical JSON sidebar system:

- **Main sidebar**: `docs/sidebar.json` - Primary navigation hub
- **Generated sidebar**: `docs/sidebar-generated.json` - Auto-processed with enriched metadata
- **Modular sidebars**: Cloud/feature-specific sidebars referenced via "placeholder" type entries:
  - `docs/guides/aws/aws-sidebar.json`
  - `docs/guides/azure/azure-sidebar.json`
  - `docs/guides/gcp/gcp-sidebar.json`
  - `docs/guides/github/github-sidebar.json`
  - `docs/guides/using-guardrails/ai/ai-sidebar.json`
  - `docs/guides/using-guardrails/stacks/stack-sidebar.json`
  - `docs/developers/developers-sidebar.json`

### Sidebar Entry Types

- `"category"` - Groups documents with nested "items" array
- `"placeholder"` - Includes external sidebar JSON files for modularization
- `"external"` - Links to external sites (Hub, Changelog)
- Supports `"link"` attribute for custom URLs
- Uses `"id"` for unique identification

## Deployment Workflows

### Production Deployment
- **Workflow**: `.github/workflows/deploy.yml`
- **Trigger**: Pushes to `main` branch or manual dispatch
- **Action**: Triggers Vercel webhook via `secrets.VERCEL_DEPLOY_LINK_PROD`

### Preview Builds
- **Workflow**: `.github/workflows/trigger-turbot-com.yml`
- **Trigger**: Pull requests and feature branches (non-main)
- **Action**:
  - Sends repository dispatch event to `turbot/turbot.com` repo
  - Fetches deployment details from Tailpipe API
  - Posts preview link as PR comment with commit info
- **Preview branch pattern**: `docs/guardrails/{branch-name}`

## Content Organization

Documentation is organized into **8 major sections**:

1. **Getting Started** (`getting-started/`)
   - 7-minute labs for quick tutorials
   - Cloud-specific setup (AWS, Azure, GCP)
   - Organization and user setup

2. **Prevention** (`prevention/`)
   - Dashboard, accounts, objectives
   - Prevention configuration and simulator

3. **Concepts** (`concepts/`)
   - Activities, Controls, Guardrails (with tagging subcategory)
   - IAM, Policies, Policy Packs, Processes, Resources

4. **Guides** (`guides/`)
   - Cloud provider-specific guides (AWS, Azure, GCP, GitHub, Kubernetes)
   - Feature guides (configuring/using/hosting guardrails)
   - ServiceNow integration
   - Troubleshooting

5. **FAQ** (`faq/`)
   - Organized by cloud provider and general topics

6. **Developers** (`developers/`)
   - Policy pack development
   - MCP installation, GraphQL, Nunjucks
   - Debugging guides

7. **Reference** (`reference/`)
   - CLI commands and installation
   - Terraform setup
   - Filter language, OCL, GraphQL schema
   - Glossary and samples repo

8. **External Links**
   - Hub and Changelog (external sites)

## Contributing Guidelines

Per README.md:
- Fork repository and work from `main` branch
- Create pull requests with clear, descriptive commit messages
- Check existing open PRs before starting work
- Create an issue for significant contributions before starting
- Contributors must sign Contributor License Agreement (CLA)
- Published under CC BY-NC-ND license

### Issue Templates

Available in `.github/ISSUE_TEMPLATE/`:
- `new-guide--create-new-guide.md` - For proposing new guides
- `update-guide--update-guide.md` - For updating existing guides

## Key Files & Locations

- `docs/sidebar.json` - Main navigation configuration
- `docs/index.md` - Homepage (slug: `/`)
- `.github/workflows/trigger-turbot-com.yml` - Preview build orchestration
- `.github/workflows/deploy.yml` - Production deployment
- `/images/` - All image assets
- `README.md` - Contribution guidelines and documentation format

## Multi-Cloud Support

The documentation extensively covers:
- **AWS** - Account setup, IAM, services, best practices
- **Azure** - Subscription setup, management groups, resources
- **GCP** - Project setup, organization policies, resources
- **GitHub** - Repository management and integrations
- **Kubernetes** - Cluster governance

Cloud-specific content is organized both by provider (in guides/) and by cross-cloud concepts (in concepts/).

## Prevention Documentation Terminology

The prevention documentation (`docs/prevention/`) uses specific terminology to avoid confusion with Guardrails product features:

### Key Terms

- **Prevention** (noun): A preventive mechanism like an SCP, Azure Policy, account setting, or GitHub ruleset that stops security issues before they occur
- **Preventive mechanism**: Technical implementation of a prevention (use when emphasizing the "how")
- **Objective**: A security goal or requirement (the "what" you're trying to achieve)
- **Layer**: When a prevention operates (Build, Access, Config, Runtime)
- **Guardrails Control** (capitalize Control): The specific product feature that enforces Guardrails policies with states (OK, Alarm, Error, etc.) - documented in `/docs/concepts/controls`

### What NOT to call preventions

- ❌ "control" (generic) - conflicts with Guardrails Controls
- ❌ "security control" (generic) - use "prevention" instead
- ✅ "Service Control Policy" (specific AWS term) - keep as-is
- ✅ "control" (verb) - fine to use as a verb (e.g., "controls network traffic")

### When editing prevention docs

- Replace generic "control(s)" with "prevention(s)"
- Preserve "Service Control Policy" (official AWS term)
- Preserve "Guardrails control(s)" when specifically referring to the Controls feature
- Preserve "control" as a verb

## Multi-Step Task Management

When working on tasks that span multiple files or require multiple steps, use the TodoWrite tool to track progress.

### Best Practices

**For multi-file changes:**
- Create one todo item per logical unit of work (usually one file or related group)
- Mark items as in_progress BEFORE starting work
- Mark as completed IMMEDIATELY after finishing (don't batch)
- Keep exactly ONE item in_progress at a time

**For terminology changes:**
- First todo: "Analyze uses of [term] in [directory]"
- Second todo: "Propose alternative terminology"
- Remaining todos: One per file or logical group to update
- Final todo: "Verify and commit changes"

**For section standardization:**
- First todo: "Identify section title variants"
- Middle todos: One per file to update
- Final todo: "Format existing sections with new standard"

**Progress visibility:**
- User can see the todo list state
- Update frequently to show progress
- Clear, specific todo descriptions
- Active form should be present continuous tense (e.g., "Updating X" not "Update X")

## Common Documentation Patterns

### Parent-Child Page Structure

Parent pages (index.md) should be **overviews with links**, not detailed content:
- Brief introduction (2-3 paragraphs)
- "Available Views" or "Available Options" section with links to children
- "Understanding [Topic]" section with high-level concepts
- "Next Steps" with links to related pages

Child pages should contain **detailed content**:
- Comprehensive explanations
- Screenshots and examples
- "Common Use Cases" section
- "Next Steps" linking back to parent or siblings

**Example**: `prevention/preventions/index.md` (overview) vs `prevention/preventions/preventions/index.md` (details)

### Common Use Cases Section Format

Standard format across all pages:
```markdown
## Common Use Cases

- **When [scenario description]** - Detailed explanation of what to do, why it matters, and what outcome to expect. May include specific examples or commands.

- **When [another scenario]** - More details about this use case.
```

Key characteristics:
- Bullet list (not paragraphs)
- Bold scenario name starting with "When"
- Dash separator
- 2-4 sentences of explanation
- Specific and actionable

### Detail Page Structure

Most detail pages follow this pattern:
1. Title and introduction
2. "What You're Looking At" or "Understanding [Topic]"
3. Main content sections
4. "Common Use Cases"
5. "Next Steps"

Detail pages may have subsections like:
- "[Feature] Detail View" for drilling into specifics
- "Using the [Feature]" for interaction guidance
- "Best Practices" for recommendations

### Organizing Documentation by UI Flow

When documenting features with multiple options or methods, organize content in the order users encounter them in the interface, not by importance or frequency of use.

**Why**: This reduces cognitive load - users can follow along with the documentation while looking at the actual interface without having to mentally reorder information.

**Example**: When documenting a dialog with tabs (File Upload, Mock Events, Manual Entry), document them in that left-to-right tab order even if Mock Events is the most commonly used option.

### Interactive Feature Documentation

When documenting interactive features (dialogs, forms, wizards), use a three-part screenshot approach:

1. **Overview screenshot** - Show the feature in use with data/results visible
2. **Interaction screenshots** - Show how to use the feature (opening dialogs, selecting options, filling forms)
3. **Result screenshots** - Show outcomes and what happens after interaction

**Example structure**:
```markdown
### Feature Name

Feature does X and Y.

![Feature with results visible](./feature-overview.png)

#### Using the Feature

Click "Action" to open the dialog...

![Dialog showing options](./feature-dialog.png)

Select an option to...

![Selected option with populated fields](./feature-selected.png)

After completing the action, results appear in...
```

This pattern helps users understand both what the feature does (overview) and how to use it (step-by-step), making documentation more actionable.

## Writing Guardrails Guides

Procedural guides follow a specific structure with strict validation rules. Each guide must contain these sections in order:

### Guide Structure

1. **Overview** (no header)
2. **Prerequisites**
3. **Steps** (Step 1, Step 2, ... Step n)
4. **Review**
5. **Next Steps**
6. **Troubleshooting**

### Overview Section Rules

- Appears immediately after the H1 title (no `## Overview` header)
- Must start with: `In this guide, you will:`
- Use second person ("you"/"your")
- Should contain at least one hyperlink to related documentation
- Can be a bulleted list or paragraph format

**Example:**
```markdown
# Install Turbot Enterprise

In this guide, you will:
- Deploy the Turbot Enterprise stack to your AWS account
- Configure the initial settings
- Verify the installation

This guide walks you through installing [Turbot Enterprise](link) in your environment.
```

### Prerequisites Section Rules

- Header: `## Prerequisites`
- Must come after the overview
- Format: Bulleted list
- Use second person ("you"/"your")
- Simple items: no trailing periods
- Sentences/fragments: end with periods

**Example:**
```markdown
## Prerequisites

- Access to the AWS Console with administrator permissions
- A valid Turbot license key
- Familiarity with CloudFormation
```

### Steps Section Rules

- Header format: `## Step {n}: Verb Title` (Title Case)
- First word after colon must be a verb (Access, Create, Configure, Navigate, etc.)
- Sequential numbering: no gaps, no duplicates
- Each step must have content below the header
- Use second person ("you"/"your")
- May include images and callouts

**Example:**
```markdown
## Step 1: Access AWS Console

Navigate to the AWS Console and sign in with your administrator credentials.

## Step 2: Launch CloudFormation

Select **CloudFormation** from the services menu.

## Step 3: Create Stack

Click **Create stack** and select **With new resources**.
```

### Review Section Rules

- Header: Exactly `## Review` (NOT `## Step Review` or `## Step n: Review`)
- Summarize what was accomplished
- Include a checklist of items to verify

**Example:**
```markdown
## Review

You have successfully installed Turbot Enterprise. Verify the following:

- [ ] Stack status shows `CREATE_COMPLETE`
- [ ] Console URL is accessible
- [ ] Initial login works with provided credentials
```

### Next Steps Section Rules

- Header: `## Next Steps`
- Provide links to related guides or documentation

### Troubleshooting Section Rules

- Header: `## Troubleshooting`
- Format: Markdown table with columns: Issue | Description | Guide
- Last row must mention "Further Assistance" with support ticket link

**Example:**
```markdown
## Troubleshooting

| Issue | Description | Guide |
|-------|-------------|-------|
| Permission Issues | If you lack permissions to create resources | [Permissions Guide](link) |
| Stack Failures | If CloudFormation stack fails to create | [Stack Troubleshooting](link) |
| Further Assistance | If you continue to encounter issues, please open a ticket | [Open Support Ticket](https://support.turbot.com) |
```

### Callout Formatting

Use GitHub-style blockquote callouts only:

```markdown
> [!NOTE]
> Information worth highlighting.

> [!TIP]
> Helpful advice or best practices.

> [!IMPORTANT]
> Critical information users should not overlook.

> [!WARNING]
> Urgent issues or actions that may cause problems.

> [!CAUTION]
> Potential risks or negative outcomes.
```

**Do NOT use old callout formats:**
- ❌ `**Note:**`
- ❌ `:warning:`
- ❌ `**Caution:**`
- ❌ `**Important:**`
