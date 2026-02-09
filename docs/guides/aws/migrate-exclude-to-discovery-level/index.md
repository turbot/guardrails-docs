---
title: Migrate from Exclude to Discovery Level
sidebar_label: Migrate Exclude to Discovery Level
---

# Migrate from Exclude to Discovery Level

In this guide, you will:

- Understand the differences between the deprecated Exclude policy and the new Discovery Level policy
- Configure discovery levels for your accounts and OUs
- Verify your configuration and remove the deprecated Exclude policy

## Overview

The `AWS > Organization > CMDB > Exclude` policy has been deprecated in favor of the `AWS > Organization > Discovery Level` policy. The Exclude policy will be removed in version 6.0.0 of the AWS mod.

The Exclude policy offered simple binary exclusion — an account was either excluded or it wasn't. The Discovery Level policy replaces this with three levels of control:

| Level             | Description                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **None**          | Account/OU is completely excluded from Guardrails — not discovered, not in the CMDB                                     |
| **Account only**  | Account is visible in the hierarchy but no child resources are discovered, and no policies or controls are materialized |
| **All resources** | Full management with all policies and controls materialized (default)                                                   |

Discovery levels can be set at the OU level, and all child accounts inherit the setting unless they have their own individual override. During the transition period, both policies work together — the Exclude policy takes precedence, so you can configure Discovery Level settings first, then remove Exclude entries once you've verified the new settings are correct.

## Prerequisites

- **Turbot/Owner** permissions at the organization level
- AWS mod version 5.43.0 or later installed

## Step 1: Review Your Current Exclude Policy

Before migrating, review all entries in your current Exclude policy.

1. Click **Policies** in the top navigation bar
2. Search for `AWS > Organization > CMDB > Exclude`
3. Click on the policy setting for your organization
4. Note down all entries — these are the accounts and OUs you'll configure in Discovery Level Settings

If your Exclude policy uses **wildcard patterns** (e.g., `*production`, `sandbox*`), note that the Discovery Level policy does not support wildcards. You'll need to identify the specific accounts that match those patterns so you can select them individually in the Settings page.

> **Tip**: For workspaces with many organizations, you can query all Exclude policy settings via GraphQL:
>
> ```graphql
> {
>   policySettings(
>     filter: "policyType:tmod:@turbot/aws#/policy/types/organizationCmdbExclude"
>   ) {
>     items {
>       resource {
>         trunk {
>           title
>         }
>       }
>       value
>       state
>     }
>   }
> }
> ```

## Step 2: Open Discovery Level Settings

1. Click **Accounts** in the left navigation bar
2. Under **Organizations**, find and click on your **AWS Organization** resource
3. Click the **Settings** tab

The Discovery Level Settings page displays your organization hierarchy:

![Discovery Level Settings](/images/docs/guardrails/guides/aws/migrate-exclude-to-discovery-level/discovery-level-settings.png)

The page has two tabs:

- **Tree**: A visual hierarchy of your organization showing all OUs and accounts, each with a dropdown to set the discovery level
- **Manual**: A YAML editor for advanced users who prefer to configure settings directly

Accounts that are already connected to Guardrails are marked with a note: *"This account is already connected to Guardrails."*

## Step 3: Configure Discovery Levels

1. In the **Tree** tab, locate the accounts or OUs from your Exclude policy list
2. Click the dropdown next to each item and select the appropriate level:
   - **None** — accounts/OUs are completely excluded from Guardrails — not discovered, not in the CMDB (equivalent to being in the Exclude list)
   - **Account only** — accounts are visible in the hierarchy but no child resources are discovered, and no policies or controls are materialized
   - **All resources** — full management with all policies and controls materialized (default)
3. Click **Save Settings**

For OUs, the setting applies to all child accounts that don't have their own individual setting. For example, setting an OU to **None** excludes all accounts under it.

## Step 4: Verify and Remove the Exclude Policy

Navigate to your organization in the Guardrails console and look at the accounts you just configured:

- **Accounts set to None**: Should not appear under your organization in the resource hierarchy.
- **Accounts set to Account only**: Should still appear in the hierarchy, but should have no child resources (e.g., no S3 buckets, EC2 instances, etc.) and no controls running against them.
- **Accounts set to All resources**: Should have full resource discovery and all controls running as normal.

Once verified, remove the Exclude policy:

1. Navigate to **Policies**, find `AWS > Organization > CMDB > Exclude`, and delete the policy setting or set it to an empty array `[]`
2. Re-check the accounts — their behavior should remain the same because Discovery Level is now controlling them

## Troubleshooting

| Issue                                        | Possible Cause                                                     | Resolution                                                                                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Account still appears after setting **None** | Discovery controls haven't run yet                                 | Check the **Activity** tab for processing events; if needed, run the Account Discovery and CMDB controls manually from the **Controls** tab |
| Controls appearing on an excluded account    | Discovery level may be set to **Account only** instead of **None** | Open Discovery Level Settings and verify the dropdown shows **None**; save again                                                            |
| Child accounts not inheriting OU setting     | A child account has its own direct setting that overrides the OU   | Check if the child account has an individual setting in the Tree view and update it                                                         |

## Next Steps

- Understand [importing AWS Organizations](/guardrails/docs/guides/aws/import-aws-organization)
- Review [managing organization hierarchy](/guardrails/docs/concepts/resources/hierarchy)

## FAQ

### Can I use both policies during migration?

Yes. Both policies work together during the transition period. The Exclude policy takes precedence — any account in the Exclude list is excluded regardless of Discovery Level settings.

### How do I exclude an entire OU and all its accounts?

In the Tree view, find the OU and set its dropdown to **None**. All child accounts inherit this setting unless they have their own direct setting.

### What if I was using wildcard patterns like `*production`?

The Discovery Level Settings page shows your full organization tree. Instead of wildcards, you can:

1. Set the parent OU to **None** if all matching accounts are in the same OU
2. Select each matching account individually in the tree view
