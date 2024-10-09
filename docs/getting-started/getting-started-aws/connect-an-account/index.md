---
title: Connect an AWS Account to Guardrails
sidebar_label: Connect an AWS Account to Guardrails
---


# Connect an AWS Account to Guardrails

In this guide, you’ll connect an AWS account to Guardrails. Then, in following guides, you’ll work through a series of exploratory exercises to learn the basics of cloud governance with Guardrails.

## Prerequisites

Access to the Guardrails console with admin privilege, and a top-level `Sandbox` folder.

## Step 1: Initiate the `Connect`

  
On the Guardrails home page, hover on `Connect`.  

<p><img alt="locate-top-level-connect" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/locate-top-level-connect.png"/></p>

Click to open the `Connect` screen.

## Step 2: Capture the external ID

Choose `AWS Account`.

Copy the IAM Role External ID and save it for use in Step 4.  

<p><img alt="initial-connect-screen" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/initial-connect-screen.png"/></p>

## Step 3: Download a CloudFormation template

You’ll need an IAM role that grants Guardrails read-only permissions to discover [resources](/guardrails/docs/reference/glossary#resource) in your AWS account and monitor changes. 

  
We provide a CloudFormation template to create that role.  Visit [this url](tbd), and download it.

## Step 4: Create the CloudFormation stack

In AWS, create a CloudFormation stack using the template you downloaded. Provide the external ID from step 1.  
  
When the stack is created, verify that the role `turbot-service-readonly` exists in your account, with these permissions:  
  
- ReadOnlyAccess  
- turbot-readonly-events-sns  
  
Copy the role ARN for use in step 5.

## Step 5: Connect your account

<p><img alt="finish-and-connect" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/finish-and-connect.png"/></p>

* Set the `Parent Resource` to `Sandbox`
* Provide your AWS account ID
* Paste the role ARN from step 4
* Verify the external ID matches what you captured in Step 2. If not, overwrite with that captured value.

Click `Connect`.

## Step 6: Observe progress

Wait for the progress bar to complete.

<p><img alt="aws-progress-bar" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/aws-progress-bar.png"/></p>

This process takes a while, and you’ll see the bars fluctuate. The number of resources will grow as Guardrails discovers them.  


## Step 7: Locate the `Controls by State` report

Search `Reports` for `controls`.  

<p><img alt="search-for-controls-reports" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/search-for-controls-reports.png"/></p>

Select `Controls by State`.

## Step 8: Review

You’ve now successfully connected your AWS account to Guardrails.

<p><img alt="aws-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/aws-controls-by-state.png"/></p>

Bookmark the `Controls by State` report, you’ll need it in subsequent guides.

> [!CAUTION]
> It’s normal for the `Controls by State` report to show controls in `Alarm` and/or `TBD`. If controls are in `Error` or `Invalid`, you should check with your administrator to resolve these issues. See [Troubleshooting](#troubleshooting).

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
