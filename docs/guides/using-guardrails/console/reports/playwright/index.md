---
title: Control Report Using Playwright
sidebar_label: Control Report Using Playwright
---

# Control Report Using Playwright

In this guide, you will:
- Locate controls in an error state using the Controls by Control Type report in Guardrails.
- Filter and export error state controls for further analysis.

Controls in error state indicate configuration or compliance issues that require immediate attention. Identifying these controls helps you prioritize remediation efforts and maintain your cloud infrastructure's security and compliance posture.

## Prerequisites

- Access to Turbot Guardrails Console
- Permissions to view controls and reports

## Step 1: Navigate to Reports

Log in to your Turbot Guardrails Console and click on **Reports** in the main navigation menu.

![Navigate to Reports](/images/docs/guardrails/guides/using-guardrails/console/reports/playwright/images/navigate-to-reports.png)

## Step 2: Open Controls by Control Type Report

Locate and click on **Controls by Control Type** in the Reports section. The report displays a summary of controls grouped by their control types.

![Controls by Control Type](/images/docs/guardrails/guides/using-guardrails/console/reports/playwright/images/controls-by-type.jpg)

## Step 3: Filter for Error State Controls

- Click the **State** filter button.
- Select **Error** to view only controls in error state.
- The report updates to show only controls currently in an error state.

## Step 4: Export Data for Analysis

- Click the **Export to CSV** button in the top right corner.
- The report data downloads as a CSV file.
- Use this exported data for further analysis or to create remediation plans.

## Next Steps

After identifying controls in error state:
- Review each error to understand the root cause.
- Create remediation plans for critical issues.
- Implement fixes according to your organization's change management process.
- Monitor the controls to ensure remediation efforts are successful.

## Troubleshooting

| Issue                    | Resolution                                                                                      |
|--------------------------|-------------------------------------------------------------------------------------------------|
| Report takes long to load| Wait for the complete data to load. The system is processing a large number of controls.        |
| Export fails             | Try reducing the number of columns or applying additional filters to reduce data size.          |
| No error controls shown  | Verify that you have the correct permissions and that the filter is properly applied.           |