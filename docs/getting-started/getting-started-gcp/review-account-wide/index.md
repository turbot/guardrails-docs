---
title: Review Account-Wide Bucket Access Control
sidebar_label: Review Account-Wide Bucket Access Control
---


# Review Account-Wide Bucket Access Control

In this guide you’ll see how the policy pack you enabled in [Enable a Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/review-across-account) governs all the GCP buckets in your account.

## Prerequisites

- [Connect a GCP Project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack/)


## Step 1: Review bucket versioning across your account

You bookmarked the `Controls by State` report in [Connect an Account](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity), go there now.

Set the `Resource Type` filter to `GCP > Storage > Bucket`, and search for `access control`.  
<p><img alt="gcp-account-wide-1" src="/images/docs/guardrails/getting-started/getting-started-gcp/review-account-wide/gcp-account-wide-1.png"/></p>  
  
In the [previous guide](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack), you saw how the policy pack you enabled there switched the status of your sample bucket’s versioning control from `Skipped` to `Alarm`,  because you switched to fine-grained access in [Observe AWS Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity)  
  
Here we can see that other buckets are green for access control because they have the default setting for uniform access.

  


## Step 3: Review

To further explore the policy pack you’ve enabled, create a new bucket, observe that it shows up here in `OK`  for uniform access, then switch to fine-grained access control and observe that it transitions to `Alarm`.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/create-static-exception) we’ll learn how to create an exception so that a bucket can be exempt from the access control requirement.  
  



## Progress tracker

- [x] [Connect a GCP Project to Guardrails](path)
- [x] [Observe GCP Activity](path)
- [x] [Enable Your First Guardrails Policy Pack](path)
- [x] **Review Account-Wide Bucket Access Control**
- [ ] [Create a Static Exception to a Guardrails GCP Policy](path)
- [ ] [Create a Calculated Exception to a Guardrails GCP Policy](path)
- [ ] [Send an Alert to Email](path)
- [ ] [Apply a Quick Action](path)
- [ ] [Enable Automatic Enforcement](path)