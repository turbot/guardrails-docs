---
title: Objectives
sidebar_label: Objectives
---

# Objectives

The Objectives page shows what you're trying to accomplish with your preventive controls. While the Preventions page shows the technical controls you've implemented, the Objectives page focuses on the security goals those controls achieve—things like "require encryption at rest" or "prohibit public access to databases."

## What Objectives Represent

Think of objectives as your security requirements. Each objective describes a specific outcome you want to enforce across your cloud environment. "Prohibit public access to AWS RDS DB instances" is an objective. "Require MFA for AWS root user authentication" is another. These aren't technical implementations—they're the goals.

The value of organizing by objectives is that it lets you see whether your goals are being met, regardless of how they're technically implemented. You might achieve "restrict AWS resources to allowed regions" through an SCP, a Guardrails control, and an Azure Policy. The objective view rolls all of those up and tells you: yes, this goal is being met, and here's your score across all accounts.

Objectives are organized by priority (P1 for critical down to P4 for lower priority), category (like Identity & Access or Data Governance), and benchmark (like CIS or NIST). This organization helps you focus on what matters most and ensures you're covering all the security domains that matter to your organization.

## Different Ways to View Objectives

The Objectives section provides five different perspectives, each useful for different situations.

The **[Benchmarks tab](/guardrails/docs/prevention/objectives/benchmarks)** organizes objectives according to compliance frameworks like AWS CIS v6.0.0, NIST 800-53, or Azure CIS v5.0.0. This view is essential when you're pursuing compliance certification or need to report against a specific standard. Each benchmark shows your current score, and clicking into it reveals which sections need attention.

The **[Objectives tab](/guardrails/docs/prevention/objectives/objectives)** lists every objective individually with its current score and priority. This is useful when you're looking for a specific objective or want to see everything at once. You can search for "encryption" or "MFA" and immediately see all related objectives and how well you're meeting them.

The **[Recommendations tab](/guardrails/docs/prevention/recommendations)** flips the view to show what you should do next. Instead of browsing objectives yourself, it presents prioritized actions based on your coverage gaps, focusing on high-impact improvements.

The **[Priorities tab](/guardrails/docs/prevention/objectives/priorities)** groups objectives by their risk level—P1 objectives are fundamental controls that should be implemented everywhere, while P4 objectives are nice-to-haves. This view helps you focus on what matters most first.

The **[Categories tab](/guardrails/docs/prevention/objectives/categories)** organizes by security domain—Identity & Access, Data Governance, Trust & Sharing, and so on. This ensures you're not over-invested in one area while neglecting another. Balanced coverage across categories generally means stronger overall security.

## How to Use This Information

When you're working toward compliance certification, start with the Benchmarks tab. Find your target framework (like AWS CIS v6.0.0), check your current score, and drill into the lowest-scoring sections. Each section shows which objectives you're not meeting, and from there you can click through to see what preventions would help.

If you're prioritizing security work without a specific compliance target, the Priorities tab is more useful. Start with P1 objectives that have low scores—these are fundamental controls that should be in place everywhere. Once P1 coverage is solid, move to P2, and so on.

The Categories tab helps prevent blind spots. You might have excellent Identity & Access coverage but weak Data Governance. The category view makes these imbalances visible so you can address them before they become problems.

For day-to-day work, the Objectives tab with search is fastest. If someone asks "do we enforce MFA?" you can search for "MFA," see the relevant objectives, check the scores, and answer immediately.

## Understanding Objective Scores

[Objective scores](/guardrails/docs/prevention#prevention-scores) range from 0 to 5, measuring how well a specific security goal is met across all your accounts. A score of 5 means the objective is fully met everywhere with strong preventions. A score of 0-1 means you're not meeting the objective—preventions are missing, weak, or narrowly scoped.

The score considers coverage (how many accounts have preventions), layer weighting (Access layer preventions score higher than Runtime), and priority (a low score on a P1 objective is more urgent than on a P4 objective). Trends matter—if your score is improving, you're making progress.

## Next Steps

- Click into any [benchmark](/guardrails/docs/prevention/objectives/benchmarks#benchmark-detail-view) to see its grouped objectives
- Click into any [objective](/guardrails/docs/prevention/objectives/objectives#objective-detail-view) to see which accounts meet it and which preventions achieve it
- Review [Recommendations](/guardrails/docs/prevention/recommendations) for prioritized implementation guidance
- Return to [Accounts](/guardrails/docs/prevention/accounts) to see prevention scores by account
