---
title: "Import Azure Active Directory into Turbot"
template: Documentation
nav:
  title: "Active Directory"
  order: 2
---

# Import Azure Active Directory into Turbot

[Proper setup in the Azure tenant](integrations/azure/import) is required for
import of an Azure Active Directory into Turbot.

All child resources of the Azure Active Directory will be discovered and
subsequently entered into the Turbot CMDB, if permissions allow.

While you can import an Azure Subscription at the Turbot level, it is
recommended that you import accounts into Turbot Folders, as it provides greater
flexibility and ease of management. Define a Folder hierarchy prior to import.

## Importing Azure Active Directory via Turbot Console (UI)

1. At the main Turbot screen after logging in with `Turbot/Admin` permissions,
   click the **IMPORT** card in the top right.
2. Select **Azure Active Directory** on the left.
3. Use the **Parent Resource** dropdown menu to select where the Azure Active
   Directory will be imported to.
4. Enter the **Directory ID**, **Tenant (directory) ID**, **Client (application)
   ID**, and **Client Key (secret)**, as well as the **Environment** type then
   click **Import**.
5. Congratulations! The active directory is now added as a child resource of the
   folder.

CMDB and Discovery controls are enabled by default and Turbot will begin
discovering the resources in the Active Directory. Resources will start
appearing right away, and resource discovery will continue to run in the
background.

## Import Active Directory via Terraform

Administrators can easily import Active Directory using Terraform. If your
Terraform environment has not been setup, head on over to the
[Terraform Setup Page](reference/terraform/setup).

The Turbot Development Kit is a public repository that contains the necessary
Terraform files to import an Azure Active Directory into Turbot:

- [Azure Active Directory Import Baseline](https://github.com/turbot/guardrails-samples/tree/main/baselines/azure/azure_active_directory_import)

```hcl
# Create the Azure > Active Directory resource in Turbot
# Notice that "id" and tenantId" are the same value
resource "turbot_resource" "active_directory_resource" {
  parent = id-of-parent-folder
  type   = "tmod:@turbot/azure-activedirectory#/resource/types/directory"
  akas   = ["azure:///directory/${var.azure_active_directory_id}"]
  metadata = jsonencode({
    "azure" : {
      "tenantId" : "your tenant id"  //highlight-line
    }
  })
  data = jsonencode({
    "id" : "your tenant id" //highlight-line
    "tenantId": "your tenant id"  //highlight-line
  })
}

# Set the credentials for the Active Directory via Turbot policies
resource "turbot_policy_setting" "environment" {
  resource = turbot_resource.active_directory_resource.id
  type     = "tmod:@turbot/azure#/policy/types/environment"
  value    = "Global Cloud" or "US Government" //highlight-line
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
