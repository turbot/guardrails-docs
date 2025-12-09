---
title: Prevention Examples
sidebar_label: Examples
---

# Prevention Examples

The Examples tab provides concrete implementation guidance including policy templates, code samples, and configuration examples for common preventions. This page accelerates implementation by offering tested, production-ready policies you can adapt for your environment.

## Understanding the Examples Tab

Prevention examples are organized by prevention type and provide ready-to-use templates that demonstrate best practices for implementing security controls.

**What you'll find:**
- **Policy templates**: Ready-to-use SCP, Azure Policy, and GCP Organization Policy definitions
- **Code samples**: Terraform/IaC examples for automated prevention deployment
- **Configuration examples**: Step-by-step guides for manual implementation
- **Best practices**: Recommended configurations and common patterns
- **Testing approaches**: How to validate preventions work correctly

## Page Layout

### Navigation

- **Page title**: "Prevention Examples - Policy templates and implementation guidance"
- **Tabs**: Preventions, Examples, Types, Layers
- **Search box**: Find examples by keyword
- **Category filter**: Filter by cloud provider or prevention type

### Example Categories

Examples are organized by:
- **Cloud Provider**: AWS, Azure, GCP, GitHub
- **Prevention Type**: SCP, Azure Policy, Organization Policy, Branch Ruleset, Account Setting
- **Layer**: Build, Access, Config, Runtime
- **Use Case**: Common security patterns

## AWS Service Control Policy (SCP) Examples

### Restrict AWS Resources to Allowed Regions

**Purpose:** Prevent operations in unauthorized regions to enforce data residency and compliance.

**Policy Template:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyAllOutsideAllowedRegions",
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringNotEquals": {
          "aws:RequestedRegion": [
            "us-east-1",
            "us-west-2"
          ]
        },
        "ArnNotLike": {
          "aws:PrincipalArn": [
            "arn:aws:iam::*:role/AllowedGlobalRole"
          ]
        }
      }
    }
  ]
}
```

**Implementation Notes:**
- Add all approved regions to the `aws:RequestedRegion` array
- Exclude global services and roles that need global access
- Common exceptions: IAM, CloudFront, Route53
- Test in non-production before deploying to production

### Prohibit Root User Actions

**Purpose:** Prevent root user from performing any actions except emergency operations.

**Policy Template:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyRootUserActions",
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringLike": {
          "aws:PrincipalArn": "arn:aws:iam::*:root"
        }
      }
    }
  ]
}
```

**Implementation Notes:**
- Apply at Organization root or OU level
- Ensure IAM users/roles exist before implementing
- Document break-glass procedure for true emergencies
- Monitor CloudTrail for root user activity

### Require MFA for Sensitive Actions

**Purpose:** Require multi-factor authentication for high-risk operations.

**Policy Template:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenySensitiveActionsWithoutMFA",
      "Effect": "Deny",
      "Action": [
        "iam:DeleteRole",
        "iam:DeleteUser",
        "s3:DeleteBucket",
        "rds:DeleteDBInstance",
        "ec2:TerminateInstances"
      ],
      "Resource": "*",
      "Condition": {
        "BoolIfExists": {
          "aws:MultiFactorAuthPresent": "false"
        }
      }
    }
  ]
}
```

**Implementation Notes:**
- Customize the action list based on your risk assessment
- Consider adding CloudTrail, Config, GuardDuty deletion
- Exempt service roles and automation users appropriately
- Communicate changes to users before implementation

### Enforce S3 Block Public Access

**Purpose:** Prevent S3 buckets from being made public at the organization level.

**Policy Template:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyS3PublicAccess",
      "Effect": "Deny",
      "Action": [
        "s3:PutAccountPublicAccessBlock",
        "s3:PutBucketPublicAccessBlock"
      ],
      "Resource": "*",
      "Condition": {
        "StringNotEquals": {
          "s3:BlockPublicPolicy": "TRUE",
          "s3:BlockPublicAcls": "TRUE",
          "s3:IgnorePublicAcls": "TRUE",
          "s3:RestrictPublicBuckets": "TRUE"
        }
      }
    }
  ]
}
```

**Implementation Notes:**
- This prevents disabling S3 Block Public Access
- Combine with account-level S3 Block Public Access settings
- Consider exceptions for legitimate public content buckets
- Use the SCP Simulator to test before deployment

## Azure Policy Examples

### Require Encryption for Storage Accounts

