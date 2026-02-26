# Scripts

## Docs Export

Exports all guardrails documentation into a single `guardrails-docs.json` file and uploads it to the Turbot Registry S3 buckets.

### How It Works

`build-docs-export.js` reads all markdown files from `docs/`, parses YAML frontmatter, resolves the sidebar navigation (expanding placeholder entries), and produces a single JSON file containing all pages with metadata.

The output is uploaded to:

```
s3://turbot-mod-repository-{environment}/docs/{version}/guardrails-docs.json.gz
s3://turbot-mod-repository-{environment}/docs/latest/guardrails-docs.json.gz
```

Only the last 5 versioned snapshots are retained.

### Running Locally

```bash
npm install gray-matter glob
node scripts/build-docs-export.js --version "2026.02.26" --commit-sha "abc123" --branch "main"
```

Output is written to `dist/guardrails-docs.json`.

Options:

| Flag | Description |
|------|-------------|
| `--version` | Version tag (default: date-based `YYYY.MM.DD`) |
| `--commit-sha` | Git commit SHA to embed in metadata |
| `--branch` | Branch name to embed in metadata |
| `--include-images` | Base64-encode referenced images into the export |

### Running via GitHub Actions

Trigger the **"Export docs to registry"** workflow manually from the Actions tab:

1. Go to Actions > "Export docs to registry"
2. Click "Run workflow"
3. Select the target environment (`development`, `staging`, or `production`)
4. Optionally set a version tag
5. Click "Run workflow"

### Infrastructure Setup

The workflow authenticates to AWS via GitHub OIDC. Each registry account needs an IAM role deployed via the CloudFormation template.

#### Prerequisites

Each registry account must have a GitHub OIDC identity provider (`token.actions.githubusercontent.com`). Check under IAM > Identity providers. If one already exists, set `CreateOIDCProvider=false` (the default).

#### Deploy the IAM role

```bash
# Development (account 525041748188)
aws cloudformation deploy \
  --template-file scripts/github-oidc-role.cfn.yaml \
  --stack-name guardrails-docs-export \
  --parameter-overrides S3BucketName=turbot-mod-repository-development \
  --capabilities CAPABILITY_NAMED_IAM \
  --profile dev

# Staging (account 775565296390)
aws cloudformation deploy \
  --template-file scripts/github-oidc-role.cfn.yaml \
  --stack-name guardrails-docs-export \
  --parameter-overrides S3BucketName=turbot-mod-repository-staging \
  --capabilities CAPABILITY_NAMED_IAM \
  --profile stg

# Production (account 287590803701)
aws cloudformation deploy \
  --template-file scripts/github-oidc-role.cfn.yaml \
  --stack-name guardrails-docs-export \
  --parameter-overrides S3BucketName=turbot-mod-repository-production \
  --capabilities CAPABILITY_NAMED_IAM \
  --profile prod
```

#### Add GitHub secrets

Get the role ARN from each stack:

```bash
aws cloudformation describe-stacks \
  --stack-name guardrails-docs-export \
  --query "Stacks[0].Outputs[?OutputKey=='RoleArn'].OutputValue" \
  --output text \
  --profile dev
```

Add the ARNs as repository secrets (Settings > Secrets and variables > Actions):

| Secret | Source |
|--------|--------|
| `AWS_ROLE_ARN_DEV` | Dev stack `RoleArn` output |
| `AWS_ROLE_ARN_STG` | Staging stack `RoleArn` output |
| `AWS_ROLE_ARN_PROD` | Production stack `RoleArn` output |

### Files

| File | Purpose |
|------|---------|
| `scripts/build-docs-export.js` | Build script that produces `guardrails-docs.json` |
| `scripts/github-oidc-role.cfn.yaml` | CloudFormation template for the IAM role |
| `.github/workflows/docs-export.yml` | GitHub Actions workflow |
