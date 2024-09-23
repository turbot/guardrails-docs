---
title: "Importing a Kubernetes Cluster into Guardrails"
template: Documentation
nav:
  title: "Importing Clusters"
  order: 10
---

# Importing a Kubernetes Cluster into Guardrails

Kubernetes clusters can be imported into Guardrails with the use of an agent
that reports resource data within the cluster. The agent runs in a StatefulSet
alongside the other components in the cluster and always runs in a single pod.

## Prerequisites

The following must be installed in order to run the enrollment steps:

- [Helm](https://helm.sh/docs/intro/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

## Turbot Guardrails Workspace Setup

### Mods

The following [mods](https://turbot.com/guardrails/docs/mods) need to be installed:
- [turbot/osquery](https://turbot.com/guardrails/docs/mods/turbot/osquery)
- [turbot/kubernetes](https://turbot.com/guardrails/docs/mods/kubernetes/kubernetes)

If using the [ServiceNow integration](https://turbot.com/guardrails/docs/guides/servicenow) to sync Kubernetes data into ServiceNow, the following mods need to be installed:
- [turbot/servicenow](https://turbot.com/guardrails/docs/mods/servicenow/servicenow)
- [turbot/servicenow-kubernetes](https://turbot.com/guardrails/docs/mods/servicenow/servicenow-kubernetes) (if using the ServiceNow integration)

For ServiceNow integration, a [ServiceNow instance should be imported into Guardrails](https://turbot.com/guardrails/docs/guides/servicenow/import-servicenow-instance) as well.

### Policies

After installing the osquery mod, the `Turbot > Workspace > osquery` policy is set to `Enabled` by default. If set to `Enabled`, the osquery APIs are also enabled, so we recommend setting this policy as `Enabled`.

By default, the enroll secret returned by Guardrails expires every hour, but you can change this expiration period in the `Turbot > Workspace > osquery > Enroll Secret Expiration`. This is helpful if you want to reuse the same enroll secret over time in automated deployments.

### Set Kubernetes Context

Before running the install script, set your kubeconfig context to the correct Kubernetes cluster.

For more information on setting context for cloud providers:

- AWS: https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html
- Azure: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli#connect-to-the-cluster
- GCP: https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl#interact_kubectl

### Persistent Storage

By default, the Helm chart attempts to use the cluster's default StorageClass to dynamically provision a PersistentVolumeClaim (PVC) for the StatefulSet.

Many Kubernetes clusters from cloud providers no longer include in-tree storage provisioners by default, so you will need to install drivers like the [AWS EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html), [Azure CSI driver](https://learn.microsoft.com/en-us/azure/aks/csi-storage-drivers), or [GCE PD CSI driver](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/gce-pd-csi-driver) in order for the agent to install successfully.

We recommend leaving persistence enabled when installing the agent to avoid
disruptions to the osquery database; however, you can disable it by modifying
`guardrails-values.yaml` before running `helm install`:

```yml
persistence:
  enabled: false
```

For additional values related to persistence, please see [Helm chart values](https://github.com/turbot/helm-charts/tree/main/charts/guardrails-agent-kubernetes#values).

### Install Agent

1. Ensure your kubectl config context is set properly.
2. Login to your Guardrails workspace as a **Turbot/Owner** or **Turbot/Admin**.
3. Click the purple **Connect** card in the top right of the landing page.
4. Click **Kubernetes Cluster**.
5. Select the **Parent Resource** (resources from the Kubernetes cluster will be automatically imported and managed under this resource).
6. Download or copy the generated script and then run it to install the Helm chart containing the agent.

#### Verify Agent Deployment

After installing the agent, if enrollment is successful, a Kubernetes cluster resource and its related resources will be created under the parent resource.

The `Turbot > osquery > Configuration` calculated policy contains the configuration osquery uses, including the queries, so this will need to finish calculating before any resources will be created for that cluster in Guardrails.

If you still do not see any resources for that cluster being created, please check if the value for the `Turbot > osquery > Configuration` policy is available.

### Update Agent

To update an installed agent with a new Helm chart version, run the following commands:

```sh
helm repo update
helm upgrade guardrails-agent-kubernetes turbot/guardrails-agent-kubernetes --namespace guardrails --reuse-values
```

To update the values for an existing release, pass in the new values with the `-f` flag:

```sh
helm upgrade guardrails-agent-kubernetes turbot/guardrails-agent-kubernetes --namespace guardrails --reuse-values -f guardrails-values.yaml
```

Only values included in `guardrails-values.yaml` will be updated, with priority being given to new values.

### Cluster Name

Guardrails will attempt to use a friendly name as the cluster name.

These are the current defaults for clusters by cloud provider:
- AWS EKS: The EKS cluster name from the `aws:eks:cluster-name` tag
- GCP GKE: The `cluster-name` from instance metadata

You can also set the title, which will override the defaults above, by adding
an annotation to the StatefulSet containing the agent in
`guardrails-values.yaml`:

```yml
statefulSet:
  annotations:
    guardrails.turbot.com/cluster-name: "my-kube-cluster"
```

And then upgrade the release:

```sh
helm upgrade guardrails-agent-kubernetes turbot/guardrails-agent-kubernetes --namespace guardrails --reuse-values -f guardrails-values.yaml
```

### Troubleshooting

If you do not see the Kubernetes cluster in Guardrails, this most likely means enrollment failed.

Enrollment can fail for a number of reasons:

- The agent isn't running, which can be verified with `kubectl`:
  ```sh
  kubectl get sts --namespace guardrails
  ```
- The agent is running but has encountered an error while making the enroll request. To view the logs with `kubectl`:
  ```sh
  kubectl logs sts/guardrails-agent-kubernetes -f --namespace guardrails
  ```
- The enroll secret is expired. To verify you have the latest enroll secret, run this GraphQL query:
  ```graphql
  {
    osquery(resource: "[FOLDER_RESOURCE_ID]" resourceTypeUri:"tmod:@turbot/kubernetes#/resource/types/cluster") {
      enrollSecret
    }
  }
  ```
- An old enroll secret exists in the cluster. To delete the previous secret:
  ```sh
  kubectl delete secret guardrails-agent-kubernetes-secret --namespace guardrails
  ```

## Next Steps

1. [Configure queries](guides/kubernetes/configure-queries) for resources.
2. Setup the [sync from cloud resources with Turbot Guardrails to ServiceNow](/guardrails/docs/guides/servicenow/guardrails-to-servicenow-sync).

## Further Reading

Additional context and demos about these features:
- [Kubernetes Security Posture Management](https://turbot.com/guardrails/blog/2024/05/kubernetes-security-posture-management)
- [Real-time Kubernetes discovery for ServiceNow CMDB](https://turbot.com/guardrails/blog/2024/05/servicenow-kubernetes-discovery)

We want to hear from you! Join our [Slack Community](https://turbot.com/community/join) `#guardrails` channel to ask questions and share feedback.
