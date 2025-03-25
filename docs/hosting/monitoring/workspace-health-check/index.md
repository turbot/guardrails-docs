---
title: Workspace Health Check
sidebar_label: Workspace Health Check
---

# Workspace Health Check

In this guide, you will:
- Use Guardrails console to perform a workspace health check.

An ideal workspace should be quick and responsive. It should employ necessary controls to meet business requirements, minimize errors, and address any policies or controls in TBD, error, or invalid states. Regular health checks will help ensure the workspace remains effective.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Familiarity with Guardrails console.

## Step 1: Login to Guardrails Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/monitoring/workspace-health-check/guardrails-console-login.png)

## Step 2: Navigate to Reports

Choose **Reports** from the top navigation menu.

![Navigate to Reports](/images/docs/guardrails/guides/hosting-guardrails/monitoring/workspace-health-check/guardrails-navigate-to-reports.png)

## Step 3: View Control Alerts

Under Controls, select **Alerts by Control Type**.

![Alerts by Control Type](/images/docs/guardrails/guides/hosting-guardrails/monitoring/workspace-health-check/guardrails-select-controls-alerts.png)

Select **Invalid** and **Error** From **State** filter dropdown.

![Apply Filter](/images/docs/guardrails/guides/hosting-guardrails/monitoring/workspace-health-check/guardrails-filter-error-invalid.png)

## Step 3: View Policy Alerts

In **Reports**, scroll down to `Policies` section, select **Policy Values by State** option.

![Alerts by Policy Values](/images/docs/guardrails/guides/hosting-guardrails/monitoring/workspace-health-check/guardrails-policy-values-by-state.png)

Select **Invalid** and **Error** From **State** filter dropdown.

![Apply Filter](/images/docs/guardrails/guides/hosting-guardrails/monitoring/workspace-health-check/filter-policy-error-invalid-state.png)

## Step 4: Resolving Errors and Optimizing Controls

*Review the controls and errors* currently in an error state and take the necessary actions.

*If the error is due to policy misconfiguration*, carefully adjust the settings and apply the changes as required. Ensure that all configurations align with the workspace's needs to resolve the issue effectively.

*For product-related issues*, make sure to document and report them for further investigation.

Additionally, to maintain efficiency, resources or controls that are not a priority should be skipped to reduce noise and wastage.

If you encounter any issues, please [Open Support Ticket](https://support.turbot.com) and attach the relevant information to assist you more efficiently.

- A screenshot of the Guardrails control in error.
- A screenshot of the Guardrails Policy in error.