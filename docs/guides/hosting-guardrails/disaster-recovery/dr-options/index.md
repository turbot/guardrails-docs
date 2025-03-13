---
title: "DR Options"
sidebar_label: "Disaster Recovery Architecture Options"
---

# Disaster Recovery Architecture Options

## Overview

Turbot Guardrails is a full-stack governance platform that automates discovery and remediation of your organization's compliance, security, and operational objectives.

As a security control plane tool, it is important that Guardrails be configured with high-availability and disaster recovery in mind.

This document outlines architectures to achieve the appropriate level of high-availability  
and disaster recovery, depending on the organizations risk requirements.

- **Tier 1** – Single-account, single-region, single availability zone.

  - 99% Availability
  - RTO: 4 Hr.
  - RPO: 4 Hr.
  - Use cases: Development and non-prod environments

- **Tier 2** – Single-account, single-region, multi-availability zone.

  - 99.9% Availability
  - RTO: 4 Hr.
  - RPO: 4 Hr.
  - Use cases: Production deployments without need for rapid DR

- **Tier 3** – Single-account, multi-region, multi-availability zone.

  - 99.9% Availability
  - RTO: 2 Hr.
  - RPO: 1 Hr.
  - Use cases: Production deployments with need for rapid DR

- **Tier 4** – Multi-account, multi-region, multi-availability zone.
  - 99.99% Availability
  - RTO: 0 Hr.
  - RPO: 0 Hr.
  - Use cases: Mandated zero downtime DR

## TIER 1 - Development

**Key Characteristics**: Single-account, single-region, single availability zone.

This deployment option is appropriate for non-production and development workspaces, where high-availability and disaster recovery are not important for the accounts monitored by guardrails.

This is the lowest cost infrastructure deployment option available.

![Tier 1 DR Architecture](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/dr-options/tier-1.png)

This deployment uses one primary RDS instance without a failover configuration. Recovery can be performed from RDS point-in-time backups.

## TIER 2 – High Availability

**Key Characteristics**: Single-account, single-region, multi-availability zone.

This deployment option is appropriate for all production usage. It is the most cost-effective deployment option for production use cases and has the capability to achieve 4hr RPO/RTO in all circumstances except the loss of an entire AWS Region.

![Tier 2 DR Architecture](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/dr-options/tier-2.png)

The changes in this deployment vs the **Tier 1 DR** architecture are:

1. The ECS compute cluster is deployed across multiple availability zones.
2. Lambda are deployed across multiple availability zones.
3. An RDS failover instance is deployed in a second availability zone.
4. An Elasticache failover instance is deployed in a second availability zone.

## TIER 3 – Multi Region

**Key Characteristics**: Single-account, multi-region, multi-availability zone.

This deployment option is appropriate when regulatory requirements demand that a multi-region solution be implemented, or when requirements drive less than a 4hr RTO/RPO. It has the benefit of being resilient to the loss of an entire AWS Region.

![Tier 3 DR Architecture](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/dr-options/tier-3.png)

The key difference between this deployment is that a second Turbot Guardrails deployment is created in the standby region. The compute cluster will be set to be dormant, and no inbound events will be received by the cluster. On declaration of a disaster, DNS will be changed to send events to this region, while the database is recovered from a cross region RDS snapshot. Once the DB is recovered, the workspace is enabled, and events will start processing from the queue.

To use this pattern, [cross-region RDS backups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReplicateBackups.html) must be configured in this account to ensure the DB can be restored in the target region without access to KMS in the primary region. This option also requires the use of AWS API Gateway, and a public DNS endpoint and SSL certificate to allow redirection of inbound real-time events between regions.

## TIER 4 - Multi Account

**Key Characteristics**: Multi-account, multi-region, multi-availability zone.

The **Tier 4** deployment option should be considered for any organization with zero RTO/RPO requirements. This deployment option allows for instantaneous failover between two active Guardrails environments. We use the “Change Window” feature of guardrails to prevent one of the implementations from executing any enforcements. Upon declaration of an emergency, the standby environment change window can be removed allowing that environment to become the primary and enforce changes.

In normal day to day operation, both environments consume cloud events and maintain independent CMDB databases. This pattern results in both doubling the infrastructure and per control usage costs for Guardrails if employed.

![Tier 4 DR Architecture](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/dr-options/tier-4.png)

Care must be made in this configuration to ensure that policy packs and account onboarding/offboarding is done across both environments in tandem, using the Guardrails Terraform provider to maintain consistency between the deployments. Custom scripting may be necessary to periodically check to ensure both environments are identical in configuration, to meet your organizations DR requirements.
