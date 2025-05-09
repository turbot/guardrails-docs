---
title: Import AWS Account (Cursor Rule Based Updates)
sidebar_label: Import AWS Account (Cursor Rule Based Updates)
guide_type: guides
---

# Import AWS Account (Cursor Rule Based Updates)

Guardrails enables you to import an AWS account into a Guardrails workspace for monitoring and management. This guide explains the process, required permissions, and best practices for a successful import.

## Prerequisites

- Access to Guardrails workspace with admin permissions
- AWS account with permissions to create IAM roles and policies
- Guardrails AWS mod installed in your workspace

## Step 1: Understand Supported AWS Partitions

Guardrails supports the following AWS partitions:

- `aws` - Public AWS partition (Commercial)
- `aws-cn` - AWS China
- `aws-us-gov` - AWS GovCloud

> [!IMPORTANT]
> Free Tier AWS accounts cannot be used with Guardrails. If attempted, Guardrails will fail to properly discover resources and generate errors in the console.

## Step 2: Prepare IAM Role and Permissions

1. **Create a cross-account IAM role** in the AWS account you want to import. This allows Guardrails to access the account securely.
2. **Choose the appropriate permission set:**
   - **Full Remediation:** Attach `AdministratorAccess` policy.
   - **Mixed Remediation:** Attach `ReadOnlyAccess`, `AmazonSNSFullAccess`, `CloudWatchEventsFullAccess`, and add service-specific policies as needed.
   - **Read Only + Event Handlers:** Attach `ReadOnlyAccess`, `AmazonSNSFullAccess`, `CloudWatchEventsFullAccess`, or use a custom policy for event handling only.
3. **Budget Permissions:** To enable budget controls, add:
   - `ce:getCostForecast`
   - `ce:GetCostAndUsage`

## Step 3: Configure Cross-Account Trust

- Grant cross-account access for the Turbot Guardrails master AWS account to assume the role:
  - Turbot Cloud US: `287590803701`
  - Turbot Cloud EU: `255798382450`
  - Turbot Guardrails Enterprise: Use your own AWS Account ID

## Step 4: Set External ID

- Use the auto-generated External ID from Guardrails (recommended) or set your own, following AWS character limits.
- Ensure **Require MFA** is disabled on the role.

## Step 5: Name the Role

- Use a meaningful name, e.g., `turbot-service-readonly` or `turbot-service-superuser`.

## Step 6: Create IAM Role Using CloudFormation (Optional)

To simplify setup, use the Turbot-provided CloudFormation template. For EU customers, use account ID `255798382450`.

**Example: ReadOnly + Global Event Handlers**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Metadata:
  AWS::CloudFormation::Interface:
    ParameterLabels:
      AccessRoleName:
        default: "Guardrails Access Role Name"
      AccessPolicyName:
        default: "Guardrails Access Policy Name"
      GuardrailsIamPath:
        default: "IAM Path"
      GuardrailsSaasAccountId:
        default: "Guardrails SaaS Host AWS Account ID"
      AccessRoleExternalId:
        default: "Role Trust Policy External ID"
    ParameterGroups:
      - Label:
          default: "Default Parameters"
        Parameters:
          - AccessRoleName
          - AccessPolicyName
          - AccessRoleExternalId
          - EventHanderRoleName
          - GuardrailsIamPath
          - GuardrailsSaasAccountId
Parameters:
  AccessRoleName:
    Type: String
    Default: turbot_guardrails_access_role
    Description: The role that Turbot uses to connect to this account
  AccessPolicyName:
    Type: String
    Default: turbot_guardrails_access_policy
    Description: The name for the policy for SNS and Events write access.
  AccessRoleExternalId:
    Type: String
    Description: The AWS External ID to add to the trust policy of the Turbot role
  EventHanderRoleName:
    Type: String
    Default: turbot_guardrails_events_role
    Description: The role that Turbot uses to connect to this account
  GuardrailsIamPath:
    Type: String
    Default: "/"
    Description: >
      The IAM path to use for all IAM roles created in this stack.
      The path must either be a single forward slash "/" or
      alphanumeric characters with starting and ending forward slashes "/my-path/".
  GuardrailsSaaSAccountId:
    Type: String
    Default: '287590803701'
    Description: >
      The AWS Account ID where Guardrails is installed. This will be added to the
      cross accout trust policy of the access role. The default value of '287590803701'
      refers to the account ID of the Turbot Guardrails SaaS environment. Do not change
      the value if importing your account into Guardrails SaaS.
