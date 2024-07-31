---
title: "Observe AWS resource activity"
template: Documentation
nav:
  title: "Observe AWS resource activity"
---


# Observe AWS resource activity

**Prerequisites**: 

- [Connect an AWS account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect_an_account)


 

Now that you’ve connected an AWS account, you can explore your resource inventory.  Go to the `Reports` tab (chart icon),  search in the page for  `Resource Inventory` and click that link . To visualize activity, go to `Reports`,  find `Resource activities`, click that link. 

The following steps will show how to observe AWS resource activity in real-time.

## Step 1: Create an S3 bucket

We’ll use the name `bucket-example-01`, choose your own name.  
<p><img alt="aws_start_2_create_bucket_name" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_2_create_bucket_name.png"/></p><br/>  


Accept the defaults, including this one for bucket versioning which will be the focus of this series of runbooks.
<p><img alt="aws_start_2_create_bucket_versioning" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_2_create_bucket_versioning.png"/></p><br/>

## Step 2: See Guardrails discover the new bucket

  
Select `Reports` and search in the page for `Resource Activities`.
<p><img alt="aws_start_2_search_resource_activities" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_2_search_resource_activities.png"/></p><br/>

In the `Resource Activities` report, open the `Resource Type` filter, search for bucket, and select `AWS > S3 > Bucket`.
<p><img alt="aws_start_2_filter_resource_activities_by_aws_s3_bucket" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_2_filter_resource_activities_by_aws_s3_bucket.png"/></p><br/>

Guardrails reports two notifications related to the bucket creation. `RESOURCE CREATED` indicates discovery of the bucket. `RESOURCE UPDATED` indicates that Guardrails has updated the CMDB entry with additional details about the bucket.
<p><img alt="aws_start_2_resource_activities_initial_notifications" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_2_resource_activities_initial_notifications.png"/></p><br/>

## Step 3: See Guardrails react to a bucket change

   
Now visit your bucket in the AWS console, choose the `Properties` tab, and enable versioning.
<p><img alt="aws_start_2_enable_versioning_to_observe_change" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_2_enable_versioning_to_observe_change.png"/></p><br/>

Revisit `Reports > Resource Activities`, and (if needed) reapply the `Resource Type` filter as `AWS > S3 > Bucket`.  
<p><img alt="aws_start_2_resource_activities_with_change_detected" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_2_resource_activities_with_change_detected.png"/></p><br/>

Click into the new notification for your bucket, and scroll down in the diff to see the change that Guardrails has recorded.  
<p><img alt="aws_start_2_diff_the_first_change" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_2_diff_the_first_change.png"/></p><br/>

We’ve now seen how Guardrails detects the creation of a new resource in a connected account, and also notices and records changes to the configuration of that resource.  
  
Next we’ll explore [how to set a policy](/guardrails/docs/runbooks/getting-started-aws/attach_a_policy) that requires buckets to enable versioning.


## You are here

1. [Connect an AWS account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect_an_account)

2. **Observe AWS resource activity**

3. [Attach a Guardrails policy](/guardrails/docs/runbooks/getting-started-aws/attach_a_policy)

4. [Create a static exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create_static_exception)

5. [Create a calculated exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create_calculated_exception)

6. [Send an alert to email](/guardrails/docs/runbooks/getting-started-aws/send_alert_to_email)

7. [Apply a Quick Action](/guardrails/docs/runbooks/getting-started-aws/apply_quick_action)

8. [Enable automatic enforcement](/guardrails/docs/runbooks/getting-started-aws/enable_enforcement)
