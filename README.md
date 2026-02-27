![image](https://turbot.com/images/guardrails_og_graphic.png)

<!-- # Guardrails docs format & structure -->

Docs are written in Markdown format and are located in the `docs` folder. The entry-point document will contain front-matter with `slug: /`.

Each document requires the following frontmatter, adjust the values as per your requirement:

```yaml
id: using
title: Using Guardrails
sidebar_label: Using Guardrails
```

We support up to 2 levels of docs, e.g.:

- `docs/foo`
- `docs/foo/bar`

For your docs to appear in the sidebar, you need to edit `docs/sidebar.json`. This is an array of sidebar entries, which are either stings matching the path of the required document, or a category to nest the docs down 1 level.

Any images required by docs must be placed in `/images/docs/...` and must be referenced by the tag `<img src="/images/docs/..." />`.

# Docs Export

The documentation can be exported as a tarball for consumption by the Turbot Registry and other downstream systems.

## Export Format

The export produces a `guardrails-docs.tar.gz` containing:

```
guardrails-docs.tar.gz
├── guardrails-docs.json          # All pages, sidebar, and metadata
├── docs/                         # Co-located images from docs/
│   ├── getting-started/
│   │   └── *.webp
│   ├── prevention/
│   │   └── *.webp
│   └── ...
└── images/                       # Top-level images
    └── *.webp
```

PNGs are converted to WebP during export for smaller file sizes.

## guardrails-docs.json Schema

```json
{
  "metadata": {
    "exportedAt": "2026-02-26T12:00:00Z",
    "commitSha": "abc123def",
    "branch": "main",
    "version": "2026.02.26.143052",
    "pageCount": 369,
    "imageCount": 1496
  },
  "sidebar": [
    {
      "type": "category",
      "id": "getting-started",
      "link": "getting-started",
      "items": ["getting-started/7-minute-labs/set-policy", "..."]
    }
  ],
  "pages": [
    {
      "id": "getting-started/7-minute-labs/set-policy",
      "path": "getting-started/7-minute-labs/set-policy/index.md",
      "title": "Set a Policy",
      "sidebar_label": "Set a Policy",
      "slug": null,
      "content": "Markdown content without frontmatter..."
    }
  ]
}
```

### Fields

**metadata**
- `exportedAt` — ISO 8601 timestamp of the export
- `commitSha` — Git commit SHA the export was built from
- `branch` — Source branch name
- `version` — Version tag (date-based `YYYY.MM.DD.HHMMSS` by default)
- `pageCount` — Total number of markdown pages
- `imageCount` — Total number of images included in the tarball

**sidebar** — Fully resolved navigation tree. All `placeholder` entries are expanded inline. Entry types are `category` (with nested `items`), `external` (with `link` and `label`), or bare strings (page IDs).

**pages** — Array of all documentation pages. Each page has:
- `id` — Unique identifier derived from file path (e.g., `getting-started/7-minute-labs/set-policy`)
- `path` — Original file path relative to `docs/` (e.g., `getting-started/7-minute-labs/set-policy/index.md`)
- `title` — From YAML frontmatter
- `sidebar_label` — From YAML frontmatter
- `slug` — From YAML frontmatter (null for most pages, `/` for the index)
- `content` — Raw markdown body (frontmatter stripped)

## Running the Export

See [scripts/README.md](scripts/README.md) for local usage, GitHub Actions workflow, and infrastructure setup.

# Guidelines for contribution

<!-- Thank you for your interest in contributing to Guardrails documentation! We greatly value feedback and contributions from our community. -->

Please read through this document before you submit any pull requests or issues. It will help us to collaborate more effectively.

## What to expect when you contribute

When you submit a pull request, our team is notified and will respond as quickly as we can. We'll do our best to work with you to ensure that your pull request adheres to our style and standards.

We look forward to receiving your pull requests for:

- Inaccuracies in the content
- Information gaps in the content that need more detail to be complete
- Grammatical errors or typos
- Suggested rewrites that improve clarity and reduce confusion

## How to contribute

To contribute, send us a pull request.

1. [Fork the repository](https://help.github.com/articles/fork-a-repo/).
2. In your fork, make your change in a branch that's based on this repo's **main** branch.
3. Commit the change to your fork, using a clear and descriptive commit message.
4. [Create a pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)

Before you send us a pull request, please be sure that:

1. You're working from the latest source on the **main** branch.
2. You check [existing open](https://github.com/turbot/guardrails-docs/pulls) pull requests to be sure that someone else hasn't already addressed the problem.
3. You [create an issue](https://github.com/turbot/guardrails-docs/issues/new) before working on a contribution that will take a significant amount of your time.

For contributions that will take a significant amount of time, [open a new issue](https://github.com/turbot/guardrails-docs/issues/new) to pitch your idea before you get started. Explain the problem and describe the content you want to see added to the documentation. We don't want you to spend a lot of time on a contribution that might be outside the scope of the documentation or that's already in progress.

## Finding contributions to work on

If you'd like to contribute, but don't have a project in mind, look at the [open issues](https://github.com/turbot/guardrails-docs/issues) in this repository for some ideas.

## Open Source & Contributing

This repository is published under the [CC BY-NC-ND](https://creativecommons.org/licenses/by-nc-nd/4.0/) license. Please see our [code of conduct](https://github.com/turbot/.github/blob/main/CODE_OF_CONDUCT.md). Contributors must sign our [Contributor License Agreement](https://turbot.com/open-source#cla) as part of their first pull request. We look forward to collaborating with you!