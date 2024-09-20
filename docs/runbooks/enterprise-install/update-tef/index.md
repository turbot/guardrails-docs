---
title: Update TEF
sidebar_label: Update TEF
---

# Update Turbot Guardrails Enterprise Foundation (TEF)

In this runbook, you will:
- Use AWS Service Catalog to update Turbot Guardrails Enterprise Foundation (TEF)
- Monitor and troubleshoot the TEF update process.

The [Turbot Guardrails Enterprise Foundation (TEF)](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-foundation-tef) is an AWS Service Catalog product that provides automated configuration and management of the infrastructure needed to run the enterprise version of Turbot Guardrails in your AWS account.

The TEF CloudFormation stack creates and manages the networking and compute components that will be shared by all workspaces in a Turbot Guardrails Enterprise installation (Collective).

## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region where TEF is deployed.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/update-tef/aws-service-catalog-console.png)

## Step 2: Navigate Provisioned Products

Choose **Provisioned Products** from the left navigation menu.

![Provisioned Product](/images/docs/guardrails/runbooks/enterprise-install/update-tef/service-catalog-provisioned-products.png)

## Step 3: View Provisioned Products

Change the **Access Filter** in AWS Service Catalog from **User** to **Account** to view all TED provisioned products across the entire account.

![Access Filter](/images/docs/guardrails/runbooks/enterprise-install/update-ted/ted-update-access-filter.png)

## Step 4: Select Provisioned Product

Select the TEF provisioned product from the list.

![Select TEF](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-select-tef.png)

Select **Actions** menu, select **Update**

![Select Update](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-actions-update.png)

## Step 5: Find Version

Sort the Product versions section by `Created time` (descending) to see the latest available version.

![Sort TEF Version](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-version-sorting.png)

## Step 6: Select Version

Select the desired TEF version under **Product Versions**.

![Select TEF Version](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-select-version.png)

## Step 7: Verify Parameters

The values of the parameters will initially be set to match previous run of the product. Review the [release notes](https://turbot.com/guardrails/changelog?tag=tef) for the TEF versions between the existing version and the version you are updating to, and identify any new parameters that require a decision about how they will be set.

Generally, new parameters will be created in a way to have the least disruption on an existing environment, but care should still be taken to understand these and read any new parameter descriptions to understand their impact.

![Parameters Verification](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-verify-parameters.png)

## Step 8: Update TEF

After verifying any changes to existing parameters, select **Update** at the bottom of the screen.

![Select Update](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-select-update.png)

## Step 9: Monitor Update

You have initiated the installation of the new TEF version. This triggers an update of several nested CloudFormation stacks.

Select the TEF Provisioned Product, click the `Outputs` tab, and use the `CloudFormationStackARN` link to navigate to CloudFormation and monitor the update progress.

![Navigate To CFN](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-navigate-cfn.png)

- [ ] Verify TEF stack status transitions to `UPDATE_IN_PROGRESS` upon modification and review the Events tab for expected parameter/resource updates.

![Verify CFN Status](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-cfn-stack-update.png)

## Step 10: Review

- [ ] The TEF CloudFormation stack status should change to `UPDATE_COMPLETE` indicating the update completed successfully.

![CFN Update Complete](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-cfn-update-complete.png)

- [ ] The TEF Provisioned Product status should change to `Available`.

![TEF Provisioned Product Status](/images/docs/guardrails/runbooks/enterprise-install/update-tef/tef-update-update-complete.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Turbot Guardrails Enterprise - Architecture](/guardrails/docs/enterprise/architecture).

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Permission Issues                        | If the current logged-in user lacks permission to modify, update, or create resources in the stack, or if IAM roles or SCPs have changed, preventing built-in roles from accessing needed configuration settings.   | [Troubleshoot Permission Issues](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators)             |
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |
