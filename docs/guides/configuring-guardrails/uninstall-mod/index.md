---
title: Uninstall Mods
sidebar_label: Uninstall Mods
---

# Uninstall a Mod

In this guide, you will:
- Uninstall a mod in the Guardrails workspace using the Guardrails UI.
- Monitor and troubleshoot the mod uninstall process.

Guardrails is designed to enable organizations to selectively install policies, controls, and guardrails tailored to specific services. This collection of Guardrails resources is known as a Mod. Guardrails' published Mods are typically focused on a particular service within a specific cloud provider.

Mods may need to be uninstalled when requirements change or when there is no longer a need to monitor or enforce policies on certain resources.

## Prerequisites

- **Turbot/Owner** permissions at the Turbot resource level.
- Familiarity with Guardrails console.

## Step 1: Login to Guardrails Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/installation/uninstall-mod/guardrails-console-login.png)

## Step 2: Navigate to Mods

Choose **Admin** from the top right corner.

![Navigate To Admin](/images/docs/guardrails/guides/hosting-guardrails/installation/uninstall-mod/guardrails-navigate-admin-panel.png)

Select the **Mods** tab.

![Mods](/images/docs/guardrails/guides/hosting-guardrails/installation/uninstall-mod/guardrails-navigate-mods.png)

## Step 3: Uninstall Mod

The **Mods** page displays the list of mods that are installed in your workspace. Search and select the mod to be uninstalled.

![Mod List](/images/docs/guardrails/guides/hosting-guardrails/installation/uninstall-mod/guardrails-mod-search.png)

Select the **Uninstall** option from the top right.

![Uninstall Mod](/images/docs/guardrails/guides/hosting-guardrails/installation/uninstall-mod/guardrails-select-uninstall.png)

Enter the mod name to confirm and select **Uninstall**.

![Confirm Uninstall](/images/docs/guardrails/guides/hosting-guardrails/installation/uninstall-mod/guardrails-uninstall-confirm.png)

## Step 4: Review

- [ ] Verify the mod is no longer listed among the installed mods.

![Control Type](/images/docs/guardrails/guides/hosting-guardrails/installation/uninstall-mod/guardrails-uninstall-verify.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Turbot Guardrails Enterprise - Architecture](/guardrails/docs/enterprise/architecture).
- Learn about [Updating Mod](/guardrails/docs/enterprise/updating-stacks/mod-update).

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |