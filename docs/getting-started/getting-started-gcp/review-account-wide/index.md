---
title: Review Account-Wide Bucket Access Control
sidebar_label: Review Bucket Access Control
---


# Review Account-Wide Bucket Access Control

In this guide you’ll see how the policy pack you enabled in [Enable a Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/review-across-account) governs all the GCP buckets in your account.

## Prerequisites

- [Connect a GCP Project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack/)


## Step 1: Open Controls by State and limit to GCP bucket access control

In **Controls by State**, use the **Resource Type** filter to choose **AWS > Storage > Bucket > Access Control**.  
  
In the [previous guide](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack), you saw how the policy pack you enabled there switched the status of your sample bucket’s Access Control control from `Skipped` to `Alarm`,  because you switched to fine-grained access in [Observe AWS Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity).  
  
Other buckets created in the default state, with uniform access enabled, are green: in policy.

<p><img alt="gcp-account-wide-1" src="/images/docs/guardrails/getting-started/getting-started-gcp/review-account-wide/gcp-account-wide-1.png"/></p>

## Step 2: Review

To further explore the policy pack you’ve enabled, create a new bucket, observe that it shows up here in `OK`  for uniform access, then switch to fine-grained access control and observe that it transitions to `Alarm`.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/create-static-exception) we’ll learn how to create an exception so that a bucket can be exempt from the access control requirement.  
  



## Progress tracker

- [x] Connect a GCP Project to Guardrails
- [x] Observe GCP Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] **Review Account-Wide Bucket Access Control**
- [ ] Create a Static Exception to a Guardrails GCP Policy
- [ ] Create a Calculated Exception to a Guardrails GCP Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
