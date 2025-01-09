---
title: Access Logs for a Guardrails' Control
sidebar_label: Access Control Logs
---

# Access Logs for a Guardrails' Control

In this guide, you will:
- Learn how to retrieve and analyze access logs to investigate control failures in the Guardrails console.

Controls enforce policies that maintain cloud resource compliance and the proper functioning of Guardrails. Healthy controls in **OK**, **Alarm**, or **Skipped** states signify a stable environment. However, when errors occur, logs offer a valuable source of information to diagnose and resolve issues effectively.

Control logs are essential for tracking activities and operations within a Guardrails-managed environment. They provide detailed insights into changes, access attempts, and failures, enabling you to identify the root causes of control issues. By analyzing these logs, you can gain a deeper understanding of control failures, take corrective actions, or share the necessary details with the product support team to ensure operational efficiency.


## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Familiarity with the Guardrails console.


## Step 1: Log in to the Guardrails Console

Log in to the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/using-guardrails/troubleshooting/access-control-logs/guardrails-console-login.png)


## Step 2: Navigate to the Control

Navigate to the control page to inspect the failure details. Select **VIEW LOG**.

![Navigate to Control Page](/images/docs/guardrails/guides/using-guardrails/troubleshooting/access-control-logs/guardrails-control-page.png)

> [!NOTE]
> `Handling...` signifies the control is in the execution state. You can still view the logs by selecting **VIEW LOG**. This example demonstrates a control in the `ERROR` state. However, logs can be viewed for analysis at any state of the control.


## Step 3: Select Log Level

From the **Level:** dropdown filter, choose **Debug and above**.

![Select Debug Log Level](/images/docs/guardrails/guides/using-guardrails/troubleshooting/access-control-logs/guardrails-select-debug-level.png)


## Step 4: Copy Logs

Select the **Copy to clipboard** button and save the logs in a `.txt` file.

![Copy Logs](/images/docs/guardrails/guides/using-guardrails/troubleshooting/access-control-logs/guardrails-copy-logs.png)

> [!IMPORTANT]
> If debug logs are unavailable, rerun the control to generate the logs. Refer `Step 5` based on need.

## Step 5: Rerun Control

If the logs are incomplete or display `Internal Error`, rerun the control to generate a fresh log.

![Run Control](/images/docs/guardrails/guides/using-guardrails/troubleshooting/access-control-logs/run-control.png)

## Support

If you encounter any issues, please [Open a Support Ticket](https://support.turbot.com) and attach the relevant information to assist you more efficiently:

- The `.txt` file containing the copied control failure logs.
- A screenshot of the control.

