---
title: "Hive Maintenance"
sidebar_label: "Hive Maintenance"
---

# Getting Started with Guardrails Hive Restore

The below process is to restore a Guardrails database from RDS Snapshot in the event
of catastrophic failure in the main Guardrails database. For example, accidental
deletion of a working schema.

By default, TED switches on "point in time" in the past 35 days (default setting
as of 28th Jan 2021). Additionally, TED can be configured to take manual daily,
weekly, monthly snapshots (off by default).

**Note**:

- Hive Name: It's the name of the RDS instance identifier. More information can
  be found [here](enterprise/installation/ted-installation#hive-configuration).
- TED cloudFormation stack: More information can be found
  [here](enterprise/installation/ted-installation).
- The Foundation Parameters allow the TED stack to use SSM parameters defined in
  the TEF stack. You should only change these values if you did not use the
  default Resource Name Prefix (turbot) in the TEF stack. e.g.
  `<prefix>/hive/<hive name>` will be a value in SSM parameter. More information
  can be found
  [here](enterprise/installation/ted-installation#advanced---foundation-parameters).

## Targeted Audience

The Administrators should have experience in AWS cloud infrastructure management
& Turbot Guardrails installation process. Must have earlier knowledge on Database recovery
& restoration process.

## Restore Process (no replica)

1. Select an acceptable snapshot, this can be done from AWS console by
   navigating `RDS -> Snapshots`, or select an existing database and launch a DB
   instance from AWS console by navigating
   `RDS -> Databases -> Actions -> Restore to point in time`.

2. Restore the database into a new RDS Instance with the same parameters (size,
   engine version etc.). Let's name it **newton-restored**.

3. Ensure that **newton-restored** has the exact same security group,
   parameters. If you are able to, open the old and new database side-by-side
   and compare each parameter. Pay particular attention to:

   - Networking: VPC, subnet group, subnets.
   - Security: VPC security groups, public accessibility, certificate authority.
   - Configuration: engine version, parameter group, deletion protection.
   - Instance class: instance class.
   - Availability: master username, IAM db authentication, multi AZ, secondary
     zone.
   - Storage: encryption, KMS key, storage type, IOPS, storage, storage
     autoscaling, maximum storage threshold.
   - Performance insights: performance insights enabled, KSM key, retention
     period.

4. Once the database has been restored, rename the existing hive: **newton** to
   **newton-old**.

5. Rename the restored hive from **newton-restored** to **newton**.

6. Ensure that TED CloudFormation stack is now pointing to the restored
   database. Try updating something minor, such as **Maximum Storage
   Autoscaling** parameter. It should be modifying the restored database (the
   one that was originally called **newton-restored** now called **newton**).

7. Modify the SSM parameter: `<prefix>/hive/<hive name>` to point to the new RDS
   host ('CHANGE THIS' section). The new RDS endpoint can be found by navigating
   to the RDS console page and drilling into the new DB. On the **Connectivity &
   Security** tab, copy the endpoint, then paste in the `host` section.

```json
{
  "name": "newton",
  "id": "newton",
  "stackId": "",
  "redisHost": "master.turbot-newton-cache-cluster.ls6yvz.apse2.cache.amazonaws.com",
  "redisPort": "6379",
  "db": {
    "base": {
      "user": "turbot",
      "masterUser": "master",
      "host": "<CHANGE THIS>",
      "port": 5432,
      "region": "ap-southeast-2",
      "idleTimeoutMillis": 75000
    },
    "primary": { "ap-southeast-2": {} },
    "replica": {}
  }
}
```

8. The above configuration is stored in memory. We now need to flush the cache
   for all our containers and Lambda functions.

9. From AWS console restart all ECS containers.

10. `CloudFormation -> TE -> Update deployment` trigger from `blue <-> green`.
    This should trigger new Lambda deployment which means a cold restart of the
    Lambda functions.

## Restore process, with Read replica

1. RDS read replica must exist which is provisioned through the TED stack.
2. Make sure that the primary RDS instance is configured with automated
   snapshots, if not take a manual snapshot. In most ideal cases and as per
   recommended practice, the DB is configured with automated snapshot.
3. Update TED to remove read replica which will terminate the read replica, the
   required change in TED stack parameter is **Enable Read Replica for this
   region = False**.
4. Restore the DB, follow the instructions as mentioned
   [above](#restore-process-no-replica).
5. Once the primary DB restoration process is completed successfully, check the
   workspace access to make sure that the Guardrails console access and other
   functionalities are working fine.
6. Update TED stack to add read replica by changing TED stack parameter **Enable
   Read Replica for this region = True**.
7. Check the RDS console the read replica is provisioned, it can take a few
   moments to be in an available state.
