---
title: Hosting Guardrails
---

# Hosting Turbot Guardrails Enterprise

![Turbot Guardrails High-Level Physical Architecture](/images/docs/guardrails/physical-architecture.png)

Turbot Guardrails Enterprise is a standalone installation of Turbot, designed to run inside your organization's network and infrastructure. It provides the full capabilities of Turbot, but with full control over the network architecture, upgrade process, security configuration and environment access.

Guardrails Enterprise is a cloud-native application, built from the ground up on Amazon Web Services (AWS).

The Guardrails Enterprise installation is highly customizable, allowing you to deploy Guardrails in the way that most appropriately balances your availability, performance, security, and cost requirements.
- Guardrails can be installed in up to 3 availability zones per region.
- Guardrails was designed as a multi-tenant application, providing logical and physical separation of workspaces.
- Guardrails leverages AWS native services, containers, and serverless compute to minimize costs and administrative overhead.
