---
title: Enable Automatic Enforcement
sidebar_label: Enable Automatic Enforcement
---

  
  
In the [previous runbook](/guardrails/docs/runbooks/getting-started-azure/apply-quick-action) we showed how to assign a role thatt enables you to take a `Quick Action` on the minimum TLS version for a storage account. That’s needed here as well, as we explore how to empower Guardrails to take such actions autonomously.

# Enable Automatic Enforcement

**Prerequisites**:  
  
- [Connect an Azure Account to Guardrails](/guardrails/docs/getting-started/getting-started-azure/connect-a-subscription/)
- [Observe Azure Resource Activity](/guardrails/docs/getting-started/getting-started-azure/observe-azure-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-azure/enable-policy-pack/)
- [Create a Static Exception to a Guardrails Azure Policy](/guardrails/docs/getting-started/getting-started-azure/create-static-exception/)
- [Create a Calculated Exception to a Guardrails Azure Policy](/guardrails/docs/getting-started/getting-started-azure/create-calculated-exception/)
- [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-azure/send-alert-to-email/)
- [Apply a Quick Action](/guardrails/docs/getting-started/getting-started-azure/apply-quick-action/)


Step 1: Lower the minimum TLS version

In the Azure portal,  set the minimum TLS version for your original test bucket, in our case `guardrailsazurestorage1`, to 1.0.  


## Step 2: Find the TLS version policy for the storage account

Search for the storage account. In  [Create a static  exception](/guardrails/docs/runbooks/getting-started-azure/create-static-exception) we set its TLS versioning policy to `Skip`.  

<p><img alt="azure_find_storage_account_tls_versioning_policy_setting" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-enforcement/azure-find-storage-account-tls-versioning-policy-setting.png"/></p>

Step 3: Update the policy setting  
  
Click into the Policy Setting, click `Edit`. Originally we had an exception to "Skip" the bucket from checking the TLS version.  Now we will automatically enforce the minimum secure version, 1.2.  Choose `Enforce: TLS 1.2` and click `Update`.  

<p><img alt="azure_enforce_tls_1.2" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-enforcement/azure-enforce-tls-1.2.png"/></p>

On the Policy Setting page, switch to the `Activity` tab.  

<p><img alt="azure_enforcement_happened" src="/images/docs/guardrails/getting-started/getting-started-azure/enable-enforcement/azure-enforcement-happened.png"/></p>

Here you can see the whole history. Reading from the bottom up:

- you updated the policy setting

- Guardrails reevaluated and found the storage account to be out-of-policy

- Guardrails autonomously did what you did with a `Quick Action` in the previous runbook: enforce the minimum secure version, TLS 1.2

  
- Guardrails noticed the bucket’s changed status

- Guardrails reevaluated and found that the bucket now complies with policy

For fun, try lowering the minimum TLS version again. It won’t stay that way for long!

This Getting Started series just scratches the surface.  Try installing more [policy packs](https://hub.guardrails.com) into your workspace, and run through this series again to explore the breadth and variety of what Guardrails can do. 


## Progress tracker

- [x] Connect an Azure Account to Guardrails
- [x] Observe Azure Resource Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] Create a Static Exception to a Guardrails Azure Policy
- [x] Create a Calculated Exception to a Guardrails Azure Policy
- [x] Send an Alert to Email
- [x] Apply a Quick Action
- [x] **Enable Automatic Enforcement**
