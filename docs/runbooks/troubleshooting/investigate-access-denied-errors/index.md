---
title: Investigate Access Denied Errors with IAM Policy Simulator
sidebar_label: Investigate Access Denied Errors with IAM Policy Simulator
---

# Investigate Access Denied Errors with IAM Policy Simulator

In this runbook, you will:
- Use the AWS IAM Policy Simulator to troubleshoot "Access Denied" errors when using Guardrails-managed IAM Users/Roles.

## Prerequisites

- Access to the AWS Account with [sufficient permissions](#minimum-permissions) to run the IAM Policy Simulator

## Step 1:  List access denied errors

Get the full list of actions where the user receives "Access Denied" errors. Whether this is from the AWS console or the
cli, the error message and the action taken are critical troubleshooting information.

## Step 2: Open IAM Policy Simulator

Log into the AWS Account where the user encounters the errors. Ensure you have [sufficient permissions](#minimum-permissions) to run the Policy Simulator.

Open the [IAM Policy simulator](https://policysim.aws.amazon.com/home/index.jsp).

## Step 3: Specify principal, service, and action

The IAM Policy simulator requires a user, group or role as the test resource.   Choose the **IAM resource** that you wish to test.

Choose the **AWS service**.

Choose the **actions** gathered in Step 1. 

![Choose Principal, Service and Action](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws_choose_resource_service_action.png)

Alternatively, you can enable all actions for the AWS service to get a broad view of what the user is authorized to do. 

## Step 4: Specify a Region if Necessary

Many AWS permissions require a region. If no region is specified then the Policy Simulator will show access denied. Set
a **region** and the action may be allowed.

![Simulator with No Region](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/no-region-set.png)

![Simulator with Region Set](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/region-set.png)

## Step 5: Run Simulation

Examine the simulation results to see which actions are denied.  Note why the action was denied. 

Click the **link** to show which policy which denies the action.

Implicit Deny (No matching allow statements. There's no statement that says the principal is allowed the action. )
![Implicit Deny](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws_implicitly_denied.png)

Explicit Deny (Statement that forbids action. A statement denies the action.)
![Implicit Deny](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws_explicitly_denied.png)

Explicit Allow (Statement allow action. A statement allows the action.)
![Implicit Deny](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws_explicit_allowed.png)


## Step 6: Review

In this runboook, you have examined the access denied errors for a Guardrails-managed IAM User, Group, or Role using the AWS IAM Policy Simulator.  The Simulator has indicated if the actions are explicitly or implicitly forbidden.

# Next Steps
- Evaluate if the access denied are intentional.  Is the user trying to do something they shouldn't?
- If this is for a new AWS service that Guardrails does not yet support, a feature request may be required.
- Identify if the entire AWS service is disaabled, or just specific actions for that service. 
- Are the access denied errors for a particularly sensitive action? There may be an `Administration` policy settings to enable that action. 

# Reference
## Minimum Permissions
Minimum Permissions to run the IAM Policy Simulator.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Statement1",
      "Effect": "Allow",
      "Action": [
        "iam:SimulatePrincipalPolicy",
        "iam:SimulateCustomPolicy",
        "iam:GetContextKeysForPrincipalPolicy",
        "iam:GetContextKeysForCustomPolicy",
        "iam:ListPolicies",
        "iam:ListGroupsForUser",
        "iam:ListAttachedUserPolicies",
        "iam:ListAttachedRolePolicies",
        "iam:ListAttachedGroupPolicies",
        "iam:GetGroup",
        "iam:GetUser",
        "iam:GetRole"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```