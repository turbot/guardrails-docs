---
title: "Importing an AWS account into Guardrails"
template: Documentation
nav:
  title: "Importing Accounts"
  order: 10
---

# Importing an AWS account into Guardrails

In this guide, you will:

- Import an AWS Account into a Guardrails Folder.

## Prerequisites

Guardrails can get access to an AWS Account by one of the following ways:

- Cross-Account IAM Role (Commercial Cloud)
- IAM Role and User Access Key Pair (AWS China and AWS GovCloud)

## Supported AWS Partitions

There are three account partitions that AWS offers and Guardrails supports. Valid
partition names are:

- `aws` - Public AWS partition (Commercial)
- `aws-cn` - AWS China
- `aws-us-gov` - AWS GovCloud

Consider that Turbot Guardrails is hosted only in AWS commercial accounts. Therefore:

- We can import AWS commercial partition accounts directly by the IAM Role only.
- To import
  [AWS China or AWS GovCloud accounts](guides/aws/import-aws-account/gov-cloud) requires hosting of guardrails in the same partition as those account or using access keys for each account outside of the current AWS Partition.

> [!IMPORTANT]
> Free Tier AWS accounts cannot be used with Guardrails. If this is attempted, Guardrails will fail to properly discover resources in the account and will generate errors in the Guardrails console.

## Import AWS Commercial Account

A few steps must be completed before an account can be imported into a Guardrails workspace:

- A cross-account IAM role in the managed account. Using
  [AWS IAM Role Delegation](http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles)
  allows you to grant access to Guardrails without sharing security credentials like
  passwords or other secrets.
