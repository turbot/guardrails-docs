---
title: Accounts
sidebar_label: Accounts
---

# Accounts

The Accounts tab provides a flat list view of all cloud accounts, subscriptions, and repositories managed by Turbot Guardrails. Use this view to search, filter, and sort accounts to quickly find those needing attention.

![Accounts List](./accounts-list-loaded.png)

## Understanding the Accounts List

The Accounts list shows all your cloud accounts, subscriptions, and repositories in one place—AWS accounts (12-digit numbers), Azure subscriptions, GCP projects, and GitHub repositories. Each row shows the account name and ID, which organizational folder or OU it belongs to, its prevention score (0-5 indicating how well it's protected), active alerts, and how many controls are running.

This is your starting point for understanding prevention coverage across your environment. You can quickly spot accounts with weak protection by sorting by score, filter to specific cloud providers to check consistency, or search for specific accounts you're investigating. The view adapts to how you work—whether you're hunting for gaps, tracking compliance across accounts, or responding to alerts.

## Finding What You Need

Search filters results in real-time as you type—useful when you know the account name or ID. Filtering lets you narrow to specific cloud providers (AWS, Azure, GCP, GitHub), Turbot Guardrails folders, or resource tags. Sorting changes how accounts are ordered—alphabetically by default, but you can sort by score to find gaps (Low to High shows weakest protection first), by newest/oldest to see recently added accounts, or by updated recently to see where changes happened.

![Filter panel showing cloud provider and folder options](./accounts-filter-panel.png)

The Sort dropdown includes "Score (Low to High)" which is particularly useful for finding accounts needing attention. Accounts with scores below 3 often have significant gaps in prevention coverage.

![Sort options including score, name, and date](./accounts-sort-options.png)

## Understanding Prevention Scores

Prevention scores run from 0 (minimal or no preventive controls) to 5 (comprehensive prevention across multiple layers). A score of 3 means moderate coverage with noticeable gaps. A score of 4 indicates solid implementation. Scores above 4 reflect strong, defense-in-depth protection. Low scores signal opportunities to implement additional preventions—SCPs, policies, account settings, or Guardrails controls—to reduce risk.

These scores aggregate all prevention objectives weighted by priority, so a low score might mean you're missing critical P1 controls or simply lack coverage across many objectives. Click into an account to see which specific objectives aren't being met and what recommendations exist to improve the score.

## Account Detail View

Clicking any account name opens the Account Detail page, which provides an in-depth view of prevention coverage for that single cloud account, subscription, or repository. This page breaks down the overall prevention score into specific categories, benchmarks, and recommendations, helping you understand exactly which preventions are implemented and which gaps need to be addressed.

![Account Prevention Detail Page showing scores and recommendations](../detail/account-detail-prevention.png)

The Account Detail page shows:

**Overall Maturity** - Your prevention score as a shield icon with the number, plus total objectives and preventions evaluated. This gives you a quick sense of how well-protected this account is.

**Benchmarks** - How this account scores against compliance frameworks—AWS CIS v6.0.0, Azure CIS v5.0.0, GCP CIS v3.0.0, GitHub CIS v1.1.0, and P1 Preventions benchmarks. A score of 5 means full compliance while scores of 0-2 signal significant gaps.

**Recommendations** - Actionable guidance for improving this account's protection. Each recommendation shows what needs to be implemented, its priority level (P1 through P4), and the security impact you'll get. Click any recommendation to see detailed implementation guidance including step-by-step instructions and policy templates.

**Categories** - Preventions organized by security domain—Identity & Access, Data Governance, Trust & Sharing, Network Perimeter, Core Infrastructure, Audit & Logging, and Feature Restrictions. This helps you spot imbalances—if Identity & Access scores 4.5 but Data Governance scores 1.5, you know where to focus improvement efforts.

**Layers** - Coverage across different enforcement timing—Build (stop risky configurations before deployment), Access (control who can access resources), Config (enforce required configurations), and Runtime (detect and respond to risky behavior). Balanced coverage across layers provides better protection than perfect coverage at a single layer.

## Common Use Cases

To find accounts with weak prevention coverage, sort by Score (Low to High) and review accounts below 3. Click into each one to see which objectives aren't met and implement the recommended preventions. This is especially important for production accounts where gaps represent real risk.

When reviewing accounts by cloud provider, filter to AWS, Azure, or GCP and scan the prevention scores. If some accounts score 4.5 but others score 2.0, you have inconsistent protection—likely because preventions were implemented in some accounts but not others. This inconsistency often happens when accounts were created at different times or by different teams without standardized baselines.

If you see non-zero alert counts, click the alert number to view details. Alerts indicate controls in alarm state—configurations that violate policies or drift from desired state. Taking corrective action based on alert severity keeps your environment compliant with the preventive controls you've defined.

To improve an account's prevention score, open the Account Detail page, check the Overall Maturity score to understand current state, then review Recommendations for prioritized actions. Start with P1 recommendations and implement them using the detailed guidance provided. Return to this page after implementation to verify the score improves.

## Next Steps

- Use the [Organizations](/guardrails/docs/prevention/accounts/organizations) view to see account hierarchy
- Use the [Folders](/guardrails/docs/prevention/accounts/folders) view to analyze accounts by logical grouping
- Use the [Visualize](/guardrails/docs/prevention/accounts/visualize) view for a graphical representation
- Review [Recommendations](/guardrails/docs/prevention/objectives/recommendations) to prioritize prevention work
