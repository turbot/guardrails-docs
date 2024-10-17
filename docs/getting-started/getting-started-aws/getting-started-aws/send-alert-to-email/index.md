---
title: Send an Alert to Email
sidebar_label: Send an Alert to Email
---


# Send an Alert to Email

In this guide you'll learn how route Guardrails console notifications to email.

This is the seventh guide in the *Getting started with AWS series*.

**Prerequisites**: 

- Completion of the first six guides.


## Step 1: Locate the Turbot > Notifications policy type

 
To enable notifications for your workspace, select **Policies** in the top navigation bar, and search for `turbot notifications`. Select the **Turbot > Notifications** policy type.

<p><img alt="search-notifications-policy-type" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/search-notifications-policy-type.png"/></p>

## Step 2: Create new policy setting

Choose **New Policy Setting**.

<p><img alt="view-turbot-notifications-policy-type" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/view-turbot-notifications-policy-type.png"/></p>

## Step 3: Choose Turbot root level

Choose **Turbot** as the resource.

<p><img alt="view-turbot-notifications-policy-type" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/choose-turbot-root.png"/></p>


## Step 4: Enable notifications

Choose the **Enabled** setting. Then select **Create**.

<p><img alt="enable-notifications" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/enable-notifications.png"/></p>

## Step 5: View notifications policy setting

Observe that the policy setting correctly reflects that notifications are enabled. Click on the word `Notifications` in the `Turbot > Notifications` breadcrumb.

<p><img alt="notifications-enabled" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/notifications-enabled.png"/></p>

## Step 6: View notifications policy type

Select **Rule-Based Routing**.

<p><img alt="notifications-enabled" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/locate-rule-based-routing.png"/></p>

## Step 7: View rule-based routing policy type

<p><img alt="notifications-enabled" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/view-rule-based-routing.png"/></p>

Select **New Policy Setting**.

## Step 8: Create a notification rule
 
Choose **Turbot** as the **Resource**. Copy and paste this rule, using one or more email addresses you want to notify. 
 
```yaml
- rules: |
   NOTIFY $.control.state:alarm $.controlType.uri:'tmod:@turbot/aws-s3#/control/types/bucketVersioning'
   emails:
     - you@yourcompany.com
``` 
 
The rule will send an alert to the configured email address when any control enters the `Alarm` state for S3 bucket versioning. 


Select **Create**.

<p><img alt="create-notification-rule" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/create-notification-rule.png"/></p>

## Step 9: Find the bucket skipped by your calculated policy

Navigate to **Controls by State**, choose the **Type** as **AWS > S3 > Bucket > Versioning**, and search for the bucket.

<p><img alt="find-skipped-bucket" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/find-skipped-bucket.png"/></p>

## Step 10: Trigger the notification

In the AWS console, change the tag to `environment:production` tag. The calculated policy setting, which had evaluated to `Skip`, now evaluates to `Check: Enabled`.  And because you left the bucket’s versioning in the AWS default state – suspended – the bucket’s control for versioning now transitions to `Alarm`.   

<p><img alt="observe-untagged-bucket-in-alarm" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/observe-untagged-bucket-in-alarm.png"/></p>

## Step 11: Check your email
 
The alarm reported in the Guardrails console also appears in your inbox. You can alternatively configure Guardrails to send alerts to [Slack]([guardrails/docs/guides/notifications/templates#example-slack-template](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)) or [MS Teams](/guardrails/docs/guides/notifications/templates#example-ms-teams-template).

<p><img alt="view-email-notification" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/view-email-notification.png"/></p>

## Step 12: Review

In this guide you've learned how to route Guardrails console notifications to email.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action) you’ll learn how to configure for [Quick Actions]([/guardrails/docs/guides/quick-actions](https://turbot.com/guardrails/docs/guides/quick-actions#enabling-quick-actions)) so you can, for example, directly enable versioning on a bucket that’s now in the `Alarm` state and make it green. Note that this will require one additional permission on the role you created in [the first guide]([/](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)guardrails/docs/getting-started/getting-started-aws/connect-an-account): `s3:PutBucketVersioning`. 


## Progress tracker

- [x] Connect an AWS Account to Guardrails
- [x] Observe AWS Resource Activity
- [x] Enable Your First Policy Pack
- [x] Review Account-Wide Bucket Versioning
- [x] Create a Static Exception to a Guardrails Policy
- [x] Create a Calculated Exception to a Guardrails Policy
- [x] **Send an Alert to Email**
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
