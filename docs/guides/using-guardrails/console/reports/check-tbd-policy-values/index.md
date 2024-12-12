---
title: Check Policy Values in TBD State
sidebar_label: Check Policy Values in TBD State
---

# Check Policy Values in TBD State

In this guide, you will:
- Use the Guardrails console to review policies in a TBD state.

An ideal workspace uses policies to meet business requirements through secure enforcement, exception management, and shared defaults. Policies in an OK, Alarm, or Skipped state indicate a healthy environment. TBD policies must be resolved to maintain consistency and avoid errors. Regular health checks ensure workspaces remain effective and compliant.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Familiarity with Guardrails console.

## Step 1: Login to Guardrails Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/using-guardrails/console/reports/check-tbd-policy-values/guardrails-console-login.png)

## Step 2: Navigate to Reports

Choose **Reports** from the top navigation menu.

![Navigate to Reports](/images/docs/guardrails/guides/using-guardrails/console/reports/check-tbd-policy-values/guardrails-navigate-to-reports.png)

## Step 3: Select Policy

Under Policies, select **Policy Values by State**.

![Policy Values by State](/images/docs/guardrails/guides/using-guardrails/console/reports/check-tbd-policy-values/guardrails-policy-values-by-state.png)

Select **TBD** From **State** filter dropdown. This lists the policy values in a TBD state.

![Apply Filter](/images/docs/guardrails/guides/using-guardrails/console/reports/check-tbd-policy-values/guardrails-apply-tbd-filter.png)

## Step 4: Identify Cause

Select the policy value in TBD and review the cause.

![Review Cause](/images/docs/guardrails/guides/using-guardrails/console/reports/check-tbd-policy-values/guardrails-policy-identify-cause.png)

## Step 5: Resolving Errors and Optimizing Controls

*Review the policies and errors* currently in a TBD state and take the necessary actions.

*If the error is due to policy misconfiguration*, carefully adjust the settings and apply the changes as required. Ensure that all configurations align with the workspace's needs to resolve the issue effectively.

*For product-related issues*, make sure to document and report them for further investigation.

If you encounter any issues, please [Open Support Ticket](https://support.turbot.com) and attach the relevant information to assist you more efficiently.

- A screenshot of the Guardrails Policy in the TBD state.