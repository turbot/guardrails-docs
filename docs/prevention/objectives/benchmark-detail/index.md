---
title: Benchmark Detail
sidebar_label: Benchmark Detail
---

# Benchmark Detail

The Benchmark Detail page provides a comprehensive view of a compliance framework or industry standard, showing how your organization scores against each section of the benchmark and which specific objectives need attention.

![Benchmark Detail Page](./benchmark-detail.png)

## Understanding Benchmarks

Benchmarks are collections of prevention objectives organized into logical groups—industry standards (CIS, NIST), compliance frameworks, vendor best practices (P1 Preventions), or custom organization-specific frameworks. The page header shows the benchmark name and version (like "AWS CIS v6.0.0"), description of what it covers, and overall prevention score (0-5) across all accounts.

Benchmarks organize into collapsible sections representing logical groupings. AWS CIS v6.0.0, for example, has sections like Identity and Access Management (21 items), Storage (3 items), Logging (9 items), Monitoring (16 items), and Networking (7 items). Each section shows its number and name, description, item count, and prevention score (0-5).

Click any section to expand and view individual objectives—their titles, descriptions, priority levels (P1-P4), current scores, and categories. This hierarchical view helps you understand how objectives are grouped, identify which sections have lower scores, focus remediation on specific benchmark areas, and track progress toward compliance.

## Interpreting Scores

Benchmark scores represent overall compliance—5 means full compliance (all objectives met), 4 means strong compliance (most objectives met), 3 means moderate compliance (partial implementation), 2 means limited compliance (significant gaps), and 0-1 means minimal or no compliance. Section scores show compliance within each grouping—high-scoring sections indicate strong coverage in that domain while low-scoring sections highlight areas needing attention. Section scores matter because some compliance frameworks require minimum scores in specific sections (like needing 4+ in Identity and Access Management for certain regulatory requirements).

## Common Use Cases

To assess compliance against a benchmark, review the overall score in the header, scan section scores to identify weak areas, expand low-scoring sections to see specific objectives, and note which objectives score below your target threshold.

When planning remediation work, identify sections with the lowest scores, expand those sections to see individual objectives, click on each objective to understand why it's important, which accounts fail it, what preventions are needed, and how to implement them, create a remediation plan prioritizing P1 and P2 objectives, and track progress by monitoring section scores over time.

For comparing compliance across frameworks, open multiple benchmark detail pages in different tabs, compare overall scores, identify common objectives that appear in multiple benchmarks, focus on implementing objectives that satisfy multiple frameworks, and use this analysis to prioritize work providing broad compliance value.

When reporting compliance to stakeholders, open the relevant benchmark, note the overall score and date, document section scores to show compliance breakdown, screenshot or export section scores for reports, highlight sections with high scores to demonstrate strengths, and identify low-scoring sections with remediation plans.

## How Benchmarks Organize

Different benchmarks organize objectives differently. CIS Benchmarks typically group by service or function (Identity and Access Management, Storage, Logging, Monitoring, Networking, Data Protection). NIST Frameworks organize by control families (Access Control, Audit and Accountability, Configuration Management, Identification and Authentication, System and Communications Protection). Vendor P1 Preventions group by prevention category (Core Infrastructure, Identity & Access, Data Governance, Trust & Sharing, Network Perimeter, Audit & Logging). Understanding how your benchmark organizes objectives helps you navigate the framework and communicate with stakeholders familiar with the standard.

You can create custom benchmarks to track organization-specific security requirements—when you have requirements beyond industry standards, need to track internal security policies, want to measure progress toward organizational security goals, or need to demonstrate compliance with customer-specific requirements. Custom benchmarks follow the same structure as industry standards, letting you organize objectives into meaningful sections aligned with your security program.

## Next Steps

- Return to [Objectives](/guardrails/docs/prevention/objectives) to view all benchmarks
- Click into individual objectives to see account coverage and implementation guidance
- Review [Recommendations](/guardrails/docs/prevention/recommendations) for prioritized remediation guidance
- Check [Accounts](/guardrails/docs/prevention/accounts) to see which accounts need attention for this benchmark
