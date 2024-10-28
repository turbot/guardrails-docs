---
title: Apply a Quick Action
sidebar_label: Apply a Quick Action
---


# Apply a Quick Action

**Prerequisites**: 

- [Prepare a GCP project for import to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/prepare-project/)
- [Connect a GCP project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-project/)
- [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack/)
- [Review Project-Wide Bucket Access Control](/guardrails/docs/getting-started/getting-started-gcp/review-project-wide/)
- [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/getting-started/getting-started-gcp/create-static-exception/)
- [Create a Calculated Exception to a Guardrails GCP Policy](/guardrails/docs/getting-started/getting-started-gcp/create-calculated-exception/)
- [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-gcp/send-alert-to-email/)


Until now we’ve operated Guardrails with the minimal permissions needed to discover resources, track changes, and alert on misconfigurations. In this runbook we’ll show how you can enable Guardrails to perform [Quick Actions](/guardrails/docs/guides/quick-actions) that fix misconfigurations.

## Step 1: Add the storage.buckets.update permission

Create a custom IAM role.

Add the permission `storage.buckets.update`.

Assign the role to the service account you created in [Connect a Project](/guardrails/docs/runbooks/getting-started-gcp/connect-a-project).

## Step 2: Location Turbot > Quick Actions > Enabled

Search **Policies** for `quick actions`. Select **Turbot > Quick Actions > Enabled**.
<p><img alt="find_quick_actions_policies" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/find-quick-actions-policies.png"/></p>

Step 3: View Turbot > Quick Actions > Enabled policy type

Select **New Policy Setting**.
<p><img alt="view-quick-actions-enabled-policy-type" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/view-quick-actions-enabled-policy-type.png"/></p>

## Step 4: Enable Quick Actions

Choose your project as the **Resource**, choose **Enabled`, and select **Create**.  
<p><img alt="gcp-enable-quick-actions" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/gcp-enable-quick-actions.png"/></p>

## Step 5: Find a bucket in Alarm for access control

  
In [Send an alert to email]( /guardrails/docs/runbooks/getting-started-gcp/send-alert-to-email) we left your test bucket in the `Alarm` state. Locate it in **Controls by State** and select the control.  
<p><img alt="gcp_search_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/gcp-search-bucket-in-alarm-for-quick-action.png"/></p>

## Step 6: Prepare to take a Quick Action

Select the **Actions** dropdown.
<p><img alt="gcp_quick_action_dropdown" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/gcp-quick-action-dropdown.png"/></p>

## Step 7: Take a Quick Action to enable uniform access control

Choose **Set Uniform Access Control**.  


Guardrails reports that the action was successful, and the control goes to green.  
<p><img alt="gcp_quick_action_reports_success" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/gcp-quick-action-reports-success.png"/></p>

## Step 8: Review

Explore taking Quick Actions on other resources in your project.

## Next Steps

In the [next runbook](/guardrails/docs/runbooks/getting-started-gcp/enable-enforcement) we’ll set Guardrails to automatically enforce these actions continuously.  
  


  
  
  



## Progress tracker

- [x] Prepare a GCP project for import to Guardrails
- [x] Connect a GCP project to Guardrails
- [x] Observe GCP Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] Review Project-Wide Bucket Access Control
- [x] Create a Static Exception to a Guardrails GCP Policy
- [x] Create a Calculated Exception to a Guardrails GCP Policy
- [x] Send an Alert to Email
- [x] **Apply a Quick Action**
- [ ] Enable Automatic Enforcement
