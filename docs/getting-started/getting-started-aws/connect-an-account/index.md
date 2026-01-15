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

## Step 1: Return to Guardrails console

Switch back to the Guardrails console browser tab you opened in the previous guide. You should still be on the account configuration step where you downloaded the CloudFormation template.

> **Note:** If you closed the tab, you'll need to start over: Navigate to **Accounts** in the left sidebar, click **Actions** > **Connect Account**, select **AWS**, then **AWS Account**, choose your folder, and configure the role settings again.

## Step 2: Enter the Role ARN

Paste the **Role ARN** you obtained from the CloudFormation stack outputs (Step 7 in the previous guide) into the **IAM Role ARN** field.

![Role ARN field with value entered](/images/docs/guardrails/connect-account/connect-aws/connect-aws-account/aws-account-role-arn.png)

## Step 3: Test the connection

Click the **Test Connection** button to verify Guardrails can access your AWS account using the IAM role you created.

![Test Connection button](/images/docs/guardrails/connect-account/connect-aws/connect-aws-account/aws-account-test-connection.png)

If successful, you'll see a confirmation message indicating Guardrails can connect to your account.

> **Troubleshooting:** If the test fails, verify:
> - The CloudFormation stack completed successfully
> - The Role ARN matches exactly (copy from CloudFormation outputs)
> - The External ID in Guardrails matches the one used in the CloudFormation template

## Step 4: Connect the account

Click **Connect** to import your account into Guardrails.

![Connect button](/images/docs/guardrails/connect-account/connect-aws/connect-aws-account/aws-account-connect-button.png)

## Step 5: Observe progress

Wait for the progress bar to complete. The time this takes will depend on how many resources are in the account; it is normal for the progress bar to fluctuate in size as new types of resources are discovered.

![Import progress bar](/images/docs/guardrails/connect-account/connect-aws/connect-aws-account/aws-account-discovery-progress.png)

## Step 6: View Controls by state

Select **Reports** from the top navigation menu. Type `controls` into the **Search reports…** field to show only reports with the word "controls" in their name. Select the **Controls by State** report from the list.

<p><img alt="search-for-controls-reports" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/search-for-controls-reports.png"/></p>

## Step 7: Configure report filters

From the filter bar, expand the **Type** dropdown. Then select the checkbox next to **AWS** to limit the report to only show AWS controls.

Bookmark the **Controls by State** report, you'll need it in subsequent guides.

<p><img alt="set-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/set-type-filter.png"/></p>

## Step 8: View the report

Review the status of your controls for AWS. `Alarm`, `OK`, `Skipped`, and `TBD` are all common and normal states to see in your account.

> [!IMPORTANT]
> The controls in `Error` or `Invalid` states must be cleared before moving further into these guides.
> It takes few mins depending on various factors. We suggest to wait and report to [Turbot support](help@turbot.com), in case these errors are not cleared up automatically.

<p><img alt="aws-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/aws-controls-by-state.png"/></p>

## Step 9: Review

In this guide you successfully imported an AWS account into Guardrails.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity) we’ll see how Guardrails monitors cloud events and reacts to resource changes.

## Troubleshooting

If you run into issues following this guide, jump in the `#guardrails` channel in the [Turbot Community Slack](https://turbot.com/community/join), or [open a support ticket](https://support.turbot.com/hc/en-us/requests/new).

## Progress tracker
- [x] Prepare an AWS Account for Import to Guardrails
- [x] **Connect an AWS Account to Guardrails**
- [ ] Observe AWS Resource Activity
- [ ] Enable Your First Policy Pack
- [ ] Review Account-Wide Governance
- [ ] Create a Static Exception to a Guardrails Policy
- [ ] Create a Calculated Exception to a Guardrails Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
