---
title: Enable Automatic Enforcement
sidebar_label: Enable Automatic Enforcement
---

  


# Enable Automatic Enforcement

**Prerequisites**:  
  
- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)
- [Enable Your First Policy Pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack/)
- [Review Account-Wide Bucket Versioning](/guardrails/docs/getting-started/getting-started-aws/review-account-wide/)
- [Create a Static Exception to a Guardrails Policy](/guardrails/docs/getting-started/getting-started-aws/create-static-exception/)
- [Create a Calculated Exception to a Guardrails Policy](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception/)
- [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-aws/send-alert-to-email/)
- [Apply a Quick Action](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action/)


In the [previous guide](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action) we showed how to add the single permission that enables you to take a `Quick Action` on S3 bucket versioning. That’s needed here as well, as we explore how to empower Guardrails to take such actions autonomously.

## Step 1: Revisit your static exception

In  [Create a static  exception](/guardrails/docs/getting-started/getting-started-aws/create-static-exception) we set its bucket versioning policy for a bucket to `Skip`.  
  
Use the `Controls by State` control to find it.
<p><img alt="aws-find-bucket-skipped-by-static-exception" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-find-bucket-skipped-by-static-exception.png"/></p>

## Step 2: View the policies for the control

Click into the Control and switch to the `Policies` tab.  
<p><img alt="aws-view-skipped-bucket-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-view-skipped-bucket-policy-setting.png"/></p>  
  


## Step 3: View the policy setting

Click the `Setting` link (wrench icon).
<p><img alt="aws-view-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-view-policy-setting.png"/></p>

## Step 4: Update the policy setting

Click `Edit`.
<p><img alt="aws-update-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-update-policy-setting.png"/></p>

## Step 5: Observe enforcement

On the Policy Setting page, switch to the `Activity` tab.  
<p><img alt="aws-enforcement-happened" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-enforcement-happened.png"/></p>

Here you can see the whole history. Reading from the bottom up:

- you updated the policy setting

- Guardrails reevaluated and found the bucket to be out-of-policy

- Guardrails autonomously did what you did with a `Quick Action` in the previous guide: enable versioning  
  
- Guardrails noticed the bucket’s changed status

- Guardrails reevaluated and found that the bucket now complies with policy  
  


## Step 6: Review

For fun, try suspending versioning on the bucket again. It won’t stay that way for long!

## Next Steps

This Getting Started series just scratches the surface.  Try installing more [policy packs](https://hub.guardrails.com) into your workspace, and run through this series again to explore the breadth and variety of what Guardrails can do. 


## Progress tracker

- [x] [Connect an AWS Account to Guardrails](path)
- [x] [Observe AWS Resource Activity](path)
- [x] [Enable Your First Policy Pack](path)
- [x] [Review Account-Wide Bucket Versioning](path)
- [x] [Create a Static Exception to a Guardrails Policy](path)
- [x] [Create a Calculated Exception to a Guardrails Policy](path)
- [x] [Send an Alert to Email](path)
- [x] [Apply a Quick Action](path)
- [x] **Enable Automatic Enforcement**
