---
title: Enable Your First Policy Pack
sidebar_label: Enable Policy Pack
---


# Enable Your First Guardrails Policy Pack

Now that we can track resource configuration drift, we can create policies to alert when those configurations do not meet our desired state. 

## Prerequisites

- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)


## Step 1: Review bucket properties

Check the properties of the bucket you created in [Observe AWS activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity). In that runbook you switched bucket versioning to `Enabled`.

## Step 2: Review S3 Bucket Controls for Versioning

  
You bookmarked the `Controls by State` report in [Connect an Account](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity), go there now.

Set the `Resource Type` filter to `AWS > S3 > Bucket`, and search for `versioning`.
<p><img alt="aws_search_bucket_versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-search-bucket-versioning.png"/></p>

Your  bucket is in the `skipped` state, as are others created with the S3 bucket default for versioning. There is not yet a Guardrails policy to check bucket versioning. Leave this view in a tab. Now open a new tab where we’ll enable a policy pack.

## Step 3: Prepare to add a policy pack

Your Guardrails workspace already has the pre-installed policy pack [Enforce Versioning Is Enabled for AWS S3 Buckets](https://hub.guardrails.turbot.com/policy-packs/aws_s3_enforce_versioning_is_enabled_for_buckets).

To attach it, click top-level `Resources`, navigate to your `Sandbox > YOUR_AWS_ACCOUNT`, select the `Detail` tab, and locate the `Manage Link` next to `Policy Packs`.
<p><img alt="aws_locate_policy_pack_manage" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-locate-policy-pack-manage.png"/></p>

## Step 4: Attach the policy pack to your account

In the `Edit policy pack attachments` dialog, select `Enforce Versioning is Enabled for AWS S3 Buckets` and  click `Save`.
<p><img alt="aws-edit-attachments-select-enforce-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-edit-attachments-select-enforce-versioning.png"/></p>

## Step 5: Search for your bucket

Use the top-level search to find your bucket.
<p><img alt="aws-search-for-bucket" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-search-for-bucket.png"/></p>

## Step 6: Review

Click into the resource, switch to the `Controls` tab, and search for `versioning`.
<p><img alt="aws-observe-single-control" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-observe-single-control.png"/></p>

Now, instead of skipping the versioning check, Guardrails runs it. Your bucket is green because you enabled versioning in [Observe AWS Activity](/guardrails/docs/getting-started/observe-aws-activity), so  it’s now in policy.

## Next Steps

In this guide you’ve enabled a policy pack to check S3 bucket versioning. In the [next guide](/guardrails/docs/getting-started/getting-started-aws/review-across-account) we’ll see how that policy pack affects all the buckets in your account.

  



## Progress tracker

- [x] [Connect an AWS Account to Guardrails](path)
- [x] [Observe AWS Resource Activity](path)
- [x] **Enable Your First Policy Pack**
- [ ] [Review Account-Wide Bucket Versioning](path)
- [ ] [Create a Static Exception to a Guardrails Policy](path)
- [ ] [Create a Calculated Exception to a Guardrails Policy](path)
- [ ] [Send an Alert to Email](path)
- [ ] [Apply a Quick Action](path)
- [ ] [Enable Automatic Enforcement](path)
