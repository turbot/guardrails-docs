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

## Step 1: Locate the Policy Pack

In  [Enable your First Policy Pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack) we enabled `Enforce Versioning is Enabled for AWS S3 Buckets`.

Locate it on the `Policies` page.

<p><img alt="locate-policy-pack" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/locate-policy-pack.png"/></p>

Click the link.  


## Step 2: View the policy setting.

Open the Policy Pack to view the current setting.

<p><img alt="view-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/view-policy-setting.png"/></p>

It’s the calculated policy you created [earlier](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack).

Click the pencil icon to edit, and click the `Disable calculated mode` to return to basic mode.

<p><img alt="aws-update-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-update-policy-setting.png"/></p>

## Step 3: Observe enforcement

Revisit `Controls by State` and set the filter to `AWS > S3 > Bucket > Versioning`.  

<p><img alt="enforcement-happened" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/enforcement-happened.png"/></p>

## Step 6: Review

Try suspending versioning on a bucket. It won’t stay that way for long!

## Next Steps

This Getting Started series just scratches the surface.  Try installing more [policy packs](https://hub.guardrails.com) into your workspace, and run through this series again to explore the breadth and variety of what Guardrails can do. 


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
