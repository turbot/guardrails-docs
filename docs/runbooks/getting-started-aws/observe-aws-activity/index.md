---
title: Observe AWS resource activity
sidebar_label: Observe AWS resource activity
---


# Observe AWS resource activity

**Prerequisites**: 

- [Connect an AWS account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect-an-account/)


 

Now that you’ve connected an AWS account, you can explore your resource inventory.  Go to the `Reports` tab (chart icon),  search in the page for  `Resource Inventory` and click that link . To visualize activity, go to `Reports`,  find `Resource activities`, click that link. 

The following steps will show how to observe AWS resource activity in real-time.

## Create an S3 bucket

We’ll use the name `bucket-example-01`, choose your own name.  
<p><img alt="aws_start_2_create_bucket_name" src="/images/docs/guardrails/runbooks/getting-started-aws/observe-aws-activity/aws-start-2-create-bucket-name.png"/></p><br/>  


Accept the defaults, including this one for bucket versioning which will be the focus of this series of runbooks.
<p><img alt="aws_start_2_create_bucket_versioning" src="/images/docs/guardrails/runbooks/getting-started-aws/observe-aws-activity/aws-start-2-create-bucket-versioning.png"/></p><br/>

## See Guardrails discover the new bucket

  
Select `Reports` and search in the page for `Resource Activities`.
<p><img alt="aws_start_2_search_resource_activities" src="/images/docs/guardrails/runbooks/getting-started-aws/observe-aws-activity/aws-start-2-search-resource-activities.png"/></p><br/>

In the `Resource Activities` report, open the `Resource Type` filter, search for bucket, and select `AWS > S3 > Bucket`.
<p><img alt="aws_start_2_filter_resource_activities_by_aws_s3_bucket" src="/images/docs/guardrails/runbooks/getting-started-aws/observe-aws-activity/aws-start-2-filter-resource-activities-by-aws-s3-bucket.png"/></p><br/>

Guardrails reports two notifications related to the bucket creation. `RESOURCE CREATED` indicates discovery of the bucket. `RESOURCE UPDATED` indicates that Guardrails has updated the CMDB entry with additional details about the bucket.
<p><img alt="aws_start_2_resource_activities_initial_notifications" src="/images/docs/guardrails/runbooks/getting-started-aws/observe-aws-activity/aws-start-2-resource-activities-initial-notifications.png"/></p><br/>

## See Guardrails react to a bucket change

   
Now visit your bucket in the AWS console, choose the `Properties` tab, and enable versioning.
<p><img alt="aws_start_2_enable_versioning_to_observe_change" src="/images/docs/guardrails/runbooks/getting-started-aws/observe-aws-activity/aws-start-2-enable-versioning-to-observe-change.png"/></p><br/>

Revisit `Reports > Resource Activities`, and (if needed) reapply the `Resource Type` filter as `AWS > S3 > Bucket`.  
<p><img alt="aws_start_2_resource_activities_with_change_detected" src="/images/docs/guardrails/runbooks/getting-started-aws/observe-aws-activity/aws-start-2-resource-activities-with-change-detected.png"/></p><br/>

Click into the new notification for your bucket, and scroll down in the diff to see the change that Guardrails has recorded.  
<p><img alt="aws_start_2_diff_the_first_change" src="/images/docs/guardrails/runbooks/getting-started-aws/observe-aws-activity/aws-start-2-diff-the-first-change.png"/></p><br/>

We’ve now seen how Guardrails detects the creation of a new resource in a connected account, and also notices and records changes to the configuration of that resource.  
  
Next we’ll explore [how to set a policy](/guardrails/docs/runbooks/getting-started-aws/attach-a-policy) that requires buckets to enable versioning.


## Progress tracker

1. [Connect an AWS account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect-an-account/)

2. **Observe AWS resource activity**

3. [Attach a Guardrails policy](/guardrails/docs/runbooks/getting-started-aws/attach-a-policy/)

4. [Create a static exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create-static-exception/)

5. [Create a calculated exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create-calculated-exception/)

6. [Send an alert to email](/guardrails/docs/runbooks/getting-started-aws/send-alert-to-email/)

7. [Apply a Quick Action](/guardrails/docs/runbooks/getting-started-aws/apply-quick-action/)

8. [Enable automatic enforcement](/guardrails/docs/runbooks/getting-started-aws/enable-enforcement/)
