---
title: Fix Invalid Controls
sidebar_label: Fix Invalid Controls
---

# Fix Invalid Controls

In this guide, you will:
- Use Guardrails console to identify and fix controls in an invalid state.

Controls enforce policies to ensure cloud resources remain compliant and Guardrails functions properly. Controls in **OK**, **Alarm**, or **Skipped** states indicate a healthy environment. Regularly resolving controls in an **Invalid** or error state helps maintain consistency and avoid errors.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Familiarity with the Guardrails console.

## Step 1: Log In to Guardrails Console

Log in to the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-invalid-controls/guardrails-console-login.png)


## Step 2: Navigate to Reports

Choose **Reports** from the top navigation menu.

![Navigate to Reports](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-invalid-controls/guardrails-navigate-to-reports.png)


## Step 3: View Control Alerts

From **Controls**, select **Alerts by Control Type**.

![Alerts by Control Type](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-invalid-controls/guardrails-select-controls-alerts.png)

Select **Invalid** from the **State** filter dropdown to display all invalid controls.

![Apply Filter](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-invalid-controls/guardrails-filter-invalid.png)


## Step 4: Find Invalid Control

Select the desired invalid control from the list to view detailed information and investigate further.

![Select Invalid Control](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-invalid-controls/guardrails-select-invalid-control.png)

The control page explains why the control is in an invalid state. In this case, the issue arises because the required sub-policies for the active control are set to **Skip**.

![Control Page](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-invalid-controls/guardrails-controls-page.png)


## Step 5: Fix Control Issues

Select the **Policies** tab to display the list of sub-policies currently in a **Skipped** state.

![Select Policies Tab](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-invalid-controls/guardrails-sub-policy-page.png)

Select the sub-policy, choose the desired setting, and click **Create** to apply the changes.

![Apply Setting](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-invalid-controls/guardrails-apply-policy-setting.png)

The control re-evaluates the policies and transitions to an **OK** state if the settings are correctly applied.

![Control OK State](/images/docs/guardrails/guides/using-guardrails/troubleshooting/fix-invalid-controls/guardrails-control-ok-state.png)


## Step 6: Optimizing Controls

- **Review the controls in Invalid state** and take the necessary actions.
- **If the state is due to policy misconfiguration**, carefully adjust the settings and apply the changes as required. Ensure that all configurations align with the workspace's needs to resolve the issue effectively.
- **For product-related issues**, document and report them for further investigation.
- Additionally, to maintain efficiency, skip resources or controls that are not a priority to reduce noise and wastage.

If you encounter any issues, please [Open a Support Ticket](https://support.turbot.com) and attach the relevant information to assist you more efficiently:

- A screenshot of the Guardrails control in an invalid state.
- A screenshot of the Guardrails policy in an invalid state.
- Provide the control log. Refer [here](/guardrails/docs/guides/using-guardrails/troubleshooting/access-control-logs) to extract the log.
