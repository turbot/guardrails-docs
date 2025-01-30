---
title: How to check Turbot Mod Health
sidebar_label: How to check Turbot Mod Health
---

# How to check Turbot Mod Health

In this guide, you will:
- Use Guardrails console to check the health of a installed mod.

A [Mod](https://turbot.com/guardrails/docs/reference/glossary#mod) in Guardrails is a collection of Resource, Policy, and Control types associated with a specific cloud platform service. [Installing a Mod](https://turbot.com/guardrails/docs/guides/configuring-guardrails/install-mod) (e.g., azure-iam) deploys Controls and initiates the discovery process for all Resource types defined within the Mod. For the Mod’s functionalities and features to work as intended, its health must be in an OK state. Addressing any Mod installation errors promptly is essential to maintain its proper functionality.

## Prerequisites

- **Turbot/Admin** permissions at the Turbot resource level.
- Familiarity with Guardrails console.

## Step 1: Login to Guardrails Console

Log into the Guardrails console with provided local credentials or by using any SAML based login.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/monitoring/check-mod-health/guardrails-console-login.png)

## Step 2: Navigate to Mods

Select **Admin** from the top right corner. Choose **Mods**.

![Mods](/images/docs/guardrails/guides/hosting-guardrails/monitoring/check-mod-health/guardrails-navigate-mods.png)

## Step 3: Select Mod

From the mods list, select the desired mod—for example, the `azure-iam` mod.

![Select Mod](/images/docs/guardrails/guides/hosting-guardrails/monitoring/check-mod-health/guardrails-select-mod.png)

## Step 3: Check Mod Health

In the **Overview** tab of the mod page, a healthy Mod is indicated by an OK status with the message `Mod is healthy`.

> [!NOTE]
> The health of a mod is determined by its **Installed Control Types**. If any installed control type is in an error state, the mod will be marked as unhealthy and display an **Error** status.

![Mod Overview](/images/docs/guardrails/guides/hosting-guardrails/monitoring/check-mod-health/guardrails-mod-overview.png)

Alternatively, click on the message to navigate to the Mod Health control and verify its status.

![Mod Health Page](/images/docs/guardrails/guides/hosting-guardrails/monitoring/check-mod-health/guardrails-mod-health.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn how to [Diagnose Control Errors](https://turbot.com/guardrails/docs/guides/hosting-guardrails/monitoring/diagnose-control-error).
- Learn how to [Investigate an Event Flood](https://turbot.com/guardrails/docs/guides/hosting-guardrails/monitoring/investigate-event-flood).

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |
