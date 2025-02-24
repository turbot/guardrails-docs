---
title: Notifications
sidebar_label: Notifications
---

# Notification Feature

Notifications in Guardrails allow real-time alerts to be sent about events that occur in your cloud infrastructure. Multiple event types (e.g. security policy violations, resource misconfiguration, resource changes, etc.) can be used to trigger the sending of a Notification. Notifications can be sent to email recipients and/or to Slack and MS Teams channels.

Turbot's Notification system is highly configurable, allowing users to set up rules and filters to control which events trigger notifications and how they are sent. Users can also customize the content and formatting of notifications to suit their needs.

![Slack Notification](/images/docs/guardrails/slack_notification_example.png)

## Delivery Channels

Guardrails currently supports the following delivery channels for notifications:

1. **Email notifications** are sent from `guardrails@system.turbot.com` for SaaS customers.  Enterprise customers running their own Guardrails environment can configure custom smtp hosts and `sent from` email address.  Email notifications may be sent directly to an email address, or to [profiles](#routing-to-profiles) based on the [configured permissions](/guardrails/docs/concepts/iam/permissions#guardrails-permissions) of the resource.

2. **Slack notifications** are sent via standard webhooks. For documentation on configuring webhooks for slack see: `https://api.slack.com/messaging/webhooks`
3. **Microsoft Teams notifications** are also sent via webhooks. For Teams documentation see: https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook?tabs=dotnet
4. **Event Streams** can be created and consumed using the [Guardrails Firehose](guides/firehose) feature.


### Routing to Profiles

You can send notifications to Guardrails user `profiles` based on the permissions of the resource that that triggered the event. Unlike email addresses and webhooks, which define a static target, profiles are routed dynamically; a notification rule states to route to a profile, and when the event occurs, the resource context is used to determine where to send the notification.  Guardrails will send the notification to all users that have been granted the specified permissions, via the email address in their profile.

```yaml
- rules: "NOTIFY $.oldControl.state:ok $.control.state:alarm"
  profiles":
    - "Account/Owner"
    - "Account/Admin"
```

Commonly, profiles are used to route notifications to the account team for the resource in scope, but you can use any permissions for notification routing.

```yaml
- rules: "NOTIFY $.oldControl.state:ok $.control.state:alarm"
  profiles":
    - "AWS/Admin"
    - "Turbot/Owner"
```

The `*` wildcard is supported, for example if you want to send to anyone with `Account` permissions
```yaml
- rules: "NOTIFY $.oldControl.state:ok $.control.state:alarm"
  profiles":
    - "Account/*"
```

There is also a special `Account/CC` level that can be used to send notifications to list of addresses defined on a per-account basis via the `Turbot > Notifications > CC` policy.  If you enable the resource-based routing via the `Turbot > Notifications > CC > Tag` policy, you can even route these notifications to specific addresses based on tags on the resource.

```yaml
- rules: "NOTIFY $.oldControl.state:ok $.control.state:alarm"
  profiles":
    - "Account/CC"
```


## Notification Triggers

### Control Triggers

Control notifications can be triggered any time a [Guardrails' Control]() runs. Typically these control notifications will be filtered based on your rules to ensure notifications are only sent when important changes occur. The most common example would be when a control state changes from `OK` state to `Alarm` state.

### Action Triggers

Notifications can also be triggered when a Guardrails Action modifies a cloud resource. Actions occur when a Control is configured to `Enforce` (e.g. `Enforce: Stop unapproved if new`).  Filters can also be used here to make sure notifications are tailored to specific use cases or resource types.

## Filter Rules

Filters are used to select what types of events should trigger notifications to be sent. There is one global policy setting for all notification settings within a Guardrails workspace. That policy is `Turbot > Notifications > Rule-Based Routing` this policy should be set at the root level for your workspace, any changes to the policy will take effect for the entire workspace.

Here is a base example of two common types of rules:

```yaml
- rules: "NOTIFY $.oldControl.state:ok $.control.state:alarm"
  emails:
    - d.schrute@dmi.com
  slackWebhookUrl: "https://hooks.slack.com/services/T02GC4A7C/BUDS3GB05P/iI27FCQjgiI27FCQ"
  msTeamsWebhookUrl: "https://dundermifflin.webhook.office.com/webhookb2/25bbe4f5-9d8e-485c-9fd/IncomingWebhook/534528d9c02/944a8e14"
  
- rules: "NOTIFY $.actionType.parent:'#/resource/types/securityGroup'"
  emails:
    - d.schrute@dmi.com
  slackWebhookUrl: "https://hooks.slack.com/services/T02GC4A7C/BUDS3GB05P/iI27FCQjgiI27FCQ"
  msTeamsWebhookUrl: "https://dundermifflin.webhook.office.com/webhookb2/25bbe4f5-9d8e-485c-9fd/IncomingWebhook/534528d9c02/944a8e14"
```

The first rule sends a notification to an email every time a control changes from `OK` state to `Alarm` state, and the second rule sends a notification when Guardrails takes an enforcement action against a security group rule (the parent of a security group rule is the `securityGroup`)

[See additional filter examples and documentation →](guides/notifications/filter-rules)

## Individual vs Batch Notifications

By default notifications are send individually, in real-time as they happen.  Here is an example notification via email:

![Individual Email Notification](/images/docs/guardrails/email_notification_example.png)

However, it is possible that either a policy change or a change within your application could trigger hundreds or thousands or notifications over a short period of time.  To prevent stress on messaging systems, we have implemented a notification batching system for these situations.  

![Batch Email Notification](/images/docs/guardrails/batch_email_example.png)

Guardrails keeps track of the number of notifications being sent to individual recipients, if the volume of messages for that recipient exceeds a defined threshold within a single minute, then Guardrails will switch to batch mode and send one notification with multiple alerts.  The threshold can be adjusted on enterprise environments using the policy: `Turbot > Workspace > Notifications Batch Size`.  

## Templates

Templates control the format of notifications. Separate templates exist for each delivery channel (Email, Slack, Teams) and for each delivery type (single and batch).  The default templates for each channel integrate [Guardrails Quick Actions](guides/quick-actions) and serve as a great jumping off point for your own customization. The default templates can be overridden by setting the following policies:

```
Turbot > Notifications > Email > Action Template > Subject
Turbot > Notifications > Email > Action Template > Body
Turbot > Notifications > Email > Action Template > Batch Subject
Turbot > Notifications > Email > Action Template > Batch Body

Turbot > Notifications > Email > Control Template > Subject
Turbot > Notifications > Email > Control Template > Body
Turbot > Notifications > Email > Control Template > Batch Subject
Turbot > Notifications > Email > Control Template > Batch Body

Turbot > Notifications > Slack > Action Template > Body
Turbot > Notifications > Slack > Action Template > Batch Body

Turbot > Notifications > Slack > Control Template > Body
Turbot > Notifications > Slack > Control Template > Batch Body

Turbot > Notifications > Microsoft Teams > Action Template > Body
Turbot > Notifications > Microsoft Teams > Action Template > Batch Body

Turbot > Notifications > Microsoft Teams > Control Template > Body
Turbot > Notifications > Microsoft Teams > Control Template > Batch Body
```

Templates are created using graphql for the query and [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) for the templating language (very similar to calculated policies). 

For examples and documentation on how to customize templates please see [Templates →](guides/notifications/templates)

## Enable Notifications

To enable notifications for your workspace, set the `Turbot > Notifications` policy to `Enabled` at the root level of your workspace:

![Individual Email Notification](/images/docs/guardrails/enable_notifications.png)

### Email Setup

If you are a SaaS customer, the smtp settings for email are predefined in your workspace, no additional setup for sending emails is necessary; however, you should take care to ask your system administrator to add `guardrails@system.turbot.com` to your email systems "allow list" to ensure notifications messages do not get filtered by spam/malware systems.

For enterprise customers running their own local Guardrails environment it is necessary to configure the following smtp policy settings:

```
Turbot > Notifications > Email > From Email Address  (e.g. guardrails_alerts@company.com)
Turbot > Notifications > Email > SMTP Endpoint       (e.g. smtp.company.com)
Turbot > Notifications > Email > SMTP Port           (e.g. 25)
Turbot > Notifications > Email > SMTP Username       (if no username is needed set to `null`)
Turbot > Notifications > Email > SMTP Password       (if no password is needed set to `null`)
```

Once notifications are enabled and email is configured we suggest triggering one of your filter rules and ensuring that message delivery works.

**Next**: [See how to configure filter rule-sets →](guides/notifications/filter-rules)