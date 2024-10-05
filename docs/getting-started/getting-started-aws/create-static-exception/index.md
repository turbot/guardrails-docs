---
title: Create a Static Exception to a Guardrails Policy
Sidebar_label: Create a Static Exception to a Guardrails Policy
---


# Create a Static Exception to a Guardrails AWS Policy

**Prerequisites**:   
  
- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)
- [Enable Your First Policy Pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack/)
- [Review Account-Wide Bucket Versioning](/guardrails/docs/getting-started/getting-started-aws/review-account-wide/)


You’ve seen how to enable a policy pack to check versioning for all buckets. Now let’s explore how to create exceptions to that policy.  In this guide we’ll create an exception for a single bucket.

## Step 1: Locate a bucket control in Alarm for versioning

You bookmarked the `Controls by State` report in [Connect an Account](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity), go there now.

Set the `Resource Type` filter to `AWS > S3 > Bucket > Versioning `, and the `State` to `Alarm`.
<p><img alt="aws_find_bucket_in_alarm" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/aws-find-bucket-in-alarm.png"/></p>

## Step 2: Switch to the bucket resource
<p><img alt="switch-to-bucket-resource" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/switch-to-bucket-resource.png"/></p>  
  
Click the bucket name in the breadcrumb trail.  


## Step 3: Switch to the `Policies` tab

Select the `Policies` tab and search for `versioning`.  
<p><img alt="switch-to-bucket-resource" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/switch-to-bucket-resource.png"/></p>

Click into the bucket resource, switch to the `Policies` tab, and search for `s3 bucket versioning`.

Note that the bucket inherits `Check: Enabled` from the policy pack you attached to the account.  


## Step 4: Create the policy setting

Now click `New Policy Setting`.
<p><img alt="aws_create_new_policy_setting" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/aws-create-new-policy-setting.png"/></p>

Search for and select the Policy Type `AWS > S3 > Bucket > Versioning`.

  
Choose `Skip` then click `Create`. Guardrails takes you to the Policy Setting page.

Select the `Hierarchy` tab to review the new situation.
<p><img alt="aws_hierarchy_with_bucket_exception" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/aws-hierarchy-with-bucket-exception.png"/></p>  
  


The default for bucket versioning was `Skip`, the policy you created in the previous guide changed it to `Check: Enabled`, and now this particular bucket overrides that setting back to `Skip`. 

## Step 5: View Guardrails activity for the bucket

Use the top-level search to find the bucket.

Click into the bucket, then select the `Activity` tab.
<p><img alt="aws_review_bucket_activity" src="/images/docs/guardrails/getting-started/getting-started-aws/create-static-exception/aws-review-bucket-activity.png"/></p>

## Step 4: Review

Here you can see the history.

- You created the bucket-level policy setting to make an exception for your test bucket.  
  
- Then the Versioning control reevaluated, and set the status to `Skipped` to match the policy exception of `Skip`.

  
In the [next guide](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception) we’ll see how to dynamically calculate an exception based on a resource tag.  


## Next Steps

In the next guide we’ll see how you can make exceptions dynamically, by evaluating properties of resources.


## Progress tracker

- [x] [Connect an AWS Account to Guardrails](path)
- [x] [Observe AWS Resource Activity](path)
- [x] [Enable Your First Policy Pack](path)
- [x] [Review Account-Wide Bucket Versioning](path)
- [x] **Create a Static Exception to a Guardrails Policy**
- [ ] [Create a Calculated Exception to a Guardrails Policy](path)
- [ ] [Send an Alert to Email](path)
- [ ] [Apply a Quick Action](path)
- [ ] [Enable Automatic Enforcement](path)
