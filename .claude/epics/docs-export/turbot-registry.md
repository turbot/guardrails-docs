# Turbot Registry Architecture

**Purpose**: Document the Turbot Registry service architecture, which is the source of mod data for the Hub.

**Source Code**: `turbotio/turbot.com` repository (GitHub: turbotio org)

---

## Overview

The **Turbot Registry** is a serverless package registry for Guardrails mods. It provides:

- Mod version management (publish, deprecate, recommend)
- Artifact storage and distribution via S3
- User/Organization identity management
- Workspace management for SaaS customers
- License management for Enterprise customers
- Usage tracking and billing integration

---

## Key Questions Answered

### When/How Does the Registry Get Updated?

The Registry is updated when **mod authors publish new versions** using the Turbot CLI:

```bash
turbot login --registry guardrails.turbot.com
turbot publish
```

**Update Flow:**

1. **Developer runs `turbot publish`** → Creates a `modVersion` record in DynamoDB with status `UPLOADING`
2. **CLI uploads `index.zip`** → Contains composed mod package to S3 presigned URL
3. **S3 event triggers Step Function** → Lambda processes the upload:
   - Extracts zip contents
   - Validates `turbot.dist.json`
   - Uploads extracted artifacts (turbot.head.json, README.md, functions/\*.zip)
   - **Generates `turbot.docs.json`** by running `turbot inspect --output-template docs.njk`
4. **Status updated to `AVAILABLE`** → Mod is now downloadable
5. **Manual promotion to `RECOMMENDED`** → Via `turbot registry modify --status RECOMMENDED`

**Update Frequency:** Updates happen whenever Turbot (or third-party mod authors) publish new mod versions. For official `@turbot/*` mods, this typically happens with each product release cycle.

---

### What Does the Registry Store About Mods?

The Registry stores **DETAILED type information** for every mod, not just high-level metadata.

#### DynamoDB: Version Metadata

```
modVersions table:
├── fullName: "@turbot/aws-s3"
├── version: "5.7.2"
├── status: "RECOMMENDED" | "AVAILABLE" | "UPLOADING" | "UNAVAILABLE"
├── identityName: "turbot"
├── name: "aws-s3"
├── createdTimestamp, lastModifiedTimestamp
└── (pointers to S3 artifacts)
```

#### S3: Full Mod Artifacts

**`turbot.head.json`** - Complete type definitions including:

- **Resource Types**: Schema, icon, category, parent hierarchy
- **Control Types**: Title, description, targets, category
- **Policy Types**: Schema, default values, templates, targets
- **Action Types**: Events, targets, function references
- Peer dependencies with version constraints
- Build metadata

Example structure:

```json
{
  "$id": "tmod:@turbot/aws-s3",
  "version": "5.7.2",
  "peerDependencies": { "@turbot/aws": ">=5.0.0" },
  "resource": {
    "types": {
      "bucket": {
        "title": "Bucket",
        "description": "An Amazon S3 bucket...",
        "icon": "fal-archive",
        "schema": {
          /* full JSON schema */
        }
      }
    }
  },
  "control": {
    "types": {
      "bucketApproved": {
        "title": "Bucket > Approved",
        "description": "Check if bucket meets approval criteria...",
        "targets": ["#/resource/types/bucket"]
      }
    }
  },
  "policy": {
    "types": {
      "bucketApproved": {
        "title": "Bucket > Approved",
        "schema": { "type": "string", "enum": ["Skip", "Check: Approved"] },
        "default": "Skip"
      }
    }
  }
}
```

**`turbot.docs.json`** - Documentation-optimized format (generated from turbot.head.json):

```json
{
  "resourceCategories": [...],
  "resourceTypes": [
    {
      "uri": "tmod:@turbot/aws-s3#/resource/types/bucket",
      "title": "AWS > S3 > Bucket",
      "description": "An Amazon S3 bucket...",
      "icon": "fal-archive",
      "category": { "uri": "...", "title": "AWS > S3" },
      "parent": { "uri": "...", "title": "AWS > S3" },
      "schema": { /* full JSON schema */ }
    }
  ],
  "controlCategories": [...],
  "controlTypes": [...],
  "policyTypes": [
    {
      "uri": "tmod:@turbot/aws-s3#/policy/types/bucketApproved",
      "title": "AWS > S3 > Bucket > Approved",
      "description": "...",
      "defaultTemplate": "...",
      "schema": { /* full JSON schema */ }
    }
  ],
  "definitions": [...]
}
```