Resources:
  GuardrailsAccessRole:
    Type: "AWS::IAM::Role"
    Properties:
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              AWS: !Sub "arn:aws:iam::${GuardrailsSaaSAccountId}:root"
            Action:
              - "sts:AssumeRole"
            Condition:
              StringEquals:
                "sts:ExternalId": !Ref AccessRoleExternalId
      Path: !Ref GuardrailsIamPath
      ManagedPolicyArns:
        - "arn:aws:iam::aws:policy/ReadOnlyAccess"
      RoleName: !Ref AccessRoleName
  GuardrailsAccessPolicy:
    Type: "AWS::IAM::Policy"
    Properties:
      PolicyName: !Ref AccessPolicyName
      Roles:
        - !Ref AccessRoleName
      PolicyDocument:
        Version: 2012-10-17
        Statement:
          - Sid: PassRoleToAWS
            Effect: Allow
            Action:
              - "iam:PassRole"
              - "iam:GetRole"
            Resource:
              - !GetAtt EventHandlersGlobalRole.Arn
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
              - !Sub "arn:aws:sns:*:${AWS::AccountId}:turbot_aws_api_handler*"
              - !Sub "arn:aws:sns:*:${AWS::AccountId}:turbot_aws_api_handler*:*"
    DependsOn:
      - GuardrailsAccessRole
  EventHandlersGlobalRole:
    Type: 'AWS::IAM::Role'
    Properties:
      RoleName: !Ref EventHanderRoleName
      Path: !Ref GuardrailsIamPath
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
Outputs:
  AccessRoleArnOutput:
    Description: "ARN of the Guardrails IAM role"
    Value: !GetAtt GuardrailsAccessRole.Arn
    Export:
      Name: "GuardrailsAccessRoleArn"
  AccessRoleExternalIdOutput:
    Description: "External ID used in the Access Role"
    Value: !Ref AccessRoleExternalId
    Export:
      Name: "AccessRoleExternalId"
```

## Step 7: Create the IAM Role Using the AWS Console

If you do not want to create the role with CloudFormation, you can create it manually:

1. **Login to AWS** with a privileged account and navigate to **IAM > Roles** in the AWS IAM Console.
2. Click the **Create Role** button.
   - Select **Another AWS account** for the type of trusted entity.
   - For **Account ID**, enter `287590803701` (the Turbot Guardrails SaaS AWS account ID) if you are a SaaS customer. If you are a Turbot Guardrails Enterprise customer, enter the AWS Account ID where Turbot Guardrails was deployed.
   - Check **Require External ID** and enter an [External ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html). You can choose any valid external ID. You will need this ID later, when you import the account into your Guardrails workspace.
   - Make sure you leave **Require MFA** disabled.
   - Click **Next: Permissions**.
3. **Select the policies** to be attached to the role:
   - To take advantage of every AWS integration offered by Turbot Guardrails (recommended), attach the Amazon Managed AdministratorAccess Policy:
     - `arn:aws:iam::aws:policy/AdministratorAccess`
   - To enable readonly access for Guardrails with event handler support, attach the following Amazon Managed Policies:
     - `arn:aws:iam::aws:policy/ReadOnlyAccess`
     - `arn:aws:iam::aws:policy/AmazonSNSFullAccess`
     - `arn:aws:iam::aws:policy/CloudWatchEventsFullAccess`
   - Create a policy to grant permissions to get the cost usage and forecast data, and attach it to the role:
     - `ce:getCostForecast`
     - `ce:GetCostAndUsage`
4. Click **Next: Tags**.
5. If desired, add tags, then click **Next: Review**.
6. Give the role a meaningful name such as `turbot-readonly` (read only) or `turbot-superuser` (for full access), as well as an apt description. Click **Create Role**.

## Next Steps

- Import the AWS account into Guardrails using the console or CLI.
- Review account status and permissions in the Guardrails workspace.
- Install additional mods for AWS services as needed.

## Troubleshooting

| Issue                        | Description                                                      | Resolution                                                      |
|------------------------------|------------------------------------------------------------------|-----------------------------------------------------------------|
| Access Denied                | Guardrails cannot assume the IAM role.                            | Check trust policy, permissions, and external ID.               |
| Resources Not Discovered     | Some AWS resources are missing in Guardrails.                     | Ensure the required mods are installed and permissions granted.  |
| Budget Data Not Available    | Budget controls do not show cost/usage data.                      | Add the required Cost Explorer permissions to the IAM role.      |
| Free Tier Account Error      | Import fails for Free Tier AWS account.                           | Use a non-Free Tier AWS account.                                |

## Review

- [ ] The IAM Role and External ID policies are correctly set for the imported AWS account.
- [ ] The CMDB control for the imported account is in an `ok` state.
- [ ] All policy values for the new account are in `ok` or `skipped` state; any `tbd`, `error`, or `invalid` policy values are resolved.
- [ ] All controls for the new account are in `ok`, `alarm`, or `skipped` state; any `tbd`, `error`, or `invalid` controls are resolved.
- [ ] Event handler controls for the account are in an `ok` state.

## Automation Reference

Use the following resources to automate and verify account imports:

- **Account Import GraphQL:** [account_import graphql](https://github.com/turbot/guardrails-samples/blob/main/queries/aws/aws_account_import.graphql)
- **Policies Stuck in TBD:** Use the [run_policies](https://github.com/turbot/guardrails-samples/tree/main/api_examples/python/run_policies) script.
- **Controls Stuck in TBD:** Use the [run_controls](https://github.com/turbot/guardrails-samples/tree/main/api_examples/python/paging-mutation-example/run_controls.py) script.
- **Event Handler Controls not in OK:** Use the [run_controls_batches](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/run_controls_batches) script.

Ensure all steps are followed to maintain a smooth and successful account import process.
