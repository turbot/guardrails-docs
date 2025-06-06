---
title: Quick Actions
sidebar_label: Quick Actions
---

# Quick Actions

In this guide, you will:
- Use Guardrails console to enable Quick Actions in your environment.


[Quick Actions](/guardrails/docs/reference/glossary#quick-actions) enable users to perform one-time control enforcements within their cloud environment through the Guardrails UI. They provide an efficient way to remediate cloud configuration issues (e.g., enabling encryption on a resource), snooze compliance alarms, and execute operational tasks via the Compliance Dashboard.

Quick Actions are tailored to specific cloud services, meaning available options vary based on the resource type (e.g., S3 Buckets vs. EC2 Instances). Once enabled in a workspace, Quick Actions can be accessed and executed via the **Actions** button on the resource detail page.

This feature is currently supported across major AWS, Azure, and GCP mods. Below is a list of mods that support Quick Actions:

| **Cloud Provider** | **Services**                                          |
|-------------------|------------------------------------------------------|
| AWS              | CloudTrail, EC2, KMS, Lambda, RDS, S3, SNS, SQS, VPC |
| Azure            | Compute, IAM, Network, Storage                      |
| GCP              | Bigtable, ComputeEngine, IAM, Storage               |

>[!IMPORTANT] Quick Actions use the permissions granted to the Guardrails service user or cross-account role used to import your cloud service account into Guardrails. Execution of quick actions will fail if the underlying role prevents those actions from occurring.

## Prerequisites

- **Turbot/Admin** permissions at the Turbot resource level.
- Turbot Guardrails v5.39.0 or higher.
- Familiarity with the Guardrails console.

## Step 1: Navigate to Policies

Log into the Guardrails console with provided local credentials or by using any SAML based login and Select **Policies** from the top navigation menu.

![Select Policies](/images/docs/guardrails/guides/using-guardrails/quick-actions/guardrails-select-policies.png)

Choose **Turbot** from the list.

![Select Turbot](/images/docs/guardrails/guides/using-guardrails/quick-actions/guardrails-select-turbot.png)

## Step 2: Select Quick Actions

Quick actions are `Disabled` by default, To enable them, locate **Turbot > Quick Actions** policy.

![Locate Quick Actions](/images/docs/guardrails/guides/using-guardrails/quick-actions/guardrails-search-quick-actions.png)

Select the **Turbot > Quick Actions > Enabled** policy.

![Select Enabled Policy](/images/docs/guardrails/guides/using-guardrails/quick-actions/guardrails-select-quick-actions-enabled.png)

## Step 3: Enable Quick Actions

On the `Turbot > Quick Actions > Enabled` page, select **New Policy Setting**.

![Select New Policy Setting](/images/docs/guardrails/guides/using-guardrails/quick-actions/guardrails-select-new-policy-setting.png)

Select the desired `Resource` to enable quick actions, set Setting to `Enabled`, and select **Create**.
Choose the `Turbot` resource level to apply changes across the entire environment or `select an individual account for testing`.

![Create Setting](/images/docs/guardrails/guides/using-guardrails/quick-actions/guardrails-select-setting-click-create.png)

The policy setting has been successfully created.

![Create Setting](/images/docs/guardrails/guides/using-guardrails/quick-actions/guardrails-policy-setting-created.png)

## Step 4: Apply Quick Actions

To apply, navigate to the desired resource page and select the appropriate action from the **Actions** button, which displays a list of available actions.

![Apply Quick Actions](/images/docs/guardrails/guides/using-guardrails/quick-actions/guardrails-verify-quick-actions.png)

## Enable Quick Actions Permissions

This section is optional and can be configured based on specific use cases.

Each Quick Action requires a designated Guardrails permission level, which is predefined within the respective mod. Any *exceptions or modifications* to these default permissions can be configured using the `Turbot > Quick Actions > Permission Levels` policy.

For example, to grant `Turbot/Operator` the ability to enable versioning on an S3 bucket, set the policy at the account level (or higher) as shown in the example below.

- Changing the `authorization` value from `permitted` to `forbidden` will **restrict all users** from performing the specified action.
- Wildcard characters (`*`) can be used to apply permissions across multiple actions.

![Quick Action Permission](/images/docs/guardrails/guides/using-guardrails/quick-actions/quick-actions-permissions.png)

```
- rule: "tmod:@turbot/aws-s3#/action/types/s3BucketVersioningEnabledQuickAction"
  authorization: "forbidden"
- rule: "tmod:@turbot/aws-s3#/action/types/s3Bucket*"
  authorization: "permitted"
  permissions:
  - type: "tmod:@turbot/turbot-iam#/permission/types/turbot"
    level: "tmod:@turbot/turbot-iam#/permission/levels/operator"
```

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn how to [Apply a Quick Action on a GCP Resource](/guardrails/docs/getting-started/getting-started-gcp/apply-quick-action#apply-a-quick-action).
- Learn how to [Apply a Quick Action on an Azure Resource](/guardrails/docs/getting-started/getting-started-azure/apply-quick-action)

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Further Assistance                       | If you encounter issues with Quick Actions, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |
