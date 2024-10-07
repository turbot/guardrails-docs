---
title: Observe AWS Resource Activity
sidebar_label: Observe AWS Resource Activity
---


# Observe AWS Resource Activity

You’ve connected an AWS account, and seen Guardrails discover  your existing AWS resources. In this guide you’ll create a new S3 bucket that Guardrails will discover. You’ll then change a setting on the bucket, and see Guardrails notice that change.

## Prerequisites

- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
  
  
You will also need to create  an S3 bucket. We’ll illustrate using `bucket-example-01`, but use your own name. Create your bucket with the default setting for versioning: disabled.

## Step 1: Locate the `Resource Activities` report.

  
Select top-level `Reports`, search for `resource`, locate `Resource Activities`, and click the link.
<p><img alt="aws_search_resource_activities" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-search-resource-activities.png"/></p>

## Step 2: Observe notifications

In the `Resource Activities` report, search for the name of your bucket.

Guardrails reports two notifications related to the bucket creation. `RESOURCE CREATED` indicates discovery of the bucket. `RESOURCE UPDATED` indicates that Guardrails has updated the CMDB entry with additional details about the bucket.
<p><img alt="aws-resource-activities-initial-notifications" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-resource-activities-initial-notifications.png"/></p>

## Step 3: See Guardrails react to a bucket change

   
Now visit your bucket in the AWS console, choose the `Properties` tab, and enable versioning.

Guardrails will soon notice the change. 
<p><img alt="aws-resource-activities-with-change-detected" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-resource-activities-with-change-detected.png"/></p>

Click into the new notification for your bucket, and scroll down in the diff to see the change that Guardrails has recorded.  
<p><img alt="aws-diff-the-first-change" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-diff-the-first-change.png"/></p>

## Step 4: Review

We’ve now seen how Guardrails detects the creation of a new resource in a connected account, and also notices and records changes to the configuration of that resource.

## Next Steps

Next we’ll explore [how to enable a  policy pack](/guardrails/docs/getting-started/getting-started-aws/attach-policy-pack) that requires buckets to enable versioning.


## Progress tracker

- [x] [Connect an AWS Account to Guardrails](path)
- [x] **Observe AWS Resource Activity**
- [ ] [Enable Your First Policy Pack](path)
- [ ] [Review Account-Wide Bucket Versioning](path)
- [ ] [Create a Static Exception to a Guardrails Policy](path)
- [ ] [Create a Calculated Exception to a Guardrails Policy](path)
- [ ] [Send an Alert to Email](path)
- [ ] [Apply a Quick Action](path)
- [ ] [Enable Automatic Enforcement](path)
