---
title: Review Account-Wide Bucket Versioning
sidebar_label: Review Account-Wide Bucket Versioning
---


# Review Account-Wide Bucket Versioning

In this guide you’ll see how the policy pack you enabled in [Enable a Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-aws/review-across-account) governs all the S3 buckets in your account.

## Prerequisites

- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)
- [Enable Your First Policy Pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack/)


## Step 1: Review bucket versioning across your account

You bookmarked the `Controls by State` report in [Connect an Account](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity), go there now.

Set the `Resource Type` filter to `AWS > S3 > Bucket`, and search for `versioning`.  
<p><img alt="aws-account-wide-1" src="/images/docs/guardrails/getting-started/getting-started-aws/review-account-wide/aws-account-wide-1.png"/></p>  
  
In the [previous guide](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack), you saw how the policy pack you enabled there switched the status of your sample bucket’s versioning control from `Skipped` to `OK`. Here we can see that other buckets are in `Alarm`.   
  
Step 2: Set versioning for another bucket

Now enable versioning on another bucket, and review again.  
<p><img alt="aws-account-wide-2" src="/images/docs/guardrails/getting-started/getting-started-aws/review-account-wide/aws-account-wide-2.png"/></p>  
  
Now that bucket’s versioning control has also switched from `Alarm` to `OK`.

## Step 3: Review

To further explore the policy pack you’ve enabled, create a new bucket, observe that it shows up here in `Alarm`  for versioning, then enable versioning and observe that it transitions to `OK`.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/create-static-exception) we’ll learn how to create an exception so that a bucket can be exempt from the versioning requirement.  
  



## Progress tracker

- [x] [Connect an AWS Account to Guardrails](path)
- [x] [Observe AWS Resource Activity](path)
- [x] [Enable Your First Policy Pack](path)
- [x] **Review Account-Wide Bucket Versioning**
- [ ] [Create a Static Exception to a Guardrails Policy](path)
- [ ] [Create a Calculated Exception to a Guardrails Policy](path)
- [ ] [Send an Alert to Email](path)
- [ ] [Apply a Quick Action](path)
- [ ] [Enable Automatic Enforcement](path)
