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

Get the specific IAM actions where the user encounters "Access Denied" errors. Whether this is from the AWS console or
the
CLI, the error message and the action taken are critical troubleshooting information.

**AWS Console**
![SNS Console Error](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws-console-sns-error.png)

**AWS CLI**

```shell
❯ aws sns create-topic \
    --name will-it-work \
    --region us-east-1 

An error occurred (AuthorizationError) when calling the CreateTopic operation: User: arn:aws:sts::123456789012:assumed-role/metadata/joe@turbot.com is not authorized to perform: SNS:CreateTopic on resource: arn:aws:sns:us-east-1:123456789012:will-it-work because no identity-based policy allows the SNS:CreateTopic action
```

**CloudTrail**
A similar event as it would appear in CloudTrail. Snippet truncated for read-ability.

```json
{
  "eventVersion": "1.09",
  "userIdentity": {
    "type": "AssumedRole",
    "principalId": "AROAX:joe@turbot.com",
    "arn": "arn:aws:sts::123456789012:assumed-role/metadata/joe@turbot.com",
    "accountId": "123456789012"
  },
  "eventTime": "2024-08-19T19:14:05Z",
  "eventSource": "sns.amazonaws.com",
  "eventName": "CreateTopic",
  "awsRegion": "us-east-1",
  "userAgent": "aws-cli/2.3.4 Python/3.8.8 Linux/5.15.0-117-generic exe/x86_64.ubuntu.22 prompt/off command/sns.create-topic",
  "errorCode": "AccessDenied",
  "errorMessage": "User: arn:aws:sts::123456789012:assumed-role/metadata/joe@turbot.com is not authorized to perform: SNS:CreateTopic on resource: arn:aws:sns:us-east-1:123456789012:will-it-work because no identity-based policy allows the SNS:CreateTopic action"
}
```

Before leaving this step, you should have a list of `service:Action` to check in the IAM Policy Simulator.

For this runbook, the `sns:CreateTopic` action will be used as an example.

You should have a list of `service:action` to review before moving on to the next step.

**Example List**

```yaml
- sns:CreateTopic
- sns:DeleteTopic
- ec2:RunInstances
- vpc:CreateSubnet
```

## Step 2: Open IAM Policy Simulator

Log into the AWS Account where the user encounters the errors. Ensure you
have [sufficient permissions](#minimum-permissions) to run the Policy Simulator.

Open the [IAM Policy simulator](https://policysim.aws.amazon.com/home/index.jsp).

## Step 3: Specify principal

The IAM Policy simulator requires a user, group or role as the test resource. Choose the **IAM user (or role)** that
matches the user/role who encountered the error.

![Choose IAM User Role](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws-select-iam-user-role.png)

## Step 4: Specify service and actions

Choose a **AWS service** from the list made in Step 1.

Choose the **IAM action(s)** identified in Step 1. Note that it is typically easier to find the action via the browser
search functionality, for services with long lists of actions.

![Choose Service and Action](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws-choose-resource-service-action.png)

Alternatively, you can enable all actions for the AWS service to get a broad view of what the user is authorized to do.

## Step 5: Specify a region if necessary

Many AWS permissions require a region to be specified for the policy simulator to work. If no region is specified then
the Policy Simulator will show access denied.

![Choose a Region](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws-choose-region.png)

![Simulator with No Region](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/no-aws-no-region-selected.png)

![Simulator with Region Set](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws-region-selecteted.png)

## Step 6: Specify a resource if necessary

Many AWS permissions require a resource to be specified for finer grained evaluation. If no region is specified then the
Policy Simulator will show access denied.

![Simulator with Any Resources Set](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws-specify-resource.png)

## Step 7: Run simulation

Examine the simulation results to see which actions are denied. Note why the action was denied.

Click the **Show statement link** to show which policy denied the action.

Implicit Deny (No matching allow statements. There's no statement that says the principal is allowed the action. )

![Implicit Deny](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws-implicitly-denied.png)

Explicit Deny (Statement that forbids action. A statement denies the action.)

![Implicit Deny](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws-explicitly-denied.png)

Explicit Allow (A statement allows the action. Note the differences
between [Action](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_action.html)
and [NotAction](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_notaction.html) in
permission declarations. `NotAction` lists typically show up in the `turbot_lockdown` IAM policy.

![Implicit Deny](/images/docs/guardrails/runbooks/troubleshooting/investigate-access-denied-errors/aws-explicitly-allowed.png)

## Step 8: Review

In this runboook, you have examined the access denied errors for a Guardrails-managed IAM User, Group, or Role using the
AWS IAM Policy Simulator. The Simulator has indicated if the actions are explicitly or implicitly forbidden.

# Next Steps

- Is there a mismatch between the permissions granted and the user's access requirements? For example, if the user has
  been granted [AWS/SNS/Operator](https://hub.guardrails.turbot.com/mods/aws/permissions/aws-ssm/ssm/operator) but they
  need to create SNS topics then a permission grant
  of [AWS/SNS/Admin](https://hub.guardrails.turbot.com/mods/aws/permissions/aws-sns/sns/admin) is more appropriate. Use
  the [IAM](https://hub.guardrails.turbot.com/mods/aws/permissions) to determine which actions are assigned to which
  levels. Adjust the user's permissions as required.
- Are the access denied errors for a particularly sensitive action? There may be
  an [Capabilities Modifiers](docs/integrations/aws/permissions#capability-modifier-policies) policy settings to enable
  that action. Go to the [Policies section](https://hub.guardrails.turbot.com/mods/aws/policies) of the Guardrails Hub.
  Search for "{service} administration". Look through the search results for a policy setting that addresses what the
  user is trying to do.
- Use [Modifiers](docs/integrations/aws/permissions#modifiers) policy settings to adjust which action belong to which
  permission level. For example,
  if [AWS/SNS/Operator](https://hub.guardrails.turbot.com/mods/aws/permissions/aws-ssm/ssm/operator) should be able to
  create SNS topics, then use the `AWS > SNS > Permissions > Levels > Modifiers` to grant `sns:CreateTopic` to the
  `operator` level.
- If this is for a new AWS service that Guardrails does not yet support, check
  the [Guardrails Hub](https://hub.guardrails.turbot.com/#mods). If you don't see a mod for this AWS Service, then open
  a feature request with [Turbot Support](mailto:help@turbot.com) describing your use cases for this service.
- AWS may have added a new action that Guardrails doesn't support yet. You can check this on
  the [IAM section](https://hub.guardrails.turbot.com/mods/aws/permissions) of the Guardrails Hub. Search for the
  Service:Action pairs from Step 1. If the permissions return zero results, then Guardrails doesn't support that action
  yet. Use [Modifiers](docs/integrations/aws/permissions#modifiers) policy settings to amend the permission level with
  the missing permission. Also, open a feature request with [Turbot Support](mailto:help@turbot.com) to have it added.

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