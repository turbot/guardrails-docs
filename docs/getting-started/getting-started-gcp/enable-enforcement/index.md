---
title: Enable Automatic Enforcement
sidebar_label: Enable Automatic Enforcement
---

  


# Enable Automatic Enforcement

In this guide we’ll show how you can enable Guardrails to act autonomously. For large cloud footprints, it is often desirable to have Guardrails take automated actions based on your organization's compliance and security posture. Guardrails' controls can take a number of different automated enforcement actions, including deleting resources, changing the configuration of a resource, and tagging a resource.

This is the last guide in the *Getting started with GCP series*.

**Prerequisites**:

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privileges.

> [!NOTE]
> In the [previous guide](/guardrails/docs/getting-started/getting-started-gcp/apply-quick-action) we showed how to add the single permission that enables you to take a **Quick Action** on GCP bucket access control. This guide also requires that permission.



## Step 1: Open the Policy Pack

In the guide titled [Enable your First Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack) you enabled `Enforce Uniform Access Is Enabled for GCP Storage Buckets`. Select **Policies** from the top-level navigation bar, then choose that Policy Pack from the list.

<p><img alt="locate-policy-pack" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/locate-policy-pack.png"/></p>

## Step 2: Edit the policy setting

Select the pencil icon next to the calculated policy you created [earlier](/guardrails/docs/getting-started/getting-started-gcp/create-calculated-exception).

<p><img alt="view-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/view-policy-setting.png"/></p>

## Step 3: Disable calculated mode

  
Select **Disable calculated mode** to return to standard policy mode.

<p><img alt="edit-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/edit-policy-setting.png"/></p>  


## Step 4: Enable enforcement

Choose **Enforce: Uniform** and select **Update**.

<p><img alt="gcp-update-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/choose-setting.png"/></p>

## Step 5: Observe Guardrails in action

Use your bookmark to navigate back to **Controls by State** report, and use the **Type** filter to choose **GCP > Storage > Bucket > Access Control**. In a few minutes all of your buckets in this account are now either `OK` or `Skipped`.

Try setting access control on a bucket back to fine-grained. It won’t stay that way for long!

<p><img alt="enforcement-happened" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/all-ok-or-skipped.png"/></p>

## Step 6: Review

In this guide series you learned the basics of importing GCP accounts into Guardrails, enabling Policy Packs, creating exceptions and notifications, and even more mischief.

## Next Steps

This Getting Started series just scratches the surface of what you can do with Guardrails. Try installing more [policy packs](https://hub.guardrails.com) into your workspace, and run through this series again to explore the breadth and variety of what Guardrails can do. 

## Progress tracker

**Congratulations! You did it!**

- [x] Prepare a GCP project for import to Guardrails
- [x] Connect a GCP project to Guardrails
- [x] Observe GCP Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] Review Project-Wide Bucket Access Control
- [x] Create a Static Exception to a Guardrails GCP Policy
- [x] Create a Calculated Exception to a Guardrails GCP Policy
- [x] Send an Alert to Email
- [x] Apply a Quick Action
- [x] **Enable Automatic Enforcement**
