---
title: Create a static exception to a Guardrails AWS policy
sidebar_label: Create a static exception to a Guardrails AWS policy
---


# Create a static exception to a Guardrails AWS policy

**Prerequisites**:   
  
- [Connect an AWS account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect-an-account/)
- [Observe AWS resource activity](/guardrails/docs/runbooks/getting-started-aws/observe-aws-activity/)
- [Attach a Guardrails policy](/guardrails/docs/runbooks/getting-started-aws/attach-a-policy/)


Now we have our AWS S3 bucket versioning policy set, we can track which S3 buckets do not have versioning enabled. In this runbook we will show how to create an exception for your test bucket, so Guardrails will ignore its bucket versioning status.

## Find your test bucket

Do a top-level search for the bucket, and click into the resource.
<p><img alt="aws_start_4_find_the_bucket" src="/images/docs/guardrails/runbooks/getting-started-aws/create-static-exception/aws-start-4-find-the-bucket.png"/></p><br/>

## Create a policy setting

On the bucket page, switch to the `Policies` tab and search for `s3 bucket versioning`.
<p><img alt="aws_start_4_ready_to_create_new_policy_setting" src="/images/docs/guardrails/runbooks/getting-started-aws/create-static-exception/aws-start-4-ready-to-create-new-policy-setting.png"/></p><br/>

Note that the bucket inherits `Check: Enabled` from the `Sandbox`-level policy you set in the previous runbook.   
  
Now click `New Policy Setting`.
<p><img alt="aws_start_4_create_new_policy_setting" src="/images/docs/guardrails/runbooks/getting-started-aws/create-static-exception/aws-start-4-create-new-policy-setting.png"/></p><br/>

Search for and select the Policy Type `

  
Choose `Skip` and click `Create`. Guardrails sends you to the Policy Setting page.

Select the `Hierarchy` tab to review the new situation.
<p><img alt="aws_start_4_hierarchy_with_bucket_exception" src="/images/docs/guardrails/runbooks/getting-started-aws/create-static-exception/aws-start-4-hierarchy-with-bucket-exception.png"/></p><br/>  
  


The default for bucket versioning was `Skip`, the policy you created in the previous runbook changed it to `Check: Enabled`, and now the bucket overrides that setting back to `Skip`.  


## Review Guardrails activity for the bucket

Use the top-level search (as above) to find your test bucket.
<p><img alt="aws_start_4_find_bucket_to_review_activity" src="/images/docs/guardrails/runbooks/getting-started-aws/create-static-exception/aws-start-4-find-bucket-to-review-activity.png"/></p><br/>

Here you can see the whole history, reading from the bottom up.

 - When you then switched the versioning to `Disabled` the bucket went into `Alarm`.  
  
- Then you created the bucket-level policy setting.   
  
- Then Guardrails reevaluated, found the bucket in compliance with the new policy setting, and set the status to `Skipped`.

  
In the [next runbook](/guardrails/docs/runbooks/getting-started-aws/create-calculated-exception) we’ll see how to dynamically calculate an exception based on a resource tag.


## Progress tracker

1. [Connect an AWS account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect-an-account/)

2. [Observe AWS resource activity](/guardrails/docs/runbooks/getting-started-aws/observe-aws-activity/)

3. [Attach a Guardrails policy](/guardrails/docs/runbooks/getting-started-aws/attach-a-policy/)

4. **Create a static exception to a Guardrails AWS policy**

5. [Create a calculated exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create-calculated-exception/)

6. [Send an alert to email](/guardrails/docs/runbooks/getting-started-aws/send-alert-to-email/)

7. [Apply a Quick Action](/guardrails/docs/runbooks/getting-started-aws/apply-quick-action/)

8. [Enable automatic enforcement](/guardrails/docs/runbooks/getting-started-aws/enable-enforcement/)