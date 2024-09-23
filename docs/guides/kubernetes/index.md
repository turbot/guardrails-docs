---
title: Governing Kubernetes
template: Documentation
nav:
  order: 10
---

# Governing Kubernetes

Turbot Guardrails is deeply integrated with [Kubernetes](https://kubernetes.io/):
- Sync in your Kubernetes cluster and resource details to Turbot Guardrails.
- Guardrails' event handlers keep the Guardrails CMDB up to date as resources are created, modified, and destroyed.
- Guardrails shows all activity in your Kubernetes clusters - you can quickly see what happened, when the activity occurred, and exactly what changed.

# Getting Started with Guardrails for Kubernetes

1. [Import a Kubernetes cluster](integrations/kubernetes/import-kubernetes-cluster) into a Guardrails Folder.
2. [Configure queries](integrations/kubernetes/configure-queries) for resources.

## Further Reading

- Explore [Kubernetes Mods](https://hub.guardrails.turbot.com/mods/kubernetes/mods)
- Explore [ServiceNow Kubernetes Mods](https://hub.guardrails.turbot.com/mods/servicenow/mods?q=kube)
- Review the announcement posts:
  - [Kubernetes Security Posture Management](https://turbot.com/guardrails/blog/2024/05/kubernetes-security-posture-management)
  - [Real-time Kubernetes discovery for ServiceNow CMDB](https://turbot.com/guardrails/blog/2024/05/servicenow-kubernetes-discovery)
