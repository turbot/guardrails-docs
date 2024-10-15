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

  
To enable notifications for your workspace, select **Policies** in the top navigation bar, and search for  `turbot notifications`. Select the **Turbot > Notifications** policy type.

<p><img alt="search-notifications-policy-type" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/search-notifications-policy-type.png"/></p>

## Step 2: View Turbot Notifications policy type

Choose **New Policy Setting**.

<p><img alt="view-turbot-notifications-policy-type" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/view-turbot-notifications-policy-type.png"/></p>

## Step 3: Enable notifications

Choose **Turbot** as the **Resource, and choose the `Enabled` setting. Then select **Create**.

<p><img alt="enable-notifications" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/enable-notifications.png"/></p>

Step 4: View notifications policy setting  

<p><img alt="notifications-enabled" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/notifications-enabled.png"/></p>

## Step 5: Locate the Turbot > Notifications > Rule-Based Routing policy typeReturn to the **Turbot > Notifications** policy type. select **Rule-Based Routing**, then select **New Policy Setting**.

<p><img alt="locate-rule-based-routing" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/locate-rule-based-routing.png"/></p>

## Step 6: Create a notification rule

  
Choose **Turbot** as the **Resource** and enter this rule, using one or more email addresses you want to notify.  
  
```yaml
- rules: |
   NOTIFY $.control.state:alarm $.controlType.uri:'tmod:@turbot/aws-s3#/control/types/bucketVersioning'
  emails:
     - you@yourcompany.com
```  
  
The rule will send an alert to the configured email address when any control enters the `Alarm` state for S3 bucket versioning.  

<p><img alt="create-notification-rule" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/create-notification-rule.png"/></p>

## Step 7: Find the bucket skipped by your calculated policy

At the end of [Create a calculated exception](/guardrails/getting-started/getting-started-aws/create_calculated_exception), your test bucket – the one you tagged with `environment:development` – was in a `Skipped` state for versioning. To verify, revisit **Controls by State**, choose the **Type** as **AWS > S3 > Bucket > Versioning**, and search for the bucket.

<p><img alt="find-skipped-bucket" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/find-skipped-bucket.png"/></p>

## Step 8: Trigger the notification

Now, in the AWS console, remove the `environment:development` tag. The calculated policy setting, which had evaluated to `Skip`, now evaluates to `Check: Enabled`.  And because you left the bucket’s versioning in the AWS default state – suspended – the bucket’s control for versioning now transitions to `Alarm`.   

<p><img alt="observe-untagged-bucket-in-alarm" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/observe-untagged-bucket-in-alarm.png"/></p>

## Step 9: Check email

  
Now check your email. The alarm reported in the Guardrails console also appears in your inbox. You can alternatively configure Guardrails to send alerts to [Slack]([guardrails/docs/guides/notifications/templates#example-slack-template](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)) or [MS Teams](/guardrails/docs/guides/notifications/templates#example-ms-teams-template).

<p><img alt="view-email-notification" src="/images/docs/guardrails/getting-started/getting-started-aws/send-alert-to-email/view-email-notification.png"/></p>

## Step 10: Review

Update your notification rule to also handle transitions from `OK` to `Alarm`.

```yaml
- rules: |
   NOTIFY $.oldControl.state:skipped $.control.state:alarm $.controlType.uri:'tmod:@turbot/aws-s3#/control/types/bucketVersioning'
   NOTIFY $.oldControl.state:ok $.control.state:alarm $.controlType.uri:'tmod:@turbot/aws-s3#/control/types/bucketVersioning'
  emails:
     - judell@turbot.com
```  
  
Find a bucket that’s `OK` for versioning, disable versioning, and verify that you see the alarm both in the Guardrails console and in email.

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
