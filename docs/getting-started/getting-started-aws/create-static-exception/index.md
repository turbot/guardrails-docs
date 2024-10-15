---
title: Create a Static Exception to a Guardrails Policy
Sidebar_label: Create a Static Exception to a Guardrails Policy
---


# Create a Static Exception to a Guardrails AWS Policy

  
You’ve seen how to enable a policy pack to check versioning for all buckets. Now let’s explore how to create exceptions to that policy.  In this guide we’ll create an exception for a single bucket.

**Prerequisites**:   
  
- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)
- [Enable Your First Policy Pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack/)
- [Review Account-Wide Bucket Versioning](/guardrails/docs/getting-started/getting-started-aws/review-account-wide/)


## Step 1: Locate a bucket control in Alarm for versioning

In **Controls by State**, use the **Type** filter to choose  **AWS > S3 > Bucket > Versioning**, and the **State** filter to choose **Alarm**. Your test bucket is now `OK` but other buckets created with default settings will be in `Alarm`, like `bucket-example-03` in our case. Select the bucket control.

<p><img alt="find_bucket_in_alarm" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/find-bucket-in-alarm.png"/></p>

## Step 2: View the bucket control

Guardrails reports details about the control. Select the bucket’s name in the breadcrumb trail.

<p><img alt="open-bucket-control" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/open-bucket-control.png"/></p>

## Step 3: View resource policies

Select the **Policies** tab, and select **New Policy Setting**.

<p><img alt="switch-to-policies-tab" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/switch-to-policies-tab.png"/></p>

## Step 4: Create the policy setting

Under **Policy Type** search for (or navigate to) **AWS > S3 > Bucket > Versioning**. Choose the **Skip** setting, and select **Create**.

<p><img alt="create-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/create-policy-setting.png"/></p>

## Step 5: View the hierarchy

Choose the **Hierarchy** tab. The account-level policy specifies **Check: Enabled**. You’ve overridden that with an exception that exempts this particular bucket from that policy.  

<p><img alt="view-hierarchy-tab" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/view-hierarchy-tab.png"/></p>

## Step 6: Review bucket activity

Select the **Activity** tab.

<p><img alt="review_bucket_activity" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/review-bucket-activity.png"/></p>

## Step 7: Review

Observe the history. You created the bucket-level policy setting to make an exception for your test bucket. Then the Versioning control reevaluated, and set the status to `Skipped`.  


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
