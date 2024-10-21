---
title: Apply a Quick Action
sidebar_label: Apply a Quick Action
---

# Apply a Quick Action

In this guide we’ll show how you can enable Guardrails to perform [Quick Actions](/guardrails/docs/guides/quick-actions) that fix misconfigurations. A Quick Action empowers an administrator to apply a change directly to an underlying AWS resource. In order to do that for S3 bucket versioning, we will add one permission to the cross-account role you created in the first guide.

This is the ninth guide in the *Getting started with AWS series*.

**Prerequisites**: 

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privlidges.
- Access to an AWS account with administrative privlidges to add permissions to the Guardrails cross-account role.


## Step 1: Locate the IAM role

In the AWS Console, find the role you created in the [first guide](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/) and open its details by clicking the named link.

<p><img alt="locate-iam-rule" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/locate-turbot-iam-role.png"/></p>

## Step 2: Review role permissions

Expand the **Add permissions** dropdown.

<p><img alt="locate-add-permissions" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/locate-add-permissions.png"/></p>


## Step 3: Edit the IAM policy

Choose **Create inline policy**.

<p><img alt="choose-create-inline-policy" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/choose-create-inline-policy.png"/></p>

Choose **JSON**, and then copy and paste this code:

```json
{
"Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:PutBucketVersioning",
      "Resource": "*"
    }
  ]
}
```

Select **Next**.

<p><img alt="specify-permissions" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/specify-permissions.png"/></p>

## Step 4: Name the policy

Name the policy `PutBucketVersioningForGuardrails`, and select **Create policy**.

<p><img alt="name-and-create-policy" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/name-and-create-policy.png"/></p>

## Step 5: Find Quick Actions

Select **Policies** from the top-level navigation. In the search box, type `quick actions`, then select the **Turbot > Quick Actions > Enabled** policy type.

<p><img alt="find_quick_actions_policies" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/find-quick-actions-policies.png"/></p>

Select the green **New Policy Setting** button.

<p><img alt="view-quick-actions-enabled-policy-type" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/view-quick-actions-enabled-policy-type.png"/></p>

## Step 6: Enable Quick Actions

Choose **Sandbox** as the **Resource**, and then select **Enabled**, and click the green **Create** button.  

<p><img alt="aws-enable-quick-actions" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-enable-quick-actions.png"/></p>

## Step 7: Find a bucket in Alarm

Use your bookmark to navigate back to the **Controls by State** report and filter on **AWS > S3 > Bucket > Versioning**.

<p><img alt="find_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/find-bucket-in-alarm-for-versioning.png"/></p>

## Step 8: Select a bucket in Alarm

Select a bucket in `Alarm` state from the list of buckets.

<p><img alt="select_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/select-bucket-in-alarm-for-versioning.png"/></p>

## Step 9: Use a Quick Action

Select the **Actions** dropdown, and choose **Enable Versioning**.

<p><img alt="expand-quick-actions-dropdown" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/expand-quick-actions-dropdown.png"/></p>

## Step 10: Observe the change

Guardrails reports that the action was successful, and the control goes to the `OK` state.  

<p><img alt="observe-updated-control" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/observe-updated-control.png"/></p>

## Step 11: Check if it worked

Open a tab to the AWS console, and navigate to the S3 bucket.  Confirm the Guardrails Quick Action has correctly set the versioning status of the bucket.

<p><img alt="observe-aws-console-result" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/observe-aws-console-result.png"/></p>

## Step 12: Review

In this guide you added one permission to your cross-account role, enabled Guardrails Quick Actions, and used a Quick Action to change a bucket's versioning property.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/enable-enforcement) we’ll set Guardrails to automatically enforce these actions continuously.  


## Progress tracker

- [x] Prepare an AWS Account for import to Guardrails
- [x] Connect an AWS Account to Guardrails
- [x] Observe AWS Resource Activity
- [x] Enable Your First Policy Pack
- [x] Review Account-Wide Bucket Versioning
- [x] Create a Static Exception to a Guardrails Policy
- [x] Create a Calculated Exception to a Guardrails Policy
- [x] Send an Alert to Email
- [x] **Apply a Quick Action**
- [ ] Enable Automatic Enforcement
