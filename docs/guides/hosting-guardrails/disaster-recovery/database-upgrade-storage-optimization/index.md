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
- Verify PostgreSQL client version compatibility with the [bastion host](https://github.com/turbot/guardrails-samples/tree/main/enterprise_installation/turbot_bastion_host) AMI.
- Ensure logical replication is supported on the database engine.
- Knowledge of the current database usage (storage and version).
- TED stack version is atleast 1.45.0.

## Warnings -
1. After creating replication slots (steps #2 below), you won't be able to make any schema changes which includes upgrading existing workspaces or creating a new one, till the end of the process. Basically, no DDL changes.

## Step 1: Spin up a new TED

- Create a new [TED](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) with the same name as the original, appending `-blue` or `-green` to the end.
- If performing a database version upgrade, use the `DB Engine Version` and `Read Replica DB Engine Version` parameters under the "Database - Advanced - Engine" section. Set the appropriate `DB Engine Parameter Group Family` and the `Hive RDS Parameter Group` under the "Database - Advanced - Parameters" section.
- Set the allocated storage to match the current disk usage using the `Allocated Storage in GB` parameter under the "Database - Advanced - Storage" section. For example - if 600 GB out of 1000 GB is used, set allocated storage to 600 GB. Check the `FreeStorageSpace` metrics to get the size. Note - Allocating less than 400 GB of storage impacts performance because of reduced storage throughput and provisioned iops. [Click here](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html) for more details.
- Set the maximum allocated storage to a suitable value using the `Maximum Allocated Storage limit in GB` parameter under the "Database - Advanced - Storage" section.
- Set up encryption by configuring the `Custom Hive Key` parameter to use the original KMS key under the "Advanced - Infrastructure" section. This should be the Key ID, typically formatted as: 1111233-abcd-4444-2322-123456789012.
- Keep the other parameters the same.
- The database created using this stack is the Target database and the original database is the Source one.

## Step 2: Enable Logical Replication in both the database instances

- Go to RDS service in the AWS Console, choose the relevant database instance and navigate to the relevant parameter group in the Configuration tab.
- Click on the parameter group to go to the parameter group window and click on edit.
- Seearch for `rds.logical_replical` and set the value to **`1`**.
- Click on Save changes and navigate back to the rds window and wait for the db to be in `Available` state.
- Turn off events - https://turbot.com/guardrails/docs/enterprise/FAQ/pause-events
- Navigate back to the RDS service window, choose the relevant database instance, select actions and then select reboot temporarily. This will reboot the DB instance (expected downtime is ~50 seconds).
- Do the process for both the Source and Target database.

## Step 3: Set Master Password for both the database instances.

- Go to RDS service in the AWS Console, choose the relevant database instance and click on Modify
- Enter a password in the `Master Password` parameter box, reenter the same in the `Confirm Master Password` input textbox.
- Click on Continue
- Choose Apply immediately and Click on Modify DB Instance.

## Step 4: Setup and Connect to Bastion Host

- Update the Bastion Host CloudFormation stack with the below details:
  - Set the bastion host image to `/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-6.1-x86_64`.
  - Set RootVolumeSize to a bit larger than the original DB size (e.g., if 500 GB is used, set RootVolumeSize to 550 GB).
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

## Step 5: Create a Temporary Folder for Migrations

Create a folder and set the necessary permissions:

```shell
cd ~
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

### Step 7: Drop schemas of deleted or decommissioned workspaces

```shell
psql --host=$SOURCE --username=master --dbname=turbot
\dn
drop schema <schema_name> cascade;
```

## Step 8: Create Publisher and Replication Slot in Original Instance

Look for any existing replication slots or publisher and  remove them (the subscriptions to them needs to be deleted first) -

```shell
psql --host=$SOURCE --username=master --dbname=turbot
SELECT * FROM pg_replication_slots;
SELECT pg_drop_replication_slot('<slot_name_from_step_a>');
select * from pg_publication;
drop publication <publication_name_from_step_a>;
```

Create publisher and replication slot next -

```shell
CREATE PUBLICATION pub_blue FOR ALL TABLES;
SELECT * FROM pg_create_logical_replication_slot('rs_blue', 'pgoutput');
```

## Step 9: Take a dump of the Entire Source DB

Use pg_dump to create a dump of the source database:

```shell
nohup time pg_dump -h $SOURCE -U master -F c -b -v -f data.dump turbot > dump.log 2>&1
```

The dump process can take hours depending on the size, if the session times out or terminates, you can check the status of the command using ps:
```shell
ps aux | grep pg_dump
```

Check for errors and logs in the dump file, there should be no errors, but you should be able to see logs.
```shell
cat dump.log | grep error
cat dump.log
```

## Step 10: Restore the Dump in the Target DB

Restore the database in the target instance:

```shell
nohup time pg_restore -h $TARGET -U master --verbose --no-publications --no-subscriptions --clean --if-exists -d turbot data.dump > restore.log 2>&1
```

The restore process can take hours depending on the size, if the session times out or terminates, you can check the status of the command using ps:
```shell
ps aux | grep pg_restore
```

Check for errors and logs in the restore file, there should be 11 errors per schema (for 11 triggers), and you should be able to see logs.
```shell
cat restore.log | grep error
cat restore.log
```

## Step 11: Create Subscription in the New DB Instance

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

## Step 12: Monitor Progress

Run the below command in the source database to monitor the replication progress, once the lsn_distance is 0, move on to the next steps. Note - lsn distance will keep on change till the events are turned off.

```shell
psql --host=$SOURCE --username=master --dbname=turbot
SELECT slot_name, confirmed_flush_lsn as flushed, pg_current_wal_lsn(), (pg_current_wal_lsn() - confirmed_flush_lsn) AS lsn_distance FROM pg_catalog.pg_replication_slots WHERE slot_type = 'logical';
```

## Step 13: Turn Off Events

Disable events as per the guidelines: [Pause Events](https://turbot.com/guardrails/docs/guides/hosting-guardrails/troubleshooting/pause-events).

## Step 14: Add Triggers

Get the list of workspace schemas -

```shell
psql --host=$TARGET --username=master --dbname=turbot
\dn
```

Replace `$turbot_schema` with the workspace schemas (all except public) listed in the above command and create triggers for each of them, there will be a total of 11 triggers per schema.

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

## Step 15: Test Data

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

## Step 16: Disable and delete subscription

Delete subscription in the target instance -

```shell
psql --host=$TARGET --username=master --dbname=turbot
SELECT subname AS "Subscription Name", subowner AS "Owner ID", subenabled AS "Is Enabled", subpublications AS "Publications" FROM pg_subscription;
alter subscription <subscription_name> disable;
alter subscription <subscription_name> set (slot_name=NONE);
drop subscription <subscription_name>;
```

## Step 17: Rename DB Instances

- Rename the primary instance by appending -green.
- Rename the new instance by removing the -blue suffix.

## Step 18: Turn On Events

Refer to the documentation: [Turn On Events](https://turbot.com/guardrails/docs/guides/hosting-guardrails/troubleshooting/pause-events).

## Step 19: Update TED stack

- Go to service catalog > provisioned products - select the original TED stack, click on update and update the allocated storage, maximum allocated storage, postgres version and other configuration parameters to match that of the new database instance (Note - DO NOT CHANGE THE DEPLOYMENT PARAMETER FROM BLUE TO GREEN OR VICE VERSA) and complete the service catalog update.
- Update the TED stack again, but this time change the deployment parameter from blue to green or vice versa.

## Step 20: Run Smoke Tests

Test the restored and new database instances to confirm the upgrade. <to be updated>

## Step 21: Clean Up

Once everything looks good, delete the old database instance, the new TED stack and the associated resources of the new TED stack as listed below.
Advice - Shut down the old db temporarily but keep it for atleast a day after the migration before deleting the same.

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
