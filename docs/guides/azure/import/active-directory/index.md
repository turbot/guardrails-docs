---
title: "Import Azure Entra ID into Guardrails"
template: Documentation
nav:
  title: "Entra ID"
  order: 2
---

# Import Microsoft Entra ID into Guardrails

[Proper setup in the Azure tenant](integrations/azure/import) is required for
import of a Microsoft Entra ID directory into Guardrails. Note that the [azure-activedirectory](https://hub.guardrails.turbot.com/mods/azure/mods/azure-activedirectory) mod is required to
connect an Entra ID directory.

All child resources of the Microsoft Entra ID directory will be discovered and
subsequently entered into the Guardrails CMDB.

While you can import an Entra ID directory at the Guardrails level, it is
recommended that you import accounts into Guardrails Folders, as it provides greater
flexibility and ease of management. Define a Folder hierarchy prior to import.

## Importing Microsoft Entra ID Directory via Guardrails Console

1. On the main Guardrails landing page after logging in with `Turbot/Admin` permissions,
   click the purple **IMPORT** card in the top right.
2. Select **Azure Active Directory** on the left.
3. Use the **Parent Resource** dropdown menu to select where the Azure Active
   Directory will be imported to.
4. Enter the **Directory ID**, **Tenant (directory) ID**, **Client (application)
   ID**, and **Client Key (secret)**, as well as the **Environment** type then
   click **Import**.
5. Congratulations! The active directory is now added as a child resource of the
   folder.

CMDB and Discovery controls are enabled by default and Guardrails will begin
discovering the resources in the Active Directory. Resources will start
appearing right away, and resource discovery will continue to run in the
background.

## Import Active Directory via Terraform

Administrators can easily import Active Directory using Terraform. If your
Terraform environment has not been setup, head on over to the
[Terraform Setup Page](reference/terraform/setup).

The [Guardrails Samples Repo (GSR)](https://github.com/turbot/guardrails-samples) is a public repository that contains the necessary
Terraform files to import an Azure Active Directory into Guardrails:

- [Azure Active Directory Import Baseline](https://github.com/turbot/guardrails-samples/tree/master/baselines/azure/azure_active_directory_import)

```hcl
# Create the Azure > Active Directory resource in Guardrails
# Notice that "id" and tenantId" are the same value
resource "turbot_resource" "active_directory_resource" {
  parent   = id-of-parent-folder
  type     = "tmod:@turbot/azure-activedirectory#/resource/types/directory"
  akas     = ["azure:///directory/${var.azure_active_directory_id}"]
  metadata = jsonencode({
    "azure" : {
      "tenantId" : "your tenant id"  //highlight-line
    }
  })
  data     = jsonencode({
    "id" : "your tenant id" //highlight-line
    "tenantId" : "your tenant id"  //highlight-line
  })
}

# Set the credentials for the Active Directory via Turbot policies
resource "turbot_policy_setting" "environment" {
  resource = turbot_resource.active_directory_resource.id
  type     = "tmod:@turbot/azure#/policy/types/environment"
  value    = "Global Cloud" 
  # value    = "US Government" 
}

resource "turbot_policy_setting" "clientKey" {
   resource = turbot_resource.active_directory_resource.id
   type     = "tmod:@turbot/azure#/policy/types/clientKey"
   value    = "turbot app private client key" //highlight-line
}

resource "turbot_policy_setting" "clientId" {
   resource = turbot_resource.active_directory_resource.id
   type     = "tmod:@turbot/azure#/policy/types/clientId"
   value    = "turbot app client id" //highlight-line
}

resource "turbot_policy_setting" "tenantId" {
   resource = turbot_resource.active_directory_resource.id
   type     = "tmod:@turbot/azure#/policy/types/tenantId"
   value    = "your tenant id" //highlight-line
}
```
