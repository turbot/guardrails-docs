---
title: Install TE
sidebar_label: Install TE
---

# Install Turbot Guardrails Enterprise (TE)

In this runbook, you will:
- Use AWS Service Catalog to install Turbot Guardrails Enterprise (TE).
- Monitor and troubleshoot the installation process.

[Turbot Guardrails Enterprise (TE)](https://turbot.com/guardrails/docs/reference/glossary#urbot-guardrails-enterprise-te) is an AWS Service Catalog product that provides automated configuration and management of the infrastructure needed to run the enterprise version of Turbot Guardrails in your AWS account.

TE is application layer of a Turbot Guardrails Enterprise deployment. Relies on the [Turbot Guardrails Enterprise Database (TED)](https://turbot.com/guardrails/docs/reference/glossary#urbot-guardrails-enterprise-database-ted) and [Turbot Guardrails Enterprise Foundation (TEF)](https://turbot.com/guardrails/docs/reference/glossary#urbot-guardrails-enterprise-foundation-tef) products. TE deploys a new version of the Turbot software -- Every Turbot release requires a new TE version.

## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](http://localhost:3000/guardrails/docs/enterprise/FAQ/admin-permissions#overview).
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region to deploy TE.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/install-te/install-te-aws-console.png)

## Step 2: Navigate to Products

Select the **Products** section from the left navigation menu.

![Product Selection](/images/docs/guardrails/runbooks/enterprise-install/install-te/install-te-product-selection.png)

Select **Turbot Guardrails Enterprise** from the products list, then select **Launch Product**.

![Launch Product](/images/docs/guardrails/runbooks/enterprise-install/install-te/install-te-launch-product.png)

## Step 3: Find Version

Sort the Product versions section by Created time (descending) to see the latest available version.

![Find Version](/images/docs/guardrails/runbooks/enterprise-install/install-te/install-te-find-versions.png)

## Step 4: Name Provisioned Product

Select the desired TE version under **Product Versions**., then name the provisioned product.

> [!NOTE]
> When selecting a name for the provisioned product, it's typical to start with "te" and include the version number (e.g., te-5-45-1).

![Provisioned Product Naming](/images/docs/guardrails/runbooks/enterprise-install/install-te/install-te-product-naming.png)

## Step 5: Verify Parameters

The parameters for the TE product are derived from settings chosen earlier during the TEF install, so it is rare that any of the existing parameter values need to be modified. Unless directed to by Turbot support you may safely scroll to the bottom of the parameter list.

![Parameters Verification](/images/docs/guardrails/runbooks/enterprise-install/install-te/install-te-parameters-verification.png)

## Step 6: Launch Product

Select **Launch product**.

![Launch Product](/images/docs/guardrails/runbooks/enterprise-install/install-te/install-te-launch.png)

## Step 7: Monitor Installation

You have initiated the installation of the new TE version. This triggers an update of several nested CloudFormation stacks.

Select the TE Provisioned Product, click the Outputs tab, and use the **CloudFormationStackARN** link to navigate to CloudFormation and monitor the install progress.

![Navigate to CloudFormation](/images/docs/guardrails/runbooks/enterprise-install/install-te/install-te-navigate-cfn.png)

The TE CloudFormation stack status should would be `CREATE_IN_PROGRESS` indicating the install process is in progress.

![Install Progress](/images/docs/guardrails/runbooks/enterprise-install/install-te/install-te-install-cfn-progress.png)

## Step 8: Review

- [ ] The TE CloudFormation stack status should change to `CREATE_COMPLETE` indicating the installation completed successfully.

![CFN Create Complete](/images/docs/guardrails/runbooks/enterprise-install/install-te/install-te-cfn-create-complete.png)

- [ ] The TE provisioned product status should change to `Available`.

![Installation Complete Verification](/images/docs/guardrails/runbooks/enterprise-install/install-te/install-te-install-complete-status.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Updating a Workspace to this version](https://turbot.com/guardrails/docs/enterprise/updating-stacks/update-workspace#updating-the-workspace).

## Troubleshooting

### Permissions Issues

- Current logged in user doesn't have permission to modify/update/create resources in the stack.
- Existing IAM roles have been changed or new SCPs added that prevent the built-in roles from having access needed to reconfigure the software.

You can refer to the updated  permission guide for [AWS Permissions for Turbot Guardrails Administrators](https://turbot.com/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators).

### Stack Update Fails

Identifying the initial error in a CloudFormation template's event stream is crucial for effective troubleshooting. It often provides the root cause of the issue, preventing unnecessary investigations into subsequent errors that might be cascading failures.

- Navigate to `CloudFormation` service and select the failed stack.
- Open `Events` tab, sort by `Timestamp` descending.
- Open the Events tab, and identify the first event with a failed status e.g. `CREATE_FAILED`, `UPDATE_FAILED`, or `DELETE_FAILED`.
- Examine error message for failure details such as invalid parameters, resource limits, etc.

If you encounter any issues, please open a ticket with us at https://support.turbot.com and attach the relevant information to assist you more efficiently.