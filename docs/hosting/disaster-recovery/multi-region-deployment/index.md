---
title: Multi-Region Deployment
sidebar_label: Multi-Region Deployment
---

# Multi-Region Deployment with Guardrails

In this guide, you will:

- Set up a multi-region deployment of Turbot Guardrails using Tier 3 architecture.
- Configure disaster recovery (DR) processes to ensure high availability and rapid recovery.

This guide outlines the deployment of **Turbot Guardrails** using a **Tier 3 architecture**. It aims to ensure high availability, minimize downtime, and reduce data loss in disaster scenarios through a multi-region, multi-AZ deployment strategy.

> [!NOTE]
>This deployment approach applies to all production workloads deployed under the `Tier 3` architecture, ensuring rapid recovery and high availability.

## Target Audience
**Guardrails Administrators** experienced with AWS cloud infrastructure, Guardrails deployment, and database recovery.

## Disaster Recovery Objectives

| Objective                      | Definition                                               |
| ------------------------------ | -------------------------------------------------------- |
| Recovery Time Objective (RTO)  | 2 hours                                                  |
| Recovery Point Objective (RPO) | 2 hours                                                  |
| Availability                   | 99.9%                                                    |
| Use Case                       | Rapid recovery for production workloads                  |

## Tier 3 Deployment Architecture

The **Tier 3** architecture enhances resilience by deploying a standby environment in a secondary AWS region. The primary and standby environments follow these guidelines:

- **TEF, TED, and TE installation**: Follow the [main installation guide](/guardrails/docs/guides/hosting-guardrails/installation).
- Differences and considerations specific to multi-region disaster recovery are outlined below.

### Architecture

![Tier 3 Architecture](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/multi-region-deployment/tier-3.png)

### Prerequisites

- `Primary Region`: Active deployment region for Turbot Guardrails.
- `DR Region`: Secondary region for disaster recovery.

### Assumptions

The deployment approach outlined in this guide is based on the following assumptions:

1. The *VPC is pre-configured* and not created as part of the Turbot Guardrails installation
2. *DNS record* management is handled externally, not by Turbot Guardrails
3. *IAM roles* are not provisioned by Turbot Guardrails.
4. The *API Gateway* is configured with an internal load balancer architecture

## Key Considerations

When implementing a multi-region deployment for disaster recovery, several critical aspects need careful consideration. The following sections outline the key technical requirements and setup guidelines.

### VPC Configuration

Ensure VPCs and subnets mirror the primary region setup in the DR region.

### SSL Certificate

1. Ensure the certificate is valid and available in both primary and DR regions.
2. Wildcard domain certificates are preferred (e.g. `*.cloudportal.company.com`).
3. If not available, certificates must explicitly trust both primary region (`gateway.cloudportal.company.com`) and DR (`gateway-dr.cloudportal.company.com`) domains.

### Workspace Configuration

Deploy an additional workspace in the DR region using the domain pattern: `{workspace_name}-dr.cloudportal.company.com`. Refer [Create  Workspace](/guardrails/docs/guides/hosting-guardrails/installation/workspace-manager)

### Product Version Requirements

Both regions require these **`minimum`** versions:

1. **TEF:** 1.66.0
2. **TED:** 1.45.0
3. **TE:** 5.49.0
> [!NOTE]
> *Turbot Resource Name Prefix:* Should be identical in both regions. Defaults to `turbot`.

## Key Differences Between Primary and DR Regions

The primary and DR regions share identical configuration settings except for a few key differences that need to be configured specifically for each region:

| Configuration       | Attributes                          | Primary Region                                            | DR Region                                                      |
|---------------------|-------------------------------------|-----------------------------------------------------------|----------------------------------------------------------------|
| **TEF Configuration** | `SSL Certificate`                   | Covers required domains e.g. `gateway.cloudportal.company.com`                                | Covers required domains e.g. `gateway-dr.cloudportal.company.com `                                      |
|                      | `API Gateway Prefix`(default `gateway`) under the `Network - API Gateway` section                | Set to `gateway`                                          | Set to `gateway-dr`                                            |
|                      | `Multi-region KMS Key Type` under `Advanced - Deployment` section          | Set to `Primary`                                                 | Set to KMS key ARN from primary region (`alias: turbot_guardrails`, prefixed with `mrk-`) |
|                      | `API Gateway Custom Domain `         | Created automatically                                   | Create manually (`gateway.cloudportal.company.com`)           |
| **TED Configuration** | Database Name                     | Identical in both regions                                 | Identical in both regions                                      |
| **RDS Configuration** | Cross-region DB Snapshots         | Manually configured [Cross-region RDS DB snapshots](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReplicateBackups.html) | Uses snapshots replicated from primary region                  |


> [!WARNING]
> When setting up TEF in the DR region, ensure a smooth deployment to avoid rollback issues. If a replica key is created and a rollback is required, the replica key cannot be deleted immediately and will be subject to a 7-day retention period unless removed with AWS Support assistance. **You can create only one replica of each primary key in each AWS Region.**

