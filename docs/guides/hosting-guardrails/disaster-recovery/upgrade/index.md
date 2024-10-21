---
title: "Database upgrade"
sidebar_label: "Database upgrade"
---

# Database Upgrade or Resizing Exercise

This process allows you to resize and/or upgrade the database with minimal downtime.

## Process Overview

1. **Spin up a new TED**:
   - same name as the original TED but with a suffix `-blue` or `green` at the end
   - set the `custom hive key` to the original kms key
   - set the allocated storage to exactly what the current usage of the disk (ex - if 210 GB of 500 GB is used, then allocated storage needs to be set at 210 GB, for db resizing purpose, because upon restoration db will be vacuumed the the size will go below 210 GB).
   - set max allocated storage to an appropriate value
   - use the upgraded version (in case of version upgrades)
   - rest of the parameters need to stay the same
2. **Turn on the logical replication flag**:
   - Navigate to the relevant parameter group in AWS Console
   - Update rds.logical_replical to 1 if not already set
   - Reboot the db instance. Downtime is about 50 seconds.
3. **Set master password**:
   - Set master password in both the instances through AWS UI.
4. **Setup and connect to the bastion host**:
   - Update the cfn stack with the below parameter values -
     - bastion host image to `/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-6.1-x86_64`
     - RootVolumeSize to something a bit more than the original db size. For example, if the disk usage of the original db instance is about 300 GB, then set the RootVolumeSize to 350 GB.
   - Start a session (link is available in the Output section of the bastion host stack)
   - Update postgres client in bastion host -
     - For postgres 15
       - Run `sudo dnf install postgresql15.x86_64 postgresql15-server -y`
     - For postgres 16 (https://aws.amazon.com/blogs/database/synopsis-of-several-compelling-features-in-postgresql-16/)
       - sudo yum install -y gcc readline-devel libicu-devel zlib-devel openssl-devel
       - sudo wget https://ftp.postgresql.org/pub/source/v16.3/postgresql-16.3.tar.gz
       - sudo tar -xvzf postgresql-16.3.tar.gz
       - cd postgresql-16.3
       - sudo ./configure --bindir=/usr/bin --with-openssl
       - sudo make -C src/bin install
       - sudo make -C src/include install
       - sudo make -C src/interfaces install
5. **Create a new folder**:
   - sudo mkdir tmp_migrations
   - sudo chmod 777 tmp_migrations
   - cd tmp_migrations
6. **Set environment variables**:

   ```shell
   export SOURCE=<source_db_endpoint>
   export TARGET=<target_db_endpoint>
   export PGPASSWORD=<master_password_set_in_step_3>
   ```

7. **Create publisher and replication slot in the original instance**:

   ```shell
   psql --host=$SOURCE --username=master --dbname=turbot
   select * from pg_replication_slots;
   select * from pg_publication;
   CREATE PUBLICATION pub_blue FOR ALL TABLES;
   SELECT * FROM pg_create_logical_replication_slot('rs_blue', 'pgoutput');
   ```

8. **Take dump of the entire source db instance**:

   ```shell
   nohup pg_dump -h $SOURCE -U master -F c -b -v -f data.dump turbot > dump.log 2>&1
   ```

   using nohup keeps the dump running even if the session expires, to stop pg_dump, do ps aux, kill <pid>

9. **Restore the dump in the target db instance**:
   ```shell
   nohup pg_restore -h $TARGET -U master --verbose --no-publications --no-subscriptions  --clean --if-exists -d turbot data.dump > restore.log 2>&1
   ```
10. **Add triggers**:
    - Check the restore log file (`restore.log`) and make sure there are only 11 entries per schema when you run the below -
      ```shell
      cat restore.log | grep error
      ```
    - Set local search path -
      ```shell
      psql --host=$TARGET --username=master --dbname=turbot;
      set local search_path to <workspace_schema>, public;
      ```
    - Add triggers using the commands from step #6 of the upgrade process (https://github.com/turbotio/ops/wiki/Postgres-13.x-upgrade-path#upgrade-process)
11. **Create subscription in the new database instance**:
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
12. Run this in the source db instance to see if the source and target dbs are caught up -
    ```shell
    SELECT slot_name, confirmed_flush_lsn as flushed, pg_current_wal_lsn(), (pg_current_wal_lsn() - confirmed_flush_lsn) AS lsn_distance FROM pg_catalog.pg_replication_slots WHERE slot_type = 'logical';
    ```
13. **Test the data** -
    - Connect to the source db and target db separately and compare count of functions, triggers, indexes and constraints
    - Triggers -
    ```shell
    SELECT count(trigger_name), trigger_schema FROM information_schema.triggers group by trigger_schema;
    ```
    - Indexes -
    ```shell
    SELECT n.nspname AS schema_name, COUNT(i.indexname) AS index_count FROM pg_catalog.pg_indexes i JOIN pg_catalog.pg_namespace n ON i.schemaname = n.nspname WHERE n.nspname NOT IN ('pg_catalog', 'information_schema') GROUP BY n.nspname ORDER BY index_count DESC;
    ```
    - Functions -
    ```shell
    SELECT n.nspname AS schema_name, COUNT(p.proname) AS function_count FROM pg_catalog.pg_proc p LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace WHERE n.nspname NOT IN ('pg_catalog', 'information_schema') GROUP BY n.nspname ORDER BY function_count DESC;
    ```
    - Constraints -
    ```shell
    SELECT n.nspname AS schema_name, COUNT(c.conname) AS constraint_count FROM pg_catalog.pg_constraint c JOIN pg_catalog.pg_namespace n ON c.connamespace = n.oid WHERE n.nspname NOT IN ('pg_catalog', 'information_schema') GROUP BY n.nspname ORDER BY constraint_count DESC;
    ```
    - Trigger count by status -
    ```shell
    SELECT count(tgname), tgenabled FROM pg_trigger GROUP by tgenabled;
    ```
14. **Turn off events**:
    - This step is optional, since logical replication will be on - https://turbot.com/guardrails/docs/enterprise/FAQ/pause-events
15. **Rename db instances**:
    - Rename the primary db instance manually through the UI, add `-green` to the end of the name.
    - Rename the new instance manually through the UI, remove `-blue` from the end.
16. **Turn on events**:
    https://turbot.com/guardrails/docs/enterprise/FAQ/pause-events
17. **Rename the old instance**:
    - Rename the old db instance from `-green` to `-blue`.
    - Do a Green/Blue deployment in both the new and old TED.
18. **Run smoke tests**
19. **Clean up**:
    - Delete the new TED stack (the old TED stack is supposed to maintain the new db instance), along with the resources that are left behind -
      - S3 bucket
      - Log groups
      - AWS Backup
    - Remove publication, replication slots, subscriptions (if any), from the now Primary DB
