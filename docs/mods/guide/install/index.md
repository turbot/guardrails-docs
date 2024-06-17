---
title: Installing Mods
sidebar_label: Installing Mods
---

# Installing Mods

By definition, mods are installed with the top Turbot resource as the parent.
This means that administrators must be at the Turbot resource level with
`Turbot/Owner` permissions to make modifications, installing, uninstalling, or
updating, to mods in the environment.

Customers with large AWS environments (>100 accounts) should account for AWS
Event Handler churn as described in the
[Mod Installation in Large Environments](mods/guide/troubleshooting#new-mod-installation-process)
instructions.

## Install Mod via Guardrails Console

1. Log into the console. If the user profile has sufficient permissions
   assigned, a gear icon signalling the Admin page is in the top right. Select
   that.

2. Click on the **Mods** tab.

3. Click the **Install Mod** button to launch the Install Mod dialog.

4. Browse to the mod (or search), select it, and then click the **Install Mod**
   button at the bottom of the window.

5. At this point, Guardrails has launched the **Mod Installed** control to pull the
   mod from the registry and complete the installation. The mod will appear in
   the list, but the status icon may appear as a question mark, noting that the
   mod is not yet installed. Once the mod has finished installing, the status
   icon will change to a green check.

6. If desired, the mod name can be clicked to load the mod page, which has
   information regarding dependent controls, upgrade history, and dependencies.

## Install Mod via Terraform

The Terraform resource
[`turbot_mod`](https://www.terraform.io/docs/providers/turbot/r/mod.html) makes
it easy for organizations to install, uninstall, and update a large number of
mods across an environment.

### Example Terraform code

To use the latest version of the mod:

```hcl
resource "turbot_mod" "aws-s3" {
  parent    = "tmod:@turbot/turbot#/"
  org       = "turbot"
  mod       = "aws-s3"
}
```

To install a pinned mod version:

```hcl
resource "turbot_mod" "aws-s3" {
  parent    = "tmod:@turbot/turbot#/"
  org       = "turbot"
  mod       = "aws-s3"
  version   = "5.5.2"
}
```

If using pinned mod versions, be sure that Mod Auto-update is not enabled.

### Notes on Mod Management by Terraform

- Mod installation is a three stage process.
    1. Install the mod.
    2. Run `Type Installed` controls.
    3. Run `Discovery` and `CMDB` controls in the mod.
  
  Terraform is only involved in and aware of step 1.
- Mod removal requires everything related to the mod to be removed within the
  HTTP timeout. This includes all resources, resource history, policy settings,
  controls, controls history and Type Installed controls. For mods with
  significant numbers of resources, timeout may occur. Refer to the
  [Mod Removal Process](mods/guide/troubleshooting#mod-removal-process) instructions to
  minimize the scope of change for mod removal.
- Terraform typically runs with `-parallelism=10` by default. Running with
  `-parallelism=1` for mod installation minimizes the situation where a large
  number of mods are all trying to do Discovery at the same time.
- Terraform has no concept of mod dependencies. For example, Terraform doesn't
  know that the `azure-iam` mod depends on the `azure` mod. This information
  must be encoded into the Terraform file. Guardrails will install a mod with unmet
  dependencies but the mod will go into an `error` state and be non-functional
  until all dependencies are met.
- Terraform doesn't account for the DB load induced by the Discovery and CMDB
  controls that start immediately after mod installation. High DB load may cause
  the mod installation API calls to timeout, resulting in errors in Terraform.
  The load induced by Discovery is directly proportional to the number of
  accounts/subs/projects where Discovery runs plus the number of resources
  discovered. Larger numbers of resources will induce load for longer.

Check out Guardrails' [Terraform Setup Guide](reference/terraform/setup) for
configuration instructions. Documentation for the Turbot Guardrails provider can be found
on the official
[Terraform reference page](https://www.terraform.io/docs/providers/turbot/index.html).
Information regarding various Guardrails provider resources and data sources can
also be found at that link.

## Install Mod via CLI

Installing mods via the CLI requires
[installing and configuring](reference/cli/installation) the Guardrails CLI.

Utilizing the [`install`](reference/cli/commands/install) command, it is trivial
to install any desired mod. For example, going back to the `aws-s3` mod, the CLI
command becomes:

```bash
turbot install @turbot/aws-s3
```

Syntax will be similar across other mod types, such as @turbot/aws-sns,
@turbot/gcp, etc.
