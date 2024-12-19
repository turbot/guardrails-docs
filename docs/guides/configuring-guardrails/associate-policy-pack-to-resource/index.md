---
title: Associate Policy Pack to Specific Resource
sidebar_label: Associate Policy Pack to Specific Resource
---

# Associate Policy Pack to Specific Resource

In this guide, you will:
- Use the Guardrails console to associate policy packs to a specific resource.

Policy Packs let administrators group and apply policies to specific resources, like AWS accounts, folders, or individual resources. Associating Policy Packs with resources ensures consistent policy enforcement and simplifies management across your environment.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Familiarity with Guardrails console.

## Step 1: Login to Guardrails Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/configuring-guardrails/associate-policy-pack-to-resource/guardrails-console-login.png)

## Step 2: Navigate to Resources

Choose **Resources** from the top navigation menu.

![Navigate to Resources](/images/docs/guardrails/guides/configuring-guardrails/associate-policy-pack-to-resource/guardrails-select-resources-tab.png)

## Step 3: Select Resource

Search for and select the desired resource. In this example, we have selected an EC2 Volume.

![Select EBS Volume](/images/docs/guardrails/guides/configuring-guardrails/associate-policy-pack-to-resource/guardrails-select-resource.png)

## Step 4: Associate Policy Pack

From the resource detail page, click **MANAGE** in the Policy Packs section to proceed.

![Select Manage](/images/docs/guardrails/guides/configuring-guardrails/associate-policy-pack-to-resource/guardrails-select-manage.png)

Select **Add** from the dialog box.

![Select Add](/images/docs/guardrails/guides/configuring-guardrails/associate-policy-pack-to-resource/guardrails-select-add.png)

Select the desired policy pack and click **Save** to apply it to the resource.

![Save Policy Pack](/images/docs/guardrails/guides/configuring-guardrails/associate-policy-pack-to-resource/guardrails-select-policy-pack-save.png)

## Step 5: Verify Control

The newly attached policy pack should now be visible under the **Policies** tab of the resource.

![Review Policy](/images/docs/guardrails/guides/configuring-guardrails/associate-policy-pack-to-resource/guardrails-verify-policy.png)

The newly applied control should now be visible under the **Controls** tab of the resource.

![Review Policy](/images/docs/guardrails/guides/configuring-guardrails/associate-policy-pack-to-resource/guardrails-verify-controls.png)

If you encounter any issues, please [Open Support Ticket](https://support.turbot.com) and attach the relevant information to assist you more efficiently.

- Screenshot of the error encountered.