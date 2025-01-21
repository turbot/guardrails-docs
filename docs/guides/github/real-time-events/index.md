---
title: Real-Time Events
sidebar_label: Real-Time Events
---

# Configuring Real-Time Event Handlers

CHANGES TODO

Turbot Guardrails Event Handlers for Github are responsible for conveying events from Github back to Guardrails for processing.
Event Handlers are required for Guardrails to process and respond in real-time.

The event handlers infrastructure is configured by `GitHub > Organization > Event Handlers` control in each organization.
This control will configure the required infrastructure components:

- **Webhook**: A webhook that filters events and sends them to Guardrails

## What Permissions to Grant

To ensure full functionality of the GitHub integration, we recommend granting the following permissions:

| **Permission**        | **Access Level** | **Description**                                                                                |
| --------------------- | ---------------- | ---------------------------------------------------------------------------------------------- |
| Organization Webhooks | Read and write   | Allows Guardrails to manage webhooks for capturing real-time events at the organization level. |

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

### Enabling Event Handlers

To configure the GitHub Event Handlers using the default configuration, set the following policies:

- Set [GitHub > Organization > Event Handlers](https://turbot.com/guardrails/docs/mods/github/github/policy#github--organization--event-handlers) to **Enforce: Configured**.

## Decommissioning Event Handlers

Event handlers can be shut-off by setting:

- Set [GitHub > Organization > Event Handlers](https://turbot.com/guardrails/docs/mods/github/github/policy#github--organization--event-handlers) to **Enforce: Not configured**.

## When to decommission Event Handlers

Event Handlers should be decommissioned before:

- Destroying the Github organization itself.
- Removing the organization from Guardrails supervision.
- Event Handling is no longer desired for this organization.
