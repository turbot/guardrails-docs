---
title: Blue <-> Green Deployment
sidebar_label: Blue <-> Green Deployment
---

# Blue <-> Green Deployment

In this runbook, you will:

- Use AWS Service Catalog to update (TEF/TED/TE) for Blue - Green deployment
- Learn how to maintain cloud infrastructure up-to-date

**Blue - Green Deployment** Using a `Blue <-> Green` deployment, changes SSM parameter overrides (e.g. IAM role ARNs) are not automatically detected by CloudFormation. Upgrades will recalculate the parameters, but if you wish to refresh you parameters without upgrading you can toggle this parameter. Simply changing it is enough to force the parameters to be re-read and recalculated.

**Note**: Process remains same for TEF, TED and TE. This runbook illustrates the TEF stack.

## Prerequisites

- Access to the Guardrails master AWS account with Administrator privileges.
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.
- No downtime required.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/blue-green-deployment/aws-service-catalog-console.png)

## Step 2: Access the Provisioned Product

Navigate to Service Catalog > Provisioned Products

Change `Access Filter` to `Account`

![Service Catalog Provisioned product](/images/docs/guardrails/runbooks/enterprise-install/blue-green-deployment/aws-service-catalog-provisioned-product-list.png)


## Step 3: Update TEF Stack

Select `tef`from the list of provisioned products. Note that, this update process remains same for `ted` & `te`.

Select **Update** from the right top corner **Action** dropdown.

![Service Catalog Update](/images/docs/guardrails/runbooks/enterprise-install/blue-green-deployment/aws-service-catalog-tef-update.png)

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

Common errors with a TEF update:

### Permissions Issues

- Current logged in user doesn't have permission to modify/update/create resources in the stack.
- Existing IAM roles have been changed or new SCPs added that prevent the built-in roles from having access needed to reconfigure the software.

You can Refer to the updated permission guide for [AWS Permissions for Turbot Guardrails Administrators](https://turbot.com/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators).

### Stack Update Fails

Identifying the initial error in a CloudFormation template's event stream is crucial for effective troubleshooting. It often provides the root cause of the issue, preventing unnecessary investigations into subsequent errors that might be cascading failures.

- Navigate to `CloudFormation` service and select the failed stack.
- Open `Events` tab, sort by `Timestamp` descending.
- Open the Events tab, and identify the first event with a failed status e.g. `CREATE_FAILED`, `UPDATE_FAILED`, or `DELETE_FAILED`.
- Examine error message for failure details such as invalid parameters, resource limits, etc.