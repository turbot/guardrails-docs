---
title: Observe AWS Resource Activity
sidebar_label: Observe AWS Resource Activity
---


# Observe AWS resource activity

Now that you’ve connected an AWS account, you can explore your resource inventory.  To visualize activity, go to `Reports`,  find `Resource activities`, then click that link. 

**Prerequisites**: 

- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)


The following steps will show how to observe AWS resource activity in real-time.

## Step 1: Create an S3 bucket

We’ll use the name `bucket-example-01`, choose your own name.  


## Step 2: See Guardrails discover the new bucket

  
Select top-level `Reports`, search in the page for `Resource Activities`, and click the link.
<p><img alt="aws_search_resource_activities" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-search-resource-activities.png"/></p>

In the `Resource Activities` report, search for the name of your bucket.

Guardrails reports two notifications related to the bucket creation. `RESOURCE CREATED` indicates discovery of the bucket. `RESOURCE UPDATED` indicates that Guardrails has updated the CMDB entry with additional details about the bucket.
<p><img alt="aws_resource_activities_initial_notifications" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-resource-activities-initial-notifications.png"/></p>

## Step 3: See Guardrails react to a bucket change

   
Now visit your bucket in the AWS console, choose the `Properties` tab, and enable versioning.

Guardrails will soon notice the change. 
<p><img alt="aws_resource_activities_with_change_detected" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-resource-activities-with-change-detected.png"/></p>

Click into the new notification for your bucket, and scroll down in the diff to see the change that Guardrails has recorded.  
<p><img alt="aws_diff_the_first_change" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-diff-the-first-change.png"/></p>

We’ve now seen how Guardrails detects the creation of a new resource in a connected account, and also notices and records changes to the configuration of that resource.  
  
Next we’ll explore [how to set a policy](/guardrails/docs/getting-started/getting-started-aws/attach-policy-pack) that requires buckets to enable versioning.

I kind of went back and forth on this. In my original clean environment (Joe's) it was possible to view the ledger, when I moved to @bob's demo environment that became problematic, but in the new acme environment it might be appropriate?

How do set expectations for the length of the wait (which varies for AWS/Azure/GCP)?


## Progress tracker
<div>
<div>✅ <a href="/guardrails/docs/getting-started/getting-started-aws/connect-an-account/">Connect an AWS Account to Guardrails</a></div>
<div>✅ <strong>Observe AWS Resource Activity</strong></div>
<div>☐ <a href="/guardrails/docs/getting-started/getting-started-aws/attach-policy-pack/">Attach a Guardrails Policy</a></div>
<div>☐ <a href="/guardrails/docs/getting-started/getting-started-aws/create-static-exception/">Create a Static Exception to a Guardrails AWS Policy</a></div>
<div>☐ <a href="/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception/">Create a Calculated Exception to a Guardrails AWS Policy</a></div>
<div>☐ <a href="/guardrails/docs/getting-started/getting-started-aws/send-alert-to-email/">Send an Alert to Email</a></div>
<div>☐ <a href="/guardrails/docs/getting-started/getting-started-aws/apply-quick-action/">Apply a Quick Action</a></div>
<div>☐ <a href="/guardrails/docs/getting-started/getting-started-aws/enable-enforcement/">Enable Automatic Enforcement</a></div>
</div>
