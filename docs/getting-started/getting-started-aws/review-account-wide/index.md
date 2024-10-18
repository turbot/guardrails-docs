---
title: Review Account-Wide Bucket Versioning
sidebar_label: Review Bucket Versioning
---


# Review Account-Wide Bucket Versioning

In this guide you’ll see how a single policy pack can govern all resources across an account.

This is the fifth guide in the *Getting started with AWS* series.

## Prerequisites

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privlidges.

## Step 1: Open the Controls by State report

Navigate to the **Controls by State** report, expand the **Type** dropdown, and search for `aws s3 bucket versioning`. Enable the checkbox next to **AWS > S3 > Bucket > Versioning** to set the filter. 

<p><img alt="search-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/enable-policy-pack/search-type-filter.png"/></p>

## Step 2: Filter on bucket versioning controls

Your test bucket is green: compliant with the policy. Buckets in the default state, with versioning disabled, are red: not compliant.

<p><img alt="search-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/review-account-wide/filter-applied.png"/></p>


## Step 3: Create new buckets without versioning

When you create new buckets, Guardrails detects newly-created buckets and applies the policy. Here we use search to focus on new buckets `02`, `03`, and `04`.

<p><img alt="search-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/review-account-wide/new-buckets-in-alarm.png"/></p>


## Step 4: Review

In this guide we've see how to attach a policy pack to your account. The policy checks both existing and new buckets, expects them to have versioning enabled, and puts their versioning controls into `Alarm` if they do not.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/create-static-exception) we’ll learn how to create an exception so that a bucket can be exempt from the versioning requirement. 



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
