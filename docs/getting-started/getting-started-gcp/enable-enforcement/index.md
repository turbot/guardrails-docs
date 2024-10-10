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

## Step 1: Revisit your static exception

In  [Create a static  exception](/guardrails/docs/getting-started/getting-started-gcp/create-static-exception) we set the bucket access control policy for a bucket to `Skip`.  
  
Use the `Controls by State` control to find it.

<p><img alt="find-bucket-skipped-by-static-exception" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/find-bucket-skipped-by-static-exception.png"/></p>

## Step 3: View the policy setting

Click the `Setting` link (wrench icon).

<p><img alt="view-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-enforcement/view-policy-setting.png"/></p>

Choose `Enforce: Enabled` and click `Update`.

## Step 5: Observe enforcement

On the Policy Setting page, switch to the `Activity` tab.  


[image: enforcement-happened]

  
(unable to reproduce at the moment)

Here you can see the whole history. Reading from the bottom up:

- you updated the policy setting

- Guardrails reevaluated and found the bucket to be out-of-policy

- Guardrails autonomously did what you did with a `Quick Action` in the previous guide: enable versioning  
  
- Guardrails noticed the bucket’s changed status

- Guardrails reevaluated and found that the bucket now complies with policy  
  


## Step 6: Review

For fun, try switching access back to Fine-Grained again. It won’t stay that way for long!

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
