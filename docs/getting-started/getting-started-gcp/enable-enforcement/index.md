---
title: Enable Automatic Enforcement
sidebar_label: Enable Automatic Enforcement
---

  


# Enable Automatic Enforcement

**Prerequisites**:  
  
- [Prepare a GCP project for import to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/prepare-project/)
- [Connect a GCP project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-project/)
- [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack/)
- [Review Project-Wide Bucket Access Control](/guardrails/docs/getting-started/getting-started-gcp/review-project-wide/)
- [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/getting-started/getting-started-gcp/create-static-exception/)
- [Create a Calculated Exception to a Guardrails GCP Policy](/guardrails/docs/getting-started/getting-started-gcp/create-calculated-exception/)
- [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-gcp/send-alert-to-email/)
- [Apply a Quick Action](/guardrails/docs/getting-started/getting-started-gcp/apply-quick-action/)


In the [previous guide](/guardrails/docs/getting-started/getting-started-gcp/apply-quick-action) we showed how to add the single permission that enables you to take a **Quick Action** on bucket access control. That’s needed here as well, as we explore how to empower Guardrails to take such actions autonomously.

In  [Enable your First Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack) we enabled `Enforce Versioning is Enabled for AWS S3 Buckets`. Locate it on the `Policies` page, and select the link.

## Step 1: Locate the Policy Pack

In  [Enable your First Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack) we enabled `Enforce Uniform Access Is Enabled for GCP Storage Buckets`. Locate it in **Policies** and select the link.
<p><img alt="locate-policy-pack" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/locate-policy-pack.png"/></p>  
  
Click the link.

## Step 2: View the policy setting

View the current setting. It’s the calculated policy you created [earlier](/guardrails/docs/getting-started/getting-started-gcp/create-calculated-exception).
<p><img alt="view-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/view-policy-setting.png"/></p>  
  
Step 3: Edit the policy setting

  
Select the pencil icon to edit the setting, and select **Disable calculated mode** to return to basic mode.
<p><img alt="edit-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/edit-policy-setting.png"/></p>  


## Step 4: Enable enforcement

Choose **Enforce: Uniform** and select **Update**.
<p><img alt="gcp-update-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/gcp-update-policy-setting.png"/></p>

## Step 5: Observe enforcement

Revisit **Controls by State** and use the **Type**  filter to choose **GCP > Storage > Bucket > Access Control**. All your buckets are now green, except the one you exempted in [Create a static exception](/guardrails/docs/getting-started/getting-started-gcp/create-static-exception).   
<p><img alt="enforcement-happened" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/enforcement-happened.png"/></p>  


## Step 6: Review

Try switching a bucket back to fine-grained access control. It won’t stay that way for long!

## Next Steps

This Getting Started series just scratches the surface.  Try installing more [policy packs](https://hub.guardrails.com) into your workspace, and run through this series again to explore the breadth and variety of what Guardrails can do. 


## Progress tracker

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
