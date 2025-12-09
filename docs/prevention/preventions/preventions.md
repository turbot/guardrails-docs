---
title: Preventions List
sidebar_label: Preventions List
---

# Preventions

The Preventions tab displays all active prevention controls implemented across your cloud environment. This view shows individual preventions, what they protect, and where they're applied.

![Preventions List](./preventions-list.png)

## Understanding the Preventions Tab

Preventions are technical controls that enforce security and compliance requirements. Each prevention represents a specific security rule or policy that has been implemented to achieve one or more prevention objectives.

**Example preventions:**
- Block Branch Deletion (GitHub Branch Ruleset)
- Block Public ACLs on AWS S3 Buckets (AWS S3 Account Setting)
- Block Public AWS EC2 AMI Sharing (AWS EC2 Account Attribute)
- Require Encryption for AWS EBS Volumes (Guardrails Control)
- Block Force Pushes to Branches (GitHub Branch Ruleset)

## Page Layout

### Header Section

- **Page title**: "Preventions - View prevention rules with their types, status, and resources"
- **Navigation tabs**: Preventions, Examples, Types, Layers
- **Search box**: Find preventions by name or description
- **Filter button**: Filter by layer, type, account, or status
- **Sort dropdown**: Order by title, type, layer, or status

### Prevention Cards

Each prevention card displays:
- **Prevention title**: Clear description of what the prevention does
- **Layer badge**: Which enforcement layer it operates at (Build, Access, Config, Runtime)
- **Type**: The technical implementation mechanism
- **Account/Resource scope**: Where the prevention is applied
- **Description**: Brief explanation of the prevention's purpose

**Example prevention card:**
```
Block Public ACLs on AWS S3 Buckets for account goliath-commbank-dev (457605699984)
Config | AWS S3 Account Setting

Prevents setting public ACLs on S3 buckets and objects in this account. Any attempt
to grant public read or write access via ACLs will be blocked. This safeguards
against accidental data exposure through overly permissive bucket ACLs.
```

## Search and Filter

**Search functionality:**
Use the search box to find preventions by:
- Prevention name (e.g., "S3", "encryption", "MFA")
- Prevention type (e.g., "SCP", "Azure Policy")
- Account name
- Resource type
- Service (e.g., "Lambda", "RDS", "GitHub")

**Filter options:**
Click the Filter button to narrow the list:
- **By Layer**: Build, Access, Config, or Runtime
- **By Type**: SCP, Azure Policy, GCP Organization Policy, Guardrails control, Branch Ruleset, Account Setting
- **By Account**: Show preventions for specific accounts
- **By Status**: Active, available, or recommended

**Sort options:**
Order the list by:
- **Title (A to Z)**: Alphabetical by prevention name (default)
- **Title (Z to A)**: Reverse alphabetical
- **Layer**: Group by Build, Access, Config, Runtime
- **Type**: Group by implementation mechanism
- **Status**: Group by active, available, recommended

## Understanding Prevention Scope

Preventions can be scoped at different levels:

**Organization-wide**
Applied to all accounts in an AWS Organization, Azure Management Group, or GCP Organization. These appear once in the list and protect all accounts.

**Example:** A Service Control Policy attached at the AWS Organization root.

**Account-specific**
Applied to individual AWS accounts, Azure subscriptions, or GCP projects. These appear multiple times—once for each account they protect.

**Example:** "Block Public ACLs on AWS S3 Buckets" appears separately for each AWS account.

**Resource-specific**
Applied to specific resources like GitHub repositories or Azure resource groups.

**Example:** "Block Branch Deletion" applies to specific GitHub repository branch rulesets.

## Prevention Status Indicators

**Active (Green)**
The prevention is currently implemented and enforcing controls. Resources are actively protected.

**Available (Yellow)**
The prevention is defined and configured but may not be actively enforcing. This might indicate audit mode or pending activation.

**Recommended (Gray)**
The prevention is suggested based on objectives, benchmarks, or best practices but has not yet been implemented. These are opportunities to improve security.

## Common Workflows

