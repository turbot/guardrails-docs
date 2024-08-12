---
title: Update Mod
sidebar_label: Update Mod
---

# Install Mods (Guardrails UI)

In this runbook, you will:
- Update mods using the Guardrails UI.

## Prerequisites

- Turbot/Owner permissions at the Turbot resource level.
- Familiarity with Guardrails console

## Step 1: Access Guardrails Console

Log into the Guardrails console and click the gear icon to access the admin console.

![Guardrails Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/update-mod/update-mod-guardrails-console.png)

## Step 2: Select Mods

Click on the **Mods** tab.

![Mods Tab](/images/docs/guardrails/runbooks/enterprise-install/update-mod/update-mod-mods-tab.png)

## Step 3: Find Mod

Search for the mod to be updated. A new mod version will be indicated by a `UPDATE AVAILABLE` status.

![Update Available](/images/docs/guardrails/runbooks/enterprise-install/update-mod/update-mod-dialog-box.png)

## Step 4: Update Mod

Select the Mod, then click `Update` at the top right corner.

![Update Mod](/images/docs/guardrails/runbooks/enterprise-install/update-mod/update-mod-select-update.png)

Select the desired version and click Update Mod.

![Update Mod](/images/docs/guardrails/runbooks/enterprise-install/update-mod/update-mod-version.png)

## Step 4: Review

You have successfully installed a mod in the Guardrails environment. Now you can monitor the update for any issues and document any anomalies.

- [ ] The mod will appear in the list reflecting the updated version indicated by a green checkmark.

![Mod Update Success](/images/docs/guardrails/runbooks/enterprise-install/update-mod/update-mod-successfull.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Mods](https://turbot.com/guardrails/docs/mods).
- Learn about [Installing Mods](https://turbot.com/guardrails/docs/mods/guide/install).

## Troubleshooting

### Mod Installation Fails

Check the `Turbot > Mod > Installed` log for any error messages. If there are any errors, create a support ticket and include relevant screenshots of the errors.
