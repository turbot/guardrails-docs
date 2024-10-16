---
title: Connect an AWS Account to Guardrails
sidebar_label: Connect an AWS Account
---


# Connect an AWS Account to Guardrails

In this guide, you will deploy the Guardrails IAM access role to your AWS account using a CloudFormation template and then connect that account to Guardrails. 

## Getting started with AWS Guides

This is the first guide in the *Getting started with AWS* series. In the following guides, you’ll work through a series of exploratory exercises to learn the basics of cloud governance with Guardrails.

## Prerequisites

- Access to the Turbot Guardrails console with admin privilege.

- An AWS Account to import into Guardrails with AWS admin privileges.

## Step 1: Login to Guardrails

  
Login to your Guardrails console and select the **CONNECT** option from the home page.  

<p><img alt="locate-top-level-connect" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/locate-top-level-connect.png"/></p>

## Step 2: Download the Cloudformation template

Select **AWS Account** from the left navigation and then click !SOMETHING! to download the CloudFormation template we will use to set up the required IAM role in your AWS account.  

<p><img alt="initial-connect-screen" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/initial-connect-screen.png"/></p>

You’ll need an IAM role that grants Guardrails permission to discover [resources](/guardrails/docs/reference/glossary#resource) in your AWS account and to monitor changes via event handlers. 

  
The CloudFormation template downloaded in this step has the minimum permissions necessary to create that role..

## Step 3: Create the CloudFormation stack

In AWS, create a CloudFormation stack using the template you downloaded.  
  
When the stack is created, verify that the role `turbot-guardrails-access-policy` exists in your account, with these permissions:  
  
- ReadOnlyAccess  
- turbot-guardrails-access-policy

<p><img alt="aws-permissions" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/aws-permissions.png"/></p>

## Step 4: Copy the Role ARN

Verify that the stack completed successfully and then select the outputs tab.  From the stack outputs select and copy the value for Role ARN.

<p><img alt="cloudformation-outputs" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/cloudformation-outputs.png"/></p>

## Step 5: Select import location

Use the **Parent Resource** dropdown to select the **Sandbox**  folder as the location to import the account. Select **Connect**.

<p><img alt="set-parent-resource" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/set-parent-resource.png"/></p>

## Step 6: Update account details

Paste the Role ARN from step 4 into the **IAM Role ARN** field.  Also, copy and paste the AWS account ID into the **Account ID** field.

<p><img alt="ready-to-connect" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/ready-to-connect.png"/></p>

## Step 7: Verify the external ID

Check that the IAM Role External ID matches the value from the CloudFormation template. If not, overwrite with that captured value.

<p><img alt="verify-external-id" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/verify-external-id.png"/></p>

## Step 8: Import the account

  
Select the **Connect** button to import the account.

<p><img alt="finish-and-connect" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/finish-and-connect.png"/></p>

## Step 9: Observe progress

Wait for the progress bar to complete. This process takes a while, and you’ll see the bars fluctuate. The number of resources will grow as Guardrails discovers them.

<p><img alt="aws-progress-bar" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/aws-progress-bar.png"/></p>

## Step 10: View Controls by State report

Select **Reports** from the top navigation menu.  Type `controls` into the **Search reports…** field to show only reports with the word "controls" in their name. Select the **Controls by State** report from the list.  

<p><img alt="search-for-controls-reports" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/search-for-controls-reports.png"/></p>

## Step 11: Configure report filters

Select the **Type** dropdown from the filters bar. Then enable the check box next to **AWS** to limit the report to only show AWS controls.  
  
Bookmark the **Controls by State** report, you’ll need it in subsequent guides.  

<p><img alt="set-type-filter" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/set-type-filter.png"/></p>

## Step 12: Review Controls

Review the status of your controls for AWS.  `Alarm`, `OK`, `Skipped`, and `TBD` are all common and normal states to see in your account.  If you see controls in `Error` or `Invalid` states, those must be cleared before moving further into these guides.  

<p><img alt="aws-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/aws-controls-by-state.png"/></p>

## Next Steps

You’ve now successfully connected your AWS account to Guardrails.

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
