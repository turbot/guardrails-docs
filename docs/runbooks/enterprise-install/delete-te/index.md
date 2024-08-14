---
title: Delete TE Version
sidebar_label: Delete TE Version
---

# Deleting Turbot Guardrails Enterprise (TE) Version

In this runbook, you will:
- Delete an installed TE version using the AWS Console.

Deleting old TE versions declutters the environment, frees up resources for new deployments and reduces cloud costs.

```
Critical: The TE stack and workspace stack will need to be updated in tandem! Do not delete the old TE stack until the new, updated stack has completed in CloudFormation
```

## Prerequisites

- Access to the Guardrails master account with Administrator privileges.
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to Service Catalog in the region where the TE is deployed.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/delete-te/install-te-aws-console.png)

## Step 2: Find TE Provisioned Product

Choose **Provisioned Products** from the left navigation menu.

![TE Selection](/images/docs/guardrails/runbooks/enterprise-install/delete-te/delete-te-service-catalog.png)

## Step 3: Delete the TE Version

Select the TE version to be deleted from the list of provisioned products. Click **Actions** and then select **Terminate**.

![Delete Action](/images/docs/guardrails/runbooks/enterprise-install/delete-te/delete-te-terminate-version.png)

To confirm termination, type `terminate` in the confirmation field and ensure the `Ignore errors (optional)` checkbox remains unchecked.

![Confirm Termination](/images/docs/guardrails/runbooks/enterprise-install/delete-te/delete-te-cofirmation.png)

- Note: Deletion can take an extended period of time (15 plus minutes).

## Step 4: Review

You have successfully deleted the TE Service Catalog product. Now you can monitor the deletion process for any issues and document any anomalies.

- [ ] A confirmation box stating `Service catalog is terminating te 5.x.x` is displayed.

![Terminating Box](/images/docs/guardrails/runbooks/enterprise-install/delete-te/delete-te-confirmation.png)

- [ ] The provisioned TE product undergoing deletion should transition to an `Under Change` status.

![Verify Status](/images/docs/guardrails/runbooks/enterprise-install/delete-te/delete-te-verify-status.png)

- [ ] The associated CloudFormation stack should transition to a `DELETE_IN_PROGRESS` status.

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [TE architecture](https://turbot.com/guardrails/docs/enterprise/architecture).
- Learn about [updating TE stacks](https://turbot.com/guardrails/docs/enterprise/updating-stacks).

## Troubleshooting

### Deletion Fails

Identifying the initial error in a CloudFormation template's event stream is crucial for effective troubleshooting. It often provides the root cause of the issue, preventing unnecessary investigations into subsequent errors that might be cascading failures.

- Navigate to `CloudFormation` service and select failed stack.
- Open `Events` tab, sort by `Timestamp` descending.
- Identify first event with status `DELETE_FAILED`.
- Examine error message for failure details such as invalid parameters, resource limits, etc.
- Cross-reference error message with corresponding resource or parameter in CloudFormation template.
