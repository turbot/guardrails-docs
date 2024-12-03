---
title: Observe AWS Resource Activity
sidebar_label: Observe Resource Activity
---


# Observe AWS Resource Activity

In this guide you will learn how Guardrails detects and reacts to events in your AWS account. You will manually create and modify an S3 bucket in your account and explore how to view that activity in the Guardrails console.

This is the third guide in the *Getting started with AWS* series.

## Prerequisites

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privileges.
- Console access to an AWS account and the ability to create and modify S3 buckets.

> [!NOTE]
> We will use the bucket name `bucket-example-01` in this guide. Bucket names in AWS must be globally unique, so please change the default name for your testing.

## Step 1: Create an S3 bucket

After logging into the AWS console, navigate to S3 and select the **Create Bucket** button.

<p><img alt="create-bucket-1" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/create-bucket-1.png"/></p>

Give your bucket a name that is easy to remember.

<p><img alt="create-bucket-2" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/create-bucket-2.png"/></p>

Accept all defaults for the remaining configuration choices and then select the **Create Bucket** button.

<p><img alt="create-bucket-3" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/create-bucket-3.png"/></p>

## Step 2: Resource Activities report
 
Select **Reports** from the top navigation bar. Search for the word "resource" and select **Resource Activities**.

<p><img alt="aws_search_resource_activities" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-search-resource-activities.png"/></p>

## Step 3: Filter by type

From the filter bar, expand the **Resource Type** dropdown.

<p><img alt="aws-resource-type-dropdown" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-resource-type-dropdown.png"/></p>

Set the filter to **AWS > S3 > Bucket**. You can do this by typing `aws s3 bucket` into the search box, as shown here. When you see *AWS > S3 > Bucket* appear in the list, select the checkbox next to it.

<p><img alt="aws-resource-type-search" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-resource-type-search.png"/></p>

## Step 4: Observe activity

You can scope the resource activity report to a specific bucket by searching for the name of your bucket. To do this, type its name into the search field. Guardrails will show all notifications related to the bucket. In the screen below, the `RESOURCE CREATED` activity represents Guardrails discovery of the bucket and `RESOURCE UPDATED` indicates that Guardrails has updated the CMDB entry with additional details about the bucket.

<p><img alt="aws-resource-activities-initial-notifications" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-resource-activities-initial-notifications.png"/></p>

## Step 5: Enable versioning

In the AWS console, select the name of your bucket from the list of all buckets. Select the **Properties** tab and then select the **Edit** button in the **Bucket Versioning** section.

<p><img alt="enable-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/enable-versioning-1.png"/></p>

In the Versioning dialog box choose **Enable**, then select **Save changes**.

<p><img alt="enable-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/enable-versioning-2.png"/></p>

## Step 6: Observe events

Switch back to the Guardrails console browser tab. Guardrails' event processing system will soon detect the change, and a new `RESOURCE UPDATED` notification will appear in the list. Select that new notification from the Activities list.

<p><img alt="aws-resource-activities-with-change-detected" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-resource-activities-with-change-detected.png"/></p>

## Step 7: Audit resource change

On the notifications detail page, you can see metadata about the change and even audit the changes in configuration between the previous known state and the observed change. Scroll down in the **DIFF** section to observe the changes that Guardrails has recorded. 

<p><img alt="aws-diff-the-first-change" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-diff-the-first-change.png"/></p>

## Step 8: Review

In this guide you changed the versioning property of an S3 bucket and observed how Guardrails recorded the change.

## Next Steps

Next we’ll explore [how to enable a policy pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack) that requires buckets to enable versioning.

## Progress tracker
- [x] Prepare an AWS Account for Import to Guardrails
- [x] Connect an AWS Account to Guardrails
- [x] **Observe AWS Resource Activity**
- [ ] Enable Your First Policy Pack
- [ ] Review Account-Wide Governance
- [ ] Create a Static Exception to a Guardrails Policy
- [ ] Create a Calculated Exception to a Guardrails Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
