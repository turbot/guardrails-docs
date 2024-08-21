---
title: Update TEF
sidebar_label: Update TEF
---

# Update Turbot Guardrails Enterprise Foundation (TEF)

In this runbook, you will:
- Use AWS Service Catalog to update Turbot Guardrails Enterprise Foundation (TEF)
- Monitor and troubleshoot the TEF update process.

The **Turbot Guardrails Enterprise Foundation (TEF)** is an AWS Service Catalog product that provides automated configuration and management of the infrastructure needed to run the enterprise version of Turbot Guardrails in your AWS account.

Stack creates and manages the networking and compute components that will be shared by all workspaces in a Turbot Guardrails Enterprise installation.

## Prerequisites

- Access to the Guardrails AWS account with Administrator privileges.
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region where TEF is deployed.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-aws-console.png)

## Step 2: Find Product

Choose **Provisioned Products** from the left navigation menu.

![Provisioned Product](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-service-catalog.png)

Note: **Inability to Locate Provisioned TEF Product**
Users may encounter difficulties locating a TEF provisioned product if they were not the original provisioning user.
- Changing the Access Filter in AWS Service Catalog from User to Account can resolve this issue by allowing users to view provisioned products across their entire account.

![Access Filter](/images/docs/guardrails/runbooks/enterprise-install/update-tef/ted-update-access-filter.png)

## Step 3: Select Product

Select the TEF provisioned product from the list.

![Select TEF](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-select-tef.png)

Select **Actions** then select **Update** fromm the dropdown options.

![Select Update](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-actions-update.png)

**Note**:
If user encounter difficulties locating a TEF provisioned product, changing the `Access Filter` in AWS Service Catalog from `User` to `Account` will enable users to view provisioned products across their entire account.

## Step 4: Find Version

Sort the Product versions section by Created time (descending) to see the latest available version.

![Sort TEF Version](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-version-sorting.png)


## Step 5: Select Version

Select the desired TEF version under `Product Versions`.

![Select TEF Version](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-select-version.png)

## Step 6: Verify Parameters

The values of the parameters will initially be set to match previous run of the product. Review the [release notes](https://turbot.com/guardrails/changelog?tag=tef) for the TEF versions between the existing version and the version you are updating to, and identify any new parameters that require a decision about how they will be set.

Generally, new parameters will be created in a way to have the least disruption on an existing environment, but care should still be taken to understand these and read any new parameter descriptions to understand their impact.

![Parameters Verification](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-verify-parameters.png)

## Step 7: Update TEF

After verifying any changes to existing parameters, select **Update** at the bottom of the screen.

![Select Update](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-select-update.png)

## Step 8: Review

You have initiated the installation of the new TEF version. This triggers an update of several nested CloudFormation stacks.

Select the TEF Provisioned Product, click the Outputs tab, and use the `CloudFormationStackARN` link to navigate to CloudFormation and monitor the update progress.

![Navigate To CFN](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-navigate-cfn.png)

- [ ] Verify TEF stack status transitions to UPDATE_IN_PROGRESS upon modification and review the Events tab for expected parameter/resource updates.

![Verify CFN Status](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-cfn-stack-update.png)

- [ ] Upon completion the TEF CloudFormation stack status should change to **UPDATE_COMPLETE** indicating the update completed successfully.

![CFN Update Complete](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-cfn-update-complete.png)

- [ ] The TEF Provisioned Product Status returns to `Available`.

![TEF Provisioned Product Status](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-update-complete.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Turbot Guardrails Enterprise - Architecture](https://turbot.com/guardrails/docs/enterprise/architecture).

## Troubleshooting

### Permissions Issues

Insufficient user privileges can prevent stack modifications.

- Current logged in user doesn't have permission to modify/update/create resources in the stack.
- Existing IAM roles have been changed or new SCPs added that prevent the built-in roles from having access needed to reconfigure the software.

You can refer to the updated  permission guide for [AWS Permissions for Turbot Guardrails Administrators](https://turbot.com/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators).

### Network Issues
When installing Turbot into an existing VPC, custom CloudFormation stack resources interact with AWS APIs. Correct network configuration is crucial. You can refer to the updated  networking guide for [Managing Network Configurations with Stacks](https://turbot.com/guardrails/docs/enterprise/installation/pre-installation#custom-network-pre-install-checklist).

### Stack Update Fails

Identifying the initial error in a CloudFormation template's event stream is crucial for effective troubleshooting. It often provides the root cause of the issue, preventing unnecessary investigations into subsequent errors that might be cascading failures.

- Navigate to `CloudFormation` service and select the failed stack.
- Open `Events` tab, sort by `Timestamp` descending.
- Open the Events tab, and identify the first event with a failed status e.g. `CREATE_FAILED`, `UPDATE_FAILED`, or `DELETE_FAILED`.
- Examine error message for failure details such as invalid parameters, resource limits, etc.