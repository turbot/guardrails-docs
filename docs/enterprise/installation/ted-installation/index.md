---
title: TED Installation
sidebar_label: TED Installation
---

# Turbot Guardrails Enterprise Database (TED) Installation

**Turbot Guardrails Enterprise Database (TED)** provides an automated configuration and
management of Turbot database infrastructure to be used when
installing/upgrading an enterprise deployment of the Turbot Software.

TED deploys a Turbot Hive, which defines physical database and caching resources
shared by multiple workspaces.

## Install in the primary (alpha) region

### Launch the TED Service Catalog item

1. In the AWS Console, navigate to Service Catalog in the region into which you
   wish to install TED.
1. Select **Turbot Guardrails Enterprise Database** from the Products list and click Launch
   Product.
1. Select a **Name** for the provisioned project. Typically, this will be `ted`.
1. Select a **Version**. Usually, you will want the latest version.

### Hive Configuration

1. Enter the **Database Hive Name**.
1. Select the **Primary Region**. In this case, it should be the current region
   (You should run the primary install from the region into which you are
   installing).

### Database - Configuration

1. Choose an **Instance Type for DB**. The correct RDS instance type depends on
   many factors, including the number of resources and controls, the required
   performance, and cost considerations. `db.m5.2xlarge` is a common starting
   point.
1. Choose the amount of **Allocated Storage in GB** for your database. As with
   instance type, needs vary depending on the specific environment. Note that
   depending on the storage type you select, the storage size may also impact
   the storage throughput.

### Database - Replication

1. Leave the **Primary endpoint** blank because this is the first region being
   installed. This is field is only needed when adding a replica in an
   additional region.

### Database - Advanced - High Availability Settings

1. **Multi-AZ Failover Enabled:** If true, and this region includes the primary
   instance, then create a failover instance in a different availability zone to
   the primary instance.

<div className="alert alert-warning">
    In production, a failover instance is recommended!
</div>

1. **Read Replica Enabled for this region:** If true, create a read replica for
   the hive in this region.

<div className="alert alert-warning">
    In production, it is recommended to have a read replica instance in each region where Turbot is running, including the region where the primary instance resides
</div>

### Database - Advanced - Engine

1. The **DB Engine** must be postgres.
1. The **DB Engine Parameter Group Family** must be postgres11.
1. Currently supported **DB Engine Version** appera in the dropdown.
1. You may choose whether you would like RDS to **Allow major version
   upgrades.** If enabled and the engine version requests it, major version
   upgrades will be applied to the database through CloudFormation.
1. You may choose whether you would like RDS to **Automatically upgrade minor DB
   versions.** If enabled, RDS automatically performs minor version upgrades of
   the database during the scheduled maintenance window.

### Database - Advanced - Storage

- Select the desired **Storage Type**. Storage throughput needs may vary
  significantly, but GP2 provides a decent starting point if you are uncertain.
- If you selected the IO1 storage type, enter the **Provisioned IOPs.** This is
  only used if **Storage Type** is io1. Review the
  [relevant Amazon documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-iops)
  for valid values and rations.

### Database - Advanced - Encryption

1.  In the **Use AWS KMS DB Encryption** field, select a KMS key to encrypt the
    hive.
    - Select `aws/rds` to use the predefined AWS KMS key for RDS.
    - Select `Hive CMK` to create a customer managed key specific to the hive.
      This is typically considered more secure and is the recommended option.

### Database - Advanced - Authentication

1. Enter a **Master User Name**. This field defaults to **master**.
1. If running TED for the first time, keep the **MasterPassword** field blank.
   If a custom password is required, wait for the stack to finish, update the
   master password on the database itself, then update the TED stack with the
   custom password.
1. You may choose to **Use AWS IAM for DB Access**. This is the recommended
   approach, as no secrets need to be stored / rotated.

### Database - Advanced - Backup & Snapshots

1. It is recommended to enable **Deletion Protection** to protect database
   resources from deletion. You must explicitly set this to `false` before
   decommissioning.
