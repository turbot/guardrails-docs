---
title: Apply a Quick Action
sidebar_label: Apply a Quick Action
---


# Apply a Quick Action

**Prerequisites**: 

- [Connect a GCP Project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack/)
- [Review Account-Wide Bucket Access Control](/guardrails/docs/getting-started/getting-started-gcp/review-account-wide/)
- [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/getting-started/getting-started-gcp/create-static-exception/)
- [Create a Calculated Exception to a Guardrails GCP Policy](/guardrails/docs/getting-started/getting-started-gcp/create-calculated-exception/)
- [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-gcp/send-alert-to-email/)


Until now we’ve operated Guardrails in read-only mode, with the minimal permissions needed to discover resources, track changes, and alert on misconfigurations. In this runbook we’ll show how you can enable Guardrails to perform [Quick Actions](/guardrails/docs/guides/quick-actions) that fix misconfigurations.

## Step 1: Add the storage.buckets.update permission

Create a custom IAM role.

Add the permission `storage.buckets.update`.

Assign the role to the service account you created in [Connect a Project](/guardrails/docs/runbooks/getting-started-gcp/connect-a-project).

## Step 2: Enable Quick Actions

Search Policies for `quick actions`.

<p><img alt="find_quick_actions_policies" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/find-quick-actions-policies.png"/></p>

Click into `Turbot > Quick Actions > Enabled` and switch to the `Settings` tab.

<p><img alt="switch-to-settings" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/switch-to-settings.png"/></p>

Click `New Policy Setting`’  

<p><img alt="gcp-enable-quick-actions" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/gcp-enable-quick-actions.png"/></p>

Choose your project, choose`Enabled`, and click `Create`.  


## Step 3: Find a bucket in Alarm for access control

  
In [Send an alert to email]( /guardrails/docs/runbooks/getting-started-gcp/send-alert-to-email) we left your test bucket in the `Alarm` state.  
  
Locate it.  

<p><img alt="gcp_search_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/gcp-search-bucket-in-alarm-for-quick-action.png"/></p>

## Step 4: Prepare to take a Quick Action

Click into the control and expand the `Actions` dropdown.

<p><img alt="gcp_quick_action_dropdown" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/gcp-quick-action-dropdown.png"/></p>

## Step 5: Take a Quick Action to enable uniform access control

Choose `Set Uniform Access Control`.  


Guardrails reports that the action was successful, and the control goes to green.  

<p><img alt="gcp_quick_action_reports_success" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/gcp-quick-action-reports-success.png"/></p>

## Step 6: Review

Explore taking Quick Actions on other resources in your project.

## Next Steps

In the [next runbook](/guardrails/docs/runbooks/getting-started-gcp/enable-enforcement) we’ll set Guardrails to automatically enforce these actions continuously.  
  


  
  
  



## Progress tracker

- [x] Connect a GCP Project to Guardrails
- [x] Observe GCP Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] Review Account-Wide Bucket Access Control
- [x] Create a Static Exception to a Guardrails GCP Policy
- [x] Create a Calculated Exception to a Guardrails GCP Policy
- [x] Send an Alert to Email
- [x] **Apply a Quick Action**
- [ ] Enable Automatic Enforcement
