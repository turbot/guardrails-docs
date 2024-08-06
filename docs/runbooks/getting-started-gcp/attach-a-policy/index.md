---
title: Attach a Guardrails Policy
sidebar_label: Attach a Guardrails Policy
---


# Attach a Guardrails Policy

**Prerequisites**: 

- [Connect a GCP Account to Guardrails](/guardrails/docs/runbooks/getting-started-gcp/connect-an-account/)
- [Observe GCP Activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity/)


Now that we can track resource configuration drift, we can create policies to alert when those configurations do not meet our desired state. 

## Step 1: Review bucket permissions

Check the configuration of the bucket you created in [Observe GCP activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity). In that runbook you switched your test bucket from uniform to fine-grained access. Verify that is the configuration.
<p><img alt="gcp-review-fine-grained" src="/images/docs/guardrails/runbooks/getting-started-gcp/attach-a-policy/gcp-review-fine-grained.png"/></p><br/>

## Step 2: Find and view the GCP > Storage > Bucket > Access Control control

Do a top-level search for `gcp bucket trusted access`.
<p><img alt="gcp_search_bucket_access_control" src="/images/docs/guardrails/runbooks/getting-started-gcp/attach-a-policy/gcp-search-bucket-access-control.png"/></p><br/>

Guardrails reports that the bucket is in the `skipped` state. By default, there is no attached policy to enforce uniform access control. Let’s attach one. 
<p><img alt="gcp_bucket_no_public_access_policy_settings" src="/images/docs/guardrails/runbooks/getting-started-gcp/attach-a-policy/gcp-bucket-no-public-access-policy-settings.png"/></p><br/>

There’s a policy type, `GCP > Storage > Bucket > Policy > Trusted Access`, but as yet there are no policy settings. The default value for the setting is `Skip`.

## Step 3: Attach a policy

Your Guardrails workspace already has the pre-installed policy pack [Enforce Uniform Access is Enabled for GCP Storage Buckets]https://hub.guardrails.turbot.com/policy-packs/gcp_storage_enforce_uniform_access_on_bucket).

To attach it, click top-level `Resources`, navigate to your `Sandbox` folder, select the `Detail` tab, and click the `Manage` link next to `Policy Packs`.  
<p><img alt="gcp_find_policy_packs_manage" src="/images/docs/guardrails/runbooks/getting-started-gcp/attach-a-policy/gcp-find-policy-packs-manage.png"/></p><br/>

In the `Edit policy pack attachments` dialog, select `Enforce Uniform Access is Enabled for GCP Storage Buckets` and  click `Save`.
<p><img alt="gcp_edit_attachments_select_enforce_uniform_access" src="/images/docs/guardrails/runbooks/getting-started-gcp/attach-a-policy/gcp-edit-attachments-select-enforce-uniform-access.png"/></p><br/>  
  


  
Guardrails returns you to the `Detail` tab of the `Sandbox` page. Click the `Policies` tab, click `Descendant`, and search for `gcp bucket access control`.  
<p><img alt="gcp_bucket_policy_access_control_descendant" src="/images/docs/guardrails/runbooks/getting-started-gcp/attach-a-policy/gcp-bucket-policy-access-control-descendant.png"/></p><br/>

Click into the `GCP > Storage > Bucket > Access Control` policy type.
<p><img alt="gcp_bucket_policy_access_control_policy_type" src="/images/docs/guardrails/runbooks/getting-started-gcp/attach-a-policy/gcp-bucket-policy-access-control-policy-type.png"/></p><br/>

This is the policy type for GCP > Storage > Bucket > Trusted Access. The default is `Skip`.  
  
There is 1 policy setting. Click `1 setting` or `Switch to settings tab` to view them.
<p><img alt="gcp_bucket_access_control_policy_settings" src="/images/docs/guardrails/runbooks/getting-started-gcp/attach-a-policy/gcp-bucket-access-control-policy-settings.png"/></p><br/>

Here you can see the result of the policy pack you just attached: the setting for GCP bucket access control now overrides the default, `skip`, and has become `Check: Uniform`. 

 

## Step 4: Observe a policy-driven alarm

Do a top-level search for the name of your bucket, switch to the `Controls` tab, and search for `access control`. The control, which was formerly in the `Skipped` state, is now in `Alarm` because we’ve set the bucket’s access control to fine-grained.
<p><img alt="gcp_observe_policy_driven_alarm" src="/images/docs/guardrails/runbooks/getting-started-gcp/attach-a-policy/gcp-observe-policy-driven-alarm.png"/></p><br/>  
  
You can override policies at any level. In the [next runbook](/guardrails/docs/runbooks/getting-started-gcp/create-static-exception), we’ll create an exception that transitions your bucket to the `OK` state. 


## Progress tracker

1. [Connect a GCP Account to Guardrails](/guardrails/docs/runbooks/getting-started-gcp/connect-an-account/)

2. [Observe GCP Activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity/)

3. **Attach a Guardrails Policy**

4. [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-static-exception/)
