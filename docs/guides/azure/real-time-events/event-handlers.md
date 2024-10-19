---
title: "Configuring Real-Time events"
template: Documentation
nav:
  title: "Event Handlers"
  order: 140
---

# Event Handlers

<div className="alert alert-warning">
This section details the steps required to set up Azure Event Handlers. Alternatively, you can use the <a href="https://github.com/turbot/guardrails-samples/tree/master/baselines/azure/azure_eventing">azure_setup baseline</a>, which automates this process.
</div>

The event handler infrastructure is configured by a Turbot Stack in each region.
This stack will configure the required infrastructure components.

- **Activity Log Alerts** that determine which API events to listen for.
- An **Action Group** that forwards the events to a Turbot Webhook URL where the
  Turbot Router will ingest them.

In order to configure event handlers, the following set of mods must be
installed and up to date in the environment:

- azure
- azure-iam
- azure-provider
- azure-monitor

When configuring event handlers, specific roles must be assigned (or created) to
ensure functionality. Review the section on
[Role access grants for Turbot Discovery](integrations/azure/import#turbot-mode)
and note the requirement of a custom role for `Read-Only` Turbot mode using
event handlers.

The target subscription must have the Microsoft Insights as a registered
provider for events to flow properly.

## Configuring the Turbot Resource Group

Azure resources must be created in a Resource Group. Turbot can create a default
resource group, `turbot_rg`, by configuring the policy
`Azure > Turbot > Resource Group` to `Enforce: Configured`. Depending on
organization requirements, this Resource Group can also be manually created.
Please contact Turbot support if manual creation of the turbot_rg is desired.

Example Terraform to create and set the `Azure > Turbot > Resource Group`
policy:

```hcl
# Create the Resource Group and set the policy
# Azure > Turbot > Resource Group
resource "turbot_policy_setting" "turbotResourceGroup" {
  resource          = id of your folder       // highlight-line
  type              = "tmod:@turbot/azure#/policy/types/turbotResourceGroup"
  value             = "Enforce: Configured"
}
```

## Configuring Event Handlers

To set up Azure Event Handlers in the default configuration, simply set the
`Azure > Turbot > Event Handlers` policy to `Enforce: Configured`.

Example Terraform to create and set the `Azure > Turbot > Event Handlers`
policy:

```hcl
# Create Event through Event Handler
# Azure > Turbot > Event Handlers
resource "turbot_policy_setting" "eventHandlers" {
  resource    = "id of parent folder or smart folder"   //highlight-line
  type            = "tmod:@turbot/azure#/policy/types/eventHandlers"
  value           = "Enforce: Configured"
}

```

The default configuration is sufficient for most cases, though you can use the
`Azure > Turbot Event Handlers > * ` sub-policies to customize the configuration
to meet your requirements.

Verify the state of `Azure > Turbot > Event Handlers` controls for each region.

After a few minutes, all controls should be in the **OK** state. If there are
any in error or alarm, they should be investigated to ensure that Event Handling
is working correctly. Contact Turbot support if issues continue to persist.
