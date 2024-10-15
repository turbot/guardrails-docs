---
title: Observe GCP Resource Activity
sidebar_label: Observe Resource Activity
---


# Observe GCP Resource Activity

You’ve connected a GCP project, and seen Guardrails discover your existing GCP resources. In this guide you’ll create a new GCP bucket that Guardrails will discover. You’ll then change a setting on the bucket, and see Guardrails notice that change.

## Prerequisites

- [Connect a GCP Project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project/)
  
  
You will also need to create  a GCP bucket. We’ll illustrate using `guardrails_bucket_example_01`, but use your own name. 

## Step 1: Locate the Resource Activities report

Select **Reports** from the top navigation menu, and select **Resource Activities**.

<p><img alt="gcp-search-resource-activities" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-search-resource-activities.png"/></p>

## Step 2: Open the Resource Type filter

Expand the **Resource Type** dropdown.

<p><img alt="gcp-resource-type-dropdown" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-resource-type-dropdown.png"/></p>

## Step 3: Search for (or navigate to) GCP > Storage > Bucket

  
Set the filter to **GCP > Storage > Bucket**. You can do this by entering `gcp storage buckett` into the search box, as shown here. Alternatively, you can navigate to the same place using **>** to drill down into the hierarchy.

<p><img alt="gcp-resource-type-search" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-resource-type-search.png"/></p>

## Step 4: Select the filter

Enable the checkbox to limit the report to only GCP buckets.

<p><img alt="gcp-resource-type-filter-set" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-resource-type-filter-set.png"/></p>

## Step 5: Observe notifications

Now search for the name of your bucket.

Guardrails reports two notifications related to the bucket creation. `RESOURCE CREATED` indicates discovery of the bucket. `RESOURCE UPDATED` indicates that Guardrails has updated the CMDB entry with additional details about the bucket.

<p><img alt="gcp-resource-activities-initial-notifications" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-resource-activities-initial-notifications.png"/></p>

## Step 6: See Guardrails react to a bucket change

   
Now visit your bucket in the GCP console, and switch access control to fine-grained. Guardrails will soon notice the change.  

<p><img alt="gcp-resource-activities-with-change-detected" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-resource-activities-with-change-detected.png"/></p>

## Step 7: Observe the difference

Select the new notification for your bucket, and scroll down in the diff to see the change that Guardrails has recorded.  

<p><img alt="gcp-diff-the-first-change" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-diff-the-first-change.png"/></p>

## Step 8: Review

We’ve now seen how Guardrails detects the creation of a new resource in a connected project, and also notices and records changes to the configuration of that resource.

## Next Steps

Next we’ll explore [how to enable a  policy pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack) that requires buckets to enable uniform access.


## Progress tracker

- [x] Connect a GCP Project to Guardrails
- [x] **Observe GCP Activity**
- [ ] Enable Your First Guardrails Policy Pack
- [ ] Review Account-Wide Bucket Access Control
- [ ] Create a Static Exception to a Guardrails GCP Policy
- [ ] Create a Calculated Exception to a Guardrails GCP Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
