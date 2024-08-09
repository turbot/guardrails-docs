---
title: Deleting a TE Version
sidebar_label: Deleting a TE Version
---

# Deleting Turbot Guardrails Enterprise (TE) Version

In this runbook, you will:
- Delete an installed TE version using the AWS Console.

```
Critical: The TE stack and workspace stack will need to be updated in tandem! Do not delete the old TE stack until the new, updated stack has completed in CloudFormation
```

## Prerequisites

- Access to the Guardrails master account.
- Administrator privileges.
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region where the TE is deployed.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/delete-te/install-te-aws-console.png)

## Step 2: Find TE Provisioned Product

Select the hamburger menu in the top left and choose **Provisioned Products**.

![TE Selection](/images/docs/guardrails/runbooks/enterprise-install/delete-te/delete-te-service-catalog.png)

## Step 3: Delete the TE Version

Select the TE version to be deleted from the list of provisioned products. Click **Actions** and then select **Terminate**.

![Delete Action](/images/docs/guardrails/runbooks/enterprise-install/delete-te/delete-te-terminate-version.png)

Type `terminate` in the confirmation field. Ensure the `Ignore errors (optional)` checkbox is unchecked.

![Confirm Termination](/images/docs/guardrails/runbooks/enterprise-install/delete-te/delete-te-cofirmation.png)

Deletion can take an extended period of time (15 plus minutes).

## Step 4: Review

You have successfully deleted the TE Service Catalog product. Now you can monitor the deletion process for any issues and document any anomalies.

- [ ] A confirmation box stating `Service catalog is terminating te 5.x.x` is displayed.

![Terminating Box](/images/docs/guardrails/runbooks/enterprise-install/delete-te/delete-te-confirmation.png)

- [ ] The deleted TE version in Provisioned products should move to the status **Under change**.

![Verify Status](/images/docs/guardrails/runbooks/enterprise-install/delete-te/delete-te-verify-status.png)

- [ ] The related CloudFormation stack status should be `DELETE_IN_PROGRESS`.

- [ ] Login to the Guardrails environment to verify if its working as expected.

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [TE architecture](https://turbot.com/guardrails/docs/enterprise/architecture).
- Learn about [updating TE stacks](https://turbot.com/guardrails/docs/enterprise/updating-stacks).

## Troubleshooting

### Deletion Fails

Check the CloudFormation stack events tab for errors. If there are any errors, create a support ticket and include relevant screenshots of the errors.
