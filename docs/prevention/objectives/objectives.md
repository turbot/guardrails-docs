---
title: Objectives
sidebar_label: Objectives List
---

# Objectives

The Objectives tab lists all individual prevention objectives across your cloud environment. This view helps you understand specific security goals, track their achievement across accounts, and identify which preventions implement each objective.

![Objectives View](./objectives-list.png)

## Understanding the Objectives Tab

Prevention objectives are specific security goals that define what you want to prevent or enforce in your cloud environment. Each objective can be achieved through one or more preventions (technical controls like Service Control Policies, Azure Policies, or Guardrails controls).

**Example objectives:**
- Prohibit public access to AWS RDS DB instances
- Require MFA for AWS root user authentication
- Enforce encryption at rest for AWS EBS volumes
- Restrict AWS resources to allowed regions
- Require GitHub repository secret scanning push protection

## Page Layout

### Header Section

- **Page title**: "Objectives - Browse all prevention objectives with their scores and compliance status"
- **Navigation tabs**: Benchmarks, Objectives, Recommendations, Priorities, Categories
- **Search box**: Search objectives by keyword
- **Filter button**: Filter by account, category, or priority
- **Sort dropdown**: Order by priority (default), title, or score

### Objective Cards

Each objective card displays:
- **Title**: What the objective aims to prevent or enforce
- **Category badge**: The security domain (e.g., Trust & Sharing, Data Governance, Identity & Access)
- **Priority badge**: P1 (critical), P2 (high), P3 (medium), or P4 (low)
- **Description**: Why this objective matters and what risks it mitigates
- **Prevention score**: Current score (0-5) indicating how well the objective is met across accounts

**Example objective card:**
```
Prohibit public access to AWS RDS DB instances
Trust & Sharing | P1

Prevent RDS database instances from being publicly accessible to protect
sensitive data and eliminate external attack vectors. This critical control
ensures databases are only accessible from within your network perimeter,
reducing exposure to unauthorized access.

Score: 5
```

## Search and Filter

**Search functionality:**
Use the search box to find objectives by:
- Objective name (e.g., "RDS", "encryption", "MFA")
- Service or resource type (e.g., "S3", "Lambda", "GitHub")
- Security control type (e.g., "public access", "encryption", "authentication")
- Compliance framework (e.g., "CIS", "NIST")

**Filter options:**
Click the Filter button to narrow the list:
- **By Account**: Show only objectives that apply to specific accounts
- **By Category**: Focus on objectives in selected security domains
  - Identity & Access
  - Data Governance
  - Trust & Sharing
  - Network Perimeter
  - Core Infrastructure
  - Audit & Logging
  - Feature Restrictions
- **By Priority**: Filter to P1 (critical), P2 (high), P3 (medium), or P4 (low)

**Sort options:**
Order objectives by:
- **Priority (High to Low)**: Default view showing P1 objectives first
- **Title (A to Z)**: Alphabetical order
- **Title (Z to A)**: Reverse alphabetical
- **Score (Low to High)**: Show objectives needing the most work first
- **Score (High to Low)**: Show best-performing objectives first

## Understanding Objective Scores

Prevention scores range from 0 to 5 and indicate how well an objective is being met:

- **5**: Full coverage—objective is met across all applicable accounts
- **4**: Strong coverage—objective is met in most accounts
- **3**: Moderate coverage—objective is partially met
- **2**: Limited coverage—objective is met in few accounts
- **0-1**: No or minimal coverage—objective is not being met

Low scores highlight opportunities to improve security posture by implementing preventions for that objective.

## Objective Priority Levels

**P1 (Critical)**
Most fundamental preventative controls that should be implemented immediately:
- Address critical security risks
- Required by most compliance frameworks
- Protect against common, high-severity threats
- Provide foundational security

**P2 (High)**
Important preventions that provide strong security improvements:
- Protect sensitive data or critical resources
- Prevent common attack vectors
- Recommended by compliance frameworks
- Moderate implementation complexity

**P3 (Medium)**
Additional preventions that enhance security posture:
- Provide defense-in-depth
- Support compliance requirements
- Improve operational security
- May have higher implementation complexity

**P4 (Low)**
Optional preventions for comprehensive coverage that provide incremental security improvements with lower overall impact.

## Objective Categories

