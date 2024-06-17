---
title: "Enable Guardrails sync to ServiceNow"
template: Documentation
nav:
  title: "Enable Guardrails sync to ServiceNow"
  order: 20
---

# Enable Guardrails sync to ServiceNow

## Prerequisites

Before you get started, if you have not already completed, follow the [Importing a ServiceNow instance into Guardrails](/guardrails/docs/integrations/import-servicenow-instance) integration guide to associate your ServiceNow instance to Turbot Guardrails.

### Install Turbot Guardrails ServiceNow Cloud Mods
Beyond the `@turbot/servicenow` mod already installed as part of the ServiceNow instance import above, there are other [ServiceNow mods](/guardrails/docs/mods/servicenow) which need to be installed in your Guardrails workspace. These mods enable the policies and controls for the applicable cloud resources you would like to sync into your ServiceNow CMDB.

Example of related cloud mods:
* `@turbot/servicenow-aws`
  * `@turbot/servicenow-aws-ec2`
  * `@turbot/servicenow-aws-iam`
  * ...
* `@turbot/servicenow-azure`
  * `@turbot/servicenow-azure-compute`
  * `@turbot/servicenow-azure-sql`
  * ...
* `@turbot/servicenow-gcp`
  * `@turbot/servicenow-gcp-compute`
  * `@turbot/servicenow-gcp-storage`
  * ...

Note: each Mod will have dependencies to other mods. For example, the `@turbot/servicenow-aws-s3` mod depends on the other Turbot Guardrails mod related to aws-s3, `@turbot/aws-s3`.

Install the mods that align to the cloud resources Turbot Guardrails is already managing, that you would like to sync to ServiceNow.

### Setup Guardrails Watches for deletions and archiving
No action is needed as the default policy is `Enforce: Enabled` on the Watches controls. 

In rare use cases you may need to adjust along with your Customer Success SME. For background about the policy and control:

The `ServiceNow > Turbot > Watches` control is essential for managing the deletion or archiving of records in ServiceNow when resources are deleted. Upon deletion, depending on the `Configuration Item` policy settings below, Guardrails will remove or archive resources directly in ServiceNow if they are no longer active in the cloud provider.

Policies that are already set are:
* `ServiceNow > Turbot > Watches > AWS`
* `ServiceNow > Turbot > Watches > Azure`
* `ServiceNow > Turbot > Watches > GCP`

## Table and Configuration Item sync policies

Once you have the applicable mods installed, new policies and controls will be added to the associated cloud resource type in Turbot Guardrails, `AWS > S3 > Bucket`.

The primary function of the sync control is to ensure that cloud resources discovered and continously updated from AWS, Azure, and GCP in the Guardrail's CMDB is also extended to the ServiceNow system and CMDB tables. This synchronization is automatic and occurs whenever the data in the Guardrail CMDB is updated.

## Table management

The sync depends on defining a ServiceNow table to sync the records to. Each cloud resource type (AWS S3 Buckets, Azure Compute Instances, etc) are associated to their own table in the ServiceNow CMDB. Syncing can occur on:
* New tables managed by Guardrails, e.g. `cmdb_ci_guardrails`
* Extension tables managed by Guardrails, e.g. `cmdb_ci_aws_s3_bucket` extends global table `cmdb_ci_cloud_storage_account`.
* Existing tables in SNOW, managed by Guardrails, e.g. `cloud_ci`

### Creating or modifying tables

The Table management policy types follow a similar policy construct to the Configuration Item policies below: 

* `{Cloud Provider} > {Service} > {Resource Type} > ServiceNow > Table`
* `{Cloud Provider} > {Service} > {Resource Type} > ServiceNow > Table > Definition`

To either create a new table or modify an existing one (such as adding new columns), you can use the following table policies per cloud resource type like for `AWS > S3 > Buckets`.
* `AWS > S3 > Bucket > ServiceNow > Table`
  * Defines if the table is enabled for the cloud resource type
  * Defaults to `Skip`, set to `Enforce: Configured` to create or associate the table
* `AWS > S3 > Bucket > ServiceNow > Table > Definition`
  * Defines the details of the table that will be created / associated.
  * Defaults to common metadata from each cloud resource type in AWS, Azure and GCP.
  * Can adjust table columns that are associated to the sync, or create your own.

