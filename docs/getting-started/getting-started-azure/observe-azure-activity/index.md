---
title: Observe Azure Resource Activity
sidebar_label: Observe Resource Activity
---

# Observe AWS Resource Activity

In this guide you will learn how Guardrails detects and reacts to events in your Azure subscription. You will manually create and modify a Azure storage account account and explore how to view that activity in the Guardrails console.

This is the third guide in the *Getting started with Azure* series.

## Prerequisites

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privlidges.
- Console access to an Azure subscription and the ability to create and modify storage accounts.

> [!NOTE]
> We will use the storage account name `guardrailsazurestorage1` in this guide.

## Step 1: Create an Azure storage account

Navigate to **Home > Storage accounts**, select **Create**, assign a name, and select **Review + create**.

<p><img alt="create storage 1" src="/images/docs/guardrails/getting-started/getting-started-azure/observe-azure-activity/create-storage-1.png"/></p>

On the next screen, select **Create**.

<p><img alt="create storage 2" src="/images/docs/guardrails/getting-started/getting-started-azure/observe-azure-activity/create-storage-2.png"/></p>  

## Step 2: Resource Activities report
 
Select **Reports** from the top navigation bar. Search for the word "resource" and select **Resource Activities**.

<p><img alt="aws_search_resource_activities" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-search-resource-activities.png"/></p>

## Step 3: Filter by type

From the filter bar, expand the **Resource Type** dropdown.

<p><img alt="filter 1" src="/images/docs/guardrails/getting-started/getting-started-azure/observe-azure-activity/filter-1.png"/></p>

Set the filter to **Azure > Storage > Storage Account**. You can do this by typing `azure storage account` into the search box, as shown here. When you see *Azure > Storage > Storage Account* appear in the list, select the checkbox next to it.

<p><img alt="filter 2" src="/images/docs/guardrails/getting-started/getting-started-azure/observe-azure-activity/filter-2.png"/></p>

## Step 4: Observe activity

You can scope the resource activity report to a specific storage account by searching for the name of your storage account. To do this, type its name into the search field. Guardrails will show all notifications related to the storage account. In the screen below, the `RESOURCE CREATED` activity represents Guardrails discovery of the storage account and `RESOURCE UPDATED` indicates that Guardrails has updated the CMDB entry with additional details about it.

<p><img alt="filter 3" src="/images/docs/guardrails/getting-started/getting-started-azure/observe-azure-activity/filter-3.png"/></p>

## Step 5: Downgrade to TLS 1.0

Azure storage accounts default to TLS 1.2. Select the link *Version 1.2* to open the configuration screen.

<p><img alt="tls 1" src="/images/docs/guardrails/getting-started/getting-started-azure/observe-azure-activity/tls-1.png"/></p>

Choose `TLS 1.0` and select **Save**.

<p><img alt="tls 2" src="/images/docs/guardrails/getting-started/getting-started-azure/observe-azure-activity/tls-2.png"/></p>

## Step 6: Observe events

Switch back to the Guardrails console browser tab. Guardrails' event processing system will soon detect the change, and a new `RESOURCE UPDATED` notification will appear in the list. Select that new notification from the Activities list.

<p><img alt="filter 4" src="/images/docs/guardrails/getting-started/getting-started-azure/observe-azure-activity/filter-4.png"/></p>

## Step 7: Audit resource change

On the notifications detail page, you can see metadata about the change and even audit the changes in configuration between the previous known state and the observed change. Scroll down in the **DIFF** section to observe the changes that Guardrails has recorded. 

<p><img alt="diff" src="/images/docs/guardrails/getting-started/getting-started-azure/observe-azure-activity/diff.png"/></p>

## Step 8: Review

In this guide you changed the TLS property of an Azure storage account and observed how Guardrails recorded the change.

## Next Steps

Next we’ll explore [how to enable a policy pack](/guardrails/docs/getting-started/getting-started-azure/enable-policy-pack) that requires storage account to use TLS 1.2.


## Progress tracker

- [x] Prepare an Azure Subscription for Import to Guardrails
- [x] Connect an Azure Subscription to Guardrails
- [x] **Observe Azure Resource Activity**
- [ ] Enable Your First Guardrails Policy Pack
- [ ] Review Subscription-Wide Governance
- [ ] Create a Static Exception to a Guardrails Azure Policy
- [ ] Create a Calculated Exception to a Guardrails Azure Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
