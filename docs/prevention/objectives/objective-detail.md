---
title: Objective Detail
sidebar_label: Objective Detail
---

# Objective Detail

The Objective Detail page provides in-depth information about a single prevention objective, showing which accounts meet the objective, which preventions achieve it, implementation recommendations, policy examples, and CNAPP findings.

![Objective Detail Page](./objective-detail.png)

## Understanding the Objective Detail Page

When you click on an objective from the Objectives list, you see a comprehensive view that helps you:
- Understand what the objective protects against
- See which accounts currently meet this objective
- Identify the specific preventions that achieve this objective
- Get implementation recommendations
- Review policy examples and code samples
- Track findings from CNAPP tools

## Page Header

The page header displays:

- **Objective title**: Clear description of what is being prevented or enforced
- **Priority badge**: P1 (critical), P2 (high), P3 (medium), or P4 (low)
- **Category**: The security domain (e.g., Trust & Sharing, Identity & Access, Data Governance)
- **Overall score**: Current prevention score (0-5) across all accounts

### Tabs

The objective detail page provides six tabs:

**Overview** - Summary and account coverage (default view)
**Preventions** - List of preventions that achieve this objective
**Recommendations** - Actionable guidance for implementing this objective
**Examples** - Code samples and policy templates
**Findings** - CNAPP tool findings related to this objective
**Advanced** - Technical details and API information

## Overview Tab

The Overview tab is the default view and provides:

### Summary

A concise explanation of:
- What this objective prevents or enforces
- Why this objective is important
- What risks this objective mitigates
- How this objective protects your environment

### Preventions

Shows the number of active preventions that achieve this objective. Click to view the full list of preventions on the Preventions tab.

**Example:** "1 Active prevention" indicates one prevention (such as an SCP, Azure Policy, or Guardrails control) is configured to meet this objective.

### CNAPP Findings

Displays findings from Cloud-Native Application Protection Platform (CNAPP) tools like Wiz:

- **Passed**: Number of resources that meet this objective
- **Unresolved**: Number of resources that fail this objective

CNAPP findings provide validation from external security scanning tools, complementing prevention-based controls with detection-based verification.

### Account Coverage

The Account Coverage table shows all accounts and their prevention scores for this specific objective:

**Columns displayed:**
- **Account name**: Friendly name of the account
- **Account ID**: Cloud provider account identifier
- **Folder/OU**: Organizational folder or unit
- **Prevention score**: Badge showing score (0-5) for this objective

**Account score interpretation:**
- **5**: Objective is fully met through preventions
- **4**: Objective is strongly met
- **3**: Objective is partially met
- **0-2**: Objective is not being met or has minimal coverage

**Search and filter:**
Use the search box to quickly find specific accounts. This is especially useful when managing hundreds of accounts across multiple cloud providers.

## Preventions Tab

The Preventions tab lists all preventions that achieve this objective:

Each prevention entry shows:
- **Prevention name**: What the prevention does
- **Prevention type**: SCP, Azure Policy, GCP Organization Policy, or Guardrails control
- **Layer**: Which prevention layer it operates at (Build, Access, Config, Runtime)
- **Implementation status**: Whether it's active, available, or recommended

Click on any prevention to see detailed implementation instructions.

## Recommendations Tab

The Recommendations tab provides actionable guidance:

**What you'll find:**
- Step-by-step implementation instructions
- Cloud provider-specific configurations
- Prerequisites and dependencies
- Potential impact and considerations
- Testing guidance

Recommendations are prioritized based on:
- Security impact of implementing this objective
- Compliance requirements
- Implementation complexity
- Organizational readiness

## Examples Tab

The Examples tab provides concrete policy templates and code samples:

**Common examples:**
- **Service Control Policy (SCP) templates** for AWS
- **Azure Policy definitions** for Azure subscriptions
- **Organization Policy constraints** for GCP
- **Guardrails policy settings** for Turbot Guardrails
- **Terraform/IaC examples** for automated deployment

These examples accelerate implementation by providing tested, production-ready policies you can adapt for your environment.

## Findings Tab

The Findings tab shows detections from CNAPP and security scanning tools:

**Information provided:**
- Which resources currently fail this objective
- Severity and risk level of each finding
- When the finding was first detected
- Current status (open, in progress, resolved)
- Remediation guidance

Use findings to:
- Validate that preventions are working as expected
- Identify resources created before preventions were enabled
- Track remediation progress over time
- Generate compliance reports

## Advanced Tab

The Advanced tab provides technical information for API integration and automation:

**Technical details:**
- Objective ID and metadata
- API endpoints for querying objective status
- GraphQL examples for retrieving objective data
- Webhook configurations for objective status changes
- Custom policy development guidance

This tab is primarily for developers integrating prevention data into external systems or building custom reporting dashboards.

## Common Workflows

**Determining why an account has a low score for an objective**
1. Open the objective detail page
2. Find the account in the Account Coverage table
3. Click on the Preventions tab to see which preventions achieve this objective
4. Check whether those preventions are implemented for that account
5. Review the Recommendations tab for implementation guidance

**Implementing an objective across all accounts**
1. Review the Summary to understand what the objective protects
2. Click the Preventions tab to see available prevention options
3. Choose the appropriate prevention type for your environment:
   - SCPs for AWS Organization-wide controls
   - Azure Policies for subscription-level controls
   - Guardrails controls for fine-grained management
4. Go to the Examples tab to get policy templates
5. Use the Recommendations tab for step-by-step implementation
6. Monitor the Account Coverage table to track rollout progress

**Validating compliance against this objective**
1. Check the overall score in the page header
2. Review the Account Coverage table to identify non-compliant accounts
3. Go to the Findings tab to see specific resources that fail this objective
4. Use findings to prioritize remediation efforts
5. Track score improvements after implementing preventions

**Understanding CNAPP findings**
1. Click the Findings tab
2. Review the list of resources that fail this objective
3. Note the severity and risk level
4. Click on specific findings to see detailed context
5. Use findings to validate that preventions are working or to identify exceptions

## Next Steps

- Return to [Objectives](./index.md) to browse other objectives
- Review [Recommendations](../recommendations/index.md) for implementation priorities
- Check [Accounts](../accounts/index.md) to see prevention coverage by account
- Use the [Simulator](../simulator/index.md) to test policies before deployment
