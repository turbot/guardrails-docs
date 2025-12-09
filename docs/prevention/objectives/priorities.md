---
title: Priorities
sidebar_label: Priorities
---

# Priorities

The Priorities tab groups prevention objectives by their priority level, helping you focus remediation efforts on the most critical security controls first. This view organizes objectives into P1 (critical), P2 (high), P3 (medium), and P4 (low) priority tiers.

## Understanding Priority Levels

Prevention objectives are assigned priority levels based on multiple factors including security impact, compliance requirements, threat severity, and implementation dependencies.

## Priority Level Definitions

### P1 (Critical)

**Definition:** Most fundamental preventative controls that should be implemented immediately.

**Characteristics:**
- Address critical security risks with high likelihood or severe impact
- Required by most compliance frameworks (CIS, NIST, PCI, etc.)
- Protect against common, high-severity threats
- Often prerequisites for implementing P2 and P3 controls
- Have broad security impact across the environment

**Examples of P1 objectives:**
- **Restrict AWS resources to allowed regions**: Enforce data residency and compliance
- **Enforce block public ACLs for AWS S3 buckets**: Prevent accidental data exposure
- **Require MFA for AWS root user authentication**: Prevent account takeover
- **Prohibit public access to AWS RDS DB instances**: Protect sensitive databases
- **Restrict usage to approved Azure resource providers**: Reduce attack surface
- **Require GitHub organization to enforce multi-factor authentication**: Prevent unauthorized code changes

**When to implement:**
P1 objectives should be implemented immediately upon discovering they're not met. These controls provide foundational security and are typically quick to implement relative to their security value.

**Implementation approach:**
- Implement across all accounts simultaneously when possible
- Use phased rollout only when absolutely necessary (e.g., legacy application dependencies)
- Prioritize P1 objectives over all other work
- Accept minimal technical debt to get P1 controls in place quickly

### P2 (High)

**Definition:** Important preventions that provide strong security improvements.

**Characteristics:**
- Protect sensitive data or critical resources
- Prevent common attack vectors
- Recommended by compliance frameworks
- Moderate implementation complexity
- Significant risk reduction when implemented

**Examples of P2 objectives:**
- **Require encryption at rest for AWS EBS volumes**: Protect block storage data
- **Require KMS encryption for AWS S3 buckets**: Ensure customer-managed encryption
- **Prohibit public AWS Lambda resource policies**: Prevent unauthorized invocation
- **Require GitHub repository secret scanning push protection**: Block credential exposure
- **Require hardware MFA for AWS root user authentication**: Strongest authentication
- **Prohibit AWS IAM administrative privileges via wildcard policies**: Enforce least privilege

**When to implement:**
P2 objectives should be implemented soon after P1 controls are in place. These provide substantial security improvements and are often needed to satisfy compliance requirements.

**Implementation approach:**
- Implement within 30-90 days of P1 completion
- Prioritize based on your specific threat model and compliance needs
- Test in non-production environments first if controls may impact applications
- Plan for potential application changes if legacy systems don't support the control

### P3 (Medium)

**Definition:** Additional preventions that enhance security posture.

**Characteristics:**
- Provide defense-in-depth
- Support compliance requirements
- Improve operational security
- May have higher implementation complexity or operational impact
- Valuable but not foundational

**Examples of P3 objectives:**
- **Require soft delete for Azure File Shares**: Enable recovery from accidental deletion
- **Require private endpoints for Azure Storage storage accounts**: Eliminate public exposure
- **Require minimum TLS version 1.2 for Azure Storage storage accounts**: Prevent protocol attacks
- **Require Standard SKU or higher for Azure SQL Databases**: Enable comprehensive monitoring
- **Require diagnostic settings for subscription activity logs**: Support compliance and forensics

**When to implement:**
P3 objectives should be implemented after P1 and P2 controls are in place and stable. These controls complete your security posture but aren't urgent.

**Implementation approach:**
- Implement within 3-12 months based on resources and priorities
- Group similar P3 objectives together for efficiency (e.g., all Azure Storage hardening)
- Consider implementation alongside application modernization efforts
- Accept that some P3 controls may remain unimplemented indefinitely if risk is accepted

### P4 (Low)

**Definition:** Optional preventions for comprehensive coverage that provide incremental security improvements with lower overall impact.

**Characteristics:**
- Very specific use cases
- Marginal risk reduction
- May have significant operational impact
- Nice-to-have rather than must-have

**When to implement:**
P4 objectives are typically implemented only when pursuing the highest levels of security maturity or when specific compliance frameworks require them.

**Implementation approach:**
- Implement only after all P1, P2, and P3 controls are in place
- Evaluate cost-benefit carefully
- Accept many P4 controls may never be implemented

## Page Layout

### Grouping by Priority

The Priorities tab displays objectives in collapsible sections grouped by priority:

