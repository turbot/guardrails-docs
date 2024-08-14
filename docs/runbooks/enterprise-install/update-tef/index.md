---
title: Updating TEF
sidebar_label: Updating TEF
---

# Update Turbot Guardrails Enterprise Foundation (TEF)

In this runbook, you will:
- Use AWS Service Catalogue to update Turbot Guardrails Enterprise Foundation (TEF)
- Learn how to monitor updates

The **Turbot Guardrails Enterprise Foundation (TEF)** stack creates networking, compute and logging components that will be shared by all workspaces.

## Prerequisites

- Access to the Guardrails master account.
- Administrator privileges.
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region where TEF is deployed.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-aws-console.png)

## Step 2: Navigate To Provisioned Products

Choose **Provisioned Products** from the left navigation menu.

![Provisioned Product](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-service-catalog.png)

## Step 3: Select TEF Provisioned Product

Select the TEF provisioned product from the list.

![Select TEF](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-select-tef.png)

Select **Actions** then select **Update** fromm the dropdown options.

![Select Update](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-actions-update.png)

## Step 4: Find TEF Version

Sort the Product versions section by `Created time` (descending) to see the latest available version.

![Sort TEF Version](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-version-sorting.png)


## Step 5: Select TEF Version

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
- Learn about [TEF Installation](https://turbot.com/guardrails/docs/enterprise/installation/tef-installation).

## Troubleshooting

Common errors with a TEF update:

### Permissions Issues

- Current logged in user doesn't have permission to modify/update/create resources in the stack.
- Existing IAM roles have been changed or new SCPs added that prevent the built-in roles from having access needed to reconfigure the software.

### Stack Update Fails

Identifying the initial error in a CloudFormation template's event stream is crucial for effective troubleshooting. It often provides the root cause of the issue, preventing unnecessary investigations into subsequent errors that might be cascading failures.

- Navigate to `CloudFormation` service and select failed stack.
- Open `Events` tab, sort by `Timestamp` descending.
- Identify first event with status `CREATE_FAILED`, `UPDATE_FAILED`, or `DELETE_FAILED`.
- Examine error message for failure details such as invalid parameters, resource limits, etc.
- Cross-reference error message with corresponding resource or parameter in CloudFormation template.
