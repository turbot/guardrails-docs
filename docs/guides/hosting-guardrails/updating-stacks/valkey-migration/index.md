---

title: Migrate to Valkey Cache
sidebar_label: Migrate to Valkey Cache
--------------------------------------

# Migrate to Valkey Cache

In this guide, you will:

* Use AWS Service Catalog to migrate from Redis to Valkey cache.
* Monitor and troubleshoot the Valkey migration process.

[Turbot Guardrails Enterprise Database (TED)](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) is an AWS Service Catalog product that automates the provisioning and management of the underlying database and caching infrastructure required for enterprise deployments of Turbot Guardrails.

As part of its infrastructure, TED currently uses Redis as the caching engine. This guide introduces Valkey as the new, community-driven alternative to Redis — offering improved governance, long-term sustainability, and compatibility with existing Redis features.

The migration process described here will seamlessly provision new Valkey cache clusters and decommission the existing Redis instances, ensuring minimal disruption to your Guardrails environment.

## Prerequisites

* Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
* Familiarity with AWS Console, Service Catalog and CloudFormation services.

### Pause Events

[Pause the events](/guardrails/docs/guides/hosting-guardrails/troubleshooting/pause-events#pause-event-processing) to avoid any lost events. During this time, the respective workspace will still be available in `readonly` mode.

>[!CAUTION]
> Once the ElastiCache has been moved to Valkey it cannot be reverted.

## Step 1: Access AWS Service Catalog

Open the AWS Console and navigate to the **Service Catalog** service in the region where TED is deployed.

![AWS Console Home Page](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/valkey-migration/aws-service-catalog-console.png)

## Step 2: Select TED Provisioned Product

In the **Service Catalog**, choose **Provisioned Products** from the left navigation.

![Provisioned Products](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/valkey-migration/service-catalog-provisioned-products.png)

Change the **Access Filter** from **User** to **Account** to view all TED provisioned products across the account.

![Access Filter](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/valkey-migration/service-catalog-select-access-filter.png)

## Step 3: Find and Update the TED Product

Locate the TED provisioned product, which is identifiable by a postfix matching the database Hive name.

![Find TED](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/valkey-migration/service-catalog-find-provisioned-product-ted.png)

From the **Actions** menu, select **Update**.

![Select Update](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/valkey-migration/service-catalog-actions-update.png)

## Step 4: Select TED Version

Select the desired TED version under **Product Versions**.

> [!NOTE]
> Valkey is only available in TED version 1.50.x or higher.

![Select TED Version](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/valkey-migration/service-catalog-select-ted-version.png)

## Step 5: Update Parameters

Under **cache**, choose `Valkey` as the ElastiCache Engine. Then select the desired version from the `Valkey Cache Version` dropdown.

![Valkey Parameters Update](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/valkey-migration/service-catalog-ted-update-parameters.png)

## Step 6: Update TED

After verifying all parameters, scroll down and select **Update**. This initiates an update of several nested CloudFormation stacks.

![Select Update](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/valkey-migration/service-catalog-ted-update-action.png)

## Step 7: Monitor the Update

Monitor the stack update in progress from the CloudFormation console.

## Step 8: Verify Valkey Cache Deployment

* [ ] The newly created Valkey caches can be found under `Valkey caches` in the AWS ElastiCache dashboard.

![Verify Status](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/valkey-migration/aws-valkey-cache-complete.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

* Learn more about [Turbot Guardrails Enterprise - Architecture](/guardrails/docs/enterprise/architecture).
* Learn about [TED Installation](/guardrails/docs/enterprise/installation/ted-installation)

## Troubleshooting

| Issue                                        | Description                                                                                                                                                                       | Guide                                                                                                                                    |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Permission Issues                            | The current logged-in user lacks permission to modify, update, or create resources in the stack, or IAM roles/SCPs prevent built-in roles from accessing required configurations. | [Troubleshoot Permission Issues](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators) |
| Stack Rollback Failure Due to Database State | CloudFormation stack fails to roll back because the database is in a state (e.g., Upgrading, Backing Up) that prevents rollback.                                                  | [Troubleshoot Rollback Failures](guides/hosting-guardrails/troubleshooting/database-instance-not-in-available-state)                     |
| Service Catalog Sync Issue                   | Service Catalog product, CloudFormation Stack, or physical RDS instance is out of sync, leading to update or resource management issues.                                          | [Troubleshoot Sync Issues](guides/hosting-guardrails/troubleshooting/service-catalog-out-of-sync)                                        |
| Further Assistance                           | If issues persist, open a support ticket with relevant logs and screenshots.                                                                                                      | [Open Support Ticket](https://support.turbot.com)                                                                                        |
