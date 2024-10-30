---
title: Apply a Quick Action
sidebar_label: Apply a Quick Action
---


# Apply a Quick Action

In this guide we’ll show how you can enable Guardrails to perform [Quick Actions](/guardrails/docs/guides/quick-actions) that fix misconfigurations. A Quick Action empowers an administrator to quickly fix misconfigurations by applying a change directly to an underlying AWS resource. In order to use this feature,  Guardrails will need one additional permission. This guide will show you how to change the permissions specific to GCP bucket public access, other Quick Actions will require different permission grants.

This is the ninth guide in the *Getting started with GCP series*.

**Prerequisites**: 

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privileges.
- Access to an AWS account with administrative privileges to add permissions to the Guardrails cross-account role.


## Step 1: Begin role creation

In the GCP console, select **IAM & Admin**, select **Roles**, and select **Create Role**.

<p><img alt="role-1" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/role-1.png"/></p>

## Step 2: Name the role

Assign a descriptive name and ID, then select **Add Permissions**.

<p><img alt="role-2" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/role-2.png"/></p>

## Step 3: Find the permission

In the properties filter, search for `storage.buckets.update`.

<p><img alt="role-3" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/role-3.png"/></p>

## Step 4: Add the permission

Enable the checkbox next to the permission and select **Add**.

<p><img alt="role-4" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/role-4.png"/></p>

## Step 5: Create the role

Select **Create**.

<p><img alt="role-5" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/role-5.png"/></p>

## Step 6: Assign the role to your service account

Select **IAM** and select the pencil icon next to your Guardrails service account.

<p><img alt="assign-role-1" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/assign-roles-1.png"/></p>

Choose **Add Another Role**.

<p><img alt="assign-role-2" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/assign-roles-2.png"/></p>

Search for and select the custom role you created, then select **Save**.

<p><img alt="assign-role-3" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/assign-roles-3.png"/></p>


## Step 7: Find Quick Actions

Select **Policies** from the top-level navigation. In the search box, type `quick actions`, then select the **Turbot > Quick Actions > Enabled** policy type.

<p><img alt="find_quick_actions" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/find-quick-actions.png"/></p>

## Step 8: Enable Quick Actions

Choose **Sandbox** as the **Resource**, and then select **Enabled**, and click the green **Create** button.  

<p><img alt="aws-enable-quick-actions" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-enable-quick-actions.png"/></p>

## Step 9: Find a bucket in Alarm

Use your bookmark to navigate back to the **Controls by State** report and filter on **GCP > Storage > Bucket > Access Control**.

<p><img alt="find_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/find-bucket-in-alarm.png"/></p>

## Step 10: Select a bucket in Alarm

Select a bucket in `Alarm` state from the list of buckets.

<p><img alt="select_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/choose-bucket-in-alarm.png"/></p>

## Step 11: Use a Quick Action

Select the **Actions** dropdown, and choose **Set Uniform Access Control**.

<p><img alt="expand-quick-actions-dropdown" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/quick-actions-dropdown.png"/></p>

## Step 12: Observe the change

Guardrails reports that the action was successful, and the control goes to the `OK` state.  

<p><img alt="observe-updated-control" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/bucket-ok.png"/></p>

## Step 13: Verify it worked

Open a tab to the GCP console, and navigate to the bucket. Confirm the Guardrails Quick Action has correctly set the bucket's access control property.

<p><img alt="observe-aws-console-result" src="/images/docs/guardrails/getting-started/getting-started-gcp/apply-quick-action/bucket-config.png"/></p>

## Step 14: Review

In this guide you increased the permissions scope in GCP, enabled Guardrails Quick Actions and, used a Quick Action to change a bucket's access control property.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/enable-enforcement) we’ll set Guardrails to automatically enforce these actions continuously.  

## Progress tracker
- [x] Prepare a GCP project for import to Guardrails
- [x] Connect a GCP project to Guardrails
- [x] Observe GCP Activity
- [x] Review Project-Wide Governance
- [x] Enable Your First Guardrails Policy Pack
- [x] Create a Static Exception to a Guardrails Policy
- [x] Create a Calculated Exception to a Guardrails GCP Policy
- [x] Send an Alert to Email
- [x] **Apply a Quick Action**
- [ ] Enable Automatic Enforcement
