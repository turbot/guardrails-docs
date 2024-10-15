---
title: Send an Alert to Email
sidebar_label: Send an Alert to Email
---


# Send an Alert to Email

In [the previous runbook](/guardrails/docs/runbooks/getting-started-gcp/create-calculated-exception) we saw notifications happening in the Guardrails console. Now let’s see how to receive those messages in  email. 

**Prerequisites**: 

- [Connect a GCP Project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack/)
- [Review Account-Wide Bucket Access Control](/guardrails/docs/getting-started/getting-started-gcp/review-account-wide/)
- [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/getting-started/getting-started-gcp/create-static-exception/)
- [Create a Calculated Exception to a Guardrails GCP Policy](/guardrails/docs/getting-started/getting-started-gcp/create-calculated-exception/)


In [the previous runbook](/guardrails/docs/runbooks/getting-started-gcp/create-calculated-exception) we saw notifications happening in the Guardrails console. Now let’s see how to receive those messages in  email. 

## Step 1: Locate the Turbot > Notifications policy type

  
To enable notifications for your workspace, select **Policies** in the top navigation bar, and search for  `turbot notifications`. Select the **Turbot > Notifications** policy type.  

<p><img alt="search-notifications-policy-type" src="/images/docs/guardrails/getting-started/getting-started-gcp/send-alert-to-email/search-notifications-policy-type.png"/></p>

Step 2: Create new policy setting

Choose **New Policy Setting**.

<p><img alt="view-turbot-notifications-policy-type" src="/images/docs/guardrails/getting-started/getting-started-gcp/send-alert-to-email/view-turbot-notifications-policy-type.png"/></p>

## Step 3: Enable notifications

Choose **Turbot** as the **Resource**, and choose the **Enabled** setting. Then select **Create**.

<p><img alt="enable-notifications" src="/images/docs/guardrails/getting-started/getting-started-gcp/send-alert-to-email/enable-notifications.png"/></p>

## Step 4: View notifications policy setting

Observe that notifications are now enabled.  

<p><img alt="notifications-enabled" src="/images/docs/guardrails/getting-started/getting-started-gcp/send-alert-to-email/notifications-enabled.png"/></p>

## Step 5: Locate the Turbot > Notifications > Rule-Based Routing policy type

Return to the **Turbot > Notifications** policy type. select **Rule-Based Routing**, then select **New Policy Setting**.

<p><img alt="locate-rule-based-routing" src="/images/docs/guardrails/getting-started/getting-started-gcp/send-alert-to-email/locate-rule-based-routing.png"/></p>

## Step 6: Create a notification rule

Choose **Turbot** as the **Resource** and enter this rule, using one or more email addresses you want to notify.  
  
  
```yaml
- rules: |
   NOTIFY $.oldControl.state:skipped $.control.state:alarm $.controlType.uri:'tmod:@turbot/gcp-storage#/control/types/bucketAccessControl'
  emails:
     - you@yourcompany.com
```  

<p><img alt="create_notification_rule" src="/images/docs/guardrails/getting-started/getting-started-gcp/send-alert-to-email/create-notification-rule.png"/></p>

Click `Create`.  


The rule will send an alert to the configured email address when any control enters the `Alarm` state for bucket access control.

## Step 7: Find the bucket skipped by your calculated policy

At the end of [Create a calculated exception](/guardrails/getting-started/getting-started-gcp/create_calculated_exception), your test bucket – the one you tagged with `environment:development` – was in a `Skipped` state for access control. To verify, revisit **Controls by State**, choose the **Type** as **GCP > Storage > Bucket > Access Control**, and search for the bucket.

<p><img alt="find-skipped-bucket" src="/images/docs/guardrails/getting-started/getting-started-gcp/send-alert-to-email/find-skipped-bucket.png"/></p>

## Step 8: Trigger the notification

Now, in the GCP console, remove the `environment:development` label. The calculated policy setting, which had evaluated to `Skip`, now evaluates to `Check: Uniform`.  And because you left the bucket’s access control in the fine-grained state, the bucket’s control for access control now transitions to `Alarm`.   

<p><img alt="observe-unlabeled-bucket-in-alarm" src="/images/docs/guardrails/getting-started/getting-started-gcp/send-alert-to-email/observe-unlabeled-bucket-in-alarm.png"/></p>

## Step 9: Check email

  
Now check your email. The alarm reported in the Guardrails console also appears in your inbox. You can alternatively configure Guardrails to send alerts to [Slack]([guardrails/docs/guides/notifications/templates#example-slack-template](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)) or [MS Teams](/guardrails/docs/guides/notifications/templates#example-ms-teams-template).  

<p><img alt="view_email_notification" src="/images/docs/guardrails/getting-started/getting-started-gcp/send-alert-to-email/view-email-notification.png"/></p>

## Step 10: Review

Update your notification rule to handle transitions from `OK` to `Alarm`.

```yaml
- rules: |
   NOTIFY $.oldControl.state:skipped $.control.state:alarm $.controlType.uri:'tmod:@turbot/gcp-storage#/control/types/bucketAccessControl'
   NOTIFY $.oldControl.state:ok $.control.state:alarm $.controlType.uri:'tmod:@turbot/gcp-storage#/control/types/bucketAccessControl'
  emails:
     - judell@turbot.com
```  
  
Find a bucket that’s `OK` for access control, set it to fine-grained, and verify that you see the alarm both in the Guardrails console and in email.  


## Next Steps

In the [next guide](/guardrails/docs/runbooks/getting-started-gcp/apply-quick-action) you’ll learn how to configure for [Quick Actions]([/guardrails/docs/guides/quick-actions](https://turbot.com/guardrails/docs/guides/quick-actions#enabling-quick-actions)) so you can, for example, directly enable uniform access on a bucket that’s now in the `Alarm` state and make it green. Note that this will require one additional permission on the role you created in [the first guide]([/](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)guardrails/docs/runbooks/getting-started-aws/connect-an-account): `s3:PutBucketVersioning`. 


## Progress tracker

- [x] Connect a GCP Project to Guardrails
- [x] Observe GCP Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] Review Account-Wide Bucket Access Control
- [x] Create a Static Exception to a Guardrails GCP Policy
- [x] Create a Calculated Exception to a Guardrails GCP Policy
- [x] **Send an Alert to Email**
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
