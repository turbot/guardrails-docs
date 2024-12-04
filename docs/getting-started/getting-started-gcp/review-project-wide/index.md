---
title: Review Project-Wide Governance
sidebar_label: Project-Wide Governance
---


# Review Project-Wide Bucket Access Control

In this guide you’ll see how a single Policy Pack can govern all resources across a project.

This is the fifth guide in the *Getting started with GCP* series.

## Prerequisites

- Completion of the previous guides in this series.

- Access to the Guardrails console with administrative privileges.


## Step 1: Open the Controls by State report

Navigate back to the **Controls by State** report (or use your saved bookmark), expand the **Type** dropdown, and search for `gcp storage bucket access control`. Enable the checkbox next to **GCP > Strorage > Bucket > Access Control** to set the filter.

<p><img alt="filter-1" src="/images/docs/guardrails/getting-started/getting-started-gcp/review-project-wide/filter-1.png"/></p>

## Step 2: Filter on controls for bucket access control

Your test bucket is in the `Alarm` (red) state: out of policy. Other buckets in the project, if created with the default uniform access, are in the `OK` (green) state: in policy.

<p><img alt="filter-2" src="/images/docs/guardrails/getting-started/getting-started-gcp/review-project-wide/filter-2.png"/></p>

## Step 3: Create test GCP buckets

Return to the GCP console and (as you did in the **Observe Resource Activity** guide) create three new buckets with access control set to *Fine-grained*. For the example, we will create the following new buckets:

- guardrails_bucket_example_02
- guardrails_bucket_example_03
- guardrails_bucket_example_04

Keep your names similar and consistent so you can easily filter and see all your test buckets together.

## Step 4: View newly created buckets

As you create the new buckets, Guardrails detects them and evaluates their configuration relative to your policies. By changing our search string we can see all buckets at the same time.

<p><img alt="new-buckets-in-alarm" src="/images/docs/guardrails/getting-started/getting-started-gcp/review-project-wide/new-buckets-in-alarm.png"/></p>

The new buckets are in the `Alarm` state because, as with the first one, you set access control to *Fine-grained*. The current policy requires all buckets to have uniform access enabled.

## Step 5: Review

In this guide you created three new GCP buckets and observed how the Policy Pack added at the project level evaluates their governance status.


## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/create-static-exception) we’ll learn how to create an exception so that a bucket can be exempt from the access control requirement.  

## Progress tracker
- [x] Prepare a GCP Project for Import to Guardrails
- [x] Connect a GCP Project to Guardrails
- [x] Observe GCP Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] **Review Project-Wide Governance**
- [ ] Create a Static Exception to a Guardrails Policy
- [ ] Create a Calculated Exception to a Guardrails GCP Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
