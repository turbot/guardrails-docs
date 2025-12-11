---
title: Reports
sidebar_label: Reports
---

# Reports

The Reports tab shows the effective security boundaries in your cloud environment—answers to practical questions like "Which AWS services can my developers use?" or "What regions are blocked across my organization?" These reports aggregate prevention data to show net effects rather than individual policies, making them particularly valuable for troubleshooting (understanding why operations are blocked), compliance auditing (verifying boundaries match policies), change validation (confirming preventions work as intended), and communication (explaining boundaries to development teams).

![Prevention Reports](./prevention-reports-overview.png)

## Available Reports

### AWS Region Boundary

Shows which AWS regions are allowed or denied for each account in a matrix table. This aggregates all preventions (SCPs, RCPs, access policies) to show actual usable regions—helpful for identifying which regions are available in each account, spotting inconsistencies in region policies across accounts, verifying compliance with data residency requirements, and understanding effective region boundaries.

![AWS Region Boundary Report](./prevention-report-aws-region-boundary.png)

### AWS Service Boundary

Shows which AWS services are allowed or denied for each account in a matrix table. This aggregates all preventions to show which services are available after all policies are evaluated—useful for seeing which AWS services can be provisioned in each account, identifying service restrictions that may block legitimate workloads, verifying high-risk services are properly restricted, and understanding your allowed service catalog.

![AWS Service Boundary Report](./prevention-report-aws-service-boundary.png)

### Guardrails AWS Region Boundary Exceptions

Identifies regions allowed by preventions (SCPs, RCPs) but NOT listed in the `Guardrails AWS > Account > Approved Regions` policy. These exceptions may indicate policy drift (SCPs and Guardrails policies are out of sync), security concerns (regions allowed at SCP level but not approved in Guardrails), or configuration errors (Guardrails policy needs updating). This is useful when using both preventions and Guardrails runtime controls to maintain consistency between access-layer and runtime-layer enforcement.

![Guardrails AWS Region Boundary Exceptions Report](./prevention-report-guardrails-aws-region-boundary-exceptions.png)

## How Reports Work

Reports are derived from prevention facts—information extracted from your preventions. When Guardrails discovers an SCP deny statement blocking EC2 in us-west-1, it creates a fact recording that region as blocked. Reports aggregate these facts across accounts to show the complete picture.

Service and region boundaries are calculated by evaluating deny statements in SCPs and RCPs that block services or regions, allow boundaries defined by SCP allow statements (when using allow lists), service control settings like enabled/disabled services, and inheritance of policies from parent organizational units. Reports show the effective boundary—what is actually accessible after all policies are applied.

## Common Use Cases

- **When onboarding new accounts**, review service and region boundary reports to understand what will be available based on organizational SCPs
- **When troubleshooting deployment failures**, check the service boundary report if deployments fail with access denied errors
- **For compliance reporting**, use region boundary reports to demonstrate resources cannot be created in non-compliant regions
- **After implementing new preventions**, review boundary reports to validate they produce intended effects

## Next Steps

- Review the AWS Service Boundary report to verify your allowed services
- Check the AWS Region Boundary report to ensure data residency requirements are enforced
- If using Guardrails runtime controls, review Region Boundary Exceptions to identify policy drift
- Use reports during security reviews and compliance audits
