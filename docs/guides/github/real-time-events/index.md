---
title: Real-Time Events
sidebar_label: Real-Time Events
---

# Configuring Real-Time Event Handlers

CHANGES TODO

Turbot Guardrails Event Handlers for GCP are responsible for conveying events from GCP
Logging back to Guardrails for processing. Event Handlers are required for Guardrails to
process and respond in real-time. However, if your organization has more complex
requirements that forbid the use of event handlers then [**Event Pollers**](./poller) can be used. Event Handlers and
Event Pollers enable the Guardrails **Event-driven model** of operation.

The event handlers infrastructure is configured by Guardrails Stacks in each
project. These stacks will configure the required infrastructure components:

- **Logging**: A logging sink that filters api event messages and publishes them
  to a topic
- **Pub/Sub Topic**: A pub/sub topic where the logging sink publishes events
- **Pub/Sub Subscription**: A pub/sub subscription that forwards the events back
  to Guardrails for processing
- **Pub/Sub Topic IAM Policy**: An IAM policy on the pub/sub topic to allow

## Guardrails Mods Required for Event Handling

In order to configure real time eventing, the following set of mods must be
installed and up to date in the environment:

- [gcp](https://turbot.com/guardrails/docs/mods/gcp/gcp#turbotgcp)
- [gcp-iam](https://turbot.com/guardrails/docs/mods/gcp/gcp-iam#turbotgcp-iam)
- [gcp-logging](https://turbot.com/guardrails/docs/mods/gcp/gcp-logging#turbotgcp-logging)
- [gcp-pubsub](https://turbot.com/guardrails/docs/mods/gcp/gcp-pubsub#turbotgcp-pubsub)

---

### Email whitelisting and domain verification

GCP no longer requires domain verification for Pub/Sub subscriptions. Existing
domain verification DNS records have no effect.

---

## Enabling the Required APIs

Before configuring GCP Event Handlers, you must enable the Pub/Sub and Logging
APIs. You can do this by

- Setting the below policies to `Enforce: Enabled` so Guardrails will enable the
  APIs automatically
- Manually enabling the APIs in the project. If the Guardrails service role doesn't
  have permissions to enable an API, they will need to be enabled some other
  way.

* [GCP > Pub/Sub > API Enabled](https://turbot.com/guardrails/docs/mods/gcp/gcp-pubsub/policy#gcp--pubsub--api-enabled)
* [GCP > Logging > API Enabled](https://turbot.com/guardrails/docs/mods/gcp/gcp-logging/policy#gcp--logging--api-enabled)

These policies can also be set using Terraform:

```hcl
# Sets the policy Enable for API Enabled in Pub/Sub
# GCP > Pub/Sub > API Enabled
resource "turbot_policy_setting" "pubsubApiEnabled" {
  resource = "id of parent folder or policy pack"   //highlight-line
  type     = "tmod:@turbot/gcp-pubsub#/policy/types/pubsubApiEnabled"
  value    = "Enforce: Enabled"
}

# Sets the policy Enable for API Enabled in Logging
# GCP > Logging > API Enabled
resource "turbot_policy_setting" "loggingApiEnabled" {
  resource = "id of parent folder or policy pack"   //highlight-line
  type     = "tmod:@turbot/gcp-logging#/policy/types/loggingApiEnabled"
  value    = "Enforce: Enabled"
}
```

---

## Configuring the Event Handlers

### Workspace Configuration

Here are the **Turbot > Workspace** policies relevant to event handling for SaaS
and Enterprise customers. If desired, these policies should be configured before
enabling event handling. Changes to these policies should be done with care as this may force a
refresh of all Event Handling infrastructure in the workspace.

- [Turbot > Workspace > Webhook Secrets > Rotation](/guardrails/docs/mods/turbot/turbot/policy#turbot--workspace--webhook-secrets--rotation) -
  Instructs Guardrails to regularly rotate the secrets used to sign the JWTs.
- [Turbot > Workspace > Webhook Secrets > Expiration Period](/guardrails/docs/mods/turbot/turbot/policy#turbot--workspace--webhook-secrets--expiration-period) -
  Specifies the interval for secret rotation. Turbot Support recommends secret rotation
  at least once a year.
- [Turbot > Workspace > Webhook Secrets](/guardrails/docs/mods/turbot/turbot/policy#turbot--workspace--webhook-secrets) -
  Use this policy only when there is a requirement for specific secrets to be
  used. Otherwise, the default setting will auto-generate new secrets as
  required.

#### Enterprise Specific Policies

- [Turbot > Workspace > Gateway Domain Name](/guardrails/docs/mods/turbot/turbot/policy#turbot--workspace--gateway-domain-name)
  Used by enterprise customers with private Guardrails consoles.
  [Instructions below](#enterprise-api-gw-configuration) Guardrails SaaS customer should not set this policy.

### Enterprise API GW Configuration

For enterprises with a private Guardrails console, an API gateway must be used. The
hostname of the API Gateway must be specified in the
[Turbot > Workspace > Gateway Domain Name](/guardrails/docs/mods/turbot/turbot/policy#turbot--workspace--gateway-domain-name)
policy. Typically, the domain name will be `gateway.{installation_domain_name}`.
(The installation domain name is taken from the value specified in the Turbot Guardrails
Enterprise Foundation (TEF) stack.)

However, some enterprise environments cannot use
`gateway.{installation_domain_name}`, usually because of DNS resolution
complexity or enterprise policy. A viable option is to use the AWS API Gateway
domain name instead, since it is always publicly resolvable. Follow these steps
to retrieve the appropriate hostname then set it in your Guardrails console:

1. In the Turbot Guardrails Master's account, go to the AWS API Gateway console. Find the
   Guardrails API Gateway (by default identified as `turbot`).
2. Go to APIs. Click into `turbot-api` or `{resource_prefix}-api`. Click into
   Stages then click the `turbot` stage.
3. From the top of the `turbot` stage page, grab the "Invoke URL". It will be in
   the form of `https://{uniqueId}.execute-api.{region}.amazonaws.com/turbot`.
   The `/turbot` path is required. Do not add a `/` after `/turbot`. Strip off
   `https://`
4. Copy the stage URL to the Gateway Domain Name policy. It should be in this
   form: `{uniqueId}.execute-api.{region}.amazonaws.com/turbot`
5. If Event Handling has been enabled, let the event handler source policies
   recalculate then Event Handler control run again. Otherwise, complete the
   steps outlined in the rest of this document then return to this procedure.
6. Examine the Pub/Sub Subscription in the GCP Event Handler control logs to
   make sure it confirmed properly.

### Enabling Event Handlers

After the Pub/Sub and Logging APIs have been enabled, event handling
infrastructure needs to be deployed. To configure the GCP Event Handlers using
the default configuration, set the following policies:

- Set
  [GCP > Turbot > Event Handlers > PubSub](https://turbot.com/guardrails/docs/mods/gcp/gcp/policy#gcp--turbot--event-handlers--pubsub)
  to **Enforce: Configured**.
- Set
  [GCP > Turbot > Event Handlers > Logging](https://turbot.com/guardrails/docs/mods/gcp/gcp/policy#gcp--turbot--event-handlers--logging)
  to **Enforce: Configured**.

Note: The Logging stack depends on the Pub/Sub Topic and Subscription. It will
go into error until the Pub/Subs resources are present.

These policies can also be set using Terraform:

```hcl
### Setting up the PubSub Event Handlers stacks
# Sets the policy for Pub/Sub
# GCP > Turbot > Event Handlers > Pub/Sub
resource "turbot_policy_setting" "eventHandlersPubSub" {
  resource = "id of parent folder or policy pack"   //highlight-line
  type     = "tmod:@turbot/gcp#/policy/types/eventHandlersPubSub"
  value    = "Enforce: Configured"
}
# Sets the policy for Logging
# GCP > Turbot > Event Handlers > Logging
resource "turbot_policy_setting" "eventHandlersLogging" {
  resource = "id of parent folder or policy pack"   //highlight-line
  type     = "tmod:@turbot/gcp#/policy/types/eventHandlersLogging"
  value    = "Enforce: Configured"
}
```

After setting the policies, the Event Handlers stacks will begin running in all
projects defined in the scope. You can verify the state of these controls by
browsing by Control Category and filtering by `GCP > Turbot > Event Handlers`.

Alternatively, you can query the state via graphQL:

```graphql
{
    controls(
        filter: "resource:your-project-name-or-id controlType:tmod:@turbot/gcp#/control/types/eventHandlers"
    ) {
        items {
            state
            type {
                turbot {
                    title
                }
            }
            resource {
                turbot {
                    title
                }
            }
        }
    }
}
```

or via the Turbot Guardrails CLI:

```bash
TURBOT_QUERY_OUTPUT="{
    items {
      state
      type {
        turbot {
          title
        }
      }
      resource {
        turbot {
          title
        }
      }
    }
}"

turbot graphql controls --filter "controlType:tmod:@turbot/gcp#/control/types/eventHandlers"  --output "$TURBOT_QUERY_OUTPUT"
```

After a few minutes, all controls should be in the **OK** state. If there are
any in error, they should be investigated. Any questions can be directed to
[Turbot Support](mailto:help@turbot.com)

## Decomissioning Event Handlers

Event handlers can be shut-off by setting:

- [GCP > Turbot > Event Handlers > PubSub](https://turbot.com/guardrails/docs/mods/gcp/gcp/policy#gcp--turbot--event-handlers--pubsub)
  to **Enforce: Configured**
- [GCP > Turbot > Event Handlers > Logging](https://turbot.com/guardrails/docs/mods/gcp/gcp/policy#gcp--turbot--event-handlers--logging)
  to **Enforce: Configured**. Turbot will perform the required Terraform runs to
  destroy the event handler infrastructure. **Note:** Deleting an GCP project
  out of a Guardrails workspace will not automatically decommission the event handlers. Event
  Handlers must be set explicitly destroyed before removing the project from
  a Guardrails workspace.

## When to decommission Event Handlers

Event Handlers should be decommissioned before:

- Destroying the GCP project itself
- Removing the account from Guardrails supervision.
- Switching to GCP Event Pollers. Processing of duplicate events is highly
  undesirable.
- Event Handling is no longer desired for this project.

## Relationship to AWS Event Pollers

Note that
[GCP Event Pollers](https://turbot.com/guardrails/docs/mods/gcp/gcp/policy#gcp--turbot--event-poller)
operate based on the value of
[GCP > Turbot > Event Handler](https://turbot.com/guardrails/docs/mods/gcp/gcp/policy#gcp--turbot--event-handlers)
policy setting, not on the state of the Event Handler controls themselves. By
default, Event Handling is disabled so the event pollers run automatically.
After Event Handling is enabled, the event pollers will stop running.

### Event Handlers in Error

It is possible for the event handler controls to be in an **error** state
because of incorrect configuration, permissions issues, etc. With event handling
enabled, the event pollers won't run. Until these problems are resolved, events
from the environment may be lost. Resolve problems with event handlers as
quickly as possible.

### Duplicate Events

It is also possible to get duplicate events if Event Pollers are explicitly
enabled along with Event Handlers. **Event Handlers and Event Pollers should
never be enabled at the same time.**

### Troubleshooting

The best source of troubleshooting information is in the **GCP > Turbot > Event
Handlers > Pub/Sub** and **GCP > Turbot > Event Handlers > Logging** control
logs for the project.

- Permissions Issues: If the permissions granted to the Guardrails service account
  do not allow configuration of Logging and Pub/Sub resources, then the control
  logs will indicate access denied.
- Pub/Sub Subscription won't confirm: Check the various **Turbot > Workspace**
  policies that they are properly configured. Ensure that resources in the
  Turbot Guardrails Master VPC can resolve the ALB's hostname.

### Verify

Congrats! Event handlers are now configured in the target account. To verify
that they are working correctly, create a new resource or change an existing
resource. Guardrails will receive the event which will trigger relevant controls. If
resource creation or modification events do not get picked up by Guardrails, feel
free to reach out to [Turbot Support](mailto:help@turbot.com)

## How Event Handlers Work

When troubleshooting events handlers, it helps to know how they work. This
section will describe the Guardrails and AWS halves of event handlers.

### Guardrails Policies and Stacks

Guardrails uses Terraform to deploy the various pieces of GCP event handling
infrastructure. The Terraform source that defines all event handling
infrastructure is compiled from several sources. They are:

- **Workspace configuration policies**: These policies specify information like
  the HTTPS endpoint that event handlers should point to, or the webhook secrets
  that should be sent with each event.
- **Event Handler configuration policies**: Enable event handlers. Specify
  resource prefixes for Pub/Sub topics, and Logging Sink. Any policy in "GCP >
  Turbot > Event Handler > \*"
- **Installed mods**: Guardrails will interrogate the list of mods then build a
  Logging Sink filter to capture the relevant events. See the Mods tab on the
  Admin page for a full list of installed mods.

All of these input sources are brought together in the read-only
`GCP > Turbot > Event Handlers > Pub/Sub > Source` and
`GCP > Turbot > Event Handlers > Logging > Source` policy values. Looking at the
"Depends On" tab of the `[Pub/Sub, Logging] > Source` policy values shows all
the dependent policies and values. Errors in any of these policies may prevent
event handlers from deploying or updating properly. The value of
`GCP > Turbot > Event Handlers > Pub/Sub > Source` and
`GCP > Turbot > Event Handlers > Logging > Source` is Terraform.

### GCP Resources (Logging through to Guardrails Events Container)

Events in a GCP Project pass through several services on their way to Guardrails.
The path is:

1. **Logging service**: User events originate here
2. **Logging Sink**: Events are directed to the Pub/Sub Topic by the Logging
   Sink
3. **Pub/Sub Topic**: Provides a data path between the Logging Sink and the
   Subscription
4. **Pub/Sub Subscription**: Responsible for making the HTTP call to pass event
   data back to Guardrails event ingestion endpoint.
5. (optional) API Gateway and Events Proxy: Some enterprise customers with
   private ALBs will deploy an API Gateway to make the transition from a public
   API endpoint to a private ALB. The Events Proxy Lambda function passes an
   event from the non-VPC API gateway to the VPC bound ALB. Guardrails SaaS
   customers do not have this step.
6. **Guardrails ALB**: The common entry point for events and API calls.
7. **Guardrails Events Container**: Events are processed here, triggering CMDB
   updates, or control runs.
