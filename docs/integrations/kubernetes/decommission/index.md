---
title: Decommission a Cluster Out of a Guardrails Workspace
template: Documentation
nav:
  title: "Decomission"
  order: 30
---

# Decommission a Kubernetes Cluster Imported into Guardrails

To remove a Kubernetes cluster from Guardrails, you will need to:
- Uninstall the agent from the cluster
- Delete the cluster resource in Guardrails

## Uninstall Agent

To remove all the Kubernetes components associated with the chart and delete the release:

```sh
helm uninstall guardrails-agent-kubernetes --namespace guardrails
```

## Remove Clusters from Guardrails

Afterward, to remove the cluster from Guardrails:

1. Using the Guardrails console, navigate to the cluster that needs to be removed.
2. Click **Actions** then **Remove from Turbot** in the top right corner. If you do not see this button, reach out to your Guardrails
   administrator for proper access.
3. In the popup window, copy the cluster name and paste in the text box.
4. Click `Delete`. While this is not irreversible (simply redeploy the agent), it can be time and resource consuming.
   Be sure to double and triple check!
5. Guardrails will begin the delete process. The time to complete the deletion will depend on the number of resources and
   policies that will be removed. The more resources that are being deleted, the longer the process will take.

An error in deleting a cluster may occur; the delete function is a complex SQL transaction, and failures in referential
integrity or other blocking/locking database activity can cause the delete to fail.

If an error message is encountered, ensure that the Guardrails agent is removed and try again. If the deletion error
persists and you have verified that the agent has been uninstalled, please open a ticket with [Turbot Support](mailto:help@turbot.com).

