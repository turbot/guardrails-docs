---
title: Updating TED
sidebar_label: Updating TED
---

# Update Turbot Guardrails Enterprise Database (TED)

In this runbook, you will:
- Use AWS Service Catalogue to update Turbot Guardrails Enterprise Database (TED)
- Learn how to monitor installations

**Turbot Guardrails Enterprise Database (TED)** provides an automated configuration and management of Turbot Guardrails database infrastructure to be used when installing/upgrading an enterprise deployment of the Turbot Software.

TED deploys a Turbot Hive, which defines physical database and caching resources shared by multiple workspaces.


## Prerequisites

- Access to the Guardrails master account.
- Administrator privileges.
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region where TED is deployed.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/update-ted/ted-update-aws-console.png)

## Step 2: Navigate To Provisioned Products

Select the hamburger menu in the top left and choose **Provisioned Products**.

![Provisioned Product](/images/docs/guardrails/runbooks/enterprise-install/update-ted/ted-update-service-catalog.png)

## Step 3: Find TED Provisioned Product

The TED provisioned product is identifiable by a postfix that matches the database hive name.

![Find TED](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-find-ted.png)

Select **Actions** then select **Update**.

![Select Update](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-actions-update.png)

## Step 4: Select TED Version

Select the desired TED version under `Product Versions`.

![Select TED Version](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-select-version.png)

## Step 5: Verify Parameters

Ensure all parameters are correct. Generally, these can be left as default.

![Parameters Verification](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-verify-parameters.png)

## Step 6: Update TED

Verify the parameters again and select **Update**.

99.9% of all TE installations do not need to change any parameters. The parameters for the TE stack are designed by default to pick up their values from the TEF configuration, with no options necessary to change on installation.

![Select Update](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-select-update.png)

## Step 7: Review

You have successfully updated TED. Now you can monitor the product for any issues post-update and document any anomalies.

- [ ] The updated TED version should appear in Provisioned products with the status **Under change** and a new CloudFormation stack should be created with the status UPDATING.

![Verify Status](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-verify-status.png)

- [ ] The TED provisioned product status should change to **Available** and the CloudFormation stack status should be **UPDATE_COMPLETE** to ensure the update completed successfully.

![update Complete verification](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-update-complete.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Turbot Guardrails Enterprise - Architecture](https://turbot.com/guardrails/docs/enterprise/architecture).
- Learn about [TED Installation](https://turbot.com/guardrails/docs/enterprise/installation/ted-installation)

## Troubleshooting

### Update Fails or Takes Too Long

Check the CloudFormation stack events tab for errors. If there are any errors, create a support ticket and include a screenshot of the errors.

### Parameters Need Adjustment

Review the parameters and consult the product documentation for correct values.
