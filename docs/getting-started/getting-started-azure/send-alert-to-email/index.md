---
title: Send an Alert to Email
sidebar_label: Send an Alert to Email
---


# Send an Alert to Email

In this guide you'll learn how to enable Guardrails notifications and configure the notification rules to send email notifications. Similar configuration options exist to send notifications to Slack or Teams channels, and to generic webhooks. Our [launch week announcement blog post](/guardrails/blog/2023/10/guardrails-notifications) includes a demo of notifications in action.

This is the eighth guide in the *Getting started with Azure series*.

**Prerequisites**: 

- Completion of the previous guides in this series.
- Access to the Guardrails console with administrative privileges.

## Step 1: Create policy setting

To enable notifications for your workspace, select **Policies** in the top navigation bar, and then search for `turbot notifications`. Select the **Turbot > Notifications** policy type.

<p><img alt="search-notifications-policy-type" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-aws/send-alert-to-email/search-notifications-policy-type.png"/></p>

Select the **New Policy Setting** button.

<p><img alt="view-turbot-notifications-policy-type" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-aws/send-alert-to-email/view-turbot-notifications-policy-type.png"/></p>

## Step 2: Choose level

Select the **Turbot** root node as the resource.

> [!NOTE]
> Notifications polices may only be created at the root level (aka Turbot level) of the resource hierarchy.

<p><img alt="view-turbot-notifications-policy-type" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-aws/send-alert-to-email/choose-turbot-root.png"/></p>

## Step 3: Choose setting

Choose the **Enabled** setting. Then select **Create**.

<p><img alt="enable-notifications" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-aws/send-alert-to-email/enable-notifications.png"/></p>

## Step 4: List notifications policies

Navigate back to the list of Notification policies by clicking on the word `Notifications` in the `Turbot > Notifications` breadcrumb.

<p><img alt="notifications-enabled" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-aws/send-alert-to-email/notifications-enabled.png"/></p>

## Step 5: Select Rules policy

Select the **Rule-Based Routing** policy type from the list of policies.

<p><img alt="notifications-enabled" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-aws/send-alert-to-email/locate-rule-based-routing.png"/></p>

## Step 6: View the policy

Select **New Policy Setting**.

<p><img alt="notifications-enabled" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-aws/send-alert-to-email/view-rule-based-routing.png"/></p>


## Step 7: Create notification rule

Again choose **Turbot** as the **Resource**. Copy and paste this rule, using one or more email addresses you want to notify. 
 
```yaml
- rules: NOTIFY $.control.state:alarm $.control.state:alarm $.controlType.uri:'tmod:@turbot/azure-storage#/policy/types/storageAccountMinimumTlsVersion'
  emails:
    - you@yourcompany.com
``` 
 
The rule will send an alert to the configured email address when any control enters the `Alarm` state for storage account TLS version.

Select **Create**.

<p><img alt="create-rule" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/send-alert-to-email/raw-create-notification-rule.png"/></p>

## Step 8: Find the storage account skipped by your calculated policy

At the end of [Create a calculated exception](/guardrails/getting-started/getting-started-gcp/create_calculated_exception), your test storage account – the one you tagged with `environment:development` – was in a `Skipped` state for access control. To verify, revisit **Controls by State**, choose the **Type** as **Azure > Storage > Storage Account > Minimum TLS Version**, and search for the bucket.

<p><img alt="find-skipped" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/send-alert-to-email/raw-find-skipped.png"/></p>

## Step 9: Trigger the notification

Now, in the Azure portal console, change the tag `environment:development` to `environment:production`. The calculated policy setting, which had evaluated to `Skip`, now evaluates to `Check: TLS 1.2`. And because you left the setting at TLS 1.0, the control for that setting now transitions to `Alarm`.   

<p><img alt="observe-untagged" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-gcp/send-alert-to-email/raw-storage-account-in-alarm.png"/></p>  


## Step 10: Check your email

The alarm reported in the Guardrails console also appears in your inbox. You can alternatively configure Guardrails to send alerts to [Slack]([guardrails/docs/guides/notifications/templates#example-slack-template](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)) or [MS Teams](/guardrails/docs/guides/notifications/templates#example-ms-teams-template).

<p><img alt="view-email-notification" src="/home/jon/guardrails-docs/docs/getting-started/getting-started-azure/send-alert-to-email/view-email-notification.png"/></p>

## Step 11: Review

In this guide you configured a simple notification rule and triggered a notification event.


## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action) you’ll learn how to configure for [Quick Actions]([/guardrails/docs/guides/quick-actions](https://turbot.com/guardrails/docs/guides/quick-actions#enabling-quick-actions)) so you can, for example, directly enable uniform access on a bucket that’s now in the `Alarm` state and make it green.


## Progress tracker

- [x] Prepare an Azure Subscription for Import to Guardrails
- [x] Connect an Azure Subscription to Guardrails
- [x] Observe Azure Resource Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] Review Subscription-Wide Governance
- [x] Create a Static Exception to a Guardrails Azure Policy
- [x] Create a Calculated Exception to a Guardrails Azure Policy
- [x] **Send an Alert to Email**
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
