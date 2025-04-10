---
title: Integrating ServiceNow
template: Documentation
nav:
  order: 10
---

# Integrating ServiceNow

Turbot Guardrails is deeply integrated with [ServiceNow](https://servicenow.com). A bi-directional sync between each platform can be utilized to:

1. Continuously sync ServiceNow resources to Turbot Guardrails
2. Continuously sync cloud resources with Turbot Guardrails to ServiceNow
3. Discover and manage records from any ServiceNow table


## 1. Continuously sync ServiceNow resources to Turbot Guardrails
ServiceNow resources such Applications, Cost Centers, Users, etc tables can sync to Turbot Guardrails. This integration bridges the gap between your business context with your cloud & security controls.

When enabled, Guardrails configures and manages:
  1. Guardrails provides ServiceNow mods, with policies and controls covering a wide range of ServiceNow resource types (e.g. system and CMDB tables such as Applications, Cost Centers, Users, etc)
  2. Event handlers (Business Rules) for each applicable ServiceNow table. This handles real-time updates as resources are created, modified, and deleted.
  3. Audit trail of all activity on your ServiceNow tables. Quickly see what happened, who manage the change, when the activity occurred, and what was the configuration difference.

Syncing ServiceNow CMDB data brings critical context to your cloud resources in Guardrails. Details like application ownership, data classification, and cost centers can then be used to:

* Automatically tag resources with application context
* Restrict access to groups, departments and business units
* Enable security controls based on data sensitivity
* Limit workload usage based on cost center budgets
* And many other cloud and security automation use cases

**To get started:**
* [Import a ServiceNow Instance](/guardrails/docs/guides/servicenow/import-servicenow-instance) into a Guardrails Folder.
* [Enable ServiceNow sync to Guardrails](https://turbot.com/guardrails/docs/guides/servicenow/servicenow-to-guardrails-sync) to configure real-time syncing.

Additional context about the feature is in the announcement post [ServiceNow + Guardrails: Context-aware cloud & security automation](https://turbot.com/guardrails/blog/2023/12/context-aware-guardrails-servicenow-integration).

## 2. Continuously sync cloud resources with Turbot Guardrails to ServiceNow
Cloud resources such as AWS S3 Buckets, Azure Compute Instances, GCP SQL Instances can sync to ServiceNow CMDB and system tables. This integration helps eliminate manual discovery gaps with your ServiceNow CMDB.

When enabled, Guardrails configures and manages:
  1. Guardrails provides per cloud resource type ServiceNow mods, with policies and controls to support managing ServiceNow tables and syncing configuration items to those tables (e.g. cloud compute instances, databases, networking, etc)
  2. Event-driven controls extend updating Turbot Guardrails CMDB to also the ServiceNow CMDB for real-time updates as cloud resources are created, modified, and deleted.
  3. Audit trail of all activity of your cloud resources to see what happened, who manage the change, when the activity occurred, and what was the configuration difference for historical purposes with your ServiceNow records.

Continuously syncing your cloud resources into ServiceNow enhances the CMDB into a living source of truth for hybrid and multi-cloud enterprises:

* Eliminate blindspots: comprehensive multi-cloud resource coverage.
* Improve accuracy: instant updates prevent missing and incomplete data.
* Flexible mapping: control what data is synced to which CMDB CI tables.
* Enrich context: surface tags as key resource data.

**To get started:**
* [Import a ServiceNow Instance](/guardrails/docs/guides/servicenow/import-servicenow-instance) into a Guardrails Folder.
* [Enable Guardrails sync to ServiceNow](/guardrails/docs/guides/servicenow/guardrails-to-servicenow-sync) to configure real-time syncing.

## 3. Discover and manage records from any ServiceNow table

Guardrails can discover and manage records from any ServiceNow table, extending visibility beyond the pre-configured Application, Cost Center, and User tables. This allows you to bring data from your custom or other standard ServiceNow tables into Guardrails as ServiceNow Custom Record resources.

When enabled, Guardrails configures and manages:
  1. Guardrails provides the ServiceNow Custom mod, with policies and controls to support discovering and managing any ServiceNow table
  2. Event handlers (Business Rules) for each discovered table to handle real-time updates as records are created, modified, and deleted
  3. Audit trail of all activity on your discovered tables to see what happened, who made the change, when it occurred, and what configuration differences were made

Discovering custom tables enhances your cloud and security automation capabilities:

* Extend visibility to any ServiceNow table data
* Filter which records to discover using ServiceNow queries
* Configure how records are displayed in Guardrails
* Enable real-time updates through Business Rules

**To get started:**

* [Import a ServiceNow Instance](/guardrails/docs/guides/servicenow/import-servicenow-instance) into a Guardrails Folder
* [Discover ServiceNow Custom Tables](/guardrails/docs/guides/servicenow/discovery-servicenow-custom-tables) to configure table discovery and record management


Additional context about the feature is in the announcement post [Continuous Cloud CMDB Sync with ServiceNow & Turbot Guardrails](https://turbot.com/guardrails/blog/2023/12/cmdb-sync-guardrails-servicenow-integration).

We want to hear from you! Join our [Slack Community](https://turbot.com/community/join) `#guardrails` channel to ask questions and share feedback.