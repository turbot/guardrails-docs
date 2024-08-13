---
title: Update Workspace TE
sidebar_label: Update Workspace TE
---

# Update Turbot Guardrails Enterprise (TE) version in Workspace

In this runbook, you will:
- Learn how to Update an existing workspace to a new Turbot Guardrails Enterprise (TE) version.

Turbot Guardrails Enterprise (TE) provides automated configuration and management of Turbot infrastructure to be used when running the Turbot software application. For example, TE provides the setup of load balancers, SQS queues, ECS, etc., while Turbot provides the software to run in the container.

TE deploys a new version of the Turbot software -- Every Turbot release requires a new TE version. Once the version is installed, Workspaces should be updated to the new TE version.

## Prerequisites
- Access to the Guardrails master account.
- Administrator privileges.
- Familiarity with AWS Console and CloudFormation service.


## Step 1: Access AWS Console

Open the AWS Console and navigate to AWS CloudFormation to select the Guardrails workspace stack corresponding to the workspace that you are planning to update.

![AWS Console CloudFormation Page](/images/docs/guardrails/runbooks/enterprise-install/update-te/aws-cfn-stack-set.png)

## Step 2: Update CloudFormation Stack

Once you select the respective stack in the listing, choose the Update option at the top of the screen. Choose `Use the existing template` as default selection and select **Next**.

![Update CloudFormation Stack](/images/docs/guardrails/runbooks/enterprise-install/update-te/aws-cfn-stack-set-update.png)

## Step 3: Modify Workspace TE Version

Modify the stack parameter `Version` to match the desired new TE version in `Turbot Workspaces` section. It will be in the form 5.xx.x. Then select **Next**.

![Modify TE Version](/images/docs/guardrails/runbooks/enterprise-install/update-te/aws-cfn-stack-set-update-te-version.png)

Retain all default values in `Configure stack options`, `Permissions - optional`, `Stack failure options` and `Advanced options` then select **Next**

## Step 4: Review Parameters in CloudFormation Changeset Preview

Preview the final set of suggested parameter changes on the desired workspace. Select **Submit**

![Submit Change Set](/images/docs/guardrails/runbooks/enterprise-install/update-te/aws-cfn-stack-change-set-preview.png)

## Step 5: Review

- [ ] The CloudFormation stack status should reflect `UPDATE_COMPLETE`.

- [ ] Open the Guardrails console, navigate to `Admin` tab to check Workspace Admin indicating updated TE version. You should have Guardrails console Administrator privilege assigned.

![Workspace TE Version](/images/docs/guardrails/runbooks/enterprise-install/update-te/guardrails-workspace-te-version.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn about [Installing TE stacks](https://turbot.com/guardrails/docs/enterprise/updating-stacks).
- Learn more about [TE architecture](https://turbot.com/guardrails/docs/enterprise/architecture).

## Troubleshooting

### Stack update errors
Review CloudFormation events for errors and resolve any issues before retrying the update.

