---
title: Resolve Calculated Policy Evaluation Errors
sidebar_label: Resolve Calculated Policy Evaluation Errors
---

# Resolve Calculated Policy Evaluation Errors

In this guide, you will:
- Use Guardrails console to identify and resolve calculated policy evaluation errors.

A [Calculated Policy](/guardrails/docs/reference/glossary#calculated-policy) dynamically determines policy settings by sourcing CMDB data, executing a GraphQL query, and applying a Nunjucks template to generate a resource-specific policy value. Any policy setting can be calculated, making policies more context-aware and adaptable.

However, calculated policies can sometimes encounter errors due to misconfigurations or data inconsistencies, leading to controls entering an error state. Ensuring these policies are properly configured and promptly fixed is crucial for maintaining compliance and system stability.

## Prerequisites

- **Turbot/Admin** permissions at the Turbot resource level.
- Familiarity with the Guardrails console.

## Step 1: Navigate to Policies

Log into the Guardrails console with provided local credentials or by using any SAML based login and Select **Policies** from the top navigation menu.

![Navigate to Reports](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-calc-policy-evaluation-errors/guardrails-select-policies.png)

## Step 2: Select Policy Value

Select the calculated policy in an error state that needs to be resolved. This redirects to the Policy Value page, where the error message is displayed.

Here, the error occurs due to `TypeError: Cannot read properties of undefined (reading 'toString')`, indicating that the referenced property is undefined and cannot be converted to a string.

![Select Calculated Policy](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-calc-policy-evaluation-errors/guardrails-select-calc-policy-in-error.png)

## Step 3: Select Calculated Policy

Select the effective **Calculated** policy setting.

![Effective Setting](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-calc-policy-evaluation-errors/guardrails-select-effective-calc-policy.png)

## Step 4: Edit Policy Setting

Select **Edit** from the top right corner.

![Select Edit](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-calc-policy-evaluation-errors/guardrails-select-edit.png)

Choose **Launch calculated policy builder**.

![Launch Calculated Policy Builder](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-calc-policy-evaluation-errors/guardrails-launch-policy-builder.png)

This displays the `GraphQL` query and `Jinja2/Nunjucks` template used in the calculated policy, providing insight into how the policy value is generated.

![Calculated Policy Builder Page](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-calc-policy-evaluation-errors/calc-policy-builder-page.png)

## Step 5: Resolve Calculated Policy

Select the `Test Resource`, update the corrected Jinja2/Nunjucks template, and view the real-time output to verify if the fix is successful. Choose **Update**.

![Resolve Error](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-calc-policy-evaluation-errors/guardrails-resolve-cal-policy.png)

Select **Update** from the Update Policy Setting page. 

![Select Update](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-calc-policy-evaluation-errors/guardrails-update-policy.png)

## Step 6: Verify Resolution

Verify that the policy value transitions to an `OK` state, confirming the issue has been resolved successfully.

![Policy Value State](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-calc-policy-evaluation-errors/guardrails-policy-value-ok.png)

The affected control transitions to an `OK` state.

![Control State](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-calc-policy-evaluation-errors/guardrails-control-ok-state.png)

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Further Assistance                       | If you encounter further issues with Calculated Policies, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |
