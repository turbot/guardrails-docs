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

## Step 3: Get AWS Management Account or Delegated Account ID

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

To import your AWS Organization, Guardrails needs access to the [Organizations API](https://docs.aws.amazon.com/organizations/latest/APIReference/Welcome.html) from the management account or a [delegated account](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_delegate_policies.html).  In this step, you will create a role in this account that trusts the guardrails master account and has the required permissions.

Enter the required information in the **Setup Access to your organization** section.  After you fill in the required information, you will download and run a Cloudformation stack to create the role with options that you have selected.  Alternatively, you may create the role manually and then enter the information about the role that you have created.

![Download Organization CFN Template](/images/docs/guardrails/guides/aws/import-aws-organization/download-management-account-iam-role-cfn-template.png)

- Provide your `Organization Account ID` (Obtained in Step 3).
- Select the AWS `Environment` (Partition).
- Enter the IAM `Role Name`.  This role allows Turbot Guardrails to access the AWS Organizations API. 
  <!-- this is the desired behavior but it doesn't work that way yet>
  - It must allow [cross-account access](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies-cross-account-resource-access.html) from the Turbot Guardrails management AWS account to assume into your AWS account.  Guardrails will determine the appropriate trust policy for your environment and set it in the Cloudformation template. If you choose to create the role manually, however, make sure you trust the appropriate account:
    - Turbot Cloud SaaS: `287590803701`
    - Turbot Cloud SaaS - EU: `255798382450`
    - Turbot Guardrails Enterprise: The AWS Account ID where you have installed the Turbot Guardrails Enterprise stacks.
   -->
  - It must have permissions to read and the Organization configuration. The CloudFormation template will add the `arn:aws:iam::aws:policy/ReadOnlyAccess` policy to the role.  If you choose to create the role manually, however, make sure it has sufficient permissions.
  <!--
  **What are the required permissions for the org role???  CF template grants readonly access but that seems like more than we need?
  -->
- Provide an `External ID` for the role.  The [External ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html) provides an additional authentication assertion to avoid the [confused deputy problem](https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html).   Guardrails suggests a unique External ID for your Workspace in the [Guardrails protected format](/guardrails/docs/faq/general-faq#what-is-guardrails-aws-iam-role-external-id-protection) (e.g., `turbot:123456789012345:foo`).  You *must* use this format when [External ID Protection](https://hub.guardrails.turbot.com/mods/aws/policies/aws/turbotIamRoleExternalIdProtection) is enabled.  If desired, click the pencil icon to edit the external id.

  > [!IMPORTANT]
  > Enabling [External ID Protection](/guardrails/docs/faq/general-faq#how-does-guardrails-protect-my-aws-account-from-the-confused-deputy-problem) is **strongly recommended**, especially for SaaS customers!

- After all the information has been entered, download and run the CloudFormation template in the Organizations account to create the role with the options you have specified.  The CloudFormation template has a parameter `GuardrailsSaaSAccountId` to specify the Guardrails management account that will be added to the trust policy, and it defaults to the Turbot Cloud SaaS account.  If you are a Turbot Cloud SaaS EU customer, or you host your own Guardrails Enterprise instance, then you must pass the appropriate `GuardrailsSaaSAccountId` when running the stack:
    - Turbot Cloud SaaS: `287590803701`
    - Turbot Cloud SaaS - EU: `255798382450`
    - Turbot Guardrails Enterprise: The AWS Account ID where you have installed the Turbot Guardrails Enterprise stacks

<!--
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
    Default: turbot-org-readonly
    Description: The role that Turbot uses to connect to this account
  AccessRoleExternalId:
    Type: String
    Default: turbot:193176180516865:1767af34-46d4-4ef7-9e9c-2b4968ccf0e4
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
-->




## Step 7: Setup Access to Your Member Accounts

In the previous step, you created a role in the Organizations account that is used to discover your Organization, OUs, and Accounts.  Now you will create a role *in each of the member accounts* so that guardrails can manage them.

Enter the required information in the **Setup Access to Your Member Accounts** section.  After you fill in the required information, you will download a Cloudformation template and run a stack set to create the role with options that you have selected.  Alternatively, you may create the roles manually and then enter the information about the roles that you have created.

![Setup Member Account Access](/images/docs/guardrails/guides/aws/import-aws-organization/setup-member-accounts-access.png)


- Enter the IAM `Role Name`.  This role must be created in each of the member accounts to allow Turbot Guardrails to manage it. 
<!--
  - It must allow [cross-account access](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies-cross-account-resource-access.html) from the Turbot Guardrails management AWS account to assume into your AWS account.  Guardrails will determine the appropriate trust policy for your environment and set it in the Cloudformation template. If you choose to create the role manually, however, make sure you trust the appropriate account:
    - Turbot Cloud SaaS: `287590803701`
    - Turbot Cloud SaaS - EU: `255798382450`
    - Turbot Guardrails Enterprise: The AWS Account ID where you have installed the Turbot Guardrails Enterprise stacks.
-->
  - The permissions you grant to the Guardrails IAM role [will depend on your use-case](/guardrails/docs/guides/aws/import-aws-account#what-permissions-to-grant).  The Cloudformation template will assign the `arn:aws:iam::aws:policy/ReadOnlyAccess`, as well as additional permissions for the [event handlers](/guardrails/docs/guides/aws/event-handlers).
  
- Provide an `External ID` for the role.  The [External ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html) provides an additional authentication assertion to avoid the [confused deputy problem](https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html).   Guardrails suggests a unique External ID for your Workspace in the [Guardrails protected format](/guardrails/docs/faq/general-faq#what-is-guardrails-aws-iam-role-external-id-protection) (e.g., `turbot:123456789012345:foo`).  You *must* use this format when [External ID Protection](https://hub.guardrails.turbot.com/mods/aws/policies/aws/turbotIamRoleExternalIdProtection) is enabled.  If desired, click the pencil icon to edit the external id.

  > [!IMPORTANT]
  > Enabling [External ID Protection](/guardrails/docs/faq/general-faq#how-does-guardrails-protect-my-aws-account-from-the-confused-deputy-problem) is **strongly recommended**, especially for SaaS customers!

- After all the information has been entered, download the CloudFormation template to create the required IAM role in each member account. 

  ![Download Member CFN Template](/images/docs/guardrails/guides/aws/import-aws-organization/download-member-account-iam-role-cfn-template.png)

  The template will be pre-configured with the values you provided (i.e., `Role Name` and `External ID`). You can use [CloudFormation StackSets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-getting-started-create-self-managed.html#stacksets-getting-started-create-self-managed-console) to deploy the template across member accounts.

  The CloudFormation template has a parameter `GuardrailsSaaSAccountId` to specify the Guardrails management account that will be added to the trust policy, and it defaults to the Turbot Cloud SaaS account.  If you are a Turbot Cloud SaaS EU customer, or you host your own Guardrails Enterprise instance, then you must pass the appropriate `GuardrailsSaaSAccountId` when running the stack:
    - Turbot Cloud SaaS: `287590803701`
    - Turbot Cloud SaaS - EU: `255798382450`
    - Turbot Guardrails Enterprise: The AWS Account ID where you have installed the Turbot Guardrails Enterprise stacks


<!--
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

-->


## Step 8: Exclude Accounts and Organization Units

If you wish to exclude specific AWS accounts or Organizational Units (OUs) from being imported into Guardrails, this step is required.

> [!IMPORTANT]
> Existing accounts already connected individually in Guardrails will automatically move under the organization hierarchy. If you **do not wish to move them**, list them in the YAML exclusion list.

Click the **Edit** button to provide a list of account IDs or OU names to be excluded.

![Edit Exception List](/images/docs/guardrails/guides/aws/import-aws-organization/exception-list-with-connect.png)

Click the **Preview** button to ensure no errors are displayed. Proceed to [Initiate Connect](#step-11-initiate-connect).

## Step 9: Start Import

Select **Connect** to start the import process.

Guardrails will create and execute discovery controls for your AWS Organization, scanning each account, Organizational Unit, and resource under it.

![Check Discovery Process](/images/docs/guardrails/guides/aws/import-aws-organization/check-discovery-process.png)

## Step 10: Review

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

