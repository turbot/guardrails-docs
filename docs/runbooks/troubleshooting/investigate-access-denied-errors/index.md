---
title: Investigate Access Denied Errors with IAM Policy Simulator
sidebar_label: Investigate Access Denied Errors
---

# Investigate Access Denied Errors with IAM Policy Simulator

In this runbook, you will:
- 

## Prerequisites

- Access to the AWS Account with sufficient permissions to run the IAM Policy Simulator
- Access to the Guardrails console with `Turbot/Admin` or `Turbot/Operator` permissions.
- Familiarity with the `AWS > Turbot > IAM` control, the `AWS > Turbot > IAM > Source` policy setting

## Step 1:  Gather full text of the Access Denied

Get the full list of actions where the user receives "Access Denied" errors. Whether this is from the AWS console or the
cli, the error message and the action taken are critical troubleshooting information.

## Step 2: Open IAM Policy Simulator

Log into the AWS Account where the error occurs.

Open the [IAM Policy simulator](https://policysim.aws.amazon.com/home/index.jsp).

## Step 3: Specify Principal, Service, and Action

The IAM Policy simulator requires a user, group or role as the test resource.   Choose the IAM resource that you wish to test.

Choose the AWS service.

Choose the actions gathered in Step 1. 

![Choose Principal, Service and Action](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws_choose_resource_service_action.png)

## Step 4: Specify a Region if Necessary

Many AWS permissions require a region. If no region is specified then the Policy Simulator will show access denied. Set
a region and the action may be allowed.

![Simulator with No Region](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/no-region-set.png)

![Simulator with Region Set](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/region-set.png)

## Step 5: Run Simulation

Look for which actions are denied.  
Click the link to show which policy which denies the action.

Implicit Deny (No matching allow statements. There's no statement that says the principal is allowed the action. )
![Implicit Deny](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws_implicitly_denied.png)

Explicit Deny (Statement that forbids action. A statement denies the action.)
![Implicit Deny](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws_explicitly_denied.png)

Explicit Allow (Statement allow action. A statement allows the action.)
![Implicit Deny](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws_explicit_allowed.png)

<!--  Not sure if we should include these parts in a runbook.  Figuring out what Guardrails policy settings explodes the complexity. 
## Step 7: Find Statement in AWS > Turbot > IAM > Source

## Step 8: Identify the Guardrails policy to Change

### Possible Causes
`AWS > {Service} > Enabled` is not set to `Enabled` for this account.  Create this policy setting to enable the AWS service.

The mod for this service has not been installed.  Install then set the `AWS > {Service} > Enabled` policy setting.

If the mod for this service does not exist, open a feature request with [Turbot Support](mailto:help@turbot.com) to have it created. Describe your use cases for this service.

There may be an `Permissions > Levels > {Action} Administration` policy setting that will enable the intended action. These `Administration` policy settings are disabled by default as they cover sensitive areas.

The `boundary` policy for this account depends on [AWS > Account > Approved Regions [Default]](https://hub.guardrails.turbot.com/mods/aws/policies/aws/approvedRegionsDefault).  If the access denied error happens for a specific region then consider adding that region to the `Regions` policy setting.  
-->

# Reference

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