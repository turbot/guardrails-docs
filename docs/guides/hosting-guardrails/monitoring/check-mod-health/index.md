---
title: How to check Turbot Mod Health
sidebar_label: How to check Turbot Mod Health
---

# How to check Turbot Mod Health

In this guide, you will:
- Use Guardrails console to check the health of a installed mod.

A Mod in Guardrails is a collection of Resource, Policy, and Control types associated with a specific cloud platform service. Installing a Mod (e.g., azure-iam) deploys Controls and initiates the discovery process for all Resource types defined within the Mod. For the Mod’s functionalities and features to work as intended, its health must be in an OK state. Addressing any Mod installation errors promptly is essential to maintain its proper functionality.

## Prerequisites

- **Turbot/Admin** permissions at the Turbot resource level.
- Familiarity with Guardrails console.

## Step 1: Login to Guardrails Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/monitoring/check-mod-health/guardrails-console-login.png)

## Step 2: Navigate to Mods

Choose **Admin** from the top right corner.

![Navigate to Reports](/images/docs/guardrails/guides/hosting-guardrails/monitoring/check-mod-health/guardrails-navigate-to-reports.png)

Select **Mods**.

![Mods](/images/docs/guardrails/guides/hosting-guardrails/monitoring/check-mod-health/guardrails-navigate-mods.png)

## Step 3: Select Mod

From the mods list, select the desired mod—for example, the azure-iam mod.

![Select Mod](/images/docs/guardrails/guides/hosting-guardrails/monitoring/check-mod-health/guardrails-select-mod.png)

## Step 3: Check Mod Health

In the **Overview** tab of the mod page, a healthy Mod is indicated by an OK status with the message "Mod is healthy."

> [!NOTE] Mod health is determined by its Installed Control Types. If any installed control type is in an error state, the Mod will be marked as unhealthy with an Error status.

![Mod Overview](/images/docs/guardrails/guides/hosting-guardrails/monitoring/check-mod-health/guardrails-mod-overview.png)

Alternatively, click on the message to navigate to the Mod Health control and verify its status.

![Mod Health Page](/images/docs/guardrails/guides/hosting-guardrails/monitoring/check-mod-health/guardrails-mod-health.png)

If you encounter any issues, please [Open Support Ticket](https://support.turbot.com) and attach the relevant information to assist you more efficiently.

- A screenshot of the Guardrails mod health in error.