---
title: Update Mod
sidebar_label: Update Mod
---

# Update Mods (Guardrails UI)

In this runbook, you will:
- Update mods using the Guardrails UI.

Updating mods is crucial to ensure that new features, bug fixes, and improvements are applied, maintaining optimal performance, compatibility, and security.

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

Search for the mod that needs updating. If a new version is available, it will be indicated by an `UPDATE AVAILABLE` status.

![Update Available](/images/docs/guardrails/runbooks/enterprise-install/update-mod/update-mod-dialog-box.png)

## Step 4: Update Mod

Select the Mod, then click `Update` from the top right corner.

![Update Mod](/images/docs/guardrails/runbooks/enterprise-install/update-mod/update-mod-select-update.png)

Choose the desired version and click `Update Mod`.

![Update Mod](/images/docs/guardrails/runbooks/enterprise-install/update-mod/update-mod-version.png)

## Step 4: Review

You have successfully Updated a mod in the Guardrails environment. Now you can monitor the update for any issues and document any anomalies.

- [ ] The mod will appear in the list with the updated version, indicated by a green checkmark.

![Mod Update Success](/images/docs/guardrails/runbooks/enterprise-install/update-mod/update-mod-successfull.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Mod](https://turbot.com/guardrails/docs/mods).
- Learn more about [Mod Registry](https://turbot.com/guardrails/docs/mods#guardrails-mod-registry).


## Troubleshooting

### Mod Installation Fails

- Check the `Turbot > Mod > Installed` control log for errors.
- Review the control log for newly added mod dependencies.
