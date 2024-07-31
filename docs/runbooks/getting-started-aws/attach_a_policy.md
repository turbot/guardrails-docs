---
title: "Attach a Guardrails policy"
template: Documentation
nav:
  title: "Attach a policy"
---


# Attach a Guardrails policy

**Prerequisites**: 

- [Connect an AWS account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect_an_account)
- [Observe AWS resource activity](/guardrails/docs/runbooks/getting-started-aws/observe_aws_activity)


Now that we can track resource configuration drift, we can create policies to alert when those configurations do not meet our desired configuration. 

## Step 1: Review bucket properties

Check the properties of the bucket you created in [Observe AWS activity](/guardrails/docs/integrations/aws/getting-started-aws/observe_aws_activity). In that runbook you switched bucket versioning from the default (`Suspended`) to `Enabled`.
<p><img alt="aws_start_3_review_bucket_versioning" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_3_review_bucket_versioning.png"/></p><br/>

## Step 2:  Find and view the `AWS > S3 > Bucket > Versioning` policy type and controls

Do a top-level search for `aws s3 bucket versioning`.
<p><img alt="aws_start_3_search_bucket_versioning" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_3_search_bucket_versioning.png"/></p><br/>

The `controls` section reports that all buckets are in the `skipped` state. By default, there is no policy to enforce bucket versioning. Let’s make one. Click into the `AWS > S3 > Bucket > Versioning` policy type.  
<p><img alt="aws_start_3_view_bucket_versioning_no_policy" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_3_view_bucket_versioning_no_policy.png"/></p><br/>

There’s a policy type, `AWS > S3 > Bucket > Versioning`, but as yet there are no policy settings. The default value for the setting is `Skip`.

## Step 3: Attach a policy

Your Guardrails workspace already has the pre-installed policy pack [Enforce Versioning Is Enabled for AWS S3 Buckets](https://hub.guardrails.turbot.com/policy-packs/aws_s3_enforce_versioning_is_enabled_for_buckets).

To attach it, click top-level `Resources`, navigate to your `Sandbox` folder, select the `Detail` tab, and click the `Manage` link next to `Policy Packs`.  
<p><img alt="aws_start_3_find_policy_packs_manage" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_3_find_policy_packs_manage.png"/></p><br/>

In the `Edit policy pack attachments` dialog, select `Enforce Versioning is Enabled for AWS S3 Buckets` and  click `Save`.
<p><img alt="aws_start_3_edit_attachments_select_enforce_versioning" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_3_edit_attachments_select_enforce_versioning.png"/></p><br/>  
  


  
Guardrails returns you to the `Detail` tab of the `Sandbox` page. Click the `Policies` tab, click `Descendant`, and search for `s3 bucket versioning`.  
<p><img alt="aws_start_3_sandbox_policies_descendant" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_3_sandbox_policies_descendant.png"/></p><br/>

Click `AWS > S3 > Bucket > Versioning`. 

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdu_qFbeynk8c1JyeW8feoY2Df8JLyvGyGqvSc50cU37q5nhYow-o141Jr-m-AnLzRYqGQHVTHNoeF3uu8nsklW5HvKP054sBj-cpAM6a6JoiDN5rwYj-HdAO43XjMkbT5yNUhND2mf4xctFZcyiN1Fhkvc?key=67Q6ui6I83LD0pKPBaaJUA)

This is the policy type for S3 bucket versioning. The default is `Skip`.  
  
There is one policy setting. Click `1 setting` or `Switch to settings tab` to view it.
<p><img alt="aws_start_3_view_policy_setting" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_3_view_policy_setting.png"/></p><br/>

Here you can see the result of the policy pack you just attached: the setting for S3 bucket versioning now overrides the default and has become `Check: Enabled`. 

## Step 4: Observe a policy-driven alarm

Do a top-level search for the name of your bucket, switch to the `Controls` tab, and search for `bucket versioning`. The control, which was formerly in the `Skipped` state, is now `OK` because you have enabled versioning for it.
<p><img alt="aws_start_3_observe_bucket_ok" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_3_observe_bucket_ok.png"/></p><br/>  


Now, in the AWS console, set versioning for your bucket back to the AWS default, `Suspended`.
<p><img alt="aws_start_3_bucket_now_in_alarm" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_3_bucket_now_in_alarm.png"/></p><br/>  
  


With versioning disabled, the bucket no longer complies with the `Check: Enabled` policy setting so Guardrails puts the bucket into the `Alarm` state for that policy.  
  
You can override policies at any level. In the [next runbook](/guardrails/docs/runbooks/getting-started-aws/create_static_exception), we’ll create an exception that enables your test bucket to return to the `OK` state. 


## You are here

1. [Connect an AWS account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect_an_account)

2. [Observe AWS resource activity](/guardrails/docs/runbooks/getting-started-aws/observe_aws_activity)

3. **Attach a Guardrails policy**

4. [Create a static exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create_static_exception)

5. [Create a calculated exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create_calculated_exception)

6. [Send an alert to email](/guardrails/docs/runbooks/getting-started-aws/send_alert_to_email)

7. [Apply a Quick Action](/guardrails/docs/runbooks/getting-started-aws/apply_quick_action)

8. [Enable automatic enforcement](/guardrails/docs/runbooks/getting-started-aws/enable_enforcement)