Working with tables from Guardrails or in ServiceNow:
* When a table name is changed:
  * If the table name is modified in the Turbot Guardrails policy, a new ServiceNow table with the necessary columns is created. However, the original table remains, leading to two tables - the existing one and the newly created one with the changed name.
  * If the table name is modified in ServiceNow, an update to the Guardrails policy is required to reflect the new name of the table.
  * ServiceNow imposes restrictions on changing the Extends Table once the table is created.
* When a column is added:
  * If a new column is added in the Turbot Guardrails policy, it results in the creation of that column in the corresponding ServiceNow table.
  * If a new column is added in ServiceNow, the Turbot Guardrail policy will need to be updated to relate to the new field
* When a column is altered:
  * Data type: Once a column is created in ServiceNow, its data type cannot be changed. If a change in data type is attempted via the Guardrails policy, the control will indicate an invalid state.
  * Size: ServiceNow permits increasing the size of a column, but reducing it below the size of the largest existing data entry is not allowed. The Guardrails policy only supports increasing the column size and does not allow for a size reduction.
  * Name: Changing a column's name in the Guardrails policy configuration leads to adding a new column with the new name in the ServiceNow table. The original column remains unchanged. If the column name is changed in ServiceNow, it is treated as a new column and needs to be remapped in the Guardrails policy.

## Configuration Items syncing
Once the table in ServiceNow is set up, the next step is to configure the Configuration Item (CI) sync control. The purpose of this control is to handle the actual process of synchronizing data from Guardrail's CMDB to the ServiceNow table per the cloud resource type in scope.

The CI sync control is managed through a specific policy format in Guardrails. This policy directs how data from various cloud resource types is synced to ServiceNow. The following is the structure for the CI sync policies: 

* `{Cloud Provider} > {Service} > {Resource Type} > ServiceNow > Configuration Item`
* `{Cloud Provider} > {Service} > {Resource Type} > ServiceNow > Configuration Item > Record`
* `{Cloud Provider} > {Service} > {Resource Type} > ServiceNow > Configuration Item > Table Definition`

Examples include AWS S3 buckets, Azure Compute instances, GCP SQL instance, etc, each with their respective paths in the policy hierarchy.

* `AWS > S3 > Bucket > ServiceNow > Configuration Item`
  * Sets whether the CI will be synced.
  * By default the policy is set to `Skip`, can be set to `Enforce: Sync` (other options below).
* `AWS > S3 > Bucket > ServiceNow > Configuration Item > Record`
  * Defines how records are identified, e.g `tags` column data comes from `$.bucket.tags` data in the Guardrails CMDB.
  * Defaults to common data inputs and matches the column definition defaulted in `AWS > S3 > Bucket > ServiceNow > Table > Definition`. Further details on adjusting the inputs for different source data, and alignment to new or changed columns from the Table Definition.
*` AWS > S3 > Bucket > ServiceNow > Configuration Item > Table Definition`
  * Defines where the table definition configurations are located. Can be updated for advanced use cases to adjust application scope, tables to sync to, etc.
  * Defaults are set for most use cases and would not be required to adjust at least for when getting started. Although it defaults to the name defined in `AWS > S3 > Bucket > ServiceNow > Table > Definition`, you have the option to direct the data to an existing table of your choice.

### Further details about the CI sync controls

To illustrate the setup process of sync control, let's use the example of synchronizing an AWS S3 Bucket:

1. Policy Configuration:

* Set the policy path `AWS > S3 > Bucket > ServiceNow > Configuration Item` to `Enforce: Sync`. This setting enforces the synchronization process between Guardrails and ServiceNow.
  * **"Check: Archived":** Confirms if the data has been archived. If it has not been archived, the control status is set to alarm.
  * **"Check: Deleted":** Verifies whether the data has been deleted from the ServiceNow table. If not deleted, the control status changes to alarm.
  * **"Check: Sync":** Checks if the data in the Guardrails CMDB is synchronized with the ServiceNow table.
  * **"Enforce: Archived":** This action archives the record in the ServiceNow table.
  * **"Enforce: Deleted":** This action deletes the record in the ServiceNow table.
  * **"Enforce: Sync":** Ensures data synchronization. Data will be removed from the ServiceNow table once it is deleted from the Guardrails CMDB.
  * **"Enforce: Sync, Archive on Delete":** This policy enforces data synchronization and dictates that data should be archived in ServiceNow when it is deleted from the Guardrails CMDB.

