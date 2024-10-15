---
title: Send an Alert to Email
sidebar_label: Send an Alert to Email
---


# Send an Alert to Email

**Prerequisites**: 

- [Connect an Azure Account to Guardrails](/guardrails/docs/getting-started/getting-started-azure/connect-a-subscription/)
- [Observe Azure Resource Activity](/guardrails/docs/getting-started/getting-started-azure/observe-azure-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-azure/enable-policy-pack/)
- [Create a Static Exception to a Guardrails Azure Policy](/guardrails/docs/getting-started/getting-started-azure/create-static-exception/)
- [Create a Calculated Exception to a Guardrails Azure Policy](/guardrails/docs/getting-started/getting-started-azure/create-calculated-exception/)


In [the previous runbook](/guardrails/docs/runbooks/getting-started-azure/create-calculated-exception) we saw notifications happening in the Guardrails console. Now let’s see how to receive those messages in  email. 

## Step 1: Enable your workspace for notifications

  
To enable notifications for your workspace, search top-level `Policies` for `turbot notifications` and click into the `Turbot > Notifications` policy type.  

<p><img alt="azure_notifications_policy_type" src="/images/docs/guardrails/getting-started/getting-started-azure/send-alert-to-email/azure-notifications-policy-type.png"/></p>

Open the `Settings`, click into the `Turbot > Notifications` setting, click `Edit`, switch to `Enabled`, and click `Update`.  

<p><img alt="aws_start_6_update_turbot_notifications_setting" src="/images/docs/guardrails/getting-started/getting-started-azure/send-alert-to-email/aws-start-6-update-turbot-notifications-setting.png"/></p>

## Step 2: Create a notification rule

Search top-level `Policies` for `rule-based routing`, click into the policy type `Turbot > Notifications > Rule-Based Routing`, and click `New Policy Setting`.  
  
Select `Turbot` as the resource. This policy must apply at that level.  
  
Enter this rule, along with one or more email addresses you want to notify.  
  
```yaml
- rules: |
          NOTIFY $.control.state:alarm
  emails:
  - you@yourcompany.com  
```  

<p><img alt="aws_start_6_create_notification_rule" src="/images/docs/guardrails/getting-started/getting-started-azure/send-alert-to-email/aws-start-6-create-notification-rule.png"/></p>

Click `Update`.  


The rule will send an alert to the configured email address when any control enters the `Alarm` state.

## Step 3: Trigger the notification rule

At the end of [Create a calculated exception](/guardrails/docs/runbooks/getting-started-azure/create_calculated_exception), your test storage account – the one you tagged with `environment:development` – was in a `Skipped` state for TLS version. To verify, do a top-level search for the storage account, click into the resource, choose the `Controls` tab, and search for `azure storage tls version`.

<p><img alt="azure_refind_storage_account_tls_version_control" src="/images/docs/guardrails/getting-started/getting-started-azure/send-alert-to-email/azure-refind-storage-account-tls-version-control.png"/></p>

Now, in the Azure portal, remove the `environment:development` tag. The calculated policy setting, which had evaluated to `Skip`, now evaluates to `Check: TLS 1.2`.  And because you left the storage account in a different state  – TLS v1.1  – the storage account’s control for versioning now transitions to `Alarm`.   

<p><img alt="azure_observe_storage_account_in_alarm" src="/images/docs/guardrails/getting-started/getting-started-azure/send-alert-to-email/azure-observe-storage-account-in-alarm.png"/></p>

## Step 4: Check email

  
Now check your email.

<p><img alt="azure_view_email_notification" src="/images/docs/guardrails/getting-started/getting-started-azure/send-alert-to-email/azure-view-email-notification.png"/></p>

The alarm reported in the Guardrails console also appears in your inbox. You can alternatively configure Guardrails to send alerts to [Slack]([guardrails/docs/guides/notifications/templates#example-slack-template](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)) or [MS Teams](/guardrails/docs/guides/notifications/templates#example-ms-teams-template).

Now that we have successfully alerted on controls, you can repeat this exercise with other Policy Packs from the [Guardrails Hub](hub.guardrails.com). 

In the [next runbook](/guardrails/docs/runbooks/getting-started-azure/apply-quick-action) you’ll learn how to configure for [Quick Actions]([/guardrails/docs/guides/quick-actions](https://turbot.com/guardrails/docs/guides/quick-actions#enabling-quick-actions)) so you can, for example, correct the TLS version for the storage account that’s now in the `Alarm` state and make it green.


## Progress tracker

- [x] Connect an Azure Account to Guardrails
- [x] Observe Azure Resource Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] Create a Static Exception to a Guardrails Azure Policy
- [x] Create a Calculated Exception to a Guardrails Azure Policy
- [x] **Send an Alert to Email**
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
