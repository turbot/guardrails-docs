---
title: Multi-Region Failover
sidebar_label: Multi-Region Failover
---

# Multi-Region Failover with Guardrails

In this guide, you will:
- Execute a disaster recovery (DR) failover for Turbot Guardrails Multi-Region deployment.
- Validate the failover process and ensure system functionality.
- Learn how to failback to the primary region when appropriate.

This guide provides detailed steps for executing a disaster recovery failover in a multi-region Turbot Guardrails deployment, ensuring minimal downtime and data loss during region transitions.

> [!NOTE]
> Regular DR testing is crucial for maintaining compliance with industry standards and ensuring operational readiness.

## Target Audience
**Guardrails Administrators** experienced with AWS cloud infrastructure, database management, and Guardrails operations.

## Failover Scenarios

| Scenario | Description |
|----------|-------------|
| Compliance Testing | Scheduled DR testing as required by ISO 27001, NIST 800-34, SOC 2, HIPAA, PCI-DSS. |
| Region Failure | Complete failure of the primary region requiring immediate failover. |
| Performance Issues | Significant degradation affecting operations. |
| Security Incidents | Situations requiring isolation of the primary region. |

## Prerequisites

Before initiating failover, ensure:

- TEF, TED, and TE versions match in both primary and DR regions.
- DR region infrastructure is configured per the [Multi-Region Deployment Guide](/guardrails/docs/guides/hosting-guardrails/disaster-recovery/multi-region-deployment).
- Cross-region RDS backups are current and active.
- API Gateway and Load Balancer configurations are ready in DR region.
- Test workspace mods in DR region match primary region versions.
- DNS records can be updated to redirect traffic to the DR region.

Refer following implementation steps:

## Step 1: Setup Database Failover

1. In the DR region AWS RDS console:
   - Select the existing Guardrails database instance.
   - Rename by appending `-temp` (e.g., `turbot-newton` to `turbot-newton-temp`).
   - Wait for rename completion.

2. Continue in RDS console to restore from backup:
   - Navigate to `Automated backups` > `Replicated` tab.
   - Find Guardrails database.
   - Choose `Restore to point in time` from **Actions** dropdown.
   - Select `Latest restorable time` from `Restore to Point in Time window`.
   - Set DB Instance Identifier *to match* primary region e.g. turbot-newton.
   - Configure VPC, subnet, and security group configurations.
   - Leave `Initial database name` field blank.
   - Use the same DB parameter group as assigned to the `turbot-newton-temp` database.
   - Initiate restoration process by selecting **Restore to point in time**.
   - Wait for the database instance to reach the available state.
   - Once the DB is in `available` state proceed to next step.

3. Update Enterprise Stacks:
   - Access AWS Service Catalog
   - Toggle Parameter Deployment Trigger in TEF, TED, and TE. Refer more info at [Guardrails Stack Updates](/guardrails/docs/guides/hosting-guardrails/updating-stacks#guardrails-stack-updates). This ensures all services transition properly to the DR setup.

## Step 2: Update API Gateway and Load Balancer

Configure API Gateway in DR region:

   1. Navigate to AWS API Gateway in the DR region.
   2. Verify custom domain mapping i.e. ensure the custom domain name (`gateway.cloudportal.company.com`) is correctly mapped (in API mappings tab) to the API Gateway in DR.
   3. Update DNS records:
      - **API Gateway:** Point `gateway.cloudportal.company.com` to the `DR region's API Gateway endpoint`.
      - **Console Access:** Update `console.cloudportal.company.com` to point to the internal load balancer in the DR region.

## Step 3: Validate DR Region Endpoint Access

1. Confirm that *Turbot Guardrails* services are accessible via the *DR region endpoints*.
2. Perform a *test login* to the Turbot Guardrails console.
3. Validate that database queries and API requests are *functioning correctly*.
4. Check logs for any *errors or inconsistencies*.

## Step 4: Review

- [ ] Local User Authentication: Log in using a local user account to confirm that existing credentials remain valid and can successfully decrypt secrets.
- [ ] SAML Authentication: Log in using a SAML-based user account to verify that authentication works as expected.
- [ ] Permission Assignment: Grant new permissions and confirm that the system correctly recognizes and applies them.
- [ ] Resource & Control Verification: Ensure that the resource count and control status align with pre-disaster values.
- [ ] CMDB Control Execution: Run a CMDB control to validate that API calls to the cloud provider are functioning properly.
- [ ] Event Handlers Validation: Create a new S3 bucket and check if it appears in the Guardrails UI, confirming that real-time event processing and API Gateway are operational.
- [ ] Stack Validation: Execute an Event Handler stack or another relevant stack to ensure that the Factory and Containers operate correctly.
- [ ] Turbot Resource Test: Create and delete a test Turbot Folder to verify system stability and proper resource lifecycle management.

## Fallback to Primary Region

Once the primary region is restored, follow these steps:

1. *Sync any new data* from the DR region back to the primary database.
2. *Update DNS records* to point back to the primary region's API Gateway and Load Balancer.
3. *Validate application functionality* in the primary region before resuming normal operations.

## Next Steps

Learn more about:
- [Turbot Guardrails Hosting Architecture](/guardrails/docs/guides/hosting-guardrails/architecture)
- [DR Architecture Options](/guardrails/docs/guides/hosting-guardrails/disaster-recovery/architecture-options)
- [Multi-Region Deployment](/guardrails/docs/guides/hosting-guardrails/disaster-recovery/multi-region-deployment)

## Assistance

If you encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently. [Open Support Ticket](https://support.turbot.com)
