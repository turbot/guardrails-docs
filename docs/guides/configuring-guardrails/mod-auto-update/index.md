---
title: Automated Mod Updates
sidebar_label: Automated Mod Updates
---

# Automated Mod Updates

In this guide, you will:
- Setup automated mod update from the Turbot registry.

<!-- Specify if this mod should be automatically updated from the Turbot registry. The current version is checked against the Turbot > Mod > Desired Version policy, which is calculated from the Turbot > Mod > Version Range policy. -->

## Prerequisites

- **Turbot/Owner** permissions at the Turbot resource level.
- Familiarity with Guardrails console.

## Step 1: Login to Guardrails Console

Log into the Guardrails console with provided local credentials or by using any SAML based login.

![Guardrails Console Login](/images/docs/guardrails/guides/configuring-guardrails/mod-auto-update/guardrails-console-login.png)

## Step 2: Find Policy

The policy is applied at the Turbot level. Navigate to **Policies** tab, search for `Auto Update` text

![Find Auto Update Policy](/images/docs/guardrails/guides/configuring-guardrails/mod-auto-update/guardrails-console-policies-auto-update.png)

## Step 3: Setting up Policy



## Step 4: Setting up Sub-Policy




## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Turbot Guardrails Enterprise - Architecture](/guardrails/docs/enterprise/architecture).
- Learn about [Updating Mod](/guardrails/docs/enterprise/updating-stacks/mod-update).

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Mod Dependency               | If the mod installation fails due the dependent/parent mod not installed.                                           | [Troubleshoot Mod Peer Dependency Error](/guardrails/docs/guides/hosting-guardrails/troubleshooting/peer-mod-dependency-error#peer-mod-dependency-error)                            |
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |