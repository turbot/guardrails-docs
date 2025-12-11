---
title: Prevention
---

# Prevention

<div style="display: flex; justify-content: center; align-items: center; margin: 2rem 0;">
  <object
     style="width: 100%; height: auto;"
     data="/images/prevention/vector-graphics/hero-motion.svg"
     type="image/svg+xml"
     aria-label="Prevention Security Flow Diagram">
  </object>
</div>

Turbot Guardrails enables prevention-first cloud security, stopping misconfigurations, policy violations, and risky deployments before they reach production.

## Understanding Prevention-First Security

Most security tools tell you what's wrong after something's already deployed—a public S3 bucket, an unencrypted database, a security group open to the world. Prevention-first security stops these issues before they reach production. Guardrails discovers the preventions already in your environment (Service Control Policies, Azure Policies, account settings, etc.), maps them to security objectives, and scores how well you're preventing issues before they can occur.

## Key Concepts

### Objectives

[Objectives](/guardrails/docs/prevention/objectives) are security goals—the outcomes you're trying to achieve. "Restrict AWS resources to allowed regions" is an objective. "Require encryption at rest for AWS EBS volumes" is another. "Prohibit public access to S3 buckets" is a third. These aren't preventive mechanisms; they're the security requirements you need to meet.

Each objective has a category (like Data Governance or Identity & Access) that groups related goals, and a priority (P1 through P5) indicating how critical it is. P1 objectives are foundational preventions that should be implemented everywhere. P4-P5 objectives are nice-to-haves.

### Preventions

[Preventions](/guardrails/docs/prevention/preventions) are the actual preventive mechanisms implementing your objectives. While objectives describe what you're trying to accomplish, preventions are how you're accomplishing it. To achieve "require encryption at rest for AWS EBS volumes," you might have an SCP denying unencrypted volume creation, an EC2 account setting enabling default encryption, and a Guardrails control remediating any unencrypted volumes. All three preventions contribute to the same objective.

Each prevention has a [type](/guardrails/docs/prevention/preventions/types) (Service Control Policy, Azure Policy, account setting, etc.) that determines how it works and a layer (Build, Access, Config, or Runtime) that indicates when it operates in the resource lifecycle.

### Layers

Preventions operate at different points in time, which we call [layers](/guardrails/docs/prevention/preventions/layers). Build layer preventions catch problems in Infrastructure as Code before deployment. Access layer preventions block dangerous API calls at the organization level. Config layer preventions enforce settings on existing resources. Runtime layer preventions detect and respond to issues during operation.

The layer affects both timing and defensive strength. Access layer preventions (weighted 0.95) score highest because they're hardest to bypass and apply most broadly. Build layer preventions (weighted 0.75) score slightly lower because they only apply to IaC-managed resources. Defense-in-depth means having preventions at multiple layers—if one fails, others provide backup.

### Categories

[Categories](/guardrails/docs/prevention/objectives/categories) organize objectives by security domain—Identity & Access, Data Governance, Trust & Sharing, Network Perimeter, Core Infrastructure, Audit & Logging, and Feature Restrictions. This organization helps ensure balanced security coverage. You might have excellent identity preventions but weak data protection, or strong network defenses but poor audit logging. The category view makes these imbalances visible.

### Priorities

[Priorities](/guardrails/docs/prevention/objectives/priorities) indicate how critical each objective is. P1 objectives are foundational preventions that should be implemented immediately—things like restricting resources to allowed regions, requiring MFA for root accounts, and blocking public databases. P2 objectives provide strong security improvements. P3 objectives enhance posture through defense-in-depth. P4-P5 objectives are optimizations and hygiene.

Priority weighting uses a reverse Fibonacci sequence: P1 objectives have 8x the weight of P5 objectives. This means improving a single P1 objective has more impact on your score than improving multiple lower-priority objectives—reflecting the reality that fixing critical gaps matters more than polishing edge cases.

### Benchmarks

[Benchmarks](/guardrails/docs/prevention/objectives/benchmarks) are compliance frameworks that organize objectives—AWS CIS v6.0.0, NIST 800-53 Rev 5, Azure CIS v5.0.0, and so on. Each benchmark shows your prevention score for that framework, helping you track progress toward compliance certification. Many objectives appear in multiple benchmarks, so implementing one prevention can improve multiple framework scores simultaneously.

### Recommendations

[Recommendations](/guardrails/docs/prevention/objectives/recommendations) are prioritized suggestions for what to implement next. They target specific objectives where you have coverage gaps, explain the security impact, and provide implementation guidance. Recommendations are ordered by potential risk reduction, considering both the objective's priority and your current coverage level.

