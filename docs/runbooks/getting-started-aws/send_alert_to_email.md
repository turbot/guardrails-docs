---
title: "Send an alert to email"
template: Documentation
nav:
  title: "Send an alert to email"
---


# Send an alert to email

**Prerequisites**: 

- [Connect an AWS account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect_an_account)
- [Observe AWS resource activity](/guardrails/docs/runbooks/getting-started-aws/observe_aws_activity)
- [Attach a Guardrails policy](/guardrails/docs/runbooks/getting-started-aws/attach_a_policy)
- [Create a static exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create_static_exception)
- [Create a calculated exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create_calculated_exception)


In [the previous runbook](/guardrails/docs/runbooks/getting-started-aws/create_calculated_exception) we saw notifications happening in the Guardrails console. Now let’s see how to receive those messages in  email. 

## Step 1: Enable your workspace for notifications

  
To enable notifications for your workspace, search top-level `Policies` for `turbot notifications` and click into the `Turbot > Notifications` policy type.  
<p><img alt="aws_start_6_search_notifications_policy_type" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_6_search_notifications_policy_type.png"/></p><br/>  


Open the `Settings`, click into the `Turbot > Notifications` setting, click `Edit`, switch to `Enabled`, and click `Update`.  
<p><img alt="aws_start_6_update_turbot_notifications_setting" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_6_update_turbot_notifications_setting.png"/></p><br/>

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
<p><img alt="aws_start_6_create_notification_rule" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_6_create_notification_rule.png"/></p><br/>

Click `Update`.  


The rule will send an alert to the configured email address when any control enters the `Alarm` state.

## Step 3: Trigger the notification rule

At the end of [Create a calculated exception](/guardrails/docs/integrations/aws/getting-started-aws/create_calculated_exception), your test bucket – the one you tagged with `environment:development` – was in a `Skipped` state for versioning. To verify, do a top-level search for the bucket, click into the resource, choose the `Controls` tab, and search for `aws s3 versioning`.
<p><img alt="aws_start_6_refind_bucket_versioning_control" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_6_refind_bucket_versioning_control.png"/></p><br/>

Now, in the AWS console, remove the `environment:development` tag. The calculated policy setting, which had evaluated to `Skip`, now evaluates to `Check Enabled`.  And because you left the bucket’s versioning in the AWS default state – suspended – the bucket’s control for versioning now transitions to `Alarm.   
<p><img alt="aws_start_6_observe_bucket_in_alarm" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_6_observe_bucket_in_alarm.png"/></p><br/>  


## Step 4: Check email

  
Now check your email.
<p><img alt="aws_start_5_view_email_notification" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_5_view_email_notification.png"/></p><br/>

  
The alarm reported in the Guardrails console also appears in your inbox. You can alternatively configure Guardrails to send alerts to [Slack]([https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)) or [MS Teams](https://turbot.com/guardrails/docs/guides/notifications/templates#example-ms-teams-template).

Now that we have successfully alerted on controls, you can repeat this exercise with other Policy Packs from the [Guardrails Hub](hub.guardrails.com). 

In the [next runbook](/guardrails/docs/runbooks/getting-started-aws/apply_quick_action) you’ll learn how to configure for [Quick Actions]([/guardrails/docs/guides/quick-actions](https://turbot.com/guardrails/docs/guides/quick-actions#enabling-quick-actions)) so you can, for example, enable versioning on the bucket that’s now in the `Alarm` state and make it green. Note that this will require one additional permission on the role you created in [the first runbook]([/](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)guardrails/docs/runbooks/getting-started-aws/connect_an_account): `s3:PutBucketVersioning`. 


## You are here

1. [Connect an AWS account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect_an_account)

2. [Observe AWS resource activity](/guardrails/docs/runbooks/getting-started-aws/observe_aws_activity)

3. [Attach a Guardrails policy](/guardrails/docs/runbooks/getting-started-aws/attach_a_policy)

4. [Create a static exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create_static_exception)

5. [Create a calculated exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create_calculated_exception)

6. **Send an alert to email**

7. [Apply a Quick Action](/guardrails/docs/runbooks/getting-started-aws/apply_quick_action)

8. [Enable automatic enforcement](/guardrails/docs/runbooks/getting-started-aws/enable_enforcement)
