---
title: Decommission Account from Guardrails Workspace Using UI
sidebar_label: Decommission Account from Guardrails Workspace Using UI
---

# Decommission an AWS account from a Guardrails workspace Using UI

In this guide, you will:
- Decommission Guardrails-managed resources in an AWS account.
- Disconnect the AWS account from the Guardrails workspace using the Guardrails console.

As part of regular Guardrails workspace maintenance, it is sometimes necessary to remove AWS accounts. This process involves two key steps: first, [Decommission Guardrails-managed resources](#decommission-guardrails-infrastructure) in the AWS account by updating relevant policy settings—administrators should assess whether to retain resources like S3 buckets or CloudTrail, though Event Handlers must always be removed; second, [Disconnect the AWS account from Guardrails](#disconnect-aws-account-from-guardrails) workspace, which is a change made only on the Guardrails side and does not affect the AWS account itself.

> [!NOTE] Disconnecting an AWS account from Guardrails will remove all child CMDB records and policy settings.

## Prerequisites

- Access to the Guardrails console with **Administrator** privileges.
- Familiarity with the Guardrails Policies.

## Decommission Guardrails-managed resources

To fully clean up Guardrails-managed resources in the AWS account, specific policy settings must be applied with the recommended values. If you intend to retain any of these resources, simply skip applying the corresponding policy. Once configured, allow time for Guardrails to complete the removal process. These policy settings are safe to apply even if there is no existing `Enforce: Enabled` configuration in place.

## Step 1: Navigate to Policies

Log into the Guardrails console with provided local credentials or by using any SAML-based login and select **Policies** from the top navigation menu.

![Navigate to policies](/images/docs/guardrails/guides/aws/decommission/guardrails-navigate-policies.png)

## Step 2: Remove Guardrails-Managed IAM Resources

Set the `AWS > Turbot > Permissions` policy to `Enforce: None`. This will remove Guardrails-managed IAM policies, groups, roles and users.

![Guardrails Permissions](/images/docs/guardrails/guides/aws/decommission/guardrails-turbot-permissions.png)

## Step 3: Remove CloudTrail

Set the `AWS > Turbot > Audit Trail` policy to `Enforce: Not configured`. This will remove the Guardrails-managed CloudTrail.

![Guardrails CloudTrail](/images/docs/guardrails/guides/aws/decommission/guardrails-remove-cloudtrail.png)

## Step 4: Remove Regional Event Handlers

Set the `AWS > Turbot > Event Handlers` policy to `Enforce: Not configured`. This will remove Guardrails-managed Cloudwatch Event Rules and SNS topics. Refer to the [Event Handler documentation](integrations/aws/event-handlers) for additional context.

![Guardrails Regional Event Handlers](/images/docs/guardrails/guides/aws/decommission/guardrails-regional-event-handlers.png)

## Step 5: Remove Global Event Handlers

Set the `AWS > Turbot > Event Handlers [Global]` policy to `Enforce: Not configured`. This will remove Guardrails-managed Cloudwatch Event Rules and SNS topics.

![Guardrails Global Event Handlers](/images/docs/guardrails/guides/aws/decommission/guardrails-global-event-handlers.png)

## Step 6: Remove IAM Service Roles

Set the `AWS > Turbot > Service Roles` policy to `Enforce: Not configured`. This will remove any Guardrails-managed IAM service roles.

![Guardrails IAM Service Roles](/images/docs/guardrails/guides/aws/decommission/guardrails-service-roles.png)

## Step 7: Remove Logging Buckets

Set the `AWS > Turbot > Logging > Bucket` policy to `Enforce: Not configured`. This will remove Guardrails-managed logging S3 buckets. 
   
> [!NOTE] Logging buckets cannot be deleted if they are not empty. Administrators can empty the bucket using the AWS console.

![Guardrails Logging buckets](/images/docs/guardrails/guides/aws/decommission/guardrails-logging-bucket.png)

## Step 8: Disable Event Poller

Set the `AWS > Turbot > Event Poller` policy to `Disabled`.

![Guardrails Event Poller](/images/docs/guardrails/guides/aws/decommission/guardrails-event-poller.png)

> [!IMPORTANT] When event handlers are set to `Skip` or `Enforce: Not Configured`, Polling is automatically enabled. It must be explicitly disabled. Note that full cleanup of event handler resources requires event pollers to still be active. Disable Event Pollers _after_ verifying that all Event Handler infrastructure has been removed from the account.

Once the controls associated with the above policies have completed, the AWS account can be disconnected from the Guardrails workspace.

## Reduce Resource Count

## Step 9: Navigate to Account

Navigate to the AWS Account to be disconnected and select the **Metrics** tab.

![Navigate to Account](/images/docs/guardrails/guides/aws/decommission/guardrails-locate-account.png)

## Step 10: Locate Top Resource Types

Look at the `Top Resource Types` on the left side. These are the resources to target first.

![Top Resource Types](/images/docs/guardrails/guides/aws/decommission/guardrails-top-resource-types.png)

## Step 11: Locate Policies

Switch to the **Policies** tab. Click the **New Policy Setting** button.

![Select policies](/images/docs/guardrails/guides/aws/decommission/guardrails-select-policies.png)

## Step 12: Create Resource CMDB Policy

Find the CMDB policy in the format `AWS > {Service} > {Resource Type} > CMDB`, set it to **Enforce: Disabled**, and choose **Create**. This instructs Guardrails to purge all resource records for this resource type.

![Create Resource CMDB policy](/images/docs/guardrails/guides/aws/decommission/guardrails-locate-resource-cmdb-policy.png)

Over the next few minutes Guardrails will purge those resource CMDB entries and the overall resource count in the account will reduce.

> [!Note] If this Attempt to disconnect the account times out, continue steps 3 through 8 until the account is successfully
   disconnected.

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Account Disconnection Fails | Account cannot be disconnected even after drastic reductions in resource counts. | please open a ticket with [Turbot Support](mailto:help@turbot.com) for further assistance. |
| Remove from Turbot Dropdown Unavailable | The Remove from Turbot action is unavailable on the resource detail page. | Reach out to your Guardrails workspace administrator to validate proper access. |
| Common errors                     | Common issues that may prevent controls from running include network connectivity problems, permission issues, and API rate limits. These can cause controls to enter an error state. | Refer to [Common Troubleshooting](/guardrails/docs/guides/troubleshooting) for detailed resolution steps. |
| Further Assistance                       | If you encounter further issues, please open a ticket with us and attach the relevant information to assist you more efficiently. | [Open Support Ticket](https://support.turbot.com) |