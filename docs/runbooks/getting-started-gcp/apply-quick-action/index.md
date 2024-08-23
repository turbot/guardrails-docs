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

## Step 1: Add the compute.instances.setDeletionProtection permission

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

## Step 3: Find a control for a compute instance

  
From the top-level `Controls` tab, search for `gcp compute instance deletion`.  
<p><img alt="gcp_search_compute_instance_deletion" src="/images/docs/guardrails/runbooks/getting-started-gcp/apply-quick-action/gcp-search-compute-instance-deletion.png"/></p><br/>

The controls for this policy type are in the `skipped` state by default. Click the status bar to view the controls.
<p><img alt="gcp_view_controls_for_deletion_protection" src="/images/docs/guardrails/runbooks/getting-started-gcp/apply-quick-action/gcp-view-controls-for-deletion-protection.png"/></p><br/>  
  
Click into the control for an instance that does not enable deletion protection.
<p><img alt="gcp_quick_action_dropdown" src="/images/docs/guardrails/runbooks/getting-started-gcp/apply-quick-action/gcp-quick-action-dropdown.png"/></p><br/>

Select the `Policies` tab and change the setting to `Check: Enabled` for this instance.  
  
![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcchRgvg_XEauh_gRLhkx0w3l0XA-wt1yoBwNOvant47z_WYLhxRjES2pcgV-3M8sS5yOtgpR9Wqwq39rBjezOtUSzyPu4fkA_x40ORp0dJwKeKnbLu4LOw9z2x6e4r0VU7d6E1Bkerrlb96UmDtoMcL9uM?key=mTcIRW7htp-Gjdgfy2mntA)  
  
Go back to the control. It’s now in `Alarm` because theinstance doesn’t enable deletion protection but the policy says it should.
<p><img alt="gcp_instance_now_in_alarm" src="/images/docs/guardrails/runbooks/getting-started-gcp/apply-quick-action/gcp-instance-now-in-alarm.png"/></p><br/>

## Step 4: Take a Quick Action to enable deletion protection.

Expand the `Actions` dropdown and choose `Enable Deletion Protection`.  
<p><img alt="gcp_ready_to_enable_deletion_protection" src="/images/docs/guardrails/runbooks/getting-started-gcp/apply-quick-action/gcp-ready-to-enable-deletion-protection.png"/></p><br/>  


Guardrails reports that the action was successful, and the control goes to green.  
<p><img alt="gcp_quick_action_reports_success" src="/images/docs/guardrails/runbooks/getting-started-gcp/apply-quick-action/gcp-quick-action-reports-success.png"/></p><br/>

In the [next runbook](/guardrails/docs/runbooks/getting-started-gcp/enable-enforcement) we’ll set Guardrails to automatically enforce these actions continuously.  
  


  
  
  



## Progress tracker

1. [Connect a GCP Project to Guardrails](/guardrails/docs/runbooks/getting-started-gcp/connect-a-project/)

2. [Observe GCP Activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity/)

3. [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-gcp/attach-a-policy/)

4. [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-static-exception/)

5. [Create a Calculated Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-calculated-exception/)

6. [Send an Alert to Email](/guardrails/docs/runbooks/getting-started-gcp/send-alert-to-email/)

7. **Apply a Quick Action**
