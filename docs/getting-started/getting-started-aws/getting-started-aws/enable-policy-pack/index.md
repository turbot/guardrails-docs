---
title: Enable Your First Policy Pack
sidebar_label: Enable Policy Pack
---


# Enable Your First Policy Pack

In this guide, you will learn how to create policies to alert when resource configurations do not meet desired states. 

This is the third guide in the *Getting started with AWS* series.

## Prerequisites

- Completion of the first two guides.


## Step 1: Check bucket versioning in AWS

Check the properties of the bucket you created in [Observe AWS activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity). In that guide you enabled versioning. Verify that’s still the case.

<p><img alt="aws-search-bucket-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/bucket-versioning-enabled.png"/></p>

## Step 2: Find the filter for bucket versioning

You bookmarked the **Controls by State** report in [Connect an Account](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity), go there now. Open the **Type** dropdown and search for `aws s3 bucket versioning`. Enable the checkbox to **AWS > S3 > Bucket > Versioning**. 

<p><img alt="search-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/search-type-filter.png"/></p>

## Step 3: Find your bucket

Search for your bucket.  It is in the `Skipped` state. There is not yet a Guardrails policy to check bucket versioning. 

<p><img alt="aws-search-bucket-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/search-filtered-versioning-controls.png"/></p>

## Step 4: Navigate to your account

Your Guardrails workspace already has the pre-installed policy pack [Enforce Versioning Is Enabled for AWS S3 Buckets](https://hub.guardrails.turbot.com/policy-packs/aws_s3_enforce_versioning_is_enabled_for_buckets).

Select **Resources** in the top navigation bar, navigate to **Turbot > Sandbox > YOUR_AWS_ACCOUNT**, and select the **Detail** tab.

## Step 5: Select MANAGE

Select the **Manage Link** next to **Policy Packs**.

<p><img alt="aws-locate-policy-pack-manage" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-locate-policy-pack-manage.png"/></p>

## Step 6: Attach the policy pack to your account

In the **Edit policy pack attachments** dialog box, select **Add** and choose `Enforce Versioning is Enabled for AWS S3 Buckets`. Then select **Save**.

<p><img alt="aws-edit-attachments-select-enforce-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-edit-attachments-select-enforce-versioning.png"/></p>

## Step 7: Observe policy effect

Repeat steps 2 and 3 to configure the **Controls by State** report to show only AWS S3 bucket versioning controls. Now, instead of skipping the versioning check, Guardrails runs it. Your bucket is green because you enabled versioning in [Observe AWS Activity](/guardrails/docs/getting-started/observe-aws-activity), so it’s now in policy.

<p><img alt="aws-search-bucket-versioning-again" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-search-bucket-versioning-again.png"/></p>

## Step 8: Review

In this guide you’ve enabled a policy pack to check S3 bucket versioning, and observed how the policy enforced the policy on a non-compliant bucket.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/review-across-account) we’ll see how that policy pack affects all the buckets in your account.

 



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
