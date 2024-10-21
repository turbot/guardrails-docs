---
title: "Database Upgrade and Storage Optimization"
sidebar_label: "Database Upgrade and Storage Optimization"
---

# Database Upgrade and Storage Optimization

In this guide, you will

- Resize and/or upgrade a database engine version with minimal downtime using AWS and PostgreSQL tools.
  <!-- - Set up logical replication between the source and target databases. -->
  <!-- - Monitor the progress of data migration and verify database synchronization. -->
  <!-- - Rename and clean up database instances after the resizing or upgrade process is complete. -->

Efficient management of database resources ensures optimal storage utilization, minimizes costs, and enhances performance by reducing unused storage. This process also ensures seamless version upgrades with minimal disruption.

## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- PostgreSQL client installed on the [bastion host](https://github.com/turbot/guardrails-samples/tree/main/enterprise_installation/turbot_bastion_host).
- Ensure logical replication is supported and enabled on the database engine
- Knowledge of the current database usage (storage and version)

## Step 1: Spin up a new TED

- Create a new TED with the same name as the original, appending `-blue` or `-green` to the end.
- If performing a database version upgrade, use the `DB Engine Version` and `Read Replica DB Engine Version` parameters under the "Database - Advanced - Engine" section. Set the appropriate `DB Engine Parameter Group Family` and the `Hive RDS Parameter Group` under the "Database - Advanced - Parameters" section.
- Set the allocated storage to match the current disk usage (e.g., if 210 GB out of 500 GB is used, set allocated storage to 210 GB) using the `Allocated Storage in GB` parameter under the "Database - Advanced - Storage" section.
- Set the maximum allocated storage to a suitable value using the `Maximum Allocated Storage limit in GB` parameter under the "Database - Advanced - Storage" section.
- Set up encryption by configuring the `Custom Hive Key` parameter to use the original KMS key under the "Advanced - Infrastructure" section. This should be the Key ID, typically formatted as: 1111233-abcd-4444-2322-123456789012.
- Keep the other parameters the same.

## Step 2: Enable Logical Replication

- Go to the AWS Console and navigate to the relevant parameter group.
- Set `rds.logical_replical` to 1 if it’s not already set.
- Reboot the DB instance (expected downtime is ~50 seconds).

## Step 3: Set Master Password

- Set the master password for both instances via the AWS UI.

## Step 4: Setup and Connect to Bastion Host

- Update the CloudFormation stack:
- Set the bastion host image to `/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-6.1-x86_64`.
- Set RootVolumeSize to a bit larger than the original DB size (e.g., if 300 GB is used, set RootVolumeSize to 350 GB).
- Start a session (link in the Output section of the stack).
- Install or update the PostgreSQL client:

- For PostgreSQL 15:

```shell
sudo dnf install postgresql15.x86_64 postgresql15-server -y
```

