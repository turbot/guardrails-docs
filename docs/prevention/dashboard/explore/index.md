---
title: Explore
sidebar_label: Explore
---

# Explore

The Explore tab provides a flexible, interactive interface for analyzing your prevention scores with customizable grouping, filtering, and sorting options. Use Explore to investigate your prevention posture from multiple perspectives and drill down into specific areas of interest.

![Prevention Explore](./prevention-explore-default.png)

## Understanding the Explore View

The Explore view displays prevention data in a hierarchical table where scores aggregate at each level. By default, it groups by **Benchmark > Objective > Account**, but you can reorganize the data to support different analysis needs.

Each row shows:
- The name and description of the item
- The prevention score (color-coded: green = strong, orange = partial, red = gaps, gray = not applicable)
- The number of child items
- An expandable arrow to drill into details

## Grouping Data

Organize your prevention data hierarchically using up to four levels. Choose from:

- **Benchmark**: Compliance frameworks (AWS CIS, NIST 800-53, etc.)
- **Objective**: Individual prevention goals
- **Account**: Your cloud accounts (AWS, Azure, GCP, GitHub)
- **Category**: Security domains (Data Governance, Identity & Access, etc.)
- **Layer**: Enforcement stages (Build, Access, Config, Runtime)
- **Priority**: Importance levels (P1-P5)

You can reorder the grouping levels by dragging and dropping the grouping handles in the Filter & Group panel to customize your view

### Common Grouping Patterns

**Benchmark > Objective > Account** (default)
See how you're scoring against compliance frameworks, with each objective's score broken down by account.

**Account > Category > Objective**
Analyze each account's security posture by category.

**Category > Layer > Objective**
Understand your defense-in-depth strategy by seeing which objectives are addressed at which enforcement layers.

**Priority > Category > Objective**
Focus on the most critical objectives first by grouping by priority level.

**Layer > Account > Objective**
See how enforcement is distributed across layers for each account.

## Filtering Data

Narrow the data to specific subsets by filtering:

- **Layer**: Show only objectives at specific enforcement layers
- **Account**: Limit view to specific accounts
- **Objective**: Search for objectives by name or keywords
- **Category**: Show only objectives from specific security domains
- **Priority**: Filter to objectives of specific priority levels (P1-P5)

## Sorting Results

Control how items are ordered within each group level:

- **Score (Desc)**: Highest scores first—identify your strongest areas
- **Score (Asc)**: Lowest scores first—find gaps needing attention
- **Name (A-Z)**: Alphabetical order—systematic reviews
- **Priority (High to Low)**: Critical objectives first—prioritization

## Analyzing Prevention Scores

Look for patterns such as:

### Low Scores
Gaps in prevention coverage. Opportunities to add preventions (SCPs, policies, account settings) to improve security posture.

### Inconsistent Scores Across Accounts
When some accounts score well while others don't, suggests inconsistent policy application. Consider applying policies organization-wide.

### Missing Layers
If objectives show coverage at only one layer, consider adding defense-in-depth by implementing controls at additional layers.

### High-Priority Gaps
Low scores on P1 or P2 objectives represent the most critical risks. Prioritize these for remediation.

## Example Analysis Workflows

**Compliance audit preparation**
1. Group by Benchmark > Objective > Account
2. Filter to the specific compliance framework
3. Sort by Score (Asc) to identify failing objectives
4. Expand each low-scoring objective to see which accounts need remediation

![Compliance Audit Preparation](./prevention-explore-compliance-audit.png)

**Account security review**
1. Group by Account > Category > Objective
2. Filter to the specific account
3. Review scores across all categories
4. Identify objectives with low scores and review what preventions exist

![Account Security Review](./prevention-explore-account-security-review.png)

**Priority-driven remediation**
1. Group by Priority > Category > Objective
2. Filter to P1 and P2 priorities
3. Sort by Score (Asc)
4. Focus remediation on the lowest-scoring P1/P2 objectives

![Priority-Driven Remediation](./prevention-explore-priority-remediation.png)

**Layer coverage analysis**
1. Group by Layer > Objective
2. Review distribution of objectives across layers
3. Identify objectives with coverage at only one layer
4. Plan additional controls at other layers for defense-in-depth

![Layer Coverage Analysis](./prevention-explore-layer-coverage.png)

## Next Steps

- Experiment with different grouping combinations to find views that match your analysis needs
- Use filters to focus on specific areas of concern or responsibility
- Bookmark useful views by copying the URL (filters and groupings are included in URL parameters)
- Export or screenshot key views for security reports and presentations
- Click through to individual objectives to see detailed information about preventions and recommendations
