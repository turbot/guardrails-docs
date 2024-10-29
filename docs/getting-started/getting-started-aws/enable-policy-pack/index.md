---
title: Enable Your First Policy Pack
sidebar_label: Enable Policy Pack
---


# Enable Your First Policy Pack

In this guide, you will learn how to attach a Guardrails [Policy Pack](https://turbot.com/guardrails/docs/guides/configuring-guardrails/policy-packs) to enable governance controls.

This is the fourth guide in the *Getting started with AWS* series.

## Prerequisites

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privileges.
- Access to AWS console with the ability to create and modify S3 buckets.

## Step 1: Check bucket versioning in AWS

Check the properties of the bucket you created in the previous guide ([Observe AWS activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity)). Verify that versioning is still enabled on the test bucket you created.

<p><img alt="aws-search-bucket-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/bucket-versioning-enabled.png"/></p>

## Step 2: Filter controls

You bookmarked the **Controls by State** report in the [Connect an Account](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity) guide, go there now. From the filter bar open the **Type** dropdown and search for `aws s3 bucket versioning`. Select the checkbox next to **AWS > S3 > Bucket > Versioning**. 

<p><img alt="search-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/search-type-filter.png"/></p>

## Step 3: Find your bucket

Search for your bucket by typing its name into the search field. It should be in the `Skipped` state, because Guardrails has not been configured to check bucket versioning.

<p><img alt="aws-search-bucket-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/search-filtered-versioning-controls.png"/></p>

Update your bookmark with this new filtered view.

## Step 4: Navigate to your account

Control-click on the **Guardrails** logo on the top of the page to open a new homepage browser tab.

<p><img alt="aws-locate-policy-pack-manage" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/navigate-1.png"/></p>

Click on the **Accounts** sub-tab from the homepage and then select the AWS account you are using for testing from the list.

<p><img alt="aws-locate-policy-pack-manage" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/navigate-2.png"/></p>

On the account resource page, select the **Detail** sub-tab.

<p><img alt="aws-locate-policy-pack-manage" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/navigate-3.png"/></p>


## Step 5: Locate the Policy Pack manager

Select the **Manage Link** next to **Policy Packs** UI widget.

<p><img alt="aws-locate-policy-pack-manage" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-locate-policy-pack-manage.png"/></p>

## Step 6: Attach the Policy Pack to your account

In the **Edit policy pack attachments** dialog box, select **Add**.

<p><img alt="aws-edit-attachments-select-enforce-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/enforce-versioning-1.png"/></p>

Your Guardrails workspace should have the Policy Pack [Enforce Versioning Is Enabled for AWS S3 Buckets](https://hub.guardrails.turbot.com/policy-packs/aws_s3_enforce_versioning_is_enabled_for_buckets) pre-installed.

In the dropdown, select the Policy Pack named `Enforce Versioning is Enabled for AWS S3 Buckets`. Then select **Save**.

<p><img alt="aws-edit-attachments-select-enforce-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/enforce-versioning-2.png"/></p>

## Step 7: Observe policy effect

Return to your open browser tab (or bookmark) for the **Controls by State** report. Observe that the control state for your test bucket changes from `Skip` to `Ok`. It is in `Ok` state because the policy pack you added has enabled the control to test for that condition.

<p><img alt="aws-search-bucket-versioning-again" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-search-bucket-versioning-again.png"/></p>

## Step 8: Review

In this guide you’ve attached a Policy Pack to your AWS account to check S3 bucket versioning, and observed how the policy affects the Versioning control for your S3 bucket.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/review-account-wide) you will create some additional buckets to see how the Policy Pack responds to new resource creation.


## Progress tracker

- [x] Prepare an AWS Account for import to Guardrails
- [x] Connect an AWS Account to Guardrails
- [x] Observe AWS Resource Activity
- [x] **Enable Your First Policy Pack**
- [ ] Review Account-Wide Bucket Versioning
- [ ] Create a Static Exception to a Guardrails Policy
- [ ] Create a Calculated Exception to a Guardrails Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
