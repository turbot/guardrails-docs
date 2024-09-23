---
title: Decommission Subscription from Guardrails
template: Documentation
nav:
  order: 50
---

# Decommission Azure resources imported out of a Guardrails Workspace

Guardrails natively allows an administrator to remove Azure resources (tenant, management group, active directory,
subscription) from a Guardrails workspace. The delete action removes any associated policies and references in the database, but NO
RESOURCES ARE DELETED FROM THE TARGET AZURE RESOURCES. Careful consideration must be made when removing cloud resources
as once data is deleted, such as Action Group and Activity Log Alert, it cannot be retrieved.

Before the delete process is started, administrators will want to determine if they would like to keep Turbot resources
such as Action Group and Activity Log Alert. The following policies can be set at the required resource (tenant,
management group, active directory, subscription) level within Guardrails to facilitate cleanup.

1. `Azure > Turbot > Permissions` set to `Enforce: None`. This will remove Guardrails-managed IAM policies, roles and users.
2. `Azure > Turbot > Resource Group` set to `Enforce: Not configured`. This will remove the Guardrails configured resource
   group.
3. `Azure > Turbot > Event Handlers` set to `Enforce: Not configured`. This will remove Guardrails created Action Group and
   Activity Log Alert.
4. `Azure > Turbot > Event Poller` to `Disabled`. This will disable the pulling of events into Guardrails for processing.
5. `Azure > Turbot > Management Group Event Poller` to `Disabled`. This will stop discovering of events into Guardrails.
6. `Azure > Turbot > Directory Event Poller` to `Disabled`. This will disable the pulling of events into Guardrails.

Once the controls associated with the above policies have completed, the Azure subscription can be deleted from Guardrails. Any
combination of the policies can be used to target specific resources while leaving important audit logging data
available.

## Steps to remove an Azure resources from Guardrails

Prior to performing the below steps, delete the
policies `Azure > Client ID`, `Azure > Client Key`, `Azure > Environment` and `Azure > Tenant ID` configured on the
target resource. Once they have been removed, the Azure resource can be deleted from Turbot.

1. Using the Turbot UI, navigate to the resource (tenant, subscription, management group and active directory) that
   needs to be removed from Turbot.
2. Click the **Delete** button in the top right. If you do not see the delete button, reach out to your Turbot
   administrator for proper access.
4. In the pop up window, copy the resource ID and paste in the text box.
5. Click `Delete`. While this is not irreversible (simply reimport the resource), it can be time and resource consuming.
   Be sure to double and triple check!
6. Turbot will begin the delete process. The time to complete the deletion will depend on the number of resources and
   policies that will be removed. The more resources that are being deleted, the longer the process will take.

An error in deleting an Azure resource may occur; the delete function is a complex SQL transaction, and failures in
referential integrity or other blocking/locking database activity can cause the delete to fail.

If an error message is encountered, ensure that all of the Turbot event handlers for that Azure resource is removed so
no new transactions are incoming and try again. It may take several attempts to delete the Azure resource. If the
deletion error persists for more than several hours after removing the event handlers, and you have verified that no
Azure resource activity is taking place in the `Activity` tab, please open a ticket with Turbot support.