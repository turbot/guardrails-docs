---
title: Database Migration and Storage Optimization
sidebar_label: Database Migration and Storage Optimization
---

# Database Migration and Storage Optimization

In this guide, you will:

- Resize and/or migrate to a new database engine version with minimal downtime using AWS and PostgreSQL tools.
- Monitor and troubleshoot the upgrade process.

[Turbot Guardrails Enterprise Database (TED)](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) is an AWS Service Catalog product that provides automated configuration and management of the infrastructure needed to run the enterprise version of Turbot Guardrails in your AWS account. Efficient management of database resources ensures optimal storage utilization, minimizes costs, and enhances performance by reducing unused storage. This process also ensures seamless version upgrades with minimal disruption.

## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with AWS RDS, EC2, Service Catalog and CloudFormation services.
- The entire process require minor downtime of two category,
    - First, when DB instance is rebooted i.e. [Step 4](#step-4-reboot-db-instance) where the Guardrails console is still available to access in readonly mode i.e. you can browse all pages but prevented to process any events or running any controls for very short span of time.
    - Second, when the DB endpoint change using TED stack update as specified in [Step 17](#step-17-pause-events) till [Step 21](#step-21-rename-db-instances)

> [!WARNING]
> After creating replication slots in [Step 12](#step-12-create-publisher-and-replication-slot-in-original-instance), upgrading existing workspaces or creating new ones will not be possible until the process is complete. Additionally, no DDL changes can be performed during this time.

## Step 1: Deploy New TED

Navigate to service catalog and [deploy a new TED](/guardrails/docs/guides/hosting-guardrails/installation/install-ted) product.

![Deploy TED](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/service-catalog-launch-product-ted.png)

Use the same name as the original, appending -blue or -green at the end, and set the Version to 1.45.0 or later.

![Append Name and Version](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/service-catalog-naming-version.png)

> [!NOTE]
> If performing a database version upgrade, use the `DB Engine Version` and `Read Replica DB Engine Version` parameters under the `Database - Advanced - Engine` section. Set the appropriate `DB Engine Parameter Group Family` and the `Hive RDS Parameter Group` under the `Database - Advanced - Parameters` section.

Set the allocated storage to match the current disk usage using the `Allocated Storage in GB` parameter (e.g., if 210 GB out of 500 GB is used, set it to 210 GB) and define the `Maximum Allocated Storage limit in GB` to a suitable value, both located under the `"Database - Advanced - Storage"` section; use the `FreeStorageSpace` metric to determine the size.

![Set Allocated Storage](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/service-catalog-storage-allocation.png)

Set the encryption by configuring the `Custom Hive Key` parameter to use the original KMS key under the `Advanced - Infrastructure` section. This should be the Key ID, typically formatted as: `1111233-abcd-4444-2322-123456789012`.

![Set Encryption](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/service-catalog-set-encryption.png)

Keep all other values unchanged.

## Step 2: Enable Logical Replication

After completing the TED installation, go to the AWS RDS console and select the newly created database.

![Select New Database](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/rds-select-new-database.png)

Navigate to the `Configurations` tab and select the **DB instance parameter group**.

![Select DB Instance Parameter Group](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/rds-select-dbinstance-parameter-group.png)

Select **Edit**.

![Edit DB Instance Parameter Group](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/rds-parameter-group-edit.png)

Set `rds.logical_replication` to **1**. Select **Save Changes**.

![Edit DB Instance Parameter Group](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/rds-set-logical-replication-group.png)

## Step 3: Pause Events

[Pause the events](https://turbot.com/guardrails/docs/enterprise/FAQ/pause-events) to avoid any lost events.

## Step 4: Reboot DB Instance

Reboot the DB Instance.

![Reboot DB Instance](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/rds-new-reboot.png)

## Step 5: Start Events

[Start the events](https://turbot.com/guardrails/docs/enterprise/FAQ/pause-events).

## Step 6: Set Master Password

Select the DB instance and choose **Modify**.

![Select Modify](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/rds-select-modify.png)

Set the master password for both the DB instances via the AWS UI.

![Set Master Password](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/rds-update-master-password.png)

Select **Modify DB Instance**.

![Select Modify DB Instance](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/rds-select-modify-dbinstance.png)

## Step 7: Create Bastion Host

Create a Bastion using the [CloudFormation Template](https://github.com/turbot/guardrails-samples/tree/main/enterprise_installation/turbot_bastion_host).

>[NOTE!]
>  Set the bastion host image to `/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-6.1-x86_64`.
>  Set RootVolumeSize to a bit larger than the original DB size (e.g., if 300 GB is used, set RootVolumeSize to 350 GB).

## Step 8: Connect to Bastion Host

Connect to the newly created Bastion Host

![Connect Bastion Host](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/ec2-connect-bastion-host.png)

## Step 9: Install PostgreSQL Client

To install or update the PostgreSQL client on the bastion host, follow the appropriate instructions for your PostgreSQL version:

For PostgreSQL 15:

```shell
sudo dnf install postgresql15.x86_64 postgresql15-server -y
```

For [PostgreSQL 16](https://aws.amazon.com/blogs/database/synopsis-of-several-compelling-features-in-postgresql-16):

```shell
sudo yum install -y gcc readline-devel libicu-devel zlib-devel openssl-devel
sudo wget https://ftp.postgresql.org/pub/source/v16.3/postgresql-16.3.tar.gz
sudo tar -xvzf postgresql-16.3.tar.gz
cd postgresql-16.3
sudo ./configure --bindir=/usr/bin --with-openssl
sudo make -C src/bin install
sudo make -C src/include install
sudo make -C src/interfaces install
```

## Step 10: Create Temporary Folder for Migration

Execute the commands in the home directory to create the `tmp_migrations` folder and assign the required permissions.

```shell
sudo mkdir tmp_migrations
sudo chmod 777 tmp_migrations
cd tmp_migrations
```

## Step 11: Set Environment Variables

Set the source and target DB endpoints, available under the **Connectivity & Security** tab of the RDS DB instance, and export the pg password configured in [Step 6](#step-6-set-master-password).

```shell
export SOURCE=<source_db_endpoint>
export TARGET=<target_db_endpoint>
export PGPASSWORD=<master_password_set_in_step_5>
```

![DB Instance Endpoint](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/rds-endpoint.pngg)

## Step 12: Create Publisher and Replication Slot in Original Instance

Execute the commands to create a publication and replication slot. Make a note of the output value for future use.

```shell
psql --host=$SOURCE --username=master --dbname=turbot
CREATE PUBLICATION pub_blue FOR ALL TABLES;
SELECT \* FROM pg_create_logical_replication_slot('rs_blue', 'pgoutput');
```

## Step 13: Create a Source DB PG Dump

Use `pg_dump` to generate a backup of the source database.

```shell
nohup pg_dump -h $SOURCE -U master -F c -b -v -f data.dump turbot > dump.log 2>&1
```
>[NOTE!] This process may take approximately 3 hours or longer, depending on the size of the database dump.
> The purpose of using the nohup command is to ensure that the pg_dump process continues to run even if the session is disconnected.

Once complete, check for errors in the dump file.

```shell
cat dump.log | grep error
cat dump.log
```

## Step 14: Restore Dump in Target DB

Restore the database dump in the target instance:

```shell
nohup pg_restore -h $TARGET -U master --verbose --no-publications --no-subscriptions --clean --if-exists -d turbot data.dump > restore.log 2>&1
```
Once complete, check for errors in the restore file.

```shell
cat restore.log | grep error
cat restore.log
```
## Step 15: Create Subscription in Target DB Instance

Create a subscription in the target database:

```shell
psql --host=$TARGET --username=master --dbname=turbot
CREATE SUBSCRIPTION sub_blue CONNECTION 'host=vashi-hive-a.c6ktaelkxxkn.ap-south-1.rds.amazonaws.com port=5432 password=postgres user=master dbname=turbot' PUBLICATION pub_blue WITH (
        copy_data = false,
        create_slot = false,
        enabled = false,
        synchronous_commit = true,
        connect = true,
        slot_name = 'rs_blue'
    );
SELECT * FROM pg_replication_origin;
SELECT pg_current_wal_lsn();
SELECT pg_replication_origin_advance('output_from_step_above','<output_from_command_above');
ALTER SUBSCRIPTION sub_blue ENABLE;
```

## Step 16: Monitor Progress

Execute the following command in the source database to monitor the replication progress. Proceed to the next steps once the `lsn_distance` reaches **0**.

>[!NOTE]
> The lsn_distance will continue to fluctuate until events are turned off.

```shell
psql --host=$SOURCE --username=master --dbname=turbot
SELECT slot_name, confirmed_flush_lsn as flushed, pg_current_wal_lsn(), (pg_current_wal_lsn() - confirmed_flush_lsn) AS lsn_distance FROM pg_catalog.pg_replication_slots WHERE slot_type = 'logical';
```

## Step 17: Pause Events

Similar to [Step 3](#step-3-pause-events), [Pause Events](https://turbot.com/guardrails/docs/guides/hosting-guardrails/troubleshooting/pause-events).

## Step 18: Add Triggers

Verify the restore log file (restore.log) to ensure there are only 11 entries per schema when you execute the below commands:

```shell
psql --host=$TARGET --username=master --dbname=turbot
```
Retrieve the workspace schemas by executing the `\dn` command.

Execute the commands to create Triggers. Replace the `$WORKSPACE_SCHEMA` with the actual schema name.

```shell
set local search_path to $turbot_schema, public;
create trigger control_category_path_au after update on $turbot_schema.control_categories for each row when (old.path is distinct from new.path) execute procedure $turbot_schema.types_path_au('controls', 'control_category_id', 'control_category_path');
create trigger control_resource_category_path_au after update on $turbot_schema.resource_categories  for each row when (old.path is distinct from new.path) execute procedure $turbot_schema.types_path_au('controls', 'resource_category_id', 'resource_category_path');
create trigger control_resource_types_path_au after update on $turbot_schema.resource_types for each row when (old.path is distinct from new.path) execute procedure $turbot_schema.types_path_au('controls', 'resource_type_id', 'resource_type_path');
create trigger control_types_path_au after update on $turbot_schema.control_types for each row when (old.path is distinct from new.path) execute procedure $turbot_schema.types_path_au('controls', 'control_type_id', 'control_type_path');
create trigger policy_category_path_au after update on $turbot_schema.control_categories  for each row when (old.path is distinct from new.path) execute procedure $turbot_schema.types_path_au('policy_values', 'control_category_id', 'control_category_path');
create trigger policy_resource_category_path_au after update on $turbot_schema.resource_categories  for each row when (old.path is distinct from new.path) execute procedure $turbot_schema.types_path_au('policy_values', 'resource_category_id', 'resource_category_path');
create trigger policy_resource_types_path_au after update on $turbot_schema.resource_types for each row when (old.path is distinct from new.path) execute procedure $turbot_schema.types_path_au('policy_values', 'resource_type_id', 'resource_type_path');
create trigger policy_types_path_au after update on $turbot_schema.policy_types for each row when (old.path is distinct from new.path) execute procedure $turbot_schema.types_path_au('policy_values', 'policy_type_id', 'policy_type_path');
create trigger resource_resource_category_path_au after update on $turbot_schema.resource_categories for each row when (old.path is distinct from new.path) execute procedure $turbot_schema.types_path_au('resources', 'resource_category_id', 'resource_category_path');
create trigger resource_resource_type_path_au after update on $turbot_schema.resource_types for each row when (old.path is distinct from new.path) execute procedure $turbot_schema.types_path_au('resources', 'resource_type_id', 'resource_type_path');
create trigger resource_types_500_rt_path_update_au after update on $turbot_schema.resource_types for each row when (old.path is distinct from new.path) execute procedure $turbot_schema.update_types_path();
```

## Step 19: Test Data

Run the following queries to compare the count of functions, triggers, indexes, and constraints between the source and target databases:

**Indexes**:

```sql
SELECT n.nspname AS schema_name, COUNT(i.indexname) AS index_count FROM pg_catalog.pg_indexes i JOIN pg_catalog.pg_namespace n ON i.schemaname = n.nspname WHERE n.nspname NOT IN ('pg_catalog', 'information_schema') GROUP BY n.nspname ORDER BY index_count DESC;
```

**Functions**:

```sql
SELECT n.nspname AS schema_name, COUNT(p.proname) AS function_count FROM pg_catalog.pg_proc p LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace WHERE n.nspname NOT IN ('pg_catalog', 'information_schema') GROUP BY n.nspname ORDER BY function_count DESC;
```

**Constraints**:

```sql
SELECT n.nspname AS schema_name, COUNT(c.conname) AS constraint_count FROM pg_catalog.pg_constraint c JOIN pg_catalog.pg_namespace n ON c.connamespace = n.oid WHERE n.nspname NOT IN ('pg_catalog', 'information_schema') GROUP BY n.nspname ORDER BY constraint_count DESC;
```

**Trigger count by status**:

```sql
SELECT count(tgname), tgenabled FROM pg_trigger GROUP by tgenabled;
```

## Step 20: Disable and Delete Subscription

Disable and delete subscription and replication slots

```sql
SELECT subname AS "Subscription Name", subowner AS "Owner ID", subenabled AS "Is Enabled", subpublications AS "Publications" FROM pg_subscription;
alter subscription <subscription_name> disable;
alter subscription <subscription_name> set (slot_name=NONE);
drop subscription <subscription_name>;
```

## Step 21: Rename DB Instances

Rename the original instance by appending -blue to its name.

![Rename Original Instance](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/rds-rename-original-instance-append-blue.png)

Rename the new instance by removing the -green suffix.

![Rename New Instance](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/rds-rename-new-instance-remove-green.png)

## Step 22: Start Events

[Start the events](https://turbot.com/guardrails/docs/enterprise/FAQ/pause-events).

## Step 23: Rename Provisioned Product

Rename the service catalog TED provisioned product `Database Hive Name` from `-green` to `-blue`.

![Rename TED Provisioned Product](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/service-catalog-rename-blue.png)

Execute a Green/Blue deployment.

![Blue Green Deployment Trigger](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-migration-storage-optimization/service-catalog-blue-green-deployment.png)

## Step 24: Run Smoke Tests

Run smoke tests to Test both the restored and new database instances to confirm the upgrade.

- Validate the Count of Controls (Pre & Post).
- Validate the Count of Resources (Pre & Post).
- Validate the Count of Active Controls (Pre & Post).
- Ensure all controls are running as expected.
- Confirm events are functioning properly.
- Verify grants are working correctly.
- Ensure stacks are functioning as intended.

## Step 25: Clean Up

Delete the new TED stack along with its associated resources, including the S3 bucket, log groups, and AWS Backup. Clean up replication slots and subscriptions.

## Troubleshooting

| Issue              | Description                                                                                                                                                                                                       | Guide                                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Permission Issues  | If the current logged-in user lacks permission to modify, update, or create resources in the stack, or if IAM roles or SCPs have changed, preventing built-in roles from accessing needed configuration settings. | [Troubleshoot Permission Issues](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators) |
| Further Assistance | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                                             | [Open Support Ticket](https://support.turbot.com)                                                                                        |