---
title: Accounts
sidebar_label: Accounts
---

# Accounts

The Accounts page provides a centralized view of all cloud accounts, subscriptions, and repositories managed by Turbot Guardrails. Use this page to monitor prevention scores across your multi-cloud environment and identify accounts requiring attention.

![Accounts List](./accounts-list-loaded.png)

## Understanding the Accounts View

The Accounts page shows all your cloud accounts, subscriptions, and repositories in one place—AWS accounts (12-digit numbers), Azure subscriptions, GCP projects, and GitHub repositories. Each row shows the account name and ID, which organizational folder or OU it belongs to, its prevention score (0-5 indicating how well it's protected), active alerts, and how many controls are running.

This is your starting point for understanding prevention coverage across your environment. You can quickly spot accounts with weak protection by sorting by score, filter to specific cloud providers to check consistency, or search for specific accounts you're investigating. The view adapts to how you work—whether you're hunting for gaps, tracking compliance across accounts, or responding to alerts.

## Navigating Multiple Views

The Accounts section has four tabs—Accounts (flat list with search and sorting), Organizations (hierarchical view of cloud organization structures), Folders (grouping by Turbot Guardrails folders), and Visualize (graphical representation). Each view shows the same data from a different perspective. Use the flat list when you're looking for specific accounts or sorting by score. Use Organizations when you need to understand the AWS/Azure/GCP hierarchy. Use Visualize when you want to see how Service Control Policies or Azure Policies apply across the organization tree.

## Finding What You Need

Search filters results in real-time as you type—useful when you know the account name or ID. Filtering lets you narrow to specific cloud providers (AWS, Azure, GCP, GitHub), Turbot Guardrails folders, or resource tags. Sorting changes how accounts are ordered—alphabetically by default, but you can sort by score to find gaps (Low to High shows weakest protection first), by newest/oldest to see recently added accounts, or by updated recently to see where changes happened.

The Sort dropdown includes "Score (Low to High)" which is particularly useful for finding accounts needing attention. Accounts with scores below 3 often have significant gaps in prevention coverage.

## Understanding Prevention Scores

Prevention scores run from 0 (minimal or no preventive controls) to 5 (comprehensive prevention across multiple layers). A score of 3 means moderate coverage with noticeable gaps. A score of 4 indicates solid implementation. Scores above 4 reflect strong, defense-in-depth protection. Low scores signal opportunities to implement additional preventions—SCPs, policies, account settings, or Guardrails controls—to reduce risk.

These scores aggregate all prevention objectives weighted by priority, so a low score might mean you're missing critical P1 controls or simply lack coverage across many objectives. Click into an account to see which specific objectives aren't being met and what recommendations exist to improve the score.

## Common Use Cases

To find accounts with weak prevention coverage, sort by Score (Low to High) and review accounts below 3. Click into each one to see which objectives aren't met and implement the recommended preventions. This is especially important for production accounts where gaps represent real risk.

When reviewing accounts by cloud provider, filter to AWS, Azure, or GCP and scan the prevention scores. If some accounts score 4.5 but others score 2.0, you have inconsistent protection—likely because preventions were implemented in some accounts but not others. This inconsistency often happens when accounts were created at different times or by different teams without standardized baselines.

If you see non-zero alert counts, click the alert number to view details. Alerts indicate controls in alarm state—configurations that violate policies or drift from desired state. Taking corrective action based on alert severity keeps your environment compliant with the preventive controls you've defined.

## Next Steps

- Click on any account name to view detailed prevention scores by objective
- Use the [Organizations](/guardrails/docs/prevention/accounts/organizations) view to see account hierarchy
- Use the [Folders](/guardrails/docs/prevention/accounts/folders) view to analyze accounts by logical grouping
- Use the [Visualize](/guardrails/docs/prevention/accounts/visualize) view for a graphical representation
