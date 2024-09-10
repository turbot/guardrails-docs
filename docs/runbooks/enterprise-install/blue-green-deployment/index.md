---
title: Blue Green Deployment Trigger
sidebar_label: Blue Green Deployment Trigger
---

# Blue Green Deployment

In this runbook, you will:

- Use AWS Service Catalog to update (TEF/TED/TE) for Blue - Green deployment trigger
- Learn how to maintain cloud infrastructure up-to-date

**Blue Green Deployment** Using a `Blue <-> Green` deployment, changes SSM parameter overrides (e.g. IAM role ARNs, ALB timeout, ECS AMI), those are not automatically detected by CloudFormation. Update will recalculate the parameters, but if you wish to refresh your parameters without upgrading, you can toggle this parameter. Simply changing it is enough to force the parameters to be re-read and recalculated. Updating deployment trigger from `blue <-> green` should trigger new Lambda deployment which means a cold restart of the Lambda functions.

> [!NOTE]
> The process remains the same for TEF, TED, and TE. This runbook illustrates the TEF stack. When applying a Blue-Green deployment, first update TEF, followed by TED, and then TE.


## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region where TEF is deployed.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-aws-console.png)

## Step 2: Find Provisioned Product

Choose **Provisioned Products** from the left navigation menu.

![Provisioned Product](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-service-catalog.png)

Note: **Inability to Locate Provisioned TEF Product**
Users may encounter difficulties locating a TEF provisioned product if they were not the original provisioning user.
- Changing the Access Filter in AWS Service Catalog from User to Account can resolve this issue by allowing users to view provisioned products across their entire account.

![Access Filter](/images/docs/guardrails/runbooks/enterprise-install/update-tef/ted-update-access-filter.png)

## Step 3: Select Provisioned Product

Select the TEF provisioned product from the list.

![Select TEF](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-select-tef.png)

Select **Actions** then select **Update** from the dropdown options.

![Select Update](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-actions-update.png)

**Note**:
If user encounter difficulties locating a TEF provisioned product, changing the `Access Filter` in AWS Service Catalog from `User` to `Account` will enable users to view provisioned products across their entire account.

## Step 4: Update the TEF Stack Parameter

Scroll to the `Parameter Deployment Trigger` option in the stack towards the bottom of the stack parameter list in the page.

Flip to `Blue` to `Green` or `Green` to `Blue` depending on the current state.

Select **Update** at the bottom.

![Deployment Trigger Update](/images/docs/guardrails/runbooks/enterprise-install/blue-green-deployment/aws-service-catalog-tef-trigger-change.png)

## Step 5: Check the Status

After applying the update, the status should change to `Under change`

![Deployment Trigger Status](/images/docs/guardrails/runbooks/enterprise-install/blue-green-deployment/aws-service-catalog-tef-update-status-in-progress.png)

## Step 6: Review

You have successfully initiated the TEF Service Catalog product to flip `Parameter Deployment Trigger`.

- [ ] After successful update TEF status should appear with the status `Available`.

![Verify Status](/images/docs/guardrails/runbooks/enterprise-install/blue-green-deployment/aws-service-catalog-tef-update-verify-available.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [TE architecture](https://turbot.com/guardrails/docs/enterprise/architecture).
- Learn about [Guardrails Stack Updates](https://turbot.com/guardrails/docs/enterprise/updating-stacks#guardrails-stack-updates).

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