---
title: Find Policies in TBD State
sidebar_label: Find Policies in TBD State
---

# Find Policies in TBD State

In this guide, you will:
- Use the Guardrails console to review and resolve policies in a TBD state.

An ideal workspace uses policies to meet business requirements through secure enforcement, exception management, and shared defaults. [Policies](/guardrails/docs/concepts/policies) in an `OK`, `Alarm`, or `Skipped` state indicate a healthy environment. However, policies in a `TBD` state must be addressed to maintain consistency and prevent errors.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Familiarity with the Guardrails console.

## Step 1: Log In to the Guardrails Console

Log in to the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/using-guardrails/console/reports/find-policies-in-tbd-state/guardrails-console-login.png)

## Step 2: Access Reports

Choose **Reports** from the top navigation menu.

![Navigate to Reports](/images/docs/guardrails/guides/using-guardrails/console/reports/find-policies-in-tbd-state/guardrails-navigate-to-reports.png)

## Step 3: Filter Policies by State

Under Policies, select **Policy Values by State**.

![Policy Values by State](/images/docs/guardrails/guides/using-guardrails/console/reports/find-policies-in-tbd-state/guardrails-policy-values-by-state.png)

From the **State** filter dropdown, select **TBD**. This will list the policy values currently in a `TBD` state.

![Apply Filter](/images/docs/guardrails/guides/using-guardrails/console/reports/find-policies-in-tbd-state/guardrails-apply-tbd-filter.png)

## Step 4: Review the Cause

Select a policy value in the `TBD` state and review the cause of the issue.

![Review Cause](/images/docs/guardrails/guides/using-guardrails/console/reports/find-policies-in-tbd-state/guardrails-policy-identify-cause.png)

Resolve Errors and Optimize Controls

1. **Review Policies and Errors**: Identify the cause of policies in the TBD state and take necessary actions.
2. **Policy Misconfiguration**: Adjust the settings and apply changes as needed to resolve the issue. Ensure configurations align with workspace requirements.
3. **Product-Related Issues**: Document and report any product-related issues for further investigation.

## Next Steps

Explore the following resources to learn more about Guardrails’ Policies feature:

- Learn about [Policies](/guardrails/docs/concepts/policies)
- Learn about [Managing Policies](/guardrails/docs/guides/configuring-guardrails/managing-policies)

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |