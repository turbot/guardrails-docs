---
title: Objectives
sidebar_label: Objectives
---

# Objectives

The Objectives page helps you understand and track prevention objectives across your cloud environment. This page provides multiple views for organizing and analyzing objectives: by compliance benchmark, by individual objective, through recommendations, by priority level, and by category.

## Understanding Objectives

Prevention objectives are security goals that define what you want to prevent from happening in your cloud environment. Each objective can be achieved through one or more preventions (technical controls like Service Control Policies, Azure Policies, or Guardrails controls).

**Example objectives:**
- Prohibit public access to AWS RDS DB instances
- Require MFA for AWS root user authentication
- Enforce encryption at rest for AWS EBS volumes
- Restrict AWS resources to allowed regions

Objectives are organized by:
- **Priority**: P1 (critical), P2 (high), P3 (medium), P4 (low)
- **Category**: Identity & Access, Data Governance, Trust & Sharing, Network Perimeter, Core Infrastructure, Audit & Logging, Feature Restrictions
- **Benchmark**: CIS frameworks, NIST standards, vendor-specific benchmarks

## Navigating the Objectives Section

The Objectives section offers five tabs for different views:

### Benchmarks Tab

The [Benchmarks](./benchmarks.md) tab displays compliance frameworks and industry standards that define prevention objectives.

**Common benchmarks:**
- **AWS CIS v6.0.0**: CIS Amazon Web Services Foundations Benchmark
- **AWS NIST 800-53 Rev 5**: NIST security controls for federal information systems
- **AWS P1 Preventions**: Fundamental preventative controls for AWS
- **Azure CIS v5.0.0**: CIS Azure Foundations Benchmark
- **Azure P1 Preventions**: Fundamental preventative controls for Azure
- **GCP CIS v3.0.0**: CIS Google Cloud Platform Foundation Benchmark
- **GitHub CIS v1.1.0**: CIS GitHub Benchmark for repository security

Each benchmark card shows the framework name, description, and current prevention score (0-5) across all accounts. Click any benchmark to view its detailed objectives grouped by section.

Learn more: [Benchmarks Tab](./benchmarks.md)

### Objectives Tab

The [Objectives](./objectives.md) tab lists all individual prevention objectives with their scores, priorities, and categories.

Each objective card displays:
- **Title**: What the objective aims to prevent or enforce
- **Category**: The security domain (e.g., Trust & Sharing, Data Governance)
- **Priority**: P1 (critical) through P4 (low)
- **Description**: Why this objective matters and what it protects
- **Score**: Current prevention score (0-5) across all accounts

Learn more: [Objectives Tab](./objectives.md)

### Recommendations Tab

The Recommendations tab shows specific, actionable preventions you should implement to improve your security posture. Recommendations are prioritized based on risk reduction impact, compliance requirements, and implementation effort.

See: [Recommendations](../recommendations/index.md)

### Priorities Tab

The [Priorities](./priorities.md) tab groups objectives by their priority level to help you focus remediation efforts.

- **P1 (Critical)**: Most fundamental preventative controls that should be implemented immediately
- **P2 (High)**: Important preventions that provide strong security improvements
- **P3 (Medium)**: Additional preventions that enhance security posture
- **P4 (Low)**: Optional preventions for comprehensive coverage

Learn more: [Priorities Tab](./priorities.md)

### Categories Tab

The [Categories](./categories.md) tab organizes objectives by security domain to help identify gaps and ensure balanced coverage.

- **Identity & Access**: Privileged access restrictions, MFA enforcement, credential management
- **Feature Restrictions**: Disabling risky features, restricting service usage, controlling access methods
- **Trust & Sharing**: Preventing external/anonymous access, controlling cross-account sharing
- **Data Governance**: Data protection, encryption, residency, lifecycle management
- **Network Perimeter**: Network connectivity restrictions, traffic controls, secure communications
- **Core Infrastructure**: Protecting foundational infrastructure and control plane resources
- **Audit & Logging**: Protecting audit trails, logging infrastructure, and log integrity

Learn more: [Categories Tab](./categories.md)

## Common Workflows

**Reviewing compliance against a benchmark**
1. Click the **Benchmarks** tab
2. Find your target benchmark (e.g., AWS CIS v6.0.0)
3. Note the current score across all accounts
4. Click the benchmark to see which sections have lower scores
5. Drill into low-scoring sections to identify missing objectives

**Finding highest-priority objectives to implement**
1. Click the **Priorities** tab
2. Review P1 objectives first
3. Check which P1 objectives have low scores (0-2)
4. Click on those objectives to understand implementation requirements
5. Implement preventions for those objectives

**Identifying security gaps by category**
1. Click the **Categories** tab
2. Review scores for each category
3. Identify categories with lower scores
4. Click low-scoring categories to see specific objectives
5. Prioritize implementing preventions in weak categories

**Searching for a specific objective**
1. Use the **Objectives** tab
2. Enter keywords in the search box (e.g., "RDS", "encryption", "MFA")
3. Review matching objectives
4. Click any objective to see detailed information and account coverage

## Objective Scores

Prevention scores range from 0 to 5 and indicate how well an objective is being met across your environment:

- **5**: Full coverage—objective is met across all applicable accounts
- **4**: Strong coverage—objective is met in most accounts
- **3**: Moderate coverage—objective is partially met
- **2**: Limited coverage—objective is met in few accounts
- **0-1**: No or minimal coverage—objective is not being met

Low scores indicate opportunities to improve security posture by implementing the preventions associated with that objective.

## Next Steps

- Click into any [benchmark](./benchmark-detail.md) to see its grouped objectives
- Click into any [objective](./objective-detail.md) to see which accounts meet it and which preventions achieve it
- Review [Recommendations](../recommendations/index.md) for prioritized implementation guidance
- Return to [Accounts](../accounts/index.md) to see prevention scores by account