- For [PostgreSQL 16](https://aws.amazon.com/blogs/database/synopsis-of-several-compelling-features-in-postgresql-16):

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

## Step 5: Create a Temporary Folder for Migrations

- Create a folder and set the necessary permissions:

```shell
sudo mkdir tmp_migrations
sudo chmod 777 tmp_migrations
cd tmp_migrations
```

## Step 6: Set Environment Variables

Set the necessary environment variables:

```shell
export SOURCE=<source_db_endpoint>
export TARGET=<target_db_endpoint>
export PGPASSWORD=<master_password_set_in_step_3>
```

## Step 7: Create Publisher and Replication Slot in Original Instance

Create a publication and replication slot:

```shell
psql --host=$SOURCE --username=master --dbname=turbot
CREATE PUBLICATION pub_blue FOR ALL TABLES;
SELECT \* FROM pg_create_logical_replication_slot('rs_blue', 'pgoutput');
```

## Step 8: Dump the Entire Source DB

Use pg_dump to create a dump of the source database:

```shell
nohup pg_dump -h $SOURCE -U master -F c -b -v -f data.dump turbot > dump.log 2>&1
```

## Step 9: Restore the Dump in the Target DB

Restore the database in the target instance:

```shell
nohup pg_restore -h $TARGET -U master --verbose --no-publications --no-subscriptions --clean --if-exists -d turbot data.dump > restore.log 2>&1
```

## Step 10: Add Triggers

Check the restore log file (restore.log) and make sure there are only 11 entries per schema when you run the below -

```bash
cat restore.log | grep error
```

- Set local search path

```shell
psql --host=$TARGET --username=master --dbname=turbot
set local search_path to <workspace_schema>, public;
```

```sql
set local search_path to <workspace_schema>;
create trigger control_category_path_au after update on control_categories for each row when (old.path is distinct from new.path) execute procedure types_path_au('controls', 'control_category_id', 'control_category_path');
create trigger control_resource_category_path_au after update on resource_categories  for each row when (old.path is distinct from new.path) execute procedure types_path_au('controls', 'resource_category_id', 'resource_category_path');
create trigger control_resource_types_path_au after update on resource_types for each row when (old.path is distinct from new.path) execute procedure types_path_au('controls', 'resource_type_id', 'resource_type_path');
create trigger control_types_path_au after update on control_types for each row when (old.path is distinct from new.path) execute procedure types_path_au('controls', 'control_type_id', 'control_type_path');
create trigger policy_category_path_au after update on control_categories  for each row when (old.path is distinct from new.path) execute procedure types_path_au('policy_values', 'control_category_id', 'control_category_path');
create trigger policy_resource_category_path_au after update on resource_categories  for each row when (old.path is distinct from new.path) execute procedure types_path_au('policy_values', 'resource_category_id', 'resource_category_path');
create trigger policy_resource_types_path_au after update on resource_types for each row when (old.path is distinct from new.path) execute procedure types_path_au('policy_values', 'resource_type_id', 'resource_type_path');
create trigger policy_types_path_au after update on policy_types for each row when (old.path is distinct from new.path) execute procedure types_path_au('policy_values', 'policy_type_id', 'policy_type_path');
create trigger resource_resource_category_path_au after update on resource_categories for each row when (old.path is distinct from new.path) execute procedure types_path_au('resources', 'resource_category_id', 'resource_category_path');
create trigger resource_resource_type_path_au after update on resource_types for each row when (old.path is distinct from new.path) execute procedure types_path_au('resources', 'resource_type_id', 'resource_type_path');
create trigger resource_types_500_rt_path_update_au after update on resource_types for each row when (old.path is distinct from new.path) execute procedure update_types_path();
```

## Step 11: Create Subscription in the New DB Instance

Create a subscription in the target database:

```shell
psql --host=$TARGET --username=master --dbname=turbot
CREATE SUBSCRIPTION sub_blue CONNECTION 'host=<source_db_endpoint> port=5432 password=<master_password> user=master dbname=turbot' PUBLICATION pub_blue WITH (
        copy_data = false,
        create_slot = false,
        enabled = false,
        synchronous_commit = false,
        connect = true,
        slot_name = 'rs_blue'
    );
SELECT * FROM pg_replication_origin;
SELECT pg_replication_origin_advance('output_from_step_above','<output_from_replication_slot');
ALTER SUBSCRIPTION sub_blue ENABLE;
```

## Step 12: Monitor Progress

Run the following in the source database to monitor the replication progress:

```sql
SELECT slot_name, confirmed_flush_lsn as flushed, pg_current_wal_lsn(), (pg_current_wal_lsn() - confirmed_flush_lsn) AS lsn_distance FROM pg_catalog.pg_replication_slots WHERE slot_type = 'logical';
```

## Step 13: Test the Data

Run the following queries to compare the count of functions, triggers, indexes, and constraints between the source and target databases:

- Triggers:

```sql
SELECT count(trigger_name), trigger_schema FROM information_schema.triggers group by trigger_schema;
```

- Indexes:

```sql
SELECT n.nspname AS schema_name, COUNT(i.indexname) AS index_count FROM pg_catalog.pg_indexes i JOIN pg_catalog.pg_namespace n ON i.schemaname = n.nspname WHERE n.nspname NOT IN ('pg_catalog', 'information_schema') GROUP BY n.nspname ORDER BY index_count DESC;
```

- Functions:

```sql
SELECT n.nspname AS schema_name, COUNT(p.proname) AS function_count FROM pg_catalog.pg_proc p LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace WHERE n.nspname NOT IN ('pg_catalog', 'information_schema') GROUP BY n.nspname ORDER BY function_count DESC;
```

- Constraints:

```sql
SELECT n.nspname AS schema_name, COUNT(c.conname) AS constraint_count FROM pg_catalog.pg_constraint c JOIN pg_catalog.pg_namespace n ON c.connamespace = n.oid WHERE n.nspname NOT IN ('pg_catalog', 'information_schema') GROUP BY n.nspname ORDER BY constraint_count DESC;
```

- Trigger count by status:

```sql
SELECT count(tgname), tgenabled FROM pg_trigger GROUP by tgenabled;
```

## Step 14: Turn Off Events (Optional)

Disable events as per the guidelines: [Pause Events](https://turbot.com/guardrails/docs/guides/hosting-guardrails/troubleshooting/pause-events).

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

## Next Steps

- Review additional runbooks for database maintenance or resource optimization.
- Refer to Guardrails documentation for further insights.

## Troubleshooting

| Issue              | Description                                                                                                                                                                                                       | Guide                                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Permission Issues  | If the current logged-in user lacks permission to modify, update, or create resources in the stack, or if IAM roles or SCPs have changed, preventing built-in roles from accessing needed configuration settings. | [Troubleshoot Permission Issues](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators) |
| Further Assistance | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                                             | [Open Support Ticket](https://support.turbot.com)                                                                                        |
