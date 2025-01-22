---
title: Enabling Quick Actions in Your Environment
sidebar_label: Enabling Quick Actions in Your Environment
---

# Enabling Quick Actions in Your Environment

In this guide, you will:
- Use Guardrails console to enable quick actions in your environment.

[Quick Actions](https://turbot.com/guardrails/docs/reference/glossary#quick-actions) provide an efficient way to remediate cloud configuration issues, snooze compliance alarms, and execute operational tasks directly from the Compliance Dashboard. These actions are tailored to specific services, meaning available options differ based on the resource type (e.g., S3 Buckets vs. EC2 Instances). Once enabled in a workspace, Quick Actions can be accessed and executed via the Actions button on the resource detail page.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Turbot Guardrails v5.39.0 or higher.
- Familiarity with Guardrails console.

## Step 1: Login to Guardrails Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/using-guardrails/quick-actions/enabling/guardrails-console-login.png)

## Step 2: Navigate to Policies

Select **Policies** from the top navigation menu.

![Select Policies](/images/docs/guides/using-guardrails/quick-actions/enabling-quick-actions/guardrails-select-policies.png)

Choose **Turbot** from the list.

![Select Turbot](/images/docs/guardrails/guides/using-guardrails/quick-actions/enabling/guardrails-select-turbot.png)

## Step 3: Select Quick Actions

Quick actions are `disabled` by default, To enable them, locate **Turbot > Quick Actions** policy.

![Locate Quick Actions](/images/docs/guides/using-guardrails/quick-actions/enabling-quick-actions/guardrails-search-quick-actions.png)

Select the **Turbot > Quick Actions > Enabled** policy.

![Select Enabled Policy](/images/docs/guides/using-guardrails/quick-actions/enabling-quick-actions/guardrails-select-quick-actions-enabled.png)

## Step 4: Enable Quick Actions

On the `Turbot > Quick Actions > Enabled` page, select **New Policy Setting**.

![Select New Policy Setting](/images/docs/guides/using-guardrails/quick-actions/enabling-quick-actions/guardrails-select-new-policy-setting.png)

Select the desired `Resource` to enable quick actions, set Setting to `Enabled`, and select **Create**. 
Choose the `Turbot` resource level to apply changes across the entire environment or select an individual account for testing.

![Create Setting](/images/docs/guides/using-guardrails/quick-actions/enabling-quick-actions/guardrails-select-setting-click-create.png)

The policy setting has been successfully created.

![Create Setting](/images/docs/guides/using-guardrails/quick-actions/enabling-quick-actions/guardrails-policy-setting-created.png)

## Step 5: Verify Quick Actions

To verify, navigate to any desired resource page, where the **Actions** button should be displayed along with the list of available actions.

![Verify Quick Actions](/images/docs/guides/using-guardrails/quick-actions/enabling-quick-actions/guardrails-verify-quick-actions.png)

>[!NOTE] Excpetions/changes to the default permissions required for Quick Actions can be set using the `Turbot > Quick Actions > Permission Levels` policy.

If you encounter any issues, please [Open Support Ticket](https://support.turbot.com) and attach the relevant information to assist you more efficiently.

- A screenshot of the Quick Actions in error.
- A screenshot of the Quick Actions policy settings created.