---
title: Quick Actions
sidebar_label: Quick Actions
---

## Quick actions

Quick Actions allow users to initiate specific (one time) control enforcements on their cloud environment via the Guardrails UI. Cloud operations teams can use Quick Actions to remediate cloud configuration issues (e.g. enable encryption on a resource) or snooze Guardrails alarms for issues that we want to come back to later.

Action types are specific to the service and the resource, meaning that S3 Buckets will have different available action types than an EC2 instance. To see what actions are available for a given resource you can click the action button, which will reveal a dropdown menu with available actions, based on your settings and permissions:

![](/images/docs/guardrails/quick_action_kms.png)

Currently this feature is only supported for `AWS` mods but we intend to increase coverage for Azure, GCP and other AWS resources in the coming months. The list of mods which support quick actions at launch are:
- cloudtrail
- ec2
- kms
- lambda
- rds
- s3
- sns
- sqs
- vpc

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
