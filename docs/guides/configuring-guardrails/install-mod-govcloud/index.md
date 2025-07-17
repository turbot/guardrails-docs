---
title: Install Mod in GovCloud
sidebar_label: Install Mod in GovCloud
---

# Install a Mod in AWS GovCloud

In this guide, you will:
- Install a mod in an AWS GovCloud Guardrails workspace using the CLI.
- Validate successful installation using the Guardrails UI.

Guardrails supports installing [Mods](/guardrails/docs/reference/glossary#mod) in Government Cloud environments via [Guardrails CLI](https://turbot.com/guardrails/docs/reference/cli), especially where UI-based interactions are limited or unavailable. This method is suitable for environments requiring secure or scripted installation workflows.

Prerequisites
- Access to the main bastion host in the GovCloud production environment.
- [Turbot CLI installed and configured](https://turbot.com/guardrails/docs/reference/cli/installation) with appropriate credentials.
- Valid **Turbot/Owner** permissions in the target Guardrails [workspace](https://turbot.com/guardrails/docs/reference/glossary#workspace).
- Necessary permissions to download mods from **guardrails.turbot.com**

## Step 1: Connect to Bastion

Log into the AWS account associated with your GovCloud production environment and connect to the main bastion host.

![Bastion Host](./aws-connect-bastion-host.png)

## Step 2: Navigate to the Target Directory

Navigate to your desired directory for downloading the mod package, for example: `cd /turbot/mods`

## Step 3: Download Mod

Download the desired mod package using this Guardrails CLI command. This fetches the specified mod from the Guardrails registry, e.g., @turbot/aws-iam.

```
turbot download @turbot/aws-iam
```

![Download Mod](./aws-download-mod.png)

## Step 4: Install Mod to Workspace

Upload and install the downloaded mod into your target workspace by executing the command below with the appropriate CLI profile.

```
turbot up --zip-file turbot_aws-iam --profile <profile-name>
```

![Install Mod](./aws-install-mod.png)

## Step 5: Review Installation

- [ ] Verify successful installation by checking the Guardrails UI after approximately 20 minutes. Ensure the mod appears under **Admin > Mods**, the version matches the one uploaded (e.g., 5.43.x), and the mod status displays a green checkmark.

![Review Mod Installation](./guardrails-verify-installation.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Turbot Guardrails Enterprise - Architecture](/guardrails/docs/enterprise/architecture).
- Learn about [Updating Mod](/guardrails/docs/enterprise/updating-stacks/mod-update).

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Mod Dependency               | If the mod installation fails due the dependent/parent mod not installed.                                           | [Troubleshoot Mod Peer Dependency Error](/guardrails/docs/guides/hosting-guardrails/troubleshooting/peer-mod-dependency-error#peer-mod-dependency-error)                            |
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |