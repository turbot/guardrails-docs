---
title: Install Mod
sidebar_label: Install Mod
---

# Install Mod

In this runbook, you will:
- Install mods in a Guardrails environment

Guardrails is designed to enable organizations to selectively install policies, controls, and guardrails tailored to specific services. This collection of Guardrails resources is known as a Mod. Guardrails' published Mods are typically focused on a particular service within a specific cloud provider.

## Prerequisites

- Turbot/Owner permissions at the Turbot resource level.
- Familiarity with Guardrails console

## Step 1: Access Guardrails Console

Log into the Guardrails console and click the gear icon to access the admin console.

![Guardrails Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/mod-install/mod-install-guardrails-console.png)

## Step 2: Select Mods

Click on the **Mods** tab.

![Mods Tab](/images/docs/guardrails/runbooks/enterprise-install/mod-install/mod-install-mods-tab.png)

## Step 3: Install Mod

Click **Install Mod** to launch the Install Mod dialog. Search or filter for the desired mod, select it, and click Install Mod.

![Install Dialog Box](/images/docs/guardrails/runbooks/enterprise-install/mod-install/mod-install-dialog-box.png)

## Step 4: Review

You have successfully installed a mod in the Guardrails environment. Now you can monitor the installation for any issues and document any anomalies.

- [ ] The mod will appear in the list with the installed version indicated with a green checkmark.

![Mod Install Confirmation](/images/docs/guardrails/runbooks/enterprise-install/mod-install/mod-install-confirmation.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Mod Dependencies](https://turbot.com/guardrails/docs/mods#mod-dependencies).
- Learn about [Mod Troubleshooting](https://turbot.com/guardrails/docs/mods/guide/troubleshooting).

## Troubleshooting

### Mod Installation Fails

- Check the `Turbot > Mod > Installed` control log for errors.
- Review the control log for mod dependencies.
