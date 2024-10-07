---
title: Enable Your First Guardrails Policy Pack
sidebar_label: Enable Policy Pack
---


# Enable your First Policy Pack

**Prerequisites**: 

- [Connect a GCP Project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity/)


Now that we can track resource configuration drift, we can create policies to alert when those configurations do not meet our desired state. 

## Step 1: Review bucket access control

Check the configuration of the bucket you created in [Observe GCP activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity). In that  guide you switched your test bucket from uniform to fine-grained access. Verify that is the configuration.

## Step 2: Review GCP controls for bucket uniform access

You bookmarked the `Controls by State` report in [Connect a Project](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity), go there now.

Set the `Resource Type` filter to `GCP > Storage > Bucket`, and search for `Access Control`.
<p><img alt="gcp-search-bucket-access-control" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/gcp-search-bucket-access-control.png"/></p>

## Step 3: Prepare to add a policy pack

Your Guardrails workspace already has the pre-installed policy pack [Enforce Uniform Access is Enabled for GCP Storage Buckets](https://hub.guardrails.turbot.com/policy-packs/gcp_storage_enforce_uniform_access_on_buckets).

To attach it, click top-level `Resources`, navigate to your `Sandbox > YOUR_GCP_ACCOUNT`, select the `Detail` tab, and locate the `Manage Link` next to `Policy Packs`.  
<p><img alt="gcp-locate-policy-pack-manage" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/gcp-locate-policy-pack-manage.png"/></p>

Click the `Manage` link.

## Step 4: Attach the policy pack to your account

In the `Edit policy pack attachments` dialog, select `Enforce Uniform Access is Enabled for GCP Storage Buckets` and  click `Save`.
<p><img alt="gcp-edit-attachments-select-enforce-uniform-access" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/gcp-edit-attachments-select-enforce-uniform-access.png"/></p>  
  


## Step 5: Search for your bucket

  
Use the top-level search to find your bucket.
<p><img alt="gcp-search-for-bucket" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/gcp-search-for-bucket.png"/></p>

## 

## Step 6: Review

Click into the resource, switch to the `Controls` tab, and search for `access control`. 
<p><img alt="gcp-observe-single-control" src="/images/docs/guardrails/getting-started/getting-started-gcp/enable-policy-pack/gcp-observe-single-control.png"/></p>  
  


Now, instead of skipping the access control check, Guardrails runs it. Your bucket is red because you turned off uniform access in [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-aws-activity)  but the policy requires it.  
  


## Next Steps

In this guide you’ve enabled a policy pack to check GCP bucket access control. In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/review-across-account) we’ll see how that policy pack affects all the buckets in your account.


## Progress tracker

- [x] [Connect a GCP Project to Guardrails](path)
- [x] [Observe GCP Activity](path)
- [x] **Enable Your First Guardrails Policy Pack**
- [ ] [Review Account-Wide Bucket Access Control](path)
- [ ] [Create a Static Exception to a Guardrails GCP Policy](path)
- [ ] [Create a Calculated Exception to a Guardrails GCP Policy](path)
- [ ] [Send an Alert to Email](path)
- [ ] [Apply a Quick Action](path)
- [ ] [Enable Automatic Enforcement](path)
