---
title: Decommission Account out of Guardrails Workspace
template: Documentation
nav:
  order: 50
---

# Decommission an AWS account out of a Guardrails workspace

Turbot Guardrails natively allows a Guardrails administrator to remove an AWS account from a workspace.
The delete action removes any associated policies and references in the
Guardrails CMDB, but NO RESOURCES ARE DELETED FROM THE TARGET ACCOUNT. Careful
consideration must be made when removing resources within the account, as once
data is deleted, such as CloudTrail and logs in S3, it cannot be restored.

Before the delete process is started, administrators will want to determine if
they would like to keep Guardrails-managed resources in the account, such as S3 buckets, or CloudTrail. 
The following policies can be set at the AWS account within the Guardrails workspace to
facilitate cleanup. Be sure to verify that the exceptions are being set ONLY on the account that will be removed.

1. `AWS > Turbot > Permissions` set to `Enforce: None`. This will remove Guardrails-managed
   IAM policies, groups, roles and users. 
2. `AWS > Turbot > Audit Trail` set to `Enforce: Not configured`. This will
   remove the Guardrails-managed CloudTrail.
3. `AWS > Turbot > Event Handlers` set to `Enforce: Not configured`. This will
   remove Guardrails-managed Cloudwatch Event Rules and SNS topics. Refer to the
   [Event Handler documentation](guides/aws/event-handlers) for additional
   context.
4. `AWS > Turbot > Service Roles` set to `Enforce: Not configured`. This will
   remove any Guardrails-managed IAM service roles.
5. `AWS > Turbot > Logging > Bucket` set to `Enforce: Not configured`. This will
   remove Guardrails-managed logging S3 buckets.  Note: Logging buckets cannot be deleted
   if they are not empty. Administrators can empty the bucket using the AWS
   console.
6. `AWS > Turbot > Event Poller` to `Disabled`. When event handlers are set to
   `Skip` or `Enforce: Not Configured`, Polling is automatically enabled. It
   must be explicitly disabled. Note that full cleanup of event handler
   resources requires event pollers to still be active. Disable Event Pollers
   _after_ verifying that all Event Handler infrastructure has been removed from
   the account.

Once the controls associated with the above policies have completed, the AWS
account can be deleted from the Guardrails workspace. Any combination of the policies can be used
to target specific resources while leaving important audit logging data available.

## Steps to remove an account from Guardrails

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

A time-out error may occur when deleting an account; the delete function is a complex SQL
transaction, and failures in referential integrity or other blocking/locking
database activity can cause the delete to fail.  Should the account delete transaction timeout,
the Guardrails DB will roll back the transaction and the account remains in the workspace.

If an error message is encountered, ensure that AWS event handlers
for that account have been removed in all regions so no new transactions are incoming,
remove the policy settings at the account level that contain the security
credentials Guardrails uses to access the account, and try again. It may take
several attempts to delete the account. If the deletion error persists for more
than several hours after removing the event handlers, and you have verified that
no account activity is taking place in the `Activity` tab, please open a ticket
with Turbot Support.
