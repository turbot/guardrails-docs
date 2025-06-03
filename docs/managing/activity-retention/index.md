---
title: Workspace Activity Retention
sidebar_label: Workspace Activity Retention
---

# Configuring Workspace Activity Retention

In this guide, you will:

- Set up the Guardrails *Turbot > Workspace > Retention > Activity Retention* policy to manage the lifecycle of activity records associated with resources or controls.
- Understand how activity retention impacts storage usage and workspace performance.

Guardrails' [Activity Retention](https://hub.guardrails.turbot.com/mods/turbot/policies/turbot/activityRetention) policy controls the duration for which activity records such as actions, events, or notifications, are kept within your workspace. Properly configured retention periods optimize storage, enhance performance, and satisfy compliance and auditing requirements.

## Prerequisites

- **Turbot/Admin** permissions at the Turbot resource level.
- Familiarity with the Guardrails console.

## Step 1: Navigate to the Policy

Log in to the Guardrails console using your local credentials or via SAML-based login. Select **Policies** from the top navigation menu, then search for the policy named `Turbot > Workspace > Retention > Activity Retention`.

![Navigate to Policies](/images/docs/guardrails/managing/activity-retention/navigate-to-policies.png)

Click **New Policy Setting** in the top-right corner of the policy details page.

## Step 2: Configure the Policy

Select the **Resource** or **Folder** at which you wish to set the retention policy.
> [!IMPORTANT]
> It is recommended to set this policy at the `Turbot` (root) level. Applying this policy at a lower level (e.g., individual folder or resource) may result in errors like:
>
> ```
> Error creating policy setting
> Internal Error: Create failed: Resource (aaa - Customer Simulated Environments) is not valid. Aborting policy setting create.
> ```

Under **Settings**, choose the appropriate retention period based on your organization's operational needs. Refer to [Retention Options](#retention-options) for details.

![New Policy Setting](/images/docs/guardrails/managing/activity-retention/new-policy-setting.png)

Click **Update** to save the new policy setting.

## Step 3: Review

- [ ] Return to the **Policies** tab and confirm the policy has been correctly applied by verifying the **Current Setting**.

![Verify Policy](/images/docs/guardrails/managing/activity-retention/verify-activity-retention-policy.png)

## Retention Options

1. **30 days**: For maximum UI performance.
2. **60 days**: A balanced approach recommended for most environments.
3. **90 days (default)**: Default retention duration.
4. **180, 365 days**: Suitable for meeting compliance requirements or specific organizational needs.

## Next Steps

- Explore additional ways to [Configure Guardrails](/guardrails/docs/guides/configuring-guardrails).

## Troubleshooting

| Issue                          | Description                                                                                             | Guide                                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Permission Issues              | Confirm that you have the necessary (`Turbot/Admin`) permissions to modify policies.                     | [Permissions & Roles](/guardrails/docs/concepts/iam/permissions#permissions) |
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |
