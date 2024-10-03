---
title: Enable your First Policy Pack
sidebar_label: Enable Policy Pack
---


# Enable your first Guardrails Policy Pack

Now that we can track resource configuration drift, we can create policies to alert when those configurations do not meet our desired state. 

## Prerequisites

- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)


## Step 1: Review bucket properties

Check the properties of the bucket you created in [Observe AWS activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity). In that runbook you switched bucket versioning to `Enabled`.

## Step 2: Review S3 Bucket Controls for Versioning

  
You bookmarked the `Controls by State` report in [Connect an Account](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity), go there now.

Set the `Resource Type` filter to `AWS > S3 > Bucket`, and search for `versioning`.
<p><img alt="aws_search_bucket_versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-search-bucket-versioning.png"/></p>

Your  bucket is in the `skipped` state, as are others created with the S3 bucket default for versioning. There is not yet a Guardrails policy to check bucket versioning. Leave this view in a tab. Now open a new tab where we’ll enable a policy pack.

## Step 3: Prepare to add a policy pack

Your Guardrails workspace already has the pre-installed policy pack [Enforce Versioning Is Enabled for AWS S3 Buckets](https://hub.guardrails.turbot.com/policy-packs/aws_s3_enforce_versioning_is_enabled_for_buckets).

To attach it, click top-level `Resources`, navigate to your `Sandbox > YOUR_AWS_ACCOUNT`, select the `Detail` tab, and locate the `Manage Link` next to `Policy Packs`.
<p><img alt="aws_locate_policy_pack_manage" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-locate-policy-pack-manage.png"/></p>

## Step 4: Attach the policy pack to your account

In the `Edit policy pack attachments` dialog, select `Enforce Versioning is Enabled for AWS S3 Buckets` and  click `Save`.
<p><img alt="aws-edit-attachments-select-enforce-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-edit-attachments-select-enforce-versioning.png"/></p>  
  


## Step 5: Observe policy-driven alarms

Revisit the `Controls by State` report, ideally still in the tab used for Step 2. If not, repeat the instructions in Step 2.
<p><img alt="aws_observe_policy_effect" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-observe-policy-effect.png"/></p>  
  
Now Guardrails checks that bucket versioning is enabled. Your bucket is green because you enabled versioning in [Observe AWS Activity](/guardrails/docs/getting-started/observe-aws-activity), and it’s now in policy. Others are red: out of policy.  
  
Step 6: Put your test bucket into alarm  


Now, in the AWS console, set versioning for your bucket to`Suspended`.
<p><img alt="aws-all-buckets-in-alarm" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/aws-all-buckets-in-alarm.png"/></p>  
  


With versioning disabled, the bucket no longer complies with the `Check: Enabled` policy setting so Guardrails puts the bucket into the `Alarm` state for that policy.  
  
You can override policies at any level. In the [next runbook](/guardrails/docs/getting-started/getting-started-aws/create-static-exception), we’ll create an exception that enables your test bucket to return to the `OK` state. 


## Progress tracker
<div>
<div>✅ <a href="/guardrails/docs/getting-started/getting-started-aws/connect-an-account/">Connect an AWS Account to Guardrails</a></div>
<div>✅ <a href="/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/">Observe AWS Resource Activity</a></div>
<div>✅ <strong>Enable your First Policy Pack</strong></div>
</div>
