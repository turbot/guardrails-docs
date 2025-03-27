---
title: Database Upgrade
sidebar_label: Database Upgrade
---

# Database Upgrade

In this guide, you will:

- Resize and/or upgrade a database engine version with minimal downtime using AWS and PostgreSQL tools.

[Turbot Guardrails Enterprise Database (TED)](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) is an AWS Service Catalog product that provides automated configuration and management of the infrastructure needed to run the enterprise version of Turbot Guardrails in your AWS account. Efficient management of database resources ensures optimal storage utilization, minimizes costs, and enhances performance by reducing unused storage. This process also ensures seamless version upgrades with minimal disruption.

Efficient management of database resources ensures optimal storage utilization, minimizes costs, and enhances performance by reducing unused storage. This process also ensures seamless version upgrades with minimal disruption.

## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- PostgreSQL client installed on the [bastion host](https://github.com/turbot/guardrails-samples/tree/main/enterprise_installation/turbot_bastion_host).
- Familiarity with AWS RDS, EC2, Service Catalog and CloudFormation services.
- Ensure logical replication is supported and enabled on the database engine.
- Knowledge of the current database usage (storage and version).
- Awareness of the backup schedule to avoid disruptions during the process.

> [!WARNING]
> After creating replication slots in [Step 12](#step-12-create-publisher-and-replication-slot-in-original-instance), upgrading existing workspaces or creating new ones will not be possible until the process is complete. Additionally, no DDL changes can be performed during this time.

## Step 1: Deploy New TED

Navigate to service catalog and [deploy a new TED](/guardrails/docs/guides/hosting-guardrails/installation/install-ted) product.

![Deploy TED](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/service-catalog-launch-product-ted.png)

Use the same name as the original, appending -blue or -green at the end, and set the Version to 1.45.0 or later.

![Append Name and Version](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/service-catalog-naming-version.png)

> [!NOTE]
> If performing a database version upgrade, use the `DB Engine Version` and `Read Replica DB Engine Version` parameters under the `Database - Advanced - Engine` section. Set the appropriate `DB Engine Parameter Group Family` and the `Hive RDS Parameter Group` under the `Database - Advanced - Parameters` section.

Set the allocated storage to match the current disk usage using the `Allocated Storage in GB` parameter (e.g., if 210 GB out of 500 GB is used, set it to 210 GB) and define the `Maximum Allocated Storage limit in GB` to a suitable value, both located under the `"Database - Advanced - Storage"` section; use the `FreeStorageSpace` metric to determine the size.

![Set Allocated Storage](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/service-catalog-storage-allocation.png)

Set the encryption by configuring the `Custom Hive Key` parameter to use the original KMS key under the `Advanced - Infrastructure` section. This should be the Key ID, typically formatted as: `1111233-abcd-4444-2322-123456789012`.

![Set Encryption](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/service-catalog-set-encryption.png)

Keep all other values unchanged.

## Step 2: Enable Logical Replication in Old Database

Select the main database.

![Select New Database](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/rds-select-new-database.png)

Navigate to the `Configurations` tab and select the **DB instance parameter group**.

![Select DB Instance Parameter Group](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/rds-select-dbinstance-parameter-group.png)

Select **Edit**.

![Edit DB Instance Parameter Group](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/rds-parameter-group-edit.png)

Set `rds.logical_replication` to **1**. Select **Save Changes**.

![Edit DB Instance Parameter Group](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/rds-set-logical-replication-group.png)

## Step 3: Pause Events

[Pause the events](/guardrails/docs/guides/hosting-guardrails/troubleshooting/pause-events#pause-event-processing) to avoid any lost events.

> [!TIP]
> Pausing events before database downtime is critical because:
> - During database unavailability, Guardrails continues to receive events from cloud providers
> - If events are not paused, these events will be lost since they cannot be written to the database
> - Lost events mean missing state changes in your infrastructure, leading to inaccurate resource tracking and potential security/compliance gaps
> - By pausing events, they are queued and will be processed once the database is available again, ensuring no infrastructure changes are missed

## Step 4: Reboot DB Instance

Reboot the DB Instance.

![Reboot DB Instance](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/rds-new-reboot.png)


> [!WARNING]
> During the database reboot, users will experience a brief service interruption lasting approximately 2 minutes. Please plan this maintenance window accordingly.

## Step 5: Start Events

Now enable event processing. Refer [Enable the events](/guardrails/docs/guides/hosting-guardrails/troubleshooting/pause-events#enable-event-processing).

## Step 6: Set Master Password

Select the DB instance and choose **Modify**.

![Select Modify](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/rds-select-modify.png)

Set the master password for both the DB instances via the AWS console.

![Set Master Password](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/rds-update-master-password.png)

Select **Modify DB Instance** and apply the changes.

![Select Modify DB Instance](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/rds-select-modify-dbinstance.png)

## Step 7: Create Bastion Host

Create a Bastion using the [CloudFormation Template](https://github.com/turbot/guardrails-samples/tree/main/enterprise_installation/turbot_bastion_host).

> [!NOTE]
>  Set the bastion host image to `/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-6.1-x86_64`.
>  Set RootVolumeSize to a bit larger than the original DB size (e.g., if 300 GB is used, set RootVolumeSize to 350 GB).

### Connect to Bastion Host

Connect to the newly created Bastion Host

![Connect Bastion Host](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/ec2-connect-bastion-host.png)

## Step 9: Install PostgreSQL Client

To install or update the PostgreSQL client on the bastion host, follow the appropriate instructions for your PostgreSQL version:
- Ensure logical replication is supported and enabled on the database engine.
- Knowledge of the current database usage (storage and version).

## Step 1: Spin up a new TED

- Create a new [TED](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) with the same name as the original, appending `-blue` or `-green` to the end.
- If performing a database version upgrade, use the `DB Engine Version` and `Read Replica DB Engine Version` parameters under the "Database - Advanced - Engine" section. Set the appropriate `DB Engine Parameter Group Family` and the `Hive RDS Parameter Group` under the "Database - Advanced - Parameters" section.
- Set the allocated storage to match the current disk usage (e.g., if 210 GB out of 500 GB is used, set allocated storage to 210 GB) using the `Allocated Storage in GB` parameter under the "Database - Advanced - Storage" section.
- Set the maximum allocated storage to a suitable value using the `Maximum Allocated Storage limit in GB` parameter under the "Database - Advanced - Storage" section.
- Set up encryption by configuring the `Custom Hive Key` parameter to use the original KMS key under the "Advanced - Infrastructure" section. This should be the Key ID, typically formatted as: 1111233-abcd-4444-2322-123456789012.
- Keep the other parameters the same.

## Step 2: Enable Logical Replication

- Go to the AWS Console and navigate to the relevant parameter group.
- Set `rds.logical_replical` to **`1`** if it’s not already set.
- Reboot the DB instance (expected downtime is ~50 seconds).

## Step 3: Set Master Password

- Set the master password for both instances via the AWS UI.

## Step 4: Setup and Connect to Bastion Host

- Update the CloudFormation stack:
- Set the bastion host image to `/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-6.1-x86_64`.
- Set RootVolumeSize to a bit larger than the original DB size (e.g., if 300 GB is used, set RootVolumeSize to 350 GB).
- Start a session (link in the Output section of the stack).
- Install or update the PostgreSQL client:

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
## Step 5: Create a Temporary Folder for Migrations

Create a folder and set the necessary permissions:

```shell
sudo mkdir tmp_migrations
sudo chmod 777 tmp_migrations
cd tmp_migrations
```

## Step 11: Set Environment Variables

Set the source and target DB endpoints, available under the **Connectivity & Security** tab of the RDS DB instance, and export the pg password configured in [Step 6](#step-6-set-master-password).
## Step 6: Set Environment Variables

Set the necessary environment variables:

```shell
export SOURCE=<source_db_endpoint>
export TARGET=<target_db_endpoint>
export PGPASSWORD=<master_password_set_in_step_5>
```

![DB Instance Endpoint](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/rds-endpoint.png)

## Step 12: Create Publisher and Replication Slot in Source DB Instance

Execute the commands to create a publication and replication slot. Make a note of the output value for future use.

```
export PGPASSWORD=<master_password_set_in_step_3>
```

## Step 7: Create Publisher and Replication Slot in Original Instance

Create a publication and replication slot:

```shell
psql --host=$SOURCE --username=master --dbname=turbot
CREATE PUBLICATION pub_blue FOR ALL TABLES;
SELECT \* FROM pg_create_logical_replication_slot('rs_blue', 'pgoutput');
```

## Step 13: Create a Source DB PG Dump

Establish a bastion host session, set the transaction isolation level, and export a snapshot using these commands.
>[NOTE!]
> This does not create an actual snapshot but captures the current state of the database and assigns it an ID.
SELECT * FROM pg_create_logical_replication_slot('rs_blue', 'pgoutput');
```

## Step 8: Dump the Entire Source DB

Start a session and set the transaction isolation level and export a snapshot. Note: this doesn't create an actual snapshot but captures the current state of the db and assigns an id to it.

```shell
psql --host=$SOURCE --username=master --dbname=turbot
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SELECT pg_current_wal_lsn(), pg_export_snapshot();
```
Keep this session open, as the snapshot ID will be used in the next step.

```shell
turbot=*> SELECT pg_current_wal_lsn(), pg_export_snapshot();
 pg_current_wal_lsn | pg_export_snapshot
--------------------+---------------------
 AC96/49F46070      | 00000062-000182C4-1
(1 row)
```

In a new session, initiate the `pg_dump` process using the `snapshot ID` obtained from the previous step:

```shell
nohup time pg_dump -h $SOURCE -U master --snapshot="00000062-000182C4-1" -F c -b -v -f data.dump turbot > dump.log 2>&1
```

Monitor the `dump.log` file to confirm the process has begun. Look for log entries indicating table contents are being dumped.

Keep this session open, in a new session, start pg_dump using the snapshot id returned by the above command:

```shell
nohup time pg_dump -h $SOURCE -U master --snapshot="0000001F-000007C1-1" -F c -b -v -f data.dump turbot > dump.log 2>&1
```

Wait for dump to start, you can do this by looking for table dump logs in the `dump.log` file - ex: `pg_dump: dumping contents of table "<table_name>"`:

```shell
cat dump.log
```

Once `pg_dump` is running, return to the first session which has the transaction isolation set and rollback the transaction isolation settings.
Once the dump has started, return to the first session in which transaction isolation was set and rollback the transactions.

```sql
ROLLBACK;
```

>[NOTE!] This process may take several hours, depending on the size of the database dump.
> The purpose of using the nohup command is to ensure that the pg_dump process continues to run even if the session is terminated.
Dump might take several hours, so run ps aux periodically and look for the pg_dump process to check if it's still running, even if the connection to the bastion host is terminated, the process will keep running in the backgroud.

```shell
ps aux | grep pg_dump
```

Once complete, check for errors in the dump file.

```shell
cat dump.log | grep error
cat dump.log
```

## Step 14: Restore Dump in Target Database
Once the dump is complete, look for erros in the dump file

```shell
cat dump.log | grep error
```

## Step 9: Restore the Dump in the Target DB

Restore the database in the target instance:

```shell
nohup time pg_restore -h $TARGET -U master --verbose --no-publications --no-subscriptions --clean --if-exists -d turbot data.dump > restore.log 2>&1
```
The restore process may take several hours. Periodically run `ps aux` to check if the `pg_restore` process is still active.

Restore might take several hours, so run ps aux periodically and look for the pg_restore process to check if it's still running, even if the connection to the bastion host is terminated, the process will keep running in the backgroud.

```shell
ps aux | grep pg_restore
```

Check for any errors in the restore process.

```bash
cat restore.log | grep error
```

## Step 15: Create Subscription in the Target DB Instance

Create a subscription in the target database. Save the value to be used in the next step.
## Step 10: Create Subscription in the New DB Instance

Create a subscription in the target database:

```shell
psql --host=$TARGET --username=master --dbname=turbot
CREATE SUBSCRIPTION sub_blue CONNECTION 'host=spongebob-elsa.coaztwuilyxs.us-east-1.rds.amazonaws.com port=5432 password=postgres user=master dbname=turbot' PUBLICATION pub_blue WITH (
        copy_data = false,
        create_slot = false,
        enabled = false,
        synchronous_commit = false,
        connect = true,
        slot_name = 'rs_blue'
    );
SELECT * FROM pg_replication_origin;
SELECT pg_replication_origin_advance('output_from_step_above','output_from_pg_backup_start');
ALTER SUBSCRIPTION sub_blue ENABLE;
```
```shell
turbot=> SELECT * FROM pg_replication_origin;
 roident |   roname
---------+------------
       1 | pg_1846277
(1 row)
```

## Step 16: Monitor Progress

Execute the following command in the source database to monitor the replication progress. Proceed to the next steps once the `lsn_distance` reaches **0**.

## Step 11: Monitor Progress

Run the following in the source database to monitor the replication progress:

```shell
psql --host=$SOURCE --username=master --dbname=turbot
SELECT slot_name, confirmed_flush_lsn as flushed, pg_current_wal_lsn(), (pg_current_wal_lsn() - confirmed_flush_lsn) AS lsn_distance FROM pg_catalog.pg_replication_slots WHERE slot_type = 'logical';
```

## Step 17: Pause Events

Similar to [Step 3](#step-3-pause-events), [Pause Events](https://turbot.com/guardrails/docs/guides/hosting-guardrails/troubleshooting/pause-events).

## Step 18: Add Triggers

Execute the commands on the target database to set local search path and create Triggers. Replace the `$WORKSPACE_SCHEMA` with the actual schema name.

Workspace schemas can be retrieved by executing the `\dn` command.

```shell
psql --host=$TARGET --username=master --dbname=turbot
```

```shell
set local search_path to $turbot_schema, public;
## Step 12: Add Triggers

Check the restore log file (restore.log) and make sure there are only 11 entries per schema when you run the below -

```bash
cat restore.log | grep error
```

Set local search path

```shell
psql --host=$TARGET --username=master --dbname=turbot
set local search_path to <workspace_schema>, public;
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
## Step 13: Test Data

Run the following queries to compare the count of functions, triggers, indexes, and constraints between the source and target databases:

**Triggers**:

```sql
SELECT count(trigger_name), trigger_schema FROM information_schema.triggers group by trigger_schema;
```

**Indexes**:

```sql
SELECT n.nspname AS schema_name, COUNT(i.indexname) AS index_count FROM pg_catalog.pg_indexes i JOIN pg_catalog.pg_namespace n ON i.schemaname = n.nspname WHERE n.nspname NOT IN ('pg_catalog', 'information_schema') GROUP BY n.nspname ORDER BY index_count DESC;
```

**Functions**:

```sql
SELECT n.nspname AS schema_name, p.proname AS function_name FROM pg_catalog.pg_proc p LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace WHERE n.nspname IN ('pg_catalog');
```

**Constraints**:

```sql
SELECT n.nspname AS schema_name, COUNT(c.conname) AS constraint_count FROM pg_catalog.pg_constraint c JOIN pg_catalog.pg_namespace n ON c.connamespace = n.oid WHERE n.nspname NOT IN ('pg_catalog', 'information_schema') GROUP BY n.nspname ORDER BY constraint_count DESC;
```

**Trigger count by status**:

```sql
SELECT count(tgname), tgenabled FROM pg_trigger GROUP by tgenabled;
```

<!-- ## Step 14: Turn Off Events and API and Events tasks.

- Disable events as per the guidelines: [Pause Events](https://turbot.com/guardrails/docs/guides/hosting-guardrails/troubleshooting/pause-events).
- API and Events task can be turned off, by setting the task count to 0 in TE stack. -->

## Step 20: Rename DB Instances

Rename the original instance by appending -blue to its name.

![Rename Original Instance](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/rds-rename-original-instance-append-blue.png)

Rename the new instance by removing the -green suffix.

![Rename New Instance](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/rds-rename-new-instance-remove-green.png)

## Step 21: Start Events

[Start the events](https://turbot.com/guardrails/docs/enterprise/FAQ/pause-events).

## Step 22: Rename Provisioned Product

Rename the service catalog TED provisioned product `Database Hive Name` from `-green` to `-blue`.

![Rename TED Provisioned Product](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/service-catalog-rename-blue.png)

Execute a Green/Blue deployment.

![Blue Green Deployment Trigger](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/database-upgrade/service-catalog-blue-green-deployment.png)

## Step 23: Run Smoke Tests

Run smoke tests to Test both the restored and new database instances to confirm the upgrade.

- Validate the Count of Controls (Pre & Post).
- Validate the Count of Resources (Pre & Post).
- Validate the Count of Active Controls (Pre & Post).
- Ensure all controls are running as expected.
- Confirm events are functioning properly.
- Verify grants are working correctly.
- Ensure stacks are functioning as intended.

## Step 24: Clean Up

Delete the new TED stack along with its associated resources, including the S3 bucket, log groups, and AWS Backup. Clean up replication slots and subscriptions.

## Step 25: Disable and Delete Subscriptions

Disable and delete subscription and replication slots.
## Step 14: Turn Off Events and API and Events tasks.

- Disable events as per the guidelines: [Pause Events](https://turbot.com/guardrails/docs/guides/hosting-guardrails/troubleshooting/pause-events).
- API and Events task can be turned off, by setting the task count to 0 in TE stack.

## Step 15: Rename DB Instances

- Rename the primary instance by appending -green.
- Rename the new instance by removing the -blue suffix.

## Step 16: Turn On Events

Refer to the documentation: [Turn On Events](https://turbot.com/guardrails/docs/guides/hosting-guardrails/troubleshooting/pause-events).

## Step 17: Rename the Old Instance

Rename the old instance from -green to -blue. Execute a Green/Blue deployment.

## Step 18: Run Smoke Tests

Test the restored and new database instances to confirm the upgrade.

## Step 19: Clean Up

Delete the new TED stack, delete the associated resources listed below, and clean up replication slots and subscriptions.

- S3 bucket
- Log groups
- AWS Backup

## Useful commands

```sql
select * from pg_publication;
drop publication pub_blue;
select * from pg_replication_slots;
select * from pg_drop_replication_slot('rs_blue');
select * from pg_subscription;
alter subscription sub_blue disable;
alter subscription sub_blue set (slot_name=none);
drop subscription sub_blue;
drop schema migration_turbot cascade;
drop schema snoopy_turbot cascade;
```

## Next Steps

- Review additional runbooks for database maintenance or resource optimization.
- Refer to Guardrails documentation for further insights.

## Troubleshooting

| Issue                | Description                                                                                                                                                                                                         | Guide                                                                                                                                        |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| Permission Issues    | Occurs if the logged-in user lacks permissions to modify, update, or create resources in the stack, or if IAM roles or SCPs have changed, preventing built-in roles from accessing required configuration settings. | [Troubleshoot Permission Issues](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators)     |
| Further Assistance   | If you continue to encounter issues, please open a support ticket with detailed information to expedite resolution.                                                                                                 | [Open Support Ticket](https://support.turbot.com)                                                                                            |