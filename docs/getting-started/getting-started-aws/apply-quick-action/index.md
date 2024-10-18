---
title: Apply a Quick Action
sidebar_label: Apply a Quick Action
---


# Apply a Quick Action

In this guide we’ll show how you can enable Guardrails to perform [Quick Actions](/guardrails/docs/guides/quick-actions) that fix misconfigurations. In order to do that, you’ll need to add one permission to the Turbot IAM role.

This is the eighth guide in the *Getting started with AWS series*.


**Prerequisites**: 

- Completion of the first seven guides.

Until now we’ve operated Guardrails with the minimal permissions needed to discover resources, track changes, and alert on misconfigurations. 

## Step 1: Locate IAM role for Turbot Guardrails access

In the AWS Console, find the role you created in the [first guide](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/) and select the link.

<p><img alt="locate-iam-rule" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/locate-turbot-iam-role.png"/></p>

## Step 2: Prepare to add a permission

Expand the **Add permissions** dropdown.

<p><img alt="locate-add-permissions" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/locate-add-permissions.png"/></p>

## Step 3: Open policy editor

Choose **Create inline policy**.

<p><img alt="choose-create-inline-policy" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/choose-create-inline-policy.png"/></p>

## Step 4: Add the policy code

Choose **JSON**. Copy and past this code.

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

## Step 5: Name and create the policy

Assign a meaningful name, and select **Create policy**.

<p><img alt="name-and-create-policy" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/name-and-create-policy.png"/></p>

## Step 6: Find the Quick Actions policy type

Select **Policies** from the top-level navigation. In the search box, type `quick actions`. Select the **Turbot > Quick Actions > Enabled** policy type.

<p><img alt="find_quick_actions_policies" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/find-quick-actions-policies.png"/></p>

## Step 7: Open the new policy setting dialog

Select **New Policy Setting**.

<p><img alt="view-quick-actions-enabled-policy-type" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/view-quick-actions-enabled-policy-type.png"/></p>

## Step 8: Enable Quick Actions

Choose **Sandbox** as the **Resource**, choose **Enabled**, and select **Create**.  

<p><img alt="aws-enable-quick-actions" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-enable-quick-actions.png"/></p>

## Step 9: Find a bucket in Alarm for versioning

Navigate to the **Controls by State** report and filter on **AWS > S3 > Bucket > Versioning**.

<p><img alt="find_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/find-bucket-in-alarm-for-versioning.png"/></p>

## Step 10: Select a bucket with the versioning control in `Alarm`.

Select the bucket's link.

<p><img alt="select_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/select-bucket-in-alarm-for-versioning.png"/></p>

## Step 11: Take the Quick Action

Select the **Actions** dropdown, and choose **Enable Versioning**.

<p><img alt="expand-quick-actions-dropdown" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/expand-quick-actions-dropdown.png"/></p>

## Step 12: Observe the updated control

Guardrails reports that the action was successful, and the control goes to green.  

<p><img alt="observe-updated-control" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/observe-updated-control.png"/></p>

## Step 13: Confirm in the AWS console

Observe the result.

<p><img alt="observe-aws-console-result" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/observe-aws-console-result.png"/></p>

## Step 14: Review

In this guide you've learned how Guardrails enables you to perform [Quick Actions](/guardrails/docs/guides/quick-actions) that fix misconfigurations directly.


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