**Purpose:** Ensure all Azure Storage accounts use customer-managed encryption.

**Policy Template:**
```json
{
  "properties": {
    "displayName": "Storage accounts should use customer-managed key for encryption",
    "policyType": "Custom",
    "mode": "Indexed",
    "description": "Require storage accounts to use customer-managed keys (CMK) for encryption at rest.",
    "parameters": {},
    "policyRule": {
      "if": {
        "allOf": [
          {
            "field": "type",
            "equals": "Microsoft.Storage/storageAccounts"
          },
          {
            "field": "Microsoft.Storage/storageAccounts/encryption.keySource",
            "notEquals": "Microsoft.Keyvault"
          }
        ]
      },
      "then": {
        "effect": "Deny"
      }
    }
  }
}
```

**Implementation Notes:**
- Deploy via Azure Policy assignment
- Requires Azure Key Vault setup first
- Set up disk encryption sets before enforcement
- Audit existing storage accounts before switching to Deny

### Restrict Resource Types

**Purpose:** Limit which Azure resource types can be created.

**Policy Template:**
```json
{
  "properties": {
    "displayName": "Allowed resource types",
    "policyType": "Custom",
    "mode": "Indexed",
    "description": "Restrict resource creation to approved resource types only.",
    "parameters": {
      "listOfResourceTypesAllowed": {
        "type": "Array",
        "metadata": {
          "displayName": "Allowed resource types",
          "strongType": "resourceTypes"
        },
        "defaultValue": [
          "Microsoft.Compute/virtualMachines",
          "Microsoft.Storage/storageAccounts",
          "Microsoft.Network/virtualNetworks"
        ]
      }
    },
    "policyRule": {
      "if": {
        "not": {
          "field": "type",
          "in": "[parameters('listOfResourceTypesAllowed')]"
        }
      },
      "then": {
        "effect": "Deny"
      }
    }
  }
}
```

**Implementation Notes:**
- Customize the allowed resource types list
- Start with audit effect to identify current usage
- Gradually expand allowed types based on requirements
- Document approval process for new resource types

## GCP Organization Policy Examples

### Restrict Resource Locations

**Purpose:** Enforce that GCP resources can only be created in allowed locations.

**Policy Template:**
```yaml
name: organizations/{org_id}/policies/gcp.resourceLocations
spec:
  rules:
    - values:
        allowedValues:
          - in:us-locations
          - in:us-east1
          - in:us-west1
      enforce: true
```

**Implementation Notes:**
- Apply at organization or folder level
- Use location groups (e.g., `in:us-locations`) for simplicity
- Test with non-production projects first
- Document exceptions for global services

### Disable Service Account Key Creation

**Purpose:** Prevent creation of service account keys to enforce workload identity.

**Policy Template:**
```yaml
name: organizations/{org_id}/policies/iam.disableServiceAccountKeyCreation
spec:
  rules:
    - enforce: true
```

**Implementation Notes:**
- Migrate to workload identity federation before enforcing
- Identify and migrate applications using service account keys
- Set up alternative authentication mechanisms
- Provide clear guidance to developers

## GitHub Branch Protection Examples

### Require Pull Request Reviews

**Purpose:** Enforce code review before merging to protected branches.

**Ruleset Configuration:**
```yaml
name: "Branch Protection"
target: branch
enforcement: active
conditions:
  ref_name:
    include:
      - "~DEFAULT_BRANCH"
      - "refs/heads/main"
      - "refs/heads/release/*"
rules:
  pull_request:
    required_approving_review_count: 2
    dismiss_stale_reviews_on_push: true
    require_code_owner_reviews: true
    require_last_push_approval: false
  required_status_checks:
    strict_status_check_policy: true
    status_checks:
      - context: "build"
      - context: "test"
      - context: "security-scan"
```

**Implementation Notes:**
- Apply to default branch and release branches
- Start with 1 required reviewer, increase to 2 over time
- Define CODEOWNERS file for automatic review assignment
- Ensure CI/CD pipelines are reliable before requiring status checks

### Block Force Pushes and Deletions

**Purpose:** Prevent history rewriting and branch deletion.

**Ruleset Configuration:**
```yaml
name: "Protect Branch History"
target: branch
enforcement: active
conditions:
  ref_name:
    include:
      - "~DEFAULT_BRANCH"
      - "refs/heads/release/*"
rules:
  deletion: false
  non_fast_forward: false
  required_linear_history: true
```

