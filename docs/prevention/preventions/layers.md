---
title: Prevention Layers
sidebar_label: Layers
---

# Prevention Layers

The Layers tab organizes preventions by enforcement layer: Build, Access, Config, and Runtime. This view helps you understand when and how preventions are enforced throughout the resource lifecycle and identify gaps in your defense-in-depth strategy.

## Understanding Prevention Layers

Prevention layers represent different points in the resource lifecycle where security controls can be enforced. Implementing preventions at multiple layers provides defense-in-depth—if one layer fails, others provide backup protection.

## The Four Prevention Layers

### Build Layer

**When It's Enforced:**
During resource creation and infrastructure-as-code deployment, before resources are deployed to cloud environments.

**What It Controls:**
Resource definitions in IaC templates (Terraform, CloudFormation, ARM templates), CI/CD pipelines, and deployment automation.

**How It Works:**
- Static analysis of IaC templates
- Policy-as-code enforcement (OPA, Sentinel, Checkov)
- CI/CD pipeline gates
- Pre-commit hooks
- Template validation

**Prevents:**
Risky configurations from ever being defined or deployed.

**Example Scenarios:**
- Terraform policy prevents defining public S3 buckets in templates
- CloudFormation guard rules block unencrypted RDS instances
- ARM template validation requires diagnostic settings
- Pre-commit hooks block secrets in code

**Advantages:**
- Catches issues earliest (shift-left security)
- Prevents deployment of non-compliant resources
- Fastest feedback loop for developers
- No runtime performance impact

**Limitations:**
- Only applies to IaC-managed resources
- Requires integration with deployment pipelines
- Doesn't protect against manual console changes
- Can slow down deployment if not optimized

**Example Preventions:**
- Terraform Sentinel policies
- CloudFormation Guard rules
- Azure Template validation
- GitHub Actions policy checks

**Current Coverage:**
Many organizations have minimal Build layer coverage because most preventions are implemented via cloud-native controls (SCPs, Azure Policies) rather than IaC policies.

### Access Layer

**When It's Enforced:**
When API calls are made, before actions are performed on cloud resources.

**What It Controls:**
Who can perform which actions on which resources. Controls API-level permissions and authorization.

**How It Works:**
- Service Control Policies (SCPs)
- IAM policies and permission boundaries
- Azure RBAC and custom roles
- GCP IAM bindings and organization policies
- Resource-based policies

**Prevents:**
Unauthorized API actions from being performed, even if IAM policies would otherwise allow them.

**Example Scenarios:**
- SCP denies stopping CloudTrail logging
- SCP blocks EC2 operations in unauthorized regions
- SCP prevents disabling S3 Block Public Access
- SCP requires MFA for sensitive operations
- Azure Policy denies creation of public IP addresses

**Advantages:**
- Centralized enforcement across all accounts
- Cannot be bypassed by account administrators
- Immediate effect on all principals
- Works for both IaC and console actions

**Limitations:**
- Can be complex to test (affects all accounts)
- Requires careful exception management
- May inadvertently block automation
- Service-specific limitations (SCP size limits, action coverage)

**Example Preventions:**
- Restrict AWS resources to allowed regions (SCP)
- Prohibit root user actions (SCP)
- Require MFA for sensitive actions (SCP)
- Prevent disabling AWS Config (SCP)
- Deny creation of resources without required tags (Azure Policy Deny effect)

**Current Coverage:**
Access layer typically has the highest prevention count because SCPs, Azure Policies (Deny effect), and GCP Organization Policies are widely used.

### Config Layer

**When It's Enforced:**
After resources are deployed, ensuring they maintain required configurations.

**What It Controls:**
Resource configurations, settings, and properties. Enforces security baselines and compliance requirements on deployed resources.

**How It Works:**
- AWS Config Rules (with remediation)
- Azure Policy (DeployIfNotExists, Modify effects)
- GCP Organization Policy constraints
- Account-level settings (S3 Block Public Access, EC2 attributes)
- Guardrails enforce controls
- GitHub branch/tag rulesets

**Prevents:**
Resources from having insecure configurations, and can automatically remediate when configurations drift.

