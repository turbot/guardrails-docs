---
title: Observe Azure Resource Activity
sidebar_label: Observe Azure Resource Activity
---


# Observe Azure resource activity

**Prerequisites**: 

- [Connect an Azure Account to Guardrails](/guardrails/docs/runbooks/getting-started-azure/connect-an-account/)


 

Now that you’ve connected an Azure subscription, you can explore your resource inventory.  To visualize activity, go to `Reports`,  find `Resource activities`, then click that link. 

The following steps will show how to observe Azure resource activity in real-time.

## Step 1: Create an Azure storage account

We’ll use the name `guardrailsazurestorage1`, choose your own name.  
<p><img alt="azure_create_storage_account" src="/images/docs/guardrails/runbooks/getting-started-azure/observe-azure-activity/azure-create-storage-account.png"/></p><br/>  


Accept the defaults, including this one for minimum TLS version which will be the focus of this series of runbooks.
<p><img alt="azure_minimum_tls_version" src="/images/docs/guardrails/runbooks/getting-started-azure/observe-azure-activity/azure-minimum-tls-version.png"/></p><br/>

## Step 2: See Guardrails discover the new storage account

Select top-level `Reports`, search in the page for `Resource Activities`, and click the link.
<p><img alt="azure_search_resource_activities" src="/images/docs/guardrails/runbooks/getting-started-azure/observe-azure-activity/azure-search-resource-activities.png"/></p><br/>

In the `Resource Activities` report, open the `Resource Type` filter, search for `azure storage account`, and select `Azure > Storage > Storage Account`.

Guardrails reports two notifications related to the storage account creation. `RESOURCE CREATED` indicates initial discovery. `RESOURCE UPDATED` indicates that Guardrails has updated the CMDB entry with additional details.
<p><img alt="azure_resource_activities_initial_notifications" src="/images/docs/guardrails/runbooks/getting-started-azure/observe-azure-activity/azure-resource-activities-initial-notifications.png"/></p><br/>

## Step 3: See Guardrails react to a storage account change

   
Now visit your storage account in the Azure portal and downgrade to TLS 1.0.
<p><img alt="azure_downgrade_to_tls_to_observe_change" src="/images/docs/guardrails/runbooks/getting-started-azure/observe-azure-activity/azure-downgrade-to-tls-to-observe-change.png"/></p><br/>

Revisit `Reports > Resource Activities`, and (if needed) reapply the `Resource Type` filter as `Azure > Storage > Storage Account`.  
<p><img alt="azure_resource_activities_with_change_detected" src="/images/docs/guardrails/runbooks/getting-started-azure/observe-azure-activity/azure-resource-activities-with-change-detected.png"/></p><br/>

Click into the new notification for your storage account, and scroll down in the diff to see the change that Guardrails has recorded.  
<p><img alt="azure_diff_the_first_change" src="/images/docs/guardrails/runbooks/getting-started-azure/observe-azure-activity/azure-diff-the-first-change.png"/></p><br/>

We’ve now seen how Guardrails detects the creation of a new resource in a connected account, and also notices and records changes to the configuration of that resource.  
  
Next we’ll explore [how to set a policy](/guardrails/docs/runbooks/getting-started-azure/attach-a-policy) that requires storage accounts to use TLS 1.2.


## Progress tracker

1. [Connect an Azure Account to Guardrails](/guardrails/docs/runbooks/getting-started-azure/connect-an-account/)

2. **Observe Azure Resource Activity**

3. [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-azure/attach-a-policy/)
