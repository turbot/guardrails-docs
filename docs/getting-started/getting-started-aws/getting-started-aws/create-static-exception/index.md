---
title: Create a Static Exception to a Guardrails Policy
Sidebar_label: Create a Policy Exception
---


# Create a Static Exception to a Guardrails AWS Policy

In this guide you’ll see a how policy pack governs resource across an account.

This is the fifth guide in the *Getting started with AWS* series.
 
**Prerequisites**: 
 
- Completion of the first four guides.


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

## Step 4: Select a bucket control in Alarm

Pick a control, here `bucket-example-03`, and click its linked name.

<p><img alt="open-bucket-control" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/select-bucket-link.png"/></p>

## Step 5: Select the bucket Resource

Select the bucket's **Resource** link.

<p><img alt="open-bucket-control" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/open-bucket-control.png"/></p>

## Step 6: Select the Policies subtab

Select **Policies**, and select **New Policy Setting**.

<p><img alt="switch-to-policies" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/switch-to-policies-tab.png"/></p>

## Step 7: Find the policy setting

In the **Search policy types...** input box, type `aws s3 bucket versioning`, and enable the checkbox next to **AWS > S3 > Bucket > Versioning**.

<p><img alt="find policy setting" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/find-policy-setting.png"/></p>

## Step 8: Configure the policy setting

Choose the **Skip** setting, and select **Create**.

<p><img alt="create-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/create-policy-setting.png"/></p>

## Step 9: View the policy setting

This bucket is now exempt from the requirement to enable versioning. Select the **Hierarchy** tab.

<p><img alt="create-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/view-policy-setting.png"/></p>


## Step 10: View the hierarchy

Select the **Hierarchy** tab. The account-level policy specifies **Check: Enabled**. You’ve overridden that with an exception that exempts this particular bucket from that policy. 

<p><img alt="view-hierarchy-tab" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/view-hierarchy-tab.png"/></p>

## Step 11: Review bucket activity

Select the **Activity** tab and observe the history. When you created the bucket-level policy setting to make an exception for this bucket, the control reevaluated and set the status to `Skipped`. 

<p><img alt="view-hierarchy-tab" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/view-bucket-activity.png"/></p>

## Step 12: Review

In this guide you seen how to exempt a specific resource from an account-wide policy.


## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception) we’ll see how to dynamically calculate an exception based on a resource tag.


## Progress tracker

- [x] Connect an AWS Account to Guardrails
- [x] Observe AWS Resource Activity
- [x] Enable Your First Policy Pack
- [x] Review Account-Wide Bucket Versioning
- [x] **Create a Static Exception to a Guardrails Policy**
- [ ] Create a Calculated Exception to a Guardrails Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement