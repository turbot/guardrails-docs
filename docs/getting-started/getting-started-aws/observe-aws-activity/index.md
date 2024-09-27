---
title: Observe Resource Activity
sidebar_label: Observe Activity
---


# Observe AWS resource activity

Now that you’ve connected an AWS account, you can explore your resource inventory.  To visualize activity, go to `Reports`,  find `Resource activities`, then click that link. 

**Prerequisites**:

- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)

The following steps will show how to observe AWS resource activity in real-time.

## Step 1: Create an S3 bucket

We’ll use the name `bucket-example-01`, choose your own name.
<p><img alt="aws_start_2_create_bucket_name" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-start-2-create-bucket-name.png"/></p><br/>


Accept the defaults, including this one for bucket versioning which will be the focus of this series of runbooks.
<p><img alt="aws_start_2_create_bucket_versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-start-2-create-bucket-versioning.png"/></p><br/>

## Step 2: See Guardrails discover the new bucket


Select top-level `Reports`, search in the page for `Resource Activities`, and click the link.
<p><img alt="aws_start_2_search_resource_activities" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-start-2-search-resource-activities.png"/></p><br/>

In the `Resource Activities` report, open the `Resource Type` filter, search for `aws bucket`, and select `AWS > S3 > Bucket`.

Guardrails reports two notifications related to the bucket creation. `RESOURCE CREATED` indicates discovery of the bucket. `RESOURCE UPDATED` indicates that Guardrails has updated the CMDB entry with additional details about the bucket.
<p><img alt="aws_start_2_resource_activities_initial_notifications" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-start-2-resource-activities-initial-notifications.png"/></p><br/>

## Step 3: See Guardrails react to a bucket change

 
Now visit your bucket in the AWS console, choose the `Properties` tab, and enable versioning.
<p><img alt="aws_start_2_enable_versioning_to_observe_change" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-start-2-enable-versioning-to-observe-change.png"/></p><br/>

Revisit `Reports > Resource Activities`, and (if needed) reapply the `Resource Type` filter as `AWS > S3 > Bucket`.
<p><img alt="aws_start_2_resource_activities_with_change_detected" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-start-2-resource-activities-with-change-detected.png"/></p><br/>

Click into the new notification for your bucket, and scroll down in the diff to see the change that Guardrails has recorded.
<p><img alt="aws_start_2_diff_the_first_change" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-start-2-diff-the-first-change.png"/></p><br/>

We’ve now seen how Guardrails detects the creation of a new resource in a connected account, and also notices and records changes to the configuration of that resource.

Next we’ll explore [how to set a policy](/guardrails/docs/getting-started/getting-started-aws/attach-a-policy) that requires buckets to enable versioning.


## Progress tracker

1. [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)

2. **Observe AWS Resource Activity**

3. [Attach a Guardrails Policy](/guardrails/docs/getting-started/getting-started-aws/attach-a-policy/)

4. [Create a Static Exception to a Guardrails AWS Policy](/guardrails/docs/getting-started/getting-started-aws/create-static-exception/)

5. [Create a Calculated Exception to a Guardrails AWS Policy](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception/)

6. [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-aws/send-alert-to-email/)

7. [Apply a Quick Action](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action/)

8. [Enable Automatic Enforcement](/guardrails/docs/getting-started/getting-started-aws/enable-enforcement/)
