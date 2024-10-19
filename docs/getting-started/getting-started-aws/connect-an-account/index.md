---
title: Connect an AWS Account to Guardrails
sidebar_label: Connect an AWS Account
---

# Connect an AWS Account to Guardrails

In this guide, you will deploy the Guardrails IAM access role to your AWS account using a CloudFormation template and then connect that account to Guardrails. 

This is the second guide in the *Getting started with AWS* series.

## Prerequisites

- Completed the previous guide: **Prepare an AWS Account for import to Guardrails**.
- Access to the Turbot Guardrails console with admin privilege.

## Step 1: Select import location

Switch back to the Guardrails console **Account Import** browser tab you opened in the previous guide. Use the **Parent Resource** dropdown to select the **Sandbox** folder as the location to import the account.

<p><img alt="set-parent-resource" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/set-parent-resource.png"/></p>

## Step 2: Update account details

Paste the role ARN you obtained from step 7 in the previous guide into the **IAM Role ARN** field.  Also, enter the AWS account ID into the **Account ID** field.

<p><img alt="ready-to-connect" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/ready-to-connect.png"/></p>

## Step 3: Import the account

Triple-check that the **IAM Role External ID** matches the value from the CloudFormation template. If not, overwrite the current value with the one from the Cloudformation output. Select **Connect** to import your account.

<p><img alt="finish-and-connect" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/finish-and-connect.png"/></p>

## Step 4: Observe progress

Wait for the progress bar to complete. The time this takes will depend on how many resources are in the account; it is normal for the progress bar to fluctuate in size as new types of resources are discovered.

<p><img alt="aws-progress-bar" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/aws-progress-bar.png"/></p>

## Step 5: View Controls by state

Select **Reports** from the top navigation menu. Type `controls` into the **Search reports…** field to show only reports with the word "controls" in their name. Select the **Controls by State** report from the list. 

<p><img alt="search-for-controls-reports" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/search-for-controls-reports.png"/></p>

## Step 6: Configure report filters

From the filter bar, expand the **Type** dropdown. Then select the checkbox next to **AWS** to limit the report to only show AWS controls.
 
Bookmark the **Controls by State** report, you’ll need it in subsequent guides. 

<p><img alt="set-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/set-type-filter.png"/></p>

## Step 7: View the report

Review the status of your controls for AWS.  `Alarm`, `OK`, `Skipped`, and `TBD` are all common and normal states to see in your account. If you see controls in `Error` or `Invalid` states, those must be cleared before moving further into these guides.  

<p><img alt="aws-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/aws-controls-by-state.png"/></p>

## Step 8: Review

In this guide you successfully imported an AWS account into Guardrails.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity) we’ll see how Guardrails monitors cloud events and reacts to resource changes.

## Troubleshooting

If you run into issues following this guide, jump in the `#guardrails` channel in the [Turbot Community Slack](https://turbot.com/community/join), or [open a support ticket](https://support.turbot.com/hc/en-us/requests/new).

## Progress tracker

- [x] Prepare an AWS Account for import to Guardrails
- [x] **Connect an AWS Account to Guardrails**
- [ ] Enable Your First Policy Pack
- [ ] Review Account-Wide Bucket Versioning
- [ ] Create a Static Exception to a Guardrails Policy
- [ ] Create a Calculated Exception to a Guardrails Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
