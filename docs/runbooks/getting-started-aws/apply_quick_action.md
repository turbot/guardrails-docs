---
title: "Apply a Quick Action"
template: Documentation
nav:
  title: "Apply a Quick Action"
---


# Apply a Quick Action

**Prerequisites**: 

- [Connect an AWS account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect_an_account)
- [Observe AWS resource activity](/guardrails/docs/runbooks/getting-started-aws/observe_aws_activity)
- [Attach a Guardrails policy](/guardrails/docs/runbooks/getting-started-aws/attach_a_policy)
- [Create a static exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create_static_exception)
- [Create a calculated exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create_calculated_exception)
- [Send an alert to email](/guardrails/docs/runbooks/getting-started-aws/send_alert_to_email)


* Additional AWS Permissions: `s3:PutBucketVersioning`

Until now we’ve operated Guardrails in read-only mode, with the minimal permissions needed to discover resources, track changes, and alert on misconfigurations. In this runbook we’ll show how you can enable Guardrails to perform [Quick Actions](/guardrails/docs/guides/quick-actions) that fix misconfigurations.

## Step 1: Add the s3:PutBucketVersioning permission.

Use this CloudFormation stack to add one write permission to the `turbot-service-readonly` role you set up in [the first runbook]([/](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)guardrails/docs/runbooks/getting-started-aws/connect_an_account). 

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Parameters:
  RoleName:
    Type: String
    Default: turbot-service-readonly
    Description: The role that Turbot uses to connect to this account
  PolicyName:
    Type: String
    Default: turbot-s3-putbucketversioning-policy
    Description: The name for the policy for S3 PutBucketVersioning access.
Resources:
  TurbotS3PutBucketVersioningPolicy:
    Type: "AWS::IAM::Policy"
    Properties:
      PolicyName: !Ref PolicyName
      Roles:
        - !Ref RoleName
      PolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Action:
              - "s3:PutBucketVersioning"
            Resource: "*"
Outputs:
  PolicyName:
    Description: "The name of the policy created"
    Value: !Ref PolicyName
  RoleName:
    Description: "The name of the role to which the policy is attached"
    Value: !Ref RoleName
```

## Step 2: Enable Quick Actions

Do a top-level search for `quick actions` and click into the `Turbot > Quick Actions > Enabled` setting.
<p><img alt="aws_start_7_find_quick_actions_policies" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_7_find_quick_actions_policies.png"/></p><br/>

It’s disabled by default. On its Policy Type page, click `New Policy Setting`, choose your Sandbox as the target resource, choose `Enabled`, and click `Create`.  
<p><img alt="aws_start_7_ready_to_enable_quick_actions" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_7_ready_to_enable_quick_actions.png"/></p><br/>

## Step 3: Find a bucket in Alarm for versioning

  
In [Send an alert to email]( /guardrails/docs/runbooks/getting-started-aws/send_alert_to_email) we left your test bucket in the `Alarm` state.  
  
Search for it.  
<p><img alt="aws_start_7_search_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_7_search_bucket_in_alarm_for_quick_action.png"/></p><br/>

Click into the resource, switch to the `Controls` tab, and search for `s3 bucket versioning`.
<p><img alt="aws_start_7_find_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_7_find_bucket_in_alarm_for_quick_action.png"/></p><br/>  
  


Click into the control and expand the `Actions` dropdown.  
<p><img alt="aws_start_7_versioning_quick_action_dropdown" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_7_versioning_quick_action_dropdown.png"/></p><br/>

## Step 4: Take a Quick Action to enable versioning  on a bucket

Choose `Enable Versioning`.  


Guardrails reports that the action was successful, and the control goes to green.  
<p><img alt="aws_start_7_quick_action_reports_success" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_7_quick_action_reports_success.png"/></p><br/>

For more detail about what happened here, go to the top-level `Reports` tab, search in the page for `Activity Ledger`, and filter on `Control Type` == `AWS > S3 > Bucket > Versioning`.  
<p><img alt="aws_start_7_quick_action_report_detail" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_7_quick_action_report_detail.png"/></p><br/>

The flow of notifications tells the story. Reading from the bottom up, Guardrails:  
  
- performs the action  
  
- notices the updated bucket  
  
- reevaluates the control.

In the [next runbook](/guardrails/docs/runbooks/getting-started-aws/enable_enforcement) we’ll set Guardrails to automatically enforce these actions continuously.  
  


  
  
  



## You are here

1. [Connect an AWS account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect_an_account)

2. [Observe AWS resource activity](/guardrails/docs/runbooks/getting-started-aws/observe_aws_activity)

3. [Attach a Guardrails policy](/guardrails/docs/runbooks/getting-started-aws/attach_a_policy)

4. [Create a static exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create_static_exception)

5. [Create a calculated exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create_calculated_exception)

6. [Send an alert to email](/guardrails/docs/runbooks/getting-started-aws/send_alert_to_email)

7. **Apply a Quick Action**

8. [Enable automatic enforcement](/guardrails/docs/runbooks/getting-started-aws/enable_enforcement)
