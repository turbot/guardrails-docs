---
title: Create a Static Exception to a Guardrails AWS Policy
sidebar_label: Create a static exception to a Guardrails AWS policy
---


# Create a Static Exception to a Guardrails AWS Policy

**Prerequisites**:   
  
- [Connect an AWS Account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/runbooks/getting-started-aws/observe-aws-activity/)
- [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-aws/attach-a-policy/)


Now that we have set our AWS S3 bucket versioning policy, we can track which S3 buckets do not have versioning enabled. In this runbook we will show how to create an exception for your test bucket, so Guardrails will ignore its bucket versioning status.

## Step 1: Find your test bucket

Do a top-level search for the bucket, and click into the resource.
<p><img alt="aws_start_4_find_the_bucket" src="/images/docs/guardrails/runbooks/getting-started-aws/create-static-exception/aws-start-4-find-the-bucket.png"/></p><br/>

## Step 2: Create a policy exception

On the bucket page, switch to the `Policies` tab and search for `s3 bucket versioning`.
<p><img alt="aws_start_4_ready_to_create_new_policy_setting" src="/images/docs/guardrails/runbooks/getting-started-aws/create-static-exception/aws-start-4-ready-to-create-new-policy-setting.png"/></p><br/>

Note that the bucket inherits `Check: Enabled` from the policy pack attached to the `Sandbox` folder.  
  
Now click `New Policy Setting`.
<p><img alt="aws_start_4_create_new_policy_setting" src="/images/docs/guardrails/runbooks/getting-started-aws/create-static-exception/aws-start-4-create-new-policy-setting.png"/></p><br/>

Search for and select the Policy Type `AWS > S3 > Bucket > Versioning`.

  
Choose `Skip` then click `Create`. Guardrails takes you to the Policy Setting page.

Select the `Hierarchy` tab to review the new situation.
<p><img alt="aws_start_4_hierarchy_with_bucket_exception" src="/images/docs/guardrails/runbooks/getting-started-aws/create-static-exception/aws-start-4-hierarchy-with-bucket-exception.png"/></p><br/>  
  


The default for bucket versioning was `Skip`, the policy you created in the previous runbook changed it to `Check: Uniform`, and now this particular bucket overrides that setting back to `Skip`. Note that every other bucket in the Sandbox folder still has an effective policy setting of `Check: Uniform`.  


## Step 3: Review Guardrails activity for the bucket

Use the top-level search (as above) to find your test bucket.

Click into the bucket, then select the `Activity` tab.
<p><img alt="aws_start_4_review_bucket_activity" src="/images/docs/guardrails/runbooks/getting-started-aws/create-static-exception/aws-start-4-review-bucket-activity.png"/></p><br/>

Here you can see the whole history, reading from the bottom up.

 - When you attached the policy that requires bucket versioning, the bucket went into `Alarm`.  The alarm state represents the difference between what the policy asserts and the actual state of the bucket.  
  
- Then you created the bucket-level policy setting to make an exception for your test bucket.  
  
- Then the Versioning control reevaluated, and set the status to `Skipped` to match the policy exception of `Skip`.

  
In the [next runbook](/guardrails/docs/runbooks/getting-started-aws/create-calculated-exception) we’ll see how to dynamically calculate an exception based on a resource tag.


## Progress tracker

1. [Connect an AWS Account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect-an-account/)

2. [Observe AWS Resource Activity](/guardrails/docs/runbooks/getting-started-aws/observe-aws-activity/)

3. [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-aws/attach-a-policy/)

4. **Create a Static Exception to a Guardrails AWS Policy**

5. [Create a Calculated Exception to a Guardrails AWS Policy](/guardrails/docs/runbooks/getting-started-aws/create-calculated-exception/)

6. [Send an Alert to Email](/guardrails/docs/runbooks/getting-started-aws/send-alert-to-email/)

7. [Apply a Quick Action](/guardrails/docs/runbooks/getting-started-aws/apply-quick-action/)

8. [Enable Automatic Enforcement](/guardrails/docs/runbooks/getting-started-aws/enable-enforcement/)
