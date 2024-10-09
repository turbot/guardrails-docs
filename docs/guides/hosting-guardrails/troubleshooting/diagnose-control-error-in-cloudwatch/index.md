---
title: Diagnose Control Error in AWS CloudWatch
sidebar_label: Diagnose Control Error in AWS CloudWatch
---

# Diagnose Control Error in AWS CloudWatch Log Groups

In this guide, you will:
- Use Guardrails console and AWS Cloudwatch to Diagnose the control error.

When troubleshooting error messages in the Guardrails Console, control logs typically provide sufficient information to identify the root cause. However, in some cases, additional details may be needed for a more thorough diagnosis, which can be retrieved from the AWS CloudWatch log groups.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level and access to the Guardrails AWS account.
- Familiarity with Guardrails console and AWS CloudWatch service.

## Step 1: Login to Guardrails Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/diagnose-control-error-in-cloudwatch/guardrails-console-login.png)

## Step 2: Navigate To Control Error

Navigate to the control in an error state to be investigated. Select **VIEW LOG**.

![Control Error](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/diagnose-control-error-in-cloudwatch/guardrails-control-error.png)

## Step 3: View Logs

Select **Debug and above** from the **Level** filter.

![Debug and Above](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/diagnose-control-error-in-cloudwatch/guardrails-level-filter.png)

Select the **Internal Error** message to expand it.

![Internal Error](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/diagnose-control-error-in-cloudwatch/guardrails-expand-error-message.png)

Upon expanding the error, there isn't enough detailed information to determine the root cause, requiring further investigation in the AWS CloudWatch log groups.

## Step 4: Access AWS Console

Open the AWS Console and navigate to the CloudWatch service in the region where Guardrails is deployed.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/diagnose-control-error-in-cloudwatch/aws-console-cloudwatch.png)

## Step 5: Navigate to Log Groups

Choose **Log Groups** from the left navigation menu.

![Navigate to Log Groups](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/diagnose-control-error-in-cloudwatch/cloudwatch-navigate-log-groups.png)

## Step 6: Search Log Group

Search for log groups with the prefix **/aws/lambda/turbot_** followed by the workspace version.

![Search Log Group](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/diagnose-control-error-in-cloudwatch/cloudwatch-log-groups-select.png)

## Step 7: Select Log Group

Select the **worker** log group as indicated in the **type** field from the error log in the Guardrails console. Choose **Search all log steams**.

![Worker Log Group](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/diagnose-control-error-in-cloudwatch/cloudwatch-select-search-all-log-streams.png)

## Step 8: Search Error

Search using the **errorId** retrieved from the Guardrails console control error log.

![Search with Error Id](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/diagnose-control-error-in-cloudwatch/cloudwatch-loggroups-search-with-errorid.png)

## Step 8: Find Error Details

Collapse the search result to view the full error details.

![Error Details](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/diagnose-control-error-in-cloudwatch/cloudwatch-loggroups-error-details.png)

After reviewing the detailed error message, use the information to identify the root cause and take the necessary corrective actions.

If you encounter any further issues, please [Open Support Ticket](https://support.turbot.com) and attach the relevant information to assist you more efficiently.

- A screenshot of the Guardrails control in error.
- Gathered logs and error details from AWS CloudWatch Log Groups.