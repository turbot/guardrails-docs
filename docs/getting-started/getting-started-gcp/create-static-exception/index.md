---
title: Create a Static Exception to a Guardrails GCP Policy
sidebar_label: Create a Static Exception to a Guardrails GCP Policy
---


# Create a Static Exception to a Guardrails GCP Policy

You’ve seen how to enable a policy pack to access control for all buckets. Now let’s explore how to create exceptions to that policy.  In this guide we’ll create an exception for a single bucket.

**Prerequisites**:   
  
- [Connect a GCP Project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack/)
- [Review Account-Wide Bucket Access Control](/guardrails/docs/getting-started/getting-started-gcp/review-account-wide/)


Now that we have set our GCP bucket access control policy, we can track which GCP buckets do not have uniform access enabled. In this runbook we will show how to create an exception for your test bucket, so Guardrails will ignore its bucket access control status.

## Step 1: Locate a bucket in Alarm for access control

You bookmarked the `Controls by State` report in [Connect a Project](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project), go there now.

Set the `Type` filter to `GCP > Storage  > Bucket > Access Control `, and the `State` to `Alarm`.  

<p><img alt="find-bucket-in-alarm" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/find-bucket-in-alarm.png"/></p>

## Step 2: Open the control

Click into the bucket control.

<p><img alt="open-bucket-control" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/open-bucket-control.png"/></p>

## Step 3: Switch to the resource policies

Click the bucket’s name in the breadcrumb trail and switch to the `Policies` tab.

<p><img alt="switch-to-policies-tab" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/switch-to-policies-tab.png"/></p>

Click `New Policy Setting`.

## Step 4: Create the policy exception

<p><img alt="create-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/create-policy-setting.png"/></p>

Under `Policy Type` search for `GCP  > Storage > Bucket > Access Control`.

Choose the `Skip` setting.

Click `Create`.  


## Step 5: View the hierarchy

Switch to the Hierarchy tab.  

<p><img alt="view-hierarchy-tab" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/view-hierarchy-tab.png"/></p>

The project-level policy specifies `Check: Uniform`. You’ve overridden that with an exception that exempts this particular bucket from that policy.  


## Step 6: Review bucket activity

Now switch to the `Activity` tab.

<p><img alt="review_bucket_activity" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-static-exception/review-bucket-activity.png"/></p>

## Step 7: Review

Observe the history.

You created the bucket-level policy setting to make an exception for your test bucket.  
  
Then the control for Access Control reevaluated, and set the status to `Skipped`

## Next Steps

  
In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/create-calculated-exception) we’ll see how to dynamically calculate an exception based on a resource label.

  



## Progress tracker

- [x] Connect a GCP Project to Guardrails
- [x] Observe GCP Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] Review Account-Wide Bucket Access Control
- [x] **Create a Static Exception to a Guardrails GCP Policy**
- [ ] Create a Calculated Exception to a Guardrails GCP Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