**`turbot.dist.json`** - Full implementation (restricted access):

- Complete source code references
- Control/policy function implementations
- Test files
- Only available to licensed Enterprise customers

**Other Artifacts:**

- `README.md` - Mod documentation
- `CHANGELOG.md` - Version history
- `functions/*.zip` - Lambda function bundles

### Artifact Usage by Consumer

**Important finding:** `turbot.docs.json` is currently used **only by the hub build pipeline**. The Guardrails product (CLI, workspace) does not download or use it.

| Artifact | CLI (`turbot install`) | Product (`turbot up`) | Hub Build | Notes |
|----------|------------------------|----------------------|-----------|-------|
| `turbot.head.json` | **Yes** | No | No | Downloaded to `turbot_mods/` for local development |
| `turbot.dist.json` | No | **Yes** | No | Full implementation, used for mod installation |
| `turbot.docs.json` | **No** | **No** | **Yes** | Documentation-optimized format, hub-only |
| `functions/*.zip` | No | **Yes** | No | Lambda bundles for running controls |
| `README.md` | Yes | No | Yes | Downloaded with head.json |

**Implication for Internal Hub:** To get documentation data into the product, we would need to either:

1. **Download `turbot.docs.json` during mod install** - Modify install process to fetch and store docs
2. **Generate from `turbot.head.json`** - The head file contains most of the same data, just structured differently
3. **Query registry separately** - Fetch docs on-demand from registry API (not viable for air-gapped)

The fact that `turbot.head.json` contains similar data (titles, descriptions, schemas) suggests option 2 may be viable without needing to download additional artifacts.

---

### What Is the Registry Used For?

| Use Case               | Who Uses It                          | What They Access                                                                             |
| ---------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------- |
| **Mod Development**    | Mod developers                       | `turbot install` downloads `turbot.head.json` for peer dependencies to `turbot_mods/` folder |
| **Mod Discovery**      | Hub, turbot.com website              | GraphQL API to list/search available mods                                                    |
| **Documentation**      | Hub build pipeline                   | `turbot.docs.json` for rendering mod documentation                                           |
| **Mod Installation**   | Guardrails product (SaaS/Enterprise) | Full `index.zip` bundle for installing mods into a workspace                                 |
| **Version Resolution** | CLI, Guardrails                      | Semver queries to find compatible versions                                                   |
| **Licensing**          | Enterprise customers                 | License validation and usage tracking                                                        |

---

### Is This Where Mods Are Installed From?

**Yes.** The Registry is the source for all mod installations.

#### For Local Development (`turbot install`)

Downloads **header files only** (small, fast):

```
turbot install @turbot/aws-s3
  ↓
Registry GraphQL API → modVersion query
  ↓
Download turbot.head.json, README.md, CHANGELOG.md
  ↓
Extract to turbot_mods/@turbot/aws-s3/
```

This gives developers type information for IDE support and composition without downloading full implementations.

#### For Guardrails Workspace (`turbot up`)

Downloads **full mod bundle** (includes implementation):

```
turbot up
  ↓
Pack local mod → index.zip
  ↓
Upload to Guardrails workspace via GraphQL mutation
  ↓
Workspace downloads peer dependencies from Registry
  ↓
Registry provides turbot.dist.json + function bundles
```

#### For Air-Gapped Installations

