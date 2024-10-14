---
title: Create a Static Exception to a Guardrails Azure Policy
sidebar_label: Create a static exception to a Azure GCP policy
---


# Create a Static Exception to a Guardrails Azure Policy

**Prerequisites**:   
  
- [Connect an Azure Account to Guardrails](/guardrails/docs/getting-started/getting-started-azure/connect-a-subscription/)
- [Observe Azure Resource Activity](/guardrails/docs/getting-started/getting-started-azure/observe-azure-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-azure/enable-policy-pack/)


Now that we have set our Azure storage account policy (for minimum TLS version), we can track which Azure storage accounts do not comply with the policy. In this runbook we will show how to create an exception for your test storage account, so Guardrails will ignore its TLS version.

## Step 1: Find your test storage account

Do a top-level search for the bucket..

<p><img alt="azure_tls_version_find_the_storage_account" src="/images/docs/guardrails/getting-started/getting-started-azure/create-static-exception/azure-tls-version-find-the-storage-account.png"/></p>

## Step 2: Create a policy exception

Click into the resource, switch to the `Policies` tab, and search for `storage account tls version`.  

<p><img alt="azure_tls_version_find_new_policy_setting" src="/images/docs/guardrails/getting-started/getting-started-azure/create-static-exception/azure-tls-version-find-new-policy-setting.png"/></p>

Note that the storage account  inherits `Check: TLS 1.2` from the policy pack attached to the `Sandbox` folder. 

  
Now click `New Policy Setting`.

<p><img alt="azure_tls_version_new_policy_setting" src="/images/docs/guardrails/getting-started/getting-started-azure/create-static-exception/azure-tls-version-new-policy-setting.png"/></p>

Search for and select the Policy Type `Azure > Storage > Storage Account > Minimum TLS Version`.

  
Choose `Skip` and click `Create`. Guardrails sends you to the Policy Setting page.

Select the `Hierarchy` tab to review the new situation.

<p><img alt="azure_tls_hierarchy_with_bucket_exception" src="/images/docs/guardrails/getting-started/getting-started-azure/create-static-exception/azure-tls-hierarchy-with-bucket-exception.png"/></p>

The default for TLS version was `Skip`, the policy you created in the previous runbook changed it to `Check: TLS 1.2`, and now this particular storage account overrides that setting back to `Skip`. Note that every other bucket in the Sandbox folder still has an effective policy setting of `Check: Uniform`.  


## Step 3: Review Guardrails activity for the storage account

Use the top-level search (as above) to find your test bucket.

Click into the storage account, then select the `Activity` tab.

<p><img alt="gcp_review_storage_account_activity" src="/images/docs/guardrails/getting-started/getting-started-azure/create-static-exception/gcp-review-storage-account-activity.png"/></p>

Here you can see the whole history, reading from the bottom up.

 - When you attached the policy that requires TLS 1.2,  the storage account went into `Alarm`. The alarm state represents the difference between what the policy asserts and the actual state of the bucket.

- When you upgraded the storage account to TLS 1.2, the status changed from `Alarm` to `OK`.  
  
- Then you created the bucket-level policy setting to make an exception for the test storage account.  
  
- Then Guardrails reevaluated and set the status to `Skipped`.This particular storage account is now exempt from the policy that requires TLS 1.2.

  
In the [next runbook](/guardrails/docs/runbooks/getting-started-azure/create-calculated-exception) we’ll see how to dynamically calculate an exception based on a resource tag.


## Progress tracker

- [x] Connect an Azure Account to Guardrails
- [x] Observe Azure Resource Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] **Create a Static Exception to a Guardrails Azure Policy**
- [ ] Create a Calculated Exception to a Guardrails Azure Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
