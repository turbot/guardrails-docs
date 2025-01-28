---
title: Import Organization
sidebar_label: Import Organization
---

# Importing an AWS Organization

In this guide, you will:

- Learn how to import an entire AWS Organization into Turbot Guardrails, enabling Guardrails to discover, govern, and manage resources across all accounts under a single AWS Organization.
- Monitor and troubleshoot the organization import process to ensure a seamless setup.

Importing an [AWS Organization](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html) into Guardrails involves the following key steps:

- **Prepare AWS Configurations**: Create IAM roles for the management or [delegated](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_delegate_policies.html) account and member accounts to grant Guardrails the necessary permissions for secure access and resource discovery.
- **Import the Organization via the Guardrails Console**: Use the Guardrails console to establish the connection and enable governance across the AWS Organization.

## Prerequisites

- Access to the Guardrails console with *Turbot/Owner* or *Turbot/Admin* permissions at the Turbot resource level.
- Minimum Turbot Enterprise (TE) version `v5.48.0` or later.
- The [`aws` mod](https://hub.guardrails.turbot.com/mods/aws/mods) `v5.36.0` or later installed.
- Familiarity with the AWS Console, including admin privileges.
- Cross-account IAM roles in the management or delegated account and member accounts to securely allow Guardrails access without sharing sensitive credentials.

## Step 2: Install Recommended Mods

> [!NOTE] The required mods are applicable for both AWS account and organization imports.

The `aws` mod is required to import AWS accounts or organizations into a Guardrails workspace. It must be installed before account imports can begin.

Installation of additional mods will depend on your organization's control objectives.

### Recommended Mods (in order of installation)

1. [aws](mods/turbot/aws)
2. [aws-iam](mods/turbot/aws-iam)
3. [aws-kms](mods/turbot/aws-kms)
4. [aws-ec2](mods/turbot/aws-ec2)
5. aws-vpc-*
   - [aws-vpc-core](mods/turbot/aws-vpc-core)
   - [aws-vpc-internet](mods/turbot/aws-vpc-internet)
   - [aws-vpc-connect](mods/turbot/aws-vpc-connect)
   - [aws-vpc-security](mods/turbot/aws-vpc-security)
6. [aws-sns](mods/turbot/aws-sns)
7. [aws-events](mods/turbot/aws-events)
8. [aws-s3](mods/turbot/aws-s3)
9. [aws-cloudtrail](mods/turbot/aws-cloudtrail)

Follow the steps in [Install a Mod](/guides/configuring-guardrails/install-mod#install-mod-via-guardrails-console) to install mods via the Guardrails console.

## Step 3: Get AWS Organization Management Account ID

Account ID of the management account or a [delegated account with organization permissions](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_delegate_policies.html) is mandatory for organization import. To obtain the account ID, you can either:

- Log in to the AWS management account and get the account ID from the top right corner drop-down menu.
- Log in to the delegated account and get the account ID from the top right corner drop-down menu.

<!-- - Use the AWS CLI by running the command described in the [AWS documentation](https://docs.aws.amazon.com/cli/latest/reference/organizations/describe-organization.html). -->
<!-- Example AWS CLI Command:
(You need delegated account access to query)
```bash
TO DO LATER
``` -->

## Step 4: Log in to Guardrails Console

Log in to the Guardrails console using your provided local credentials or through any SAML-based login method. Select the **CONNECT** card, then choose **AWS**.

![Select Connect](/images/docs/guardrails/guides/aws/import-aws-organization/select-connect.png)

Next, select **AWS Organization** from the `Select your account type` options.

![Select AWS Organization](/images/docs/guardrails/guides/aws/import-aws-organization/select-aws-organization.png)

## Step 5: Choose Folder

In the **Choose your folder** dropdown, select the Guardrails [folder](/guardrails/docs/concepts/resources/hierarchy#folders) where you want to import your organization.

![Choose Folder to Import](/images/docs/guardrails/guides/aws/import-aws-organization/choose-folder-to-import.png)

## Step 6: Setup Access to Your Organization Management Account

In this step, Guardrails uses:

- **`External ID`** ensures secure access between Guardrails and AWS accounts. Refer to AWS documentation on [Access to AWS accounts owned by third parties](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html) for further information.
- **`IAM Role with Cross Account Trust`** allows Turbot Guardrails to access resources across accounts. For additional context, see AWS's guide on [Cross-account resource access in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies-cross-account-resource-access.html).

### Cross Account Trust

The IAM role must grant cross-account access for the Turbot Guardrails main AWS account to assume into your AWS account.

- Turbot Cloud customers, you must allow the Turbot SaaS US AWS Account ID: `287590803701`
- Turbot Cloud EU customers, you must allow the Turbot SaaS EU AWS Account ID: `255798382450`
- Turbot Guardrails Enterprise customers, enter the AWS Account ID of the AWS Account where you have installed the Turbot Guardrails Enterprise stacks.

### External ID Considerations

There are two sources for the External ID:

1. **Auto-generated External ID**: Guardrails suggests a unique External ID for your Turbot Workspace (e.g., `turbot:123456789012345:foo`). Use this auto-generated ID when "External ID Protection" is enabled (e.g., the policy `AWS > Account > Turbot IAM Role > External ID > Protection` is set to `Protected`). This prevents the confused deputy problem. For more information, see our FAQ: [What is Guardrails AWS IAM External ID protection?](faq/general-faq#what-is-turbot-aws-iam-role-external-id-protection).
2. **Custom External ID**: You can set the External ID to any valid value you prefer.

> [!NOTE]
> The default value for `AWS > Account > Turbot IAM Role > External ID > Protection` is set to `Open`

### Required Permissions to Grant

The permissions you grant to the Guardrails IAM role depend on your use case(s). Guardrails will use the role you specify and the permissions granted to it. Refer to [Required Permissions to Grant](/guardrails/docs/guides/aws/import-aws-account#what-permissions-to-grant) for various permission sets.

Now as next steps:

- Provide your `Organization Account ID` (obtained in Step 3).
- Select the `Environment`.
- Enter the IAM `Role Name`.
- Provide `External ID`.

![Setup Organization Access](/images/docs/guardrails/guides/aws/import-aws-organization/setup-organization-access.png)

> [!NOTE]
> Other supported AWS Environments include `Commercial Cloud`, `US Government`, and `China Cloud`.
> Give the role a meaningful name, such as `turbot-service-readonly` (read-only) or `turbot-service-superuser` (full access), along with an appropriate description.

Proceed to create the IAM Role in the organization management account.

## Step 7: Create IAM Role in Management Account or Delegated Account

You can create the IAM role beforehand or during the importing process in the Guardrails import UI. However, it is recommended to create the IAM roles prior to initiating the import process. This ensures that the required IAM role is ready as part of the prerequisites.

To create the IAM role:

- Download the CloudFormation template file, which will be updated with the two values you provided (i.e., `Role Name` and `External ID`) in previous [Step 6](#step-6-setup-access-to-your-organization-management-account).

![Download Organization CFN Template](/images/docs/guardrails/guides/aws/import-aws-organization/download-management-account-iam-role-cfn-template.png)


<details>
  <summary>Reference to downloaded CloudFormation Template with ReadOnlyAccess</summary>

```yml
AWSTemplateFormatVersion: '2010-09-09'
Metadata:
  AWS::CloudFormation::Interface:
    ParameterLabels:
      AccessRoleName:
        default: "Guardrails Access Role Name"
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
          - AccessRoleExternalId
          - GuardrailsIamPath
          - GuardrailsSaasAccountId
Parameters:
  AccessRoleName:
    Type: String
    Default: turbot_guardrails
    Description: The role that Turbot uses to connect to this account
  AccessRoleExternalId:
    Type: String
    Default: turbot:317452734766081:363bd25d-c8e0-4524-b54e-97fbd37643fa
    Description: The AWS External ID to add to the trust policy of the Turbot role
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
      cross account trust policy of the access role. The default value of '287590803701'
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
</details>

#### Update Guardrails Hosted Account ID

The downloaded CloudFormation template will have a parameter `GuardrailsSaaSAccountId`. Incase of Turbot Guardrails enterprise customers, enter the AWS Account ID of the AWS Account where you have installed the Turbot Guardrails Enterprise stacks while executing this template.

> [!IMPORTANT]
> SaaS customers do not need to update the `GuardrailsSaaSAccountId`.

By default, Turbot provides the SaaS account IDs as mentioned in [Cross Account Trust](#cross-account-trust).

```yaml
  GuardrailsSaaSAccountId:
    Type: String
    Default: '287590803701'
    Description: >
      The AWS Account ID where Guardrails is installed. This will be added to the
      cross-account trust policy of the access role. The default value of '287590803701'
      refers to the account ID of the Turbot Guardrails SaaS environment. Do not change
      the value if importing your account into Guardrails SaaS.
```
Execute the downloaded CloudFormation template in the AWS management or delegated account to create the IAM role.

## Step 8: Setup Access to Your Member Accounts

This step follows a similar process as **Step 6**. Provide the `Role Name` to be created for each member account and the `External ID`.

![Setup Member Account Access](/images/docs/guardrails/guides/aws/import-aws-organization/setup-member-accounts-access.png)

### Create IAM Role in Member Accounts

You can create the required IAM role beforehand or during the importing process in the Guardrails Import UI. However, it is recommended to create the IAM roles **prior to initiating the import process** to ensure the required IAM role is ready.

To create the IAM role:

**Download the CloudFormation Template**:
   The template will be pre-configured with the values you provided (i.e., `Role Name` and `External ID`).

   ![Download Member CFN Template](/images/docs/guardrails/guides/aws/import-aws-organization/download-member-account-iam-role-cfn-template.png)

**Execute the CloudFormation Template**:
   Use [CloudFormation StackSets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-getting-started-create-self-managed.html#stacksets-getting-started-create-self-managed-console) in the AWS management or delegated account to deploy the template across member accounts. This creates the required IAM role in each member account.


<details>
  <summary>Reference to downloaded CloudFormation Template with Read Only + Global Event Handlers</summary>

```yml
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
          - EventHandlerRoleName
          - GuardrailsIamPath
          - GuardrailsSaasAccountId
Parameters:
  AccessRoleName:
    Type: String
    Default: turbot-member-role
    Description: The role that Turbot uses to connect to this account
  AccessPolicyName:
    Type: String
    Default: turbot_guardrails_access_policy
    Description: The name for the policy for SNS and Events write access.
  AccessRoleExternalId:
    Type: String
    Default: turbot-rg
    Description: The AWS External ID to add to the trust policy of the Turbot role
  EventHandlerRoleName:
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
      cross account trust policy of the access role. The default value of '287590803701'
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
      RoleName: !Ref EventHandlerRoleName
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
</details>

## Step 9: Exclude Accounts and Organization Units

If you wish to exclude specific AWS accounts or Organizational Units (OUs) from being imported into Guardrails, this step is required.

> [!IMPORTANT]
> Existing accounts already connected individually in Guardrails will automatically move under the organization hierarchy. If you **do not wish to move them**, list them in the YAML exclusion list.

Click the **Edit** button to provide a list of account IDs or OU names to be excluded.

![Edit Exception List](/images/docs/guardrails/guides/aws/import-aws-organization/exception-list-with-connect.png)

Click the **Preview** button to ensure no errors are displayed. Proceed to [Initiate Connect](#step-11-initiate-connect).

## Step 10: Start Import

Select **Connect** to start the import process.

Guardrails will create and execute discovery controls for your AWS Organization, scanning each account, Organizational Unit, and resource under it.

![Check Discovery Process](/images/docs/guardrails/guides/aws/import-aws-organization/check-discovery-process.png)

## Step 11: Review

- [ ] Confirm that the organization CMDB and discovery controls are in the `OK` state.

Navigate to the **Resources** tab, search for the organization name, and then select the **Controls** tab to check that the controls are in the `OK` state.

![Review Org CMDB and Discovery Controls](/images/docs/guardrails/guides/aws/import-aws-organization/review-org-cmdb-discovery-controls.png)

## Troubleshooting

| **Issue**                                  | **Description**                                                                                                                                        | **Solution/Guide**                                                                                                                                                                                                                       |
|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Policies Stuck in TBD                  | Policies may remain in the `TBD` state, preventing them from being evaluated or applied.                                                               | See here [how to run policies in batches](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/run_policies_batches)                                                                                                                              |
| Controls Stuck in TBD                  | Controls may remain in the `TBD` state, indicating they have not yet run or completed.                                                                 | See how to [run controls in batches](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/run_controls_batches)                                                                                                 |
|Event Handler Controls Not in OK       | Event handler controls may not be in the `OK` state, indicating configuration issues with event handlers, topics, or subscriptions.                     | Refer [Configuring Real-Time events](/guardrails/docs/guides/aws/event-handlers) for more information. |
| Controls encounters an `Access Denied` error.                     | If Guardrails controls encounters an `Access Denied` error due to lack of permission to execute any action in AWs resources.  |Refer to [Required Permissions to Grant](/guardrails/docs/guides/aws/import-aws-account#what-permissions-to-grant) for various permission sets..
| Common errors.                     | Any common errors preventing controls to run.   |Refer [Common Troubleshooting](/guardrails/docs/guides/troubleshooting) for more information.
| Further Assistance                     | If issues persist or you require additional help, you can access detailed troubleshooting documentation or reach out to support.                        | Refer to the [Guardrails Troubleshooting Guide](/guardrails/docs/troubleshooting) or [Open a Support Ticket](https://support.turbot.com).                                                                                         |

