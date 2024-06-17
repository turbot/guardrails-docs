---
title: "Import Azure Subscription into Turbot"
template: Documentation
nav:
  title: "Subscription"
  order: 4
---

# Import Azure Subscription into Turbot

[Proper setup in the Azure tenant](integrations/azure/import) is required for
import of an Azure Subscription into Turbot.

While you can import an Azure Subscription at the Turbot level, it is
recommended that you import accounts into Turbot Folders, as it provides greater
flexibility and ease of management. Define a Folder hierarchy prior to import.

## Import Azure Subscription via Turbot Console (UI)

1. At the main Turbot screen after logging in with `Turbot/Admin` permissions,
   click the **IMPORT** card in the top right.
2. Select **Azure Subscription** on the left.
3. Use the **Parent Resource** dropdown menu to select where the Azure
   Subscription will be imported to.
4. Enter the **Subscription ID**, **Tenant (directory) ID**, **Client
   (application) ID**, and **Client Key (secret)**, as well as the
   **Environment** type then click **Import**.
5. Congratulations! The subscription is now added as a child resource of the
   folder.

CMDB and Discovery controls are enabled by default and Turbot will begin
discovering the resources in the Azure Subscription. Resources will start
appearing right away, and resource discovery will continue to run in the
background.

## Import Subscription via Terraform

Administrators can easily import subscriptions using Terraform. If your
Terraform environment has not been setup, head on over to the
[Terraform Setup Page](reference/terraform/setup).

The Turbot Development Kit is a public repository that contains the necessary
Terraform files to import an Azure Subscription into Turbot:

- [Azure Subscription Import Baseline](https://github.com/turbot/guardrails-samples/tree/master/baselines/azure/azure_sub_import)

Note that the linked baseline is for existing Azure subscriptions, but there are
also baselines available that:

- [Create an Azure subscription and import into Turbot](https://github.com/turbot/guardrails-samples/tree/master/baselines/azure/azure_sub_create_then_import)
- [Create an Azure subscription and import into Turbot with Read Only rights](https://github.com/turbot/guardrails-samples/tree/master/baselines/azure/azure_sub_create_then_import_ro)

```hcl
# Create the Azure > Subscription resource in Turbot
resource "turbot_resource" "subscription_resource" {
  parent = var.parent_resource
  type   = "tmod:@turbot/azure#/resource/types/subscription"
  metadata = jsonencode({
    "azure" : {
      "subscriptionId" : "your subscription id", //highlight-line
      "tenantId" : "your tenant id" //highlight-line
    }
  })
  data = jsonencode({
    "subscriptionId" : "your subscription id" //highlight-line
  })
}

# Set the credentials for the subscription via Turbot policies
# Azure > Environment
resource "turbot_policy_setting" "environment" {
  resource = turbot_resource.subscription_resource.id
  type     = "tmod:@turbot/azure#/policy/types/environment"
  value    = "Global Cloud" or "US Government" //highlight-line
}
# Azure > Client Key
resource "turbot_policy_setting" "clientKey" {
  resource = turbot_resource.subscription_resource.id
  type     = "tmod:@turbot/azure#/policy/types/clientKey"
  value    = "turbot application client key" //highlight-line
}
# Azure > Client ID
resource "turbot_policy_setting" "clientId" {
  resource = turbot_resource.subscription_resource.id
  type     = "tmod:@turbot/azure#/policy/types/clientId"
  value    = "turbot application client id" //highlight-line
}
# Azure > Tenant ID
resource "turbot_policy_setting" "tenantId" {
  resource = turbot_resource.subscription_resource.id
  type     = "tmod:@turbot/azure#/policy/types/tenantId"
  value    = "your tenant id" //highlight-line
}
```