```
turbot download @turbot/aws-s3 --output aws-s3.zip
  ↓
Registry provides full index.zip bundle
  ↓
Transfer to air-gapped network
  ↓
turbot up --zip-file aws-s3.zip
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                         TURBOT REGISTRY ARCHITECTURE                                     │
│                         Repository: turbotio/turbot.com                                  │
└─────────────────────────────────────────────────────────────────────────────────────────┘

                              CLIENTS
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │  Turbot CLI     │  │  Hub Build      │  │  Guardrails     │  │  turbot.com     │    │
│  │  (publish,      │  │  Pipeline       │  │  Product        │  │  Website        │    │
│  │   install)      │  │                 │  │  (mod install)  │  │                 │    │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘    │
└───────────┼─────────────────────┼─────────────────────┼─────────────────────┼───────────┘
            │                     │                     │                     │
            └─────────────────────┼─────────────────────┼─────────────────────┘
                                  │                     │
                                  ▼                     ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              AWS INFRASTRUCTURE                                          │
│                                                                                          │
│  ┌───────────────────────────────────────────────────────────────────────────────────┐  │
│  │                         AWS AppSync (GraphQL API)                                  │  │
│  │                                                                                    │  │
│  │  ENDPOINTS:                                                                        │  │
│  │  ├── Production:   guardrails.turbot.com/graphql                                  │  │
│  │  ├── Staging:      guardrails.turbot-stg.com/graphql                              │  │
│  │  └── Development:  guardrails.turbot-dev.com/graphql                              │  │
│  │                                                                                    │  │
│  │  RESOLVERS: VTL Mapping Templates → DynamoDB / Lambda                             │  │
│  └───────────────────────────────────────────────────────────────────────────────────┘  │
│                                         │                                                │
│              ┌──────────────────────────┼──────────────────────────┐                    │
│              │                          │                          │                    │
│              ▼                          ▼                          ▼                    │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌───────────────────────┐       │
│  │  AWS DynamoDB         │  │  AWS Lambda           │  │  AWS Cognito          │       │
│  │  (Data Storage)       │  │  (Business Logic)     │  │  (Authentication)     │       │
│  │                       │  │                       │  │                       │       │
│  │  Tables:              │  │  Triggers:            │  │  User Pools:          │       │
│  │  • identities         │  │  • mod.js             │  │  • us-east-2 (prod)   │       │
│  │  • modVersions        │  │  • workspace.js       │  │  • us-east-2 (stg)    │       │
│  │  • workspaces         │  │  • identity.js        │  │  • us-east-2 (dev)    │       │
│  │  • licenses           │  │  • license.js         │  │                       │       │
│  │  • roles              │  │  • cognito.js         │  │  JWT tokens for       │       │
│  │  • workspaceUsages    │  │  • stripe.js          │  │  GraphQL auth         │       │
│  │  • ...more            │  │  • sso.js             │  │                       │       │
│  └───────────────────────┘  └───────────────────────┘  └───────────────────────┘       │
│                                         │                                                │
│                                         ▼                                                │
│  ┌───────────────────────────────────────────────────────────────────────────────────┐  │
│  │                            AWS S3 (Artifact Storage)                               │  │
│  │                                                                                    │  │
│  │  BUCKETS:                                                                          │  │
│  │  ├── turbot-mod-repository-production                                             │  │
│  │  ├── turbot-mod-repository-staging                                                │  │
│  │  ├── turbot-mod-repository-development                                            │  │
│  │  └── turbot-workspace-usage-{phase}                                               │  │
│  │                                                                                    │  │
│  │  KEY STRUCTURE:                                                                    │  │
│  │  └── /@turbot/{mod-name}/{version}/                                               │  │
│  │      ├── {mod-name}-{version}.tar.gz                                              │  │
│  │      ├── turbot.dist.json                                                         │  │
│  │      ├── turbot.head.json                                                         │  │
│  │      ├── turbot.docs.json                                                         │  │
│  │      ├── README.md                                                                │  │
│  │      └── functions/*.zip                                                          │  │
│  └───────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                          │
│  ┌───────────────────────────────────────────────────────────────────────────────────┐  │
│  │                         Additional AWS Services                                    │  │
│  │                                                                                    │  │
│  │  • AWS Step Functions: Orchestrate multi-step workflows (workspace creation)      │  │
│  │  • AWS CloudFormation: Provision SaaS workspaces                                  │  │
│  │  • AWS WAF: Web Application Firewall for API protection                           │  │
│  │  • AWS CloudFront: CDN for static content                                         │  │
│  │  • AWS SSM Parameter Store: Secrets storage                                       │  │
│  └───────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Repository Structure

```
turbotio-turbot.com/
├── graphql/                      # Registry GraphQL API (main service)
│   ├── schema.graphql            # GraphQL schema (691 lines)
│   ├── serverless.yml            # Serverless Framework config (~2500 lines)
│   ├── mapping-templates/        # AppSync VTL resolvers
│   │   ├── query/                # Query resolvers
│   │   ├── mutation/             # Mutation resolvers
│   │   ├── Identity/             # Identity type resolvers
│   │   ├── ModVersion/           # ModVersion type resolvers
│   │   ├── Workspace/            # Workspace type resolvers
│   │   └── ...
│   ├── triggers/                 # Lambda functions
│   │   ├── mod.js                # Mod operations (25KB)
│   │   ├── workspace.js          # Workspace management (120KB)
│   │   ├── identity.js           # User/Org management
│   │   ├── cognito.js            # Auth triggers
│   │   ├── stripe.js             # Billing integration
│   │   └── ...
│   └── bin/                      # CLI utilities
│
├── web/                          # CloudFormation for web infrastructure
├── saas/                         # SaaS-specific resources
├── pipeline/                     # CI/CD pipeline definitions
├── scripts/                      # Deployment scripts
└── README.md                     # Setup and deployment docs
```

---

## Data Model

### DynamoDB Tables

| Table                    | Primary Key    | Sort Key           | Purpose                 |
| ------------------------ | -------------- | ------------------ | ----------------------- |
| `identities`             | `name`         | -                  | Users and Organizations |
| `modVersions`            | `fullName`     | `version`          | Mod version records     |
| `workspaces`             | `identityName` | `name`             | SaaS workspace records  |
| `licenses`               | `identityName` | `id`               | Enterprise licenses     |
| `roles`                  | `userName`     | `organizationName` | Org membership          |
| `workspaceUsages`        | `workspaceId`  | `periodUri`        | Usage tracking          |
| `identityPaymentMethods` | `id`           | -                  | Stripe payment methods  |

### Key Entities

```
Identity (User or Organization)
├── name: string (unique, e.g., "turbot", "acme")
├── title: string (display name)
├── type: "USER" | "ORGANIZATION"
├── billing: BillingDetails
├── workspaces: [Workspace]
├── licenses: [License]
└── modVersions: [ModVersion]

