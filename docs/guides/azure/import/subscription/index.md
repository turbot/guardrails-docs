---
title: "Import Azure Subscription"
template: Documentation
nav:
  title: "Subscription"
  order: 4
---

# Import Azure Subscription into Guardrails

[Proper setup in the Azure tenant](integrations/azure/import) is required for
import of an Azure Subscription into a Guardrails workspace.

While you can import an Azure Subscription at the Turbot level, it is
recommended that you import accounts into Guardrails Folders, as it provides greater
flexibility and ease of management. Define a Folder hierarchy prior to import.

## Import Azure Subscription via Guardrails Console

1. On the Guardrails landing page after logging in with `Turbot/Admin` permissions,
   click the **IMPORT** card in the top right.
2. Select **Azure Subscription** on the left.
3. Use the **Parent Resource** dropdown menu to select where the Azure
   Subscription will be imported to.
4. Enter the **Subscription ID**, **Tenant (directory) ID**, **Client
   (application) ID**, and **Client Key (secret)**, as well as the
   **Environment** type then click **Import**.
5. Congratulations! The subscription is now added as a child resource of the
   folder.

CMDB and Discovery controls are enabled by default and Guardrails will begin
discovering the resources in the Azure Subscription. Resources will start
appearing right away, and resource discovery will continue to run in the
background.

## Import Subscription via Terraform

Administrators can easily import subscriptions using Terraform. If your
Terraform environment has not been set up, head on over to the
[Terraform Setup Page](reference/terraform/setup).

```hcl
# Create the Azure > Subscription resource in Guardrails
resource "turbot_resource" "subscription_resource" {
  parent = var.parent_resource
  type   = "tmod:@turbot/azure#/resource/types/subscription"
  metadata = jsonencode({
    "azure" : {
      "subscriptionId" : "{your subscription id}", //highlight-line
      "tenantId" : "{your tenant id}" //highlight-line
    }
  })
  data = jsonencode({
    "subscriptionId" : "{your subscription id}" //highlight-line
  })
}

# Set the credentials for the subscription via Guardrails policies
# Azure > Environment
resource "turbot_policy_setting" "environment" {
  resource = turbot_resource.subscription_resource.id
  type     = "tmod:@turbot/azure#/policy/types/environment"
  value    = "Global Cloud"
  # value    = "US Government"
}
# Azure > Client Key
resource "turbot_policy_setting" "clientKey" {
  resource = turbot_resource.subscription_resource.id
  type     = "tmod:@turbot/azure#/policy/types/clientKey"
  value    = "{turbot application client key}"
}
# Azure > Client ID
resource "turbot_policy_setting" "clientId" {
  resource = turbot_resource.subscription_resource.id
  type     = "tmod:@turbot/azure#/policy/types/clientId"
  value    = "{turbot application client id}"
}
# Azure > Tenant ID
resource "turbot_policy_setting" "tenantId" {
  resource = turbot_resource.subscription_resource.id
  type     = "tmod:@turbot/azure#/policy/types/tenantId"
  value    = "{your tenant id}" //highlight-line
}
```
