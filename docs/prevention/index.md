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

Most security tools tell you what's wrong after something's already deployed—a public S3 bucket, an unencrypted database, a security group open to the world. Prevention-first security stops these issues before they reach production. Guardrails discovers the preventive controls already in your environment (Service Control Policies, Azure Policies, account settings, etc.), maps them to security objectives, and scores how well you're preventing issues before they can occur.

## Key Concepts

### Objectives

Objectives are security goals—the outcomes you're trying to achieve. "Restrict AWS resources to allowed regions" is an objective. "Require encryption at rest for AWS EBS volumes" is another. "Prohibit public access to S3 buckets" is a third. These aren't technical controls; they're the security requirements you need to meet.

Each objective has a category (like Data Governance or Identity & Access) that groups related goals, and a priority (P1 through P5) indicating how critical it is. P1 objectives are foundational controls that should be implemented everywhere. P4-P5 objectives are nice-to-haves.

### Preventions

Preventions are the actual technical controls implementing your objectives. While objectives describe what you're trying to accomplish, preventions are how you're accomplishing it. To achieve "require encryption at rest for AWS EBS volumes," you might have an SCP denying unencrypted volume creation, an EC2 account setting enabling default encryption, and a Guardrails control remediating any unencrypted volumes. All three preventions contribute to the same objective.

Each prevention has a type (Service Control Policy, Azure Policy, account setting, etc.) that determines how it works and a layer (Build, Access, Config, or Runtime) that indicates when it operates in the resource lifecycle.

### Layers

Preventions operate at different points in time, which we call layers. Build layer controls catch problems in Infrastructure as Code before deployment. Access layer controls block dangerous API calls at the organization level. Config layer controls enforce settings on existing resources. Runtime layer controls detect and respond to issues during operation.

The layer affects both timing and defensive strength. Access layer controls (weighted 0.95) score highest because they're hardest to bypass and apply most broadly. Build layer controls (weighted 0.75) score slightly lower because they only apply to IaC-managed resources. Defense-in-depth means having controls at multiple layers—if one fails, others provide backup.

### Categories

Categories organize objectives by security domain—Identity & Access, Data Governance, Trust & Sharing, Network Perimeter, Core Infrastructure, Audit & Logging, and Feature Restrictions. This organization helps ensure balanced security coverage. You might have excellent identity controls but weak data protection, or strong network defenses but poor audit logging. The category view makes these imbalances visible.

### Priorities

Priorities indicate how critical each objective is. P1 objectives are foundational controls that should be implemented immediately—things like restricting resources to allowed regions, requiring MFA for root accounts, and blocking public databases. P2 objectives provide strong security improvements. P3 objectives enhance posture through defense-in-depth. P4-P5 objectives are optimizations and hygiene.

Priority weighting uses a reverse Fibonacci sequence: P1 objectives have 8x the weight of P5 objectives. This means improving a single P1 objective has more impact on your score than improving multiple lower-priority objectives—reflecting the reality that fixing critical gaps matters more than polishing edge cases.

### Benchmarks

Benchmarks are compliance frameworks that organize objectives—AWS CIS v6.0.0, NIST 800-53 Rev 5, Azure CIS v5.0.0, and so on. Each benchmark shows your prevention score for that framework, helping you track progress toward compliance certification. Many objectives appear in multiple benchmarks, so implementing one prevention can improve multiple framework scores simultaneously.

### Recommendations

Recommendations are prioritized suggestions for what to implement next. They target specific objectives where you have coverage gaps, explain the security impact, and provide implementation guidance. Recommendations are ordered by potential risk reduction, considering both the objective's priority and your current coverage level.

### Prevention Scores

Your prevention score (0-5 scale) measures how well you're preventing security issues before they occur. The score considers which objectives have preventions in place, how strong those preventions are (layer weighting), and how important the objectives are (priority weighting). Scores aggregate at every level—by objective, account, category, benchmark—so you can analyze your posture from multiple perspectives and identify where to focus improvement efforts.
