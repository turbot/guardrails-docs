---
title: Send an Alert to Email
sidebar_label: Send an Alert to Email
---


# Send an Alert to Email

In this guide you'll learn how to enable Guardrails notifications and configure the notification rules to send email notifications. Similar configuration options exist to send notifications to Slack or Teams channels, and to generic webhooks. Our [launch week announcement blog post](/guardrails/blog/2023/10/guardrails-notifications) includes a demo of notifications in action.

This is the eighth guide in the *Getting started with AWS series*.

**Prerequisites**: 

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privileges.

## Step 1: Create policy setting

To enable notifications for your workspace, select **Policies** in the top navigation bar, and then search for `turbot notifications`. Select the **Turbot > Notifications** policy type.

<p><img alt="search-notifications-policy-type" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/search-notifications-policy-type.png"/></p>

Select the **New Policy Setting** button.

<p><img alt="view-turbot-notifications-policy-type" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/view-turbot-notifications-policy-type.png"/></p>

## Step 2: Choose level

Select the **Turbot** root node as the resource.

> [!NOTE]
> Notifications polices may only be created at the root level (aka Turbot level) of the resource hierarchy.

<p><img alt="view-turbot-notifications-policy-type" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/choose-turbot-root.png"/></p>

## Step 3: Choose setting

Choose the **Enabled** setting. Then select **Create**.

<p><img alt="enable-notifications" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/enable-notifications.png"/></p>

## Step 4: List notifications policies

Navigate back to the list of Notification policies by clicking on the word `Notifications` in the `Turbot > Notifications` breadcrumb.

<p><img alt="notifications-enabled" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/notifications-enabled.png"/></p>

## Step 5: Select Rules policy

Select the **Rule-Based Routing** policy type from the list of policies.

<p><img alt="notifications-enabled" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/locate-rule-based-routing.png"/></p>

## Step 6: View the policy

Select **New Policy Setting**.

<p><img alt="notifications-enabled" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/view-rule-based-routing.png"/></p>

## Step 7: Create notification rule

Again choose **Turbot** as the **Resource**. Copy and paste this rule, using one or more email addresses you want to notify. 
 
```yaml
- rules: NOTIFY $.control.state:alarm $.controlType.uri:'tmod:@turbot/aws-s3#/control/types/bucketVersioning'
  emails:
    - you@yourcompany.com
``` 
 
The rule will send an alert to the configured email address when any control enters the `Alarm` state for S3 bucket versioning. 

Select **Create**.

<p><img alt="create-notification-rule" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/create-notification-rule.png"/></p>

## Step 8: Find a bucket skipped by your calculated policy

Navigate to your bookmark for the **Controls by State** report, select the **Type** dropdown from the filter bar, and verify that the bucket you tagged in the [calculated policy guide](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception) is still in the `Skipped` state.

<p><img alt="find-skipped-bucket" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/find-skipped-bucket.png"/></p>

## Step 9: Trigger the notification

In the AWS console, update the tag value for the `environment` tag. Change its value from `development` to  `production`.  

<p><img alt="observe-untagged-bucket-in-alarm" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/observe-untagged-bucket-in-alarm.png"/></p>

The calculated policy setting, which had previously evaluated to `Skip`, now evaluates to `Check: Enabled`. Because you left the bucket’s versioning in the AWS default state – suspended – the bucket’s control for versioning now transitions to `Alarm`.  

## Step 10: Check your email

The alarm reported in the Guardrails console also appears in your inbox. You can alternatively configure Guardrails to send alerts to [Slack]([guardrails/docs/guides/notifications/templates#example-slack-template](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)) or [MS Teams](/guardrails/docs/guides/notifications/templates#example-ms-teams-template).

<p><img alt="view-email-notification" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/view-email-notification.png"/></p>

## Step 11: Review

In this guide you configured a simple notification rule and triggered a notification event.


## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action) you’ll learn how to configure for [Quick Actions]([/guardrails/docs/guides/quick-actions](https://turbot.com/guardrails/docs/guides/quick-actions#enabling-quick-actions)) so you can, for example, directly enable versioning on a bucket that’s now in the `Alarm` state and make it green.

## Progress tracker
- [x] Prepare an AWS Account for Import to Guardrails
- [x] Connect an AWS Account to Guardrails
- [x] Observe AWS Resource Activity
- [x] Enable Your First Policy Pack
- [x] Review Account-Wide Governance
- [x] Create a Static Exception to a Guardrails Policy
- [x] Create a Calculated Exception to a Guardrails Policy
- [x] **Send an Alert to Email**
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
