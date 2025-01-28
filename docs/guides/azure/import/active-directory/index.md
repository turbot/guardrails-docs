---
title: "Import Azure Entra ID"
template: Documentation
nav:
  title: "Entra ID"
  order: 2
---

# Import Microsoft Entra ID into Guardrails

[Proper setup in the Azure tenant](integrations/azure/import) is required for
import of a Microsoft Entra ID directory into Guardrails. Note that the [azure-activedirectory](https://hub.guardrails.turbot.com/mods/azure/mods/azure-activedirectory) mod is required to
connect an Entra ID directory.

All child resources of the Microsoft Entra ID directory will be discovered and subsequently entered into the Guardrails CMDB.

While you can import an Entra ID directory at the Guardrails level, it is recommended that you import accounts into Guardrails Folders, as it provides greater flexibility and ease of management. Define a Folder hierarchy prior to import.

## Importing Microsoft Entra ID Directory via Guardrails Console

Login to Guardrails workspace console in with `Turbot/Admin` permissions, select the  **CONNECT** card in the top right corner. Select **Microsoft Entra ID (formerly Azure Active Directory)** from the panel.

![Select Azure](/images/docs/guardrails/guides/azure/import/active-directory/select-ms-entra-id.png)

Provide the details as below:

- Select **Choose your folder** dropdown menu to select the [folder](/guardrails/docs/concepts/resources/hierarchy#folders) where you would like to import your Entra ID directory.
- Provide the **Directory ID**.
- Provide the **Tenant ID**.
- **Client ID** and **Client Key (secret)** in `Client details`.
- Provide **Environment** from the dropdown list.

![Provide Details](/images/docs/guardrails/guides/azure/import/active-directory/active-directory-tenant-details.png)

Select **Connect**.

CMDB and Discovery controls are enabled by default and Guardrails will begin discovering the resources in the Azure Tenant. Resources will start appearing right away, and resource discovery will continue to run in the background.

## Import Active Directory via Terraform

Administrators can easily import Active Directory using Terraform. If your Terraform environment has not been setup, head on over to the
[Terraform Setup Page](reference/terraform/setup).

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
