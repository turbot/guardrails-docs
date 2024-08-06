---
title: "Import Azure Tenant into Turbot"
template: Documentation
nav:
  title: "Tenant"
  order: 1
---

# Import Azure Tenant into Turbot

[Proper setup in the Azure tenant](integrations/azure/import) is required for
import of an Azure Tenant into Turbot.

All child resources of the Azure Tenant will be discovered and subsequently
entered into the Turbot CMDB, if permissions allow.

While you can import an Azure Tenant at the Turbot level, it is recommended that
you import accounts into Turbot Folders, as it provides greater flexibility and
ease of management. Define a Folder hierarchy prior to import.

## Import Azure Tenant via Turbot Console (UI)

1. At the main Turbot screen after logging in with `Turbot/Admin` permissions,
   click the purple **IMPORT** card in the top right corner.
2. Select **Azure Tenant** on the left.
3. Use the **Parent Resource** dropdown menu to select the parent resource for the Azure Tenant.
4. Enter the **Tenant (directory) ID**, **Client (application) ID**, and
   **Client Key (secret)**, as well as the **Environment** type then click
   **Import**.
5. Congratulations! The tenant is now added as a child resource of the folder.

CMDB and Discovery controls are enabled by default and Turbot will begin
discovering the resources in the Azure Tenant. Resources will start appearing
right away, and resource discovery will continue to run in the background.

## Management Group Event Pollers

To ensure that Turbot receives events such as new subscriptions in the
management groups inside the tenant, ensure that Management Group event pollers
are enabled. Do this by:

1. Go to the tenant or to a folder above the tenant.
2. Create a new policy setting for
   [Azure > Turbot > Management Group Event Poller](https://turbot.com/guardrails/docs/mods/azure/azure/policy#azure--turbot--management-group-event-poller)
   then set it to `Enabled`
3. Management Group event polling will kick off. Ensure correct operation by
   checking the
   [Management Group Event Poller](https://turbot.com/guardrails/docs/mods/azure/azure/control#azure--turbot--management-group-event-poller)
   control in at least one Management Group. The default interval is every 12
   hours but can be as little as one hour with the
   [Azure > Turbot > Management Group Event Poller > Interval](https://turbot.com/guardrails/docs/mods/azure/azure/policy#azure--turbot--management-group-event-poller--interval)
   policy.

## Import Tenant via Terraform

Administrators can easily import tenant using Terraform. If your Terraform
environment has not been setup, head on over to the
[Terraform Setup Page](reference/terraform/setup).

The Turbot Development Kit is a public repository that contains the necessary
Terraform files to import an Azure Tenant into Turbot:

- [Azure Tenant Import Baseline](https://github.com/turbot/guardrails-samples/tree/master/baselines/azure/azure_tenant_import)

```hcl
# Create the Azure > Tenant resource in Turbot
resource "turbot_resource" "tenant_resource" {
  parent = var.parent_resource
  type   = "tmod:@turbot/azure#/resource/types/tenant"
  akas   = ["azure:///tenants/your tenant id"] //highlight-line
  metadata = jsonencode({
    "azure" : {
      "tenantId" : "your tenant id" //highlight-line
    }
  })
  data = jsonencode({
    "id" : "your tenant id" //highlight-line
  })
}

# Set the credentials for the Tenant via Turbot policies

resource "turbot_policy_setting" "environment" {
  resource = turbot_resource.tenant_resource.id
  type     = "tmod:@turbot/azure#/policy/types/environment"
  value    = "Global Cloud" 
  # value    = "US Government"
}

resource "turbot_policy_setting" "clientKey" {
  resource = turbot_resource.tenant_resource.id
  type     = "tmod:@turbot/azure#/policy/types/clientKey"
  value    = "{Guardrails application client key}" 
}

resource "turbot_policy_setting" "clientId" {
  resource = turbot_resource.tenant_resource.id
  type     = "tmod:@turbot/azure#/policy/types/clientId"
  value    = "{Guardrails application client id}" //highlight-line
}

resource "turbot_policy_setting" "tenantId" {
  resource = turbot_resource.tenant_resource.id
  type     = "tmod:@turbot/azure#/policy/types/tenantId"
  value    = "{tenant id}" //highlight-line
}
```
