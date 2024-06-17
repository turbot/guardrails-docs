---
title: Decommission a Project out of a Guardrails Workspace
template: Documentation
nav:
  order: 50
---

# Decommission a GCP project imported into Guardrails

Guardrails natively allows an administrator to remove a GCP project from a Guardrails workspace. The delete action removes any
associated policies and references in the database, but NO RESOURCES ARE DELETED FROM THE TARGET PROJECT. Careful
consideration must be made when removing resources within the project, as once data is deleted, such as Pub/Sub topic
and logging sink, it cannot be retrieved.

Before the delete process is started, administrators will want to determine if they would like to keep Guardrails resources
in the project, such as Pub/Sub topics, subscription, and logging sink. The following policies can be set at the GCP
project level within Guardrails to facilitate cleanup. Be sure to verify that the exceptions are being set ONLY on the
project that will be removed.

1. `GCP > Turbot > Permissions` set to `Enforce: None`. This will remove Guardrails-managed roles and users in IAM.
2. `GCP > Turbot > Event Handlers > Logging` set to `Enforce: Not configured`. This will remove the Guardrails configured
   logging sink.
3. `GCP > Turbot > Event Handlers > Pub/Sub` set to `Enforce: Not configured`. This will remove Guardrails created Pub/Sub
   topic and subscription.
4. `GCP > Turbot > Event Poller` to `Disabled`. This will disable the pulling of events into Guardrails.

Once the controls associated with the above policies have completed, the GCP project can be deleted from the Guardrails workspace. Any
combination of the policies can be used to target specific resources while leaving important audit logging data
available.

## Steps to remove a project from a Guardrails Workspace

Prior to performing the below steps, delete the policies `GCP > Client Email` and `GCP > Private Key` configured on the
target project. Once they have been removed, the project can be deleted from a Guardrails workspace.

1. Using the Guardrails console, navigate to the project that needs to be removed.
2. Click the **Delete** button in the top right corner. If you do not see the delete button, reach out to your Guardrails
   administrator for proper access.
3. In the popup window, copy the project ID and paste in the text box.
4. Click `Delete`. While this is not irreversible (simply reimport the project), it can be time and resource consuming.
   Be sure to double and triple check!
5. Guardrails will begin the delete process. The time to complete the deletion will depend on the number of resources and
   policies that will be removed. The more resources that are being deleted, the longer the process will take.

An error in deleting a project may occur; the delete function is a complex SQL transaction, and failures in referential
integrity or other blocking/locking database activity can cause the delete to fail.

If an error message is encountered, ensure that all the Guardrails event handlers for that project are removed so no new
transactions are incoming, remove the policy settings at the project level that contain the security credentials Guardrails
uses to access the project, and try again. It may take several attempts to delete the project. If the deletion error
persists for more than several hours after removing the event handlers, and you have verified that no project activity
is taking place in the `Activity` tab, please open a ticket with [Turbot Support](mailto:help@turbot.com).