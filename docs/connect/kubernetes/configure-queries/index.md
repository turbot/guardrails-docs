---
title: "Configure Queries"
template: Documentation
nav:
  title: "Configure Queries"
  order: 20
---

# Configure Queries for Resources

Each resource has its own query that tells osquery which columns to include and how frequently to run. You can modify these queries through the `Kubernetes > * > osquery > Configuration > *` policies.

For instance, for Kubernetes ConfigMaps, the following policies are created for each cluster:

- `Kubernetes > ConfigMap > osquery > Configuration`
- `Kubernetes > ConfigMap > osquery > Configuration > Columns`
- `Kubernetes > ConfigMap > osquery > Configuration > Interval`
- `Kubernetes > ConfigMap > osquery > Configuration > Name`

The query name in `Kubernetes > ConfigMap > osquery > Configuration > Name` cannot be changed as Guardrails relies on this name for event handling.

You can view the calculated configuration for that resource in the `Kubernetes > ConfigMap > osquery > Configuration` policy.

## Columns

By default, most columns are included for each resource type based on Steampipe plugin table schema, e.g., [kubernetes_config_map schema](https://hub.steampipe.io/plugins/turbot/kubernetes/tables/kubernetes_config_map#inspect). Some columns are excluded if they have data that changes too frequently or is not useful in Guardrails, like the `_ctx` column which contains Steampipe context.

If a column is added to the policy that is not supported by the Steampipe table schema, the agent will fail to run the query and no further data will be reported for that resource type.

## Interval

All queries are set to run every 60 seconds, but this interval can be modified based on your requirements and how often you expect specific resource types to change.
