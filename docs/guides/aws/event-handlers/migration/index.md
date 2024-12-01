---
title: "Migrate AWS Event Handlers from Terraform Stacks to Custom Controls"
template: Documentation
nav:
  title: "Migrate AWS Event Handlers from Terraform Stacks to Custom Controls"
  order: 20
---

# Migrate AWS Event Handlers from Terraform Stacks to Custom Controls

In this guide, you will:

- Migrate AWS Event Handlers to Managed Custom Controls by running them in parallel with existing Terraform Stack controls.
- Safely delete the Terraform Stack controls once the migration is complete.

The Guardrails Event Handlers convey events from AWS CloudTrail to Guardrails for real-time processing, and migrating these handlers to custom controls will reduce complexity, decrease system load, and enhance performance.

## Prerequisites:
- Access to the Guardrails console with Administrator Privileges.
- Familiarity with Guardrails console, controls and policies.

## Step 1: Login to Guardrails Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/aws/event-handlers/migration/guardrails-console-login.png)

## Step 2: Navigate to Event Handlers Managed Control

In the Controls section, navigate to **AWS > Turbot > Event Handlers [Global] > Managed**. 

By default, the controls will be in a Skipped state.

![Event Handlers Managed Control](/images/docs/guardrails/guides/aws/event-handlers/migration/navigate-to-event-handlers-managed-control.png)

## Step 3: Enable Event Handlers Managed in Check Mode

In **Policies**, navigate to **AWS > Turbot > Event Handlers [Global] > Managed**. Select **New Policy Setting**.

![AWS > Turbot > Event Handlers [Global] > Managed Policy](/images/docs/guardrails/guides/aws/event-handlers/migration/navigate-managed-policy.png)

Choose the **Resource** to apply the policy, and set it to **Check: Configured**, and Click **Create**.

![Set Check Mode](/images/docs/guardrails/guides/aws/event-handlers/migration/set-policy-to-check-mode.png)

## Step 4: Verify Control Status

Navigate to **AWS > Turbot > Event Handlers [Global] > Managed** to check the control status. The control should move to an OK state for the enabled regions.

![Verify Control Status](/images/docs/guardrails/guides/aws/event-handlers/migration/verify-managed-controls-status.png)

>[!NOTE] An OK state indicates that the managed controls have successfully evaluated resources created by the stack controls.

## Step 5: Enforce Managed Controls

Return to the policy setting created in [Step 3](#step-3-enable-event-handlers-managed-in-check-mode). Select Edit.

![Select Edit](/images/docs/guardrails/guides/aws/event-handlers/migration/managed-policy-select-edit.png)

Change the setting to Enforce: Configured, and click Update.

![Guardrails Console Login](/images/docs/guardrails/guides/aws/event-handlers/migration/set-enforce-update.png)

The managed controls should display an OK status.

![Managed Control Status](/images/docs/guardrails/guides/aws/event-handlers/migration/managed-control-status-ok.png)

>[!NOTE] Since resources created by Terraform Stack controls are present in the Turbot CMDB, managed controls do not need to create or delete resources and will use the existing resources.

## Step 6: Phase Out Event Handlers Stack Controls

In Policies, navigate to **AWS > Turbot > Event Handlers [Global]**.

![Event Handlers Policy](/images/docs/guardrails/guides/aws/event-handlers/migration/navigate-to-geh-policy.png)

 Select **Edit** and set the policy to Skip. Click Update.

![Set Policy to Skip](/images/docs/guardrails/guides/aws/event-handlers/migration/set-geh-to-skip.png)

>[!NOTE] Set Event Handlers to Skip temporarily to monitor any deviations in the managed controls.

![Control Status Skip](/images/docs/guardrails/guides/aws/event-handlers/migration/geh-conrols-in-skipped-state.png)

Change AWS > Turbot > Event Handlers [Global] to Enforce: Not configured.

![Set to Enforce Not Configured](/images/docs/guardrails/guides/aws/event-handlers/migration/set-geh-to-enforce-not-configured.png)

You have now successfully migrated to the Managed Custom Controls for AWS Event Handlers.

## Next Steps

Please see the following resources to learn more about Event Handlers:

- Learn about [Event-Handlers](/guardrails/docs/guides/aws/event-handlers)
- Learn about [Event Poller](/guardrails/docs/guides/aws/event-handlers/poller)

If you encounter any issues, please Open [Support Ticket](https://support.turbot.com/) and attach the relevant information to assist you more efficiently.

A screenshot of the Guardrails control in error.
A screenshot of the Guardrails Policy in error.