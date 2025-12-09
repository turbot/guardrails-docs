---
title: Preventions
sidebar_label: Preventions
---

# Preventions

The Preventions page displays all active prevention controls implemented across your cloud environment. This page helps you understand which preventative controls are in place, what they protect, and how they're configured across different accounts and resources.

![Preventions List](./preventions-list.png)

## Understanding Preventions

Preventions are technical controls that enforce security and compliance requirements in your cloud environment. Each prevention represents a specific security rule or policy that has been implemented to achieve one or more prevention objectives.

**Common prevention types:**
- **Service Control Policies (SCPs)**: AWS Organization-level controls that restrict API actions
- **Azure Policies**: Azure subscription-level controls that enforce compliance
- **GCP Organization Policies**: GCP-level constraints that limit resource configurations
- **Guardrails Controls**: Fine-grained Turbot Guardrails policies that enforce specific behaviors
- **Branch/Tag Rulesets**: GitHub repository protection rules
- **Account Settings**: Cloud provider account-level security configurations

## Page Layout

The Preventions page displays:

### Header Section

- **Page title**: "Preventions - View prevention rules with their types, status, and resources"
- **Search box**: Find preventions by name or description
- **Filter button**: Filter by layer, type, account, or status
- **Sort options**: Order by title, type, layer, or status

### Navigation Tabs

The Preventions section offers four tabs:

**[Preventions Tab](./preventions.md)** (default view)
Lists all active preventions with their details and implementation status.

**[Examples Tab](./examples.md)**
Provides code samples, policy templates, and implementation examples for common preventions.

**[Types Tab](./types.md)**
Groups preventions by their technical implementation type (SCP, Azure Policy, Guardrails control, etc.).

**[Layers Tab](./layers.md)**
Organizes preventions by enforcement layer (Build, Access, Config, Runtime).

## Using the Preventions Tabs

Each tab provides a different view of your preventions:

### Preventions Tab

The [Preventions](./preventions.md) tab shows a filterable, searchable list of all active prevention controls. Each prevention card displays its title, layer, type, scope, and description. Use this view to:
- Find all preventions for a specific service or account
- Audit prevention coverage across accounts
- Identify which accounts have specific preventions

Learn more: [Preventions Tab](./preventions.md)

### Examples Tab

The [Examples](./examples.md) tab provides concrete implementation guidance including policy templates, code samples, and configuration examples. Use this view to:
- Find ready-to-use SCP, Azure Policy, and GCP Organization Policy templates
- Access Terraform/IaC examples for automated deployment
- See step-by-step guides for manual implementation
- Learn best practices and testing approaches

Learn more: [Examples Tab](./examples.md)

### Types Tab

The [Types](./types.md) tab groups preventions by their technical implementation mechanism (SCP, Azure Policy, GitHub Branch Ruleset, Account Setting, etc.). Use this view to:
- Understand different prevention mechanisms
- See which types are most used in your environment
- Compare prevention types for specific use cases
- Standardize on preferred types

Learn more: [Types Tab](./types.md)

### Layers Tab

The [Layers](./layers.md) tab organizes preventions by enforcement layer (Build, Access, Config, Runtime). Use this view to:
- Assess defense-in-depth coverage
- Identify gaps in specific layers
- Understand when different preventions are enforced
- Plan layer-specific initiatives

Learn more: [Layers Tab](./layers.md)

## Understanding Prevention Layers

Preventions are categorized by enforcement layer:

**Build Layer**
Preventions enforced during resource creation and infrastructure-as-code deployment. These controls stop risky configurations before resources are deployed.

**Example**: Terraform policies that prevent public S3 buckets from being defined in IaC templates.

**Access Layer**
Preventions that control who can access resources and what actions they can perform. Includes identity-based policies, resource-based policies, and permission boundaries.

**Example**: Service Control Policies that deny the ability to disable CloudTrail.

**Config Layer**
Preventions that enforce required configurations on deployed resources. Includes encryption requirements, network settings, and compliance configurations.

**Example**: Azure Policies that require storage accounts to have encryption enabled.

**Runtime Layer**
Preventions that detect and respond to risky behavior during resource operation. Includes monitoring, threat detection, and automated remediation.

**Example**: Guardrails controls that automatically remediate misconfigured security groups.

## Understanding Prevention Types

Prevention types represent the technical mechanism used to enforce the control:

**Service Control Policies (SCPs)**
AWS Organization-level policies that set permission guardrails for all accounts in an organization. SCPs never grant permissions—they only restrict what actions can be performed.

**Azure Policies**
Azure subscription-level policies that enforce compliance rules and effects over resources. Can audit, deny, or modify resource properties.