**Example Scenarios:**
- S3 Block Public Access settings prevent public buckets
- EC2 account attribute blocks public AMI sharing
- Azure Policy modifies storage accounts to enable encryption
- GitHub branch ruleset prevents force pushes
- Guardrails control enforces encryption on EBS volumes

**Advantages:**
- Catches configuration drift
- Can automatically remediate (Azure Policy, Guardrails)
- Enforces baselines on all resources, not just new ones
- Works for resources created outside IaC

**Limitations:**
- Runs after resource creation (potential exposure window)
- Remediation can disrupt running applications
- May have evaluation delays
- Doesn't prevent initial misconfiguration

**Example Preventions:**
- Block Public ACLs on AWS S3 Buckets (S3 Account Setting)
- Block Public AWS EC2 AMI Sharing (EC2 Account Attribute)
- Require encryption at rest for Azure Compute Managed Disks (Azure Policy Modify)
- Block Branch Deletion (GitHub Branch Ruleset)
- Require Encryption for AWS EBS Volumes (Guardrails Control)

**Current Coverage:**
Config layer typically has high prevention count due to account-level settings, GitHub rulesets, and Azure/Guardrails policies.

### Runtime Layer

**When It's Enforced:**
Continuously during resource operation, monitoring behavior and responding to threats.

**What It Controls:**
Resource behavior, anomalous activity, security threats, and compliance drift during operation.

**How It Works:**
- Security monitoring services (GuardDuty, Defender, Security Command Center)
- SIEM alerting and response
- Guardrails continuous compliance checks
- Lambda/Azure Functions automated response
- CloudWatch/Azure Monitor alarms

**Prevents:**
Malicious behavior, unauthorized access, and security incidents through continuous monitoring and automated response.

**Example Scenarios:**
- GuardDuty detects cryptocurrency mining, Lambda kills instance
- Defender for Cloud detects malware upload, blocks access
- Guardrails detects public security group, automatically remediates
- CloudWatch alarm detects root user login, triggers notification
- SIEM detects anomalous S3 access, triggers investigation

**Advantages:**
- Detects issues that bypass earlier layers
- Responds to runtime threats (not just misconfigurations)
- Provides forensic data for investigations
- Can detect insider threats and compromised credentials

**Limitations:**
- Reactive rather than preventive (issue already occurred)
- Requires monitoring infrastructure
- Can generate alert fatigue
- Automated response can cause outages if misconfigured

**Example Preventions:**
- Guardrails controls remediating misconfigured resources
- AWS Lambda functions responding to CloudWatch Events
- Azure Logic Apps responding to Defender alerts
- SIEM-driven automated remediation

**Current Coverage:**
Runtime layer typically has lowest prevention count because many organizations focus on earlier layers and use runtime primarily for detection rather than automated prevention.

## Page Layout

### Grouping by Layer

The Layers tab displays preventions organized by enforcement layer:

**Layer Sections**
- Layer name (Build, Access, Config, Runtime)
- Description of when this layer is enforced
- Count of preventions at this layer
- List of individual preventions

### Layer Cards

Each layer section shows:
- **Layer name**: Build, Access, Config, or Runtime
- **Enforcement timing**: When this layer operates
- **Prevention count**: Number of active preventions at this layer
- **Coverage indicator**: Visual representation of layer coverage

## Defense-in-Depth Strategy

### Why Multiple Layers Matter

**Single Layer Failure:**
If you only have Access layer controls (SCPs), a misconfigured SCP or an SCP exception can leave resources unprotected.

**Multi-Layer Protection:**
- Build layer blocks IaC templates defining public buckets
- Access layer SCP denies making buckets public via API
- Config layer account setting blocks public ACLs
- Runtime layer Guardrails remediates any public buckets

Even if one layer fails, others provide backup protection.

### Recommended Layer Distribution

**Critical Assets (P1 Objectives):**
Implement at least 3 layers (Access + Config + Runtime minimum).

**Important Assets (P2 Objectives):**
Implement at least 2 layers (Access + Config recommended).

**Standard Assets (P3 Objectives):**
Implement at least 1 layer (Access layer typically sufficient).

### Layer Priority for Implementation

