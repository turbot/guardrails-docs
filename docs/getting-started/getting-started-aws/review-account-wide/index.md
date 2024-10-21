---
title: Review Account-wide governance
sidebar_label: Account-wide governance
---


# Review Account-wide governance

In this guide you’ll see how a single Policy Pack can govern all resources across an account.

This is the fifth guide in the *Getting started with AWS* series.

## Prerequisites

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privlidges.

## Step 1: Open the Controls by State report

Navigate back to the **Controls by State** report (or use your saved bookmark), expand the **Type** dropdown, and search for `bucket versioning`. Enable the checkbox next to **AWS > S3 > Bucket > Versioning** to set the filter. 

<p><img alt="search-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/search-type-filter.png"/></p>

## Step 2: Filter on bucket versioning controls

Your first test bucket is in the **OK** (green) state: it complies with the policy. Other buckets in the account with versioning disabled will show in the **Alarm** state (red): not compliant.

<p><img alt="search-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/review-account-wide/filter-applied.png"/></p>


## Step 3: Create test s3 buckets

Return to the AWS console and (as you did in the **Observe Resource Activity** guide) create 3 new buckets without versioning enabled.  For the example, we will create the following new buckets:

- bucket-example-02
- bucket-example-03
- bucket-example-04

Keep your names similar and consistent so you can easily filter and see all your test buckets together.

## Step 4: View newly created buckets

As you create the new buckets, Guardrails detects them and evaluates their configuration relative to your policies. By changing our search string we can see all buckets at the same time.

<p><img alt="search-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/review-account-wide/new-buckets-in-alarm.png"/></p>

The new buckets are in the **Alarm** state because bucket versioning is not enabled. The current policy requires all buckets to have versioing enabled.

## Step 5: Review

In this guide you created three new S3 buckets and observed how the Policy Pack added at the account level evaluates their governance status.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/create-static-exception) we’ll learn how to create a static exception so that a bucket can be exempt from the versioning requirement. 

## Progress tracker

- [x] Prepare an AWS Account for import to Guardrails
- [x] Connect an AWS Account to Guardrails
- [x] Observe AWS Resource Activity
- [x] Enable Your First Policy Pack
- [x] **Review Account-Wide Bucket Versioning**
- [ ] Create a Static Exception to a Guardrails Policy
- [ ] Create a Calculated Exception to a Guardrails Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
