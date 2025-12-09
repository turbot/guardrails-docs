---
title: Account Detail
sidebar_label: Account Detail
---

# Account Detail

The Account Detail page provides an in-depth view of prevention coverage for a single cloud account, subscription, or repository. This page breaks down the overall prevention score into specific categories, benchmarks, and recommendations, helping you understand exactly which preventions are implemented and which gaps need to be addressed.

![Account Prevention Page](./account-detail-prevention.png)

## Accessing Account Details

To view an account's prevention details:

1. Navigate to the [Accounts](./index.md) page
2. Click on any account name in the list
3. Click the **Prevention** tab

The page header shows:
- **Account name** and ID
- **Prevention score** (0-5)
- **Folder or organizational unit** the account belongs to
- **Alert count** (click to view alert details)
- **Resource type** (AWS Account, Azure Subscription, GCP Project, or GitHub Repository)

## Overall Maturity

The Overall Maturity section provides a high-level summary:

- **Prevention score** (0-5): Displayed as a shield icon with the numeric score
- **Total objectives**: Number of prevention objectives applicable to this account
- **Total preventions**: Number of individual preventions evaluated

Click the objective/prevention counts to explore detailed prevention coverage in the Prevention Explore view.

## Benchmarks

The Benchmarks section shows how this account scores against industry compliance frameworks and best practice benchmarks.

Common benchmarks include:
- **AWS CIS v6.0.0**: CIS Amazon Web Services Foundations Benchmark
- **AWS P1 Preventions**: Fundamental preventative controls for AWS
- **Azure CIS v5.0.0**: CIS Azure Foundations Benchmark
- **Azure P1 Preventions**: Fundamental preventative controls for Azure
- **GCP CIS v3.0.0**: CIS Google Cloud Platform Foundation Benchmark
- **GitHub CIS v1.1.0**: CIS GitHub Benchmark

Each benchmark card displays:
- Benchmark name and version
- Brief description of what the benchmark covers
- Score (0-5) for this specific account

**Interpreting benchmark scores:**
- **5**: Full compliance—all benchmark objectives are met
- **3-4**: Partial compliance—most objectives met, some gaps remain
- **0-2**: Limited compliance—significant gaps in meeting benchmark requirements

A score of 0 typically indicates the benchmark doesn't apply to this account type (e.g., Azure benchmarks will score 0 on AWS accounts).

Click **View All** to see the complete list of benchmarks and their detailed requirements.

## Recommendations

The Recommendations section provides actionable guidance for improving prevention coverage.

Each recommendation card shows:
- **Prevention title**: What needs to be implemented
- **Priority level**: P1 (highest), P2 (high), P3 (medium), or P4 (low)
- **Impact description**: What will happen when this prevention is implemented

Recommendations are prioritized based on:
- **Security impact**: How significantly the prevention reduces risk
- **Compliance requirements**: Whether the prevention is required by compliance frameworks
- **Implementation complexity**: How difficult the prevention is to implement

Click on any recommendation to view detailed implementation guidance including:
- Step-by-step instructions for implementing the prevention
- Cloud provider-specific configuration examples
- Service Control Policy (SCP) templates for AWS
- Azure Policy definitions for Azure
- Organization Policy constraints for GCP

Click **View All** to see the complete list of recommendations for this account.

## Categories

The Categories section organizes preventions by their security purpose.

**Identity & Access**
Controls that restrict privileged access to highly sensitive account capabilities and enforce strong authentication requirements. Includes root account restrictions, MFA enforcement, credential management, and permission boundary controls.

**Feature Restrictions**
Controls that disable or restrict specific service features or capabilities that pose security risks. Includes limiting remote access, restricting service usage to approved regions, and disabling features that increase attack surface.

**Trust & Sharing**
Controls that prevent external or anonymous access to cloud resources based on identity boundaries and trust relationships. Includes blocking public access, controlling cross-account sharing, and managing external identity federation.

**Data Governance**
Controls related to data protection, encryption, residency, and lifecycle management. Includes enforcing encryption at rest and in transit, controlling data location, and ensuring compliance with data protection regulations.

**Network Perimeter**
Controls that restrict network connectivity and traffic patterns to prevent unauthorized network access. Includes controlling remote access methods, enforcing VPC endpoints, and ensuring secure communication channels.

**Core Infrastructure**
Controls that protect foundational infrastructure and control plane resources. Includes protecting resources created by centralized management platforms and safeguarding infrastructure components that provide governance capabilities.

**Audit & Logging**
Controls that protect the integrity, availability, and confidentiality of audit trails and logging infrastructure. Includes preventing deletion or modification of audit services, ensuring log encryption, and maintaining log integrity.

Each category card displays:
- Category name and description
- Number of objectives in this category
- Prevention score (0-5) for this category

Click on any category to explore the specific objectives and preventions within that category.

## Layers

The Layers section shows prevention coverage across different enforcement layers.

**Build**
Preventions enforced during resource creation and infrastructure-as-code deployment. These preventions stop risky configurations before resources are deployed.

**Access**
Preventions that control who can access resources and what actions they can perform. Includes identity-based policies, resource-based policies, and permission boundaries.

**Config**
Preventions that enforce required configurations on deployed resources. Includes encryption requirements, network settings, and compliance configurations.

**Runtime**
Preventions that detect and respond to risky behavior during resource operation. Includes monitoring, threat detection, and automated remediation.

Each layer card displays:
- Layer name
- Number of objectives at this layer
- Prevention score (0-5) for this layer

The layered approach ensures defense-in-depth: even if a risky resource is deployed, preventions at other layers can limit the damage.

## Common Workflows

**Improving an account's prevention score**
1. Review the Overall Maturity score to understand current state
2. Check Recommendations for prioritized actions to take
3. Start with P1 (highest priority) recommendations
4. Implement preventions using the detailed guidance provided
5. Return to this page to verify the score improves

**Preparing for a compliance audit**
1. Review the Benchmarks section to see compliance status
2. Click on the relevant benchmark (e.g., AWS CIS v6.0.0)
3. Identify which objectives are not being met
4. Implement missing preventions following the recommendations
5. Verify benchmark score reaches target level (typically 4 or 5)

**Understanding prevention gaps by category**
1. Scroll to the Categories section
2. Identify categories with low scores (0-2)
3. Click on the low-scoring category to see specific objectives
4. Review which objectives are not being met
5. Prioritize implementing missing preventions based on risk and compliance needs

**Analyzing defense-in-depth coverage**
1. Review the Layers section
2. Ensure coverage across multiple layers (not just Access or just Config)
3. If one layer has a significantly lower score, focus remediation there
4. Aim for balanced coverage: a score of 3+ across all applicable layers

## Next Steps

- Return to [Accounts](./index.md) to view prevention scores across all accounts
- Visit [Objectives](../objectives/index.md) to understand prevention objectives in detail
- Use [Recommendations](../recommendations/index.md) to see prioritized prevention guidance
- Try the [Simulator](../simulator/index.md) to test Service Control Policies before deployment
