---
title: Explore
sidebar_label: Explore
---

# Explore

The Explore tab provides a flexible, interactive interface for analyzing your prevention scores with customizable grouping, filtering, and sorting options. Use Explore to investigate your prevention posture from multiple perspectives and drill down into specific areas of interest.

![Prevention Explore](./prevention-explore-default.png)

## Understanding the Explore View

The Explore view displays your prevention data in a hierarchical table where scores are aggregated at each level. By default, it groups by **Benchmark > Objective > Account**, showing how each benchmark's objectives are scored across your accounts. However, you can reorganize this data in any way that supports your analysis.

Each row in the explore view shows:
- The name and description of the item (benchmark, objective, account, category, or layer)
- The prevention score for that item
- The number of child items it contains
- An expandable arrow to drill into details

Scores are color-coded to provide visual indicators:
- **Green/high scores** indicate strong prevention coverage
- **Orange/medium scores** indicate partial coverage with room for improvement
- **Red/low scores** indicate significant gaps in prevention
- **Gray/no score** indicates objectives that don't apply or are muted

## Grouping Data

The **Group** section allows you to organize your prevention data hierarchically. You can group by up to four levels, choosing from:

- **Benchmark**: Compliance frameworks like AWS CIS v6.0.0 or NIST 800-53
- **Objective**: Individual prevention goals like "Require encryption for EBS volumes"
- **Account**: Your cloud accounts (AWS accounts, Azure subscriptions, GCP projects, GitHub repositories)
- **Category**: Security domains like Data Governance, Identity & Access, or Audit & Logging
- **Layer**: Enforcement stages like Access, Config, Runtime, or Build
- **Priority**: Importance levels from P1 (highest) to P5 (lowest)

### Common Grouping Patterns

**By Benchmark > Objective > Account** (default)
See how you're scoring against specific compliance frameworks, with each objective's score broken down by account. Useful for compliance reporting and identifying which accounts need attention for specific framework requirements.

**By Account > Category > Objective**
Analyze each account's security posture by category. Useful for account-specific security reviews and understanding where each account has strengths and weaknesses.

**By Category > Layer > Objective**
Understand your defense-in-depth strategy by seeing which objectives are addressed at which enforcement layers within each security category.

**By Priority > Category > Objective**
Focus on the most critical objectives first by grouping by priority level, helping you prioritize remediation efforts.

**By Layer > Account > Objective**
See how enforcement is distributed across Build, Access, Config, and Runtime layers for each account.

## Filtering Data

The **Filter** section lets you narrow the data to specific subsets. You can filter by:

### Layer
Show only objectives at specific enforcement layers:
- **Build**: IaC scanning and CI/CD pipeline controls
- **Access**: SCP, RCP, Azure Policy deny, GCP Org Policy controls
- **Config**: Account settings and service configurations
- **Runtime**: Real-time remediation and enforcement

### Account
Limit the view to specific accounts. Useful when investigating a particular account's prevention posture or comparing a subset of accounts.

### Objective
Search for specific objectives by name or keywords. For example, filter to objectives containing "encryption" to focus on data protection controls.

### Category
Show only objectives from specific security domains:
- Audit & Logging
- Network Perimeter
- Trust & Sharing
- Core Infrastructure
- Data Governance
- Identity & Access
- Feature Restrictions

### Priority
Filter to objectives of specific priority levels (P1-P5). Use this to focus on your most critical controls or to review lower-priority objectives that may need attention.

## Sorting Results

The **Sort** dropdown controls how items are ordered within each group level. Available sort options typically include:

- **Score (Desc)**: Highest scores first—useful for identifying your strongest areas
- **Score (Asc)**: Lowest scores first—useful for finding gaps that need attention
- **Name (A-Z)**: Alphabetical order—useful for systematic reviews
- **Priority (High to Low)**: Critical objectives first—useful for prioritization

## Search and Navigation

Use the search box at the top to quickly find specific benchmarks, objectives, accounts, or other items. The search filters the visible data in real-time.

Click the **Filter & Group** button to show or hide the filtering and grouping controls, giving you more space to view the results.

## Analyzing Prevention Scores

As you explore the data, look for patterns such as:

### Low Scores
Objectives or accounts with low scores indicate gaps in prevention coverage. These represent opportunities to add preventions (SCPs, policies, account settings) to improve your security posture.

### Inconsistent Scores Across Accounts
When some accounts score well on an objective while others don't, it suggests inconsistent policy application. Consider whether those policies should be applied organization-wide via SCPs or parent-level policies.

### Missing Layers
If objectives show coverage at only one layer (e.g., only Runtime), consider adding defense-in-depth by implementing controls at additional layers like Access or Config.

### High-Priority Gaps
Low scores on P1 or P2 objectives represent the most critical risks. These should be prioritized for remediation.

## Example Analysis Workflows

**Compliance audit preparation**
1. Group by Benchmark > Objective > Account
2. Filter to the specific compliance framework (e.g., AWS CIS v6.0.0)
3. Sort by Score (Asc) to identify failing objectives
4. Expand each low-scoring objective to see which accounts need remediation

**Account security review**
1. Group by Account > Category > Objective
2. Filter to the specific account being reviewed
3. Review scores across all categories
4. Identify objectives with low scores and review what preventions exist

**Priority-driven remediation**
1. Group by Priority > Category > Objective
2. Filter to P1 and P2 priorities
3. Sort by Score (Asc)
4. Focus remediation efforts on the lowest-scoring P1/P2 objectives

**Layer coverage analysis**
1. Group by Layer > Objective
2. Review distribution of objectives across layers
3. Identify objectives with coverage at only one layer
4. Plan additional controls at other layers for defense-in-depth

## Next Steps

- Experiment with different grouping combinations to find views that match your analysis needs
- Use filters to focus on specific areas of concern or responsibility
- Bookmark useful view configurations by copying the URL (filters and groupings are included in the URL parameters)
- Export or screenshot key views for inclusion in security reports and presentations
- Click through to individual objectives to see detailed information about preventions and recommendations
