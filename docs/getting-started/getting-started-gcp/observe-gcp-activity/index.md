---
title: Observe GCP Activity
sidebar_label: Observe GCP Activity
---


# Observe AWS Resource Activity

You’ve connected a GCP project, and seen Guardrails discover  your existing GCP resources. In this guide you’ll create a new GCP bucket that Guardrails will discover. You’ll then change a setting on the bucket, and see Guardrails notice that change.

## Prerequisites

- [Connect a GCP Project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project/)
  
  
You will also need to create  a GCP bucket. We’ll illustrate using `guardrails_bucket_example_01`, but use your own name. Create your bucket with the default setting for access control: `Fine-Grained`.

## Step 1: Locate the `Resource Activities` report

Select top-level `Reports`, search for `resource`, locate `Resource Activities`, and click the link.
<p><img alt="gcp-search-resource-activities" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-search-resource-activities.png"/></p>

## Step 2: Observe notifications

In the `Resource Activities` report, search for the name of your bucket.

Guardrails reports two notifications related to the bucket creation. `RESOURCE CREATED` indicates discovery of the bucket. `RESOURCE UPDATED` indicates that Guardrails has updated the CMDB entry with additional details about the bucket.
<p><img alt="gcp-resource-activities-initial-notifications" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-resource-activities-initial-notifications.png"/></p>

## Step 3: See Guardrails react to a bucket change

   
Now visit your bucket in the GCP console, and switch access control to `Fine-Grained`.

  
Guardrails will soon notice the change.  
<p><img alt="gcp-resource-activities-with-change-detected" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-resource-activities-with-change-detected.png"/></p>  
  
Click into the new notification for your bucket, and scroll down in the diff to see the change that Guardrails has recorded.    
<p><img alt="gcp-diff-the-first-change" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-diff-the-first-change.png"/></p>

## Step 4: Review

We’ve now seen how Guardrails detects the creation of a new resource in a connected project, and also notices and records changes to the configuration of that resource.

## Next Steps

Next we’ll explore [how to enable a  policy pack](/guardrails/docs/getting-started/getting-started-gcp/attach-policy-pack) that requires buckets to enable versioning.


## Progress tracker

- [x] [Connect a GCP Project to Guardrails](path)
- [x] **Observe GCP Activity**
- [ ] [Enable Your First Guardrails Policy Pack](path)
- [ ] [Review Account-Wide Bucket Access Control](path)
