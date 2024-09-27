---
title: Enable Automatic Enforcement
sidebar_label: Enable Enforcement
---

# Enable Automatic Enforcement

**Prerequisites**:

- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)
- [Attach a Guardrails Policy](/guardrails/docs/getting-started/getting-started-aws/attach-a-policy/)
- [Create a Static Exception to a Guardrails AWS Policy](/guardrails/docs/getting-started/getting-started-aws/create-static-exception/)
- [Create a Calculated Exception to a Guardrails AWS Policy](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception/)
- [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-aws/send-alert-to-email/)
- [Apply a Quick Action](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action/)


In the [previous runbook](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action) we showed how to add the single permission that enables you to take a `Quick Action` on S3 bucket versioning. That’s needed here as well, as we explore how to empower Guardrails to take such actions autonomously.

Step 1: Suspend versioning in AWS

In the AWS console, suspend versioning for your test bucket.
<p><img alt="aws_start_8_suspend_versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-start-8-suspend-versioning.png"/></p><br/>

The notification flow we saw in the [previous runbook](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action) now shows that Guardrails has noticed the change, and put the bucket into `Alarm`.
<p><img alt="aws_start_8_bucket_in_alarm" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-start-8-bucket-in-alarm.png"/></p><br/>




## Step 2: Find the versioning policy for the bucket

Search for your original test bucket (ours was `bucket-example-01` whose bucket versioning policy we set to `Skip` in  [Create a static  exception](/guardrails/docs/getting-started/getting-started-aws/create-static-exception)
<p><img alt="aws_start_8_find_bucket_versioning_policy_setting" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-start-8-find-bucket-versioning-policy-setting.png"/></p><br/>

## Step 3: Update the policy setting

Click into the Policy Setting, click `Edit`, and

Edit the policy, originally we had an exception to "Skip" the bucket from checking S3 bucket versioning.  Now we will automatically enforce versioning to be enabled.  Choose `Enforce: Enabled` and click `Update`.
<p><img alt="aws_start_8_enable_enforcement" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-start-8-enable-enforcement.png"/></p><br/>

On the Policy Setting page, switch to the `Activity` tab.
<p><img alt="aws_start_8_enforcement_happened" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-enforcement/aws-start-8-enforcement-happened.png"/></p><br/>

Here you can see the whole history. Reading from the bottom up:

- you updated the policy setting

- Guardrails reevaluated and found the bucket to be out-of-policy

- Guardrails autonomously did what you did with a `Quick Action` in the previous runbook: enable versioning

- Guardrails noticed the bucket’s changed status

- Guardrails reevaluated and found that the bucket now complies with policy

For fun, try suspending versioning on the bucket again. It won’t stay that way for long!

This Getting Started series just scratches the surface.  Try installing more [policy packs](https://hub.guardrails.com) into your workspace, and run through this series again to explore the breadth and variety of what Guardrails can do.


## Progress tracker

1. [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)

2. [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)

3. [Attach a Guardrails Policy](/guardrails/docs/getting-started/getting-started-aws/attach-a-policy/)

4. [Create a Static Exception to a Guardrails AWS Policy](/guardrails/docs/getting-started/getting-started-aws/create-static-exception/)

5. [Create a Calculated Exception to a Guardrails AWS Policy](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception/)

6. [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-aws/send-alert-to-email/)

7. [Apply a Quick Action](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action/)

8. **Enable Automatic Enforcement**