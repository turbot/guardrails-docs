---
title: Create a Static Exception to a Guardrails Azure Policy
sidebar_label: Create a Policy Exception
---

# Create a Static Exception to a Guardrails Azure Policy

In this guide you’ll learn how to exempt a specific resource from a subscription-wide policy

This is the sixth guide in the *Getting started with Azure* series.

## Prerequisites

- Completion of the previous guides in this series.

- Access to the Guardrails console with administrative privileges.

## Step 1: Open the Controls by State report

Navigate to the **Controls by State** report, expand the **Type** dropdown, and search for `azure storage account tls`. Enable the checkbox next to **Azure > Storage > Storage Account > Minimum TLS Version** to filter by **Type**.

<p><img alt="filter 1" src="/images/docs/guardrails/getting-started/getting-started-azure/review-subscription-wide/filter-1.png"/></p>

## Step 2: Set the State filter

You can also filter by **State**. Expand that dropdown, and enable the checkbox next to **Alarm**.

<p><img alt="filter 3" src="/images/docs/guardrails/getting-started/getting-started-azure/create-static-exception/filter-3.png"/></p>


## Step 3: Choose a storage account

Pick a control, here `guardrailsazurestorage1`, and select its linked name.

<p><img alt="choose-storage-account" src="/images/docs/guardrails/getting-started/getting-started-azure/create-static-exception/choose-storage-account.png"/></p>


## Step 4: View resource details

Because we were viewing the **Controls by State** report, our action landed us on the **Control Details** page. We can switch to the **Resource Detail** view by using the blue **Resource** link next to the sub-tab bar.

<p><img alt="open-control" src="/images/docs/guardrails/getting-started/getting-started-azure/create-static-exception/raw-open-control.png"/></p>

## Step 5: View polices for the storage account

Now that you are are viewing the **Resource Detail** for the selected storage account, you can create an exception for this resource. To do that you will create a new policy setting. Select the **Policies** sub-tab and click the green **New Policy Setting** button.

<p><img alt="switch-to-policies" src="/images/docs/guardrails/getting-started/getting-started-azure/create-static-exception/policies-sub-tab.png"/></p>


## Step 6: Select the policy type

In the **Type** dropdown, search for `azure storage tls version`, and enable the checkbox next to **Azure > Storage > Storage Account > Minimum TLS Version**.

<p><img alt="find policy setting" src="/images/docs/guardrails/getting-started/getting-started-azure/create-static-exception/select-policy-type.png"/></p>

## Step 7: Create the policy exception

Choose the **Skip** setting, and select **Create**.

<p><img alt="create-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-azure/create-static-exception/create-policy-setting.png"/></p>

## Step 8: Confirm the setting

This storage account is now exempt from the requirement to enforce TLS 1.2.

<p><img alt="confirm setting" src="/images/docs/guardrails/getting-started/getting-started-azure/create-static-exception/raw-confirm-policy-setting.png"/></p>

  
## Step 9: View in context

Select the **Hierarchy** tab. The project-level policy specifies **Check: TLS 1.2**. You’ve overridden that with an exception that exempts this particular storage account from that policy.  

<p><img alt="view-hierarchy" src="/images/docs/guardrails/getting-started/getting-started-azure/create-static-exception/raw-view-hierarchy.png"/></p>

## Step 10: Review storage account activity

Select the **Activity** tab and observe the history. When you created the storage-account-level policy setting to make an exception for this storage account, the control reevaluated and set the status to `Skipped`.  

<p><img alt="review-activity" src="/images/docs/guardrails/getting-started/getting-started-azure/create-static-exception/raw-view-activity.png"/></p>

## Step 11: Review

In this guide you created a resource-level exception for the control that governs the TLS version for storage accounts.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-azure/create-calculated-exception) we’ll see how to dynamically calculate an exception based on a resource tag.


## Progress tracker

- [x] Prepare an Azure Subscription for Import to Guardrails
- [x] Connect an Azure Subscription to Guardrails
- [x] Observe Azure Resource Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] Review Subscription-Wide Governance
- [x] **Create a Static Exception to a Guardrails Azure Policy**
- [ ] Create a Calculated Exception to a Guardrails Azure Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