2. Data Mapping:

Configure the mapping in `AWS > S3 > Bucket > ServiceNow > Configuration Item > Record`. This involves defining how each piece of data in the Guardrails CMDB corresponds to a column in ServiceNow. To populate the added columns dynamically, the Configuration Item policy can define where the data comes from. In this example, the `bucket_name`, `account_id`, and `tags` in the Guardrails CMDB are mapped to their respective columns in ServiceNow. Any changes in these data points in the Guardrails will automatically update the corresponding columns in ServiceNow.

```html
bucket_name: {{ $.resource.data.Name }}
account_id: {{ $.resource.metadata.aws.accountId }}
region: {{ $.resource.metadata.aws.regionName }}
tags: {{ $.resource.turbot.tags }}
```

```json
bucket_name: "notify-bucket",
account_id: "123456789012",
region: "us-east-1",
tags: {"foo": "bar"}
```

3. Table Definition:

In `AWS > S3 > Bucket > ServiceNow > Configuration Item > Table Definition`, you can define the specific table name in ServiceNow where the data will be synchronized. Although it defaults to the name defined in `AWS > S3 > Bucket > ServiceNow > Table > Definition`, you have the option to direct the data to an existing table of your choice.

```yaml
table:
  name: cmdb_aws_s3_bucket
  label: AWS > S3 > Bucket 
  extendsTable: cmdb_ci_cloud_storage_account
```

Mappings of which columns to create are simple to define in the `Table Definition` policy:

```yaml
columns:
  - name: bucket_name
    label: Bucket Name
  - name: account_id
    label: Account ID
  - name: region
    label: Region
  - name: tags
    size: 1000
    type: string
    label: Cloud Tags
```

4. Archiving records in ServiceNow
Archiving is a strategic process to retain records that are not actively used but are still valuable for historical or compliance purposes. 

When `AWS > S3 > Bucket > ServiceNow > Configuration Item` is set to `Enforce: Sync`, data will be removed from the ServiceNow table once it is deleted from the Guardrails CMDB (when the cloud resource is deleted).

When `AWS > S3 > Bucket > ServiceNow > Configuration Item` is set to `Enforce: Enforce: Sync, Archive on Delete`, data will NOT be removed from the ServiceNow table, it will be archived. Archival is a specific attribute or column, such as `status` which is updated to indicate archival.

For instance, in a table like `aws_s3_bucket`, if the record `bucket1` is to be archived, its status would be updated as follows:

Before Archiving:

```
bucket_name    region       status
bucket1        us-east-1
bucket2        us-east-1
```

After Archiving:

```
bucket_name    region       status
bucket1        us-east-1
bucket2        us-east-1    archived
```

The `status` column `archived` value can be defined as any name:value in the `AWS > S3 > Bucket > ServiceNow > Table Definition` policy:

```yaml
tableName: "x_1138485_guardr_0_guardrails_aws_s3_bucket"
archiveColumns:
  status: "archived"
```

Note: the status column should be defined in the `AWS > S3 > Bucket > ServiceNow > Configuration Item > Table Definition` as well.

## Next Steps

1. Additional context and a demo about the feature is in the announcement post [Continuous Cloud CMDB Sync with ServiceNow & Turbot Guardrails](https://turbot.com/guardrails/blog/2023/12/cmdb-sync-guardrails-servicenow-integration).
2. Consider integrating ServiceNow to Guardrails. Follow the [Enable ServiceNow sync to Guardrails](https://turbot.com/integrations/servicenow/servicenow-to-guardrails-sync) integration guide to configure real-time syncing of ServiceNow resource to Turbot Guardrails.

We want to hear from you! Join our [Slack Community](https://turbot.com/community/join) `#guardrails` channel to ask questions and share feedback.