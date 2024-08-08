---
title: Updating TEF
sidebar_label: Updating TEF
---

# Update Turbot Guardrails Enterprise Foundation (TEF)

In this runbook, you will:
- Use AWS Service Catalogue to update Turbot Guardrails Enterprise Foundation (TEF)
- Learn how to monitor updates

The **Turbot Guardrails Enterprise Foundation (TEF)** stack creates networking components that will be shared by all workspaces.

## Prerequisites

- Access to the Guardrails master account.
- Administrator privileges.
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region where TEF is deployed.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-aws-console.png)

## Step 2: Navigate To Provisioned Products

Select the hamburger menu in the top left and choose **Provisioned Products**.

![Provisioned Product](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-service-catalog.png)

## Step 3: Select TEF Provisioned Product

Select the TEF provisioned product from the list.

![Select TEF](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-select-tef.png)

Select **Actions** then select **Update**.

![Select Update](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-actions-update.png)

## Step 4: Select TEF Version

Select the desired TEF version under `Product Versions`.

![Select TEF Version](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-select-version.png)

## Step 5: Verify Parameters

Ensure all parameters are correct. Generally, these can be left as default.

![Parameters Verification](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-verify-parameters.png)

## Step 6: Update TEF

Verify the parameters again and select **Update**.

![Select Update](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-select-update.png)

## Step 7: Review

You have successfully updated TEF. Now you can monitor the product for any issues post-update and document any anomalies.

- [ ] The updated TEF version should appear in Provisioned products with the status **Under change** and the TEF stack in CloudFormation should change status to `UPDATING`.

![Verify Status](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-verify-status.png)

- [ ] The TEF provisioned product status should change to **Available** and the CloudFormation stack status should be **UPDATE_COMPLETE** to ensure the update completed successfully.

![update Complete verification](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-update-complete.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Turbot Guardrails Enterprise - Architecture](https://turbot.com/guardrails/docs/enterprise/architecture).
- Learn about [TEF Installation](https://turbot.com/guardrails/docs/enterprise/installation/tef-installation)

## Troubleshooting

### Update Fails or Takes Too Long

Check the CloudFormation stack events tab for errors. If there are any errors, create a support ticket and include relevant screenshots of the errors.

### Parameters Need Adjustment

Review the parameters and consult the product documentation for correct values.
