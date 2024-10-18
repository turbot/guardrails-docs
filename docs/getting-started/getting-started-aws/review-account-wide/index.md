---
title: Review Account-wide governance
sidebar_label: Account-wide governance
---


# Review Account-wide governance

In this guide you’ll see how a single policy pack can govern all resources across an account.

This is the fifth guide in the *Getting started with AWS* series.

## Prerequisites

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privlidges.

## Step 1: Open the Controls by State report

Navigate back to the **Controls by State** report (or use your saved bookmark), expand the **Type** dropdown, and search for `bucket versioning`. Enable the checkbox next to **AWS > S3 > Bucket > Versioning** to set the filter. 

<p><img alt="search-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/search-type-filter.png"/></p>

## Step 2: Filter on bucket versioning controls

Your first testing bucket is in **Ok** (green) state, meaning it is compliant with the policy.

<p><img alt="search-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/review-account-wide/filter-applied.png"/></p>


## Step 3: Create test s3 buckets

Return to the AWS console and (as you did in the **Observe Resource Activity** guide) create 3 new buckets without versioning enabled.  For the example, we will create the following new buckets to sit along side our first test bucket:

- bucket-example-02
- bucket-example-03
- bucket-example-04

Keeping the naming similar and consistent will allow us easily filter and see all buckets at the same time for the purpose of the guide.

## Step 4: View newly created buckets

As you create the new buckets, Guardrails detects them and evaluates their configuration vs your policies. By changing our search string we can see all buckets at the same time.

<p><img alt="search-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/review-account-wide/new-buckets-in-alarm.png"/></p>

The new buckets are in **Alarm** state, because bucket versioning is not enabled.

## Step 5: Review

In this guide you created three new S3 buckets and observed how the policy pack added at the account level evaluates their governance status.

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
