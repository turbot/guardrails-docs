---
title: "Steampipe and Powerpipe: Installation and Setup Guide"
sidebar_label: "Steampipe and Powerpipe: Installation and Setup Guide"
---

# Introduction

This runbook provides detailed instructions for installing and setting up Steampipe and Powerpipe on a Linux system.

## Purpose
The purpose of this runbook is to guide users through the installation and initial setup of Steampipe and Powerpipe tools on a Linux Host, specifically the Turbot Guardrails Bastion Host. These tools provide significant benefits for customers managing multiple workspaces:

- **Aggregated Information**: Steampipe simplifies the process of aggregating information from multiple workspaces, enabling comprehensive data analysis and management.
- **Seamless Querying**: Users can easily query their data without the need to log into individual workspaces, saving time and improving efficiency.
- **Automated Reporting**: Schedule crontab jobs to run reports that query the workspaces on a daily or weekly basis, providing overall statistics and insights to help monitor and manage your environments effectively.

This runbook ensures that users can set up these tools efficiently, leveraging their full potential to streamline operations and enhance productivity.

## Prerequisites
* Turbot Guardrails bastion host (Linux system) with sudo privileges
* Internet connection to download the installation scripts

# Procedure

## Steampipe

Steampipe is an open-source, in-house tool that offers zero-ETL capabilities for retrieving data directly from APIs and services.

Please refer to https://steampipe.io/downloads?install=linux for generic installation instructions.

1. Install Steampipe: Linux CLI

Copy and paste the following command into your Linux shell:

```shell
sudo /bin/sh -c "$(curl -fsSL https://steampipe.io/install/steampipe.sh)"
```

2. Version Check
Verify the installation by checking the Steampipe version:  

```shell
steampipe -v
```

3. Install your first Plugin

Install the Steampipe plugin:

```shell
steampipe plugin install steampipe
```

4. Run your first query

Run the following query to test the plugin

```shell
steampipe query "select name from steampipe_registry_plugin;"
```

5. Install Guardrails Plugin

Run the following query to install the guardrails plugin

```shell
steampipe plugin install guardrails
```

6. Add Connections

Steampipe works with Read permissions. You can use the existing access keys of your Guardrails Workspaces or create a new set of keys with a minimum of "Turbot/ReadOnly" permissions on each workspace.

Update the ~/.steampipe/config/guardrails.spc file with the attached configuration. Please update the file as needed.

```shell
connection "console_1" {
 plugin = "guardrails"
 workspace = "https://console-1.turbot.acme.com"
 access_key = "00000000-1111-2222-3333-444444444444"
 secret_key = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
}

connection "console_2" {
 plugin = "guardrails"
 workspace = "https://console-2.turbot.acme.com"
 access_key = "00000000-1111-2222-3333-444444444444"
 secret_key = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
}

connection "console_3" {
 plugin = "guardrails"
 workspace = "https://console-3.turbot.acme.com"
 access_key = "00000000-1111-2222-3333-444444444444"
 secret_key = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
}

connection "all_guardrails" {
 plugin = "guardrails"
 type = "aggregator"
 connections = [
   "console_1",
   "console_2",
   "console_3"
 ]
}
```

7. Run a Guardrails query against your workspaces
To open the query shell, run steampipe query with no arguments

```shell
$ steampipe query
>
```

Notice that the prompt changes, indicating that you are in the Steampipe shell. You can exit the query shell by pressing **Ctrl+d** on a blank line, or using the .exit command.

Once you are in the interactive query shell, run the following steampipe query to get the list of workspaces and their TE versions.

```sql
select
  to_char(current_timestamp, 'YYYY-MM-DD') AS "date",
  workspace,
  value
from
  all_guardrails.guardrails_policy_setting
where
  policy_type_uri = 'tmod:@turbot/turbot#/policy/types/workspaceVersion'
order by
  workspace;
```

## Powerpipe

Visualize cloud configurations. Assess security posture against a massive library of benchmarks. Build custom dashboards with code.

Please refer to https://powerpipe.io/downloads?install=linux for generic installation instructions.

1. Install Powerpipe: Linux CLI

Copy and paste the following command into your Linux shell:

```shell
sudo /bin/sh -c "$(curl -fsSL https://powerpipe.io/install/powerpipe.sh)"
```

2. Version Check

Verify the installation by checking the Powerpipe version:  

```shell
powerpipe -v
```

### Validation

Ensure Steampipe and plugins are installed correctly by running the version checks and sample queries provided in the steps above.

### Troubleshooting

If you encounter any issues during the installation or execution of queries, refer to the official Steampipe documentation at https://steampipe.io/docs

## Conclusion

This runbook has provided the steps to install and set up Steampipe and Powerpipe on a Linux system, enabling you to retrieve data directly from Turbot Guardrails Workspaces and many other services.
