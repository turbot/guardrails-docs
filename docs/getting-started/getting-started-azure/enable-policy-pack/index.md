---
title: Enable Your First Guardrails Policy Pack
sidebar_label: Enable Policy Pack
---


# Enable your First Policy Pack

**Prerequisites**: 

- [Prepare an Azure Subscription for Import to Guardrails](/guardrails/docs/getting-started/getting-started-azure/prepare-subscription/)
- [Connect an Azure Subscription to Guardrails](/guardrails/docs/getting-started/getting-started-azure/connect-subscription/)
- [Observe Azure Resource Activity](/guardrails/docs/getting-started/getting-started-azure/observe-azure-activity/)


Now that we can track resource configuration drift, we can create policies to alert when those configurations do not meet our desired state. 

## Step 1: Review storage account properties

Check the properties of the storage account you created in [Observe Azure activity](/guardrails/docs/runbooks/getting-started-azure/observe-azure-activity). In that runbook you switched the minimum TLS version to 1.1.
<p><img alt="azure-review-min-tls-version" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/azure-review-min-tls-version.png"/></p>

## Step 2: Find and view the Azure > Storage > Storage Account > Minimum TLS Version control

From top-level `Controls`, search for `Azure > Storage > Storage Account > Minimum TLS Version`
<p><img alt="azure_search_storage_account_min_tls_version" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/azure-search-storage-account-min-tls-version.png"/></p>

Guardrails reports that your storage accounts are in the `skipped` state for this control. By default, there is no attached policy to enforce a minimum TLS version. Let’s attach one. 

## Step 3: Attach a policy

Your Guardrails workspace already has the pre-installed policy pack [Enforce Secure TLS Version for Azure Storage Accounts

](https://hub.guardrails.turbot.com/policy-packs/azure_storage_account_minimum_tls_version).

To attach it, click top-level `Resources`, navigate to your `Sandbox` folder, select the `Detail` tab, and click the `Manage` link next to `Policy Packs`.  
<p><img alt="azure_find_policy_packs_manage" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/azure-find-policy-packs-manage.png"/></p>

In the `Edit policy pack attachments` dialog, select `Enforce Secure TLS Version for Azure Storage Accounts` and  click `Save`.
<p><img alt="azure_edit_attachments_select_enforce_versioning" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/azure-edit-attachments-select-enforce-versioning.png"/></p>  
  


## Step 4: Observe a policy-driven alarm

Do a top-level search for the name of your bucket, switch to the `Controls` tab, and search for `tls version`. The control, which was formerly in the `Skipped` state, is now `Alarm` because you have applied the policy setting `Check: TLS 1.2`.
<p><img alt="azure_observe_tls_version_alarm" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/azure-observe-tls-version-alarm.png"/></p>  


Now, in the Azure portal,  set the minimum TLS version back to the default, `1.2`.
<p><img alt="azure_tls_version_ok" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-policy-pack/azure-tls-version-ok.png"/></p>  
  


With the minimum TLS version set back to the default, `1.2`, the storage account now complies with the `Check: TLS 1.2` policy setting so Guardrails puts the storage account  into the `OK` state for that policy.  
  
You can override policies at any level. In the [next runbook](/guardrails/docs/runbooks/getting-started-azure/create-static-exception), we’ll create an exception that enables your test storage account to skip this check. 


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
