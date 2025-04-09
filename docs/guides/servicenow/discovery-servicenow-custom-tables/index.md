---
title: "Discover ServiceNow Custom Tables in Guardrails"
template: Documentation
nav:
  title: "Discover ServiceNow Custom Tables"
  order: 25 # Adjust order as needed
---

# Discover ServiceNow Custom Tables in Guardrails

Turbot Guardrails can discover and manage records from any specified ServiceNow table, extending visibility beyond the pre-configured Application, Cost Center, and User tables. This allows you to bring data from your custom or other standard ServiceNow tables into Guardrails as `ServiceNow > Custom > Record` resources.

## Prerequisites

### Associate your ServiceNow instance to Turbot Guardrails

Before you get started, ensure you have completed the steps in the [Importing a ServiceNow instance into Guardrails](/guardrails/docs/guides/servicenow/import-servicenow-instance) guide to associate your ServiceNow instance with Turbot Guardrails.

### Turbot Guardrails Mod Installation

The `@turbot/servicenow-custom` mod must be installed in your Guardrails workspace. This mod provides the necessary resource types, policies, and controls for discovering custom table records. Ensure it is installed and the mod's `Installed` control is in the `OK` state.

## Enabling Custom Table Discovery

To enable the discovery of records from specific ServiceNow tables, you need to configure the relevant policies. The primary policies involved are:

- `ServiceNow > Custom > Table > CMDB`
  - Enables the discovery mechanism for custom tables.
  - Set this policy to `Enforce: Enabled` at the scope of your ServiceNow instance resource or higher.
- `ServiceNow > Custom > Table > CMDB > Tables`
  - Specifies the list of ServiceNow table names you want Guardrails to discover records from.
  - Provide a YAML list of table names (e.g., `["u_custom_table", "cmdb_ci_storage_volume"]`).
  - Defaults to an empty list `[]`.
  - > [!IMPORTANT]
    > Removing a table name from this list will result in the deletion of the corresponding `ServiceNow > Custom > Table` resource and all its child `ServiceNow > Custom > Record` resources from the Guardrails CMDB.
- `ServiceNow > Custom > Record > CMDB > Query`
  - Allows filtering of records discovered from the specified tables using a ServiceNow encoded query string.
  - Paste the encoded query string as the policy value.
  - Defaults to `""` (empty string), meaning no filter is applied.
- `ServiceNow > Custom > Record > CMDB > Title`
  - Specifies the data key(s) used to retrieve the title for discovered `ServiceNow > Custom > Record` resources in Guardrails.
  - Provide an array of strings representing field names in order of preference (e.g., `["name", "display_name", "sys_id"]`). Guardrails uses the first field in the list that contains a non-empty value.
  - This allows for fallback options if preferred fields are missing or empty.
  - Defaults to `["name", "display_value", "display_name", "title", "label", "short_description", "number", "sys_name", "sys_title", "sys_id"]`.
  - You can customize this list by creating a new policy setting.

### Business Rule for Event-Driven Updates (Optional)

Similar to the pre-configured table sync, you can enable event-driven updates for discovered custom tables:

- `ServiceNow > Custom > Table > Business Rule`
  - Configures ServiceNow Business Rules for event handling of record changes (new, updated, deleted) in the discovered tables.
  - Set to `Enforce: Configured` to enable automatic setup and management.
  - Requires `ServiceNow > Config > System Properties` to be set to `Enforce: Configured` as described in the [ServiceNow sync prerequisites](/guardrails/docs/guides/servicenow/servicenow-to-guardrails-sync#prerequisites).
- `ServiceNow > Custom > Table > Business Rule > Name`
  - Allows customization of the Business Rule name.

## Example: Discovering the Server Table (`cmdb_ci_server`)

To discover records from the standard ServiceNow Server table `cmdb_ci_server`:

1.  Set `ServiceNow > Custom > Table > CMDB` to `Enforce: Enabled`.
2.  Set `ServiceNow > Custom > Table > CMDB > Tables` to:
    ```yaml
    - cmdb_ci_server
    ```
3.  (Optional) To only discover active servers, set `ServiceNow > Custom > Record > CMDB > Query` to `active=true` (or the relevant field/value for server status).
4.  (Optional) To enable real-time updates, set `ServiceNow > Custom > Table > Business Rule` to `Enforce: Configured`.

Once configured, Guardrails will begin discovering records from the `cmdb_ci_server` table. These records will appear in your Guardrails inventory under the associated ServiceNow instance resource as `ServiceNow > Custom > Record` resources.

## Next Steps

- Explore the discovered `ServiceNow > Custom > Record` resources in your Guardrails inventory.
- Utilize the data from these custom records in Guardrails policies and calculated policies for context-aware automation.

For more details on the specific policies and controls introduced, refer to the `servicenow-custom` mod changelog [[1]](https://turbot.com/guardrails/changelog/servicenow-custom-v5-0-0).

We want to hear from you! Join our [Slack Community](https://turbot.com/community/join) `#guardrails` channel to ask questions and share feedback.
