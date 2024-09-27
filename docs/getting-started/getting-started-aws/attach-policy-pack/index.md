---
title: Attach a Policy Pack
sidebar_label: Attach Policy Pack
---


# Attach a Guardrails Policy

Now that we can track resource configuration drift, we can create policies to alert when those configurations do not meet our desired state.

**Prerequisites**:

- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)

## Step 1: Review bucket properties

Check the properties of the bucket you created in [Observe AWS activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity). In that guide you switched bucket versioning from the default (`Suspended`) to `Enabled`.
<p><img alt="aws_start_3_review_bucket_versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/attach-a-policy/aws-start-3-review-bucket-versioning.png"/></p><br/>

## Step 2: Find and view the AWS > S3 > Bucket > Versioning control

Do a top-level search for the name of your bucket and `s3 bucket versioning`.
<p><img alt="aws_start_3_search_bucket_versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/attach-a-policy/aws-start-3-search-bucket-versioning.png"/></p><br/>

Guardrails reports that the bucket is  in the `skipped` state. By default, there is no attached policy to enforce bucket versioning. Let’s attach one.

## Step 3: Attach a policy

Your Guardrails workspace already has the pre-installed policy pack [Enforce Versioning Is Enabled for AWS S3 Buckets](https://hub.guardrails.turbot.com/policy-packs/aws_s3_enforce_versioning_is_enabled_for_buckets).

To attach it, click top-level `Resources`, navigate to your `Sandbox` folder, select the `Detail` tab, and click the `Manage` link next to `Policy Packs`.
<p><img alt="aws_start_3_find_policy_packs_manage" src="/images/docs/guardrails/getting-started/getting-started-aws/attach-a-policy/aws-start-3-find-policy-packs-manage.png"/></p><br/>

In the `Edit policy pack attachments` dialog, select `Enforce Versioning is Enabled for AWS S3 Buckets` and  click `Save`.
<p><img alt="aws_start_3_edit_attachments_select_enforce_versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/attach-a-policy/aws-start-3-edit-attachments-select-enforce-versioning.png"/></p><br/>



## Step 4: Observe a policy-driven alarm

Do a top-level search for the name of your bucket, switch to the `Controls` tab, and search for `bucket versioning`. The control, which was formerly in the `Skipped` state, is now `OK` because you have enabled versioning for it.
<p><img alt="aws_start_3_observe_bucket_ok" src="/images/docs/guardrails/getting-started/getting-started-aws/attach-a-policy/aws-start-3-observe-bucket-ok.png"/></p><br/>


Now, in the AWS console, set versioning for your bucket back to the AWS default, `Suspended`.
<p><img alt="aws_start_3_bucket_now_in_alarm" src="/images/docs/guardrails/getting-started/getting-started-aws/attach-a-policy/aws-start-3-bucket-now-in-alarm.png"/></p><br/>



With versioning disabled, the bucket no longer complies with the `Check: Enabled` policy setting so Guardrails puts the bucket into the `Alarm` state for that policy.

You can override policies at any level. In the [next guide](/guardrails/docs/getting-started/getting-started-aws/create-static-exception), we’ll create an exception that enables your test bucket to return to the `OK` state.


## Progress tracker

1. [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)

2. [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)

3. **Attach a Guardrails Policy**

4. [Create a Static Exception to a Guardrails AWS Policy](/guardrails/docs/getting-started/getting-started-aws/create-static-exception/)

5. [Create a Calculated Exception to a Guardrails AWS Policy](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception/)

6. [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-aws/send-alert-to-email/)

7. [Apply a Quick Action](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action/)

8. [Enable Automatic Enforcement](/guardrails/docs/getting-started/getting-started-aws/enable-enforcement/)
