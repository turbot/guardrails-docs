---
title: Create a Calculated Exception to a Guardrails Azure Policy
sidebar_label: Create a Calculated Exception
---


# Create a Calculated Exception to a Guardrails Azure Policy

**Prerequisites**:   
  
- [Prepare an Azure Subscription for Import to Guardrails](/guardrails/docs/getting-started/getting-started-azure/prepare-subscription/)
- [Connect an Azure Subscription to Guardrails](/guardrails/docs/getting-started/getting-started-azure/connect-subscription/)
- [Observe Azure Resource Activity](/guardrails/docs/getting-started/getting-started-azure/observe-azure-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-azure/enable-policy-pack/)
- [Review Subscription-Wide Governance](/guardrails/docs/getting-started/getting-started-azure/review-account-wide/)
- [Create a Static Exception to a Guardrails Azure Policy](/guardrails/docs/getting-started/getting-started-azure/create-static-exception/)


In the [previous runbook](guardrails/docs/runbooks/getting-started-azure/create_static_exception) we showed how to create a static exception. In this one, we’ll show how to make exceptions dynamically, based on resource tags. Start by creating another test storage account (we’ll use `guardrailsazurestorage2`). , and set the TLS version to 1.1 so it won’t comply with policy that requires version 1.2. Don’t set any tags on the storage account yet.

## Step 1: Go to the Azure > Storage > Storage Account > Minimum TLS Version policy

Choose the top-level `Policies` tab, and search policy types for `azure storage minimum tls`.  
<p><img alt="azure_find_tls_versioning_policy" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/azure-find-tls-versioning-policy.png"/></p>

Click into the `Azure > Storage > Storage Account > Minimum TLS Version` policy type, choose the `Settings` tab.
<p><img alt="azure_tls_versioning_policy_settings" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/azure-tls-versioning-policy-settings.png"/></p>

Note the Versioning policy (`Check: TLS 1.2`) created in [Attach a policy](/guardrails/docs/runbooks/getting-started-azure/attach-a-policy), and the storage-account-level policy (`Skip`) created in [Create a static exception](/guardrails/docs/runbooks/getting-started-azure/create-static-exception).   
  
Click `New Policy Setting`.

## Step 2: Create a calculated exception
<p><img alt="azure_begin_calc_exception" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/azure-begin-calc-exception.png"/></p>

Click `Enable calculated mode`, then `Launch calculated policy builder`. For the `Test Resource`, choose the bucket you created at the start of this runbook.
<p><img alt="azure_calc_policy_builder_launched" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/azure-calc-policy-builder-launched.png"/></p>

Open the `Select snippet` dropdown and choose `Get storageAccount`.
<p><img alt="azure_snippet_dropdown_open" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/azure-snippet-dropdown-open.png"/></p>  
  
Guardrails inserts a GraphQL query for storage account tags in the `Input` pane. The result, in the `Output` pane, shows there are no tags on the bucket.
<p><img alt="azure_snippet_active" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/azure-snippet-active.png"/></p>

Now copy this template code:  
  
```nunjucks
{% if $.storageAccount.turbot.tags.environment == "development" %}
'Skip'
{% else %}
'Check: TLS 1.2'
{% endif %}
```

And paste it into the template pane.  
<p><img alt="azure_template_active" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/azure-template-active.png"/></p>  
  


Guardrails evaluates the step 3 template in the context of the chosen `Test Resource`. The step 3 output, `Check: TLS 1.2, is the calculated policy value that will apply to this bucket’s `Azure > Storage > Storage Account > Minimum TLS Version` policy if the bucket is tagged with `environment:development`.   
  
The step 4 result confirms that `Check: TLS 1.2` is valid for this policy type.  
  
Click `Update` to update the policy.

## Step 3: Attach the calculated policy to your Azure subscription

To attach this policy to your Azure subscription, so it will apply to all storage accounts in the subscription, choose your subscription as the `Resource`.   
<p><img alt="azure_attach_calc_policy_to_subscription" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/azure-attach-calc-policy-to-subscription.png"/></p>

Then click `Create`. Guardrails takes you to the `Policy Setting` page. Choose the `Hierarchy` tab.  
<p><img alt="azure_hierarchy_with_calc_policy_in_effect" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/azure-hierarchy-with-calc-policy-in-effect.png"/></p>  
  


For the Sandbox, the default is overridden from `Skip` to `Check: TLS 1.2`. For the subscription, that setting is overridden by the calculated policy you just created. And finally, at the bottom of the hierarchy, your static exception for the original test storage account overrides back to skip.   


## Step 4: Observe storage account status

To check the status of the second storage account, do a top-level search for it.
<p><img alt="azure_refind_the_storage_account" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/azure-refind-the-storage-account.png"/></p>  
  


Click into the resource, choose the `Controls` tab, and set the `Type` filter to `Azure > Storage > Storage Account > Minimum TLS Version`.  
<p><img alt="azure_filter_storage_account_to_tls_version_policy_type" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/azure-filter-storage-account-to-tls-version-policy-type.png"/></p>

The storage account is in `Alarm` because the TLS version you set, 1.1, does not  comply with policy. Now, tag it with `environment:development` to activate the calculated policy you created in this runbook.  
<p><img alt="azure_tag_the_storage_account" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/azure-tag-the-storage-account.png"/></p>  
  


Guardrails notices the change, reevaluates the resource, runs the calculated policy, and changes the status to `Skipped`.
<p><img alt="azure_tagged_storage_account_now_skipped" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/azure-tagged-storage-account-now-skipped.png"/></p>

In the [next runbook](/guardrails/docs/runbooks/getting-started-azure/send-alert-to-email) we’ll see how to subscribe to these status alerts via email, Slack, or MS Teams. 

  



## Progress tracker

- [x] Prepare an Azure Subscription for Import to Guardrails
- [x] Connect an Azure Subscription to Guardrails
- [x] Observe Azure Resource Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] Review Subscription-Wide Governance
- [x] Create a Static Exception to a Guardrails Azure Policy
- [x] **Create a Calculated Exception to a Guardrails Azure Policy**
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
