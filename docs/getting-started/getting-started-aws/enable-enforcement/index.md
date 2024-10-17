---
title: Enable Automatic Enforcement
sidebar_label: Enable Automatic Enforcement
---


# Enable Automatic Enforcement

In this guide we’ll show how you can enable Guardrails to act autonomously.

This is the last guide in the *Getting started with AWS series*.


**Prerequisites**: 

- Completion of the first eight guides.

> [!NOTE]
> In the [previous guide](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action) we showed how to add the single permission that enables you to take a **Quick Action** on S3 bcket versioning. That’s needed here too.

## Step 1: Locate the Policy Pack

In  [Enable your First Policy Pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack) we enabled `Enforce Versioning is Enabled for AWS S3 Buckets`. Select **Policies** from the top-level navigation bar, then choose that policy pack from the list.

<p><img alt="locate-policy-pack" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/locate-policy-pack.png"/></p>

## Step 2: View the policy setting

View the current setting. It’s the calculated policy you created [earlier](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception).

Select the pencil icon to edit the setting.

<p><img alt="view-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/view-policy-setting.png"/></p>

## Step 3: Disable calculated mode

Select **Disable calculated mode** to return to basic mode. 

<p><img alt="edit-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/edit-policy-setting.png"/></p>

## Step 4: Enable enforcement

Choose **Enforce: Enabled** and select **Update**.

<p><img alt="aws-update-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-update-policy-setting.png"/></p>

## Step 5: Observe enforcement

Navigate back to **Controls by State** and use the **Type** filter to choose **AWS > S3 > Bucket > Versioning**. All your buckets are now green, except the one you exempted in [Create a static exception](/guardrails/docs/getting-started/getting-started-aws/create-static-exception). 

Try suspending versioning on a bucket. It won’t stay that way for long!

<p><img alt="enforcement-happened" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/enforcement-happened.png"/></p>

## Step 6: Review

In the guide we've seen how to enable Guardrails to automatically enforce policies. 

## Next Steps

This Getting Started series just scratches the surface. Try installing more [policy packs](https://hub.guardrails.com) into your workspace, and run through this series again to explore the breadth and variety of what Guardrails can do. 


## Progress tracker

- [x] Connect an AWS Account to Guardrails
- [x] Observe AWS Resource Activity
- [x] Enable Your First Policy Pack
- [x] Review Account-Wide Bucket Versioning
- [x] Create a Static Exception to a Guardrails Policy
- [x] Create a Calculated Exception to a Guardrails Policy
- [x] Send an Alert to Email
- [x] Apply a Quick Action
- [x] **Enable Automatic Enforcement**
