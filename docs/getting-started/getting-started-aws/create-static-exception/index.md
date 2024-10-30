---
title: Create a Static Exception to a Guardrails Policy
Sidebar_label: Create a policy exception
---

# Create a Static Exception to a Guardrails AWS Policy

In this guide you’ll learn how to exempt a specific resource from an account-wide policy

This is the sixth guide in the *Getting started with AWS* series.
  
**Prerequisites**:   
  
- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privileges.

## Step 1: Open the Controls by State report

Navigate to the **Controls by State** report, expand the **Type** dropdown, 
and search for `aws s3 bucket versioning`. 

<p><img alt="search-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/search-type-filter.png"/></p>

## Step 2: Set the Type filter

Enable the checkbox next to **AWS > S3 > Bucket > Versioning** to filter by **Type**.

<p><img alt="find_bucket_in_alarm" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/type-filter-set.png"/></p>

## Step 3: Set the State filter

You can also filter by **State**. Expand that dropdown, and enable the checkbox next to **Alarm**.

<p><img alt="find_bucket_in_alarm" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/expand-state-filter.png"/></p>

## Step 4: Choose a bucket

Pick a control, here `bucket-example-03`, and click its linked name.

<p><img alt="open-bucket-control" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/select-bucket-link.png"/></p>

## Step 5: View resource details

Because we were viewing the **Controls by State** report, our action landed us on the **Control Details** page. We can switch to the **Resource Detail** view by using the blue **Resource** link next to the sub-tab bar.

<p><img alt="open-bucket-control" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/open-bucket-control.png"/></p>

## Step 6: Open the new policy dialog

Now you are are viewing the **Resource Detail** for the selected bucket, create an exception for this resource. To do that you will create a new policy setting. Select the **Policies** sub-tab and click the green **New Policy Setting** button.

<p><img alt="switch-to-policies" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/switch-to-policies-tab.png"/></p>

## Step 7: Select the policy type

In the **Search policy types...** input box, type `aws s3 bucket versioning`, and enable the checkbox next to **AWS > S3 > Bucket > Versioning**.

<p><img alt="find policy setting" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/find-policy-setting.png"/></p>

## Step 8: Create the policy exception

Choose the **Skip** setting, and select **Create**.

<p><img alt="create-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/create-policy-setting.png"/></p>

## Step 9: Confirm the setting

This bucket is now exempt from the requirement to enable versioning.

<p><img alt="create-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/view-policy-setting.png"/></p>


## Step 10: View in context

Select the **Hierarchy** tab. The account-level policy specifies **Check: Enabled**. You’ve overridden that with an exception that exempts this particular bucket from that policy.  

<p><img alt="view-hierarchy-tab" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/view-hierarchy-tab.png"/></p>

## Step 11: Review bucket activity

Select the **Activity** tab and observe the history. When you created the bucket-level policy setting to make an exception for this bucket, the control reevaluated and set the status to `Skipped`.  

<p><img alt="view-hierarchy-tab" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/view-bucket-activity.png"/></p>

## Step 12: Review

In this guide you created a resource-level exception for the Bucket Versioning control.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception) we’ll see how to dynamically calculate an exception based on a resource tag.

## Progress tracker
- [x] Prepare an AWS Account for Import to Guardrails
- [x] Connect an AWS Account to Guardrails
- [x] Observe AWS Resource Activity
- [x] Review Account-Wide Governance
- [x] Enable Your First Policy Pack
- [x] **Create a Static Exception to a Guardrails Policy**
- [ ] Create a Calculated Exception to a Guardrails Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
