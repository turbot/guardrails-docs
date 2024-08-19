---
title: Apply a Quick Action
sidebar_label: Apply a Quick Action
---


# Apply a Quick Action

**Prerequisites**: 

- [Connect a GCP Project to Guardrails](/guardrails/docs/runbooks/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity/)
- [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-gcp/attach-a-policy/)
- [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-static-exception/)
- [Create a Calculated Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-calculated-exception/)
- [Send an Alert to Email](/guardrails/docs/runbooks/getting-started-gcp/send-alert-to-email/)


Until now we’ve operated Guardrails in read-only mode, with the minimal permissions needed to discover resources, track changes, and alert on misconfigurations. In this runbook we’ll show how you can enable Guardrails to perform [Quick Actions](/guardrails/docs/guides/quick-actions) that fix misconfigurations.

## Step 1: Add the storage.buckets.update permission

Create a custom IAM role.
<p><img alt="gcp_create_custom_role" src="/images/docs/guardrails/runbooks/getting-started-gcp/apply-quick-action/gcp-create-custom-role.png"/></p><br/>

Add the permission `storage.buckets.update`.
<p><img alt="gcp_add_storage_buckets_update_permission" src="/images/docs/guardrails/runbooks/getting-started-gcp/apply-quick-action/gcp-add-storage-buckets-update-permission.png"/></p><br/>

Click `Create` to create the custom role.

Now edit the service account you created in [Connect a Project](/guardrails/docs/runbooks/getting-started-gcp/connect-a-project), and add the custom role. 
<p><img alt="gcp-add-custom-role" src="/images/docs/guardrails/runbooks/getting-started-gcp/apply-quick-action/gcp-add-custom-role.png"/></p><br/>

## Step 2: Enable Quick Actions

Do a top-level search for `quick actions` and click into the `Turbot > Quick Actions > Enabled` setting.
<p><img alt="gcp_find_quick_actions_policies" src="/images/docs/guardrails/runbooks/getting-started-gcp/apply-quick-action/gcp-find-quick-actions-policies.png"/></p><br/>

It’s disabled by default. On its Policy Type page, click `New Policy Setting`, choose your Sandbox as the target resource, choose `Enabled`, and click `Create`.  
<p><img alt="gcp_enable_quick_actions" src="/images/docs/guardrails/runbooks/getting-started-gcp/apply-quick-action/gcp-enable-quick-actions.png"/></p><br/>

## Step 3: Find a bucket in Alarm for access control

  
In [Send an alert to email]( /guardrails/docs/runbooks/getting-started-gcp/send-alert-to-email) we left your test bucket in the `Alarm` state.  
  
Search for it.  
<p><img alt="gcp_search_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/runbooks/getting-started-gcp/apply-quick-action/gcp-search-bucket-in-alarm-for-quick-action.png"/></p><br/>

Click into the resource, switch to the `Controls` tab, and search for `s3 bucket versioning`.
<p><img alt="gcp_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/runbooks/getting-started-gcp/apply-quick-action/gcp-bucket-in-alarm-for-quick-action.png"/></p><br/>  
  


Click into the control and expand the `Actions` dropdown.  
  
[image: gcp_quick_action_dropdown]  
  


Hmm. The action is not enabled.

## Step 4: Take a Quick Action to enable versioning  on a bucket

Choose `Enable Versioning`.  


Guardrails reports that the action was successful, and the control goes to green.  
  
[image: gcp_quick_action_reports_success]  


For more detail about what happened here, go to the top-level `Reports` tab, search in the page for `Activity Ledger`, and filter on `Control Type` == `AWS > S3 > Bucket > Versioning`.  
  
[image: gcp_quick_action_report_detail]  
  


The flow of notifications tells the story. Reading from the bottom up, Guardrails:  
  
- performs the action  
  
- notices the updated bucket  
  
- reevaluates the control.

In the [next runbook](/guardrails/docs/runbooks/getting-started-gcp/enable-enforcement) we’ll set Guardrails to automatically enforce these actions continuously.  
  


  
  
  



## Progress tracker

1. [Connect a GCP Project to Guardrails](/guardrails/docs/runbooks/getting-started-gcp/connect-a-project/)

2. [Observe GCP Activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity/)

3. [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-gcp/attach-a-policy/)

4. [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-static-exception/)

5. [Create a Calculated Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-calculated-exception/)

6. [Send an Alert to Email](/guardrails/docs/runbooks/getting-started-gcp/send-alert-to-email/)

7. **Apply a Quick Action**
