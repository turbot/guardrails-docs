---
title: "DR Testing"
sidebar_label: "Disaster Recovery Testing"
---

# Disaster Recovery - Workspace Restoration

In this guide, you will:

- Test backup and restore procedures for Turbot Guardrails workspaces.
- Monitor and troubleshoot the disaster recovery process.

An essential part of maintaining Turbot Guardrails is testing disaster recovery. This document covers the process for restoring a destroyed workspace. Restoration should be tested at least once a year, ideally twice. The goal is to have **Guardrails Application Admins** familiar with the restoration process and the tools involved.

Testing backup and restore procedures is critical for:

- Validating backup integrity and restore processes
- Meeting compliance and audit requirements
- Training administrators on recovery procedures
- Measuring recovery time objectives (RTO)

Losing and restoring a workspace is just *one* of the possible disaster recovery scenarios. Enterprises should evaluate additional failure scenarios.

## Prerequisites

- Administrator access to AWS Console.
- Familiarity with Guardrails installation.
- Understanding of database backup/restore.
- Access to required AWS services such as RDS, CloudFormation, ECS and Route 53.

## Process Summary

- *Build a New Workspace* – Set up a fresh workspace for testing, install required mods, and `take an RDS snapshot`.
- *Simulate Disaster* – `Destroy the workspace` by deleting its CloudFormation stack.
- *Restore the Workspace* – Recover data from the latest backup, apply migrations, and restart the workspace.
- *Validate Restoration* – Log in and verify the workspace is functional.

>[!IMPORTANT]
>
> Only test with non-production workspaces
>
> Document all parameters and configurations
>
> Time the restore process to measure RTO
>
> Test regularly (recommended twice per year)
>
> Follow security best practices


## Step 1: Build a New Workspace

In this phase, create a workspace and install baseline mods. Then, [import an AWS account](/guardrails/docs/guides/aws/import-aws-account) with **Event Pollers**.

> [!NOTE]
> Same process applies to **Azure** and **GCP**.
>
> This process assumes that Route53 is used for DNS. Customers with manually configured DNS will need to keep track of their configuration.

### Steps:

1. **Select TE Version**:
   - Choose a dedicated TE version for testing
   - Note: ECS container flush during restore may cause brief outages for workspaces using this TE version
   - If multiple workspaces use this TE version, [pause event processing](enterprise/FAQ/pause-events)

2. **Access AWS Master Account**:
   - Navigate to the alpha region of your AWS Master account

