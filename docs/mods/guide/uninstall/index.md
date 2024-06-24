---
title: Uninstalling Mods
sidebar_label: Uninstalling Mods
---

# Uninstalling Mods

Mods may be uninstalled from the **Mods** tab on the **Turbot** resource.

<div className="alert alert-warning">
While this may occasionally be necessary, uninstalling a mod is potentially destructive operation – All items related to the mod will be removed, including resources, controls, permissions,and policy settings!
</div>

## Uninstall Mod via Guardrails Console

1. Navigate to the **Admin** page by clicking the gear icon in the top right
   after logging in.

2. Click the **Mods** tab, then search for the mod to uninstall.

3. Either click the `X` icon on the mod tile (far right) or click the mod name
   then select **Uninstall** in the top right.

4. Uninstalling is a serious operation with destructive consequences - you must
   confirm the deletion by entering the mod name in the dialog. Read the
   warning, and if you wish to uninstall the mod, type the full name in the text
   box.

5. After clicking the **Uninstall** button, the mod will be uninstalled and
   removed from the list.

## Uninstall Mod via Terraform

To uninstall a mod via Terraform, simply remove the definition from the
configuration file. `Terraform apply` will automatically uninstall the mod.

## Troubleshooting Mod Removal

If removing a mod times out, follow the troubleshooting instructions for mod
removal in [large environments](mods/guide/troubleshooting#mod-removal-process).
