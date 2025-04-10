---
title: Discover ServiceNow Custom Tables
sidebar_label: Discover ServiceNow Custom Tables
---

# Discovering ServiceNow Custom Tables

In this guide, you will:

- Learn how to discover and manage records from custom ServiceNow tables in Turbot Guardrails
- Configure table discovery, filtering, and record title display settings
- Set up optional business rules for custom table management

Turbot Guardrails can discover and manage records from any specified ServiceNow table, extending visibility beyond the pre-configured Application, Cost Center, and User tables. This allows you to bring data from your custom or other standard ServiceNow tables into Guardrails as `ServiceNow > Custom > Record` resources.

## Prerequisites

- An active ServiceNow instance integrated with Turbot Guardrails following the [Importing a ServiceNow instance into Guardrails](/guardrails/docs/guides/servicenow/import-servicenow-instance) guide.
- The `@turbot/servicenow-custom` mod installed in your Guardrails workspace. See [Install a Mod](/guardrails/docs/guides/configuring-guardrails/install-mod).
- Administrator access to your ServiceNow instance.
- Administrator access to your Turbot Guardrails workspace.

## Enabling Custom Table Discovery

To enable discovery of records from ServiceNow custom tables, configure the following policies:

### ServiceNow > Custom > Table > CMDB

- Enables the discovery for custom tables.
- Set this policy to `Enforce: Enabled` at the scope of your ServiceNow instance resource or higher.

### ServiceNow > Custom > Table > CMDB > Tables

- Specifies the list of ServiceNow table names you want Guardrails to discover records from.
- Provide a YAML list of table names e.g. `["u_custom_table", "cmdb_ci_storage_volume"]`.
- Defaults to an empty list `[]`.

> [!IMPORTANT]
> Removing a table name from this list will result in the deletion of the corresponding `ServiceNow > Custom > Table` resource and all its child `ServiceNow > Custom > Record` resources from the Guardrails CMDB.

## Set Optional Policies

The following two policies allow you to control which records are discovered and how they are displayed in Guardrails:

### ServiceNow > Custom > Record > CMDB > Query

- Allows you to refine which records are discovered by applying [ServiceNow encoded query string](https://www.servicenow.com/docs/bundle/yokohama-platform-user-interface/page/use/using-lists/concept/c_EncodedQueryStrings.html).
- Useful for limiting discovery to specific records that match your criteria.
- For example, filter by status, category, or any other field available in the ServiceNow table
- Defaults to `""` (empty string) which means all records will be discovered.

### ServiceNow > Custom > Record > CMDB > Title

- Specifies the data key(s) used to retrieve the title for discovered `ServiceNow > Custom > Record` resources in Guardrails.
- Provide an array of strings representing field names in order of preference e.g. `["name", "display_name", "sys_id"]`. Guardrails uses the first field in the list that contains a non-empty value.
- This allows for fallback options if preferred fields are missing or empty.
- Defaults to `["name", "display_value", "display_name", "title", "label", "short_description", "number", "sys_name", "sys_title", "sys_id"]`.
- Customize by creating a new policy setting.

<!-- ### Business Rule for Event-Driven Updates (Optional) -->

## (Optional) Configure Real-time Business Rules

To enable real-time updates when records change in ServiceNow, you can configure Business Rules. This allows Guardrails to automatically sync changes as they happen in ServiceNow.

Before configuring Business Rules, ensure you have:

- Set `ServiceNow > Config > System Properties` to `Enforce: Configured` as described in the [ServiceNow sync prerequisites](/guardrails/docs/guides/servicenow/servicenow-to-guardrails-sync#prerequisites).
- Administrator access to create Business Rules in ServiceNow

### ServiceNow > Custom > Table > Business Rule

- Configures ServiceNow Business Rules for real-time event handling of record changes (new, updated, deleted) in the discovered tables.
- Set to `Enforce: Configured` to enable automatic setup and management.


### ServiceNow > Custom > Table > Business Rule > Name

- Allows customization of the Business Rule name.

## Example: Discovering the Server Table

To discover records from the standard ServiceNow Server table `cmdb_ci_server`, follow these steps:

1.  Set `ServiceNow > Custom > Table > CMDB` to `Enforce: Enabled`.
2.  Set `ServiceNow > Custom > Table > CMDB > Tables` to:
    ```yaml
    - cmdb_ci_server
    ```
![ServiceNow Discovery Policy Settings](/images/docs/guardrails/guides/servicenow/discovery-servicenow-custom-tables/policy-setting.png)

3.  (Optional) To only discover active servers, set `ServiceNow > Custom > Record > CMDB > Query` to `active=true` (or the relevant field/value for server status).
4.  (Optional) To enable real-time updates, set `ServiceNow > Custom > Table > Business Rule` to `Enforce: Configured`.

![ServiceNow Business Rule Setting](/images/docs/guardrails/guides/servicenow/discovery-servicenow-custom-tables/business-rule-policy.png)

Guardrails will now discover records from `cmdb_ci_server`. These records will appear in your Guardrails inventory under the ServiceNow instance resource as `ServiceNow > Custom > Record` resources.


## Next Steps

Please see the following resources to learn more about ServiceNow integrations:

- [Enable ServiceNow to Guardrails Sync](/guardrails/docs/guides/servicenow/servicenow-to-guardrails-sync)
- [Enable Guardrails to ServiceNow Sync](/guardrails/docs/guides/servicenow/guardrails-to-servicenow-sync)

## Troubleshooting

| Issue              | Description                                                                                                                                                                           | Guide                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Common errors      | Common issues that may prevent controls from running include network connectivity problems, permission issues, and API rate limits. These can cause controls to enter an error state. | Refer to [Common Troubleshooting](/guardrails/docs/guides/troubleshooting) for detailed resolution steps. |
| Further Assistance | If you encounter further issues with Calculated Policies, please open a ticket with us and attach the relevant information to assist you more efficiently.                            | [Open Support Ticket](https://support.turbot.com)                                                         |
| Community Support  | We want to hear from you! Join our [Slack Community](https://turbot.com/community/join) `#guardrails` channel to ask questions and share feedback.                                    | [Join Slack Community](https://turbot.com/community/join)                                                 |