> If necessary, complete the TEF setup in the DR region by setting the Guardrails multi-region KMS Key Type (under Advanced - Deployment) to Primary. Once the setup is successfully completed, update the parameter to Replica and delete the multi-region key created in the DR region.

## Workspace Deployment in DR Region

  1. Create a **test workspace** in the DR region. Refer [Create  Workspace](/guardrails/docs/guides/hosting-guardrails/installation/workspace-manager).
  2. Install the same mods as the primary region workspace.

> [!NOTE]
> Creating a test workspace in the DR region is essential. Manually installing mods during an actual disaster recovery scenario can be time-consuming and may exceed your RTO/RPO targets. By maintaining a sandbox workspace with proactive mod installation (via pipelines, Terraform scripts, or AutoMod updates), you ensure the DR workspace stays current and can quickly take over if the primary workspace fails.

## Implementation Steps

### Step1: Setup Cross-Region Database Backup

1. Open AWS RDS console in the primary region.
2. Select **Automated backups**.
3. Choose Guardrails database (e.g. turbot-babbage).
4. Select **Manage cross-Region replication** from **Actions** dropdown.
5. Enable cross-region replication, select DR region, set retention, and select the KMS key.
6. Save and verify replication under the **Replicated** tab.

![Enable cross-Region replication](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/multi-region-deployment/enable-crossregion-replication.png)

7. Destination Region: Select the 'DR region'.
8. Replicated backup retention period: Choose the appropriate retention period in days.
9. AWS KMS Key: Select the encryption key used for the Turbot database in the DR region. Typically, this follows the format `turbot_databasename` (e.g. turbot-babbage).
10. Validate the KMS Key ID: Navigate to the KMS service in the DR region to confirm the correct key.

![Enable cross-Region replication](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/multi-region-deployment/enable-crossregion-replication-details.png)

Select **Save** and navigate to the `Replicated` tab and verify that the database is listed under `Replicated backups`.

### Step 2: Configuring Workspaces in the Primary Region

Set policies as below

1. `Turbot > Workspace > Gateway Domain Name`: e.g., `gateway.turbot.acme.com`.
2. `Turbot > Workspace > Domain Name`: e.g., `console.turbot.acme.com`.

> [!IMPORTANT]
>  Set the domain name only, do not include protocol or path information.

### Step 3: Configuring API Gateway Custom Domain Name in the DR Region

To ensure seamless failover in the DR region, you need to configure the `API Gateway Custom Domain Name`.

1. Open the AWS API Gateway service in the `DR region`.
2. Verify that the custom domain `gateway-dr.cloudportal.company.com` is already present.
3. Select on **Add domain name**.
4. Enter the same `Domain name` as in the primary region: `gateway.cloudportal.company.com`.
5. Type as `Public`.
6. `API endpoint type` as Regional.
7. `Minimum TLS version` as TLS 1.2.
8.  In `ACM Certificate`, select the ACM Certificate created for Turbot Guardrails. This certificate should be configured to trust both `gateway.cloudportal.company.com` and `gateway-dr.cloudportal.company.com`.

Select **Add domain name** to finalize the setup.

![Add domain name](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/multi-region-deployment/add-domain-name.png)

9. Once created, navigate to the `Custom domain name` settings and open the `API mappings` tab.
10. Click on **Configure API mappings**, then select **Add new mapping**.

![Configure API mappings](/images/docs/guardrails/guides/hosting-guardrails/disaster-recovery/multi-region-deployment/configure-api-mappings.png)

11. Configure API mappings for `turbot-api` and in `Stage` choose `turbot`.
12. Apply changes by selecting **Save**

### Step 4: Configure DNS Records

1. **API Gateway DNS Record**: The domain `gateway.cloudportal.company.com` should have an `A record` pointing to the API Gateway endpoint in the primary region. The API Gateway endpoint typically follows the format: `abcdefghij.execute-api.us-east-1.amazonaws.com`.
2. **Workspace Console DNS Record**: The domain `console.cloudportal.company.com` should have a CNAME record pointing to the internal load balancer DNS name in the primary region. This internal load balancer DNS name generally follows the format: `internal-turbot-5-49-0-lb-1234567890.us-east-1.elb.amazonaws.com`.

### Step 5: Review

- [ ] Ensure cross-region backup is operational.
- [ ] Verify DNS configurations and API mappings.
- [ ] Test workspace e.g. `console.turbot.acme.com` access is successful in the DR region.

## Next Steps

Learn more about:

- [Turbot Guardrails Hosting Architecture](/guardrails/docs/guides/hosting-guardrails/architecture).
- [DR Architecture Options](/guardrails/docs/guides/hosting-guardrails/disaster-recovery/architecture-options).
- [Multi-Region Failover](/guardrails/docs/guides/hosting-guardrails/disaster-recovery/multi-region-failover)

## Assistance

<!-- Turbot Support is happy to consult with Enterprise customers to help determine a strategy to manage these scenarios. Contact us at [help@turbot.com](mailto:help@turbot.com). -->

If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently. [Open Support Ticket](https://support.turbot.com)