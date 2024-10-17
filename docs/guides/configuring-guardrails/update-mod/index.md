---
title: Update Mods
sidebar_label: Update Mods
---

# Update A Mod

In this guide, you will:
- Update a mod in the Guardrails workspace using the Guardrails UI.
- Monitor and troubleshoot the mod update process.

Guardrails is designed to enable organizations to selectively install policies, controls, and guardrails tailored to specific services. This collection of Guardrails resources is known as a [Mod](https://hub.guardrails.turbot.com/#mods). Guardrails' published Mods are typically focused on a particular service within a specific cloud provider.

## Prerequisites

- **Turbot/Owner** permissions at the Turbot resource level.
- Familiarity with Guardrails console.

## Step 1: Login to Guardrails Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/update-mod/guardrails-console-login.png)

## Step 2: Navigate to Mods

Choose **Admin** from the top right corner.

![Navigate To Admin](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/update-mod/guardrails-navigate-admin-panel.png)

Select the **Mods** tab.

![Mods](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/update-mod/guardrails-navigate-mods.png)

## Step 3: Find Mod

From the **Mods** page, search the mod to be updated. The availability of an update is typically indicated by the `UPDATE AVAILABLE` Status.

![Mod Search](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/update-mod/guardrails-mod-search.png)

## Step 4: Update Mod

Select the mod and choose **Update**.

![Select Update](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/update-mod/guardrails-select-update.png)

Select the version to update, with the latest version recommended. choose **Update Mod**.

![Update Mod Action](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/update-mod/guardrails-update-mod-action.png)

## Step 5: Review

- [ ] The Updated mod appears in the list with the latest version and indicated by the `LATEST` Status.

![Mod Update Latest](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/update-mod/guardrails-update-latest.png)

- [ ] Select the mod and verify that the health is in an **OK** state, indicating the mod is healthy.

![Mod Health OK](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/update-mod/guardrails-mod-health-ok.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Turbot Guardrails Enterprise - Architecture](/guardrails/docs/enterprise/architecture).
- Learn about [Installing a Mod](/guardrails/docs/guides/hosting-guardrails/installation/install-mod#install-mod).

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Mod Dependency               | If the mod installation fails due the dependent/parent mod not installed.                                           | [Troubleshoot Mod Peer Dependency Error](/guardrails/docs/guides/hosting-guardrails/troubleshooting/peer-mod-dependency-error#peer-mod-dependency-error)                            |
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |