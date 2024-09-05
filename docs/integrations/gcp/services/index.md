---
title: "Enabling Services"
template: Documentation
nav:
  title: "Services"
  order: 30
---

# Enabling GCP Services in Guardrails

<div className="alert alert-warning">
This section details the steps required to enable services for a GCP Project. Alternatively, you can use the <a href="https://github.com/turbot/guardrails-samples/tree/main/baselines/gcp/gcp_services">gcp_services baseline</a> which automates this process.
</div>

All supported services have an Enabled policy.

<div className="example">
  <ul>
    <li><code> GCP > Storage > Enabled </code></li>
    <li><code> GCP > Compute Engine > Enabled </code></li>
    <li><code> GCP > BigQuery > Enabled </code></li>
  </ul>
</div>

You should enable any services that users are allowed to use. By default, the
value of these policies is set to **Disabled**. When a service is disabled,
users granted permissions to cloud accounts via Guardrails will not be able to
manage the service. Additionally, other policies may reference this policy to
determine their behavior. For example, the default behavior of the
`Approved `control is that any resources are unapproved unless the service is
enabled.

```hcl
# GCP > Storage > Enabled
resource "turbot_policy_setting" "gcp_storage_enabled" {
  resource    = "id of account or parent folder/policy pack"   //highlight-line
  type        = "tmod:@turbot/gcp-storage#/policy/types/storageEnabled"
  value       = "Enabled"
}

```

GCP allows explicitly enabling and disabling APIs, and Guardrails provides a policy
to set this as well. You should enable this policy for any service that you
intend to use. By default, the value will be set to “Skip” thus Guardrails will not
modify the setting. For example:

<div className="example">
  <ul>
    <li><code> GCP > Storage > API Enabled </code></li>
    <li><code> GCP > Compute Engine > API Enabled </code></li>
    <li><code> GCP > BigQuery > API Enabled </code></li>
  </ul>
</div>

Generally, you should set the **API Enabled** policy to align with the
**Enabled** policy. For example, The `GCP > Compute Engine > API Enabled` policy
should be set to "Enforce: Enabled if Compute Engine > Enabled".

```hcl

# GCP > Storage > API Enabled
resource "turbot_policy_setting" "gcp_storage_api_enabled" {
  resource    = "id of account or parent folder/policy pack"   //highlight-line
  type        = "tmod:@turbot/gcp-storage#/policy/types/storageApiEnabled"
  value       = "Enforce: Enabled if Storage > Enabled"
}

```

Disabling an API may cause CMDB and Discovery errors from controls for the
service. Admins can get rid of the discovery errors by setting the relevant CMDB
policies to Skip.

For example, if the **Storage API** is not enabled in GCP, the **GCP > Storage >
Bucket > Discovery** controls will be in error, as they do not have the required
access to discover the bucket resources. Changing the CMDB policy to skip will
cause the Discovery control to skip as well.