ModVersion
├── identityName: string (owner, e.g., "turbot")
├── name: string (mod name, e.g., "aws-s3")
├── fullName: string (e.g., "@turbot/aws-s3")
├── version: string (semver, e.g., "5.7.2")
├── status: UPLOADING | PUBLISHING | AVAILABLE | RECOMMENDED | UNAVAILABLE | DELETED
├── head: ModVersionHead (metadata from turbot.head.json)
├── artifacts: ModVersionArtifacts (S3 URLs)
└── timestamps: created, lastModified

Workspace
├── identityName: string (owner)
├── name: string (workspace name)
├── status: CREATING | AVAILABLE | ERROR | UNAVAILABLE
├── url: string (workspace URL)
├── plan: CLOUD | ENTERPRISE
└── subscription: Subscription
```

---

## GraphQL API

### Key Queries

```graphql
# List all public mods
mods(search: String, identityName: String, name: String, status: ModStatus): [Mod!]!

# Get mod versions
modVersions(identityName: String, name: String, versionRange: String, status: [ModStatus!]): [ModVersion!]!

# Get specific mod version (with artifact URLs)
modVersion(identityName: String, name: String!, version: String, status: [ModStatus!]): ModVersion!

# Get identity details
identity(name: String): Identity!

# Get workspace details
workspace(identityName: String, name: String!): Workspace!
```

### Key Mutations

```graphql
# Create new mod version (returns S3 upload URL)
createModVersion(identityName: String, name: String!, version: String!): ModVersion!

# Update mod version status
updateModVersion(identityName: String, name: String!, version: String!, attributes: ModVersionUpdateAttributes): ModVersion!

# Create workspace
createWorkspace(identityName: String, name: String!, attributes: WorkspaceAttributes): Workspace!

