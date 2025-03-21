---
title: Workspace Activity Retention
sidebar_label: Workspace Activity Retention
---

# Configuring Workspace Activity Retention

In this guide, you will:

- Set up the Guardrails *Turbot > Workspace > Retention > Activity Retention* policy to manage the lifecycle of activity records associated with a resource or control.
- Understand how activity retention helps manage storage requirements and performance.

Guardrails [Activity Retention](https://hub.guardrails.turbot.com/mods/turbot/policies/turbot/activityRetention) controls how long activity records are retained in the workspace. Managing the retention period helps optimize storage consumption, workspace performance, and meet compliance and auditing requirements.

## Prerequisites

- **Turbot/Admin** permissions at the Turbot resource level.
- Familiarity with the Guardrails console.

## Step 1: Navigate to Policy

Log into the Guardrails console with provided local credentials or by using any SAML based login. From the top navigation menu, select **Policies**. Search for the policy named `Turbot > Workspace > Retention > Activity Retention`.

![Navigate to Policies](/images/docs/guardrails/guides/configuring-guardrails/activity-retention/navigate-to-policies.png)

Select **New Policy Setting** located at the top right of the policy details page.

## Step 2: Configure the Policy

Select the desired **Resource** or **Folder** to set the retention policy. It is recommended to set the policy at `Turbot` level. Setting other than `Turbot` will generate error as below

`Error creating policy setting
Internal Error: Create failed: Resource (aaa - Customer Simulated Environments) is not valid. Aborting policy setting create.`

Under **Settings**, select the appropriate setting according to your operational requirements. Refer [Retention Options](#retention-options).

![New Policy Setting](/images/docs/guardrails/guides/configuring-guardrails/activity-retention/new-policy-setting.png)

Select **Update** to save the new policy setting.

## Step 3: Review

- [ ] Navigate back to the **Policies** tab and confirm the policy is active by checking the **Current Setting**.

![Verify Policy](/images/docs/guardrails/guides/configuring-guardrails/activity-retention/verify-activity-retention-policy.png)

## Retention Options

- 90 days (default): Provided as default value.
- 60 days: Balanced approach—recommended for most environments.
- 90, 180, 365 days: For compliance or specific organizational needs.
- 30 days: Aggressive retention—ideal for optimized performance.
- None: No retention period (unlimited storage, potential for performance issues).

## Next Steps

- Learn more about [Configuring Guardrails](/guardrails/docs/guides/configuring-guardrails).

## Troubleshooting

| Issue                          | Description                                                                                           | Guide                                                                                              |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Policy not applied immediately | | Wait a few minutes and refresh the policy page. Verify policy propagation by checking effective settings. |
| Permission Issues              | Ensure you have the appropriate permissions (`Turbot/Admin`) to set policies.                         | [Permissions & Roles](/guardrails/docs/concepts/iam/permissions#permissions) |

