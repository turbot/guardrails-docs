# Docs Export - Progress Tracker

## Status: In Progress

### Phase 1: Design & Planning

| Task | Status | Notes |
|------|--------|-------|
| Read and analyze turbot-registry.md | Done | Understood S3 structure, auth model, artifact formats |
| Create design document | Done | `design.md` - export format, S3 paths, auth options |
| Create GitHub workflow (manual trigger) | Done | `.github/workflows/docs-export.yml` |
| Create build script | Done | `scripts/build-docs-export.js` |
| Create progress tracker | Done | This file |

### Phase 2: Decisions (Blocked - Needs Human Input)

| Decision | Status | Options | Chosen |
|----------|--------|---------|--------|
| Authentication approach | Pending | A: GitHub OIDC, B: IAM cross-account, C: Cognito, D: Access keys | Recommend A |
| Include images in export? | Pending | Yes (~50-100 MB) / No (~2-5 MB, images served from Vercel) | - |
| S3 key path | Pending | `/@turbot/guardrails-docs/` or separate namespace | - |
| Create DynamoDB record? | Pending | Yes (discoverable via GraphQL) / No (S3 only) | - |
| Versioning strategy | Pending | Date-based / Semver / Commit SHA | - |

### Phase 3: Implementation

| Task | Status | Notes |
|------|--------|-------|
| IAM setup in dev account | Not started | Depends on auth decision |
| IAM setup in staging account | Not started | Depends on auth decision |
| IAM setup in production account | Not started | Depends on auth decision |
| Add GitHub secrets | Not started | Role ARNs or access keys |
| Test workflow (dev) | Not started | Manual trigger to dev environment |
| Test workflow (staging) | Not started | Manual trigger to staging |
| Verify S3 upload | Not started | Confirm file accessible in bucket |
| Uncomment S3 upload steps in workflow | Not started | After auth is configured |

### Phase 4: Validation & Rollout

| Task | Status | Notes |
|------|--------|-------|
| Verify consumer can read export | Not started | Hub build pipeline or other consumer |
| Test with production | Not started | Export to production registry |
| Document runbook | Not started | How to trigger, troubleshoot |
| Consider automation (push to main) | Not started | Future enhancement |

---

## Files Created

| File | Purpose |
|------|---------|
| `.claude/epics/docs-export/spec.md` | Epic specification (original) |
| `.claude/epics/docs-export/turbot-registry.md` | Registry architecture reference |
| `.claude/epics/docs-export/design.md` | Design document |
| `.claude/epics/docs-export/progress.md` | This progress tracker |
| `.github/workflows/docs-export.yml` | GitHub Actions workflow |
| `scripts/build-docs-export.js` | Build script for export JSON |
