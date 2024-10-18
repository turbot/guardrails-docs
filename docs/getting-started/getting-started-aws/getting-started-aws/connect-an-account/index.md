---
title: Connect an AWS Account to Guardrails
sidebar_label: Connect an AWS Account
---

# Connect an AWS Account to Guardrails

In this guide, you will deploy the Guardrails IAM access role to your AWS account using a CloudFormation template and then connect that account to Guardrails. 

This is the first guide in the *Getting started with AWS* series.

## Prerequisites

- Access to the Turbot Guardrails console with admin privilege.

- An AWS Account, with admin privileges, to import into Guardrails.

## Step 1: Login to Guardrails

Login to your Guardrails console and select the **CONNECT** option from the home page. 

<p><img alt="locate-top-level-connect" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/locate-top-level-connect.png"/></p>

## Step 2: Download the CloudFormation template

Select **AWS Account** from the left navigation and then click !SOMETHING! to download the CloudFormation template we will use to set up the required IAM role in your AWS account. Leave this page open in a browser tab.

You’ll need an IAM role that grants Guardrails permission to discover [resources](/guardrails/docs/reference/glossary#resource) in your AWS account and to monitor changes via event handlers. The CloudFormation template downloaded in this step has the minimum permissions necessary to create that role.

<p><img alt="initial-connect-screen" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/initial-connect-screen.png"/></p>

## Step 3: Create the CloudFormation stack

In AWS, create a CloudFormation stack using the template you downloaded. Provide the external ID from step 2.

<p><img alt="specify-stack-details" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/specify-stack-details.png"/></p>

## Step 4: Verify the stack was created

<p><img alt="verify-stack-created" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/stack-created.png"/></p>

## Step 5: Verify AWS role

When the stack is created, navigate to **IAM > Roles**, search for `turbot`, and verify that the role `turbot-guardrails-access-policy` exists in your account with these permissions: 
 
- ReadOnlyAccess 

- turbot-guardrails-access-policy

<p><img alt="aws-permissions" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/aws-permissions.png"/></p>

## Step 6: View stack outputs

Navigate back to **Cloud Formation > Stacks**, select **Outputs**, and verify that the external ID matches what Guardrails generated in Step 2. Also, copy the ARN of the Guardrails IAM role.

<p><img alt="stack-outputs" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/stack-outputs.png"/></p>

## Step 7: Select import location

Navigate back to the tab you opened in step 2. Use the **Parent Resource** dropdown to select the **Sandbox**  folder as the location to import the account.

<p><img alt="set-parent-resource" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/set-parent-resource.png"/></p>

## Step 8: Update account details

Paste the role ARN from step 6 into the **IAM Role ARN** field.  Also, enter your AWS account ID into the **Account ID** field.

<p><img alt="ready-to-connect" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/ready-to-connect.png"/></p>

## Step 9: Import the account

Double-check that the IAM Role External ID matches the value from the CloudFormation template. If not, overwrite with that captured value. Select **Connect** to import your account.


<p><img alt="finish-and-connect" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/finish-and-connect.png"/></p>

## Step 9: Observe progress

Wait for the progress bar to complete. This process takes a while, and you’ll see the bars fluctuate. The number of resources will grow as Guardrails discovers them.

<p><img alt="aws-progress-bar" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/aws-progress-bar.png"/></p>

## Step 10: View Controls by State report

Select **Reports** from the top navigation menu.  Type `controls` into the **Search reports…** field to show only reports with the word "controls" in their name. Select the **Controls by State** report from the list. 

<p><img alt="search-for-controls-reports" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/search-for-controls-reports.png"/></p>

## Step 11: Configure report filters

From the filter bar, expand the **Type** dropdown. Then enable the checkbox next to **AWS** to limit the report to only show AWS controls.
 
Bookmark the **Controls by State** report, you’ll need it in subsequent guides. 

<p><img alt="set-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/set-type-filter.png"/></p>

## Step 13: View the report

Review the status of your controls for AWS.  `Alarm`, `OK`, `Skipped`, and `TBD` are all common and normal states to see in your account.  If you see controls in `Error` or `Invalid` states, those must be cleared before moving further into these guides.  

<p><img alt="aws-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/aws-controls-by-state.png"/></p>

## Step 13: Review

In this guide you've learned how to deploy an AWS role that grants minimal permissions to Guardrails, then import an AWS account into Guardrails.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity) we’ll see how Guardrails watches your account and reacts to resource changes.

## Troubleshooting

| Issue | Description | Guide |
|--|--|--|
| ERROR | One or more controls are in ERROR. | [tbd]() |
| INVALID | One or more controls are INVALID. | [tbd]() |

 
## Progress tracker

- [x] **Connect an AWS Account to Guardrails**
- [ ] Observe AWS Resource Activity
- [ ] Enable Your First Policy Pack
- [ ] Review Account-Wide Bucket Versioning
- [ ] Create a Static Exception to a Guardrails Policy
- [ ] Create a Calculated Exception to a Guardrails Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
