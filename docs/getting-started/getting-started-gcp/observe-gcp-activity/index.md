---
title: Observe GCP Activity
sidebar_label: Observe Resource Activity
---


# Observe GCP Resource Activity

In this guide you will learn how Guardrails detects and reacts to events in your GCP account. You will manually create and modify a GCP bucket in your account and explore how to view that activity in the Guardrails console.

This is the third guide in the *Getting started with GCP* series.

## Prerequisites

- Completion of the previous guides in this series.

- Access to the Guardrails console with administrative privlidges.

- Console access to a GCP project the ability to create and modify S3 buckets.

> [!NOTE]
> We will use the bucket name `guardrails_bucket_example_01` in this guide.

## Step 1: Prepare to create a GCP bucket

In the GCP console, navigate to **Cloud Storage**, select **Buckets**, and select **Create**.

<p><img alt="create-bucket-1" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/create-bucket-1.png"/></p>

## Step 2: Create the bucket

Give your bucket a name that is easy to remember, accept all the defaults, and choose **Create**.

<p><img alt="gcp-resource-type-dropdown" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/create-bucket-2.png"/></p>

## Step 3: Resource Activities report
 
Select **Reports** from the top navigation bar. Search for the word "resource" and select **Resource Activities**.

<p><img alt="aws_search_resource_activities" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-search-resource-activities.png"/></p>

## Step 4: Filter by type

From the filter bar, expand the **Resource Type** dropdown.

<p><img alt="aws-resource-type-dropdown" src="/images/docs/guardrails/getting-started/getting-started-aws/observe-aws-activity/aws-resource-type-dropdown.png"/></p>

Set the filter to **GCP > Storage > Bucket**. You can do this by typing `gcp storage bucket` into the search box, as shown here. When you see `GCP > Storage > Bucket` appear in the list, select the checkbox next to it.

<p><img alt="filter-1" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/filter-1.png"/></p>

## Step 5: Select the filter

Enable the checkbox to limit the report to only GCP buckets.
<p><img alt="filter-2" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/filter-2.png"/></p>

## Step 5: Observe activity

Guardrails reports two notifications related to the bucket creation. `RESOURCE CREATED` indicates discovery of the bucket. `RESOURCE UPDATED` indicates that Guardrails has updated the CMDB entry with additional details about the bucket.

<p><img alt="see notifications" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/filter-3.png"/></p>

## Step 6: Change a bucket property

Now visit your bucket in the GCP console, and switch access control from the default, *Uniform*, to *Fine-grained*. 

<p><img alt="change bucket property" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/change-bucket-property.png"/></p>

## Step 7: Observe events

Switch back to the Guardrails console browser tab. Guardrails' event processing system will soon detect the change, and a new `RESOURCE UPDATED` notification will appear in the list. Select that new notification from the Activities list.

<p><img alt="change detected" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/change-detected.png"/></p>

## Step 8: Audit resource change

On the notifications detail page, you can see metadata about the change and even audit the changes in configuration between the previous known state and the observed change. Scroll down in the **DIFF** section to observe the changes that Guardrails has recorded. 


<p><img alt="diff-the-change" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/diff-the-change.png"/></p>

## Step 9: Review

In this guide you changed the access control property of a GCP bucket and observed how Guardrails recorded the change.

## Next Steps

Next we'll explore [how to enable a  policy pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack) that requires buckets to enable uniform access.


## Progress tracker

- [x] Prepare a GCP project for import to Guardrails
- [x] Connect a GCP project to Guardrails
- [x] **Observe GCP Activity**
- [ ] Enable Your First Guardrails Policy Pack
- [ ] Review Project-Wide Bucket Access Control
- [ ] Create a Static Exception to a Guardrails GCP Policy
- [ ] Create a Calculated Exception to a Guardrails GCP Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
