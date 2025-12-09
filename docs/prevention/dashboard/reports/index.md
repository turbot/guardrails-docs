---
title: Reports
sidebar_label: Reports
---

# Reports

The Reports tab provides access to specialized views and analytics that help you understand the effective security boundaries in your cloud environment. These reports aggregate prevention data to show you what is actually being allowed or denied across your accounts.

![Prevention Reports](./prevention-reports-overview.png)

## Understanding Prevention Reports

Reports differ from the general dashboard views by focusing on the **net effect** of your preventions. While the dashboard shows how well you're meeting security objectives, reports answer practical questions like "Which AWS services can my developers actually use?" or "What regions are blocked across my organization?"

These reports are particularly valuable for:
- **Troubleshooting**: Understanding why certain operations are blocked or allowed
- **Compliance auditing**: Verifying that your security boundaries match your policies
- **Change validation**: Confirming that preventive controls are working as intended
- **Communication**: Explaining security boundaries to development teams

## Available Reports

### AWS Region Boundary

Shows which AWS regions are approved or denied for each account. This report displays a matrix table showing account-level region access policies, making it easy to:

- Identify which regions are available for use in each account
- Spot inconsistencies in region policies across accounts
- Verify compliance with data residency requirements
- Understand the effective region boundaries enforced by SCPs and policies

The report aggregates all preventions (SCPs, RCPs, and other access policies) to show the actual regions that can be used, regardless of how many different policies contribute to that boundary.

### AWS Service Boundary

Shows which AWS services are approved or denied for each account. This report displays a matrix table showing account-level service access policies, allowing you to:

- See which AWS services developers can provision in each account
- Identify service restrictions that may be blocking legitimate workloads
- Verify that high-risk services are properly restricted
- Understand your approved service catalog

Like the region boundary report, this aggregates all preventions to show the net effect—which services are actually available for use after all deny and allow policies are evaluated.

### Guardrails AWS Region Boundary Exceptions

Identifies regions that are allowed by preventions (SCPs, RCPs) but are NOT listed in the Guardrails `AWS > Account > Approved Regions [Default]` policy. These exceptions may represent:

- **Policy drift**: SCPs and Guardrails policies are out of sync
- **Security concerns**: Regions are allowed at the SCP level but not approved in Guardrails
- **Configuration errors**: Guardrails policy needs to be updated to match organizational standards

This report is specifically useful if you're using both preventions (SCPs/RCPs) and Guardrails runtime controls, helping you maintain consistency between access-layer and runtime-layer enforcement.

## Using Reports for Prevention Analysis

Reports are derived from **prevention facts**—information extracted from your preventions. For example, when Guardrails discovers an SCP deny statement that blocks EC2 in us-west-1, it creates a fact recording that this region is blocked. The AWS Region Boundary report aggregates these facts across all accounts to show the complete picture.

### Report Use Cases

**Onboarding new accounts**
Before setting up new accounts, review the service and region boundary reports to understand what will be available based on organizational SCPs attached to the account's organizational unit.

**Troubleshooting deployment failures**
When deployments fail with access denied errors, check the service boundary report to verify whether the service is allowed in that account.

**Compliance reporting**
Use region boundary reports to demonstrate to auditors that resources cannot be created in non-compliant regions.

**Security validation**
After implementing new preventions, review the boundary reports to confirm they're having the intended effect.

## Understanding Service and Region Boundaries

Service and region boundaries are calculated by evaluating:

1. **Deny statements** in SCPs and RCPs that explicitly block services or regions
2. **Allow boundaries** defined by SCP allow statements (when using allow lists)
3. **Service control settings** like enabled/disabled services at the account level
4. **Inheritance** of policies from parent organizational units

The reports show the **effective boundary**—what is actually accessible after all policies are applied—rather than requiring you to mentally combine multiple policy statements.

## Next Steps

- Review the AWS Service Boundary report to verify your approved service catalog matches your security requirements
- Check the AWS Region Boundary report to ensure data residency and compliance requirements are enforced
- If using Guardrails runtime controls, review the Region Boundary Exceptions report to identify and resolve policy drift
- Use these reports during security reviews and compliance audits to demonstrate preventions
