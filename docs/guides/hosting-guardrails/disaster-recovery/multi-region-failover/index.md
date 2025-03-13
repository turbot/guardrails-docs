---
title: "Multi-Region Failover"
template: Documentation
nav:
  title: "Multi-Region Failover"
  order: 12
---

# Multi-Region Failover

## 1. Introduction

This document outlines the steps required to execute a Disaster Recovery (DR) failover for Turbot Guardrails Multi-Region deployment, ensuring minimal downtime and data loss. It covers the process to switch operations from the primary region to the DR region in the event of a failure.

## 2. Failover Scenarios

The DR failover may be triggered under the following conditions:

- Scheduled compliance testing, as mandated by industry standards (ISO 27001, NIST 800-34, SOC 2, HIPAA, PCI-DSS) or internal governance policies. Organizations typically conduct DR simulations every 6 months or annually to validate readiness.
- Complete failure of the primary region.
- Significant degradation in performance affecting operations.
- Security incidents requiring immediate isolation of the primary region.

## 3. Prerequisites for Failover

Before initiating failover, ensure the following:

- All three provisioned products, TEF, TED, and TE, should be of the same version in both the primary and DR regions.
- The DR region infrastructure is fully set up as per the [Multi-Region Deployment Guide](guides/hosting-guardrails/disaster-recovery/multi-region-deployment).
- The cross-region RDS backups are active and up-to-date.
- API Gateway and Load Balancer configurations in the DR region are in place.
- Mods on the test workspace in the DR region should ideally match the versions in the primary region. If there are discrepancies, they can be updated after the DR process is completed.
- DNS records can be updated to redirect traffic to the DR region.

## 4. Failover Execution Steps

### 4.1 Database Failover

In the DR region,

1. Navigate to AWS RDS.
2. Select the existing Turbot Guardrails database instance.
3. Rename the database by appending -temp to its name (e.g., if the database name is turbot-newton, rename it to turbot-newton-temp).
4. Apply the changes immediately and wait for the rename operation to complete.
5. Once the rename is complete, navigate to the “Automated backups” section.
6. Under the "Replicated" tab, locate and select the Turbot Guardrails database.
7. Click on the "Actions" dropdown menu and choose "Restore to point in time".
8. A Restore to Point in Time window will open.
9. Select an appropriate point in time to restore from. In most cases, choosing "Latest restorable time" is recommended.
10. Ensure the restored database settings match those of the primary region as closely as possible.
11. Set the DB Instance Identifier to match the primary region’s database identifier (e.g., turbot-newton).
12. Select the correct VPC, subnet, and security group configurations.
13. Leave the "Initial database name" field blank.
14. Use the same parameter group as assigned to the turbot-newton-temp database.
15. Click "Restore to point in time" to initiate the restoration process.
16. Wait for the database instance to reach the available state.
17. Once the instance is available, navigate to AWS Service Catalog.
18. Toggle the "Parameter Deployment Trigger" in TEF, TED, and TE from Blue <-> Green, ensuring all services transition properly to the DR setup.

### 4.2 API Gateway and Load Balancer Updates

1. Navigate to **AWS API Gateway** in the DR region.
2. Ensure the **custom domain name** (`gateway.cloudportal.company.com`) is correctly mapped (in API mappings tab) to the API Gateway in DR.
3. Update DNS records:
   - **API Gateway:** Point `gateway.cloudportal.company.com` to the DR region's API Gateway endpoint.
   - **Console Access:** Update `console.cloudportal.company.com` to point to the internal load balancer in the DR region.

### 4.3 Application Validation

1. Confirm that **Turbot Guardrails** services are accessible via the **DR region endpoints**.
2. Perform a **test login** to the Turbot Guardrails console.
3. Validate that database queries and API requests are **functioning correctly**.
4. Check logs for any **errors or inconsistencies**.

## Step 5: Validation

This step validates the DR process.

- [ ] Local User Authentication: Log in using a local user account to confirm that existing credentials remain valid and can successfully decrypt secrets.
- [ ] SAML Authentication: Log in using a SAML-based user account to verify that authentication works as expected.
- [ ] Permission Assignment: Grant new permissions and confirm that the system correctly recognizes and applies them.
- [ ] Resource & Control Verification: Ensure that the resource count and control status align with pre-disaster values.
- [ ] CMDB Control Execution: Run a CMDB control to validate that API calls to the cloud provider are functioning properly.
- [ ] Event Handlers Validation: Create a new S3 bucket and check if it appears in the Guardrails UI, confirming that real-time event processing and API Gateway are operational.
- [ ] Stack Validation: Execute an Event Handler stack or another relevant stack to ensure that the Factory and Containers operate correctly.
- [ ] Turbot Resource Test: Create and delete a test Turbot Folder to verify system stability and proper resource lifecycle management.

## 5. Failback to Primary Region

Once the primary region is restored, follow these steps:

1. **Sync any new data** from the DR region back to the primary database.
2. **Update DNS records** to point back to the primary region's API Gateway and Load Balancer.
3. **Validate application functionality** in the primary region before resuming normal operations.

## Additional Assistance

Turbot Support is happy to consult with Enterprise customers to help determine a strategy to manage these scenarios. Contact us at [help@turbot.com](mailto:help@turbot.com).
