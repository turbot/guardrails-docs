---
title: Prevention
---

# Prevention


<object
  data="/images/prevention/vector-graphics/hero-motion.svg"
  type="image/svg+xml"
  aria-label="Prevention Security Flow Diagram"
/>


Turbot Guardrails enables prevention-first cloud security, stopping misconfigurations, policy violations, and risky deployments before they reach production.


## Understanding Prevention-First Security

Unlike traditional security tools that detect problems after they exist, prevention-first security stops misconfigurations and vulnerabilities from reaching production. Turbot Guardrails discovers preventions across your cloud environment, maps them to security objectives, and scores how well you're preventing issues before they can occur.

## Key Concepts

### Objectives

**Objectives** are prevention goals—the things you're trying to accomplish. For example:
- Restrict AWS resources to allowed regions
- Require encryption at rest for AWS EBS volumes
- Prohibit public access to S3 buckets

Each objective has:
- A **category** (logical grouping like Data Governance or Identity & Access)
- A **priority** (P1-P5, with P1 being highest priority)
- One or more target resource types

### Preventions

**Preventions** are the actual controls discovered in your environment that achieve objectives. While objectives describe **what** you're trying to accomplish, preventions define **how** it's being achieved.

For example, to accomplish "Require encryption at rest for AWS EBS volumes," you might have:
- An SCP statement denying `ec2:CreateVolume` unless encryption is specified
- An EC2 declarative policy setting default EBS encryption
- A Guardrails control enforcing encryption at runtime

Each prevention has a **prevention type** (e.g., AWS SCP Deny Statement, Azure Policy, Guardrails Control) that determines its characteristics and scoring behavior.

### Layers

Preventions operate at different **layers** in the deployment lifecycle, representing when and where controls are enforced:

- **Build**: IaC scanning and CI/CD pipeline controls (weighted 0.75)
- **Access**: Organization-level policies like SCPs, RCPs, Azure Policy deny, GCP Org Policies (weighted 0.95)
- **Config**: Account and service settings that enforce secure defaults (weighted 0.85)
- **Runtime**: Real-time remediation and enforcement (weighted 0.85)

Layer weights affect scoring—controls at the Access layer have the highest impact because they prevent issues before they can be created.

### Categories

Objectives are organized into seven security **categories**:

- **Audit & Logging**: Protect audit trails and logging infrastructure
- **Network Perimeter**: Restrict network connectivity and traffic patterns
- **Trust & Sharing**: Prevent external or anonymous access based on identity boundaries
- **Core Infrastructure**: Protect foundational governance infrastructure and control plane resources
- **Data Governance**: Enforce data protection, encryption, residency, and lifecycle management
- **Identity & Access**: Restrict privileged access to sensitive account capabilities
- **Feature Restrictions**: Disable or limit risky service features and capabilities

### Priorities

Each objective has a **priority** (P1-P5) indicating its relative importance:

- **P1**: Essential foundational settings (e.g., allowed services, allowed regions)
- **P2**: Direct path to data breach or service compromise
- **P3**: Significant security or compliance risk
- **P4**: Best practice violations with moderate risk
- **P5**: Optimization and hygiene issues

Priorities are weighted using a reverse Fibonacci sequence when calculating scores:
- P1: weight 8
- P2: weight 5
- P3: weight 3
- P4: weight 2
- P5: weight 1

### Benchmarks

**Benchmarks** are hierarchical frameworks that organize objectives according to compliance standards or security baselines. Examples include:
- [AWS CIS v6.0.0](https://www.cisecurity.org/benchmark/amazon_web_services)
- [AWS NIST 800-53 Rev 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
- AWS P1 Preventions (Turbot's fundamental preventative controls)
- Azure CIS v5.0.0
- GitHub CIS v1.1.0

Each benchmark shows your prevention score for that framework, helping you measure compliance and security posture against industry standards.

### Recommendations

**Recommendations** are AI-generated suggestions for specific actions to improve your prevention posture. Each recommendation:
- Targets a specific objective with coverage gaps
- Includes the priority level (P1-P5)
- Explains what will be accomplished when implemented
- Provides concrete implementation guidance based on your environment

Recommendations are prioritized by potential impact on your prevention score and the priority of the objective being addressed.

### Prevention Scores

Your **prevention maturity score** (0-5 scale) measures how well you prevent security issues before they occur. Scores are calculated by evaluating:

- **Coverage**: Which objectives have preventions in place
- **Quality**: How well those preventions meet each objective's requirements
- **Priority weighting**: Higher-priority objectives (P1, P2) have more impact
- **Layer weighting**: Preventions at different layers are weighted differently

Scores aggregate at every level—by objective, account, category, layer, priority, and benchmark—allowing you to analyze your prevention posture from multiple perspectives.