**Implementation Notes:**
- Apply to main and release branches
- Train developers on proper workflow before enforcement
- Provide guidance on handling mistakes without force push
- Consider allowing force push on feature branches

## Terraform Examples

### Deploy AWS Account-Level S3 Settings

**Purpose:** Configure S3 Block Public Access at the account level using Infrastructure as Code.

**Terraform Code:**
```hcl
resource "aws_s3_account_public_access_block" "this" {
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
```

**Implementation Notes:**
- Deploy to each AWS account via Terraform
- Use Terraform Cloud or GitOps for consistent deployment
- Monitor Terraform state for configuration drift
- Pair with SCPs to prevent disabling these settings

### Deploy Azure Policy Assignment

**Purpose:** Assign Azure Policy to enforce security requirements.

**Terraform Code:**
```hcl
resource "azurerm_subscription_policy_assignment" "storage_encryption" {
  name                 = "require-storage-encryption"
  subscription_id      = data.azurerm_subscription.current.id
  policy_definition_id = azurerm_policy_definition.storage_encryption.id
  description          = "Require customer-managed encryption for storage accounts"
  display_name         = "Require Storage Account Encryption"

  parameters = jsonencode({
    effect = {
      value = "Deny"
    }
  })
}
```

**Implementation Notes:**
- Start with "Audit" effect, move to "Deny" after remediation
- Apply at subscription or management group level
- Monitor compliance state before enforcement
- Provide exemptions for legacy applications when necessary

## Testing Preventions

### Using the SCP Simulator

**Process:**
1. Navigate to the Simulator page
2. Select your AWS Organization
3. Paste the SCP policy JSON
4. Test against sample API calls or CloudTrail events
5. Verify expected allows and denies
6. Refine policy based on test results

**Example Test Cases:**
```json
// Test Case 1: EC2 in denied region
{
  "Action": "ec2:RunInstances",
  "Resource": "*",
  "Region": "ap-southeast-1"
}
// Expected: Denied

// Test Case 2: EC2 in allowed region
{
  "Action": "ec2:RunInstances",
  "Resource": "*",
  "Region": "us-east-1"
}
// Expected: Allowed
```

### Testing Azure Policies

**Process:**
1. Deploy policy in "Audit" mode initially
2. Wait 24 hours for compliance evaluation
3. Review compliance dashboard for violations
4. Remediate non-compliant resources
5. Switch to "Deny" mode
6. Test resource creation in non-production subscription

### Testing GitHub Branch Protection

**Process:**
1. Apply ruleset to test repository first
2. Attempt actions that should be blocked
3. Verify blocks work as expected
4. Test with different user roles
5. Roll out to production repositories gradually

## Best Practices

**Always test in non-production first**
Never deploy preventions directly to production without testing the impact on applications and workflows.

**Use Infrastructure as Code**
Deploy preventions using Terraform, CloudFormation, or ARM templates for consistency and version control.

**Start with audit mode when available**
Azure Policies and some other prevention types support audit before enforce—use this to identify issues.

**Document exceptions**
When preventions need exceptions, document why and track them in a central system.

**Version control policy templates**
Store policy JSON and IaC code in Git to track changes over time and enable rollback.

**Automate deployment**
Use CI/CD pipelines to deploy preventions consistently across accounts/subscriptions.

**Monitor prevention effectiveness**
Just having a prevention active doesn't guarantee it's working—monitor control results and security findings.

**Keep templates updated**
As cloud services evolve, update prevention templates to cover new service features and attack vectors.

## Common Pitfalls

**Overly restrictive policies**
Starting with too many restrictions causes friction and exception requests. Start conservative, tighten over time.

**Not testing thoroughly**
Insufficient testing leads to production outages when preventions block legitimate operations.

**Forgetting service roles**
Many preventions inadvertently block automation and service roles—always include appropriate exceptions.

**No rollback plan**
Have a documented procedure to quickly disable or modify a prevention if it causes issues.

**Ignoring audit logs**
Monitor CloudTrail, Activity Logs, and audit logs to see if preventions are triggering unexpectedly.

## Next Steps

- Return to [Preventions](./preventions.md) to see all active preventions
- Review [Types](./types.md) to understand different prevention mechanisms
- Check [Layers](./layers.md) to see preventions organized by enforcement layer
- Visit [Recommendations](../recommendations/index.md) to prioritize which preventions to implement
- Try the [Simulator](../simulator/index.md) to test Service Control Policies before deployment
