# Docs Export - Design Document

## Goal

Export the guardrails product documentation (markdown files in `docs/`) into the Turbot Registry S3 buckets across all 3 environments (dev, staging, prod), making it available for consumption by the Hub build pipeline and other consumers.

---

## Export Format

### Output: `guardrails-docs.json`

A single JSON file containing all documentation content, navigation, and metadata:

```json
{
  "metadata": {
    "exportedAt": "2026-02-26T12:00:00Z",
    "commitSha": "abc123",
    "branch": "main",
    "version": "2026.02.26",
    "pageCount": 150,
    "imageCount": 200
  },
  "sidebar": [
    {
      "type": "category",
      "id": "getting-started",
      "link": "getting-started",
      "items": [...]
    }
  ],
  "pages": [
    {
      "id": "getting-started/index",
      "path": "getting-started/index.md",
      "title": "Getting Started",
      "sidebar_label": "Getting Started",
      "slug": null,
      "content": "# Getting Started\n\nFull markdown content here..."
    }
  ],
  "images": [
    {
      "path": "images/docs/guardrails/getting-started/screenshot.png",
      "base64": "iVBORw0KGgo...",
      "contentType": "image/png",
      "sizeBytes": 45230
    }
  ]
}
```

### Why a single JSON file?

- Simple to produce and consume (one file to upload, one file to download)
- Matches the existing registry pattern (`turbot.docs.json` per mod)
- Sidebar navigation is pre-resolved (placeholders expanded)
- All content self-contained, no follow-up requests needed
- Images base64-encoded to avoid separate asset management

### Size Estimate

| Component | Estimated Size |
|-----------|---------------|
| Markdown content (~150 pages) | ~2-5 MB |
| Images (base64, ~200 images) | ~50-100 MB |
| Sidebar + metadata | ~50 KB |
| **Total (uncompressed)** | **~50-105 MB** |
| **Total (gzipped)** | **~15-30 MB** |

### Alternative: Content-only (no images)

If image size is a concern, export a lighter version without base64 images. Images would be served from the existing Vercel deployment or a separate CDN path.

```json
{
  "metadata": { ... },
  "sidebar": [ ... ],
  "pages": [ ... ],
  "imageManifest": [
    {
      "path": "images/docs/guardrails/getting-started/screenshot.png",
      "sizeBytes": 45230,
      "contentType": "image/png"
    }
  ]
}
```

This brings the export down to ~2-5 MB uncompressed, ~500 KB-1 MB gzipped.

---

## S3 Key Structure

Store in the registry S3 buckets under the `/docs/` directory:

```
s3://turbot-mod-repository-{environment}/
  └── docs/
      ├── latest/
      │   └── guardrails-docs.json.gz
      └── {version}/
          └── guardrails-docs.json.gz
```

- **`latest/`** - Always overwritten on each export (for consumers that want current docs)
- **`{version}/`** - Versioned snapshots using date-based versioning (`2026.02.26`) or commit SHA
- **Retention** - Only the last 5 versioned snapshots are kept; older ones are pruned automatically

### Environments

| Environment | S3 Bucket | Source Branch |
|-------------|-----------|---------------|
| Development | `turbot-mod-repository-development` | Any (manual) |
| Staging | `turbot-mod-repository-staging` | Any (manual) |
| Production | `turbot-mod-repository-production` | `main` |

---

## Authentication Options

> **Decision Required** - The spec identifies authentication as an open issue. Below are the options.

### Option A: GitHub OIDC → AWS IAM Role (Recommended)

GitHub Actions natively supports OIDC federation with AWS. No long-lived credentials needed.

**Setup:**
1. Create an IAM OIDC identity provider in each registry AWS account
2. Create an IAM role with trust policy allowing the `guardrails-docs` repo
3. Role has `s3:PutObject` permission on the registry bucket path

**Trust Policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::{ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:turbot/guardrails-docs:*"
        }
      }
    }
  ]
}
```

**IAM Policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::turbot-mod-repository-{environment}/@turbot/guardrails-docs/*"
    }
  ]
}
```

**Pros:** No stored credentials, short-lived tokens, auditable, branch-scoped
**Cons:** Requires IAM setup in 3 AWS accounts (one-time)

### Option B: IAM Role with Trust Policy (Cross-Account)

Same pattern the Guardrails product currently uses.

**Setup:**
1. A role in the registry account trusts a role in the GitHub Actions runner account
2. Workflow assumes the cross-account role

**Pros:** Consistent with existing Guardrails auth pattern
**Cons:** Requires an intermediate AWS account or IAM user that GH Actions can assume

### Option C: Cognito Credentials via GitHub Secrets

