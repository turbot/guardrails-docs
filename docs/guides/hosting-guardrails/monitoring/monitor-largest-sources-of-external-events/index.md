---
title: Monitor Largest Sources of External Events
sidebar_label: Monitor Largest Sources of External Events
---

# Monitor Largest Sources of External Events

In this guide, you will:
- Use AWS console to monitor the largest sources of external events.

Monitor the largest sources of external events to identify trends, detect unexpected spikes, and assess whether high event counts are essential for Guardrails to process. This helps optimize system efficiency and prevent unnecessary load.

## Prerequisites

- Access to the Guardrails AWS account.
- Familiarity with AWS Console and CloudWatch service.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the CloudWatch service in the region where Guardrails is deployed.

![AWS Console CloudWatch](/images/docs/guardrails/guides/hosting-guardrails/monitoring/monitor-largest-sources-of-external-events/aws-console-cloudwatch.png)

## Step 2: Navigate to Dashboards

Choose **Dashboards** from the left navigation menu.

![CloudWatch Dashboard](/images/docs/guardrails/guides/hosting-guardrails/monitoring/monitor-largest-sources-of-external-events/cloudwatch-dashboard-select.png)

## Step 3: Select Cadence Dashboard

In **Custom dashboards**, select the **Cadence Dashboard**.

![Cadence Dashboard](/images/docs/guardrails/guides/hosting-guardrails/monitoring/monitor-largest-sources-of-external-events/cloudwatch-select-cadence-dashboard.png)

## Step 4: Add Log Groups

Set the duration and enter the log groups in the **log_groups** input box. Typically, these will include `_worker`, `_worker_priority`, `_worker_retry`, and `_worker_factory` for the installed TE versions.

> [!NOTE]
> Multiple TE version log groups can be selected if needed.

![Log Groups Input](/images/docs/guardrails/guides/hosting-guardrails/monitoring/monitor-largest-sources-of-external-events/cloudwatch-select-duration-log-groups.png)

A list of tenants, along with the associated `Event Sources`, `Event Names`, and `Accounts` generating the events, will be displayed.

![Display Events](/images/docs/guardrails/guides/hosting-guardrails/monitoring/monitor-largest-sources-of-external-events/cloudwatch-display-tables.png)

## Step 5: Update Tenant Name

From the tenant list, select the desired tenant and update the **tenant_name** field. This will filter the display to show events specific to the selected tenant, including event sources, names, and associated accounts.

![View All Messages By Workspace](/images/docs/guardrails/guides/hosting-guardrails/monitoring/monitor-largest-sources-of-external-events/cloudwatch-enter-tenant.png)

## Step 6: Update Event Source

In the **Source** field, enter the event source you wish to investigate. This will display the relevant event names for that source.

![Update Event Source](/images/docs/guardrails/guides/hosting-guardrails/monitoring/monitor-largest-sources-of-external-events/cloudwatch-update-source.png)

## Step 7: Identify Event Generating Accounts

Use the **Account** table to view the accounts generating events, helping to narrow down the scope for effective debugging.

![View All Messages By Workspace](/images/docs/guardrails/guides/hosting-guardrails/monitoring/monitor-largest-sources-of-external-events/cloudwatch-account-details.png)

After reviewing the detailed event sources, use the information to identify the root cause and take the necessary corrective actions.

If you encounter any further issues, please [Open Support Ticket](https://support.turbot.com) and attach the relevant information to assist you more efficiently.

- A screenshot of the Tenant with the unexpected event count.
- A screenshot of the event sources, event names and account id's.