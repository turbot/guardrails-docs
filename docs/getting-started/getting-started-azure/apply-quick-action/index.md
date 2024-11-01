---
title: Apply a Quick Action
sidebar_label: Apply a Quick Action
---


  
Until now we’ve operated Guardrails in read-only mode, with the minimal permissions needed to discover resources, track changes, and alert on misconfigurations. In this runbook we’ll show how you can enable Guardrails to perform [Quick Actions](/guardrails/docs/guides/quick-actions) that fix misconfigurations.

# Apply a Quick Action

**Prerequisites**: 

- [Prepare an Azure Subscription for Import to Guardrails](/guardrails/docs/getting-started/getting-started-azure/prepare-subscription/)
- [Connect an Azure Subscription to Guardrails](/guardrails/docs/getting-started/getting-started-azure/connect-subscription/)
- [Observe Azure Resource Activity](/guardrails/docs/getting-started/getting-started-azure/observe-azure-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-azure/enable-policy-pack/)
- [Review Subscription-Wide Governance](/guardrails/docs/getting-started/getting-started-azure/review-account-wide/)
- [Create a Static Exception to a Guardrails Azure Policy](/guardrails/docs/getting-started/getting-started-azure/create-static-exception/)
- [Create a Calculated Exception to a Guardrails Azure Policy](/guardrails/docs/getting-started/getting-started-azure/create-calculated-exception/)
- [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-azure/send-alert-to-email/)
  
  
Step 1: Assign the `Storage Account Contributor` role to your registered app

In the Azure portal, go to the resource group that contains the storage accounts you’re using in this series.   
  
Click `Add role assignment`.

Search for and select `Azure Storage Contributor`.
<p><img alt="azure-search-select-azure-storage-contributor" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/apply-quick-action/azure-search-select-azure-storage-contributor.png"/></p>

Click `Next`.

  
Click `Select members`, search for your registered app, and click `Select`.
<p><img alt="azure-select-registered-app-for-role-assignment" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/apply-quick-action/azure-select-registered-app-for-role-assignment.png"/></p>

Click `Review and assign` to assign the role.

## Step 2: Enable Quick Actions

Do a top-level search for `quick actions` and click into the `Turbot > Quick Actions > Enabled` setting.
<p><img alt="azure_find_quick_actions_policies" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/apply-quick-action/azure-find-quick-actions-policies.png"/></p>

It’s disabled by default. On its Policy Type page, click `New Policy Setting`, choose your Sandbox as the target resource, choose `Enabled`, and click `Create`.  
<p><img alt="azure_ready_to_enable_quick_actions" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/apply-quick-action/azure-ready-to-enable-quick-actions.png"/></p>

## Step 3: Find a storage account in Alarm for TLS version

In [Send an alert to email]( /guardrails/docs/runbooks/getting-started-azure/send-alert-to-email) we left your test bucket in the `Alarm` state. Search for it, click into the resource, switch to the `Controls` tab, and search for `tls`.   
<p><img alt="find_azure_search_storage_account_in_alarm_for_quick_action" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/apply-quick-action/find-azure-search-storage-account-in-alarm-for-quick-action.png"/></p>  


## Click into the control and expand the `Actions` dropdown.[image: azure_versioning_quick_action_dropdown]Step 4: Take a Quick Action to enforce minimum TLS version

  
  
Choose `Set Minimum TLS Version`.

Guardrails reports that the action was successful, and the control goes to green.  
<p><img alt="azure_quick_action_reports_success" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/apply-quick-action/azure-quick-action-reports-success.png"/></p>  
  
For more detail about what happened here, go to the top-level `Reports` tab, search in the page for `Activity Ledger`, and filter on `Control Type` == `Azure > Storage > Storage Account`.  
<p><img alt="azure_quick_action_report_detail" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/apply-quick-action/azure-quick-action-report-detail.png"/></p>

The flow of notifications tells the story. Reading from the bottom up, Guardrails:  
  
- performs the action  
  
- notices the updated bucket  
  
- reevaluates the control.

In the [next runbook](/guardrails/docs/runbooks/getting-started-azure/enable-enforcement) we’ll set Guardrails to automatically enforce these actions continuously.


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
