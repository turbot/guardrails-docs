---
title: Migrate from Exclude to Discovery Level
sidebar_label: Migrate Exclude to Discovery Level
---

# Migrate from Exclude to Discovery Level

In this guide, you will:
- Understand the differences between the deprecated Exclude policy and the new Discovery Level policy
- Identify accounts and OUs currently using the Exclude policy
- Use the Discovery Level Settings UI to configure exclusions
- Safely migrate your configuration with a phased approach
- Verify the migration was successful

## Overview

The `AWS > Organization > CMDB > Exclude` policy has been deprecated in favor of the more powerful `AWS > Organization > Discovery Level` policy.

The Exclude policy offered simple binary exclusion using a YAML list. The Discovery Level policy provides a dedicated UI with three levels of control:

| Level | UI Option | Description |
|-------|-----------|-------------|
| `none` | **None** | Account/OU is completely excluded from Guardrails |
| `account` | **Account only** | Account is visible in Guardrails but no child resources are discovered |
| `resource` | **All resources** | Full management with all policies and controls materialized (default) |

### Key Benefits of Discovery Level

- **Visual UI**: Configure exclusions through an intuitive tree view of your organization
- **Inheritance**: Set discovery level at an OU and all child accounts inherit the setting
- **Granular control**: Choose between full exclusion, visibility-only, or full management
- **No wildcards needed**: Select accounts and OUs directly in the UI

## Prerequisites

- **Turbot/Owner** permissions at the organization level
- AWS mod version 5.43.0 or later installed
- Familiarity with the Guardrails console

## Step 1: Document Current Exclude Policy Settings

Before migrating, document all entries in your current Exclude policy.

### Using the Guardrails Console

1. Navigate to **Policies** in the top menu
2. Search for `AWS > Organization > CMDB > Exclude` for your organization
3. Click on the policy to view all settings
4. Note down all entries including:
   - Account IDs (e.g., `111122223333`)
   - Account names (e.g., `my_sandbox_account`)
   - OU IDs (e.g., `ou-xxxx-xxxxxxxx`)
   - Wildcard patterns (e.g., `*production`)

### Using GraphQL (Optional)

For workspaces with many organizations, you can query all Exclude policy settings:

```graphql
{
  policySettings(
    filter: "policyType:tmod:@turbot/aws#/policy/types/organizationCmdbExclude"
  ) {
    items {
      resource {
        trunk {
          title
        }
      }
      value
      state
    }
  }
}
```

## Step 2: Understand Wildcard Pattern Migration

If your Exclude policy uses wildcard patterns (e.g., `*production`, `sandbox*`), note that the Discovery Level policy does not support wildcards. Instead, you will select specific accounts and OUs in the UI.

**Advantages of the UI approach:**
- Visual selection prevents typos
- You see exactly which accounts will be affected
- OU-level settings automatically apply to all child accounts

## Step 3: Plan Your Migration

> [!IMPORTANT]
> Do not migrate all accounts at once. Use a phased approach to minimize risk.

### Recommended Migration Phases

| Phase | Scope | Duration |
|-------|-------|----------|
| **Phase 1** | 1-2 test/sandbox accounts | Verify behavior |
| **Phase 2** | Development accounts | Monitor 24-48 hours |
| **Phase 3** | Staging/QA accounts | Monitor 24-48 hours |
| **Phase 4** | Production accounts | Schedule during maintenance window |

### During Migration

Both policies work together during the transition period. The Exclude policy takes precedence - any account in the Exclude list will remain excluded regardless of Discovery Level settings. This provides a safety net during migration.

## Step 4: Access Discovery Level Settings

1. Navigate to your **Organization** resource in Guardrails
2. Click the **Settings** tab in the top navigation bar
3. The **Discovery Level Settings** page displays your organization hierarchy

![Discovery Level Settings](/images/docs/guardrails/guides/aws/migrate-exclude-to-discovery-level/discovery-level-settings.png)

The page shows:
- **Tree view**: Visual hierarchy of your organization with OUs and accounts
- **Manual view**: Direct YAML editing (for advanced users)
- **Dropdown selectors**: Set discovery level for each OU and account
- **Status indicators**: Shows which accounts are already connected to Guardrails

## Step 5: Configure Discovery Levels

### Using the Tree View (Recommended)

1. In the **Tree** tab, locate the accounts or OUs you want to exclude
2. Click the dropdown next to each item and select the appropriate level:
   - **None**: Completely exclude (equivalent to being in the Exclude list)
   - **Account only**: Visible but not managed
   - **All resources**: Fully managed (default)
3. For OUs, setting a level applies to all child accounts that don't have their own setting

