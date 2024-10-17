---
title: Observe AWS Resource Activity
sidebar_label: Observe Resource Activity
---


# Observe AWS Resource Activity

In this guide, you will learn now Guardrails detects and reacts to new and changed resources in your AWS account.

This is the second guide in the *Getting started with AWS* series.

## Prerequisites

- Completion of the first guide.

- An S3 bucket with the default setting for versioning: disabled.

> [!NOTE]
> We'll use `bucket-example-01`, but use your own name.
 

## Step 1: Locate the Resource Activities report
 
Select **Reports** from the top navigation bar. Search for the word "resource" and select **Resource Activities**.

<p><img alt="aws_search_resource_activities" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-search-resource-activities.png"/></p>

## Step 2: Open the Resource Type filter

From the filter bar, expand the **Resource Type** dropdown.

<p><img alt="aws-resource-type-dropdown" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-resource-type-dropdown.png"/></p>

## Step 3: Filter on Resource Type

 
Set the filter to **AWS > S3 > Bucket**. You can do this by typing `aws s3 bucket` into the search box, as shown here. When you see *AWS > S3 > Bucket* appear in the list, select the checkbox next to it.

<p><img alt="aws-resource-type-search" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-resource-type-search.png"/></p>

## Step 4: Observe notifications on the bucket

You can scope the resource activity report to a specific bucket by searching for the name of your bucket. To do this, type its name into the search field. Guardrails will show all notifications related to the bucket. `RESOURCE CREATED` indicates discovery of the bucket. `RESOURCE UPDATED` indicates that Guardrails has updated the CMDB entry with additional details about the bucket.

<p><img alt="aws-resource-activities-initial-notifications" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-resource-activities-initial-notifications.png"/></p>

## Step 5: Enable versioning on the bucket

In the AWS console, edit the bucket's versioning property, choose **Enabled**, and select **Save changes**.

<p><img alt="enable-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/enable-versioning.png"/></p>

## Step 6: See Guardrails react to a bucket change

Guardrails will soon notice the change, and a new `RESOURCE UPDATED` notification will appear. Select tthat new notification's link.

<p><img alt="aws-resource-activities-with-change-detected" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-resource-activities-with-change-detected.png"/></p>

## Step 6: Observe the difference

Scroll down in the diff to see the change that Guardrails has recorded. 

<p><img alt="aws-diff-the-first-change" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-diff-the-first-change.png"/></p>

## Step 7: Review

In this guide you have seen how Guardrails detects the creation of a new resource in a connected account, and also notices and records changes to the configuration of that resource.

## Next Steps

Next we’ll explore [how to enable a  policy pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack) that requires buckets to enable versioning.


## Progress tracker

- [x] Connect an AWS Account to Guardrails
- [x] **Observe AWS Resource Activity**
- [ ] Enable Your First Policy Pack
- [ ] Review Account-Wide Bucket Versioning
- [ ] Create a Static Exception to a Guardrails Policy
- [ ] Create a Calculated Exception to a Guardrails Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
