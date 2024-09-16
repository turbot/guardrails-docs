---
title: Install TED
sidebar_label: Install TED
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

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/install-ted/install-ted-aws-console.png)

## Step 2: Navigate to Products

Select the **Products** section from the left navigation menu.

![Product Selection](/images/docs/guardrails/runbooks/enterprise-install/install-ted/install-ted-service-catalog-select-products.png)

## Step 3: Launch Product

Select **Turbot Guardrails Enterprise Foundation** from the products list, select **Launch Product**.

![Product Selection](/images/docs/guardrails/runbooks/enterprise-install/install-ted/install-ted-launch-ted-product.pngg)

## Step 4: Name Provisioned Product

Select a Name for the provisioned project. Typically, this will be "ted".

![Name Provisioned Product](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-ted-name-provisioned-product.png)

## Step 5: Find Version

Sort the Product versions section by **Created time** (descending) to see the latest available version.

![Find TED Version](/images/docs/guardrails/runbooks/enterprise-install/install-ted/install-ted-find-version.png)

## Step 6: Select Version

Select the desired TED version under **Product Versions**. Usually, you will want the latest version.

![Select TED Version](/images/docs/guardrails/runbooks/enterprise-install/install-ted/install-ted-select-version.png)

## Step 7: Hive Configuration

Enter the **Database Hive Name**

Select the **Primary Region**. This is where the primary Database currently resides. If set to empty, Turbot Guardrails will use the Alpha region set by TEF as the database's primary region.

![Hive Configuration](/images/docs/guardrails/runbooks/enterprise-install/install-ted/install-ted-hive-configuration.png)

## Step 7: Database Configuration

Choose an **Instance Type for DB**. The correct RDS instance type depends on many factors, including the number of resources and controls, the required performance, and cost considerations. db.m5.2xlarge is a common starting point.

Leave the **Primary endpoint** blank because this is the first region being installed. This is field is only needed when adding a replica in an additional region.

![Database Configuration](/images/docs/guardrails/runbooks/enterprise-install/install-ted/install-ted-database-configuration.png)

## Step 8: Configure Database - Advanced - High Availability

Select **Multi-AZ Failover Enabled** settings. If true, and this region includes the primary instance, then create a failover instance in a different availability zone to the primary instance. In production, a failover instance is recommended

Select **Enable Read Replica for this region**. If true, create a read replica for the hive in this region. In production, it's recommended to have a read replica instance in each region where Turbot Guardrails is running (including the region where the primary instance resides).

![Database Advanced High Availability](/images/docs/guardrails/runbooks/enterprise-install/install-ted/install-ted-database-advanced-high-availability.png)

## Step 9: Configure Database - Advanced - High Availability