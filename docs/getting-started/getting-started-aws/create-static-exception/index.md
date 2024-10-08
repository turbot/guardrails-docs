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

You bookmarked the `Controls by State` report in [Connect an Account](/guardrails/docs/getting-started/getting-started-aws/connect-an-account), go there now.

Set the `Type` filter to `AWS > S3 > Bucket > Versioning `, and the `State` to `Alarm`.
<p><img alt="find_bucket_in_alarm" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/find-bucket-in-alarm.png"/></p>

## Step 2: Open the control

Click into the bucket control.
<p><img alt="open-bucket-control" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/open-bucket-control.png"/></p>

## Step 3: Switch to the resource policies

Click the bucket’s name in the breadcrumb trail and switch to the `Policies` tab.
<p><img alt="switch-to-policies-tab" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/switch-to-policies-tab.png"/></p>

Click `New Policy Setting`.

## Step 4: Create the policy setting
<p><img alt="create-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/create-policy-setting.png"/></p>

Under `Policy Type` search for `AWS > S3 > Bucket > Versioning.

Choose the `Skip` setting.

Click `Create`.  


## Step 5: View the hierarchy

Switch to the Hierarchy tab.  
<p><img alt="view-hierarchy-tab" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/view-hierarchy-tab.png"/></p>

The account-level policy specifies `Check: Enabled`. You’ve overridden that with an exception that exempts this particular bucket from that policy.

## Step 6: Review bucket activity

Now switch to the `Activity` tab.
<p><img alt="review_bucket_activity" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/review-bucket-activity.png"/></p>

## Step 7: Review

Observe the history.

- You created the bucket-level policy setting to make an exception for your test bucket.  
  
- Then the Versioning control reevaluated, and set the status to `Skipped`.

  
In the [next guide](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception) we’ll see how to dynamically calculate an exception based on a resource tag.  


## Next Steps

In the next guide we’ll see how you can make exceptions dynamically, by evaluating properties of resources.


## Progress tracker

- [x] [Connect an AWS Account to Guardrails](path)
- [x] [Observe AWS Resource Activity](path)
- [x] [Enable Your First Policy Pack](path)
- [x] [Review Account-Wide Bucket Versioning](path)
- [x] **Create a Static Exception to a Guardrails Policy**
- [ ] [Create a Calculated Exception to a Guardrails Policy](path)
- [ ] [Send an Alert to Email](path)
- [ ] [Apply a Quick Action](path)
- [ ] [Enable Automatic Enforcement](path)