3. **Create Test Workspace**:
   - Follow the [workspace creation guide](/guardrails/docs/guides/hosting-guardrails/installation/workspace-manager#create-a-workspace)
   - `Save all CloudFormation parameters` used (needed for restoration)
   - Record credentials from CloudFormation Stack outputs
   - Note the Turbot ID of workspace Turbot Root (`tmod:@turbot/turbot#/`)

4. **Install Required AWS Mods**:
   - `aws`
   - `aws-iam`
   - `aws-kms`
   - `aws-s3`

5. **Configure Workspace**:
   - Create "AWS" folder under Turbot Root
   - Import an AWS account into the folder
   - Verify no controls/policies are in `tbd` state

6. **Document Initial State**:
   - Take screenshots of workspace dashboard
   - Record key metrics:
     - Number of resources
     - Active controls count
     - Other relevant statistics
   - Save for post-restore validation

7. **Create Backup**:
   - Wait for automated "Restore to point in time" backup
   - Or take a manual RDS backup


## Step 2: Simulate Disaster - Drop the Workspace

> [!WARNING]
> DO NOT DELETE A PRODUCTION WORKSPACE CloudFormation Stack.

1. Delete the **Workspace CloudFormation stack** created earlier.
2. If necessary, **force delete** the workspace.
3. Verify that the **workspace URL is no longer accessible**.


## Step 3: Restore the Workspace

Recreate the workspace and restore it using **database migration**.

### Steps:

1. **Start RTO Measurement**:
   - Begin timing the restore process
   - This helps determine your Recovery Time Objective (RTO)

2. **Recreate Workspace**:
   - Use original Workspace [CloudFormation template](/guardrails/docs/guides/hosting-guardrails/installation/workspace-manager#step-2-download-cloudformation-template)
   - Apply identical parameter values from original workspace
   - Deploy the new workspace stack

3. **Restore Database**:
   - Navigate to AWS RDS console
   - Choose either:
     - Restore from snapshot, or
     - Use "Restore to point in time" feature
   - Ensure restored DB configurations match original:
     - Instance class
     - Storage type/size
     - Network settings
     - Security groups

4. **Configure Temporary Database**:
   - Wait for restored DB to become available
   - Record the new database endpoint
   - Verify connectivity

5. **Deploy Bastion Host**:
   - Launch a Turbot Bastion Host instance
   - Follow setup guide at:
     [Turbot Bastion Host Setup](https://github.com/turbot/guardrails-samples/tree/main/enterprise_installation/turbot_bastion_host)
   - Ensure network access to both databases

6. **Execute Migration**:
   - Run [migration script](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/turbot_schema_migration) to copy DB schema:
     - From (Source): The restored database
     - To (Target): New actual database


```shell
nohup ./migration.sh <turbot_schema> <source_or_restored_DB_endpoint> <target_or_actual_db_endpoint> &

example: nohup ./migration.sh panda turbot-panda.abcxyzabcxyz.us-east-1.rds.amazonaws.com turbot-babbage.abcxyzabcxyz.us-east-1.rds.amazonaws.com &
```

7. Wait for the `pg_dump` and `pg_restore` process in `migration.sh` to complete.
8. **Flush ECS Containers**:
   - Navigate to the AWS **ECS console** → **Cluster** open the **Tasks** tab
   - Locate the **TE version-related tasks** and **stop them**.

## Step 4: Clear Redis Cache

To clear the workspace from Redis, log into the **bastion host** and execute:

```shell
export REDISHOST=master.turbot-babbage-cache-cluster.abcxyz.use1.cache.amazonaws.com
redis-cli -h $REDISHOST --tls -p 6379 -a <password> KEYS "<turbot_schema>*" | xargs redis-cli -h $REDISHOST --tls -p 6379 -a <password> DEL

example: redis-cli -h $REDISHOST --tls -p 6379 -a mysecurepassword KEYS "panda*" | xargs redis-cli -h $REDISHOST --tls -p 6379 -a mysecurepassword DEL
```


## Step 5: Review - Validate the Restoration

- [ ] **Login Validation** to ensure the **previous credentials** still work.
- [ ] **Resource & Control Check**: Verify the **number of resources** and **controls** match pre-disaster stats.
- [ ] **Test New Resource Import**: Create a new **S3 bucket** and verify it appears in **Guardrails UI**.
- [ ] **Verify Control Execution**: Run a **control scan** to confirm that all controls are in **OK** or **Skipped** state.

<!-- ## Next Steps

To ensure readiness, refer to additional Guardrails disaster recovery guides:

- [Workspace Manager Overview](enterprise/installation/workspace-manager)
- [Pause Events Before Restoration](enterprise/FAQ/pause-events)
- [Turbot Bastion Host Setup](https://github.com/turbot/guardrails-samples/tree/main/enterprise_installation/turbot_bastion_host) -->

---

## Troubleshooting

| **Issue**                        | **Description**                                                                                                    | **Guide**                                                                 |
|----------------------------------|----------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| **Workspace Not Accessible**     | If the workspace does not restore correctly, ensure that **RDS endpoints are correct** in the migration script. | [Turbot Bastion Host](https://github.com/turbot/guardrails-samples/tree/main/enterprise_installation/turbot_bastion_host) |
| **Redis Cache Not Cleared**      | If controls fail to execute, verify that **Redis cache clearing** was performed correctly.                        | See **Step 4: Clear Redis Cache** in this guide.                         |
| **Further Assistance**           | If the issue persists, open a support ticket and provide **logs & screenshots** for faster resolution.           | [Open Support Ticket](https://support.turbot.com)                        |
