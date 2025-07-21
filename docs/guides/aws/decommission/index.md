---
title: Disconnect Account from Guardrails Workspace
template: Documentation
nav:
  order: 50
---

# Disconnect an AWS account from a Guardrails workspace

As a part of Guardrails workspace maintenance, AWS accounts need to be removed. There are two parts to this process:

1. [Decommission Guardrails-managed resources](#decommission-guardrails-infrastructure) in the AWS account, where
   desired. Altering the relevant policy settings
   will
   make changes in the AWS account. Administrators should determine if they would like to keep
   Guardrails-managed resources in the account, such as S3 buckets, or CloudTrail. Event Handlers should always be
   removed.
2. [Disconnect the AWS account from Guardrails](#disconnect-aws-account-from-guardrails) . This is Guardrails-side only
   change. No changes are made in the AWS
   account.

Note that disconnecting an AWS account from Guardrails will remove all child CMDB records and policy settings.

## Decommission Guardrails Infrastructure

To ensure complete cleanup of Guardrails-managed resources, create the policy settings below with the
prescribed values. If you wish to retain those resources, do not create the policy setting. Time should be allowed for
Guardrails to complete the removal process for these resources. It is safe to create these policy settings, even if
there is no corresponding `Enforce: Enabled`

1. `AWS > IAM > User > Boundary` set to `Enforce: No Boundary`. This will remove boundary policy (if any) from the IAM users.
2. `AWS > IAM > Role > Boundary` set to `Enforce: No Boundary`. This will remove boundary policy (if any) from the IAM roles.
3. `AWS > Turbot > Permissions > Superuser Boundary` set to `No Boundary`. This will disable the boundary for superusers.
4. `AWS > Turbot > Permissions > User Boundary` set to `No Boundary`. This will disable the boundary for users.
5. `AWS > Turbot > Permissions` set to `Enforce: None`. This will remove Guardrails-managed
   IAM policies, groups, roles and users.
6. `AWS > Turbot > Audit Trail` set to `Enforce: Not configured`. This will
   remove the Guardrails-managed CloudTrail.
7. `AWS > Turbot > Event Handlers` set to `Enforce: Not configured`. This will
   remove Guardrails-managed Cloudwatch Event Rules and SNS topics. Refer to the
   [Event Handler documentation](integrations/aws/event-handlers) for additional
   context.
8. `AWS > Turbot > Event Handlers [Global]` set to `Enforce: Not configured`. This will
   remove Guardrails-managed Cloudwatch Event Rules and SNS topics.
9. `AWS > Turbot > Service Roles` set to `Enforce: Not configured`. This will
   remove any Guardrails-managed IAM service roles.
10. `AWS > Turbot > Logging > Bucket` set to `Enforce: Not configured`. This will
    remove Guardrails-managed logging S3 buckets. Note: Logging buckets cannot be deleted
    if they are not empty. Administrators can empty the bucket using the AWS
    console.
11. `AWS > Turbot > Event Poller` to `Disabled`. When event handlers are set to
    `Skip` or `Enforce: Not Configured`, Polling is automatically enabled. It
    must be explicitly disabled. Note that full cleanup of event handler
    resources requires event pollers to still be active. Disable Event Pollers
    _after_ verifying that all Event Handler infrastructure has been removed from
    the account.

Once the controls associated with the above policies have completed, the AWS
account can be disconnected from the Guardrails workspace.

## Disconnect AWS Account from Guardrails

Prior to performing the below steps, delete the policies
`AWS > Account > Turbot IAM Role > External ID` and
`AWS > Account > Turbot IAM Role` configured on the target account. Once they
have been removed, the account can be deleted from Guardrails.

1. In the Guardrails console, navigate to the account that needs to be removed.
2. Click the **Delete** button in the top right. If you do not see the delete
   button, reach out to your Guardrails workspace administrator for proper access.
3. In the pop-up dialog box, copy the account ID and paste in the text box.
4. Click `Delete`. While this is not irreversible (simply reimport the account),
   it can be time and resource consuming. Be sure to double and triple check!
5. Guardrails will begin the delete process. The time to complete the deletion will
   depend on the number of resources and policies that will be removed. The more
   resources that are being deleted, the longer the process will take.

## Troubleshooting

The disconnection step may time out due to a number of factors including but not limited to overall system load, and the
number of resources in the account. The general aim is to reduce the number of resources in the account.

### Manual Resource Count Reduction

1. From the Guardrails landing page, find the AWS Account to be disconnected.
2. On the Account resource page, go to the little **Reports** tab. Look at the "Top Resource Types" on the left side.
   These are the resource to target first.
3. Switch back to the little **Policies** tab. Click the green "New Policy Setting" button.
4. Search for the CMDB policy for the top resource type. It will be in the form
   of `AWS > {Service} > {Resource Type} > CMDB`.
5. The Resource field should already be set to the AWS Account to be disconnected.
6. Set the CMDB policy to `Enforce: Disabled`. This will instruct Guardrails to purge all resource records for this
   resource type.
7. Click the "Create" button.
8. Over the next few minutes Guardrails will purge those resource CMDB entries and the overall resource count in the
   account will go down.
9. Attempt to disconnect the account. If this times out, continue steps 3 through 8 until the account is successfully
   disconnected.

### Automated Resource Count Reduction

1. Use the
   `aws_account_delete` [script in the Guardrails Samples Repo (GSR)](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/remove_aws_account)
   to automate the process of creating the CMDB policy settings and disconnecting the account.
2. Refer to
   the [README](https://github.com/turbot/guardrails-samples/blob/main/guardrails_utilities/python_utils/remove_aws_account/README.md)
   for further instructions on how to set up and run the script.

It may take several attempts to delete the account. If the account cannot be disconnected even after drastic reductions
in resource counts, please open a ticket with [Turbot Support](mailto:help@turbot.com) for further assistance.

## How Disconnection Works

When a user with sufficient permissions attempts to disconnect an AWS account, Guardrails will try to remove the
account, all child resources, controls, policy settings in a single SQL transactions. This is done for safety. Should
the transaction fail, it's trivial for the database to roll back to a known good state. The effect of this rollback is
that the account remains visible in Guardrails. AWS accounts with larger numbers of resources, the time required to
complete the transaction may exceed the statement timeout limit.
