---
title: Enable Automatic Enforcement
sidebar_label: Enable Automatic Enforcement
---


# Enable Automatic Enforcement

In this guide we’ll show how you can enable Guardrails to act autonomously. For large cloud footprints, it is often desirable to have Guardrails take automated actions based on your organization's compliance and security posture. Guardrails' controls can take a number of different automated enforcement actions, including deleting resources, changing the configuration of a resource, and tagging a resource.

This is the last guide in the *Getting started with AWS series*.

**Prerequisites**:

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privileges.

> [!NOTE]
> In the [previous guide](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action) we showed how to add the single permission that enables you to take a **Quick Action** on S3 bucket versioning. This guide also requires that permission.

## Step 1: Open the Policy Pack

In the guide titled [Enable your First Policy Pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack) you enabled `Enforce Versioning is Enabled for AWS S3 Buckets`. Select **Policies** from the top-level navigation bar, then choose that policy pack from the list.

<p><img alt="locate-policy-pack" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/locate-policy-pack.png"/></p>

## Step 2: Edit the policy setting

Select the pencil icon next to the calculated policy you created [earlier](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception).

<p><img alt="view-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/view-policy-setting.png"/></p>

## Step 3: Disable calculated mode

Select **Disable calculated mode** to return to standard policy mode. 

<p><img alt="edit-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/edit-policy-setting.png"/></p>

## Step 4: Enable enforcement

Choose **Enforce: Enabled** from the list of policy options and then select **Update**.

<p><img alt="aws-update-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-update-policy-setting.png"/></p>

## Step 5: Observe Guardrails in action

Use your bookmark to navigate back to **Controls by State** report, and use the **Type** filter to choose **AWS > S3 > Bucket > Versioning**. In a few minutes all of your buckets in this account are now either `OK` or `Skipped` (except the one you created an exception for in the [Create a static exception](/guardrails/docs/getting-started/getting-started-aws/create-static-exception) guide). 

Try suspending versioning on a bucket. It won’t stay that way for long!

<p><img alt="enforcement-happened" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/enforcement-happened.png"/></p>

## Step 6: Review

In this guide series you learned the basics of importing AWS accounts into Guardrails, enabling policy packs, creating exceptions and notifications, and even more mischief.

## Next Steps

This Getting Started series just scratches the surface of what you can do with Guardrails. Try installing more [policy packs](https://hub.guardrails.com) into your workspace, and run through this series again to explore the breadth and variety of what Guardrails can do. 

## Progress tracker
- [x] Prepare an AWS Account for Import to Guardrails
- [x] Connect an AWS Account to Guardrails
- [x] Observe AWS Resource Activity
- [x] Review Account-Wide Governance
- [x] Enable Your First Policy Pack
- [x] Create a Static Exception to a Guardrails Policy
- [x] Create a Calculated Exception to a Guardrails Policy
- [x] Send an Alert to Email
- [x] Apply a Quick Action
- [x] **Enable Automatic Enforcement**
