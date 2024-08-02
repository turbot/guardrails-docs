---
title: Connect an AWS account to Guardrails
sidebar_label: Connect an AWS account to Guardrails
---


# Connect an AWS account to Guardrails

  
**Prerequisites**:

A Turbot account with admin privilege, and a top-level `Sandbox` folder.

## Create an AWS IAM role for Guardrails

You’ll need a role that grants Turbot minimal permissions to discover resources in your AWS account and monitor changes. Use this CloudFormation stack. When prompted for `TurbotExternalId`, provide a random guid and save it for step 2.  

```
AWSTemplateFormatVersion: '2010-09-09'
Parameters:
  RoleName:
    Type: String
    Default: turbot-service-readonly
    Description: The role that Turbot uses to connect to this account
  PolicyName:
    Type: String
    Default: turbot-readonly-events-sns
    Description: The name for the policy for SNS and Events write access.
  TurbotAccountId:
    Type: String
    Default: 287590803701
    Description: >
      The AWS Account ID where Turbot is installed. This will be added to the
      trust policy of the role to allow access for Turbot Defaults to the Turbot
      US SaaS account
  TurbotExternalId:
    Type: String
    NoEcho: true
    MinLength: 1
    Description: |
      The AWS External ID to add to the trust policy of the Turbot role
Resources:
  TurbotReadOnlyRole:
    Type: "AWS::IAM::Role"
    Properties:
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              AWS: !Sub "arn:aws:iam::${TurbotAccountId}:root"
            Action:
              - "sts:AssumeRole"
            Condition:
              StringEquals:
                "sts:ExternalId": !Ref TurbotExternalId
      Path: /turbot/core/
      ManagedPolicyArns:
        - "arn:aws:iam::aws:policy/ReadOnlyAccess"
      RoleName: !Ref RoleName
  TurbotSNSEventsPolicy:
    Type: "AWS::IAM::Policy"
    Properties:
      PolicyName: !Ref PolicyName
      Roles:
        - !Ref RoleName
      PolicyDocument:
        Version: 2012-10-17
        Statement:
          - Sid: TurbotEvents
            Effect: Allow
            Action:
              - "events:PutEvents"
              - "events:EnableRule"
              - "events:DisableRule"
              - "events:PutRule"
              - "events:DeleteRule"
              - "events:PutTargets"
              - "events:RemoveTargets"
              - "events:TagResource"
              - "events:UntagResource"
            Resource:
              - !Sub "arn:aws:events:*:${AWS::AccountId}:rule/turbot_aws_api_events*"
          - Sid: TurbotSNS
            Effect: Allow
            Action:
              - "sns:TagResource"
              - "sns:UntagResource"
              - "sns:CreateTopic"
              - "sns:DeleteTopic"
              - "sns:SetTopicAttributes"
              - "sns:Publish"
              - "sns:Subscribe"
              - "sns:ConfirmSubscription"
              - "sns:AddPermission"
              - "sns:RemovePermission"
              - "sns:Unsubscribe"
            Resource:
              - !Sub "arn:aws:sns:*:${AWS::AccountId}:turbot_aws_api_handler_global"
              - !Sub "arn:aws:sns:*:${AWS::AccountId}:turbot_aws_api_handler_global:*"
    DependsOn:
      - TurbotReadOnlyRole
  EventHandlersGlobalRole:
    Type: 'AWS::IAM::Role'
    Properties: 
      RoleName: "turbot_aws_api_events_global"
      Path: "/turbot/"
      AssumeRolePolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Action: "sts:AssumeRole"
            Effect: "Allow"
            Principal:
              Service: "events.amazonaws.com"
      Policies:
        - PolicyName: "aws_api_events_policy"
          PolicyDocument:
            Version: "2012-10-17"
            Statement:
              - Effect: "Allow"
                Action: 
                  - "events:PutEvents"
                Resource: !Sub "arn:aws:events:*:${AWS::AccountId}:event-bus/default"
```

  
The `Permissions` tab of the resulting `turbot-service-readonly` role:
<p><img alt="aws_start_1_turbot_service_readonly_permissions" src="/images/docs/guardrails/runbooks/getting-started-aws/connect-an-account/aws-start-1-turbot-service-readonly-permissions.png"/></p><br/>  
  
Copy the role ARN and proceed to step 2.

## Connect the AWS Account

Login to Guardrails

Click the top-level `Connect`
<p><img alt="aws_start_1_top_level_connect" src="/images/docs/guardrails/runbooks/getting-started-aws/connect-an-account/aws-start-1-top-level-connect.png"/></p><br/>

Click `AWS Account`  
  
Use the Parent Resource dropdown to select the `Sandbox` folder.

Enter the AWS Account ID for the account you are importing.

Copy the IAM Role ARN created earlier and paste it into the field.

Provide the [External ID](https://turbot.com/guardrails/docs/faq/general-faq#how-does-guardrails-protect-my-aws-account-from-the-confused-deputy-problem) you created in Step 1.
<p><img alt="aws_start_1_ready_to_import" src="/images/docs/guardrails/runbooks/getting-started-aws/connect-an-account/aws-start-1-ready-to-import.png"/></p><br/>

Click `Import`.  


Wait for the progress bar to complete.
<p><img alt="aws_start_1_aws_progress_bar" src="/images/docs/guardrails/runbooks/getting-started-aws/connect-an-account/aws-start-1-aws-progress-bar.png"/></p><br/>

This process takes a while, and you’ll see the bars fluctuate. Note that error messages, like "Try again later: error in handling command", are not uncommon and should resolve as the process iterates to completion.  


## Validate the import

When the process completes, navigate to `Turbot > Sandbox > YOUR_ACCOUNT`

  
Search the `Controls` tab for `aws account cmdb`
<p><img alt="aws_start_1_account_cmdb" src="/images/docs/guardrails/runbooks/getting-started-aws/connect-an-account/aws-start-1-account-cmdb.png"/></p><br/>

When the control is green, Turbot has successfully connected to your account.

In the [next runbook](/guardrails/docs/runbooks/getting-started-aws/observe-aws-activity) we’ll see how Guardrails watches your account and reacts to resource changes.


## Progress tracker

1. **Connect an AWS account to Guardrails**

2. [Observe AWS resource activity](/guardrails/docs/runbooks/getting-started-aws/observe-aws-activity/)

3. [Attach a Guardrails policy](/guardrails/docs/runbooks/getting-started-aws/attach-a-policy/)

4. [Create a static exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create-static-exception/)

5. [Create a calculated exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create-calculated-exception/)

6. [Send an alert to email](/guardrails/docs/runbooks/getting-started-aws/send-alert-to-email/)

7. [Apply a Quick Action](/guardrails/docs/runbooks/getting-started-aws/apply-quick-action/)

8. [Enable automatic enforcement](/guardrails/docs/runbooks/getting-started-aws/enable-enforcement/)