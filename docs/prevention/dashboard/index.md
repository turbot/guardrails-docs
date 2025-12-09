---
title: Dashboard
sidebar_label: Dashboard
---

# Dashboard

The Prevention Dashboard provides a comprehensive view of your organization's preventive security posture. It displays your overall prevention maturity score, top-performing benchmarks, AI-generated recommendations for improvement, and score breakdowns by category and layer.

![Prevention Dashboard](./prevention-dashboard-overview.png)

## Overall Maturity

The **Overall Maturity** section shows your prevention score (0-5 scale) and key metrics. Your score reflects how effectively your preventions meet security objectives across all accounts, considering coverage, quality, priority weighting, and layer weighting.

Below the score, you'll see:
- The total number of [objectives](./prevention/index#objectives) being tracked
- The number of [preventions](./prevention/index#preventions) discovered in your environment

Click this section to explore detailed scores by account and objective.

## Benchmarks

Shows your prevention scores against industry-standard compliance frameworks. The dashboard displays your top benchmarks including AWS CIS, NIST 800-53, Azure CIS, GitHub CIS, and P1 Preventions for each platform.

Each benchmark card displays:
- The benchmark name and description
- Your current prevention score for that framework
- A clickable link to explore detailed objective-level scores

Click **View All** to see your complete list of [benchmarks](./prevention/index#benchmarks) and their scores.

## Recommendations

Displays your top 3 AI-generated [recommendations](./prevention/index#recommendations) for improving your prevention posture. Each recommendation shows:
- The objective title and priority level (P1-P5)
- What will be accomplished when implemented
- Concrete implementation guidance

Click **View All** to browse all available recommendations and their detailed implementation steps.

## Categories

Shows your prevention score for each of the seven security [categories](./prevention/index#categories):

- **Identity & Access**: Restrict privileged access and enforce authentication
- **Feature Restrictions**: Disable or limit risky service features
- **Trust & Sharing**: Prevent external or anonymous access
- **Data Governance**: Enforce data protection, encryption, and residency
- **Network Perimeter**: Restrict network connectivity and traffic patterns
- **Core Infrastructure**: Protect foundational governance infrastructure
- **Audit & Logging**: Protect audit trails and logging infrastructure

Each category card shows the number of objectives and your prevention score. Click any category or **View All** to explore objectives and detailed scores.

## Layers

Shows how your preventions are distributed across enforcement [layers](./prevention/index#layers) in the deployment lifecycle:

- **Build**: IaC scanning and CI/CD pipeline controls
- **Access**: Organization-level policies (SCPs, Azure Policy deny, GCP Org Policies)
- **Config**: Account and service settings that enforce secure defaults
- **Runtime**: Real-time remediation and enforcement

Each layer card shows the number of objectives with controls at that layer and your prevention score. Click any layer or **View All** to analyze your defense-in-depth strategy.

## Next Steps

- Click any section on the dashboard to drill into detailed scores and analysis
- Use the **[Explore](./prevention/dashboard/explore/index)** tab to customize groupings and filters for deeper investigation
- Review **[Reports](./prevention/dashboard/reports/index)** for specialized views like service boundaries and region restrictions
- Review your top recommendations and implement high-priority preventions
- Monitor your score over time as you add new preventions and expand coverage
