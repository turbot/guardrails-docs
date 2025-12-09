---
title: Dashboard
sidebar_label: Dashboard
---

# Dashboard

The Prevention Dashboard provides a comprehensive view of your organization's preventive security posture across your cloud environment. It displays your overall prevention maturity score, benchmark performance, AI-generated recommendations for improvement, and breakdowns by security category and enforcement layer.

![Prevention Dashboard](./prevention-dashboard-overview.png)

## Understanding Prevention Maturity

Your prevention maturity score represents how well your organization prevents security issues before they can occur. Unlike traditional security tools that detect problems after they exist, prevention-first security stops misconfigurations and vulnerabilities from reaching production.

The **Overall Maturity** section displays your prevention score on a scale of 0-5, calculated by evaluating how effectively your preventions meet your security objectives across all accounts. The score considers:

- **Coverage**: Which objectives have preventive controls in place
- **Quality**: How well those controls meet each objective's requirements
- **Priority weighting**: Higher-priority objectives (P1, P2) have more impact on your score
- **Layer weighting**: Controls at different enforcement layers are weighted differently (Access layer controls are weighted highest at 0.95, Config and Runtime at 0.85, Build at 0.75)

Below the score, you'll see the total number of objectives being tracked and the number of preventions discovered in your environment. Click this section to explore detailed scores by account and objective.

## Benchmarks

The Benchmarks section shows your prevention scores against industry-standard compliance frameworks and security baselines. Each benchmark organizes objectives hierarchically according to the framework's structure.

The dashboard displays your top benchmarks including:

- **AWS CIS v6.0.0**: The CIS Amazon Web Services Foundations Benchmark
- **AWS NIST 800-53 Rev 5**: NIST security controls for federal information systems
- **AWS P1 Preventions**: The most fundamental preventative controls for AWS cloud security
- **Azure CIS v5.0.0**: The CIS Azure Foundations Benchmark
- **Azure P1 Preventions**: Fundamental preventative controls for Azure environments
- **GitHub CIS v1.1.0**: CIS Benchmark for GitHub organizations and repositories

Each benchmark card shows:
- The benchmark name and description
- Your current prevention score for that benchmark
- A clickable link to explore detailed objective-level scores

Click **View All** to see your complete list of benchmarks and their scores.

## Recommendations

Recommendations are AI-generated suggestions for specific actions you can take to improve your prevention posture. Each recommendation:

- Targets a specific objective where you have gaps in prevention coverage
- Explains what will be accomplished when implemented
- Includes the priority level (P1-P5) indicating relative importance
- Provides concrete implementation guidance based on your current environment

Recommendations are prioritized based on:
- The potential impact on your prevention score
- The priority of the objective being addressed
- Your current coverage gaps

The dashboard shows your top 3 recommendations. Click **View All** to browse all available recommendations and their detailed implementation steps.

## Categories

Security objectives are organized into seven categories that represent different domains of cloud security. The Categories section shows your prevention score for each category and the number of objectives it contains.

**Identity & Access**
Controls that restrict privileged access to highly sensitive account capabilities. Includes root account access restrictions, MFA enforcement, credential management, and centralized identity controls.

**Feature Restrictions**
Controls that disable or restrict specific service features or capabilities that pose security risks. Includes limiting remote access, restricting regions, and disabling legacy features.

**Trust & Sharing**
Controls that prevent external or anonymous access to cloud resources based on identity boundaries. Includes blocking public access, controlling cross-account sharing, and managing external federation.

**Data Governance**
Controls related to data protection, encryption, residency, and lifecycle management. Includes encryption requirements, data location controls, and compliance with data protection regulations.

**Network Perimeter**
Controls that restrict network connectivity and traffic patterns. Includes controlling remote access methods, enforcing VPC endpoints, and ensuring secure communication channels.

**Core Infrastructure**
Controls that protect the foundational infrastructure and control plane resources deployed to manage your cloud environment. Includes protecting Control Tower infrastructure, landing zone resources, and governance components.

**Audit & Logging**
Controls that protect the integrity, availability, and confidentiality of audit trails and logging infrastructure. Includes preventing modification of audit services, ensuring log encryption, and protecting log storage.

Each category card displays:
- The category name and description
- The number of objectives in the category
- Your current prevention score for that category

Click any category to explore its objectives and see detailed prevention scores. Click **View All** to compare all categories side by side.

## Layers

Preventive controls operate at different stages of the deployment lifecycle. The Layers section shows how your prevention is distributed across these enforcement points:

**Build**
Catch problems before launch. Scans Infrastructure-as-Code (IaC) and CI/CD pipelines so insecure configurations never get deployed.

**Access**
Control who can do what. Uses organization-level authorization controls like AWS Service Control Policies (SCPs), Azure Policies with deny effect, and GCP Organization Policies to block risky actions at the API level.

**Config**
Secure defaults everywhere. Enforces account and service settings that keep resources safe by default—like encryption-by-default and blocking public buckets.

**Runtime**
Auto-fix in real time. Continuously watches for drift and instantly remediates issues with tools like Turbot Guardrails, Cloud Custodian, or AWS Config auto-remediation.

Each layer card shows:
- The layer name
- The number of objectives with controls at that layer
- Your prevention score for that layer

Click any layer to see which objectives are being addressed at that enforcement point. Click **View All** to analyze your defense-in-depth strategy across all layers.

## Next Steps

- Click any section on the dashboard to drill into detailed scores and analysis
- Use the **[Explore](./prevention/dashboard/explore/index)** tab to customize groupings and filters for deeper investigation
- Review **[Reports](./prevention/dashboard/reports/index)** for specialized views like service boundaries and region restrictions
- Review your top recommendations and implement high-priority preventive controls
- Monitor your score over time as you add new preventive controls and expand coverage

