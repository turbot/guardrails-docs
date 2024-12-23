---
title: How To Get Control Failure Log
sidebar_label: How To Get Control Failure Log
---

# How To Get Control Failure Log

In this guide, you will:
- Use Guardrails console to get a control failure log.

Controls enforce policies to maintain cloud resource compliance and ensure the proper functioning of Guardrails. Controls in OK, Alarm, or Skipped states signify a healthy environment. Control failure logs provide insights into the causes of failures, enabling effective error resolution.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Familiarity with Guardrails console.

## Step 1: Login to Guardrails Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/using-guardrails/troubleshooting/how-to-get-control-failure-log/guardrails-console-login.png)

## Step 2: Navigate to Control

Navigate to the control page to inspect the failure details. Select **VIEW LOG**.

![Navigate to Control Page](/images/docs/guardrails/guides/using-guardrails/troubleshooting/how-to-get-control-failure-log/guardrails-control-page.png)

## Step 3: Select Log Level

From **Level:** dropdown filter, choose **Debug and above**.

![Select Debug Log Level](/images/docs/guardrails/guides/using-guardrails/troubleshooting/how-to-get-control-failure-log/guardrails-select-debug-level.png)

## Step 4: Copy Logs

Select the **Copy to clipboard** button and save the logs in a `.txt` file.

![Copy Logs](/images/docs/guardrails/guides/using-guardrails/troubleshooting/how-to-get-control-failure-log/guardrails-copy-logs.png)

>[!NOTE]
>  If debug logs are unavailable, rerun the control to generate the logs.

If you encounter any issues, please [Open Support Ticket](https://support.turbot.com) and attach the relevant information to assist you more efficiently.

- The .txt file containing the copied control failure logs.
- A screenshot of the control.