**Identity & Access**
Controls that restrict privileged access and enforce strong authentication. Examples: MFA enforcement, root user restrictions, credential management.

**Data Governance**
Controls related to data protection, encryption, residency, and lifecycle management. Examples: encryption at rest/in transit, data classification, retention policies.

**Trust & Sharing**
Controls that prevent external or anonymous access based on identity boundaries. Examples: blocking public access, controlling cross-account sharing, managing federation.

**Network Perimeter**
Controls that restrict network connectivity and traffic patterns. Examples: enforcing HTTPS, requiring VPC endpoints, managing network boundaries.

**Core Infrastructure**
Controls that protect foundational infrastructure and control plane resources. Examples: protecting CloudTrail, Config, GuardDuty configurations.

**Audit & Logging**
Controls that protect audit trails and logging infrastructure. Examples: preventing log deletion, ensuring log encryption, maintaining log integrity.

**Feature Restrictions**
Controls that disable or restrict risky service features. Examples: limiting remote access, restricting service usage, controlling instance types.

## Common Workflows

**Finding objectives that need attention**
1. Use the default sort (Priority: High to Low)
2. Filter to show only P1 objectives
3. Look for objectives with low scores (0-2)
4. Click on those objectives to understand why the score is low
5. Implement preventions to improve the score

**Searching for specific security controls**
1. Enter keywords in the search box (e.g., "public access", "encryption", "MFA")
2. Review matching objectives
3. Note the priority and category for each objective
4. Click objectives to see which accounts need implementation
5. Use recommendations to get implementation guidance

**Reviewing objectives by security domain**
1. Use the Category filter to select a specific domain
2. Review all objectives in that category
3. Identify low-scoring objectives
4. Check if there are patterns (e.g., many data governance gaps)
5. Create a focused remediation plan for that category

**Understanding which objectives apply to specific accounts**
1. Use the Account filter to select an account
2. Review all objectives that apply to that account
3. Note which objectives have low scores
4. Click objectives to see recommended preventions
5. Implement preventions to improve the account's score

**Prioritizing remediation work**
1. Filter to P1 objectives with low scores (0-2)
2. Review the impact description for each objective
3. Identify objectives that address your biggest risks
4. Check implementation requirements in the objective detail pages
5. Create an implementation plan starting with highest-priority, lowest-effort controls

**Tracking progress over time**
1. Note the scores for key objectives
2. Implement recommended preventions
3. Return to the objectives tab regularly
4. Monitor score improvements for objectives you've worked on
5. Celebrate wins when objectives reach score 4 or 5

## Objective Detail Pages

Click any objective to view its detail page, which shows:
- **Summary**: What the objective prevents or enforces
- **Matched Preventions**: Which technical controls achieve this objective
- **Account Coverage**: Which accounts meet the objective and which don't
- **Recommendations**: Specific steps to implement preventions for this objective
- **Examples**: Policy templates and configuration guidance
- **Compliance Mapping**: Which benchmark requirements this objective satisfies

## Best Practices

**Start with P1 objectives**
Critical objectives provide the most security value and are often prerequisites for P2 and P3 controls.

**Focus on low-scoring P1 and P2 objectives**
These represent significant security gaps that should be addressed promptly.

**Implement objectives across all accounts consistently**
Achieving an objective in one account while leaving others exposed creates unnecessary risk.

**Use objectives to communicate with leadership**
Objective scores provide clear, measurable metrics to report security posture to executives.

**Align objectives with threat models**
Prioritize objectives that address your organization's most likely or most impactful threats.

**Consider implementation effort**
When multiple P1 objectives need attention, start with the ones that are easiest to implement for quick wins.

**Track objectives relevant to your compliance needs**
If you're pursuing CIS certification, focus on objectives from the CIS benchmarks.

**Review objectives regularly**
As your environment evolves, new objectives may become relevant or priorities may shift.

## Next Steps

- Click into any [objective detail page](./objective-detail.md) to see full information
- Review [Benchmarks](./benchmarks.md) to see how objectives map to compliance frameworks
- Check [Priorities](./priorities.md) to view objectives grouped by priority level
- Explore [Categories](./categories.md) to see objectives organized by security domain
- Visit [Recommendations](../recommendations/index.md) for implementation guidance
- View [Accounts](../accounts/index.md) to see objective scores by account
