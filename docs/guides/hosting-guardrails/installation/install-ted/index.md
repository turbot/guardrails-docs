---
title: Install TED
sidebar_label: Install TED 🆕
---

# Install Turbot Guardrails Enterprise Database (TED)

In this runbook, you will:
- Use AWS Service Catalog to install Turbot Guardrails Enterprise Database (TED)
- Monitor and troubleshoot the TED install process.

[Turbot Guardrails Enterprise Database (TED)](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) is an AWS Service Catalog product that provides automated configuration and management of the infrastructure needed to run the enterprise version of Turbot Guardrails in your AWS account.

TED is the database layer of a Turbot Guardrails Enterprise deployment. Creates and manages the Guardrails database infrastructure [Hive](https://turbot.com/guardrails/docs/reference/glossary#hive), which defines physical database and caching resources shared by multiple workspaces.

## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.
- Available Domain name(s) and Valid ACM Certificate(s).

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region where you wish to install TEF.

![AWS Console Home Page](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/aws-service-catalog-console.png)

## Step 2: Navigate to Products

Select the **Products** section from the left navigation menu.

![Product Selection](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-products.png)

## Step 3: Launch Product

Select **Turbot Guardrails Enterprise Foundation** from the products list, select **Launch Product**.

![Product Selection](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-launch-product-ted.png)

## Step 4: Name Provisioned Product

Select a Name for the provisioned project. Typically, this will be "ted".

![Name Provisioned Product](/images/docs/guardrails/runbooks/enterprise-install/install-tef/service-catalog-name-provisioned-product.png)

## Step 5: Find Version

Sort the Product versions section by **Created time** (descending) to see the latest available version.

![Find TED Version](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-find-ted-product-versions.png)

## Step 6: Select Version

Select the desired TED version under **Product Versions**. Usually, you will want the latest version.

![Select TED Version](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-select-ted-version.png)

## Step 7: Hive Configuration

Enter the **Database Hive Name**

Select the **Primary Region**. This is where the primary Database currently resides. If set to empty, Turbot Guardrails will use the Alpha region set by TEF as the database's primary region.

![Hive Configuration](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-ted-parameter-hive-configuration.png)

## Step 7: Database Configuration

Choose an **Instance Type for DB**. The correct RDS instance type depends on many factors, including the number of resources and controls, the required performance, and cost considerations. db.m5.2xlarge is a common starting point.

Leave the **Primary endpoint** blank because this is the first region being installed. This is field is only needed when adding a replica in an additional region.

![Database Configuration](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-ted-parameter-database-configuration.png)

## Step 8: Configure Database - Advanced - High Availability

Select **Multi-AZ Failover Enabled** settings. If true, and this region includes the primary instance, then create a failover instance in a different availability zone to the primary instance. In production, a failover instance is recommended

Select **Enable Read Replica for this region**. If true, create a read replica for the hive in this region. In production, it's recommended to have a read replica instance in each region where Turbot Guardrails is running (including the region where the primary instance resides).

![Database Advanced High Availability](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-ted-parameter-database-advanced-high-availability.png)

## Step 9: Configure Database - Advanced - Engine

Select **DB Engine** as `Postgres` and **DB Engine Parameter Group Family** as postgres15. Then, choose the supported **DB Engine Version** and **Read Replica DB Engine Version** from the dropdown list, and decide whether to enable **Allow major version upgrade** for RDS.

![Database Advanced Engine](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-ted-parameter-database-advanced-engine.png)

## Step 10: Configure Database - Advanced - Storage

Select the desired **Storage Type** based on your requirements. If unsure, GP3 is a reliable starting option. If you choose IO1, you'll need to specify the Provisioned IOPS (only applicable to the IO1 type). [Amazon documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbinstance.html#cfn-rds-dbinstance-iops) for valid values and rations.

![Database Advanced Storage](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-ted-parameter-database-advanced-storage.png)

## Step 11: Configure Database - Advanced - Encryption

In the **Use AWS KMS DB Encryption** field, select either aws/rds to use the predefined AWS KMS key for RDS, or Hive CMK to create a customer-managed key specific to the hive (which is typically more secure and recommended). Similarly select the **Encryption method for Redis**.

![Database Advanced Encryption](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-ted-parameter-database-advanced-encryption.png)

## Step 12: Configure Database - Advanced - Authentication

The **Master User Name for DB** defaults to "master", leave the **MasterPassword** field blank if running TED for the first time, and later update it directly on the database if needed, then update the TED stack with the custom password; alternatively, you can choose to **Use AWS IAM for DB Access**, which is recommended as it eliminates the need to store or rotate secrets.

![Database Advanced Authentication](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-ted-parameter-database-advanced-authentication.png)

## Step 13: Configure Database - Advanced - Backup & Snapshots

It is recommended to enable **Deletion Protection** to protect database resources from deletion, by explicitly setting it to false. You may also set the Backup Retention Period to specify how many days automated backups will be retained, and choose whether to **Delete Automated Backups** when the primary instance is deleted (the recommended value is false).

![Database Advanced Backups and Snapshots](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-ted-parameter-database-advanced-backup-snapshot.png)

## Step 14: Configure Database - Advanced - Logging

Select the **Type of Statements to be Logged** and set the **Minimum Duration for Logging in ms** to define the threshold execution time above which statements will be logged. Then set the value to **Delete logs older than N minutes**.

Enable or Disable **Performance Insights** for your database instances and set the **Maximum Concurrent Connections** along with the Alarm and Critical Alarm **Threshold for maximum number of concurrent connections**.

![Database Advanced Logging](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-ted-parameter-database-advanced-logging.png)

## Step 15: Configure Cache

Choose to **Use Elasticache** and select the desired values for **ElastiCache Version**, **Cache Node Type** and the **Cache Number Of Nodes**.

![Cache](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-ted-parameter-cache.png)

## Step 16: Configure Advanced - Foundation Parameters and Overrides

The Foundation Parameters allow the TED stack to use SSM parameters defined in the TEF stack. You should only change these values if you did not use the default Resource Name Prefix (turbot) in the TEF stack.

![Foundation Parameters](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-ted-parameter-adavanced-foundation-parameters.png)

The Foundation Overrides allow you to override values defined in the TEF stack. You will likely want to leave these blank.

## Step 17: Advanced - Infrastructure

Select a **Resource Name Prefix** which will be added to all Turbot Guardrails resources. Because this prefix will be used across many resource types and different resource types have different name restrictions, you should avoid special characters and uppercase letters. This prefix should match the name prefix you used in the TEF stack.

> [!NOTE]
> It is HIGHLY RECOMMENDED that you use the default prefix! The TEF Stack will export the parameters that you have select to an SSM parameter, and they will use this prefix. Using the default will greatly simplify TE deployments and upgrades.

![Advanced Infrastructure](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-ted-parameter-advanced-infrastructure.png)

## Step 18: Launch Product

Select **Launch product**.

![Launch Product](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-ted-launch-product-action.png)

## Step 19: Monitor Installation

You have initiated the installation of the new TED version. This triggers an update of several nested CloudFormation stacks.

The TED stack should be in the **CREATE_IN_PROGRESS** status.

![Under Change Status](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/cfn-ted-create-progress.png)

## Step 20: Review

- [ ] The TEF CloudFormation stack status should change to `CREATE_COMPLETE` indicating the installation completed successfully.

![CFN Create Complete](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/cfn-ted-create-complete.png)

- [ ] The TE `Provisioned product` status should change to `Available`.

![Installation Complete Verification](/images/docs/guardrails/guides/hosting-guardrails/installation/install-ted/service-catalog-ted-create-complete.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Turbot Guardrails Enterprise - Architecture](/guardrails/docs/enterprise/architecture).
- Learn more about [Updating TED](/guardrails/docs/runbooks/enterprise-install/update-ted).

## Troubleshooting

### Permissions Issues

TODO