---
title: Monitoring Lambda Invocation
sidebar_label: Monitoring Lambda Invocation
---

# Monitoring Lambda Invocation

In this guide, you will:
- Use the AWS Console to monitor Lambda invocations in **self-hosted** environments.

Monitoring Lambda invocations is crucial for identifying **performance bottlenecks, optimizing execution, and managing AWS costs**. Worker Lambda functions process [events](/guardrails/docs/guides/azure/real-time-events#configuring-real-time-events), and prolonged execution times can result from **high concurrency, database overload, or excessive SQS message throughput**.

When durations exceed defined thresholds, they **increase costs** and may indicate inefficiencies. **Proactive monitoring** helps ensure smooth execution, efficient resource utilization, and minimized costs.


## Prerequisites

- Access to the Guardrails AWS account with **ReadOnly** privileges.


## Step 1: Log in to AWS Console

Open the AWS Console and navigate to the **Lambda** service in the region where Guardrails is deployed.

![AWS Console Home](/images/docs/guardrails/guides/hosting-guardrails/monitoring/investigate-lambda-invocation/aws-console-home.png)


## Step 2: Navigate to Dashboards

From the left navigation menu, select **Dashboards**.

![Lambda Dashboard](/images/docs/guardrails/guides/hosting-guardrails/monitoring/investigate-lambda-invocation/aws-lambda-dashboard-select.png)


## Step 3: View Lambda Invocations

In **Account-level metrics**, choose **Invocations** and set the desired date range.

![Select Invocations](/images/docs/guardrails/guides/hosting-guardrails/monitoring/investigate-lambda-invocation/aws-lambda-select-invocations.png)


## Step 4: Identify Invocation Spikes

Analyze the graph for spikes in invocation counts over the selected time range. In this example, a spike is observed starting from `01/29/2025`.

![Identify AWS Lambda Invocations Spike](/images/docs/guardrails/guides/hosting-guardrails/monitoring/investigate-lambda-invocation/aws-lambda-invocations-spike.png)


## Step 5: Investigate and Report

High Lambda invocations may be caused by **increased concurrency, database overload, or excessive SQS message throughput**, often triggered by misconfigurations in the environment. To diagnose the issue:

1. **Analyze event floods** by reviewing spikes in specific external events. Refer to [Investigate Event Floods](/guardrails/docs/guides/hosting-guardrails/monitoring/investigate-event-flood) to identify potential sources.
2. Determine whether the surge in Lambda activity originates from:
   - Unintended API calls
   - Excessive policy evaluations
   - Misconfigured controls

If further troubleshooting is required, gather the following details *before contacting Turbot Support*:

- **Timeframe of the spike** (start time and duration).
- **Recent policy or configuration changes** before the spike.
- **Source of external events**, refer to [Investigating Event Floods](/guardrails/docs/guides/hosting-guardrails/monitoring/investigate-event-flood).
- **Screenshots or exported event data** from the AWS Console.

Providing these details will help expedite the investigation and resolution process.

## Next Steps

Explore additional monitoring guides for Guardrails Enterprise:

- Learn how to [Monitor Alarms](https://turbot.com/guardrails/docs/guides/hosting-guardrails/monitoring/diagnose-control-error).
- Learn how to [Diagnose Control Errors](/guardrails/docs/guides/hosting-guardrails/monitoring/diagnose-control-error).

## Troubleshooting

| **Issue**                           | **Description**                                                                                          | **Guide** |
|--------------------------------------|----------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Common Errors                        | Any errors preventing controls from running.                                                            | Refer to [Common Troubleshooting](/guardrails/docs/guides/troubleshooting) for more information. |
| Further Assistance                    | If the issue persists, open a support ticket with detailed logs and screenshots for faster resolution. | [Open Support Ticket](https://support.turbot.com) |