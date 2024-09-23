---
title: "Enable ServiceNow sync to Guardrails"
template: Documentation
nav:
  title: "Enable ServiceNow sync to Guardrails"
  order: 20
---

# Enable ServiceNow sync to Guardrails

## Prerequisites

### Associate your ServiceNow instance to Turbot Guardrails

Before you get started, if you have not already completed, follow the [Importing a ServiceNow instance into Guardrails](/guardrails/docs/integrations/import-servicenow-instance) integration guide to associate your ServiceNow instance to Turbot Guardrails.

### Turbot Guardrails Mods to be installed

Only the `@turbot/servicenow` mod needs to be installed in your Guardrails workspace, there are no additional mods for this integration.

### Set ServiceNow System Properties

ServiceNow Business Rules are automatically managed by Turbot Guardrails to setup event handlers to capture record changes (add, updates and deletes) within the tables in scope for the sync. As part of the Business Rules configuration, Turbot Guardrails stores its webhook URL in a ServiceNow System Properties object for an integrated retrival mechanism from the Business Rules.

The following policies are associated:

- `ServiceNow > Config > System Properties` defaults to `Skip`, set to `Enforce: Configured` to enable the auto-configuration.
- `ServiceNow > Config > System Properties > Template` leave as the default.

The template provides flexibility for Guardrails to control additional system properties, but by default it is configured to manage the webhook URL. No changes to the template are neccesary.

Please make sure you set `ServiceNow > Config > System Properties` to `Enforce: Configured` so later steps are successful.

Note: remember to set your `ServiceNow > Config > System Properties` policy to `Enforce: Configured` from the prerequisites section above.

## Sync ServiceNow tables to Guardrails

Syncing data between systems is automated and continuous. Similar to how Guardrails captures cloud inventory and configs, now any ServiceNow CMDB table can sync in real-time as well.

Once you have your ServiceNow instance associated, to enable syncing of ServiceNow tables to your Guardrails workspace is simply setting one CMDB policy per applicable table.

There are three table policy types already pre-configured in the mod to get you started:

- `ServiceNow > Application > *` syncs the `cmdb_ci_appl` table
- `ServiceNow > Cost Center > *` syncs the `cmn_cost_center` table
- `ServiceNow > User > *` syncs the `sys_user` table

Note: please submit feedback through support on additional tables to be supported.

Each policy type aligns to a ServiceNow table, and defines whether the sync is enabled and whether ServiceNow Business Rules are enabled for event-driven updates of table records changes. For example:

- `ServiceNow > {ServiceNow Table} > CMDB`
  - Enables the controls to sync the table to Guardrails.
  - Defaults to `Skip` by default, setting the policy to `Enforce: Enabled` will enable the sync to Guardrails immediately.
  - The Business Rule policy below will enable event handlers to capture ongoing changes.
- `ServiceNow > {ServiceNow Table} > Business Rule`
  - Configures ServiceNow Business Rules for event handling of table record changes (new, updated and deleted records).
  - Defaults to `Skip` by default, automatic setup and management of the policy is enable by setting the policy to `Enforce: Configured`.
- `ServiceNow > {ServiceNow Table} > Business Rule > Name`
  - The name of the Business Rule is configurable; defaults to `Guardrails Application Business Rule`, can be adjusted to fit your naming standards.

### Example of syncing the Application table

To enable the sync for the Application table, set the following policies:

- `ServiceNow > Application > CMDB` set to `Enforce: Enabled`.
- `ServiceNow > Application > Business Rule` set to `Enforce: Configured`.
- `ServiceNow > Application > Business Rule > Name` leave as the default.

Note: remember to set your `ServiceNow > Config > System Properties` policy to `Enforce: Configured` from the prerequisites section above.

Example of one of the policies set: <img src="/images/docs/guardrails/servicenow/servicenow-turbot-guardrails-table-sync-policy.png" style={{ boxShadow: 'none', width: '75%', height: '75%' }} />

**Note:** when setting the policies, select the resource scope at or above the level where your ServiceNow instance was imported to. If you have set your instance at the Turbot level, set the policies at that level. If you imported the ServiceNow instance within a Folder (e.g. Acme), set the policy at the Acme folder or higher (e.g. Turbot level).

Once the policies are set, you should now see the Applications brought into Guardrails under your ServiceNow instance:

<img src="/images/docs/guardrails/servicenow/turbot-guardrails-servicenow-cmdb-ci-appl-records-in-turbot.jpg" style={{ boxShadow: 'none', width: '75%', height: '75%' }} />

## Next Steps

1. Additional context about the feature and a demo is in the announcement post [ServiceNow + Guardrails: Context-aware cloud & security automation](https://turbot.com/guardrails/blog/2023/12/context-aware-guardrails-servicenow-integration).
2. Consider integrating Turbot Guardrails to ServiceNow. Follow the [Enable Guardrails sync to ServiceNow](/guardrails/docs/integrations/servicenow/guardrails-to-servicenow-sync) integration guide to configure real-time syncing of cloud resources to your ServiceNow CMDB.

We want to hear from you! Join our [Slack Community](https://turbot.com/community/join) `#guardrails` channel to ask questions and share feedback.