# Manage organizations
createOrganization(name: String!, attributes: OrganizationAttributes): Organization!
```

---

## Mod Publishing Flow

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           MOD PUBLISHING WORKFLOW                                        │
└─────────────────────────────────────────────────────────────────────────────────────────┘

STEP 1: CREATE VERSION
──────────────────────
  CLI                              AppSync                          DynamoDB
   │                                  │                                │
   │── createModVersion() ───────────▶│                                │
   │   {name: "aws-s3",               │                                │
   │    version: "5.7.2"}             │                                │
   │                                  │── Put item ───────────────────▶│
   │                                  │   status: UPLOADING            │
   │                                  │                                │
   │                                  │── Generate S3 presigned URL    │
   │                                  │                                │
   │◀── {uploadUrl, status} ──────────│                                │


STEP 2: UPLOAD ARTIFACTS
────────────────────────
  CLI                              S3 Bucket
   │                                  │
   │── HTTP PUT ─────────────────────▶│
   │   URL: presigned uploadUrl       │
   │   Body: aws-s3-5.7.2.tar.gz      │
   │                                  │
   │◀── 200 OK ───────────────────────│


STEP 3: PROCESS UPLOAD (Lambda Trigger)
───────────────────────────────────────
  S3 Event                         Lambda (mod.js)                 S3 / DynamoDB
   │                                  │                                │
   │── ObjectCreated ────────────────▶│                                │
   │                                  │── Download tar.gz              │
   │                                  │── Extract contents             │
   │                                  │── Validate turbot.dist.json    │
   │                                  │── Upload extracted files ─────▶│
   │                                  │   • turbot.dist.json           │
   │                                  │   • turbot.head.json           │
   │                                  │   • turbot.docs.json           │
   │                                  │   • README.md                  │
   │                                  │   • functions/*.zip            │
   │                                  │                                │
   │                                  │── Update DynamoDB ────────────▶│
   │                                  │   status: AVAILABLE            │
   │                                  │   artifacts: {URLs}            │


STEP 4: UPDATE STATUS (Optional)
────────────────────────────────
  CLI                              AppSync                          DynamoDB
   │                                  │                                │
   │── updateModVersion() ───────────▶│                                │
   │   {status: "RECOMMENDED"}        │── Update item ────────────────▶│
   │                                  │                                │
   │◀── {status: "RECOMMENDED"} ──────│                                │
```

---

## Authentication

**The registry is fully authenticated.** All operations (read and write) require authentication via AWS Cognito.

### Cognito User Pools

| Environment | User Pool ID          | Client ID                    | Region    |
| ----------- | --------------------- | ---------------------------- | --------- |
| Production  | `us-east-2_1gyiELVAp` | `rum02r03k75aieua1jnq60nmn`  | us-east-2 |
| Staging     | `us-east-2_xvsEU8Rxg` | `6fh4aa9tg6bujqjmuv379a1f17` | us-east-2 |
| Development | `us-east-2_R0IA1218a` | `732jnn7rospjium4b7f544cg4v` | us-east-2 |

### Authentication Flow

1. User authenticates via Cognito (username/password)
2. Cognito returns JWT tokens (idToken, refreshToken)
3. CLI stores tokens in `~/.config/turbot/registry.yml`
4. GraphQL requests include `Authorization: {idToken}` header
5. AppSync validates JWT against Cognito User Pool
6. Resolvers access user identity from `$context.identity`

### What Requires Authentication?

| Operation | Requires Auth? | Notes |
|-----------|---------------|-------|
| `turbot publish` | **Yes** | Create modVersion, upload artifacts |
| `turbot install` | **Yes** | Query modVersion, get presigned S3 URLs |
| GraphQL queries (mods, modVersions) | **Yes** | All AppSync queries require JWT |
| S3 artifact downloads | **Via presigned URLs** | URLs are time-limited, returned by authenticated API calls |
| Hub build pipeline | **Yes** | Must authenticate to fetch turbot.docs.json from S3 |

### S3 Access Model

S3 artifacts are **not publicly accessible**. Access works as follows:

1. Client authenticates with Cognito
2. Client queries GraphQL API for mod version
3. API returns presigned S3 URLs (time-limited)
4. Client downloads artifacts using presigned URLs

This means any client consuming registry data (CLI, hub build, product) must authenticate first.

### Implications for Internal Hub

Since the registry requires authentication:

1. **Hub build pipeline** must have credentials to fetch `turbot.docs.json`
2. **On-prem installations** cannot query registry directly without outbound internet + credentials
3. **Air-gapped installations** have no registry access at all
4. **Internal Hub** should store documentation locally rather than querying registry at runtime

---

## Deployment

### Environments

| Environment | URL            | AWS Account         | Source Branch |
| ----------- | -------------- | ------------------- | ------------- |
| Development | turbot-dev.com | 525041748188 (SaaS) | `development` |
| Staging     | turbot-stg.com | 775565296390 (SaaS) | `master`      |
| Production  | turbot.com     | 287590803701 (SaaS) | `production`  |

### Deployment Pipeline

