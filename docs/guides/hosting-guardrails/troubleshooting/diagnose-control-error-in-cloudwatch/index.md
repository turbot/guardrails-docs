---
title: How to Diagnose Control Error in CloudWatch Log Groups
sidebar_label: How to Diagnose Control Error in CloudWatch Log Groups
---

# How to Diagnose Control/Policy Error in CloudWatch Log Groups

In this guide, you will:
- Use Guardrails console and AWS Cloudwatch to Diagnose the control error.

When troubleshooting error messages in the Guardrails Console, control logs typically provide sufficient information to identify the root cause. However, in some cases, additional details may be needed for a more thorough diagnosis, which can be retrieved from the AWS CloudWatch log groups.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level and access to the Guardrails AWS account.
- Familiarity with Guardrails console and AWS CloudWatch service.

## Step 1: Login to Guardrails Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/peer-mod-dependency-error/guardrails-console-login.png)

## Step 2: Navigate to Mods

Navigate to the control in an Error state.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/peer-mod-dependency-error/guardrails-navigate-admin-panel.png)

Select the **Mods** tab.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/peer-mod-dependency-error/guardrails-navigate-mods.png)

## Step 3: Search Mod

Search for the installed mod that is in an error state.

![Mod Search](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/peer-mod-dependency-error/mod-search.png)

Select the mod and navigate to **Turbot > Mod > Installed** control.

![Select Mod](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/peer-mod-dependency-error/guardrails-navigate-mods-installed.png)

## Step 4: Verify Missing Mod

Verify the missing mod by reviewing the displayed error message.

![Verify Missing Mod](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/peer-mod-dependency-error/guardrails-verify-missing-mod-error.png)

## Step 5: Install Dependent Mod

Install the missing mod.

![Install Mod](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/peer-mod-dependency-error/gurdrails-install-missing-mod.png)

## Step 5: Run Control

Select **Run control** from the **Actions** dropdown and re-run the mod installed control.

![Run Mod Installed](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/peer-mod-dependency-error/guardrails-re-run-control.png)

## Step 6: Verify

The mod control moves to an **OK** state, indicating a successful mod installation.

![Install Success](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/peer-mod-dependency-error/guardrails-mod-install-success.png)

If you encounter any further issues, please [Open Support Ticket](https://support.turbot.com) and attach the relevant information to assist you more efficiently.

- A screenshot of the mod peer dependency error.
- A screenshot of the installed mods.