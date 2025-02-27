---
title: Monitoring Lambda Invocation
sidebar_label: Monitoring Lambda Invocation
---

# Monitoring Lambda Invocation

In this guide, you will:
- Use the AWS console to monitor the lambda invocations.

Monitoring Lambda invocations is crucial for identifying performance bottlenecks, optimizing execution, and managing AWS costs. Worker Lambda functions process [events](/guardrails/docs/guides/azure/real-time-events#configuring-real-time-events), and prolonged execution times can result from high concurrency, database overload, or excessive SQS message throughput. When durations exceed defined thresholds, they increase costs and indicate inefficiencies. Proactive monitoring helps ensure smooth execution, efficient resource utilization, and minimized costs.

## Prerequisites

- Access to the Guardrails AWS account with **ReadOnly** privileges.

## Step 1: Login to Guardrails Console

Open the AWS Console and navigate to the **Lambda** service in the region where Guardrails is deployed.

![AWS Console Home](/images/docs/guardrails/guides/hosting-guardrails/monitoring/investigate-lambda-invocation/aws-console-home.png)

## Step 2: Navigate to Dashboards

Choose **Dashboards** from the left navigation menu.

![Lambda Dashboard](/images/docs/guardrails/guides/hosting-guardrails/monitoring/investigate-lambda-invocation/aws-lambda-dashboard-select.png)

## Step 3: View Invocations

From `Account-level metrics`, choose **Invocations** and and set the desired date range.

![Select Invocations](/images/docs/guardrails/guides/hosting-guardrails/monitoring/investigate-lambda-invocation/aws-lambda-select-invocations.png)

## Step 4: Identify Invocation Spikes

Identify spikes in the graph for the selected time range. In this example, a spike in invocations is observed starting from `01/29/2025`.

![Identify AWS Lambda Invocations Spike](/images/docs/guardrails/guides/hosting-guardrails/monitoring/investigate-lambda-invocation/aws-lambda-invocations-spike.png)

## Step 5: Investigate and Resolve Spike

High Lambda invocations may result from `increased concurrency`, `database overload`, or `excessive SQS message` throughput, often caused by misconfigurations in the environment. One way to identify the root cause is by [analyzing event floods](/guardrails/docs/guides/hosting-guardrails/monitoring/investigate-event-flood) for spikes in specific external events, which can help pinpoint the source of increased Lambda activity.
Once the root cause is determined, apply the necessary fixes.

## Step 6: Review

- [ ] Ensure that the Lambda invocation spike stabilizes and returns to normal levels.

![lambda Invocation Resolved](/images/docs/guardrails/guides/hosting-guardrails/monitoring/investigate-lambda-invocation/aws-lambda-invocations-resolved.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn how to [Monitor Alarms](https://turbot.com/guardrails/docs/guides/hosting-guardrails/monitoring/diagnose-control-error).
- Learn how to [Diagnose Control Error](/guardrails/docs/guides/hosting-guardrails/monitoring/diagnose-control-error).

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Common errors.                     | Any common errors preventing controls to run.   |Refer [Common Troubleshooting](/guardrails/docs/guides/troubleshooting) for more information.
| Further Assistance                       | If you encounter further issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |
