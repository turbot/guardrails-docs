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
