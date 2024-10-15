---
title: Review Account-Wide Bucket Versioning
sidebar_label: Review Account-Wide Bucket Versioning
---


# Review Account-Wide Bucket Versioning

In this guide you’ll see how the policy pack you enabled in [Enable a Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack) governs all the S3 buckets in your account.

## Prerequisites

- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)
- [Enable Your First Policy Pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack/)


## Step 1: Open Controls by State and limit to S3 bucket versioning

In **Controls by State**, use the **Resource Type** filter to choose **AWS > S3 > Bucket > Versioning**.  
  
In the [previous guide](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack), you saw how the policy pack you enabled there switched the status of your sample bucket’s Versioning control from `Skipped` to `OK`, because you turned on versioning in [Observe AWS Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity). Other buckets created in the default state, with versioning disabled, are red: out of policy.  

<p><img alt="aws-account-wide-1" src="/images/docs/guardrails/getting-started/getting-started-aws/review-account-wide/aws-account-wide-1.png"/></p>

## Step 2: Review

To further explore the policy pack you’ve enabled, create a new bucket, observe that it shows up here in `Alarm`  for versioning, then enable versioning and observe that it transitions to `OK`.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/create-static-exception) we’ll learn how to create an exception so that a bucket can be exempt from the versioning requirement.  
  



## Progress tracker

- [x] Connect an AWS Account to Guardrails
- [x] Observe AWS Resource Activity
- [x] Enable Your First Policy Pack
- [x] **Review Account-Wide Bucket Versioning**
- [ ] Create a Static Exception to a Guardrails Policy
- [ ] Create a Calculated Exception to a Guardrails Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
