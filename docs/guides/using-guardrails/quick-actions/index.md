---
title: Quick Actions
sidebar_label: Quick Actions
---

# Quick Actions

In this guide, you will:
- Use Guardrails console to enable quick actions in your environment.

[Quick Actions](/guardrails/docs/reference/glossary#quick-actions) provide an efficient way to remediate cloud configuration issues, snooze compliance alarms, and execute operational tasks directly from the Compliance Dashboard. These actions are tailored to specific services, meaning available options differ based on the resource type (e.g., S3 Buckets vs. EC2 Instances). Once enabled in a workspace, Quick Actions can be accessed and executed via the Actions button on the resource detail page.

## Prerequisites

- **Turbot/Admin** permissions at the Turbot resource level.
- Turbot Guardrails v5.39.0 or higher.
- Familiarity with Guardrails console.

UPDATE AS NEEDED

<!-- Currently this feature is only supported for `AWS` mods but we intend to increase coverage for Azure, GCP and other AWS resources in the coming months. The list of mods which support quick actions at launch are: -->

Currently this feature is only supported for:

| **Cloud Provider** | **Services** |
|-------------|-------------|
| AWS         | CloudTrail, EC2, KMS, Lambda, RDS, S3, SNS, SQS, VPC |


This section demonstrates how to enable quick actions.

<!-- ## Quick Actions

Quick Actions allow users to initiate specific (one time) control enforcements on their cloud environment via the Guardrails UI. Cloud operations teams can use Quick Actions to remediate cloud configuration issues (e.g. enable encryption on a resource) or snooze Guardrails alarms for issues that we want to come back to later.

Action types are specific to the service and the resource, meaning that S3 Buckets will have different available action types than an EC2 instance. To see what actions are available for a given resource you can click the action button, which will reveal a dropdown menu with available actions, based on your settings and permissions: -->

<!-- ![](/images/docs/guardrails/quick_action_kms.png) -->

<!-- ## Step 1: Login to Guardrails Console

Log into the Guardrails console with provided local credentials or by using any SAML based login.

![Guardrails Console Login](/images/docs/guardrails/guides/using-guardrails/quick-actions/guardrails-console-login.png) -->

## Step 1: Navigate to Policies

Log into the Guardrails console with provided local credentials or by using any SAML based login. Select **Policies** from the top navigation menu.

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
Choose the `Turbot` resource level to apply changes across the entire environment or select an individual account for testing.

![Create Setting](/images/docs/guardrails/guides/using-guardrails/quick-actions/guardrails-select-setting-click-create.png)

The policy setting has been successfully created.

![Create Setting](/images/docs/guardrails/guides/using-guardrails/quick-actions/guardrails-policy-setting-created.png)

## Step 4: Verify Quick Actions

To verify, navigate to the desired resource page, where the **Actions** button should be displayed along with the list of available actions.

![Verify Quick Actions](/images/docs/guardrails/guides/using-guardrails/quick-actions/guardrails-verify-quick-actions.png)

>[!NOTE] Exceptions/changes to the default permissions required for Quick Actions can be set using the `Turbot > Quick Actions > Permission Levels` policy.

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn how to [Apply a Quick Action on a GCP Resource](https://turbot.com/guardrails/docs/getting-started/getting-started-gcp/apply-quick-action#apply-a-quick-action).
- Learn how to [Apply a Quick Action on an Azure Resource](https://turbot.com/guardrails/docs/getting-started/getting-started-azure/apply-quick-action)

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |





ADJUST & REMOVE BELOW

----
## Enabling Quick Actions

There are two policies that determine whether a user is allowed to run quick actions:
- `Turbot > Quick Actions > Enabled`
- `Turbot > Quick Actions > permissions Levels`

Quick actions are disabled by default, to Enable Quick Actions set the `Turbot > Quick Actions > Enabled` policy to Enabled. This can be done at the Turbot level (to affect all accounts), or at the individual account level if you want to test on a specific account.

> [!IMPORTANT]
> Quick Actions use the permissions granted to the Guardrails service user or cross-account role used to import your cloud service account into Guardrails. Execution of quick actions will fail if the underlying role prevents those actions from occurring.

Each action requires that the user has a specific Guardrails permission level. The default permission level needed is defined in the mod. Excpetions/changes to the default permissions required for Quick Actions can be set using the `Turbot > Quick Actions > Permission Levels` policy.

To allow Turbot/Operator to set versioning on an S3 bucket, set the policy at the account level (or higher) like this:
```
- rule: "tmod:@turbot/aws-s3#/action/types/s3BucketVersioningEnabledQuickAction"
  authorization: "forbidden"
- rule: "tmod:@turbot/aws-s3#/action/types/s3Bucket*"
  authorization: "permitted"
  permissions:
  - type: "tmod:@turbot/turbot-iam#/permission/types/turbot"
    level: "tmod:@turbot/turbot-iam#/permission/levels/operator"
```

Changing the value of `authorization` from `permitted` to `forbidden` will deny all users the ability to perform a specific action. The policy also allows for use of widcard characters `*` for rules to set permissions on multiple actions.

Steps to enable Quick Actions on your environment:
1. Update to the latest version of the `@turbot/turbot` mod.
2. Set the policy `Turbot > Quick Actions > Enabled` to `Enabled`. This can be set per account or at the higher level. Setting it to Enabled at Turbot level will Enabled Quick Actions for all accounts.
3. Set the override policy `Turbot > Quick Actions > permissions Levels` if you want to further restrict access to specific quick actions.
