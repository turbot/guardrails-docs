---
title: Send an Alert to Email
sidebar_label: Send an Alert to Email
---


# Send an Alert to Email

In [the previous guide](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception) we saw notifications happening in the Guardrails console. Now let’s see how to receive those messages in  email. 

**Prerequisites**: 

- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)
- [Enable Your First Policy Pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack/)
- [Review Account-Wide Bucket Versioning](/guardrails/docs/getting-started/getting-started-aws/review-account-wide/)
- [Create a Static Exception to a Guardrails Policy](/guardrails/docs/getting-started/getting-started-aws/create-static-exception/)
- [Create a Calculated Exception to a Guardrails Policy](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception/)


In [the previous guide](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception) we saw notifications happening in the Guardrails console. Now let’s see how to receive those messages in  email. 

## Step 1: Locate the Turbot > Notifications policy type

  
To enable notifications for your workspace, search top-level `Policies` for `turbot notifications` and click into the `Turbot > Notifications` policy type.  

<p><img alt="search-notifications-policy-type" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/search-notifications-policy-type.png"/></p>

Click into the `Turbot Notifications` policy type.  

<p><img alt="view-turbot-notifications-policy-type" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/view-turbot-notifications-policy-type.png"/></p>

## Step 2: Enable notifications

  
Switch to the `Settings` tab and click `New Policy Setting`.

<p><img alt="create-turbot-notifications-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/create-turbot-notifications-setting.png"/></p>

Set the `Resource` to `Turbot`.

Choose the `Enabled` setting and click `Create`.  

<p><img alt="notifications-enabled" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/notifications-enabled.png"/></p>

## Step 3: Create a notification rule

From the `Policy Setting` page, click `Notifications` in the breadcrumb trail to return to the `Policy Type` page. Select `Rule-Based Routing` and click `New Policy Setting`.  
  
Set the `Resource` to `Turbot`.

  
Enter this rule, using one or more email addresses you want to notify.  
  
```yaml
- rules: |
   $.control.state:alarm $.controlType.uri:'tmod:@turbot/aws-s3#/control/types/bucketVersioning'
  emails:
     - judell@turbot.com
```  

<p><img alt="create-notification-rule" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/create-notification-rule.png"/></p>

Click `Create`.  


The rule will send an alert to the configured email address when any control enters the `Alarm` state for S3 bucket versioning.

## Step 4: Find the bucket skipped by your calculated policy

At the end of [Create a calculated exception](/guardrails/getting-started/getting-started-aws/create_calculated_exception), your test bucket – the one you tagged with `environment:development` – was in a `Skipped` state for versioning. To verify, revisit the `Controls by State` report, set the `Type` filter to `AWS > S3 > Bucket > Versioning`, and search for the bucket.

<p><img alt="find-skipped-bucket" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/find-skipped-bucket.png"/></p>

## Step 5: Trigger the notification

Now, in the AWS console, remove the `environment:development` tag. The calculated policy setting, which had evaluated to `Skip`, now evaluates to `Check: Enabled`.  And because you left the bucket’s versioning in the AWS default state – suspended – the bucket’s control for versioning now transitions to `Alarm`.   

<p><img alt="observe-untagged-bucket-in-alarm" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/observe-untagged-bucket-in-alarm.png"/></p>

## Step 6: Check email

  
Now check your email.

<p><img alt="view-email-notification" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/view-email-notification.png"/></p>

The alarm reported in the Guardrails console also appears in your inbox. You can alternatively configure Guardrails to send alerts to [Slack]([guardrails/docs/guides/notifications/templates#example-slack-template](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)) or [MS Teams](/guardrails/docs/guides/notifications/templates#example-ms-teams-template).

## Step 7: Review

Now that we have successfully alerted on controls, you can repeat this exercise with other Policy Packs from the [Guardrails Hub](hub.guardrails.com). 

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/apply-quick-action) you’ll learn how to configure for [Quick Actions]([/guardrails/docs/guides/quick-actions](https://turbot.com/guardrails/docs/guides/quick-actions#enabling-quick-actions)) so you can, for example, enable versioning on a bucket that’s now in the `Alarm` state and make it green. Note that this will require one additional permission on the role you created in [the first guide]([/](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)guardrails/docs/getting-started/getting-started-aws/connect-an-account): `s3:PutBucketVersioning`. 


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