```
Git Push → CodePipeline → CodeBuild
                              │
                              ├── serverless deploy (graphql/)
                              ├── CloudFormation (web/)
                              └── S3 sync (static content)
```

### Serverless Framework

The Registry uses [Serverless Framework](https://www.serverless.com/) with plugins:

- `serverless-appsync-plugin` - AppSync GraphQL deployment
- `serverless-step-functions` - Step Functions for workflows
- `serverless-plugin-split-stacks` - CloudFormation stack splitting
- `serverless-plugin-lambda-dead-letter` - DLQ for Lambda errors

---

## Key Files

### graphql/schema.graphql

Complete GraphQL schema defining all types, queries, and mutations. Key types:

- `Identity`, `User`, `Organization`
- `Mod`, `ModVersion`, `ModVersionArtifacts`
- `Workspace`, `License`, `Role`

### graphql/serverless.yml

Serverless Framework configuration defining:

- DynamoDB tables (9 tables)
- S3 buckets (mod repository, usage, logs)
- Lambda functions (triggers)
- AppSync API configuration
- IAM roles and policies

### graphql/triggers/mod.js

Lambda functions for mod operations:

- `searchMods` - Query mods by name/status
- `queryVersions` - List versions with semver filtering
- `getVersion` - Get specific version details
- `processUpload` - Handle S3 upload events

### graphql/triggers/workspace.js

Lambda functions for workspace management:

- Create SaaS workspace (CloudFormation stack)
- Monitor workspace status
- Handle workspace deletion

---

## Implications for Internal Hub

### What the Internal Hub Needs

The Internal Hub needs to display documentation for **installed mods only**, unlike the public Hub which shows all published mods. Key data required:

| Data Type      | Source             | Content                                              |
| -------------- | ------------------ | ---------------------------------------------------- |
| Resource Types | `turbot.docs.json` | URI, title, description, icon, schema, hierarchy     |
| Control Types  | `turbot.docs.json` | URI, title, description, targets, category           |
| Policy Types   | `turbot.docs.json` | URI, title, description, schema, defaults, templates |
| Mod Metadata   | `turbot.head.json` | Version, dependencies, author, license               |
| README         | S3 artifact        | Markdown documentation                               |

### Data Access Strategy

1. **Don't access Registry directly from Internal Hub** - Registry is external to customer environments
2. **Mod data already exists locally** - When mods are installed, Guardrails stores type definitions in the workspace database
3. **For SaaS**: Query installed mod versions, then fetch `turbot.docs.json` from Registry
4. **For Air-Gapped**: Documentation must be bundled with mod installation

### Key Insight: Mods vs Registry

The Internal Hub doesn't need to query the Registry at runtime because:

- **Installed mods have all type definitions** in the Guardrails workspace database (`resource_types`, `control_types`, `policy_types` tables)
- **What's missing** is the documentation-formatted content (`turbot.docs.json`)

Options:

1. **Store `turbot.docs.json` during mod install** - Capture and persist documentation when mod is installed
2. **Generate docs on-demand** - Use `turbot inspect --output-template docs.njk` pattern against installed mod data
3. **Hybrid** - Cache docs.json from Registry on first access, fall back to local generation

### Air-Gap Strategy

For air-gapped deployments:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CONNECTED ENVIRONMENT                             │
│                                                                          │
│  1. Download mod bundles:                                                │
│     turbot download @turbot/aws --output ./transfer/aws.zip              │
│                                                                          │
│  2. Bundles include:                                                     │
│     - turbot.dist.json (implementation)                                  │
│     - turbot.head.json (type definitions)                                │
│     - turbot.docs.json (documentation) ← KEY FOR INTERNAL HUB            │
│     - functions/*.zip (Lambda bundles)                                   │
│     - README.md, CHANGELOG.md                                            │
│                                                                          │
│  3. Transfer to air-gapped network                                       │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        AIR-GAPPED ENVIRONMENT                            │
│                                                                          │
│  4. Install mod:                                                         │
│     turbot up --zip-file ./aws.zip                                       │
│                                                                          │
│  5. During install, extract and store turbot.docs.json                   │
│     → Store in workspace database or filesystem                          │
│     → Available to Internal Hub without network access                   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Sync Approaches by Deployment Type

| Deployment              | Strategy                    | Data Source                                   |
| ----------------------- | --------------------------- | --------------------------------------------- |
| **SaaS**                | Real-time or cached         | Registry API via presigned S3 URLs            |
| **On-Prem (Connected)** | Scheduled sync or on-demand | Registry API with caching                     |
| **Air-Gapped**          | Bundle at install time      | `turbot.docs.json` extracted from mod package |

### Implementation Recommendation

**Capture docs during mod installation:**

1. Modify `turbot up` / mod install to extract `turbot.docs.json` from bundle
2. Store in workspace database alongside installed mod version
3. Internal Hub queries local database, never needs Registry access
4. Works identically for SaaS, connected, and air-gapped deployments

---

## Registry Storage Estimates

**Note:** These are rough estimates based on hub metadata and sample files. Actual numbers would require querying S3 bucket metrics directly.

### Registry Scale (February 2026)

| Metric | Count |
|--------|-------|
| Total mods | 180 |
| Versions per mod | ~80-120 average |
| **Total mod versions** | **~14,000-20,000** |
| Policy types | 8,169 |
| Control types | 3,218 |
| Resource types | 491 |
| Action types | 1,808 |
| Definitions | 2,426 |

Sample version counts:
- `@turbot/aws-ec2`: 118 versions
- `@turbot/aws-iam`: 112 versions
- `@turbot/aws-s3`: 85 versions

### Per-Version Artifact Sizes (estimates)

| File | Typical Size | Notes |
|------|-------------|-------|
| `turbot.docs.json` | 50KB - 500KB | Varies by mod complexity |
| `turbot.dist.json` | 100KB - 1MB | Full implementation metadata |
| `turbot.head.json` | 50KB - 500KB | Type definitions for composition |
| `functions/*.zip` | 1MB - 10MB | **Lambda function code** (largest component) |
| `{mod}.tar.gz` | 2MB - 15MB | Compressed bundle of everything |

### "Docs Only" vs "Full Bundles" Explained

**Docs only** = `turbot.docs.json` + `README.md`

Contains everything needed for **documentation and browsing**:
- Resource type definitions (uri, title, description, schema, icon, category)
- Control type definitions (uri, title, description, targets)
- Policy type definitions (uri, title, description, schema, defaults)
- Action type definitions
- Prevention type definitions (in definitions section)

**Full bundles** = Everything in S3 for mod installation:
- All docs files above, plus:
- `turbot.dist.json` - implementation metadata, function references
- `turbot.head.json` - type definitions for mod composition/development
- `functions/*.zip` - **actual Lambda function code** (this is 80-90% of the size)
- `{mod}-{version}.tar.gz` - compressed archive of everything

**Why full bundles are 10-50x larger:** A mod like `aws-ec2` with 152 controls includes Lambda code for each control's discovery, CMDB, and enforcement logic. The executable code dwarfs the documentation metadata.

| Use Case | What You Need | Size per Mod |
|----------|---------------|--------------|
| Browse/search documentation | `turbot.docs.json` only | ~50-500 KB |
| LLM tool access to type info | `turbot.docs.json` only | ~50-500 KB |
| Install mod and run controls | Full bundle with `functions/*.zip` | ~2-15 MB |

### Total Registry Size (rough estimates)

| Scope | Compressed | Uncompressed |
|-------|------------|--------------|
| **Docs only (latest versions)** | ~50-100 MB | ~200-500 MB |
| **Docs only (all versions)** | ~5-10 GB | ~20-40 GB |
| **Full bundles (latest versions)** | ~500 MB - 1 GB | ~2-5 GB |
| **Full bundles (all versions)** | ~30-60 GB | ~100-200 GB |

### Implications

1. **"Install all mods" approach**: Installing all 180 mods (latest versions only) would require downloading ~500MB-1GB of bundles. Storage in the workspace database would be smaller (just type definitions, not Lambda functions).

2. **Air-gapped full mirror**: Mirroring all versions of all mods would require 30-60GB of storage. Mirroring only latest/recommended versions is much more feasible at ~1GB.

3. **Documentation-only sync**: If we only need `turbot.docs.json` for hub functionality (not full mod installation), the storage requirement drops significantly to ~50-100MB for latest versions.

---

## Related Documents

- [Hub Architecture](hub-architecture.md) - Current hub build pipeline
- [Data Sources](data-sources.md) - Where hub data originates
- [Epic Index](../index.md) - Internal Hub epic overview
