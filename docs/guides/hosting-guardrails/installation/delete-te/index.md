---
title: Delete TE Version
sidebar_label: Delete TE Version
---

# Deleting A Turbot Guardrails Enterprise (TE) Version

In this guide, you will:

- Use AWS Service Catalog to delete an installed TE version.
- Monitor and troubleshoot the TE deletion process.

Deleting old [Turbot Guardrails Enterprise (TE)](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-te) versions declutters the environment, frees up resources for new deployments and reduces cloud costs.

> [!Important]
> The TE stack and workspace stack will need to be updated in tandem! Do not delete the old TE stack until the new, updated stack has completed in CloudFormation

## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region where TE is deployed.

![AWS Console](/images/docs/guardrails/guides/hosting-guardrails/installation/delete-te/aws-console.png)

## Step 2: Navigate Provisioned Products

Choose **Provisioned Products** from the left navigation menu.

![Provisioned Products](/images/docs/guardrails/guides/hosting-guardrails/installation/delete-te/service-catalog-provisioned-products.png)

## Step 3: View Provisioned Products

Change the **Access Filter** in AWS Service Catalog from **User** to **Account** to view all TE provisioned products across the entire account.

![Access Filter](/images/docs/guardrails/guides/hosting-guardrails/installation/delete-te/service-catalog-access-filter.png)

## Step 4: Select Provisioned Product

Select the TE provisioned product from the list to be deleted.

![Select TE](/images/docs/guardrails/guides/hosting-guardrails/installation/delete-te/service-catalog-select-provisioned-product-te.png)

## Step 5: Delete the TE Version

Select **Actions** and choose **Terminate**.

![Delete Action](/images/docs/guardrails/guides/hosting-guardrails/installation/delete-te/service-catalog-terminate-te-provisioned-product.png)

To confirm termination, type `terminate` in the confirmation field and ensure the `Ignore errors (optional)` checkbox remains unchecked.

![Confirm Termination](/images/docs/guardrails/guides/hosting-guardrails/installation/delete-te/service-catalog-terminate-te-confirm-action.png)

When the dialog box shows `Service Catalog is terminating TE` select **Close** and allow the process to continue.

![Close Action](/images/docs/guardrails/guides/hosting-guardrails/installation/delete-te/service-catalog-termination-close-action.png)

> [!NOTE] Deletion can take an extended period of time (15 plus minutes).

## Step 6: Monitor Deletion

You have initiated the deletion of the TE version. This triggers deletion of several nested CloudFormation stacks.

Select the TE Provisioned Product, select the **Outputs** tab, and use the **CloudFormationStackARN** **Value** link to navigate to the CloudFormation stack and monitor the deletion progress.

![Navigate To CFN ](/images/docs/guardrails/guides/hosting-guardrails/installation/delete-te/service-catalog-navigate-cfn.png)

The TE CloudFormation stack status should change to `DELETE_IN_PROGRESS` indicating the delete process is in progress.

![Delete Progress](/images/docs/guardrails/guides/hosting-guardrails/installation/delete-te/cfn-te-stack-delete-progress.png)

## Step 7: Review

- [ ] The TE CloudFormation stack status should change to `DELETE_COMPLETE` indicating the deletion completed successfully.

![Verify Status](/images/docs/guardrails/guides/hosting-guardrails/installation/delete-te/cfn-te-delete-complete.png)

- [ ] The TE Provisioned Product should no longer appear in the list, and a **Success** message stating `Service Catalog successfully terminated TE` is displayed.

![Delete Success](/images/docs/guardrails/guides/hosting-guardrails/installation/delete-te/service-catalog-terminate-success.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [TE architecture](https://turbot.com/guardrails/docs/enterprise/architecture).
- Learn about [TE Installation](/guardrails/docs/enterprise/installation/install-te).

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Permission Issues                        | If the current logged-in user lacks permission to modify, update, or create resources in the stack, or if IAM roles or SCPs have changed, preventing built-in roles from accessing needed configuration settings.   | [Troubleshoot Permission Issues](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators)             |
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |