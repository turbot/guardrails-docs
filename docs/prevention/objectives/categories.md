---
title: Categories
sidebar_label: Categories
---

# Categories

The Categories tab organizes prevention objectives by security domain, helping you understand your security posture across different areas and identify gaps in specific domains. This view groups objectives into seven key categories: Core Infrastructure, Data Governance, Identity & Access, Trust & Sharing, Network Perimeter, Audit & Logging, and Feature Restrictions.

## Understanding Categories

Prevention categories represent different security domains that collectively protect your cloud environment. Each category addresses a specific aspect of cloud security, and balanced coverage across all categories provides defense-in-depth.

## Category Definitions

### Core Infrastructure

**Purpose:** Controls that protect foundational infrastructure and control plane resources that were deployed to manage and govern your cloud environment.

**What it protects:**
- Resources created by centralized management platforms (AWS Control Tower, Azure landing zones)
- Infrastructure components that provide governance capabilities
- Foundational security services (IAM Access Analyzer, Config, GuardDuty)
- Resources whose deletion or modification would compromise governance

**Example objectives:**
- Enforce AWS IAM Access Analyzer enablement
- Enforce IMDSv2 for AWS EC2 instances
- Require AWS Support access role
- Protect AWS Config recorders and delivery channels
- Restrict AWS resources to allowed regions
- Restrict usage to approved AWS services
- Restrict usage to approved Azure resource providers

**Why it matters:**
Core infrastructure controls provide the foundation for all other security measures. Compromising these controls can disable entire security programs or governance frameworks.

**Common gaps:**
- Allowing resources in unauthorized regions
- Permitting use of unapproved or risky services
- Not enforcing IMDSv2 for EC2 instances
- Lack of centralized access analyzer

**Priority distribution:**
Most core infrastructure objectives are P1 (critical) because they're prerequisites for other controls.

### Data Governance

**Purpose:** Controls related to data protection, encryption, residency, and lifecycle management across cloud platforms.

**What it protects:**
- Data at rest (encryption, access controls)
- Data in transit (TLS, HTTPS requirements)
- Data location and residency
- Data lifecycle (retention, deletion, recovery)
- Data classification and tagging
- Sensitive data handling

**Example objectives:**
- Enforce AWS S3 Block Public Access
- Require encryption at rest for AWS RDS instances
- Require HTTPS-only access to AWS S3 buckets
- Require security classification tags for resource creation
- Enforce MFA Delete for S3 buckets
- Require KMS encryption for AWS S3 buckets
- Require soft delete for Azure File Shares
- Require GitHub repository secret scanning push protection

**Why it matters:**
Data is the most valuable asset in most organizations. Data governance controls prevent breaches, ensure compliance with data protection regulations, and maintain customer trust.

**Common gaps:**
- Unencrypted data stores
- Lack of soft delete/recovery capabilities
- Missing data classification tags
- Permitting unencrypted data transmission
- No secret scanning in source code repositories

**Priority distribution:**
Mix of P1 (fundamental encryption, public access blocks), P2 (enhanced encryption, secret scanning), and P3 (soft delete, advanced governance).

### Identity & Access

**Purpose:** Controls that restrict privileged access to highly sensitive account capabilities and enforce strong authentication requirements.

**What it protects:**
- Root account access
- Administrative privileges
- Credential management
- Multi-factor authentication
- Permission boundaries
- Centralized identity management

**Example objectives:**
- Restrict AWS root user actions to emergency-only operations
- Require MFA for AWS root user authentication
- Prohibit root user access key creation
- Enforce centralized IAM user management
- Require permission boundaries for privileged roles
- Prohibit AWS IAM administrative privileges via wildcard policies
- Require GitHub organization to enforce multi-factor authentication
- Require GitHub repository push access to be restricted to trusted users

**Why it matters:**
Identity controls prevent account takeover, privilege escalation, and unauthorized access to the most sensitive capabilities. These are the most direct controls against insider threats and credential compromise.

**Common gaps:**
- Root user access keys still exist
- No MFA on root accounts
- Overly permissive IAM policies (wildcard actions/resources)
- Lack of MFA enforcement for regular users
- Too many users with administrative access

**Priority distribution:**
High concentration of P1 and P2 objectives, reflecting the critical nature of identity controls.

### Trust & Sharing

**Purpose:** Controls that prevent external or anonymous access to cloud resources based on identity boundaries and trust relationships.

**What it protects:**
- Public accessibility of resources
- Cross-account sharing
- External identity federation
- Anonymous access
- Attribute-based access based on data sensitivity

**Example objectives:**
- Restrict public accessibility of AWS RDS instances
- Restrict cross-account role assumption
- Safeguard S3 Block Public Access settings
- Enforce attribute-based access control for sensitive data
- Prohibit public AWS Lambda resource policies
- Prohibit public AWS Lambda function URLs
- Prohibit public access to AWS EC2 AMIs

**Why it matters:**
Trust & Sharing controls define who is trusted to access your resources. These controls prevent the most common cause of data breaches: publicly accessible resources that should be private.

**Common gaps:**
- Publicly accessible databases
- Public S3 buckets
- Public AMIs or snapshots
- Overly permissive cross-account roles
- Lack of controls on public Lambda functions

**Priority distribution:**
Mix of P1 (preventing public databases, critical data stores) and P2 (preventing public serverless functions, images).

### Network Perimeter

**Purpose:** Controls that restrict network connectivity and traffic patterns to prevent unauthorized network access paths.

**What it protects:**
- Remote access methods
- VPC endpoints for service connectivity
- Network boundaries
- Secure communication channels
- Traffic encryption

**Example objectives:**
- Restrict AWS Systems Manager Session Manager access
- Require VPC endpoints for service connectivity
- Prohibit CloudShell access in production
- Enforce secure transport protocols
- Enforce HTTPS-only listeners for AWS Elastic Load Balancers
- Require private endpoints for Azure Storage storage accounts

**Why it matters:**
Network controls define and enforce network boundaries to limit exposure and contain potential security incidents. They ensure data doesn't travel over insecure channels.

**Common gaps:**
- Allowing unencrypted HTTP traffic
- No requirement for private endpoints
- Unrestricted remote access tools
- Direct internet connectivity when VPC endpoints should be used

**Priority distribution:**
Mix of P2 (HTTPS enforcement) and P3 (private endpoints, remote access restrictions).

### Audit & Logging

**Purpose:** Controls that protect the integrity, availability, and confidentiality of audit trails and logging infrastructure across cloud platforms.

**What it protects:**
- CloudTrail, Cloud Audit Logs, Azure Monitor configurations
- Log encryption
- Log integrity through validation
- Audit log storage
- Log retention

**Example objectives:**
- Protect AWS CloudTrail configuration
- Protect AWS Config settings
- Protect AWS GuardDuty configuration
- Protect AWS Security Hub settings
- Require AWS VPC Flow Logs
- Require diagnostic settings for subscription activity logs

**Why it matters:**
Audit controls ensure you maintain a reliable record of who did what, when, and where. Without audit trails, security incidents cannot be investigated, and compliance cannot be proven.

**Common gaps:**
- CloudTrail not enabled in all regions
- Logs not encrypted
- No log file validation
- Logs stored without lifecycle policies
- Missing VPC Flow Logs

**Priority distribution:**
Mix of P1 (protecting CloudTrail, Config) and P3 (enhanced logging, diagnostic settings).

### Feature Restrictions

**Purpose:** Controls that disable or restrict specific service features or capabilities that pose security risks or violate organizational policies.

**What it protects:**
- Remote access capabilities
- Service usage by region
- Compute instance types
- Marketplace usage
- Legacy service features
- Risky service capabilities

**Example objectives:**
- Prohibit AWS CloudShell full access
- Restrict AWS region usage
- Restrict compute instance types
- Restrict AWS Marketplace usage
- Disable legacy service features
- Require Standard SKU or higher for Azure SQL Databases

**Why it matters:**
Feature restrictions limit functionality to reduce attack surface and enforce organizational standards while maintaining operational capability.

**Common gaps:**
- CloudShell accessible in production accounts
- No restrictions on expensive or risky instance types
- Unrestricted Marketplace usage
- Legacy features still enabled

**Priority distribution:**
Mix of P1 (region restrictions), P2 (CloudShell restrictions), and P3 (instance type restrictions).

## Page Layout

### Grouping by Category

The Categories tab displays objectives in sections grouped by category:

**Category Section**
- Category name and icon
- Description of what the category protects
- Count of objectives in the category
- Aggregate score for the category
- List of individual objectives

### Category Cards

Each category section shows:
- **Category name**: e.g., "Identity & Access", "Data Governance"
- **Description**: What this category protects and why it matters
- **Objective count**: Total objectives in this category
- **Score**: Average or overall score for the category
- **Status indicator**: Visual representation of category health

## Search and Filter

**Search within categories:**
Find objectives by name even when viewing by category grouping.

**Filter options:**
- **By Account**: Show only objectives for specific accounts
- **By Priority**: Show only P1, P2, P3, or P4 objectives
- **By Score Range**: Show only objectives below a threshold

**Expand/collapse:**
- Click category sections to expand or collapse
- Focus on one category at a time

## Common Workflows

**Identifying security domain gaps**
1. Review scores for each category
2. Identify categories with scores below 3
3. Expand low-scoring categories to see specific objectives
4. Create remediation plans focused on the weakest categories

**Ensuring balanced security coverage**
1. Compare scores across all seven categories
2. Note if one category is significantly behind others
3. Prioritize work to bring all categories to similar maturity levels
4. Avoid over-investing in one category while neglecting others

**Planning security initiatives by domain**
1. Select a category to focus on (e.g., Data Governance)
2. Review all objectives in that category
3. Group related objectives together
4. Implement multiple related objectives simultaneously for efficiency

**Reporting security posture by domain**
1. Export or screenshot the category view
2. Present to leadership showing strength in each domain
3. Highlight weak categories that need investment
4. Propose category-specific remediation budgets

**Aligning teams to security domains**
1. Assign different teams to different categories
2. Data team owns Data Governance objectives
3. Platform team owns Core Infrastructure objectives
4. Security team owns Identity & Access and Audit objectives

**Responding to security assessments**
1. When assessments identify category-specific gaps, use this view
2. Review all objectives in the flagged category
3. Create comprehensive remediation plans addressing the category holistically

## Category Interdependencies

**Foundation categories (implement first):**
- Core Infrastructure
- Identity & Access
- Audit & Logging

**Dependent categories (implement after foundation):**
- Data Governance (depends on Core Infrastructure for encryption services)
- Network Perimeter (depends on Core Infrastructure for VPC setup)
- Trust & Sharing (depends on Identity & Access for access controls)

**Complementary categories (implement together):**
- Data Governance + Network Perimeter (protect data in transit and at rest)
- Identity & Access + Audit & Logging (enforce access and monitor usage)

## Best Practices

**Maintain balance across categories**
Don't achieve score 5 in Data Governance while Core Infrastructure is score 2. Aim for consistent maturity across all categories.

**Focus on P1 objectives across all categories**
Rather than completing one category entirely, ensure all P1 objectives across all categories are implemented first.

**Use categories to organize teams**
Assign category ownership to teams with relevant expertise (e.g., network team owns Network Perimeter).

**Track category scores over time**
Monitor which categories improve fastest and which lag behind.

**Communicate in business terms**
Translate categories to business outcomes when talking to executives:
- Identity & Access = Prevent account takeover
- Data Governance = Protect customer data
- Audit & Logging = Enable security investigations

**Address foundational categories first**
Core Infrastructure and Identity & Access provide prerequisites for other categories.

**Don't neglect Feature Restrictions**
While less glamorous than encryption or access controls, feature restrictions reduce attack surface significantly.

## Next Steps

- Review [Benchmarks](./benchmarks.md) to see how categories map to compliance frameworks
- Check [Objectives](./objectives.md) to see full details on individual objectives
- View [Priorities](./priorities.md) to focus on critical objectives first
- Visit [Recommendations](../recommendations/index.md) for category-specific implementation guidance
- Check [Accounts](../accounts/index.md) to see category scores by account
