---

title: Upgrade to Valkey Cache
sidebar_label: Upgrade to Valkey Cache
--------------------------------------

# Upgrade to Valkey Cache

In this guide, you will:

- Use the Turbot Enterprise Database provisioned product in service catalog to migrate from Redis to Valkey.
- Monitor and troubleshoot the [Valkey](https://aws.amazon.com/elasticache/what-is-valkey/) upgrade process.

[Turbot Guardrails Enterprise Database (TED)](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) is an AWS Service Catalog product that automates the provisioning and management of the underlying database and caching infrastructure required for enterprise deployments of Turbot Guardrails.

As part of its infrastructure, TED versions prior to 1.50 use Redis as the caching engine. This guide shows how to update a TED deployment using Redis to one using Valkey.

The migration process described here will seamlessly provision new Valkey cache clusters and decommission the existing Redis instances, ensuring minimal disruption to your Guardrails environment.

## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with AWS Console, Service Catalog and CloudFormation services.
- TED version 1.50.x or higher.

## Step 1: Pause Events

[Pause the events](/guardrails/docs/guides/hosting-guardrails/troubleshooting/pause-events#pause-event-processing) to avoid any lost events. During this time, the respective workspace will still be available in `readonly` mode.

>[!CAUTION]
> AWS only supports migrating from Redis to Valkey within ElastiCache. There is no supported migration path from Valkey back to Redis.
>
> Additionally, AWS has announced that support for Redis in ElastiCache will be deprecated in the future. For more details, see the [official AWS announcement](https://aws.amazon.com/about-aws/whats-new/2024/05/amazon-elasticache-valkey/).


Step 2: Select TED Version

To begin the upgrade process, you'll need to locate the TED provisioned product in AWS Service Catalog and initiate an update.

Follow the initial steps outlined in the Updating TED guide to:
- Access the AWS Service Catalog
- Select the TED provisioned product
- Initiate the Update action

Once you've initiated the update, select the desired TED version under Product Versions.

[!NOTE]
Valkey is only available in TED version 1.50.x or higher.

![Select TED Version](./service-catalog-select-ted-version.png)

## Step 3: Update Parameters

Under **cache**, choose `Valkey` as the ElastiCache Engine. Then select the desired version from the `Valkey Cache Version` dropdown.

![Valkey Parameters Update](./service-catalog-ted-update-parameters.png)

## Step 4: Update TED

After verifying all parameters, scroll down and select **Update**. This initiates an update of several nested CloudFormation stacks, which you can monitor directly from the CloudFormation console.

![Select Update](./service-catalog-ted-update-action.png)

## Step 5: Review Deployment

- [ ] The TED CloudFormation stack status should change to `UPDATE_COMPLETE` indicating the update completed successfully.

![Update Progress ](./cfn-ted-update-progress.png)

- [ ] The newly created Valkey caches will be available under `Valkey caches` in the AWS ElastiCache dashboard.

![Verify Cache](./aws-valkey-cache-complete.png)

## Step 6: Start Events

Enable event processing. Refer [Enable the events](/guardrails/docs/guides/hosting-guardrails/troubleshooting/pause-events#enable-event-processing).

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
