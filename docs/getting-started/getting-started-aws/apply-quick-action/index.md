---
title: Apply a Quick Action
sidebar_label: Apply a Quick Action
---


# Apply a Quick Action

**Prerequisites**: 

- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)
- [Enable Your First Policy Pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack/)
- [Review Account-Wide Bucket Versioning](/guardrails/docs/getting-started/getting-started-aws/review-account-wide/)
- [Create a Static Exception to a Guardrails Policy](/guardrails/docs/getting-started/getting-started-aws/create-static-exception/)
- [Create a Calculated Exception to a Guardrails Policy](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception/)
- [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-aws/send-alert-to-email/)


Until now we’ve operated Guardrails with the minimal permissions needed to discover resources, track changes, and alert on misconfigurations. In this guide we’ll show how you can enable Guardrails to perform [Quick Actions](/guardrails/docs/guides/quick-actions) that fix misconfigurations. In order to do that, you’ll need to add one permission to the Turbot role.

## Step 1: Add the s3:PutBucketVersioning permission.

Add this permission to the role you set up in [the first guide]([/](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)guardrails/docs/getting-started/getting-started-aws/connect-an-account). 

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

## Step 2: Location Turbot > Quick Actions > Enabled

Search **Policies** for `quick actions`. Select **Turbot > Quick Actions > Enabled**.

<p><img alt="find_quick_actions_policies" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/find-quick-actions-policies.png"/></p>

## Step 3: View Turbot > Quick Actions > Enabled policy type

Select **New Policy Setting**.

<p><img alt="view-quick-actions-enabled-policy-type" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/view-quick-actions-enabled-policy-type.png"/></p>

## Step 4: Enable Quick Actions

Choose your account as the **Resource**, choose **Enabled`, and select **Create**.  

<p><img alt="aws-enable-quick-actions" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-enable-quick-actions.png"/></p>

## Step 5: Find a bucket in Alarm for versioning

  
In [Send an alert to email]( /guardrails/docs/runbooks/getting-started-gcp/send-alert-to-email) we left your test bucket in the `Alarm` state. Locate it in **Controls by State** and select the control.  

<p><img alt="aws_search_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-search-bucket-in-alarm-for-quick-action.png"/></p>

## Step 6: Prepare to take a Quick Action

Select the **Actions** dropdown.

<p><img alt="aws-bucket-in-alarm-for-quick-action" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-bucket-in-alarm-for-quick-action.png"/></p>

## Step 7: Take a Quick Action to enable versioning

Choose **Enable Versioning**.  


Guardrails reports that the action was successful, and the control goes to green.  

<p><img alt="aws-quick-action-reports-success" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-quick-action-reports-success.png"/></p>

## Step 8: Review

  
Explore taking Quick Actions on other resources in your account. 

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/enable-enforcement) we’ll set Guardrails to automatically enforce these actions continuously.  
  


  
  
  



## Progress tracker

- [x] Connect an AWS Account to Guardrails
- [x] Observe AWS Resource Activity
- [x] Enable Your First Policy Pack
- [x] Review Account-Wide Bucket Versioning
- [x] Create a Static Exception to a Guardrails Policy
- [x] Create a Calculated Exception to a Guardrails Policy
- [x] Send an Alert to Email
- [x] **Apply a Quick Action**
- [ ] Enable Automatic Enforcement