1. **Access Layer First:** Provides broadest protection with least operational impact
2. **Config Layer Second:** Catches what Access layer misses and handles account-level settings
3. **Runtime Layer Third:** Provides monitoring and automated response
4. **Build Layer Last:** Requires CI/CD integration but provides earliest prevention

## Common Workflows

**Assessing defense-in-depth coverage**
1. Navigate to the Layers tab
2. Review prevention counts for each layer
3. Identify layers with low coverage
4. For critical objectives, ensure preventions exist at multiple layers
5. Prioritize implementing preventions in underrepresented layers

**Finding gaps in a specific layer**
1. Expand the layer section of interest
2. Review all preventions at that layer
3. Compare against objectives list
4. Identify objectives with no preventions at this layer
5. Implement preventions to fill gaps

**Planning layer-specific initiatives**
1. Select a layer to focus on (e.g., Build)
2. Review current preventions at that layer
3. Identify quick wins (easy preventions to implement)
4. Create implementation plan for that layer
5. Track progress by monitoring prevention count

**Responding to a security incident**
1. Identify which layers failed to prevent the incident
2. Review why existing preventions didn't work
3. Add preventions at layers that weren't covered
4. Test to ensure new preventions would block similar incidents
5. Document lessons learned

**Balancing prevention strategy**
1. Compare prevention counts across all layers
2. Note if one layer is over-represented (e.g., 90% Access layer)
3. Assess whether other layers are underutilized
4. Create plan to implement preventions at other layers for balance

## Layer-Specific Best Practices

### Build Layer Best Practices

**Integrate early:**
Add IaC policies to CI/CD pipelines from day one of adopting IaC.

**Provide clear error messages:**
When blocking IaC deployment, explain what's wrong and how to fix it.

**Offer templates:**
Provide compliant IaC templates for common use cases.

**Balance speed and security:**
Build layer gates shouldn't significantly slow deployments.

### Access Layer Best Practices

**Test extensively:**
Always use SCP Simulator or test in non-production before deploying.

**Document exceptions:**
Clearly document why certain accounts or roles need SCP exceptions.

**Start conservative:**
Begin with narrowly scoped SCPs, expand over time.

**Monitor denied actions:**
Track CloudTrail denied events to identify impacted workflows.

### Config Layer Best Practices

**Enable account-level settings first:**
S3 Block Public Access and EC2 attributes are quick wins.

**Use remediation cautiously:**
Auto-remediation can disrupt applications if not tested.

**Validate compliance regularly:**
Even with preventions, validate configurations periodically.

**Plan for drift:**
Config layer handles configuration drift from manual changes.

### Runtime Layer Best Practices

**Start with detection:**
Implement monitoring before automated response.

**Test automated response thoroughly:**
Ensure automated remediation doesn't cause outages.

**Minimize false positives:**
Tune alerts and response to reduce noise.

**Maintain audit trail:**
Log all runtime actions for forensics.

## Comparing Layers

### Speed of Enforcement

| Layer | Detection Time | Prevention Time |
|-------|---------------|-----------------|
| Build | Immediate (seconds) | Immediate |
| Access | Immediate (milliseconds) | Immediate |
| Config | Minutes to hours | Immediate (for new resources) |
| Runtime | Minutes to days | Seconds to minutes |

### Coverage Scope

| Layer | Scope | Limitations |
|-------|-------|-------------|
| Build | IaC-managed resources only | Manual changes not covered |
| Access | All API calls | Can be overridden by service |
| Config | All resources | After creation |
| Runtime | All resources and behavior | After issue occurred |

### Implementation Effort

| Layer | Initial Setup | Maintenance | Expertise Required |
|-------|--------------|-------------|-------------------|
| Build | High | Medium | IaC, CI/CD |
| Access | Medium | Low | Cloud IAM |
| Config | Low to Medium | Low | Cloud services |
| Runtime | Medium to High | High | Security operations |

## Next Steps

- Return to [Preventions](./preventions.md) to see all preventions
- Review [Examples](./examples.md) for layer-specific implementation guidance
- Check [Types](./types.md) to understand prevention mechanisms
- Visit [Objectives](../objectives/index.md) to see which objectives need multi-layer coverage
- Read [Detail Pages](./detail.md) for specific prevention configurations
