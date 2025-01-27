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
- Cross-account IAM roles in the management account and member accounts to securely allow Guardrails access without sharing sensitive credentials.

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

## Step 2: Install Required Mods

> [!NOTE]
> The required mods are applicable for both AWS account and organization imports.

Refer to [Installing Desired Mods](/guardrails/docs/guides/aws/import-aws-account#install-desired-mods) for detailed instructions on installing the required mods.

## Step 3: Get AWS Organization Management Account ID

AWS Organization management account ID is mandatory for organization import. To obtain the account ID of the management account in your AWS Organization, you can either:

- Log in to the AWS Management Console and navigate to **AWS Organizations**, where the management account ID is displayed.
- Use the AWS CLI by running the command described in the [AWS documentation](https://docs.aws.amazon.com/cli/latest/reference/organizations/describe-organization.html).

Example AWS CLI Command:

```bash
aws organizations describe-organization
```
---
## Step 4: Log in to Guardrails Console

Log in to the Guardrails console using your provided local credentials or through any SAML-based login method. Select the **CONNECT** card, then choose **AWS**.

![Select Connect](/images/docs/guardrails/guides/aws/import-aws-organization/select-connect.png)

Next, select **AWS Organization** from the `Select your account type` options.

![Select AWS Organization](/images/docs/guardrails/guides/aws/import-aws-organization/select-aws-organization.png)

## Step 5: Choose Folder

In the **Choose your folder** dropdown, select the Guardrails [folder](/guardrails/docs/concepts/resources/hierarchy#folders) where you want to import your organization.

![Choose Folder to Import](/images/docs/guardrails/guides/aws/import-aws-organization/choose-folder-to-import.png)

## Step 6: Setup Access to Your Organization Management Account

Provide your `Organization Account ID` obtained in Step 3, select the `Environment` (partition), and enter the IAM `Role Name` created in Step 4 along with the `External ID`.

![Setup Organization Access](/images/docs/guardrails/guides/aws/import-aws-organization/setup-organization-access.png)

### Create IAM Role in Management Account

You can create the required IAM role beforehand or during the importing process in the Guardrails Import UI. However, it is recommended to create the IAM roles prior to initiating the import process. This ensures that the required IAM role is ready as part of the prerequisites.

To create the IAM role:

- Download the CloudFormation template file, which will be updated with the two values you provided (i.e., `Role Name` and `External ID`).

![Download Organization CFN Template](/images/docs/guardrails/guides/aws/import-aws-organization/download-management-account-iam-role-cfn-template.png)

Execute the downloaded CloudFormation template in the AWS Management Account to create the IAM role.

#### Update Guardrails Hosted Account ID

> [!IMPORTANT]
> This section applies only to customers using an enterprise-hosted environment. SaaS customers do not need to update the `GuardrailsSaaSAccountId`.

By default, Turbot provides the SaaS account ID. While executing the CloudFormation template, you must update the `GuardrailsSaaSAccountId` to associate it with your Guardrails-hosted primary account.

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
## Step 7: Setup Access to Your Member Accounts

Provide the `Role Name` created for each member account in [Step 5: Create IAM Role in Member Accounts](#step-5-create-iam-role-in-member-accounts) and the corresponding `External ID`.

![Setup Member Account Access](/images/docs/guardrails/guides/aws/import-aws-organization/setup-member-accounts-access.png)

### Create IAM Role in Member Accounts

You can create the required IAM role beforehand or during the importing process in the Guardrails Import UI. However, it is recommended to create the IAM roles prior to initiating the import process. This ensures that the required IAM role is ready as part of the prerequisites.

To create the IAM role:

Download the CloudFormation template file, which will be pre-configured with the values you provided (i.e., `Role Name` and `External ID`).

![Download Member CFN Template](/images/docs/guardrails/guides/aws/import-aws-organization/download-member-account-iam-role-cfn-template.png)

Execute the downloaded CloudFormation template in the AWS Management Account to create the required IAM role.

Once all the required details are collected, proceed to import the organization in the Guardrails console.

## Step 8: Exclude Accounts and Organization Unit

If you wish to exclude specific AWS accounts or Organizational Units (OUs) from being imported into Guardrails, this step is required.

> [!IMPORTANT]
> Existing accounts already connected individually in Guardrails will automatically move under the organization hierarchy. If you **do not wish to move them**, list them in the YAML exclusion list.

Click the **Edit** button to provide a list of account IDs or OU names to be excluded.

![Edit Exception List](/images/docs/guardrails/guides/aws/import-aws-organization/exception-list-with-connect.png)

Click the **Preview** button to ensure no errors are displayed. Proceed to [Initiate Connect](#step-11-initiate-connect).

## Step 9: Initiate Connect

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
| Common errors.                     | Any common errors preventing controls to run   |Refer [Common Troubleshooting](/guardrails/docs/guides/troubleshooting) for more information.
| Further Assistance                     | If issues persist or you require additional help, you can access detailed troubleshooting documentation or reach out to support.                        | Refer to the [Guardrails Troubleshooting Guide](/guardrails/docs/troubleshooting) or [Open a Support Ticket](https://support.turbot.com).                                                                                         |



---


<!-- ## Step 6: Log in to Guardrails Console

Log in to the Guardrails console using your provided local credentials or through any SAML-based login method. Select the **CONNECT** card, then choose **AWS**.

![Select Connect](/images/docs/guardrails/guides/aws/import-aws-organization/select-connect.png)

Next, select **AWS Organization** from the `Select your account type` options.

![Select AWS Organization](/images/docs/guardrails/guides/aws/import-aws-organization/select-aws-organization.png)

## Step 7: Choose Folder

In the **Choose your folder** dropdown, select the Guardrails [folder](/guardrails/docs/concepts/resources/hierarchy#folders) where you want to import your organization.

![Choose Folder to Import](/images/docs/guardrails/guides/aws/import-aws-organization/choose-folder-to-import.png) -->

