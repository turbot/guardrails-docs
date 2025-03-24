---
title: Attach Policy Pack to Resource
sidebar_label: Attach Policy Pack to Resource
---

# Attach Policy Pack to Specific Resource

In this guide, you will:
- Use the Guardrails console to associate policy packs to a specific resource.

[Policy Packs](/guardrails/docs/guides/configuring-guardrails/policy-packs#policy-packs) let administrators group and apply policies to specific resources, like AWS accounts, folders, or individual resources. Associating Policy Packs with resources ensures consistent policy enforcement and simplifies management across your environment.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Familiarity with Guardrails console.

## Step 1: Login to Guardrails Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/configuring-guardrails/policy-packs/attach-policy-pack-to-resource/guardrails-console-login.png)

## Step 2: Navigate to Resources

Choose **Resources** from the top navigation menu.

![Navigate to Resources](/images/docs/guardrails/guides/configuring-guardrails/policy-packs/attach-policy-pack-to-resource/guardrails-select-resources-tab.png)

## Step 3: Select Resource

Search for and select the desired resource. In this example, we have selected an EC2 Volume.

![Select EBS Volume](/images/docs/guardrails/guides/configuring-guardrails/policy-packs/attach-policy-pack-to-resource/guardrails-select-resource.png)

## Step 4: Associate Policy Pack

From the resource detail page, click **MANAGE** in the Policy Packs section to proceed.

![Select Manage](/images/docs/guardrails/guides/configuring-guardrails/policy-packs/attach-policy-pack-to-resource/guardrails-select-manage.png)

Select **Add** from the dialog box.

![Select Add](/images/docs/guardrails/guides/configuring-guardrails/policy-packs/attach-policy-pack-to-resource/guardrails-select-add.png)

Select the desired policy pack and click **Save** to apply it to the resource.

![Save Policy Pack](/images/docs/guardrails/guides/configuring-guardrails/policy-packs/attach-policy-pack-to-resource/guardrails-select-policy-pack-save.png)

## Step 5: Verify Control

The newly attached policy pack should now be visible under the **Policies** tab of the resource.

![Review Policy](/images/docs/guardrails/guides/configuring-guardrails/policy-packs/attach-policy-pack-to-resource/guardrails-verify-policy.png)

The newly applied control should now be visible under the **Controls** tab of the resource.

![Review Policy](/images/docs/guardrails/guides/configuring-guardrails/policy-packs/attach-policy-pack-to-resource/guardrails-verify-controls.png)

## Next Steps

Explore the following resources to learn more about Guardrails’ Policies feature:

- Learn about [Policy Packs](/guardrails/docs/concepts/policy-packs)
- Learn about [Managing Policies](/guardrails/docs/guides/configuring-guardrails/managing-policies)

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |
