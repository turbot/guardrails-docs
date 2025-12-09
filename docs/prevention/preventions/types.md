---
title: Prevention Types
sidebar_label: Types
---

# Prevention Types

The Types tab groups preventions by their technical implementation mechanism. This view helps you understand the different ways security controls are enforced and identify which prevention types are most used in your environment.

## Understanding Prevention Types

Prevention types represent the technical mechanism used to enforce security controls. Different types operate at different levels of the cloud stack and have different capabilities, limitations, and use cases.

## Page Layout

### Grouping by Type

The Types tab displays preventions organized by their implementation mechanism:

**Type Sections**
- Type name (e.g., "Service Control Policies", "Azure Policy Definitions")
- Description of how this type works
- Count of preventions using this type
- List of individual preventions

### Type Cards

Each type section shows:
- **Type name**: Technical mechanism name
- **Platform**: Cloud provider or platform (AWS, Azure, GCP, GitHub, Multi-cloud)
- **Prevention count**: Number of active preventions using this type
- **Description**: How this type works and when to use it

## AWS Prevention Types

### Service Control Policies (SCPs)

**Description:**
AWS Organization-level policies that set permission guardrails for all accounts in an organization. SCPs never grant permissions—they only restrict what actions can be performed, even if IAM policies would otherwise allow those actions.

**How They Work:**
- Applied at Organization root, OU, or account level
- Inherited down the organization tree
- Use explicit Deny or implicit Deny (allowlist) approaches
- Evaluated before IAM policies
- Cannot be overridden by any IAM policy

**Use Cases:**
- Restrict AWS regions for data residency
- Prevent disabling security services (CloudTrail, Config, GuardDuty)
- Block public resource sharing
- Enforce MFA for sensitive operations
- Restrict AWS service usage

**Advantages:**
- Centralized enforcement across all accounts
- Cannot be bypassed by account administrators
- Immediate effect on all principals
- Simple to apply broadly

**Limitations:**
- Cannot grant permissions, only restrict
- No resource-specific conditions (limited resource-level granularity)
- Maximum of 5 SCPs per entity
- Testing impacts all accounts in scope

**Example Preventions:**
- Restrict AWS resources to allowed regions
- Prohibit root user actions
- Require MFA for sensitive actions
- Prevent disabling AWS Config

