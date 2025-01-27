---
title: Import Organization
sidebar_label: Import Organization
---

# Importing an AWS Organization

In this guide, you will:

- Learn how to import an entire AWS Organization into Turbot Guardrails. This process enables Guardrails to discover, govern, and manage resources across all accounts under a single AWS Organization.
- Monitor and troubleshoot the organization import process to ensure a seamless setup.

Importing an AWS Organization into Guardrails involves the following key steps:

- **Preparing AWS Configurations**: Ensure your AWS environment is correctly configured to support Guardrails integration. Create IAM roles to meet the following requirements:
  - Set up access to the **management account** with the necessary permissions for Guardrails to securely access and manage organizational resources.
  - Set up access to **member accounts** in the organization to enable resource discovery.
- **Importing the Organization via the Guardrails Console**: Use the Guardrails console to establish the connection and enable governance across the AWS Organization.

## Prerequisites

- Familiarity with the AWS Console, including admin privileges.
- Access to the Guardrails console with *Turbot/Owner* or *Turbot/Admin* permissions at the Turbot resource level.
- The [`aws` mod](https://hub.guardrails.turbot.com/mods/aws/mods) `v5.36.0` or later installed.
- Minimum Turbot Enterprise (TE) version `v5.48.0` or later.
- A cross-account IAM role in the management account (hosting the organization) and all member accounts. Using [AWS IAM Role Delegation](http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles) allows Guardrails to securely access AWS resources without sharing sensitive credentials like passwords or keys.

## Step 1: Review AWS Side Requirements

This section provides an overview of key AWS configuration requirements needed for importing an AWS Organization into Guardrails. The content references [Importing AWS Account](/guardrails/docs/guides/aws/import-aws-account) for further details.

> [!IMPORTANT]
> Free Tier AWS accounts cannot be used with Guardrails. If attempted, Guardrails will fail to properly discover resources in the account, resulting in errors within the Guardrails console.

- **Understanding AWS Organizations**
  Refer [AWS documentation](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html) to understand terminology and concepts for AWS Organizations

- **Choose Supported AWS Partitions**
   Ensure that your AWS environment uses one of the [supported AWS partitions](/guides/aws/import-aws-account#supported-aws-partitions).

- **Understand What Permissions to Grant**
   Familiarize yourself with the necessary permissions required for Guardrails integration. Refer to [What Permissions to Grant](/guardrails/docs/guides/aws/import-aws-account#what-permissions-to-grant).

- **Learn About Cross-Account Trust**
   Understand the role of [Cross Account Trust](/guardrails/docs/guides/aws/import-aws-account#cross-account-trust) in Turbot Guardrails. For additional context, see AWS's guide on [Cross-account resource access in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies-cross-account-resource-access.html).

- **Use of External IDs**
   Guardrails uses [External IDs](/guardrails/docs/guides/aws/import-aws-account#external-ids) to ensure secure access between Guardrails and AWS accounts. Refer to AWS's guide on [Access to AWS accounts owned by third parties](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html) for further information.

- **Check for Additional External ID Considerations**

  - When you have External ID Protection enabled, (e.g. the policy `AWS > Account > Turbot IAM Role > External ID > Protection` set to Protected), it will be required to use the protected format for the Workspace.
  - Make sure you leave Require MFA disabled on the role.
  - If you are setting your own external ID, be sure it follows [AWS character limits](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html).

Follow below steps to prepare AWS side configurations

## Step 2: Prepare AWS Side Configurations

### Install Desired Mods

>[!NOTE]
> The desired mods are applicable for both AWS account and organization import.

Refer [here](/guardrails/docs/guides/aws/import-aws-account#install-desired-mods) to to install desired mods.

### Get AWS Organization ID

To obtain the Account ID of the management account in your AWS Organization, you can either:

- Log in to the AWS Management Console and navigate to **AWS Organizations**, where the management account ID is displayed.
- Use the AWS CLI by running the command described in the [AWS documentation](https://docs.aws.amazon.com/cli/latest/reference/organizations/describe-organization.html) with more details.

Example AWS CLI Command:

```bash
aws organizations describe-organization
```
### Create Organization Management Account IAM Role

You can create the required IAM role earlier or during the importing process in Guardrails import UI. We recommend to create the IAM roles prior to initiate the initiating the import process. This will help you to have this required IAM role created part of prerequisites

To do this, provide `Role Name`, `External ID` mentioned in [Step 4](#step-4-setup-access-to-your-organization-management-account). Download the CloudFormation template file, which will be updated with the two values you provided i.e. `Role Name`, `External ID`.

![Download Organization CFN Template](/images/docs/guardrails/guides/aws/import-aws-organization/download-management-account-iam-role-cfn-template.png)

You can execute the downloaded template in the AWS management account CloudFormation template

### Update Guardrails Hosted Account ID

> [!IMPORTANT]
> This section is only for customers using enterprise hosted environment. SaaS customer need not update the `GuardrailsSaaSAccountId`

By default Turbot provides the SaaS account ID. While executing CloudFormation template, you must change `GuardrailsSaaSAccountId` to associate your Guardrails hosted primary account.

```
  GuardrailsSaaSAccountId:
    Type: String
    Default: '287590803701'
    Description: >
      The AWS Account ID where Guardrails is installed. This will be added to the
      cross account trust policy of the access role. The default value of '287590803701'
      refers to the account ID of the Turbot Guardrails SaaS environment. Do not change
      the value if importing your account into Guardrails SaaS.
```

### Create Member Accounts IAM Role

You can create the required IAM role earlier or during the importing process in Guardrails import UI. We recommend to create the IAM roles prior to initiate the initiating the import process. This will help you to have this required IAM role created part of prerequisites

To do this, provide `Role Name`, `External ID` mentioned in [Step 5](#step-5-setup-access-to-your-member-accounts). Download the CloudFormation template file, which will be updated with the two values you provided i.e. `Role Name`, `External ID`.

![Download Member CFN Template](/images/docs/guardrails/guides/aws/import-aws-organization/download-member-account-iam-role-cfn-template.png)

You can execute the downloaded template in the AWS management account CloudFormation template.

Now you have all the required details collected, lets proceed to import organization in Guardrails console.

## Step 3: Login to Guardrails Console

Log into the Guardrails console with provided local credentials or by using any SAML based login and select the **CONNECT** card. Select **AWS**.

![Select Connect](/images/docs/guardrails/guides/aws/import-aws-organization/select-connect.png)

Choose the **AWS Organization** from `Select your account type` option.

![Select AWS Organization](/images/docs/guardrails/guides/aws/import-aws-organization/select-aws-organization.png)

## Step 3: Choose Folder

Select the dropdown in **Choose the folder**  and select the Guardrails [folder](/guardrails/docs/concepts/resources/hierarchy#folders) where you would like to import your organization.

![Choose Folder to Import](/images/docs/guardrails/guides/aws/import-aws-organization/choose-folder-to-import.png)

## Step 4: Setup Access to Your Organization Management Account

Provide your `Organization Account ID` that you got from Step ??, select the `Environment` (called partition), provide the `IAM Role Name` created in the Step ?? (TO DO), provide `External ID`

![Setup Organization Access](/images/docs/guardrails/guides/aws/import-aws-organization/setup-organization-access.png)

## Step 5: Setup Access to Your Member Accounts

Provide the `Role Name` created for each member accounts using Step ??, provide `External ID`

![Setup Member Account Access](/images/docs/guardrails/guides/aws/import-aws-organization/setup-member-accounts-access.png)

## Step 6: Exclude Accounts

This step is required if you wish to exclude specific AWS account or Organization Unit(OU) under organization from being imported into Guardrails.

> [!IMPORTANT]
> Existing accounts already connected individually in Guardrails will automatically move under the organization hierarchy. If you **do not wish to move them**, list them in the YAML exclusion list.

Click the **Edit** button to provide a list of account IDs or OU names under the organization to be excluded.

![Edit Exception List](/images/docs/guardrails/guides/aws/import-aws-organization/exception-list-with-connect.png)

Click the **Preview** button to ensure no errors are displayed. Move to [Step 14](#step-7-initiate-connect).

## Step 7: Initiate Connect

Select **Connect** to begin the import process.

Guardrails will create and execute discovery controls for your AWS organization, scanning each account, organization units and resources under it.

![Check Discovery process](/images/docs/guardrails/guides/aws/import-aws-organization/check-discovery-process.png)

## Step 8: Review

- [ ] Confirm that the organization CMDB and discovery controls are in the `OK` state.

Navigate to the **Resources** tab, search for the organization name, then select **Controls** tab besides to check the controls are on `OK` state.

![Review Org CMDB and Discovery Controls](/images/docs/guardrails/guides/aws/import-aws-organization/review-org-cmdb-discovery-controls.png)

## Troubleshooting

| **Issue**                                  | **Description**                                                                                                                                        | **Solution/Guide**                                                                                                                                                                                                                       |
|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Policies Stuck in TBD                  | Policies may remain in the `TBD` state, preventing them from being evaluated or applied.                                                               | See here [how to run policies in batches](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/run_policies_batches)                                                                                                                              |
| Controls Stuck in TBD                  | Controls may remain in the `TBD` state, indicating they have not yet run or completed.                                                                 | See how to [run controls in batches](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/run_controls_batches)                                                                                                 |
|Event Handler Controls Not in OK       | Event handler controls may not be in the `OK` state, indicating configuration issues with event handlers, topics, or subscriptions.                     | Refer [Configuring Real-Time events](/guardrails/docs/guides/aws/event-handlers) for more information. |
| Common errors.                     | Any common errors preventing controls to run   |Refer [Common Troubleshooting](/guardrails/docs/guides/troubleshooting) for more information.
| Further Assistance                     | If issues persist or you require additional help, you can access detailed troubleshooting documentation or reach out to support.                        | Refer to the [Guardrails Troubleshooting Guide](/guardrails/docs/troubleshooting) or [Open a Support Ticket](https://support.turbot.com).                                                                                         |