Store registry Cognito credentials as GitHub secrets. Workflow authenticates to get JWT, then uses GraphQL API or presigned URLs.

**Pros:** Uses existing registry auth flow
**Cons:** Long-lived credentials in GitHub secrets, more complex workflow (auth + API calls), Cognito is designed for human users not CI/CD

### Option D: AWS Access Keys as GitHub Secrets

Store IAM access key/secret for an IAM user with S3 write permissions.

**Pros:** Simplest to implement
**Cons:** Long-lived credentials, least secure option, requires key rotation

### Recommendation

**Option A (GitHub OIDC)** is the standard approach for GitHub Actions → AWS. It requires no stored secrets, tokens are short-lived and scoped, and AWS natively supports it. The one-time IAM setup in each account is straightforward.

---

## Build Process

### Export Script: `scripts/export-docs.sh`

```
1. Checkout repository
2. Find all markdown files in docs/
3. Parse YAML frontmatter from each file
4. Resolve sidebar.json (expand placeholders from sub-sidebars)
5. Collect image references from markdown content
6. Build guardrails-docs.json
7. Gzip the output
8. Upload to S3
```

### Build Steps Detail

**Step 1: Resolve Sidebar**
- Read `docs/sidebar.json`
- For each `"type": "placeholder"` entry, read the referenced JSON file and inline it
- Recursively resolve any nested placeholders
- Output: fully resolved sidebar array

**Step 2: Process Pages**
- Glob `docs/**/*.md`
- For each file:
  - Parse YAML frontmatter (title, sidebar_label, id, slug)
  - Read raw markdown content (body after frontmatter)
  - Derive page ID from file path (e.g., `docs/getting-started/index.md` → `getting-started/index`)
- Output: array of page objects

**Step 3: Collect Images** (optional, based on size decision)
- Scan markdown content for `<img src="/images/...` references
- Read each referenced image file
- Base64 encode
- Output: array of image objects

**Step 4: Assemble JSON**
- Combine metadata, sidebar, pages, and images into final JSON
- Gzip the output

### Implementation

The build script can be implemented as:
- **Node.js script** - Good for JSON manipulation, frontmatter parsing (`gray-matter` npm package)
- **Shell script with jq** - Minimal dependencies, works in CI, but complex for frontmatter parsing
- **Python script** - Good middle ground, stdlib handles YAML and JSON well

**Recommendation:** Node.js script since the project is JavaScript-adjacent and has well-tested frontmatter parsing libraries.

---

## GitHub Workflow

### Trigger

Manual dispatch (`workflow_dispatch`) with inputs:

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `environment` | choice | Yes | Target: `development`, `staging`, `production` |
| `version` | string | No | Version tag (default: date-based `YYYY.MM.DD`) |
| `include_images` | boolean | No | Include base64 images (default: false) |

### Workflow Steps

```yaml
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Run export script → guardrails-docs.json.gz
5. Configure AWS credentials (OIDC)
6. Upload to S3 (latest/ + versioned/)
7. Output summary (file size, page count, S3 path)
```

### Secrets Required

| Secret | Purpose | Required For |
|--------|---------|-------------|
| `AWS_ROLE_ARN_DEV` | IAM role ARN for dev account | Option A |
| `AWS_ROLE_ARN_STG` | IAM role ARN for staging account | Option A |
| `AWS_ROLE_ARN_PROD` | IAM role ARN for production account | Option A |

Or, if using Option D (access keys):

| Secret | Purpose |
|--------|---------|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |

---

## Consumer Integration

The exported `guardrails-docs.json` can be consumed by:

1. **Hub Build Pipeline** - Fetch from S3 during build, render alongside mod docs
2. **LLM/AI Tools** - Structured JSON is easy to index for RAG or tool use
3. **Search Indexing** - Pages with metadata for full-text search
4. **Other Turbot Products** - Any service that needs guardrails product docs

---

## Open Questions for Human

1. **Authentication approach** - Which option (A/B/C/D) should we implement? Recommendation is Option A (GitHub OIDC).

2. **Include images?** - Should the export include base64-encoded images (~50-100 MB) or just content (~2-5 MB)? Images can be served from existing Vercel deployment if excluded.

3. **S3 path** - Is `/@turbot/guardrails-docs/{version}/` the right path, or should it be in a separate namespace?

4. **DynamoDB record** - Should we create a `modVersion` record in DynamoDB to make this discoverable via the GraphQL API, or is direct S3 upload sufficient?

5. **Versioning strategy** - Date-based (`2026.02.26`), semver (`1.0.0`), or commit SHA?

6. **Future automation** - After manual trigger is working, should this auto-run on pushes to `main` (like `deploy.yml`)?
