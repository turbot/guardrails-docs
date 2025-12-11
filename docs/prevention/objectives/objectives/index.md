---
title: Objectives
sidebar_label: Objectives
---

# Objectives

This tab shows every prevention objective individually—all the security goals you're working toward, listed in one place with their current scores and priorities. While the Benchmarks tab organizes objectives by compliance framework, this view lets you see everything flat and search for exactly what you need.

![Objectives View](./objectives-list.png)

## What You're Looking At

Each card is a specific security goal. "Prohibit public access to AWS RDS DB instances" is an objective. "Require MFA for AWS root user authentication" is another. The score tells you how well that objective is being met across your environment—a 5 means excellent coverage, a 0-1 means it's not really being addressed.

The [priority](/guardrails/docs/prevention/objectives/priorities) badge (P1, P2, P3, or P4) indicates how critical the objective is. P1 objectives are foundational controls that should be in place everywhere. P4 objectives are nice-to-haves that improve security but aren't critical. The [category](/guardrails/docs/prevention/objectives/categories) badge tells you which security domain it belongs to—Identity & Access, Data Governance, Trust & Sharing, and so on.

This flat view is particularly useful when you know what you're looking for but don't want to navigate through benchmark hierarchies. Search for "encryption" and you'll immediately see all encryption-related objectives with their scores.

## Finding What You Need

The search and filter functions are the most useful features here. Search for "MFA" and you'll see all multi-factor authentication objectives. Filter to P1 only and you'll see just the critical objectives. Sort by score (low to high) to find your worst-performing objectives that need attention.

You can also filter by account to answer questions like "what objectives are we not meeting in the production account?" or filter by category to focus on one security domain at a time.

## Understanding Scores

[Objective scores](/guardrails/docs/prevention#prevention-scores) reflect how well you're preventing that specific issue across all applicable accounts. A score of 5 means you have strong preventions in place everywhere. A score of 2-3 means you have partial coverage—maybe some accounts are protected but others aren't, or the preventions you have are weaker than ideal.

The score takes into account the strength of your preventions (Access layer SCPs score higher than Runtime remediations) and the breadth of coverage (organization-wide preventions count more than account-specific ones). Clicking into an objective shows exactly which preventions are contributing to the score and which accounts still need coverage.

## Common Use Cases

- **To verify if you're preventing something** - Search for the relevant term, find the objective, check the score. If it's 4 or 5, yes, you're handling it well. If it's 0-2, no, there's a gap.

- **When planning security improvements** - Filter to P1 and sort by score to find your highest-priority gaps. These are the critical objectives you're not meeting—your most urgent work.

- **To identify category imbalances** - Compare average scores across categories. If your Data Governance objectives average 2.5 but your Identity & Access objectives average 4.5, you know where to focus.

## Objective Detail View

Clicking any objective opens the Objective Detail page, which provides in-depth information about that single prevention objective—which accounts meet it, which preventions achieve it, implementation recommendations, and CNAPP findings.

![Objective Detail Page showing tabs and account coverage](../objective-detail/objective-detail.png)

The Objective Detail page includes:

**Overview Tab** - Shows a summary explaining what this objective prevents or enforces, why it matters, what risks it mitigates, and how many active preventions achieve this objective. The Account Coverage table shows all accounts and their prevention scores (0-5) for this specific objective, helping you identify which accounts need attention.

**Preventions Tab** - Lists all preventions achieving this objective. Each entry shows the prevention name, prevention type (SCP, Azure Policy, GCP Organization Policy, or Guardrails control), layer (Build, Access, Config, or Runtime), and implementation status.

**Recommendations Tab** - Provides actionable guidance including step-by-step implementation instructions, policy templates, cloud provider-specific configurations, prerequisites and dependencies, and testing guidance. Recommendations are prioritized by security impact, compliance requirements, and implementation complexity.

**Findings Tab** - Shows detections from CNAPP and security scanning tools—which resources currently fail this objective, severity and risk level of each finding, and remediation guidance. Use findings to validate that preventions work as expected and identify resources created before preventions were enabled.

**Advanced Tab** - Provides technical information for API integration and automation—objective ID and metadata, API endpoints for querying objective status, and GraphQL examples. This tab is primarily for developers integrating prevention data into external systems.

### Using the Detail View

To determine why an account has a low score, find the account in the Account Coverage table, check the Preventions tab to see which controls achieve this objective, verify whether those preventions are implemented for that account, and review the Recommendations tab for implementation guidance.

When implementing an objective across all accounts, review the Summary to understand what it protects, check the Preventions tab for available options, use the Recommendations tab for step-by-step implementation and policy templates, and monitor the Account Coverage table to track rollout progress.

## Next Steps

- Review [Priorities](/guardrails/docs/prevention/objectives/priorities) to see objectives grouped by risk level
- Check [Categories](/guardrails/docs/prevention/objectives/categories) to see objectives organized by security domain
- View [Benchmarks](/guardrails/docs/prevention/objectives/benchmarks) to see how objectives map to compliance frameworks
- Visit [Recommendations](/guardrails/docs/prevention/objectives/recommendations) for prioritized implementation guidance
