---
title: Enable Verbose Logging
sidebar_label: Enable Verbose Logging
---

# Enable Workspace Verbose Logging

In this runbook, you will:
- Use AWS console setting verbose logging in the Events and API containers, which can provide valuable troubleshooting information
- Learn how to troubleshoot in Guardrails

**Verbose Logging** Generally, verbose logging will only be required when working with Turbot Support to diagnose some issues. Enabling verbose logging on the Events and API containers should be considered a short-term measure. It should only be enabled as long as necessary.

Long-term verbose logging can cause a considerable increase in logging costs with little to no value from the data logged.

## Prerequisites

- Access to the Guardrails AWS account with Administrator privileges.
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the System Manager service in the region where Guardrails stacks are deployed

![AWS SSM Console](/images/docs/guardrails/runbooks/troubleshooting/enable-verbose-logging/aws-ssm-parameter-store.png)

## Step 2: Identify SSM Parameter Value

![SSM Workspace Parameter](/images/docs/guardrails/runbooks/troubleshooting/enable-verbose-logging/aws-ssm-workspace-parameter.png)


## Step 3: Check Default Parameter Value

To start with the default `log_level` is set to `debug`.

![SSM Workspace Parameter Value](/images/docs/guardrails/runbooks/troubleshooting/enable-verbose-logging/aws-ssl-parameter-value-default-settings.png)


## Step 4: Modify Parameter Value

Select **Edit** and update `log_level` to `verbose` in `Value` section

![SSM Workspace Parameter With Verbose](/images/docs/guardrails/runbooks/troubleshooting/enable-verbose-logging/aws-ssm-parameter-modifiy-verbose.png)

**Note:**
Ensure the parameter string is a valid JSON before saving. Keep all rest of the values as default and select **Save Changes**.

## Step 5: Enforce the Change

Enforce the change by updating the respective CloudFormation TE stack where the workspace is hosted. This step is important to ensure that the changes made above propagate to the respective workspace.

Navigate to `CloudFormation` check for `Turbot Enterprise` stack and update the `Parameter Deployment Trigger` value from Blue <-> Green. This should trigger a new parameter change. No other changes to the TE stack are required as part of these troubleshooting steps.

## Step 6: Review

- [ ] In Step 5 wait for the Cloudformation to finish updating the TE stack. The Stack should indicate `UPDATE_COMPLETE`

![Validate TE Stack Status](/images/docs/guardrails/runbooks/troubleshooting/enable-verbose-logging/aws-ssm-parameter-change-validation.png)

You have successfully updated the Workspace SSM parameter to enable verbose logging. Now you can navigate Cloudwatch Log Group for /{turbot_prefix}/{te_version}/events or /{turbot_prefix}/{te_version}/api to investigate generated events and check for required troubleshooting data.

**Note:**
When troubleshooting is complete, turn off verbose logging. Go to the SSM Console and repeat steps 1 to 5. Edit the `log_level` back to `debug`.

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [TE architecture](https://turbot.com/guardrails/docs/enterprise/architecture).
- Learn about [Troubleshooting](https://turbot.com/guardrails/docs/enterprise/troubleshooting).
