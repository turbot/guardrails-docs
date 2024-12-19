---
title: Enable Your First Guardrails Policy Pack
sidebar_label: Enable Policy Pack
---

# Enable your First Policy Pack

In this guide, you will learn how to attach a Guardrails [Policy Pack](/guardrails/docs/guides/configuring-guardrails/policy-packs) to enable governance controls.

This is the fourth guide in the *Getting started with Azure* series.

## Prerequisites

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privileges.
- Access to the Azure portal with the ability to create and modify storage accounts.

## Step 1: Check storage account TLS setting in Azure

Check the properties of the storage account you created in the previous guide ([Observe Azure activity](/guardrails/docs/getting-started/getting-started-azure/observe-azure-activity)). Verify that TLS still set to 1.0 on the test storage account you created.

<p><img alt="tls setting" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/tls-setting.png"/></p>

## Step 2: Filter controls

You bookmarked the **Controls by State** report in [Connect a Subscription](/guardrails/docs/getting-started/getting-started-azure/connect-subscription), go there now. From the filter bar open the **Type** dropdown and search for `azure storage account tls`. Select the checkbox next to `Azure > Storage > Storage Account > Minimum TLS Version`. 

<p><img alt="filter 1" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/filter-1.png"/></p>


## Step 3: Find your storage account

Search for your storage account by typing its name into the search field. It should be in the `Skipped` state, because Guardrails has not been configured to check the TLS version on storage accounts.

<p><img alt="filter 2" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/filter-2.png"/></p>

## Step 4: Navigate to your account

Control-click on the **Guardrails** logo on the top of the page to open a new homepage browser tab.

<p><img alt="locate-policy-pack" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/filter-3.png"/></p>

Click on the **Accounts** sub-tab from the homepage and then select your Azure subscription.

<p><img alt="locate-policy-pack-manage-2" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/locate-policy-pack-manage-2.png"/></p>

On the subscription resource page, select the **Detail** sub-tab.

<p><img alt="locate-policy-pack-manage-3" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/locate-policy-pack-manage-3.png"/></p>


## Step 5: Locate the Policy Pack manager

Select the **Manage Link** next to **Policy Packs** UI widget.

<p><img alt="locate-policy-pack-manage-4" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/locate-policy-pack-manage-4.png"/></p>


## Step 6: Attach the Policy Pack to your subscription

In the **Edit policy pack attachments** dialog box, select **Add**.

<p><img alt="attach-1" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/attach-1.png"/></p>


Your Guardrails workspace should have the Policy Pack [Enforce Secure TLS Version for Azure Storage Accounts](https://hub.guardrails.turbot.com/policy-packs/azure_storage_enforce_secure_tls_version_for_storage_accounts) pre-installed.

In the dropdown, select the Policy Pack named `Enforce Secure TLS Version for Azure Storage Accounts`. Then select **Save**.

<p><img alt="attach-2" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/attach-2.png"/></p>


## Step 7: Observe policy effect

Return to your open browser tab (or bookmark) for the **Controls by State** report. Observe that the control state for your test storage account changes from `Skip` to `Alarm`. It is in the `Alarm` state because you downgraded the TLS setting in  [Observe Azure Activity](/guardrails/docs/getting-started/getting-started-azure/observe-azure-activity) but the policy requires TLS 1.2.

<p><img alt="storage-account-in-alarm" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/storage-account-in-alarm.png"/></p>

## Step 8: Review

In this guide you've attached a Policy Pack to your Azure subscription to check the TLS setting on storage accounts, and observed how the policy affects your storage account's control for Minimum TLS Version.


## Progress tracker

- [x] Prepare an Azure Subscription for Import to Guardrails
- [x] Connect an Azure Subscription to Guardrails
- [x] Observe Azure Resource Activity
- [x] **Enable Your First Guardrails Policy Pack**
- [ ] Review Subscription-Wide Governance
- [ ] Create a Static Exception to a Guardrails Azure Policy
- [ ] Create a Calculated Exception to a Guardrails Azure Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