**P1 Section**
- Shows count of P1 objectives
- Displays aggregate score for all P1 objectives
- Lists individual P1 objectives with their scores
- Allows expanding/collapsing to manage view

**P2 Section**
- Shows count of P2 objectives
- Displays aggregate score for all P2 objectives
- Lists individual P2 objectives with their scores

**P3 Section**
- Shows count of P3 objectives
- Displays aggregate score for all P3 objectives
- Lists individual P3 objectives with their scores

**P4 Section**
- Shows count of P4 objectives
- Displays aggregate score for all P4 objectives
- Lists individual P4 objectives with their scores

### Priority Section Cards

Each priority section shows:
- **Priority level**: P1, P2, P3, or P4 with color coding
- **Objective count**: Total number of objectives at this priority
- **Aggregate score**: Average or overall score for all objectives at this priority
- **Status indicator**: Visual representation of overall compliance

## Search and Filter

**Search within priorities:**
Use the search box to find objectives by name, even when viewing by priority grouping.

**Filter options:**
- **By Account**: Show only objectives for specific accounts
- **By Category**: Show only objectives in selected security domains
- **By Score Range**: Show only objectives with scores below a threshold (e.g., < 3)

**Expand/collapse:**
- Click priority sections to expand or collapse individual objective lists
- Focus on one priority at a time for better readability

## Common Workflows

**Assessing overall security posture**
1. Review the aggregate score for each priority level
2. Note which priority levels have low scores
3. Expand sections to see individual low-scoring objectives
4. Prioritize work based on which priority level needs the most attention

**Planning quarterly security initiatives**
1. Focus on the P1 section first
2. Identify all P1 objectives with scores below 3
3. Create implementation plans for those objectives
4. Once P1 objectives are mostly satisfied (score > 4), move to P2

**Reporting to leadership**
1. Export or screenshot the priority-grouped view
2. Highlight aggregate scores for each priority level
3. Show progress by comparing scores over time
4. Explain what each priority level means for the business
5. Propose budget and resources based on priority gaps

**Allocating security team resources**
1. Assign different team members to different priority levels
2. Have senior engineers focus on P1 objectives
3. Have mid-level engineers tackle P2 objectives
4. Use P3 objectives as training opportunities for junior engineers

**Responding to audit findings**
1. Identify which priority level the audit finding relates to
2. If it's P1 or P2, treat as urgent remediation
3. If it's P3 or P4, negotiate timeline with auditors
4. Use priority level to justify remediation timelines

**Setting security roadmap milestones**
1. Q1 Milestone: All P1 objectives at score 4 or higher
2. Q2 Milestone: All P2 objectives at score 3 or higher
3. Q3 Milestone: All P1 and P2 objectives at score 5
4. Q4 Milestone: All P3 objectives at score 3 or higher

## Priority Assignment Methodology

Priorities are assigned based on a combination of factors:

**Security Impact (40% weight)**
- Severity of risk if objective is not met
- Breadth of resources or accounts affected
- Likelihood of exploitation

**Compliance Requirements (30% weight)**
- Required by critical compliance frameworks (CIS, NIST, PCI)
- Recommended by industry best practices
- Mandated by regulatory obligations

**Threat Landscape (20% weight)**
- Frequently exploited by attackers
- Part of common attack chains
- Increases in priority based on recent threat intelligence

**Implementation Dependencies (10% weight)**
- Prerequisites for other objectives
- Foundational controls needed for defense-in-depth

## Best Practices

**Complete one priority level before moving to the next**
Focus resources on achieving high scores (4-5) for all P1 objectives before investing heavily in P2.

**Don't ignore P2 while perfecting P1**
Once P1 objectives reach score 4, start implementing P2 while bringing P1 to score 5.

**Use priorities to manage stakeholder expectations**
When business units request exceptions to security controls, explain the priority level and why it matters.

**Reassess priorities periodically**
Threat landscapes change. What's P2 today might become P1 tomorrow based on new attack techniques.

**Balance priorities across categories**
Don't focus only on P1 Data Governance while ignoring P1 Identity & Access objectives.

**Consider compliance deadlines**
If you have a CIS audit in 60 days, temporarily prioritize CIS-related P2 objectives over non-CIS P1 objectives.

**Track velocity by priority**
Measure how many P1, P2, P3 objectives your team implements per quarter to forecast timelines.

**Celebrate priority milestones**
When all P1 objectives reach score 5, celebrate with the team to acknowledge the achievement.

## Next Steps

- Review [Benchmarks](./benchmarks.md) to see how priorities map to compliance frameworks
- Check [Objectives](./objectives.md) to see full details on individual objectives
- Explore [Categories](./categories.md) to ensure balanced coverage across security domains
- Visit [Recommendations](../recommendations/index.md) for priority-based implementation guidance
- View [Accounts](../accounts/index.md) to see priority scores by account