1. You may set the **Backup Retention Period** in **Days.** Automated backups
   will be retained for the number of days specified.
1. You may choose to **Delete Automated Backups** automatically when the primary
   instance is deleted. The recommended value is `false`.
1. You may choose to **Copy DB tags to snapshots** automatically.

### Database - Advanced - Logging

1. Select the **Type of statements to be logged.** Note that database storage
   and performance may be impacted by this setting. You may select:
   - **all** – log ALL statements. This is typically only used for debugging.
   - **ddl** - log all data definition language (DDL) statements (CREATE, ALTER,
     DROP, etc).
   - **mod** - log all DDL and data modification language (DML) statements
     (INSERT, UPDATE, DELETE, Etc).
   - **none** : logging is off – no statements are logged.
1. Set the **Minimum Duration to log statement in ms**. Statements that exceed
   this execution time above which statements will be logged.
1. Set a value for **Delete logs older than N minutes.** Amazon RDS will delete
   PostgreSQL log that are older than the specified number of minutes.
1. Enable or disable **Performance Insights** for your database instances.
1. Set the **Maximum number of concurrent connections**. The maximum number of
   concurrent connections to the database instances.The current recommended
   setting is 600.
1. Set the **Alarm threshold for maximum number of concurrent connections**. The
   value that determines alarm to be triggered when the number of concurrent
   connections are reached.The current recommended setting is 500.
1. Set the **Deadlock timeout period in ms**. The time to wait on a lock before
   checking for deadlock. The current recommended setting is 2000.
1. Set the **Duration of Idling Transaction Session in ms**. The maximum allowed
   duration of any idling transaction.The current recommended setting is 900000.
1. Set the **Maximum Allowed Duration of Statement in ms**. The maximum allowed
   duration of any statement to execute. The current recommended setting
   is 60000.
1. Set a value for **RDS Admin logging level**. The PostgreSQL engine starts
   capturing queries executed by the admin user.
1. Set a value for **Function-level database activity tracking**. It enables
   tracking of function call counts and time used.
1. Set a value for **Dynamic Bucket Name specified in TEF**. You should only
   change these values if you did not use the default **Resource Name Prefix**
   (turbot) in the TEF stack.
1. Set a value for **Log Bucket Name format specified in TEF**. You should only
   change these values if you did not use the default **Resource Name Prefix**
   (turbot) in the TEF stack.

### Advanced - Foundation Parameters

The Foundation Parameters allow the TED stack to use SSM parameters defined in
the TEF stack. You should only change these values if you did not use the
default **Resource Name Prefix** (turbot) in the TEF stack.

### Advanced - Foundation Overrides

The Foundation Overrides allow you to override values defined in the TEF stack.
You will likely want to leave these blank.

### Advanced - Infrastructure

1. Select a **Resource Name Prefix**. This prefix will be added to all Turbot
resources. Because this prefix will be used across many resource types and
different resource types have different name restrictions, you should avoid
special characters and uppercase letters. This prefix should match the name
prefix you used in the TEF stack.
<div className="alert alert-warning">
<span style={{color:"red"}}>It is HIGHLY RECOMMENDED that you use the default prefix!</span> The TEF Stack will export the parameters that you have select to an SSM parameter, and they will use this prefix.  Using the default will greatly simplify TE deployments and upgrades.
</div>

---

### Termination Protection

21. To ensure that the TED stack is not accidentally deleted, it is strongly
    recommend that termination protection is enabled. This can be done via the
    following steps once the stack is in the OK state:
    1. Log into the AWS account containing the Turbot install.
    2. Navigate to the CloudFormation Service.
    3. Select the TED stack. The description of the correct stack should say
       **Turbot Guardrails Enterprise Database**.
    4. Click **Stack Actions**.
    5. Click **Edit Termination Protection**.
    6. Switch the setting from **Disabled** to **Enabled**, then click the
       **Save** button.