**Finding all preventions for a specific service**
1. Enter the service name in the search box (e.g., "S3", "RDS", "Lambda")
2. Review the list of preventions related to that service
3. Note which accounts have each prevention implemented
4. Identify gaps where preventions are missing
5. Click preventions to see detailed configuration

**Understanding which accounts have a specific prevention**
1. Search for or filter to find the specific prevention
2. Note that the same prevention may appear multiple times with different account scopes
3. Each entry shows which account or resource the prevention is applied to
4. Click the prevention to see full coverage details and implementation guidance

**Auditing prevention coverage for an account**
1. Click the Filter button
2. Select a specific account from the Account filter
3. Review all preventions applied to that account
4. Compare against target benchmarks (e.g., CIS, NIST)
5. Identify missing preventions by comparing to recommendations

**Identifying duplicate or overlapping preventions**
1. Search for a specific protection (e.g., "S3 public access")
2. Review all preventions in the results
3. Note different types of preventions achieving the same goal
   - Example: SCP denying public buckets + S3 Block Public Access setting + Guardrails control
4. Ensure intentional defense-in-depth, not accidental duplication

**Finding preventions to implement next**
1. Use the Status filter to show "Recommended" preventions
2. Review recommendations based on your risk priorities
3. Click preventions to see implementation guidance
4. Check the Examples tab for policy templates
5. Implement preventions following best practices

**Reviewing preventions after a security incident**
1. Search for preventions related to the incident vector
2. Check if relevant preventions were already implemented
3. If yes, investigate why they didn't prevent the incident
4. If no, implement missing preventions immediately
5. Document lessons learned and update prevention coverage

## Prevention Cards - Detailed Information

**Title Section**
- Clear, descriptive name of what the prevention does
- Includes account context when prevention is account-specific
- Shows affected resource when prevention is resource-specific

**Metadata Section**
- **Layer**: Build, Access, Config, or Runtime
- **Type**: Technical implementation mechanism
- **Status**: Active, Available, or Recommended

**Description Section**
- Explains what the prevention protects against
- Describes how the prevention works
- Notes any important caveats or limitations

**Action Section**
- Click the card to view full prevention details
- See which objectives this prevention achieves
- Access implementation templates and examples

## Understanding Prevention Multiplicity

**Why the same prevention appears multiple times:**

Prevention controls are often implemented per-account rather than organization-wide. For example:

- **"Block Public ACLs on AWS S3 Buckets"** appears 20+ times in the list because it's configured separately for each AWS account
- Each entry represents the prevention applied to a specific account
- This allows account-specific exceptions if needed

**Organization-wide preventions appear once:**

Some preventions apply broadly:

- **Service Control Policies** attached at the organization root appear once
- **GitHub Branch Rulesets** at the organization level appear once
- These protect all child accounts/repositories automatically

## Best Practices

**Implement preventions in layers**
For critical security goals, implement preventions at multiple layers:
- Access Layer: SCP denying dangerous actions
- Config Layer: Account settings blocking risky configurations
- Runtime Layer: Guardrails control remediating violations

**Start with account-wide preventions**
Account-level preventions (like S3 Block Public Access) are easier to implement and maintain than resource-level preventions.

**Document prevention exceptions**
When an account can't have a prevention applied, document why in your exception tracking system.

**Test preventions in non-production first**
Before rolling out preventions to production accounts, test in dev/sandbox to verify they don't break applications.

**Monitor prevention effectiveness**
Just because a prevention is "Active" doesn't mean it's working correctly. Monitor control results and security findings.

**Keep preventions current**
As cloud services evolve, new prevention types become available. Regularly review for new prevention opportunities.

**Consolidate when possible**
If you have both an SCP and a Guardrails control doing the same thing, consider whether both are needed or if one is sufficient.

## Next Steps

- Click into any [prevention detail page](./detail.md) to see configuration and coverage
- Review [Examples](./examples.md) to see policy templates and implementation guidance
- Check [Types](./types.md) to understand different prevention mechanisms
- View [Layers](./layers.md) to see preventions organized by enforcement layer
- Visit [Objectives](../objectives/index.md) to understand which objectives each prevention achieves
