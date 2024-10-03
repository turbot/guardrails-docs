---
title: Peer Mod Dependency Error
sidebar_label: Peer Mod Dependency Error
---

# Peer Mod Dependency Error

In this guide, you will:
- Use Turbot Guardrails console to troubleshoot mod dependency errors encountered while installing a mod.

When installing Mods, you may encounter an issue where a mod is dependent on another mod that is either not installed or unavailable, leading to the installation being in an error state.

## Prerequisites

- **Turbot/Owner** permissions at the Turbot resource level.
- Familiarity with Guardrails console.

## Step 1: Login to Guardrails Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/dependent-mod-unavailable/guardrails-console-login.png)

## Step 2: Navigate to Mods

Choose **Admin** from the top right corner.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/dependent-mod-unavailable/guardrails-navigate-admin-panel.png)

Select **Mods**.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/dependent-mod-unavailable/guardrails-navigate-mods.png)

## Step 3: Search Mod

Search for the installed mod that is in an error state.

![Mod Search](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/dependent-mod-unavailable/mod-search.png)

Select the mod and navigate to **Turbot > Mod > Installed** control.

![Select Mod](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/dependent-mod-unavailable/guardrails-navigate-mods-installed.png)

## Step 4: Verify Missing Mod

Verify the missing mod by reviewing the displayed error message.

![Verify Missing Mod](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/dependent-mod-unavailable/guardrails-verify-missing-mod-error.png)

## Step 5: Install Dependent Mod

Install the required mod.

![Install Mod](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/dependent-mod-unavailable/gurdrails-install-missing-mod.png)

## Step 5: Run Control

Select **Run control** from the **Actions** dropdown and re-run the mod installed control.

![Run Mod Installed](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/dependent-mod-unavailable/guardrails-re-run-control.png)

## Step 6: Verify

The mod control moves to an **OK** state, indicating a successful mod installation.

![Install Success](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/dependent-mod-unavailable/guardrails-mod-install-success.png)

If you encounter any further issues, please [Open Support Ticket](https://support.turbot.com) and attach the relevant information to assist you more efficiently.

- A screenshot of the mod peer dependency error.
- A screenshot of the installed mods.