---
title: Enable Verbose Logging
sidebar_label: Enable Verbose Logging
---

# Enable Workspace Verbose Logging

In this guide, you will:
- Use AWS console setting verbose logging in the Events and API containers.
- Learn how to troubleshoot in Guardrails.

**Verbose logging** is primarily used for troubleshooting and is generally only necessary when working with Turbot Support to diagnose specific issues. When enabled, verbose logging on Events and API containers should be viewed as a short-term solution, active only for the duration required to gather essential data.

It's important to note that keeping verbose logging enabled for extended periods can lead to a significant increase in logging costs, while offering little to no additional value from the data collected.

## Prerequisites

- Access to the Guardrails AWS account with Administrator privileges.
- Familiarity with AWS Console, Systems Manager(SSM), Service Catalog and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the System Manager service in the region where Guardrails stacks are deployed

![AWS Console SSM](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/enable-verbose-logging/aws-console-ssm.png)

## Step 2: Navigate to Parameter Store

Choose **Parameter Store** from the left navigation menu.

![SSM Parameter Store](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/enable-verbose-logging/ssm-parameter-store.png)

## Step 3: Identify SSM Parameter Value

To enable verbose event logging, first identify the workspace(s) you want to configure. Search for **tenant** to generate a list of parameters for all workspaces in this region, then Locate the relevant parameters, which will follow this format: **/{turbot_prefix}/tenant/{workspace}.{installation_domain}**.

![SSM Workspace Parameter](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/enable-verbose-logging/ssm-workspace-parameter-search.png)

## Step 4: Verify Parameter Value

Choose the tenant parameter and verify if the **log_level** is set to `debug`, as this is the default setting.

![SSM Workspace Parameter Value](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/enable-verbose-logging/aws-ssl-parameter-value-default-settings.png)

## Step 5: Modify Parameter Value

Select **Edit** and update `log_level` to `verbose` in `Value` field. Then select **Save changes**.

> [!NOTE] Ensure the parameter string is a valid JSON before saving. Keep all rest of the values as default.

![SSM Workspace Parameter With Verbose](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/enable-verbose-logging/aws-ssm-parameter-modifiy-verbose.png)

## Step 6: Enable Verbose Logging in Service Catalog

Navigate to the **Service Catalog** service and select the **Turbot Guardrails Enterprise (TE)** provisioned product where verbose logging is required. Then, select Actions and choose Update.

![Service Catalog TE Update](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/enable-verbose-logging/service-catalog-te-update.png)

Toggle the `Deployment Trigger` between `Blue <> Green`, this will trigger the TE CloudFormation stack to ensure that the Events and API containers are using the latest SSM parameter values. No other changes to the TE stack are required as a part of these troubleshooting steps. Select **Update**.

![Service Catalog TE Deployment Trigger](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/enable-verbose-logging/service-catalog-deployment-trigger.png)

## Step 7: Review Cloud Formation Stack

- [ ] The TED CloudFormation stack status should change to `UPDATE_COMPLETE` indicating the update completed successfully.

![Validate TE Stack Status](/images/docs/guardrails/guides/hosting-guardrails/troubleshooting/enable-verbose-logging/cfn-workspace-te-stack-validation.png)

## Step 8: Search for Troubleshooting Data

With verbose logging now enabled, you can navigate to CloudWatch service and find the Log Group(s) for **/{turbot_prefix}/{te_version}/events** or **/{turbot_prefix}/{te_version}/api** to investigate generated events and check for required troubleshooting data.

> [!IMPORTANT]
> When troubleshooting is complete, turn off verbose logging. Go to the SSM Console and repeat steps 1 to 5. Edit the `log_level` back to `debug`.

If you encounter any issues, please [Open Support Ticket](https://support.turbot.com) and attach the relevant information to assist you more efficiently.

- A screenshot of the SSM workspace parameter value.
- A screenshot of the CloudFormation Events tab for the TE stack.
- A screenshot of the Service Catalog TE provisioned product.