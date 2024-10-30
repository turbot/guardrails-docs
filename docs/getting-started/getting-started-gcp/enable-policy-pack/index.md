---
title: Enable Your First Guardrails Policy Pack
sidebar_label: Enable Policy Pack
---


# Enable your First Policy Pack

In this guide, you will learn how to attach a Guardrails [Policy Pack](/guardrails/docs/guides/configuring-guardrails/policy-packs) to enable governance controls.

This is the fourth guide in the *Getting started with GCP* series.

## Prerequisites

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privileges.
- Access to the GCP console with the ability to create and modify storage buckets.

## Step 1: Check bucket access control in GCP

Check the properties of the bucket you created in the previous guide ([Observe GCP activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity)). Verify that access control is still set to *Fine-grained* on the test bucket you created.

<p><img alt="change bucket property" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/change-bucket-property.png"/></p>

## Step 2: Filter controls

You bookmarked the **Controls by State** report in [Connect a Project](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity), go there now. From the filter bar open the **Type** dropdown and search for `gcp storage bucket access control`. Select the checkbox next to `GCP > Storage > Bucket > Access Control`. 

<p><img alt="filter bucket access control" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/filter-bucket-access-control.png"/></p>  

## Step 3: Find your bucket

Search for your bucket by typing its name into the search field. It should be in the `Skipped` state, because Guardrails has not been configured to check bucket access control.

<p><img alt="find bucket" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/find-bucket.png"/></p>

## Step 4: Navigate to your account

Control-click on the **Guardrails** logo on the top of the page to open a new homepage browser tab.

<p><img alt="locate-policy-pack-manage-1" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/navigate-1.png"/></p>

Click on the **Accounts** sub-tab from the homepage and then select your GCP account.

<p><img alt="locate-policy-pack-manage-2" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/navigate-2.png"/></p>

On the account resource page, select the **Detail** sub-tab.

<p><img alt="aws-locate-policy-pack-manage-3" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/navigate-3.png"/></p>


## Step 5: Locate the Policy Pack manager

Select the **Manage Link** next to **Policy Packs** UI widget.

<p><img alt="locate-policy-pack-manage-4" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/navigate-4.png"/></p>


## Step 6: Attach the Policy Pack to your project

In the **Edit policy pack attachments** dialog box, select **Add**.

<p><img alt="attach-1" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/attach-1.png"/></p>


Your Guardrails workspace should have the Policy Pack [Enforce Uniform Access is Enabled for GCP Storage Buckets](https://hub.guardrails.turbot.com/policy-packs/gcp_storage_enforce_uniform_access_on_buckets) pre-installed.

In the dropdown, select the Policy Pack named `Enforce Uniform Access is Enabled for GCP Storage Buckets`. Then select **Save**.

<p><img alt="attach-2" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/attach-2.png"/></p>


## Step 7: Observe policy effect

Return to your open browser tab (or bookmark) for the **Controls by State** report. Observe that the control state for your test bucket changes from `Skip` to `Alarm`. It is in the `Alarm` state because you turned off uniform access in [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity) but the policy requires it.

<p><img alt="bucket-in-alarm" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/bucket-in-alarm.png"/></p>

## Step 8: Review

In this guide you've attached a Policy Pack to your GCP account to check GCP bucket access control, and observed how the policy affects your bucket's control for Access Control.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/review-project-wide) you will create some additional buckets to see how the Policy Pack responds to new resource creation.

## Progress tracker
- [x] Prepare a GCP project for import to Guardrails
- [x] Connect a GCP project to Guardrails
- [x] Observe GCP Activity
- [x] Review Project-Wide Governance
- [x] **Enable Your First Guardrails Policy Pack**
- [ ] Create a Static Exception to a Guardrails Policy
- [ ] Create a Calculated Exception to a Guardrails GCP Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
