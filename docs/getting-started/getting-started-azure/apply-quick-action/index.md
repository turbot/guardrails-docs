---
title: Apply a Quick Action
sidebar_label: Apply a Quick Action
---

# Apply a Quick Action

In this guide we’ll show how you can enable Guardrails to perform [Quick Actions](/guardrails/docs/guides/quick-actions) that fix misconfigurations. A Quick Action empowers an administrator to quickly fix misconfigurations by applying a change directly to an underlying Azure resource. In order to use this feature, the role used by Guardrails will need additional permissions to perform those actions. This guide will instruct you how to change the permissions specific to storage accounts, other types of quick actions will require different permission grants.

This is the ninth guide in the *Getting started with Azure series*.

## Prerequisites

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privileges.
- Access to a the Azure portal with administrative privlidges to add permissions to the Guardrails role.

## Step 1: Locate the resource group

In the Azure portal, navigate to **Resource Groups** and select the storage accounts you’re using in this series.

<p><img alt="permissions 1" src="/images/docs/guardrails/getting-started/getting-started-azure/apply-quick-action/permissions-1.png"/></p>

## Step 2: Open Access Control (IAM)

<p><img alt="permissions 2" src="/images/docs/guardrails/getting-started/getting-started-azure/apply-quick-action/permissions-2.png"/></p>

## Step 3: Begin role assignment

Expand the **Add** dropdown and choose **Add role assignment**.

<p><img alt="permissions 3" src="/images/docs/guardrails/getting-started/getting-started-azure/apply-quick-action/permissions-3.png"/></p>

## Step 4: Search for the role

Seach for `storage account contributor`, select it, and select **Next**.

<p><img alt="permissions 4" src="/images/docs/guardrails/getting-started/getting-started-azure/apply-quick-action/permissions-4.png"/></p>

## Step 5: Search for registered app

Select **Select members**, search for the name of your registered app, and **Select** it.

<p><img alt="permissions 5" src="/images/docs/guardrails/getting-started/getting-started-azure/apply-quick-action/permissions-5.png"/></p>

## Step 6: Review and assign

<p><img alt="permissions 6" src="/images/docs/guardrails/getting-started/getting-started-azure/apply-quick-action/permissions-6.png"/></p>

## Step 7: Find Quick Actions

Select **Policies** from the top-level navigation. In the search box, type `quick actions`, then select the **Turbot > Quick Actions > Enabled** policy type.

<p><img alt="find_quick_actions_policies" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/find-quick-actions-policies.png"/></p>

Select the green **New Policy Setting** button.

<p><img alt="view-quick-actions-enabled-policy-type" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/view-quick-actions-enabled-policy-type.png"/></p>

## Step 8: Enable Quick Actions

Choose **Sandbox** as the **Resource**, and then select **Enabled**, and click the green **Create** button.

<p><img alt="aws-enable-quick-actions" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-enable-quick-actions.png"/></p>

## Step 9: Find a storage account in Alarm

Use your bookmark to navigate back to the **Controls by State** report and filter on **Azure > Storage > Storage Account > Minimum TLS Version**.

<p><img alt="find_storage_account_in_alarm_for_quick_action" src="/images/docs/guardrails/getting-started/getting-started-azure/apply-quick-action/find-storage-account-in-alarm-for-versioning.png"/></p>

## Step 10: Select a storage account in Alarm

Select a storage account in `Alarm` state from the list of storage accounts.

<p><img alt="select_storage account_in_alarm_for_quick_action" src="/images/docs/guardrails/getting-started/getting-started-azure/apply-quick-action/select-storage-account-in-alarm-for-versioning.png"/></p>

## Step 11: Use a Quick Action

Select the **Actions** dropdown, and choose **Set Minimum TLS Version*.

<p><img alt="expand-quick-actions-dropdown" src="/images/docs/guardrails/getting-started/getting-started-azure/apply-quick-action/expand-quick-actions-dropdown.png"/></p>

## Step 12: Observe the change

Guardrails reports that the action was successful, and the control goes to the `OK` state.

<p><img alt="observe-updated-control" src="/images/docs/guardrails/getting-started/getting-started-azure/apply-quick-action/observe-updated-control.png"/></p>

![alt text](image.png)

## Step 13: Check if it worked

Open a tab to the Azure portal and navigate to the storage account.  Confirm the Guardrails `Quick Action` has correctly set the minimum TLS version.

<p><img alt="observe-azure-console-result" src="/images/docs/guardrails/getting-started/getting-started-azure/apply-quick-action/raw-observe-azure-console-result.png"/></p>

## Step 14: Review

In this guide you enabled Guardrails Quick Actions and used a Quick Action to change a storage account's policy for minimum TLS version.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-azure/enable-enforcement) we’ll set Guardrails to automatically enforce these actions continuously.


## Progress tracker

- [x] Prepare an Azure Subscription for Import to Guardrails
- [x] Connect an Azure Subscription to Guardrails
- [x] Observe Azure Resource Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] Review Subscription-Wide Governance
- [x] Create a Static Exception to a Guardrails Azure Policy
- [x] Create a Calculated Exception to a Guardrails Azure Policy
- [x] Send an Alert to Email
- [x] **Apply a Quick Action**
- [ ] Enable Automatic Enforcement