## Prevention Scores

Prevention scores measure how well you're preventing security issues before they occur. Understanding how scores are calculated helps you interpret what they mean and where to focus improvement efforts.

#### The Scale

Prevention scores range from 0 to 5:

- **0-1**: Minimal or no preventions—significant security gaps exist
- **2**: Limited prevention coverage—some preventions in place but major gaps remain
- **3**: Moderate coverage with noticeable gaps—basic protections exist but not comprehensive
- **4**: Solid prevention implementation—good coverage across most areas
- **5**: Comprehensive prevention across multiple layers—strong defense-in-depth

Scores aren't pass/fail thresholds—they're maturity indicators showing where you are and how much work remains. Going from 2.0 to 3.5 represents meaningful progress even if you haven't reached 5.0.

#### What Goes Into a Score

Three factors determine prevention scores:

**Coverage** - Which objectives have preventions in place. An objective with no preventions scores 0. An objective with preventions in some accounts but not others scores in the middle range. An objective with preventions across all applicable accounts scores higher.

**Layer Weighting** - How strong those preventions are based on when they operate. Preventions at different layers have different defensive strength:
- **Access layer** (0.95 weight) - Control who can do what (API-level authorization)
- **Config layer** (0.85 weight) - Enforce secure defaults everywhere
- **Runtime layer** (0.75 weight) - Auto-fix in real time
- **Build layer** (0.55 weight) - Catch problems before launch (lowest weight - less runtime guarantee)

An objective protected by an Access layer SCP scores higher than the same objective protected only by a Runtime remediation control.

**Priority Weighting** - How important the objective is. Priorities indicate the severity of security objectives:
- **P1** (weight 8) - Direct path to data breach or service compromise
- **P2** (weight 5) - Significant security or compliance risk
- **P3** (weight 3) - Best practice violations with moderate risk
- **P4** (weight 2) - Optimization and hygiene issues
- **P5** (weight 1) - Low-priority items

This means P1 objectives have 8x the weight of P5 objectives. At the account level, priority weighting is applied as: `account_score = 100 × Σ(coverage × priority_weight) / Σ(priority_weight)`. This gives higher-priority objectives more influence on the overall account score, reflecting the reality that fixing critical gaps matters more than polishing edge cases.

#### Score Aggregation

Scores aggregate at every level of your environment using a three-level calculation pattern:

**1. Atomic Level** - Individual rule evaluation where `effective_coverage = quality × layer_weight`. This is where layer weight is applied, and it's never re-applied in higher rollups.

**2. Within-Account (same objective, multiple rules)** - Uses probabilistic OR to model defense-in-depth redundancy: `combined = 1 - Π(1 - effective_coverage_i)`. When multiple preventions protect the same objective in the same account, they provide redundant layers of defense.

**3. Cross-Account (same objective, multiple accounts)** - Uses simple average: `score = Σ(coverage) / count(accounts)`. Accounts are independent security boundaries, not redundant defenses, so their scores are averaged.

These calculations produce the following aggregated views:

**Objective scores** - How well a specific objective (like "prohibit public S3 buckets") is met across all applicable accounts. Considers coverage, layer weighting, and the preventions in place.

**Account scores** - How well a specific account is protected across all objectives. Aggregates all objective scores for that account, weighted by priority.

**Category scores** - How well a security domain (like Data Governance or Identity & Access) is covered. Aggregates objective scores within that category, weighted by priority.

**Benchmark scores** - How well you meet a compliance framework (like AWS CIS or NIST 800-53). Aggregates scores for all objectives in that benchmark, weighted by priority.

**Overall score** - Your total prevention posture across all objectives and accounts, weighted by priority.

This aggregation lets you analyze security from multiple perspectives—by account, by objective, by category, by compliance framework—and identify exactly where to focus improvement efforts.

#### Context Matters

Don't interpret scores in isolation:

**Trends matter more than snapshots** - If your score is improving over time, you're making progress. A score stuck at 2.5 for six months indicates stagnation.

**Priority creates urgency** - A P1 objective scoring 2 is urgent—it's a critical prevention with major gaps. A P4 objective scoring 2 is lower priority—it's nice to fix but not critical.

**Balance matters** - A balanced security program typically has reasonably consistent scores across categories (maybe 3.5-4.5 across the board). Highly unbalanced programs (5.0 for Identity & Access but 1.5 for Data Governance) indicate resource allocation problems.

**Perfect scores aren't always the goal** - Some organizations set practical targets: "All P1 objectives must score 4+ in production accounts. P2 objectives should score 3+. P3-P5 are discretionary." This creates clear expectations and measurable goals without demanding perfection everywhere.
