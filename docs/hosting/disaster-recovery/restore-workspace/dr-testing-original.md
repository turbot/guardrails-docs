---
title: "DR Testing"
sidebar_label: "DR Testing"
---

# Disaster Recovery - Workspace Restoration

An essential part of maintaining Turbot Guardrails is testing disaster recovery. This
document covers the process for restoring a destroyed workspace. Restoration
should be tested on at least yearly, ideally twice a year. The goal is to have
Guardrails Application Admins familiar with the process of restoration and the tools
involved. The scenario described below is for a brand new workspace. The DB
schema size will be very small and the time to restore is only a few minutes.
The same backup/restore process can be used to discover RTO for full-sized
production workspaces.

Losing and restoring a workspace is just one of possible disaster recovery
scenarios. As a part of enterprise disaster readiness, please evaluate other
scenarios.

## Target Audience

**Guardrails Application Operators**: Administrators should have experience in AWS
cloud infrastructure management and the Guardrails installation process. Prior
experience with database recovery & restoration processes is very helpful.

## Process Overview

1. **Build New Workspace**: Build a completely new workspace instead of breaking
   an existing one. Finish the workspace initial setup then take a manual
   database snapshot or wait for the automated backups to trigger. A current RDS
   backup is required for the testing process.

2. **Drop the workspace**: Initiate the disaster by destroying the Workspace
   Cloudformation stack.

3. **Restore Workspace**: Extract the workspace from the backup then restore it.
   The restore involves creating a temporary database, restore a single
   workspace to the actual database. Drop the temp database after the successful
   restore exercise.

4. **Validate Restoration**: Log back into the workspace then verify that
   restoration was successful.

## Setup - Build New Workspace

In the setup phase, create a workspace and install the baseline mods. After mod
installation then import an account with Event Pollers. While the directions are
for an AWS Account, the same process of mod installation and cloud account
import holds true for Azure and GCP too.

This process assumes that Route53 is used for DNS. Customers with manually
configured DNS will need to keep track of their configuration.

1. Pick or install a TE version in the workspace that is dedicated for this
   test. As we will flush the ECS containers just after the restore, this can
   cause brief outages for all workspaces utilizing the designated TE version.
2. If there are more than one workspace running on TE version, then make sure to
   pause the events from processing. Please refer to the
   [instructions](enterprise/FAQ/pause-events) on how to pause the events from
   processing.
3. Navigate to the alpha region of the AWS Master account of Guardrails
   Installation.
4. Create a workspace using the steps outlined
   [here](enterprise/installation/workspace-manager#create-a-workspace). Save
   the copy of the parameters used to create the workspace. These will be needed
   again in the restoration step.
5. Save the credentials from the Cloud Formation Stack's output section.
6. Note down the Turbot ID of the workspace Turbot Root(tmod:@turbot/turbot#/).
7. Install the following basic AWS mods which support AWS account import and
   Event Polling.

- aws
- aws-iam
- aws-kms
- aws-s3

8. Create a Folder under the Turbot Root. Let us call it "AWS" and import an AWS
   account under it.
9. Make sure there are no controls/policies in `tbd` state.
10. Capture a few screenshots of the workspace and some stats like the number of
    resources, active controls etc. This information will be used later to
    verify the restoration process. We expect to see the same stats after the
    restore is done.
11. Wait for the "Restore to point in time" backup to be available or take a
    manual backup if needed.

## Disaster - Drop the Workspace

1. Drop the workspace by deleting the Workspace Cloud Formation stack created
   above. DO NOT DELETE A PRODUCTION WORKSPACE Cloudformation Stack.
2. Force delete the workspace if needed.
3. You should no longer to able to access the workspace URL or login to the
   workspace at this point.

## Restore - Get the Workspace Back

We will recreate a workspace. This will create a DB schema in the database. Our
aim is to restore this (almost) empty schema with the data from backup.

1. Time how long the restore activities take in further steps as these help you
   determine your Recovery Time Objective (RTO).
2. Recreate the workspace using the Workspace CloudFormation
   [template](enterprise/installation/workspace-manager#sample-workspace-manager-cloudformation-template).
   Use the same parameter values as the original workspace.
3. Navigate to RDS, restore the database from the snapshot or by using the
   "Restore to point in time". Make sure the configurations of the restored
   database match those of the original database.
4. Once the temp DB is created from the snapshot, note the endpoint.
5. Launch a
   [Turbot Bastion Host](https://github.com/turbot/guardrails-samples/tree/main/enterprise_installation/turbot_bastion_host).
6. Run the
   [migration script](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/turbot_schema_migration)
   which will copy the DB schema from the restored database to the actual
   database.

```shell
nohup ./migration.sh <turbot_schema> <source_or_restored_DB_endpoint> <target_or_actual_db_endpoint> &

example: nohup ./migration.sh panda turbot-panda.abcxyzabcxyz.us-east-1.rds.amazonaws.com turbot-babbage.abcxyzabcxyz.us-east-1.rds.amazonaws.com &
```

6. Wait for the pg_dump and pg_restore process in `migration.sh` to complete.
7. Flush the ECS containers of the DR TE version
8. Navigate to the ECS console, select the cluster and open the `Tasks` sub tab.
9. Search for the TE version to list all the tasks related to the TE version.
10. Stop these tasks.
11. Clear the workspace from Redis: Log back into the bastion host and execute
    the below.

```shell
export REDISHOST=master.turbot-babbage-cache-cluster.abcxyz.use1.cache.amazonaws.com
redis-cli -h $REDISHOST --tls -p 6379 -a <password> KEYS "<turbot_schema>*" | xargs redis-cli -h $REDISHOST --tls -p 6379 -a <password> DEL

example: redis-cli -h $REDISHOST --tls -p 6379 -a mysecurepassword KEYS "panda*" | xargs redis-cli -h $REDISHOST --tls -p 6379 -a mysecurepassword DEL
```

## Validate - Everything is All Right

1. You should be able to login to the workspace with the old credentials.
2. Verify the number of resources and controls in the account.
3. Creating an S3 bucket and verify that it appears in the Guardrails console.
4. Verify that controls run properly. All controls on the bucket should be in
   `ok` or `skipped. Investigate any errors.
