---
title: "Import Azure Management Group into Turbot"
template: Documentation
nav:
  title: "Management Group"
  order: 3
---

# Import Azure Management Group into Turbot

[Proper setup in the Azure tenant](guides/azure/import) is required for
import of an Azure Management Group into Turbot.

All child resources of the Management Group in Azure will be discovered and
subsequently entered into the Turbot CMDB, if permissions allow.

While you can import an Azure Management Group at the Turbot level, it is
recommended that you import accounts into Turbot Folders, as it provides greater
flexibility and ease of management. Define a Folder hierarchy prior to import.

## Importing Azure Management Group via Turbot Console (UI)

1. At the main Turbot screen after logging in with `Turbot/Admin` permissions,
   click the **IMPORT** card in the top right.
2. Select **Azure Management Group** on the left.
3. Use the **Parent Resource** dropdown menu to select where the Azure
   Management Group will be imported to.
4. Enter the **Management Group ID**, **Tenant (directory) ID**, **Client
   (application) ID**, and **Client Key (secret)**, as well as the
   **Environment** type then click **Import**.
5. Congratulations! The management group is now added as a child resource of the
   folder.

CMDB and Discovery controls are enabled by default and Turbot will begin
discovering the resources in the Azure Management Group. Resources will start
appearing right away, and resource discovery will continue to run in the
background.

## Management Group Event Pollers

To ensure that Turbot receives events such as new subscriptions in the
management group, ensure that Management Group event pollers are enabled. Do
this by:

1. Go to a level high enough in the resource hierarchy to affect all imported
   Management Groups.
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

## Import Management Group via Terraform

Administrators can easily import Management Group using Terraform. If your
Terraform environment has not been setup, head on over to the
[Terraform Setup Page](reference/terraform/setup).

The Turbot Development Kit is a public repository that contains the necessary
Terraform files to import a Management Group into Turbot:

- [Azure Management Group Import Baseline](https://github.com/turbot/guardrails-samples/tree/master/baselines/azure/azure_management_group_import)

```hcl
# Create the Azure > Management Group resource in Turbot
resource "turbot_resource" "management_group_resource" {
  parent = var.parent_resource
  type   = "tmod:@turbot/azure#/resource/types/managementGroup"
  akas   = ["azure:///tenants/${var.azure_tenant_id}/microsoft.management/managementgroups/your management group id"] //highlight-line
  metadata = jsonencode({
    "azure" : {
      "tenantId" : "your tenant id"  //highlight-line
      "managementGroupId" : "your management group id"  //highlight-line
    }
  })
  data = jsonencode({
    "id" : "/providers/Microsoft.Management/managementGroups/your management group id" //highlight-line
    "name" : "your management group id", //highlight-line
  })
}

# Set the credentials for the Management Group via Turbot policies

resource "turbot_policy_setting" "environment" {
  resource = turbot_resource.management_group_resource.id
  type     = "tmod:@turbot/azure#/policy/types/environment"
  value    = "Global Cloud" or "US Government" //highlight-line
}

resource "turbot_policy_setting" "clientKey" {
  resource = turbot_resource.management_group_resource.id
  type     = "tmod:@turbot/azure#/policy/types/clientKey"
  value    = "turbot application client key" //highlight-line
}

resource "turbot_policy_setting" "clientId" {
  resource = turbot_resource.management_group_resource.id
  type     = "tmod:@turbot/azure#/policy/types/clientId"
  value    = "turbot application client id" //highlight-line
}

resource "turbot_policy_setting" "tenantId" {
  resource = turbot_resource.management_group_resource.id
  type     = "tmod:@turbot/azure#/policy/types/tenantId"
  value    = "your tenant id" //highlight-line
}
```
