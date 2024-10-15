---
title: Enable Automatic Enforcement
sidebar_label: Enable Automatic Enforcement
---

  


# Enable Automatic Enforcement

**Prerequisites**:  
  
- [Connect a GCP Project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack/)
- [Review Account-Wide Bucket Access Control](/guardrails/docs/getting-started/getting-started-gcp/review-account-wide/)
- [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/getting-started/getting-started-gcp/create-static-exception/)
- [Create a Calculated Exception to a Guardrails GCP Policy](/guardrails/docs/getting-started/getting-started-gcp/create-calculated-exception/)
- [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-gcp/send-alert-to-email/)
- [Apply a Quick Action](/guardrails/docs/getting-started/getting-started-gcp/apply-quick-action/)


In the [previous guide](/guardrails/docs/getting-started/getting-started-gcp/apply-quick-action) we showed how to add the single permission that enables you to take a `Quick Action` on bucket access control. That’s needed here as well, as we explore how to empower Guardrails to take such actions autonomously.

## Step 1: Locate the Policy Pack

In  [Enable your First Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack) we enabled `Enforce Uniform Access is Enabled for GCP Storage Buckets`.

Locate it on the `Policies` page.

<p><img alt="locate-policy-pack" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/locate-policy-pack.png"/></p>

Click the link.

## Step 2: View the policy setting

Open the Policy Pack to view the current setting.

<p><img alt="view-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/view-policy-setting.png"/></p>

It’s the calculated policy you created [earlier](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack).

Click the pencil icon to edit, and click the `Disable calculated mode` to return to basic mode.

<p><img alt="gcp-update-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/gcp-update-policy-setting.png"/></p>

Choose `Enforce: Enabled` and click `Update`.

## Step 3: Observe enforcement

Revisit `Controls by State` and set the filter to `GCP > Storage > Bucket > Access Control`.  

<p><img alt="enforcement-happened" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/enforcement-happened.png"/></p>

All your buckets are now green for access control.  


## Step 6: Review

Try switching a bucket back to fine-grained access control. It won’t stay that way for long!

## Next Steps

This Getting Started series just scratches the surface.  Try installing more [policy packs](https://hub.guardrails.com) into your workspace, and run through this series again to explore the breadth and variety of what Guardrails can do. 


## Progress tracker

- [x] Connect a GCP Project to Guardrails
- [x] Observe GCP Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] Review Account-Wide Bucket Access Control
- [x] Create a Static Exception to a Guardrails GCP Policy
- [x] Create a Calculated Exception to a Guardrails GCP Policy
- [x] Send an Alert to Email
- [x] Apply a Quick Action
- [x] **Enable Automatic Enforcement**
