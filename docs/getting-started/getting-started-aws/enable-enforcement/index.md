---
title: Enable Automatic Enforcement
sidebar_label: Enable Automatic Enforcement
---

  


# Enable Automatic Enforcement

**Prerequisites**:  
  
- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)
- [Attach a Guardrails Policy](/guardrails/docs/getting-started/getting-started-aws/attach-policy-pack/)
- [Create a Static Exception to a Guardrails AWS Policy](/guardrails/docs/getting-started/getting-started-aws/create-static-exception/)
- [Create a Calculated Exception to a Guardrails AWS Policy](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception/)
- [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-aws/send-alert-to-email/)
- [Apply a Quick Action](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action/)


In the [previous runbook](/guardrails/docs/runbooks/getting-started-aws/apply-quick-action) we showed how to add the single permission that enables you to take a `Quick Action` on S3 bucket versioning. That’s needed here as well, as we explore how to empower Guardrails to take such actions autonomously.

Step 1: Suspend versioning in AWS

In the AWS console, suspend versioning for your original test bucket, in our case `bucket-example-01`.   


## Step 2: Find the versioning policy for the bucket

Search for the bucket. In  [Create a static  exception](/guardrails/docs/runbooks/getting-started-aws/create-static-exception) we set its bucket versioning policy to `Skip`.
<p><img alt="aws_start_8_find_bucket_versioning_policy_setting" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-start-8-find-bucket-versioning-policy-setting.png"/></p>

## Step 3: Update the policy setting

Click into the Policy Setting, click `Edit`. Originally we had an exception to "Skip" the bucket from checking S3 bucket versioning.  Now we will automatically enforce versioning to be enabled.  Choose `Enforce: Enabled` and click `Update`.  
<p><img alt="aws_start_8_enable_enforcement" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-start-8-enable-enforcement.png"/></p>

On the Policy Setting page, switch to the `Activity` tab.  
<p><img alt="aws_start_8_enforcement_happened" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-start-8-enforcement-happened.png"/></p>

Here you can see the whole history. Reading from the bottom up:

- you updated the policy setting

- Guardrails reevaluated and found the bucket to be out-of-policy

- Guardrails autonomously did what you did with a `Quick Action` in the previous runbook: enable versioning  
  
- Guardrails noticed the bucket’s changed status

- Guardrails reevaluated and found that the bucket now complies with policy

For fun, try suspending versioning on the bucket again. It won’t stay that way for long!

This Getting Started series just scratches the surface.  Try installing more [policy packs](https://hub.guardrails.com) into your workspace, and run through this series again to explore the breadth and variety of what Guardrails can do. 


## Progress tracker
<div>
<div>✅ <a href="/guardrails/docs/getting-started/getting-started-aws/connect-an-account/">Connect an AWS Account to Guardrails</a></div>
<div>✅ <a href="/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/">Observe AWS Resource Activity</a></div>
<div>✅ <a href="/guardrails/docs/getting-started/getting-started-aws/attach-policy-pack/">Attach a Guardrails Policy</a></div>
<div>✅ <a href="/guardrails/docs/getting-started/getting-started-aws/create-static-exception/">Create a Static Exception to a Guardrails AWS Policy</a></div>
<div>✅ <a href="/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception/">Create a Calculated Exception to a Guardrails AWS Policy</a></div>
<div>✅ <a href="/guardrails/docs/getting-started/getting-started-aws/send-alert-to-email/">Send an Alert to Email</a></div>
<div>✅ <a href="/guardrails/docs/getting-started/getting-started-aws/apply-quick-action/">Apply a Quick Action</a></div>
<div>✅ <strong>Enable Automatic Enforcement</strong></div>
</div>