- The `aws` mod installed. This mod holds the resource definition for an AWS
  Account. Additional mods may be desired. Remember that [Mods](https://hub.guardrails.turbot.com/#mods) enable
  Guardrails to discovery and manage for various AWS services. If the mod isn't installed for a particular service,
  Guardrails can't see those resources. Refer to the  [Recommended Starting Mods](mods#recommended-starting-mods) for
  more information.

## What Permissions to Grant

What permissions you grant to the Guardrails IAM role will depend on your use
case(s). Guardrails will use whichever role you specify and the permissions granted
to it. If you instruct Guardrails to perform some action but do not provide
sufficient permissions to perform it, Guardrails will get an "Access Denied" error.
Identify then resolve these errors by either adjusting permissions on the Guardrails
IAM role, or by adjusting your policies. Below are some common permission sets
that customers use. Choose a permission set or construct one that
conforms to your requirements.

- **Full Remediation**

    - If you wish to take advantage of every AWS integration offered by Guardrails,
      attach the Amazon Managed AdministratorAccess Policy:
        - `arn:aws:iam::aws:policy/AdministratorAccess`

- **Mixed Remediation**

    - You may choose to remediate on a select set of services
        - Start with permissions required to manage event handling. Attach the
          AmazonSNSFullAccess, CloudWatchFullAccess, CloudWatchEventsFullAccess, and
          ReadOnlyAccess Amazon Managed Policies:
            - `arn:aws:iam::aws:policy/ReadOnlyAccess`
            - `arn:aws:iam::aws:policy/AmazonSNSFullAccess`
            - `arn:aws:iam::aws:policy/CloudWatchEventsFullAccess`
        - Add additional IAM policies as desired for the target AWS service. For
          example, one could add:
            - `arn:aws:iam::aws:policy/AmazonEC2FullAccess`
            - `arn:aws:iam::aws:policy/AmazonRDSFullAccess`
            - Or any other custom policy that meets your requirements.
        - When crafting custom policies, be aware of the AWS IAM service quotas on
          [policy length](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html)

- **Read Only + Event Handlers**

    - To get ReadOnly Access + Event Handlers, attach the `AmazonSNSFullAccess`,
      `CloudWatchEventsFullAccess`, and `ReadOnlyAccess` Amazon Managed Policies:

        - `arn:aws:iam::aws:policy/ReadOnlyAccess`
        - `arn:aws:iam::aws:policy/AmazonSNSFullAccess`
        - `arn:aws:iam::aws:policy/CloudWatchEventsFullAccess`

    - Or, to strictly limit Guardrails write access to only event
      handling resources, build a role with the following permissions. A
      convenient CloudFormation template can be found
      [below](#ReadOnlyEventHandlers).

        - Attach the `ReadOnlyAccess` Amazon Managed Policies:
            - `arn:aws:iam::aws:policy/ReadOnlyAccess`
        - Create a custom policy that allows write-access to only Turbot event
          handling infrastructure.
            - CloudWatch Events matching:
                - `arn:aws:events:*:${AccountId}:rule/turbot_aws_api_events*`
            - SNS topics and subscriptions matching:
                - `arn:aws:sns:*:${AccountId}:turbot_aws_api_handler`
                - `arn:aws:sns:*:${AccountId}:turbot_aws_api_handler:*`
                - Note that the default resource prefix is `turbot_`. If changes are
                  made to the "Event Rule Name Prefix" or "SNS Topic Name Prefix"
                  policies, then the IAM policy must be updated to match. This is an
                  uncommon requirement. See policy details below.
                    - [AWS > Turbot > Event Handlers > Events > Rules > Name Prefix](/guardrails/docs/mods/aws/aws/policy#aws--turbot--event-handlers--events--rules--name-prefix)
                    - [AWS > Turbot > Event Handlers > SNS > Topic > Name Prefix](/guardrails/docs/mods/aws/aws/policy#aws--turbot--event-handlers--sns--topic--name-prefix)
                - Adjust the partition from `aws` to `aws-us-gov` and `aws-cn` as
                  required.

- **Budget Permissions**
    - Grant permissions to allow the **Budget** control to get the cost usage and
      forecast data:
        - `ce:getCostForecast`
        - `ce:GetCostAndUsage`

## Cross Account Trust

The role must grant cross-account access for the Turbot Guardrails master AWS account to
assume into your AWS account.

- Turbot Cloud customers, you must allow the Turbot SaaS US AWS Account ID:
  `287590803701`
- Turbot Cloud EU customers, you must allow the Turbot SaaS EU AWS Account ID:
  `255798382450`
- Turbot Guardrails Enterprise customers, enter the AWS Account ID of the AWS Account
  where you have installed the Turbot Guardrails Enterprise stacks.

## External IDs

It is required that you set an External ID. There are two sources for the
External ID:

1. Guardrails will suggest an auto-generated External ID that is unique to your
   Turbot Workspace ( e.g. `turbot:123456789012345:foo`). This autogenerated
   external ID must be used when "External ID Protection" is enabled. You can
   use the generated ID for your IAM role to prevent the confused deputy
   problem. For more information, check out our FAQ titled
   [What is Guardrails AWS IAM External ID protection?](faq/general-faq#what-is-turbot-aws-iam-role-external-id-protection)
2. You can set the external ID to any valid external ID you prefer.

**Additional External ID Considerations**

- When you have External ID Protection enabled, (e.g. set to `Protected`), it
  will be required to use the protected format for the Workspace.
- Make sure you leave **Require MFA disabled** on the role.
- If you are setting your own external ID, be sure it follows
  [AWS character limits](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html).

## Role Name

Give the role a meaningful name such as `turbot-service-readonly` (read only) or
`turbot-service-superuser` (for full access), as well as an apt description.

### Create IAM Role

### Using CloudFormation

To simplify setup, you can use the Turbot-provided CloudFormation template. For
EU customers, use `255798382450`.

#### ReadOnly + Global Event Handlers

Recommended starting point for new installations

This represents the minimum privileges required for Guardrails to discover all AWS
resources and configure **global** event handlers.

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

#### Full AdministratorAccess

```yaml
---
AWSTemplateFormatVersion: "2010-09-09"
Parameters:
  RoleName:
    Type: String
    Default: turbot-service-superuser
    Description: The role that Turbot uses to connect to this account

  TurbotAccountId:
    Type: String
    Default: 287590803701
    Description: |
      The AWS Account ID where Turbot is installed.
      This will be added to the trust policy of the role to allow access for Turbot

  TurbotExternalId:
    Type: String
    NoEcho: True
    MinLength: 1
    Description: |
      The AWS External ID to add to the trust policy of the Turbot role

Resources:
  TurbotSuperuserRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Principal:
              AWS: !Sub arn:aws:iam::${TurbotAccountId}:root
            Action:
              - sts:AssumeRole
            Condition:
              StringEquals:
                sts:ExternalId: !Ref TurbotExternalId
      Path: /turbot/core/
      ManagedPolicyArns:
        - "arn:aws:iam::aws:policy/AdministratorAccess"
      RoleName: !Ref RoleName
```



#### ReadOnly + Regional Event Handlers

This represents the minimum privileges required for Guardrails to discover all AWS
resources and configure **regional** event handlers.

```yaml
AWSTemplateFormatVersion: 2010-09-09
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
    Metadata:
      "AWS::CloudFormation::Designer":
        id: e66f3008-2c13-4544-bf72-2a69e5e5a4a9
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
              - !Sub "arn:aws:sns:*:${AWS::AccountId}:turbot_aws_api_handler"
              - !Sub "arn:aws:sns:*:${AWS::AccountId}:turbot_aws_api_handler:*"
    DependsOn:
      - TurbotReadOnlyRole
```

### Using the AWS console

If you do not want to create the role with Cloudformation, you can create it
manually:

1. Login to AWS with a privileged account and navigate to IAM > Roles in the AWS
   IAM Console.

2. Click the **Create Role** button.

   a. Select **Another AWS account** for the type of trusted entity.

   b. For Account ID, enter **287590803701** (The Turbot Guardrails SaaS AWS account ID) if
   you are a SaaS customer. This means that you are granting Guardrails access to
   your AWS account. If you are a Turbot GuardrailsEnterprise customer, enter the AWS
   Account ID where Turbot Guardrails was deployed.

   c. Check **Require External ID** and enter an
   [External ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html).
   You can choose any valid external ID. You will need this ID later, when you
   import the account into your Guardrails workspace. Make sure you leave Require MFA disabled.
   Click Next: Permissions.

3. Select the policies to be attached to the role:
    - To take advantage of every AWS integration offered by Turbot Guardrails(recommended),
      attach the Amazon Managed AdministratorAccess Policy:
        - `arn:aws:iam::aws:policy/AdministratorAccess`
    - To enable readonly access for Guardrails with event handler support:
        - Attach the AmazonSNSFullAccess, CloudWatchFullAccess,
          CloudWatchEventsFullAccess, and ReadOnlyAccess Amazon Managed Policies:
            - `arn:aws:iam::aws:policy/ReadOnlyAccess`
            - `arn:aws:iam::aws:policy/AmazonSNSFullAccess`
            - `arn:aws:iam::aws:policy/CloudWatchEventsFullAccess`
        - Create a policy to grant permissions to get the cost usage and forecast
          data, and attach it to the role:
            - `ce:getCostForecast`
            - `ce:GetCostAndUsage`
4. Click **Next: Tags**.

5. If desired, add tags, then click **Next: Review**.

6. Give the role a meaningful name such as `turbot-readonly` (read only) or
   `turbot-superuser` (for full access), as well as an apt description. Click
   **Create Role**.

### Install Desired Mods

The `aws` mod is required to import AWS accounts into a Guardrails workspace. It must be
installed before account imports can start. Ensure it is installed and the
`Mod installed` control is in the green `ok` state. The `aws-iam` mod is highly
recommended.

Installation of additional mods will depend on the organization's control
objectives. If the organization doesn't have any control objectives on a given
service, don't install that service's mod. Check out our
[Mods recommendation](mods#recommended-baseline-mods) page for more info on
suggested mods to install.

Recommended Mods (in order of installation):

1. [aws](mods/turbot/aws)
2. [aws-iam](mods/turbot/aws-iam)
3. [aws-kms](mods/turbot/aws-kms)
4. [aws-ec2](mods/turbot/aws-ec2)
5. aws-vpc-\*
    - [aws-vpc-core](mods/turbot/aws-vpc-core)
    - [aws-vpc-internet](mods/turbot/aws-vpc-internet)
    - [aws-vpc-connect](mods/turbot/aws-vpc-connect)
    - [aws-vpc-security](mods/turbot/aws-vpc-security)
6. [aws-sns](mods/turbot/aws-sns)
7. [aws-events](mods/turbot/aws-events)
8. [aws-s3](mods/turbot/aws-s3)
9. [aws-cloudtrail](mods/turbot/aws-cloudtrail)
10. [aws-events](mods/turbot/aws-events)

## Importing an AWS Commercial account into a Guardrails folder

Importing accounts into Folders offers increased flexibility and easier
management over importing directly under the Turbot level. Define a
[Folder hierarchy](/guardrails/docs/concepts/resources/hierarchy) prior to import.

### Importing Account via Guardrails Console

1. At the main Guardrails console after logging in with `Turbot/Admin` permissions,
   click the purple **IMPORT** card in the top right.

2. Select **AWS Account** on the left.

3. Use the **Parent Resource** dropdown menu to select the folder where the AWS account
   will be imported.

4. Enter the **Account ID** in the field.

5. Copy the **IAM Role ARN** that was created earlier and paste into the field. The IAM role must be in the account to
   be imported.  Do the same with the **IAM Role External ID**.

6. Click import!

7. CMDB and Discovery controls are enabled by default and Guardrails will begin
   discovering the resources in your AWS account. Resources will start appearing
   right away, and resource discovery will continue to run in the background.

### Importing Account via Terraform

```hcl

#### Create the AWS > Account resource in Turbot
resource "turbot_resource" "account_resource" {
  parent   = id-of-parent-folder
  type     = "tmod:@turbot/aws#/resource/types/account"
  metadata = jsonencode({
    "aws" : {
      "accountId" : "your aws account id", // highlight-line
      "partition" : "aws"
    }
  })
  data = jsonencode({
    "Id" : "your aws account id" //highlight-line
  })
}

#### Set the credentials (Role, external id) for the account via Turbot policies
# AWS > Account > Turbot IAM Role > External ID
resource "turbot_policy_setting" "turbotIamRoleExternalId" {
  resource = turbot_resource.account_resource.id
  type     = "tmod:@turbot/aws#/policy/types/turbotIamRoleExternalId"
  value    = "external id for your turbot role"  //highlight-line
}

# AWS > Account > Turbot IAM Role
resource "turbot_policy_setting" "turbotIamRole" {
  resource = turbot_resource.account_resource.id
  type     = "tmod:@turbot/aws#/policy/types/turbotIamRole"
  value    = "arn of your turbot role"  //highlight-line
}
```

## Post Import Validation

There are a few things to check after importing an account. These criteria
should be used to determine when an account is considered fully imported and
"Open for Business".

### Criteria for a Completed Import

1. **Authentication Policy Check**: Verify that the
   [AWS > Account > Turbot IAM Role](/guardrails/docs/mods/aws/aws/policy#aws--account--turbot-iam-role)
   policy and
   [AWS > Account > Turbot IAM Role > External ID](/guardrails/docs/mods/aws/aws/policy#aws--account--turbot-iam-role--external-id)
   policy are present on the account and have the proper values.
2. **Permissions Check**: Check that the `AWS > Account > CMDB` control has run
   and is in an `ok` state. This is the easiest place to smoke test if the
   Turbot IAM Role, External ID policies and assigned AWS permissions are
   correct.
3. **Policy Values in TBD**: Ensure that all policy values for the new account
   are in `ok` or `skipped`. Any `errors`, `invalid` or `tbd` policy values must
   be resolved before considering this account properly imported.
    - Policy values in `tbd` state should all clear on their own. However, some
      may get stuck and require rerunning.
    - It is essential to clear policy values in `tbd` before attempting to clear
      controls in `tbd`. Clearing `tbd` policies will trigger the controls that
      depend on them to run. Rerunning controls before their policy values are
      out of `tbd` will waste control runs.
4. **Controls in TBD**: Ensure that all controls are in `ok`, `alarm` or
   `skipped`. Any controls in `tbd`, `error` or `invalid` state must be
   resolved.
    - It's common to see thousands of controls in `tbd` shortly after account
      import. Controls in `tbd` state will typically all clear on their own.
      However, some may get stuck and require rerunning.
    - The `Discovery` and `CMDB` controls are an essential subset of all controls
      for this new account.
5. **Event Handlers**: If Event Handling has been enabled, ensure that the
   `AWS > Turbot > Event Handler` controls are in an `ok` state. For extra
   assurance, verify that the `Configured` controls for Events Rules, Event
   Targets, SNS Topics and SNS subscriptions are in an `ok` state too. If not
   using Event Handlers, ensure that the `AWS > Turbot > Event Poller` controls
   are in `ok` and have run in the lsat minute or two.

### Automation Reference

A collection of GraphQL, Terraform and Python to assist developers with
integrating Guardrails into account onboarding pipelines.

- **Account Import GraphQL**:
  [account_import graphql](https://github.com/turbot/guardrails-samples/blob/main/queries/aws/aws_account_import.graphql)
- **Policies Stuck in TBD**: Use the
  [run_policies](https://github.com/turbot/guardrails-samples/tree/main/api_examples/python/run_policies)
  script with this filter to rerun policy values in `tbd`:
  `--filter "resourceId:'<ARNofAccount>' state:tbd"`
- **Controls Stuck in TBD**: Use the
  [run_controls](https://github.com/turbot/guardrails-samples/tree/main/api_examples/python/paging-mutation-example/run_controls.py)
  or
  [run_controls_batches](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/run_controls_batches)
  scripts with this filter to rerun controls in `tbd`:
  `--filter "resourceId:'<ARNofAccount>' state:tbd"`
- **Event Handler Controls not in OK**: Use the Guardrails Samples
  [run_controls_batches](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/run_controls_batches)
  script with this filter:
  `--filter "resourceId:'<ARNofAccount>' controlTypeId:'tmod:@turbot/aws#/control/types/eventHandlers','tmod:@turbot/aws-sns#/control/types/topicConfigured','tmod:@turbot/aws-sns#/control/types/subscriptionConfigured','tmod:@turbot/aws-event#s/control/types/targetConfigured','tmod:@turbot/aws-events#/control/types/ruleConfigured' state:tbd,error,invalid"`

Note that Terraform cannot verify anything beyond the existence and
configuration of the Account resource in Turbot, along with the Turbot IAM role
and External ID policies. Fully automated, lights-out account import requires
additional verification steps after import.

### GraphQL

#### Verify the value of the Turbot IAM role and External ID policy settings

There should be two `items` returned: one for the Turbot IAM role setting and
one for the External ID setting. This query can be run immediately after the
account resource has been created.

```graphql
query AccountAuthPolicySettings($filter: [String!]) {
    policySettings(filter: $filter) {
        items {
            type {
                uri
            }
            value
        }
    }
}
```

variables:

```json
{
  "filter": "resourceId:'arn:aws:::<ACCOUNTID>' policyTypeId:'tmod:@turbot/aws#/policy/types/turbotIamRole','tmod:@turbot/aws#/policy/types/turbotIamRoleExternalId'"
}
```

#### Account CMDB is in OK

This query can be run 30 seconds to a minute after account import. If the
Account CMDB control doesn't exist yet, Turbot will return zero `items`.

```graphql
query AccountCMDBState($filter: [String!]) {
    controls(filter: $filter) {
        items {
            state
            type {
                uri
            }
        }
    }
}
```

variables:

```json
{
  "filter": "controlTypeId:'tmod:@turbot/aws#/control/types/accountCmdb' resourceId:'arn:aws:::<ACCOUNTID>'"
}
```

#### Count of controls and policies in TBD, Error or Invalid

When the count for controls and policy values goes to zero, the account import
is complete. Wait several minutes before running this for the first time. If
polling with this query, 30 second or 1 minute intervals work well.

```graphql
query Resources($filter: [String!]) {
    tbd_controls: controls(filter: $filter) {
        metadata {
            stats {
                total
            }
        }
    }
    tbd_policies: policyValues(filter: $filter) {
        metadata {
            stats {
                total
            }
        }
    }
}
```

variables:

```json
{
  "filter": "resourceId:'arn:aws:::<ACCOUNTID>' state:tbd,error,invalid"
}
```

#### Count of Event Handler and Configured controls in TBD, Error or Invalid

When the count goes to zero, all event handler resources have been successfully
deployed. Wait several minutes before running this for the first time. If
polling with this query, 30 second or 1 minute intervals work well.

```graphql
# When the count for all data goes to zero, the account import is complete.
query Resources($filter: [String!]) {
    event_handlers: controls(filter: $filter) {
        metadata {
            stats {
                total
            }
        }
    }
}
```

variables:

```json
{
  "filter": "resourceId:'arn:aws:::<ACCOUNTID>' controlTypeId:'tmod:@turbot/aws#/control/types/eventHandlers','tmod:@turbot/aws-sns#/control/types/topicConfigured','tmod:@turbot/aws-sns#/control/types/subscriptionConfigured','tmod:@turbot/aws-event#s/control/types/targetConfigured','tmod:@turbot/aws-events#/control/types/ruleConfigured' state:tbd,error,invalid"
}
```
