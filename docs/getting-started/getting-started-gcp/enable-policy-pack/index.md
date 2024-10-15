---
title: Enable Your First Guardrails Policy Pack
sidebar_label: Enable Policy Pack
---


# Enable your First Policy Pack

Now that we can track resource configuration drift, we can create policies to alert when those configurations do not meet our desired state. 

**Prerequisites**: 

- [Connect a GCP Project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity/)


## Step 1: Check bucket access control in GCP

Check the configuration of the bucket you created in [Observe GCP activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity). In that  guide you switched your test bucket from uniform to fine-grained access. Verify that’s still the case.

## Step 2: Check the Guardrails control for access control

You bookmarked the **Controls by State** report in [Connect a Project](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity), go there now.

Use the **Type** filter to choose **GCP > Storage > Bucket > Access Control** and search for your bucket.It is in the `Skipped` state. There is not yet a Guardrails policy to check bucket access control. 

<p><img alt="gcp-search-bucket-access-control" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/gcp-search-bucket-access-control.png"/></p>

## Step 3: Prepare to add a policy pack

Your Guardrails workspace already has the pre-installed policy pack [Enforce Uniform Access is Enabled for GCP Storage Buckets](https://hub.guardrails.turbot.com/policy-packs/gcp_storage_enforce_uniform_access_on_buckets).

Select **Resources** in the top navigation bar. Navigate to **Turbot > Sandbox > YOUR_AWS_ACCOUNT**, select the **Detail** tab, and select the **Manage Link** next to **Policy Packs**.

<p><img alt="gcp-locate-policy-pack-manage" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/gcp-locate-policy-pack-manage.png"/></p>

Click the `Manage` link.

## Step 4: Attach the policy pack to your account

In **Edit policy pack attachments**, choose `Enforce Uniform Access is Enabled for GCP Storage Buckets` and select **Save**.

<p><img alt="gcp-edit-attachments-select-enforce-uniform-access" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/gcp-edit-attachments-select-enforce-uniform-access.png"/></p>

## Step 5: Review

  
 In **Controls by State** use the **Type** filter to select **GCP > Storage > Bucket > Access Control**, then search for your bucket. Now, instead of skipping the access control check, Guardrails runs it. Your bucket is red because you turned off uniform access in [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-aws-activity)  but the policy requires it.

<p><img alt="gcp-search-bucket-access-control-again" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/gcp-search-bucket-access-control-again.png"/></p>

## Next Steps

In this guide you’ve enabled a policy pack to check GCP bucket access control. In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/review-across-account) we’ll see how that policy pack affects all the buckets in your account.


## Progress tracker

- [x] Connect a GCP Project to Guardrails
- [x] Observe GCP Activity
- [x] **Enable Your First Guardrails Policy Pack**
- [ ] Review Account-Wide Bucket Access Control
- [ ] Create a Static Exception to a Guardrails GCP Policy
- [ ] Create a Calculated Exception to a Guardrails GCP Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
