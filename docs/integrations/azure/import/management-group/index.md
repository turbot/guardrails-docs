---
title: "Import Azure Management Group into Guardrails"
template: Documentation
nav:
  title: "Management Group"
  order: 3
---

# Import Azure Management Group into Guardrails

[Proper setup in the Azure tenant](integrations/azure/import) is required for
import of an Azure Management Group into Guardrails.

All child resources of the Management Group in Azure will be discovered and
subsequently entered into the Guardrails CMDB.

While you can import an Azure Management Group at the Turbot level, it is
recommended that you import accounts into Guardrails Folders, as it provides greater
flexibility and ease of management. Define a Folder hierarchy prior to import.

## Importing Azure Management Group via Guardrails Console

1. At the main Guardrails screen after logging in with `Turbot/Admin` permissions,
   click the purple **IMPORT** card in the top right.
2. Select **Azure Management Group** on the left.
3. Use the **Parent Resource** dropdown menu to select where the Azure
   Management Group will be imported to.
4. Enter the **Management Group ID**, **Tenant (directory) ID**, **Client
   (application) ID**, and **Client Key (secret)**, as well as the
   **Environment** type then click **Import**.
5. Congratulations! The management group is now added as a child resource of the
   folder.

CMDB and Discovery controls are enabled by default and Guardrails will begin
discovering the resources in the Azure Management Group. Resources will start
appearing right away, and resource discovery will continue to run in the
background.

## Management Group Event Pollers

Guardrails uses Management Group event pollers to detect new, updated or deleted subscriptions in the
management group.  Management Group event pollers are enabled by default. No action is required. 


## Import Management Group via Terraform

Administrators can easily import Management Group using Terraform. If your
Terraform environment has not been setup, head on over to the
[Terraform Setup Page](reference/terraform/setup).

The [Guardrails Samples Repo (GSR)](https://github.com/turbot/guardrails-samples)  is a public repository that contains the necessary
Terraform files to import a Management Group into Guardrails:

- [Azure Management Group Import Baseline](https://github.com/turbot/guardrails-samples/tree/master/baselines/azure/azure_management_group_import)

```hcl
# Create the Azure > Management Group resource in Guardrails
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

# Set the credentials for the Management Group via Guardrails policies

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
