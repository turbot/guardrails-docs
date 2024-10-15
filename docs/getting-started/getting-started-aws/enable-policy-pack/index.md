---
title: Enable Your First Policy Pack
sidebar_label: Enable Policy Pack
---


# Enable Your First Policy Pack

Now that we can track resource configuration drift, we can create policies to alert when those configurations do not meet our desired state. 

## Prerequisites

- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)


## Step 1: Check bucket versioning in AWS

Check the properties of the bucket you created in [Observe AWS activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity). In that guide you enabled versioning. Verify that’s still the case.

## Step 2: Check the Guardrails versioning control for your bucket

  
You bookmarked the **Controls by State** report in [Connect an Account](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity), go there now.

Use the **Type** filter to choose **AWS > S3 > Bucket > Versioning** and search for your bucket.  It is in the `Skipped` state. There is not yet a Guardrails policy to check bucket versioning. 

<p><img alt="aws-search-bucket-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-search-bucket-versioning.png"/></p>

## Step 3: Prepare to add a policy pack

Your Guardrails workspace already has the pre-installed policy pack [Enforce Versioning Is Enabled for AWS S3 Buckets](https://hub.guardrails.turbot.com/policy-packs/aws_s3_enforce_versioning_is_enabled_for_buckets).

Select **Resources** in the top navigation bar. Navigate to **Turbot > Sandbox > YOUR_AWS_ACCOUNT**, select the **Detail** tab, and select the **Manage Link** next to **Policy Packs**.

<p><img alt="aws-locate-policy-pack-manage" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-locate-policy-pack-manage.png"/></p>

## Step 4: Attach the policy pack to your account

In  **Edit policy pack attachments**, choose `Enforce Versioning is Enabled for AWS S3 Buckets` and  select **Save**.

<p><img alt="aws-edit-attachments-select-enforce-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-edit-attachments-select-enforce-versioning.png"/></p>

## Step 5: Review

 In **Controls by State** use the **Type** filter to select **AWS > S3 > Bucket**, then search for your bucket. Now, instead of skipping the versioning check, Guardrails runs it. Your bucket is green because you enabled versioning in [Observe AWS Activity](/guardrails/docs/getting-started/observe-aws-activity), so it’s now in policy.

<p><img alt="aws-search-bucket-versioning-again" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-search-bucket-versioning-again.png"/></p>

## Next Steps

In this guide you’ve enabled a policy pack to check S3 bucket versioning. In the [next guide](/guardrails/docs/getting-started/getting-started-aws/review-across-account) we’ll see how that policy pack affects all the buckets in your account.

  



## Progress tracker

- [x] Connect an AWS Account to Guardrails
- [x] Observe AWS Resource Activity
- [x] **Enable Your First Policy Pack**
- [ ] Review Account-Wide Bucket Versioning
- [ ] Create a Static Exception to a Guardrails Policy
- [ ] Create a Calculated Exception to a Guardrails Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
