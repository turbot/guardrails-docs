---
title: Create a Calculated Exception to a Guardrails Azure Policy
sidebar_label: Create a Calculated Exception
---


# Create a Calculated Exception to a Guardrails Azure Policy


In this guide you'll learn how to make dynamic policy exceptions based on resource tags. These [Calculated Policies](/guardrails/docs/reference/glossary#calculated-policy) enable you to implement business logic when designing your governance controls. 

Some typical examples of how to use calculated polices are: 

- Dynamic tagging of resources based on resource metadata.
- Creating policy exceptions for different classes of resources.
- Taking enforcement action for based on resource tags.

This guide will walk you through a simple calculated policy based on resource tags.

This is the seventh guide in the *Getting started with Azure* series.

**Prerequisites**
 
- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privileges.
- Access to the Azure portal with permissions to tag storage accounts

## Step 1: Open the Policy Pack

Choose **Policies** from the top navigation bar. Select the **Enforce Secure TLS Version for Azure Storage Accounts** Policy Pack from the list on the right.

<p><img alt="view-policy-packs" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/view-policy-packs.png"/></p>


## Step 2: Modify the policy setting

The TLS policy is currently `Check: TLS 1.2`. Use the pencil icon on the right side of the policy setting to edit the policy.

<p><img alt="view-policy-pack" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/view-policy-pack.png"/></p>

## Step 3: Enable calculated mode

Select the blue **Enable calculated mode** link.

<p><img alt="enable-calculated-mode" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/enable-calculated-mode.png"/></p>

## Step 4: Launch calculated policy builder

Select **Launch calculated policy builder**.

<p><img alt="launch-calculated-policy-builder" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/launch-builder.png"/></p>


## Step 5: Choose test resource

Calculated policies work across all resources in scope of the policy setting. While building a calc policy it is useful to test the business logic against real resources in your environment. For this guide you will find and select one of the previously-created storage accounts by searching in the **Test Resource** field.

<p><img alt="choose test resource" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/choose-resource.png"/></p>

## Step 6: Build query

In the **Query Input** field we will use **Select Snippet** to prepopulate our [GraphQL](/guardrails/docs/reference/glossary#graphql) query. Choose **Get storage account** from the dropdown.

<p><img alt="snippet-dropdown-open" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/open-snippet-dropdown.png"/></p>

## Step 7: View query result

Guardrails inserts a GraphQL query for bucket tags into the **Input** pane, and then runs the query against the selected test resource. The result, in the **Output** pane, shows there are no tags on the bucket.

<p><img alt="snippet-active" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/snippet-active.png"/></p>

## Step 8: Add the Jinja2 template

Our business logic is created in the `Template` section, using [Nunjucks syntax](https://mozilla.github.io/nunjucks/templating.html).
  
Copy this template code:  
  
```nunjucks
{% if $.storageAccount.turbot.tags.environment == "development" %}
'Skip'
{% else %}
'Check: TLS 1.2'
{% endif %}
```

And paste it into the template pane.

<p><img alt="template-active" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/template-active.png"/></p>

Guardrails evaluates the template in the context of the chosen **Test Resource**. The template output, `Check: TLS`, is the calculated policy value that will govern any storage account’s **Azure > Storage > Storage Account > Minumum TLS Version** policy if it is tagged with `environment:development`. Only these tagged buckets will be required to have TLS 1.2 enabled. Others will be skipped, whether or not they enable TLS 1.2.
  
The result confirms that `Check: TLS 1.2` is valid for this policy type.  Why? Because the test storage accountbucket does not have a tag `{ "environment": "development" }`.

Select **Update**

## Step 9: Save the calculated policy to the policy pack
 
Select **Update**.

<p><img alt="update-policy-setting" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/update-setting.png"/></p>

## Step 10: Observe controls for storage account TLS version

Navigate back to the **Controls by State** report and set the **Type** filter to **Azure > Storage > Storage Account > Minimum TLS Version**. Storage accounts with TLS 1.2 enabled will be in the `OK` state. Find one in the `Alarm` state to modify, and note its name.

<p><img alt="revisit-controls-by-state" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/revisit-controls-by-state.png"/></p>

## Step 11: Tag the storage account

Open the Azure portal in another tab, navigate to the storage account identified in the previous step, and assign the tag `environment:development` to it.

<p><img alt="tag-storage-account" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/raw-tag-the-storage-account.png"/></p>

## Step 12: Observe the effect

Return to the **Controls by State** report in the previous browser tab.  Observe that Guardrails notices the change, reevaluates the resource, runs the calculated policy, and changes the status from `Alarm` to `Skipped`.

<p><img alt="tagged-now-skipped" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/create-calculated-exception/tagged-now-skipped.png"/></p>

## Step 13: Review

In this guide you created your first calculated policy and tested it using the control that governs the TLS version for storage accounts.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-azure/send-alert-to-email) we’ll see how to subscribe to these status alerts via email, Slack, or MS Teams. 




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
