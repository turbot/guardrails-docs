---
title: Create Policy Pack
sidebar_label: Create Policy Pack
guide_type: guide
---

# Create Policy Pack

This guide walks you through the process of creating a new policy pack in Guardrails. A policy pack is a collection of policies that can be applied to your resources to enforce specific rules and configurations.

> [!NOTE]
> Estimated time to complete: 5-10 minutes

## Prerequisites

- Access to the Guardrails Console
- Appropriate permissions to create and manage policy packs
- Basic understanding of Guardrails policies

> [!TIP]
> Before creating a policy pack, review the available policies to ensure you select the most appropriate ones for your needs.

## Step 1: Access the Policies Tab

1. Log in to the Guardrails Console
2. Select the **Policies** tab from the main navigation

![Policies Tab](/images/docs/guardrails/guides/using-guardrails/create-policypack/policies-tab.jpeg)

## Step 2: Create New Policy Pack

1. Click the **Create Policy Pack** button
2. In the modal that appears, enter the following details:
   - Name: `demo-scribe-pack`
   - Description: "For testing"

> [!IMPORTANT]
> Choose a descriptive name that clearly indicates the purpose of the policy pack.

![Create Policy Pack Modal](/images/docs/guardrails/guides/using-guardrails/create-policypack/create-policy-pack.jpeg)

## Step 3: Add Policies to the Pack

1. Click the **Add Policy** button
2. In the policy search field, type "S3 > Bucket > Vers"
3. Select the desired policy from the search results
4. Configure the policy settings as needed
5. Click **Save** to add the policy to the pack

> [!TIP]
> You can add multiple policies to a single pack. Consider grouping related policies together for better organization.

![Add Policy to Pack](/images/docs/guardrails/guides/using-guardrails/create-policypack/add-policy.jpeg)

## Step 4: Review and Save

1. Review all the policies added to your pack
2. Click the **Save** button to create the policy pack
3. Click the **Reload** button to refresh the view

## Review Step: Verify Policy Pack Creation

After completing the steps above, verify that:
- The new policy pack appears in the list
- All policies are correctly added to the pack
- The pack is in the desired state

## Next Steps

- [Learn how to apply policy packs to resources](../apply-policypack)
- [Understand policy pack management](../manage-policypack)
- [Explore available policies](../available-policies)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Policy pack not appearing in list | Click the **Reload** button to refresh the view |
| Unable to add policies | Verify you have the correct permissions |
| Error saving policy pack | Check for any validation errors in the form |
| Policy pack name already exists | Choose a unique name for your policy pack |
| Policies not showing in search | Verify the policy exists and you have access to it |
| Unable to configure policy settings | Check if the policy requires specific permissions |
| Error during policy pack creation | Ensure all required fields are filled correctly |