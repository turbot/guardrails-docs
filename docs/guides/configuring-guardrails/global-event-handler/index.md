---
title: Global Event Handler
sidebar_label: Global Event Handler
---

# Setup Global Event Handler(GEH)

In this guide, you will:
- Update a mod in the Guardrails workspace using the Guardrails UI.
- Monitor and troubleshoot the GEH update process.

Guardrails is designed to enable organizations to selectively install policies, controls, and guardrails tailored to specific services. The Global [Event Handler](/guardrails/docs/reference/glossary#event-handler) simplifies cloud management by providing a unified framework for responding to and managing events, ensuring proactive governance and security across cloud environments.

## Prerequisites

- **Turbot/Owner** permissions at the Turbot resource level.
- Familiarity with Guardrails console.
- EventBridge IAM role required in GEH secondary regions, which helps to pass events to the primary region.

## Step 1: Login Guardrail Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/update-mod/guardrails-console-login.png)

## Step 2: Enable Service Role

IAM role is required for Global Event handler. This can be created manually by customer or can be done by AWS Turbot Service Role

![Enable Service Role](/images/docs/guides/configuring-guardrails/global-event-handler/1-geh-aws-turbot-service-roles.png)

Check if all the related controls are in `OK` state

![Service Role Control](/images/docs/guides/configuring-guardrails/global-event-handler/2-geh-check-control-status.png)

## Step 3: Enable Global Event Handler Control

![Enable GEH](3-gen-aws-turbot-event-handler-global-enabled.png)

Validate that the setting is applied successfully

![Validate Setting](4-validate-post-setting.png)


## Step 4: Enable Global Event Handler Control


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