**Learn More:**
See [Examples](./examples.md#aws-service-control-policy-scp-examples) for SCP policy templates.

### AWS S3 Account Settings

**Description:**
Account-level S3 security configurations that apply to all S3 buckets in an AWS account, providing baseline protection against public access.

**How They Work:**
- Configured per AWS account
- Apply to all buckets in the account
- Four settings: Block Public ACLs, Ignore Public ACLs, Block Public Policy, Restrict Public Buckets
- Can be enforced at bucket level as well
- Cannot be overridden at bucket level when set at account level

**Use Cases:**
- Block public ACLs on all S3 buckets
- Prevent public bucket policies
- Ignore existing public ACLs
- Restrict public bucket access

**Advantages:**
- Simple to configure and understand
- Applies to all buckets automatically
- Low operational overhead
- Strong protection against public data exposure

**Limitations:**
- S3-specific (doesn't apply to other services)
- Cannot enforce per-bucket encryption or other configurations
- Legitimate public buckets require exceptions

**Example Preventions:**
- Block Public ACLs on AWS S3 Buckets
- Block Public AWS S3 Bucket Policies
- Ignore Public ACLs on AWS S3 Buckets
- Restrict Public Buckets on AWS S3 Buckets

### AWS EC2 Account Attributes

**Description:**
Account-level EC2 settings that control default behaviors and restrictions for EC2 resources.

**How They Work:**
- Configured per AWS account
- Apply to all EC2 resources in the account
- Control image sharing, snapshot sharing, and default settings
- Enforced by AWS service

**Use Cases:**
- Block public EC2 AMI sharing
- Prevent public EBS snapshot sharing
- Configure default EBS encryption

**Advantages:**
- Account-wide enforcement
- Simple configuration
- No policy syntax required

**Limitations:**
- Limited to EC2 service
- Cannot control all EC2 configurations
- May need supplementary controls (SCPs)

**Example Preventions:**
- Block Public AWS EC2 AMI Sharing
- Block Public AWS EBS Snapshot Sharing

## Azure Prevention Types

### Azure Policy Definitions

**Description:**
Subscription-level policies that enforce compliance rules and effects over Azure resources. Can audit, deny, modify, or deploy resources based on policy conditions.

**How They Work:**
- Defined at subscription or management group level
- Use policy rules with conditions and effects
- Support multiple effects: Deny, Audit, DeployIfNotExists, Modify
- Evaluated during resource creation and periodic compliance scans
- Can be parameterized for reusability

**Use Cases:**
- Require encryption for storage accounts
- Restrict resource types
- Enforce naming conventions
- Require diagnostic settings
- Control resource locations

**Advantages:**
- Flexible policy language
- Multiple enforcement modes (audit vs. deny)
- Can automatically remediate (DeployIfNotExists)
- Fine-grained resource targeting

**Limitations:**
- Can be complex to write
- Compliance evaluation has latency
- Some resource properties not covered
- Initiative assignments needed for scale

**Example Preventions:**
- Require encryption at rest for Azure Compute Managed Disks
- Require purge protection for Azure Key Vault vaults
- Require default network access deny for Azure Storage storage accounts

**Learn More:**
See [Examples](./examples.md#azure-policy-examples) for Azure Policy templates.

## GCP Prevention Types

### GCP Organization Policy Constraints

**Description:**
Google Cloud Platform organization-level constraints that limit how resources can be configured across projects.

**How They Work:**
- Applied at organization, folder, or project level
- Inherited down the resource hierarchy
- Use boolean, list, or enum constraints
- Enforce allowed or denied values
- Cannot be overridden by lower-level entities

**Use Cases:**
- Restrict resource locations
- Disable service account key creation
- Control VM external IP addresses
- Restrict VPC peering
- Limit public IP assignments

**Advantages:**
- Simple constraint-based model
- Hierarchical enforcement
- Centralized management
- Comprehensive service coverage

**Limitations:**
- Limited to predefined constraints
- Cannot create custom logic
- Less flexible than Azure Policies
- No audit-only mode (enforce or not)

**Example Preventions:**
- Restrict GCP resources to allowed locations
- Disable service account key creation
- Require VPC flow logs

**Learn More:**
See [Examples](./examples.md#gcp-organization-policy-examples) for Organization Policy templates.

## GitHub Prevention Types

### GitHub Branch Ruleset Settings

**Description:**
Repository protection rules configured at the organization or repository level that control how code can be modified, pushed, or deleted in branches.

**How They Work:**
- Applied at organization or repository level
- Target specific branches by pattern
- Enforce pull request requirements, status checks, and push restrictions
- Evaluated on push, merge, and branch operations
- Can apply to administrators

**Use Cases:**
- Require pull request reviews before merge
- Block force pushes and deletions
- Require status checks to pass
- Require signed commits
- Restrict push access to specific users

**Advantages:**
- Native GitHub integration
- Fine-grained branch targeting
- Easy to configure in UI
- Well-documented

**Limitations:**
- GitHub-specific (doesn't apply to other VCS)
- Can impact developer workflow
- Requires planning for emergency hotfixes

**Example Preventions:**
- Block Branch Deletion
- Block Force Pushes to Branches
- Require Pull Request Reviews
- Require Status Checks

**Learn More:**
See [Examples](./examples.md#github-branch-protection-examples) for Branch Protection configurations.

### GitHub Tag Ruleset Settings

**Description:**
Protection rules for Git tags that prevent tag manipulation and enforce release management practices.

**How They Work:**
- Similar to branch rulesets but for tags
- Prevent tag deletion, force push, and updates
- Control who can create tags
- Enforce tag patterns

**Use Cases:**
- Prevent tag deletion
- Block force pushes to tags
- Restrict tag creation to release engineers
- Enforce tag naming conventions

**Advantages:**
- Protects release tags from tampering
- Prevents supply chain attacks via tag rewriting
- Simple to configure

**Limitations:**
- Tags only (doesn't protect branches)
- May require workflow changes

**Example Preventions:**
- Block Force Pushes to Tags
- Require Tag Creation to be Limited to Authorized Users

## Multi-Cloud Prevention Types

### Guardrails Controls

**Description:**
Turbot Guardrails fine-grained policies that provide continuous governance, compliance, and security automation across multi-cloud environments (AWS, Azure, GCP).

**How They Work:**
- Defined as policies in Turbot Guardrails
- Evaluated continuously against resources
- Support multiple modes: Check (detect), Enforce (prevent), Approve (gate)
- Can automatically remediate non-compliant resources
- Provide detailed compliance reporting

**Use Cases:**
- Require encryption for EBS volumes
- Enforce tagging standards
- Remediate misconfigured security groups
- Approve resource creation workflows
- Enforce naming conventions

**Advantages:**
- Multi-cloud support
- Continuous compliance monitoring
- Automatic remediation capabilities
- Detailed audit trails
- Flexible policy language

**Limitations:**
- Requires Turbot Guardrails platform
- Additional tooling to learn
- Cost of Guardrails platform

**Example Preventions:**
- Require Encryption for AWS EBS Volumes
- Enforce Tagging Standards
- Remediate Public Security Groups

## Comparing Prevention Types

### Scope Comparison

| Type | Scope | Inheritance |
|------|-------|-------------|
| SCP | Organization/OU/Account | Yes |
| Azure Policy | Management Group/Subscription/Resource Group | Yes |
| GCP Organization Policy | Organization/Folder/Project | Yes |
| GitHub Branch Ruleset | Organization/Repository | No |
| S3 Account Setting | Account | No |
| EC2 Account Attribute | Account | No |
| Guardrails Control | Resource Type | Configurable |

### Effect Comparison

| Type | Prevent | Detect | Remediate |
|------|---------|--------|-----------|
| SCP | ✓ | | |
| Azure Policy | ✓ | ✓ | ✓ |
| GCP Organization Policy | ✓ | | |
| GitHub Branch Ruleset | ✓ | | |
| Account Settings | ✓ | | |
| Guardrails Control | ✓ | ✓ | ✓ |

### Implementation Complexity

| Type | Complexity | Learning Curve | Maintenance |
|------|-----------|----------------|-------------|
| SCP | Medium | Medium | Low |
| Azure Policy | High | High | Medium |
| GCP Organization Policy | Low | Low | Low |
| GitHub Branch Ruleset | Low | Low | Low |
| Account Settings | Very Low | Very Low | Very Low |
| Guardrails Control | Medium | High | Medium |

## Common Workflows

**Finding all preventions of a specific type**
1. Navigate to the Types tab
2. Locate the type section (e.g., "Service Control Policies")
3. Expand the section to see all preventions using that type
4. Review prevention coverage and identify gaps

**Understanding which types are most used**
1. Review the prevention count for each type
2. Identify types with high usage
3. Assess whether current type distribution aligns with strategy
4. Plan expansion of underutilized types if appropriate

**Comparing prevention types for a use case**
1. Identify a security objective (e.g., "Prevent public S3 buckets")
2. Find preventions achieving that objective
3. Note which types are used (SCP, S3 Account Setting, Azure Policy)
4. Understand the defense-in-depth layering

**Standardizing on prevention types**
1. Review all prevention types in use
2. Identify types that overlap or duplicate
3. Determine organizational standards (e.g., "Use SCPs for AWS service restrictions")
4. Consolidate to preferred types where possible

**Planning new prevention implementations**
1. Determine the security objective
2. Review which prevention types can achieve it
3. Select the most appropriate type based on scope, complexity, and capabilities
4. Refer to Examples tab for implementation templates

## Best Practices

**Use the right type for the job**
- SCPs for broad AWS service restrictions
- Account Settings for simple service-specific controls
- Azure Policies for complex conditions and remediation
- Branch Rulesets for code security
- Guardrails Controls for multi-cloud and continuous monitoring

**Layer prevention types**
For critical security goals, use multiple types at different layers (Access, Config, Runtime) for defense-in-depth.

**Standardize within your organization**
Choose preferred prevention types for common use cases and create templates to ensure consistency.

**Consider operational overhead**
Simpler types (Account Settings, Organization Policies) require less maintenance than complex types (Azure Policies, Guardrails Controls).

**Match type to risk**
Critical risks may justify complex, layered preventions. Lower risks may only need simple account settings.

**Plan for exceptions**
Some prevention types allow easy exceptions (Azure Policy exemptions), others don't (SCPs require policy modification).

## Next Steps

- Return to [Preventions](./preventions.md) to see all preventions
- Review [Examples](./examples.md) for policy templates by type
- Check [Layers](./layers.md) to understand enforcement layers
- Visit [Objectives](../objectives/index.md) to see which objectives each type achieves
- Read [Detail Pages](./detail.md) for specific prevention configurations
