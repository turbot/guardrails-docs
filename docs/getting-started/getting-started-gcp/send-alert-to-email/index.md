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

## Step 1: Locate the `Turbot > Notifications` policy type

  
To enable notifications for your workspace, search top-level `Policies` for `turbot notifications` and click into the `Turbot > Notifications` policy type.  
<p><img alt="search-notifications-policy-type" src="/images/docs/guardrails/getting-started/getting-started-gcp/send-alert-to-email/search-notifications-policy-type.png"/></p>  


## Step 2: Enable notifications

Switch to the `Settings` tab and click `New Policy Setting`.
<p><img alt="create-turbot-notifications-setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/send-alert-to-email/create-turbot-notifications-setting.png"/></p>

Set `Policy Type` to `Turbot > Notifications`, and `Resource` to `Turbot`.

Choose the `Enabled` setting and click `Create`.

## Step 4: Create a notification rule

At the end of [Create a calculated exception](/guardrails/getting-started/getting-started-gc[/create_calculated_exception), your test bucket – the one you tagged with `environment:development` – was in a `Skipped` state for access control. To verify, revisit the `Controls by State` report, set the `Type` filter to `GCP > Storage > Bucket > Access Control`, and search for the bucket.  
  
Select `Turbot` as the resource. This policy must apply at that level.  
  
Enter this rule, along with one or more email addresses you want to notify.  
  
```yaml
- rules: |
   $.control.state:alarm $.controlType.uri:'tmod:@turbot/gcp-storage#/policy/types/bucketAccessControl’
  emails:
     - judell@turbot.com  
```  
<p><img alt="create_notification_rule" src="/images/docs/guardrails/getting-started/getting-started-gcp/send-alert-to-email/create-notification-rule.png"/></p>

Click `Update`.  


The rule will send an alert to the configured email address when any control enters the `Alarm` state for bucket access control.

## Step 4: Find a skipped bucket

At the end of [Create a calculated exception](/guardrails/getting-started/getting-started-gcp/create_calculated_exception), your test bucket – the one you tagged with `environment:development` – was in a `Skipped` state for access control. To verify, revisit the `Controls by State` report, set the `Type` filter to `GCP > Storage > Bucket > Access Control`, and search for the bucket.
<p><img alt="find-skipped-bucket" src="/images/docs/guardrails/getting-started/getting-started-gcp/send-alert-to-email/find-skipped-bucket.png"/></p>

## Step 5: Trigger the notification

Now, in the GCP console, remove the `environment:development` label. The calculated policy setting, which had evaluated to `Skip`, now evaluates to `Check: Uniform`.  And because you left the bucket’s access control in the fine-grained state, the bucket’s control for access control now transitions to `Alarm`.   
<p><img alt="observe-unlabeled-bucket-in-alarm" src="/images/docs/guardrails/getting-started/getting-started-gcp/send-alert-to-email/observe-unlabeled-bucket-in-alarm.png"/></p>  


## Step 6: Check email

  
Now check your email.

  
[image: gcp_view_email_notification]  
  
(unable to reproduce at the moment)

  
The alarm reported in the Guardrails console also appears in your inbox. You can alternatively configure Guardrails to send alerts to [Slack]([guardrails/docs/guides/notifications/templates#example-slack-template](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)) or [MS Teams](/guardrails/docs/guides/notifications/templates#example-ms-teams-template).  
  
  
Step 7: Review

Now that we have successfully alerted on controls, you can repeat this exercise with other Policy Packs from the [Guardrails Hub](hub.guardrails.com).   
  
  


## Next Steps

In the [next runbook](/guardrails/docs/runbooks/getting-started-gcp/apply-quick-action) you’ll learn how to configure for [Quick Actions]([/guardrails/docs/guides/quick-actions](https://turbot.com/guardrails/docs/guides/quick-actions#enabling-quick-actions)) so you can, for example, enable uniform access on a bucket that’s now in the `Alarm` state and make it green. Note that this will require one additional permission on the role you created in [the first runbook]([/](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)guardrails/docs/runbooks/getting-started-aws/connect-an-account): `s3:PutBucketVersioning`. 


## Progress tracker

- [x] [Connect a GCP Project to Guardrails](path)
- [x] [Observe GCP Activity](path)
- [x] [Enable Your First Guardrails Policy Pack](path)
- [x] [Review Account-Wide Bucket Access Control](path)
- [x] [Create a Static Exception to a Guardrails GCP Policy](path)
- [x] [Create a Calculated Exception to a Guardrails GCP Policy](path)
- [x] **Send an Alert to Email**
- [ ] [Apply a Quick Action](path)
- [ ] [Enable Automatic Enforcement](path)
