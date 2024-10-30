---
title: Create a Static Exception to a Guardrails Policy
sidebar_label: Create a Policy Exception
---

# Create a Static Exception to a Guardrails GCP Policy

In this guide you’ll learn how to exempt a specific resource from a project-wide policy

This is the sixth guide in the *Getting started with GCP* series.

**Prerequisites**

- Completion of the previous guides in this series.

- Access to the Guardrails console with administrative privileges.

## Step 1: Open the Controls by State report

Navigate to the **Controls by State** report, expand the **Type** dropdown, 
and search for `gcp storage bucket access control`. 

<p><img alt="filter 1" src="/images/docs/guardrails/getting-started/getting-started-gcp/review-project-wide/filter-1.png"/></p>

## Step 2: Set the Type filter

Enable the checkbox next to **GCP > Storage > Bucket > Access Control** to filter by **Type**.

<p><img alt="filter 2" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/filter-2.png"/></p>

## Step 3: Set the State filter

You can also filter by **State**. Expand that dropdown, and enable the checkbox next to **Alarm**.

<p><img alt="filter 3" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/filter-3.png"/></p>


## Step 4: Choose a bucket

Pick a control, here `guardrails_example_bucket_01`, and select its linked name.

<p><img alt="choose-bucket" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/choose-bucket.png"/></p>


## Step 5: View resource details

Because we were viewing the **Controls by State** report, our action landed us on the **Control Details** page. We can switch to the **Resource Detail** view by using the blue **Resource** link next to the sub-tab bar.

<p><img alt="open-bucket-control" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/open-bucket-control.png"/></p>

## Step 6: Open the new policy dialog

Now that you are are viewing the **Resource Detail** for the selected bucket, you can create an exception for this resource. To do that you will create a new policy setting. Select the **Policies** sub-tab and click the green **New Policy Setting** button.

<p><img alt="switch-to-policies" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/policies-sub-tab.png"/></p>


## Step 7: Select the policy type

In the **Search policy types...** input box, type `gcp storage bucket access control`, and enable the checkbox next to **GCP > Storage > Bucket > Access Control**.

<p><img alt="find policy setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/select-policy-type.png"/></p>

## Step 8: Create the policy exception

Choose the **Skip** setting, and select **Create**.

<p><img alt="create-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/create-policy-setting.png"/></p>

## Step 9: Confirm the setting

This bucket is now exempt from the requirement to enable uniform access.

<p><img alt="confirm setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/confirm-setting.png"/></p>

  
## Step 10: View in context

Select the **Hierarchy** tab. The project-level policy specifies **Check: Uniform**. You’ve overridden that with an exception that exempts this particular bucket from that policy.  

<p><img alt="view-hierarchy" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/view-hierarchy.png"/></p>

## Step 11: Review bucket activity

Select the **Activity** tab and observe the history. When you created the bucket-level policy setting to make an exception for this bucket, the control reevaluated and set the status to `Skipped`.  

<p><img alt="review-activity" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/review-activity.png"/></p>

## Step 12: Review

In this guide you created a resource-level exception for the control that governs bucket access control.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/create-calculated-exception) we’ll see how to dynamically calculate an exception based on a resource tag.

## Progress tracker
- [x] Prepare a GCP Project for Import to Guardrails
- [x] Connect a GCP Project to Guardrails
- [x] Observe GCP Activity
- [x] Review Project-Wide Governance
- [x] Enable Your First Guardrails Policy Pack
- [x] **Create a Static Exception to a Guardrails Policy**
- [ ] Create a Calculated Exception to a Guardrails GCP Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
