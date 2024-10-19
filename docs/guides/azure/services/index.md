---
title: "Enabling Services"
template: Documentation
nav:
  title: "Services"
  order: 30
---

# Enabling Azure Services in Turbot

<div className="alert alert-warning">
This section details the steps required to enable services for a Azure Subscription. Alternatively, you can use the <a href="https://github.com/turbot/guardrails-samples/tree/main/baselines/azure/azure_service_enabled">azure_services baseline</a> which can help automate this process.
</div>

## Enabling Services

All supported services have an Enabled policy.

<div className="example">
  <ul>
    <li><code> Azure > Storage > Enabled </code></li>
    <li><code> Azure > Compute Engine > Enabled </code></li>
    <li><code> Azure > SQL > Enabled </code></li>
  </ul>
</div>

You should enable any services that users are allowed to use. By default, the
value of these policies is set to **Disabled**. When a service is disabled,
users granted permissions to cloud accounts via Turbot will not be able to
manage the service. Additionally, other policies may reference this policy to
determine their behavior. For example, the default behavior of the
`Approved `control is that any resources are unapproved unless the service is
enabled.

For example, to enable the Azure Storage service:

```hcl
# Azure > Storage > Enabled
resource "turbot_policy_setting" "azure_storage_enabled" {
  resource    = "id of sub or parent folder/smart folder"   //highlight-line
  type        = "tmod:@turbot/azure-storage#/policy/types/storageEnabled"
  value       = "Enabled"
}

```

## Registering Service Providers

To use a service API in Azure, you must
[register the resource provider in your subscription](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-supported-services)

Note that a single provider may support many services - they do not map 1:1.

To enable a provider, set the relevant
`Azure > Provider > {provider} > Registered` policy to "Enforce: Registered"

<div className="example">
  <ul>
    <li><code> Azure > Provider > Storage > Registered </code></li>
    <li><code> Azure > Provider > Compute > Registered </code></li>
    <li><code> Azure > Provider > SQL > Registered </code></li>
  </ul>
</div>

For example, to enable the storage provider:

```hcl
# Azure > Provider > Storage > Registered
resource "turbot_policy_setting" "provider_registration_enable" {
  resource    = "id of sub or parent folder/smart folder"   //highlight-line
  type        = "tmod:@turbot/azure-provider#/policy/types/storageRegistered"
  value       = "Enforce: Registered"
}

```

Failing to register a provider cause CMDB and Discovery errors from controls for
the dependent services. You can get rid of the discovery errors by setting the
relevant CMDB policies to Skip.

For example, if the **Storage** provider is not enabled in Azure, the **Azure >
Storage > Storage Account > Discovery** controls will be in error, as they do
not have the required access to discover the resources. Changing the CMDB policy
to skip will cause the Discovery control to skip as well