**GCP Organization Policies**
Google Cloud Platform organization-level constraints that limit how resources can be configured across projects.

**Guardrails Controls**
Turbot Guardrails fine-grained policies that provide continuous governance, compliance, and security automation across multi-cloud environments.

**Branch/Tag Rulesets**
GitHub repository protection rules that control how code can be modified, pushed, or deleted.

**Account Settings**
Cloud provider account-level security configurations that apply to all resources in an account.

## Examples Tab

The Examples tab provides concrete implementation guidance:

**What you'll find:**
- **Policy templates**: Ready-to-use SCP, Azure Policy, and GCP Organization Policy definitions
- **Code samples**: Terraform/IaC examples for automated prevention deployment
- **Configuration examples**: Screenshots and step-by-step guides for manual implementation
- **Best practices**: Recommended configurations and common patterns

Use examples to accelerate implementation by adapting tested, production-ready policies for your environment.

## Types Tab

The Types tab groups preventions by their technical implementation:

**Common types include:**
- **AWS Service Control Policies**: Organization-wide AWS controls
- **AWS S3 Account Settings**: S3 block public access configurations
- **AWS EC2 Account Attributes**: EC2 default behaviors and restrictions
- **Azure Policy Definitions**: Subscription-level Azure controls
- **GCP Organization Policy Constraints**: Organization-level GCP controls
- **GitHub Branch Ruleset Settings**: Repository branch protection rules
- **Guardrails Controls**: Multi-cloud governance policies

Click on any type to see all preventions implemented using that mechanism.

## Layers Tab

The Layers tab organizes preventions by enforcement layer:

**Build**: Controls applied during resource creation
**Access**: Controls governing who can perform actions
**Config**: Controls enforcing resource configurations
**Runtime**: Controls detecting and responding to behavior

Use this view to ensure defense-in-depth: balanced coverage across all layers provides stronger security than relying on a single layer.

## Common Workflows

**Finding all preventions for a specific service**
1. Use the search box to enter the service name (e.g., "S3", "RDS")
2. Review the list of preventions related to that service
3. Click on individual preventions to see detailed configuration
4. Identify which accounts have each prevention implemented

**Understanding which accounts have a specific prevention**
1. Search for or filter to find the specific prevention
2. Note that the same prevention may appear multiple times with different account scopes
3. Each entry shows which account or resource the prevention is applied to
4. Click the prevention to see full coverage details

**Reviewing all preventions at a specific layer**
1. Click the **Layers** tab
2. Select the layer you want to review (Build, Access, Config, or Runtime)
3. See all preventions operating at that layer
4. Identify gaps where additional preventions may be needed

**Finding implementation examples for a prevention**
1. Search for the prevention in the Preventions tab
2. Click on the prevention to view its detail page
3. Navigate to the Examples section to see policy templates
4. Use the templates to implement the prevention in your environment

**Auditing prevention coverage across accounts**
1. Use the Filter button to select a specific account
2. Review all preventions applied to that account
3. Compare against target benchmarks (e.g., CIS, NIST)
4. Identify missing preventions by comparing to the full list

**Planning new prevention implementations**
1. Review the full list of available preventions
2. Filter by priority (P1, P2) to focus on high-impact controls
3. Check which preventions are "recommended" but not yet "active"
4. Use the Examples tab to get implementation guidance
5. Track deployment progress by monitoring prevention status

## Prevention Status

Preventions can have different implementation statuses:

**Active**
The prevention is currently implemented and enforcing controls. Resources are protected by this prevention.

**Available**
The prevention has been defined and configured but may not be actively enforcing. This status might indicate the prevention is in audit mode or pending activation.

**Recommended**
The prevention is suggested based on objectives, benchmarks, or best practices but has not yet been implemented. These are opportunities to improve security posture.

## Interpreting Prevention Scope

Prevention scope indicates where the control is applied:

**Organization-wide**
Applied to all accounts in an AWS Organization, Azure Management Group, or GCP Organization. These preventions provide consistent protection across the entire environment.

**Account/Subscription-specific**
Applied to individual AWS accounts, Azure subscriptions, or GCP projects. These preventions allow for account-specific configurations.

**Resource-specific**
Applied to specific resources or resource groups. These preventions provide fine-grained control over individual workloads.

## Next Steps

- Click into any [prevention detail page](./detail.md) to see configuration details and coverage
- Review [Objectives](../objectives/index.md) to understand which objectives each prevention achieves
- Use [Recommendations](../recommendations/index.md) to prioritize new prevention implementations
- Check [Accounts](../accounts/index.md) to see prevention coverage by account
- Try the [Simulator](../simulator/index.md) to test Service Control Policies before deployment
