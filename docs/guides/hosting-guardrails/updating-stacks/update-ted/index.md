---
title: Update TED
sidebar_label: Update TED
---

# Update Turbot Guardrails Enterprise Database (TED)

In this guide, you will:
- Use AWS Service Catalog to update Turbot Guardrails Enterprise Database (TED).
- Monitor and troubleshoot the TED update process.

[Turbot Guardrails Enterprise Database (TED)](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) is an AWS Service Catalog product that provides automated configuration and management of the infrastructure needed to run the enterprise version of Turbot Guardrails in your AWS account.

TED is the database layer of a Turbot Guardrails Enterprise deployment. Creates and manages the Guardrails database infrastructure [Hive](https://turbot.com/guardrails/docs/reference/glossary#hive), which defines physical database and caching resources shared by multiple workspaces.

## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with AWS Console, Service Catalog and CloudFormation services.

## Step 1: Access RDS Service

>[!CAUTION]
> Before initiating the TED update involving RDS changes, ensure that the RDS instance is in the `Available` status. Any other status may result in potential errors or delays during the TED stack update for the RDS instance.

Open the AWS Console and navigate to the RDS service in the region where TED is deployed.

![Access RDS Console](./rds-console-access.png)

## Step 2: Find RDS Instance

![Find RDS Instance](./rds-find-instance.png)

## Step 3: Check RDS Instance Status

Check the DB instance `Status` in `Available` state.

![RDS Instance Status](./rds-instance-status-available.png)

## Step 4: Access AWS Service Catalog

Open the AWS Console and navigate to the Service Catalog service in the region where TED is deployed.

![AWS Console Home Page](./aws-service-catalog-console.png)

## Step 5: Navigate Provisioned Products

Choose **Provisioned Products** from the left navigation menu.

![Provisioned Products](./service-catalog-provisioned-products.png)

## Step 6: View Provisioned Products

Change the **Access Filter** in AWS Service Catalog from **User** to **Account** to view all TED provisioned products across the entire account.

![Access Filter](./service-catalog-select-access-filter.png)

## Step 7: Find Provisioned Product

The TED provisioned product is identifiable by a postfix that matches the database Hive name.

![Find TED](./service-catalog-find-provisioned-product-ted.png)

From the **Actions** menu, select **Update**

![Select Update](./service-catalog-actions-update.png)

## Step 8: Find Version

Sort the Product versions section by **Created time** (descending) to see the latest available version.

![Find TED Version](./service-catalog-find-ted-product-versions.png)

## Step 9: Select Version

Select the desired TED version under **Product Versions**.

![Select TED Version](./service-catalog-select-ted-version.png)

## Step 10: Verify Parameters

The values of the parameters will initially be set to match previous run of the product. Review the [release notes](https://turbot.com/guardrails/changelog?tag=ted) for the TED versions between the existing version and the version you are updating to, and identify any new parameters that require a decision about how they will be set. Generally, new parameters will be created in a way to have the least disruption on an existing environment, but care should still be taken to understand these and read any new parameter descriptions to understand their impact.

![Parameters Verification](./service-catalog-ted-verify-parameters.png)

> [!CAUTION]
> A frequent issue arises when databases employ auto-scaling storage. Discrepancies in storage figures between the stack and the product can occur if the database has expanded since installation.
> Upgrading to a major version can introduce significant changes and potential risks. You should not upgrade to a new major version without first consulting with Turbot Support.
> To ensure cost-efficiency, review and update instance types and ElastiCache Versions at least annually to align with the latest supported options.

### Upgrade to Valkey cache

As part of the TED infrastructure, Redis has previously been the default caching engine. We now recommend moving to [Valkey](https://aws.amazon.com/elasticache/what-is-valkey/), a community-driven alternative to Redis.

For customers currently using Redis OSS cache, [here is how to update to Valkey](/guardrails/docs/guides/hosting-guardrails/updating-stacks/upgrade-to-valkey-cache).

## Step 11: Update TED

After verifying any changes to existing parameters, select **Update** at the bottom of the screen.

![Select Update](./service-catalog-ted-update-action.png)

## Step 12: Monitor Update

You have initiated the installation of the new TED version. This triggers an update of several nested CloudFormation stacks.

> [!NOTE]
> Depending on the changes selected, the database resource can remain in an updating state for an extended period of time. Viewing the state of the RDS instance(s) in the RDS web console can often provide some context about what is happening at any given time.

Select the TED Provisioned Product, select the **Outputs** tab, and use the **CloudFormationStackARN** **Value** link to navigate to the CloudFormation stack and monitor the update progress.

![Navigate ](./service-catalog-update-ted-navigate-to-cfn.png)

The TED CloudFormation stack status should change to `UPDATE_IN_PROGRESS` indicating the update process is in progress.

![Update Progress ](./cfn-ted-update-progress.png)

## Step 13: Review

- [ ] The TED CloudFormation stack status should change to `UPDATE_COMPLETE` indicating the update completed successfully.

![Verify Status](./cfn-ted-update-complete.png)

- [ ] The TED `Provisioned product` status should change to `Available`.

![TED Provisioned Product Complete Status](./service-catalog-ted-update-complete.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Turbot Guardrails Enterprise - Architecture](/guardrails/docs/enterprise/architecture).
- Learn about [TED Installation](/guardrails/docs/enterprise/installation/ted-installation)

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Permission Issues                        | If the current logged-in user lacks permission to modify, update, or create resources in the stack, or if IAM roles or SCPs have changed, preventing built-in roles from accessing needed configuration settings.   | [Troubleshoot Permission Issues](guides/hosting-guardrails/installation/pre-installation/admin-permissions)             |
| Stack Rollback Failure Due to Database State                   | If the CloudFormation stack attempts to roll back but fails because the database is in a state (e.g., Upgrading, Backing Up) that prevents a successful rollback.                                                  | [Troubleshoot Rollback Failures](guides/hosting-guardrails/troubleshooting/database-instance-not-in-available-state)                  |
| Service Catalog Sync Issue               | If the Service Catalog Provisioned product, CloudFormation Stack, or the physical RDS instance becomes out of sync, causing issues with updates or resource management.                                              | [Troubleshoot Sync Issues](guides/hosting-guardrails/troubleshooting/service-catalog-out-of-sync)                            |
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |
