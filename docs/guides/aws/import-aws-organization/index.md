---
title: Import Organization
sidebar_label: Import Organization
---

# Importing an AWS Organization

In this guide, you will:

- Learn how to import an entire AWS Organization into Turbot Guardrails, enabling Guardrails to discover, govern, and manage resources across all accounts under a single AWS Organization.
- Configure discovery levels to control which accounts and resources are imported.
- Monitor and troubleshoot the organization import process to ensure a seamless setup.

Importing an [AWS Organization](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html) into Guardrails involves the following key steps:

- **Prepare AWS Configurations**: Create IAM roles for the management or [delegated](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_delegate_policies.html) account and member accounts to grant Guardrails the necessary permissions for secure access and resource discovery.
- **Configure Discovery Levels**: Choose which OUs and accounts to import, and at what level of detail.
- **Import the Organization via the Guardrails Console**: Use the Guardrails console to establish the connection and enable governance across the AWS Organization.

## Prerequisites

- Access to the Guardrails console with *Turbot/Owner* or *Turbot/Admin* permissions at the Turbot resource level.
- Minimum Turbot Enterprise (TE) version `v5.48.0` or later.
- The [`aws` mod](https://hub.guardrails.turbot.com/mods/aws/mods) `v5.36.0` or later installed.
- Familiarity with the AWS Console, including admin privileges.
- Cross-account IAM roles in the management or delegated account and member accounts to securely allow Guardrails access without sharing sensitive credentials.

## Step 1: Install Recommended Mods

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

## Step 2: Get AWS Management Account or Delegated Account ID

Account ID of the management account or a [delegated account with organization permissions](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_delegate_policies.html) is mandatory for organization import. To obtain the account ID, you can either:

- Log in to the AWS management account and get the account ID from the top right corner drop-down menu.
- Log in to the delegated account and get the account ID from the top right corner drop-down menu.

## Step 3: Log in to Guardrails Console

Log in to the Guardrails console using your provided local credentials or through any SAML-based login method.

To start the import process, navigate to **Accounts** in the left sidebar, then click the **Actions** dropdown and select **Connect Account**.

![Accounts page with Actions dropdown showing Connect Account option](/images/docs/guardrails/connect-account/connect-account-action.png)

Select **AWS** as the cloud provider, then select **AWS Organization** as the account type.

![Org selection](/images/docs/guardrails/connect-account/connect-aws/connect-aws-org/aws-org-type-selection.png)

## Step 4: Choose Destination Folder

In the **Choose your folder** dropdown, select the Guardrails [folder](/guardrails/docs/concepts/resources/hierarchy#folders) where you want to import your organization.

![Folder selection](/images/docs/guardrails/connect-account/connect-aws/connect-aws-org/aws-org-folder-selection.png)

Click **Next** to proceed to discovery settings.

## Step 5: Configure Discovery Settings

In this step, you will configure the IAM role that Guardrails uses to discover your organization structure.

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

### Configure the Discovery Role

Provide the following information:

- **Environment**: Select the AWS partition (`Commercial Cloud`, `US Government`, or `China Cloud`).
- **Role Name**: Enter the IAM role name for the discovery role in your management account.
- **External ID**: Use the auto-generated External ID or provide a custom one.

![Folder selection](/images/docs/guardrails/connect-account/connect-aws/connect-aws-org/aws-org-discovery-settings.png)

### Download and Deploy the Discovery Role Template

Click the **Download CloudFormation Template** button to download a pre-configured template with your role name and external ID.

![Download CloudFormation template button](/images/docs/guardrails/connect-account/connect-aws/connect-aws-org/aws-org-cfn-template-button.png)

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

> [!IMPORTANT]
> For Turbot Guardrails Enterprise customers, update the `GuardrailsSaaSAccountId` parameter to the AWS Account ID where you have installed the Turbot Guardrails Enterprise stacks.

Execute the downloaded CloudFormation template in your AWS management or delegated account to create the IAM role.

### Test Discovery

After deploying the IAM role, enter the **Role ARN** in the Guardrails console and click **Test Discovery**.

![Role ARN field with Test Discovery button](/images/docs/guardrails/connect-account/connect-aws/connect-aws-org/aws-org-test-discovery.png)

If successful, Guardrails will display the discovered organization structure, including all Organizational Units (OUs) and accounts.

## Step 6: Configure Discovery Levels

After a successful test discovery, you can configure which OUs and accounts to import and at what level of detail.

### Understanding Discovery Levels

Guardrails provides three discovery levels for each OU and account:

| Level | Description |
|-------|-------------|
| **Resource** (default) | Full import - discovers the account/OU and all resources within it. This is the standard import mode for active governance. |
| **Account** | Metadata only - discovers the account/OU structure but does not import resources within it. Useful for visibility without full governance overhead. |
| **None** | Excludes the OU/account entirely from Guardrails. The OU/account and all its contents will not be imported. |

### Discovery Level Inheritance

Discovery levels follow an inheritance model through the organization hierarchy:

- **Child OUs and accounts inherit their parent's discovery level** unless explicitly overridden.
- Setting an OU to **None** automatically excludes all descendant OUs and accounts (they cannot be individually re-enabled).
- Setting an OU to **Account** allows child accounts to override to **Resource** if desired.

### Using the Tree View (Default)

The tree view provides an interactive way to configure discovery levels:

![Discovery tree view](/images/docs/guardrails/connect-account/connect-aws/connect-aws-org/aws-org-discovered-org-tree.png)

1. **Expand/collapse nodes** using the arrow icons to navigate your organization structure.
2. **Select a discovery level** from the dropdown next to each OU or account:
   - The dropdown shows the current level and whether it's inherited from a parent.
   - Inherited values are shown in italics.
3. **Management account** is indicated with a special badge.
4. **Locked descendants** - When a parent OU is set to "None", all descendants show "Parent excluded" and cannot be modified.

![Discovery tree view](/images/docs/guardrails/connect-account/connect-aws/connect-aws-org/aws-org-discovered-org-tree-options.png)

### Using Manual YAML View

For advanced users, click the **Manual** toggle to configure discovery levels using YAML:

![Discovery tree view](/images/docs/guardrails/connect-account/connect-aws/connect-aws-org/aws-org-discovered-org-tree-manual.png)

The YAML format uses the resource AKA (Amazon Resource Name) as the key and the discovery level as the value:

```yaml
# Exclude an entire OU
ou-xxxx-xxxxxxxx: none

# Import account metadata only (no resources)
123456789012: account

# Full resource import (default, only needed if overriding parent)
987654321098: resource
```

> [!NOTE]
> Existing accounts already connected individually in Guardrails will automatically move under the organization hierarchy. If you **do not wish to move them**, set their discovery level to `none`.

Click **Next** to proceed to member account configuration.

## Step 7: Configure Member Account Access

This step configures the IAM role that Guardrails uses to access resources in each member account.

### Configure the Member Role

Provide the following information:

- **Role Name**: Enter the IAM role name to be created in each member account.
- **External ID**: Use the auto-generated External ID or provide a custom one.
- **Permission Level**: Select the appropriate permission level for your use case:
  - **ReadOnly + Event Handlers**: Recommended for monitoring and alerting.
  - **Full Remediation**: Required if you want Guardrails to automatically fix issues.

![Discovery tree view](/images/docs/guardrails/connect-account/connect-aws/connect-aws-org/aws-org-member-accounts.png)

### Download and Deploy the Member Role Template

Click the **Download CloudFormation Template** button to download a StackSet-compatible template.

![Discovery tree view](/images/docs/guardrails/connect-account/connect-aws/connect-aws-org/aws-org-type-download-stackset.png)

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

Deploy the template using [CloudFormation StackSets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-getting-started-create-self-managed.html#stacksets-getting-started-create-self-managed-console) to create the IAM role in all member accounts.

### Test Member Account Connection

Select a sample account from the dropdown and click **Test Connection** to verify Guardrails can access member accounts.

![Sample account selection and Test Connection button](/images/docs/guardrails/connect-account/connect-aws/connect-aws-org/aws-org-type-test-connectivity.png)

If successful, you'll see confirmation that Guardrails can connect to the member account.

## Step 8: Connect Organization

Review your configuration and click **Connect Organization** to start the import process.

![Connect Organization button](/images/docs/guardrails/connect-account/connect-aws/connect-aws-org/aws-org-type-connect.png)

Guardrails will create and execute discovery controls for your AWS Organization, scanning each account, Organizational Unit, and resource based on your configured discovery levels.

![Import progress indicator](/images/docs/guardrails/connect-account/connect-aws/connect-aws-account/aws-account-discovery-progress.png)

## Step 9: Review

After the import completes:

- [ ] Confirm that the organization CMDB and discovery controls are in the `OK` state.

Navigate to the **Resources** tab, search for the organization name, and then select the **Controls** tab to check that the controls are in the `OK` state.

![Review Org CMDB and Discovery Controls](/images/docs/guardrails/guides/aws/import-aws-organization/review-org-cmdb-discovery-controls.png)

## Troubleshooting

| **Issue** | **Description** | **Solution/Guide** |
|-----------|-----------------|-------------------|
| Policies Stuck in TBD | Policies may remain in the `TBD` state, preventing them from being evaluated or applied. | See here [how to run policies in batches](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/run_policies_batches) |
| Controls Stuck in TBD | Controls may remain in the `TBD` state, indicating they have not yet run or completed. | See how to [run controls in batches](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/run_controls_batches) |
| Event Handler Controls Not in OK | Event handler controls may not be in the `OK` state, indicating configuration issues with event handlers, topics, or subscriptions. | Refer [Configuring Real-Time events](/guardrails/docs/guides/aws/event-handlers) for more information. |
| Controls encounters an `Access Denied` error | If Guardrails controls encounters an `Access Denied` error due to lack of permission to execute any action in AWS resources. | Refer to [Required Permissions to Grant](/guardrails/docs/guides/aws/import-aws-account#what-permissions-to-grant) for various permission sets. |
| Test Discovery Fails | The discovery role may not have the correct permissions or trust policy. | Verify the CloudFormation stack deployed successfully and the role ARN matches what you entered. |
| Test Connection Fails | The member account role may not exist or have incorrect configuration. | Verify the StackSet deployed to all target accounts and the role name/external ID match. |
| Common errors | Any common errors preventing controls to run. | Refer [Common Troubleshooting](/guardrails/docs/guides/troubleshooting) for more information. |
| Further Assistance | If issues persist or you require additional help, you can access detailed troubleshooting documentation or reach out to support. | Refer to the [Guardrails Troubleshooting Guide](/guardrails/docs/troubleshooting) or [Open a Support Ticket](https://support.turbot.com). |
