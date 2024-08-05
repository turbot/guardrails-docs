---
title: AWS RDS DB Approved
sidebar_label: AWS RDS DB Approved
---

# RDS Database Approved Policy Configuration

Organizations want to give flexibility to developers, but this can often lead to
over provisioned resources. In this example, we provide a policy configuration
that will check any new and existing RDS databases for approved instance types
and database engines. Any instance not in compliance will generate an alarm.

<div class = "alert alert-warning">
This example, along with just about any Policy Pack in Guardrails, can be deployed using Terraform. Check it out at the <a href="https://github.com/turbot/guardrails-samples/tree/main/policy_packs/aws/rds/enforce_db_instances_use_specific_engines_and_instance_classes" target="_blank">Guardrails Samples Repo</a>.
</div>

The Guardrails mod [aws-rds](/guardrails/docs/mods/aws/aws-rds) must be
installed to follow the guide.

## Configure Approved RDS Database Engine Types

Log into Guardrails as an Administrator. Select the **Policies** tab, then click on
the green **New Policy Setting** button.

This opens new page with the title **Create Policy Setting**. Click on the
**Policy Type** field, search for the string `aws rds database engines`. Select
the result with the title
`AWS > RDS > DB Instance > Approved > Database Engines`.

Select the **Resource** where the policy setting will live. The setting will
affect all resources at the specified level and below in the
[policy hierarchy](concepts/policies/hierarchy).

The **Setting** section has a text box that accepts a
[YAML list](guides/managing-policies/YAML). A full list of allowed instance
types can be found in
[AWS Documentation](https://docs.aws.amazon.com/AmazonRDS/latest/APIReference/API_CreateDBInstance.html).
In this example, the database engines Aurora, MariaDB, and PostgreSQL will be
defined as approved.

Input the following text into the **Settings** box:

```yaml
- aurora
- mariadb
- postgresql
```

Click the green **Create** button. The newly created policy is now displayed.
![engine types](/images/docs/guardrails/engine-types.png)

## Configure Approved RDS Database Instance Classes

Select the **Policies** tab, then click on the green marked **New Policy
Setting** button near search bar.

This opens a new page with the title **Create Policy Setting**. Click on the
**Policy Type** field, search for the string `aws rds instance classes`. Select
the result with the title
`AWS > RDS > DB Instance > Approved > Instance Classes`.

Select the **Resource** where the policy setting will live. The setting will
affect all resources at the specified level and below in the
[policy hierarchy](concepts/policies/hierarchy).

The **Setting** section has a text box that accepts a
[YAML list](guides/managing-policies/YAML).A full list of available RDS Database
instance classes can be found in
[AWS RDS Documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.DBInstanceClass.html).
Specific instance classes can be defined as well as utilizing the wildcard
character (`*`). We will set the policy to allow `db.m5.2xlarge` as well as the
entire `db.t3.*` class.

```yaml
- db.m5.2xlarge
- db.t3.*
```

Click the green **Create** button. The newly created policy is now displayed.
![instance classes](/images/docs/guardrails/instance-classes.png)

## Configure the AWS > RDS > DB Instance > Approved Policy

The policies `AWS > RDS > DB Instance > Approved > Database Engines` and
`AWS > RDS > DB Instance > Approved > Instance Classes` are now configured,
which define _what_ is considered approved, but these do not tell Guardrails _how_
to handle unapproved instances. To do this, we will want to configure the policy
``AWS > RDS > DB Instance > Approved`.

In the same method as setting the previous two policies, navigate to the
**Policies** tab, click **New Policy Setting** button. Search for the string
`aws rds instance approved` and select the policy
`AWS > RDS > DB Instance > Approved`. Select the **Resource** where the policy
setting will live.

For the purposes of this example, we just want to check if DB instances are
approved. Select the option `Check: Approved`, then click **Create**.
![instance approved](/images/docs/guardrails/instance-approved.png)

## Observation of Controls

Once the Approved policy is set, Guardrails will automatically check all AWS RDS
Instances that inherit the setting. One
[AWS > RDS > DB Instance > Approved](/guardrails/docs/mods/aws/aws-rds/control#aws--rds--db-instance--approved)
control will be created per RDS DB instance. If the configuration of the
instance matches the above policies, the control will go into an `OK` state. If
the configuration does NOT match, an alarm will be generated.
