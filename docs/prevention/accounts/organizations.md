---
title: Organizations
sidebar_label: Organizations
---

# Organizations

The Organizations view displays cloud accounts organized by their native cloud provider hierarchy. This view shows the organizational structure as defined in AWS Organizations, Azure Management Groups, or GCP Organization hierarchy, making it easy to understand how accounts are structured and where prevention coverage may be inconsistent across organizational boundaries.

![Organizations View](./organizations.png)

## Understanding the Organizations View

The Organizations view respects the native hierarchy of each cloud provider:

### AWS Organizations

For AWS accounts, the view displays:
- **Organization Root**: The top-level container for all AWS accounts
- **Organizational Units (OUs)**: Hierarchical groupings that organize accounts by business function, environment, or other criteria
- **AWS Accounts**: Individual accounts nested within OUs

Each level shows prevention scores, allowing you to quickly identify which parts of your organization have strong or weak prevention coverage.

### Azure Management Groups

For Azure subscriptions, the view displays:
- **Root Management Group**: The top-level container for all Azure subscriptions
- **Management Groups**: Hierarchical groupings that organize subscriptions
- **Subscriptions**: Individual Azure subscriptions nested within management groups

### GCP Organization Hierarchy

For GCP projects, the view displays:
- **Organization**: The top-level container for all GCP resources
- **Folders**: Hierarchical groupings that organize projects
- **Projects**: Individual GCP projects nested within folders

## When Organizations View is Empty

If you see "No Organizational Units found," this indicates:

- No AWS Organizations have been imported yet
- No Azure Management Groups have been configured
- No GCP Organization hierarchy exists in the imported accounts

The Organizations view only appears when accounts are part of a cloud-native organizational structure. Standalone accounts or accounts without organizational context will not appear in this view.

## Using the Organizations View

When organizational units are present, this view helps you:

**Identify coverage gaps by organizational unit**
Expand organizational units to see which branches of your organization have lower prevention scores. This helps target remediation efforts to specific business units or environments.

**Understand prevention inheritance**
Many preventions (especially SCPs and organizational policies) apply at the OU or management group level and affect all child accounts. This view makes it easy to see which preventions apply at which organizational level.

**Compare prevention across business units**
When different teams or business units own different OUs, you can quickly compare their prevention maturity and identify which teams may need additional support or guidance.

## Filtering and Sorting

Use the Filter and Sort controls to narrow the view:

- **Filter by Account Type**: Show only AWS Organizations, Azure Management Groups, or GCP hierarchies
- **Sort options**: Order organizational units alphabetically, by prevention score, or by creation date

## Next Steps

- Return to the [Accounts](./index.md) view for a flat list of all accounts
- Use the [Folders](./folders.md) view to see Turbot Guardrails logical groupings
- Click into any organizational unit or account to view detailed prevention scores