**Example configuration:**
- Set an entire OU like `prod` to **None** to exclude all production accounts
- Set individual sandbox accounts to **None** while keeping their parent OU at **All resources**

### Using the Manual View (Advanced)

1. Click the **Manual** tab to switch to YAML editing
2. Add entries in the format:

```yaml
- aka: "111122223333"
  discoveryLevel: none
- aka: "ou-xxxx-xxxxxxxx"
  discoveryLevel: none
- aka: "sandbox_account"
  discoveryLevel: account
```

### Save Your Changes

Click the **Save Settings** button to apply your configuration.

## Step 6: Verify Discovery Level Settings

After saving, verify your settings are working:

1. Navigate to **Controls** in the top menu
2. Filter for `AWS > Account > Discovery` controls
3. Check that controls are in the expected states:
   - Accounts with **None** should not appear in the CMDB
   - Accounts with **Account only** should appear but without sub-controls
   - Accounts with **All resources** should have all controls running

### Verification Query

```graphql
{
  resources(
    filter: "resourceTypeId:'tmod:@turbot/aws#/resource/types/account' $.Id:111122223333"
  ) {
    items {
      Id: get(path: "Id")
      Name: get(path: "Name")
    }
  }
}
```

If the query returns no results for an account set to **None**, the exclusion is working correctly.

## Step 7: Remove Entries from Exclude Policy

After verifying the Discovery Level settings work correctly:

1. Navigate to **Policies** > **AWS > Organization > CMDB > Exclude**
2. Edit the policy setting at your organization
3. Remove the migrated entries from the list
4. Save the policy

> [!IMPORTANT]
> Remove entries one phase at a time, following your migration plan. Verify each phase before proceeding.

## Step 8: Complete Migration

Once all entries have been migrated and verified:

1. Clear the Exclude policy completely (set to empty array `[]`)
2. Optionally delete the policy setting entirely
3. Document the completed migration in your change management system

## Rollback Plan

If issues occur during migration:

1. **Add the affected accounts back to the Exclude policy** - This immediately excludes them (Exclude policy takes precedence)
2. **Investigate the issue** in the Discovery Level settings
3. **Adjust and retry** once the issue is resolved

## Troubleshooting

| Issue | Description | Resolution |
|-------|-------------|------------|
| Account still appearing | Account shows in CMDB despite **None** setting | Run the Account CMDB control manually; check the Settings page for the correct selection |
| Policies materializing | Controls appearing on excluded account | Verify the dropdown shows **None**, not **Account only**; save settings again |
| Changes not taking effect | Settings saved but no change in behavior | Wait for Discovery controls to run, or run them manually |
| Child accounts not inheriting | OU set to **None** but child accounts still visible | Check if child accounts have their own direct setting overriding the OU |

## Migration Checklist

- [ ] Documented all current Exclude policy entries
- [ ] Identified accounts matching any wildcard patterns
- [ ] Created phased migration plan
- [ ] Tested with non-production accounts first
- [ ] Configured Discovery Level settings in the UI
- [ ] Verified excluded accounts are not in CMDB
- [ ] Removed migrated entries from Exclude policy
- [ ] Cleared Exclude policy after full migration
- [ ] Updated internal documentation

## Next Steps

- Learn more about [Discovery Level options](/guardrails/docs/guides/aws/organization-discovery-level)
- Understand [importing AWS Organizations](/guardrails/docs/guides/aws/import-aws-organization)
- Review [managing organization hierarchy](/guardrails/docs/concepts/resources/hierarchy)

## FAQ

### Why is the Exclude policy being deprecated?

The Discovery Level policy provides more granular control with three levels and a visual UI, compared to the binary exclude/include and YAML-based configuration of the Exclude policy.

### When will the Exclude policy be removed?

The Exclude policy will be removed in version 6.0.0 of the AWS mod.

### Can I use both policies during migration?

Yes, both policies work together during the transition period. The Exclude policy takes precedence - any account in the Exclude list will be excluded regardless of Discovery Level settings.

### What's the difference between "None" and "Account only"?

- **None**: The account is completely invisible to Guardrails - not discovered, not in the CMDB
- **Account only**: The account is discovered in Guardrails and you can see it in the hierarchy, but no child resources are discovered, and  no policies or controls are materialized on it

### How do I exclude an entire OU and all its accounts?

In the Tree view, find the OU and set its dropdown to **None**. All child accounts will inherit this setting unless they have their own direct setting.

### What if I was using wildcard patterns like `*production`?

The Discovery Level UI shows your full organization tree. Instead of wildcards, you can:
1. Set the parent OU to **None** if all matching accounts are in the same OU
2. Select each matching account individually in the tree view
3. Use the search/filter in the UI to find accounts by name pattern
