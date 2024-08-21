---
title: Install TE
sidebar_label: Install TE
---

# Install Turbot Guardrails Enterprise (TE)

In this runbook, you will:
- Use AWS Service Catalog to install Turbot Guardrails Enterprise (TE).
- Monitor and troubleshoot the TE install process.

**Turbot Guardrails Enterprise (TE)** is an AWS Service Catalog product that provides automated configuration and management of the infrastructure needed to run the enterprise version of Turbot Guardrails in your AWS account.

TE is application layer of a Turbot Guardrails Enterprise deployment. Relies on the Turbot Guardrails Database (TED) and Foundation (TEF) products. Each TE installation deploys a new version of the Turbot software -- Every Turbot release requires a new TE version.

## Prerequisites

- Access to the Guardrails primary AWS account with Administrator privileges.
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region to deploy TE.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-aws-console.png)

## Step 2: Find Product

Select the **Products** section from the left navigation pane

![Product Selection](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-product-selection.png)

Select **Turbot Guardrails Enterprise** from the products list, then select **Launch Product**.

![Launch Product](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-launch-product.png)

## Step 3: Name Product

Select the desired version, then name the product with the version number prefixed with `te`.

![Provisioned Product Naming](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-product-naming.png)

## Step 4: Verify Parameters

The parameters for the TE product are derived from settings chosen earlier during the TEF install, so it is rare that any of the existing parameter values need to be modified. Unless directed to by Turbot support you may safely scroll to the bottom of the parameter list.

![Parameters Verification](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-parameters-verification.png)

## Step 5: Launch Product

Select **Launch product**.

![Launch Product](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-launch.png)

## Step 6: Review

You have successfully launched the TE Service Catalog product. Next, you will monitor the product for any issues during the installation.

- [ ] The installed TE version should appear in Provisioned products with the status **Under change**.

![Verify Status](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-verify-install.png)

A new CloudFormation stack should be created with the status `CREATE_IN_PROGRESS`.

![CFN Verify Status](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-cfn-status.png)

- [ ] The TE provisioned product status should change to **Available** and the `CloudFormation` stack status should be **CREATE_COMPLETE** to ensure the installation completed successfully.

![Installation Complete Verification](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-install-complete-status.png)

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