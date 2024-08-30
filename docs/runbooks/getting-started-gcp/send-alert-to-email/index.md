---
title: Send an Alert to Email
sidebar_label: Send an Alert to Email
---


# Send an Alert to Email

**Prerequisites**: 

- [Connect a GCP Project to Guardrails](/guardrails/docs/runbooks/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity/)
- [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-gcp/attach-a-policy/)
- [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-static-exception/)
- [Create a Calculated Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-calculated-exception/)


In [the previous runbook](/guardrails/docs/runbooks/getting-started-gcp/create-calculated-exception) we saw notifications happening in the Guardrails console. Now let’s see how to receive those messages in  email. 

## Step 1: Enable your workspace for notifications

  
To enable notifications for your workspace, search top-level `Policies` for `turbot notifications` and click into the `Turbot > Notifications` policy type.  
<p><img alt="gcp_search_notifications_policy_type" src="/images/docs/guardrails/runbooks/getting-started-gcp/send-alert-to-email/gcp-search-notifications-policy-type.png"/></p><br/>  


Open the `Settings`, click into the `Turbot > Notifications` setting, click `Edit`, switch to `Enabled`, and click `Update`.  
<p><img alt="gcp_update_turbot_notifications_setting" src="/images/docs/guardrails/runbooks/getting-started-gcp/send-alert-to-email/gcp-update-turbot-notifications-setting.png"/></p><br/>

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
<p><img alt="gcp_create_notification_rule" src="/images/docs/guardrails/runbooks/getting-started-gcp/send-alert-to-email/gcp-create-notification-rule.png"/></p><br/>

Click `Update`.  


The rule will send an alert to the configured email address when any control enters the `Alarm` state.

## Step 3: Trigger the notification rule

At the end of [Create a calculated exception](/guardrails/docs/runbooks/getting-started-gcp/create_calculated_exception), your test bucket – the one you tagged with `environment:development` – was in a `Skipped` state for access control. To verify, do a top-level search for the bucket, click into the resource, choose the `Controls` tab, and search for `gcp access control`.
<p><img alt="gcp_refind_bucket_access_control_control" src="/images/docs/guardrails/runbooks/getting-started-gcp/send-alert-to-email/gcp-refind-bucket-access-control-control.png"/></p><br/>

Now, in the GCP console, remove the `environment:development` label. The calculated policy setting, which had evaluated to `Skip`, now evaluates to `Check: Uniform`.  And because you left the bucket’s access control in the fine-grained state, the bucket’s control for access control now transitions to `Alarm`.   
<p><img alt="aws_start_6_observe_bucket_in_alarm" src="/images/docs/guardrails/runbooks/getting-started-gcp/send-alert-to-email/aws-start-6-observe-bucket-in-alarm.png"/></p><br/>  


## Step 4: Check email

  
Now check your email.
<p><img alt="gcp_view_email_notification" src="/images/docs/guardrails/runbooks/getting-started-gcp/send-alert-to-email/gcp-view-email-notification.png"/></p><br/>

  
The alarm reported in the Guardrails console also appears in your inbox. You can alternatively configure Guardrails to send alerts to [Slack]([guardrails/docs/guides/notifications/templates#example-slack-template](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)) or [MS Teams](/guardrails/docs/guides/notifications/templates#example-ms-teams-template).

Now that we have successfully alerted on controls, you can repeat this exercise with other Policy Packs from the [Guardrails Hub](hub.guardrails.com). 

In the [next runbook](/guardrails/docs/runbooks/getting-started-gcp/apply-quick-action) you’ll learn how to configure for [Quick Actions]([/guardrails/docs/guides/quick-actions](https://turbot.com/guardrails/docs/guides/quick-actions#enabling-quick-actions)) so you can, for example, enable uniform access on the bucket that’s now in the `Alarm` state and make it green. Note that this will require one additional permission on the role you created in [the first runbook]([/](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)guardrails/docs/runbooks/getting-started-aws/connect-an-account): `s3:PutBucketVersioning`. 


## Progress tracker

1. [Connect a GCP Project to Guardrails](/guardrails/docs/runbooks/getting-started-gcp/connect-a-project/)

2. [Observe GCP Activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity/)

3. [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-gcp/attach-a-policy/)

4. [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-static-exception/)

5. [Create a Calculated Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-calculated-exception/)

6. **Send an Alert to Email**

7. [Apply a Quick Action](/guardrails/docs/runbooks/getting-started-gcp/apply-quick-action/)

8. [Enable Automatic Enforcement](/guardrails/docs/runbooks/getting-started-gcp/enable-enforcement/)
