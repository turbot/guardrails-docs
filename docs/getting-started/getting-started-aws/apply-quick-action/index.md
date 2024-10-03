---
title: Apply a Quick Action
sidebar_label: Apply a Quick Action
---


# Apply a Quick Action

**Prerequisites**: 

- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)
- [Enable your First Policy Pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack/)
- [Review Account-Wide Bucket Versioning](/guardrails/docs/getting-started/getting-started-aws/review-account-wide/)
- [Create a Static Exception to a Guardrails AWS Policy](/guardrails/docs/getting-started/getting-started-aws/create-static-exception/)
- [Create a Calculated Exception to a Guardrails AWS Policy](/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception/)
- [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-aws/send-alert-to-email/)


Until now we’ve operated Guardrails in read-only mode, with the minimal permissions needed to discover resources, track changes, and alert on misconfigurations. In this runbook we’ll show how you can enable Guardrails to perform [Quick Actions](/guardrails/docs/guides/quick-actions) that fix misconfigurations.

## Step 1: Add the s3:PutBucketVersioning permission.

Use this CloudFormation stack to add one write permission to the `turbot-service-readonly` role you set up in [the first runbook]([/](https://turbot.com/guardrails/docs/guides/notifications/templates#example-slack-template)guardrails/docs/runbooks/getting-started-aws/connect-an-account). 

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
<p><img alt="aws_start_7_find_quick_actions_policies" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-start-7-find-quick-actions-policies.png"/></p>

It’s disabled by default. On its Policy Type page, click `New Policy Setting`, choose your Sandbox as the target resource, choose `Enabled`, and click `Create`.  
<p><img alt="aws_start_7_ready_to_enable_quick_actions" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-start-7-ready-to-enable-quick-actions.png"/></p>

## Step 3: Find a bucket in Alarm for versioning

  
In [Send an alert to email]( /guardrails/docs/runbooks/getting-started-aws/send-alert-to-email) we left your test bucket in the `Alarm` state.  
  
Search for it.  
<p><img alt="aws_start_7_search_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-start-7-search-bucket-in-alarm-for-quick-action.png"/></p>

Click into the resource, switch to the `Controls` tab, and search for `s3 bucket versioning`.
<p><img alt="aws_start_7_find_bucket_in_alarm_for_quick_action" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-start-7-find-bucket-in-alarm-for-quick-action.png"/></p>  
  


Click into the control and expand the `Actions` dropdown.  
<p><img alt="aws_start_7_versioning_quick_action_dropdown" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-start-7-versioning-quick-action-dropdown.png"/></p>

## Step 4: Take a Quick Action to enable versioning on a bucket

Choose `Enable Versioning`.  


Guardrails reports that the action was successful, and the control goes to green.  
<p><img alt="aws_start_7_quick_action_reports_success" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-start-7-quick-action-reports-success.png"/></p>

For more detail about what happened here, go to the top-level `Reports` tab, search in the page for `Activity Ledger`, and filter on `Control Type` == `AWS > S3 > Bucket > Versioning`.  
<p><img alt="aws_start_7_quick_action_report_detail" src="/images/docs/guardrails/getting-started/getting-started-aws/apply-quick-action/aws-start-7-quick-action-report-detail.png"/></p>

The flow of notifications tells the story. Reading from the bottom up, Guardrails:  
  
- performs the action  
  
- notices the updated bucket  
  
- reevaluates the control.

In the [next runbook](/guardrails/docs/runbooks/getting-started-aws/enable-enforcement) we’ll set Guardrails to automatically enforce these actions continuously.  
  


  
  
  



## Progress tracker

- [x] [Connect an AWS Account to Guardrails(path)
- [x] [Observe AWS Resource Activity(path)
- [x] [Enable your First Policy Pack(path)
- [x] [Review Account-Wide Bucket Versioning(path)
- [x] [Create a Static Exception to a Guardrails AWS Policy(path)
- [x] [Create a Calculated Exception to a Guardrails AWS Policy(path)
- [x] [Send an Alert to Email(path)
- [x] **Apply a Quick Action**
- [ ] [Enable Automatic Enforcement](path)
