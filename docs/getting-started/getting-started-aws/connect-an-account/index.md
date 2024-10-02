---
title: Connect an AWS Account to Guardrails
sidebar_label: Connect an AWS Account to Guardrails
---


# Connect an AWS Account to Guardrails

  
**Prerequisites**:

Access to the Guardrails console with admin privilege, and a top-level `Sandbox` folder.

## Step 1: Create an AWS IAM role for Guardrails

You’ll need an IAM role that grants Guardrails read-only permissions to discover [resources](/guardrails/docs/reference/glossary#resource) in your AWS account and monitor changes. Use this CloudFormation stack to facilitate creating this role. When prompted for `TurbotExternalId`, provide a random GUID and also save it for step 2.  

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

  
Copy the role ARN and proceed to step 2.

## Step 2: Connect the AWS Account

Login to Guardrails.

Click the top-level `Connect`.

Click `AWS Account`.  
  
Use the `Parent Resource` dropdown to select the `Sandbox` folder.

Enter the AWS Account ID for the account you are importing.

Copy the IAM Role ARN created earlier and paste it into the field.

Provide the GUID you created in Step 1.
<p><img alt="aws_ready_to_import" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/aws-ready-to-import.png"/></p>

Click `Import`.  


Wait for the progress bar to complete.
<p><img alt="aws_progress_bar" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/aws-progress-bar.png"/></p>

This process takes a while, and you’ll see the bars fluctuate. Note that error messages, like "Try again later: error in handling command", are not uncommon and should resolve as the process iterates to completion.  


## Step 3: Validate the import

When the process completes, navigate to `Turbot > Sandbox > YOUR_ACCOUNT`

  
Search the `Controls` tab for `cmdb`
<p><img alt="aws_account_cmdb" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/aws-account-cmdb.png"/></p>

When the control is green, Turbot has successfully connected to your account.

## Step 4: Review

  
In this guide you have connected an AWS account to Guardrails. To further verify, check the number of resources found.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity) we’ll see how Guardrails watches your account and reacts to resource changes.

Presumably we move this to https://github.com/turbot/guardrails-samples/tree/main/enterprise_installation and link from here?

The external ID here has the same format as the one Guardrails autogenerates, to be clearer that it's a user-generated ID maybe it should just be a bare GUID?

This was true when I was working in busy environments, but in the clean environment I'm using now, things were very smooth. Should we assume that POC customers will be in similarly clean environments?


## Progress tracker
<div>
<div>✅ <strong>Connect an AWS Account to Guardrails</strong></div>
<div>☐ <a href="/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/">Observe AWS Resource Activity</a></div>
<div>☐ <a href="/guardrails/docs/getting-started/getting-started-aws/attach-policy-pack/">Attach a Guardrails Policy</a></div>
<div>☐ <a href="/guardrails/docs/getting-started/getting-started-aws/create-static-exception/">Create a Static Exception to a Guardrails AWS Policy</a></div>
<div>☐ <a href="/guardrails/docs/getting-started/getting-started-aws/create-calculated-exception/">Create a Calculated Exception to a Guardrails AWS Policy</a></div>
<div>☐ <a href="/guardrails/docs/getting-started/getting-started-aws/send-alert-to-email/">Send an Alert to Email</a></div>
<div>☐ <a href="/guardrails/docs/getting-started/getting-started-aws/apply-quick-action/">Apply a Quick Action</a></div>
<div>☐ <a href="/guardrails/docs/getting-started/getting-started-aws/enable-enforcement/">Enable Automatic Enforcement</a></div>
</div>
