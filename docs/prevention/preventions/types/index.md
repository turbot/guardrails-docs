---
title: Prevention Types
sidebar_label: Types
---

# Prevention Types

Prevention types describe how preventions are technically implemented—Service Control Policies, Azure Policies, account settings, GitHub rulesets, and so on. Each prevention type has different characteristics, tradeoffs, and appropriate use cases. Understanding these helps you choose the right tool for each security objective.

![Prevention types showing controls grouped by implementation mechanism](./types-view.png)

## Why Prevention Types Matter

You could achieve "require encryption for S3 buckets" through an SCP that denies unencrypted uploads, an S3 Bucket Key setting enforcing encryption, or a Guardrails control that remediates non-encrypted buckets. All three accomplish the same objective, but they work differently and have different tradeoffs in complexity, flexibility, and operational characteristics.

The Types view helps you understand your current approach and identify opportunities to simplify or standardize. If you're implementing similar controls across services using inconsistent mechanisms, standardizing makes your security architecture easier to understand and maintain.

## Common Prevention Types

### Service Control Policies (SCPs)

SCPs are AWS Organization-level policies that deny API actions. An SCP attached at your organization root restricts every account—even account administrators can't bypass it. This makes SCPs powerful for foundational controls like restricting regions, denying dangerous actions (stopping CloudTrail), or blocking public resource creation.

The tradeoff is that SCPs are blunt instruments affecting entire accounts or OUs. You can't easily say "deny this action except for these specific resources." SCPs work at the API action level, not the resource level. They're also limited to 5 per entity and require careful testing since mistakes affect all accounts in scope.

Use SCPs for broad restrictions that should apply everywhere with no exceptions (region restrictions) or almost no exceptions (CloudTrail protection). They're your strongest preventive control but require thoughtful design and testing.

### Azure Policies

Azure Policies are more flexible than SCPs—they can audit (detect issues without blocking), deny (block like SCPs), modify (automatically fix resources), or deploy resources if they don't exist. This flexibility makes them powerful but also more complex to configure correctly.

An Azure Policy that denies creation of public IP addresses works similarly to an SCP. But an Azure Policy that automatically enables encryption on storage accounts (Modify effect) or deploys diagnostic settings if they're missing (DeployIfNotExists effect) does things SCPs can't.

Use Azure Policies when you need flexible enforcement options or automated remediation. Start with Audit mode to identify issues, then switch to Deny once you're confident in the scope. Use Modify and DeployIfNotExists for proactive security configuration.

### GCP Organization Policies

GCP Organization Policies are simpler than Azure Policies but more flexible than SCPs. They're constraint-based: you enable a constraint (like "require VPC Flow Logs") and it enforces that constraint across your organization, folders, or projects. They inherit down the hierarchy and can't be weakened at lower levels.

The simplicity is an advantage—less to configure means less to misconfigure. The limitation is you're restricted to predefined constraints. You can't write custom policy logic like you can with Azure Policies. What you get is well-tested, well-documented constraints for common security requirements.

Use GCP Organization Policies as your primary enforcement mechanism in GCP. They're straightforward to implement and cover most common security requirements. Supplement with Guardrails controls if you need custom logic.

### Account Settings

Account settings are the simplest prevention type—just toggle a setting in the console or via API. S3 Block Public Access is the classic example: turn it on, and all S3 buckets in that account can't be made public regardless of bucket policies or ACLs. EC2 account attributes work similarly to block public AMI sharing or enable default EBS encryption.

The advantage is simplicity and zero operational overhead. The limitation is they're service-specific and cover a narrow set of configurations. But when an account setting exists for what you need, use it—it's the easiest way to implement that control.

Use account settings first when they're available. They're quick to enable, hard to misconfigure, and provide consistent protection. They should be part of your account provisioning baseline.

### GitHub Branch and Tag Rulesets

GitHub rulesets control how code can be modified, pushed, or deleted in repositories. Branch rulesets prevent force pushes, require pull request reviews, and block branch deletion. Tag rulesets prevent tag manipulation, which is important for supply chain security and release management.

These preventions are specific to code repositories but essential for protecting your codebase. Preventing force pushes to main prevents history rewriting. Requiring reviews prevents unilateral code changes. Protecting tags prevents attackers from rewriting release history.

Use branch rulesets on main/release branches immediately. They're straightforward to configure and prevent common mistakes and attacks. Protect tags for any repositories involved in software releases.

### Guardrails Controls

Guardrails controls offer the most flexibility—they support complex conditional logic, automated remediation, and multi-cloud consistency. They can check configurations continuously and automatically fix issues. The tradeoff is they require the Guardrails platform and take more effort to build and maintain than simpler controls.

Use Guardrails controls when you need logic that cloud-native controls can't express, when you need continuous remediation rather than one-time prevention, or when you want consistent controls across AWS, Azure, and GCP in a single platform.

## Prevention in Depth

Defense-in-depth means implementing multiple prevention types at different layers so if one fails or has gaps, others provide backup protection. For critical objectives, relying on a single prevention type leaves you vulnerable if that prevention has an exception, misconfiguration, or bypass.

Consider an objective like "prohibit public S3 buckets." You might implement:
- An SCP denying public bucket policies (Access layer) - blocks API calls organization-wide
- S3 Block Public Access account settings (Config layer) - enforces settings regardless of bucket policies
- Guardrails remediation controls (Runtime layer) - continuously detects and fixes any buckets that become public

If the SCP has an exception for a specific OU, the account settings still protect those accounts. If someone disables the account setting, the Guardrails control remediates it. Multiple prevention types at multiple layers create redundancy that significantly reduces risk.

Different prevention types naturally operate at different layers. SCPs and Azure Policies typically operate at the Access layer. Account settings operate at the Config layer. Guardrails controls typically operate at the Runtime layer. This natural alignment makes it easier to build defense-in-depth—implement the objective using prevention types from different layers.

## Next Steps

- Return to [Preventions](/guardrails/docs/prevention/preventions/preventions) to see all your controls regardless of prevention type
- Check [Layers](/guardrails/docs/prevention/preventions/layers) to understand when each prevention type typically operates
- Visit [Objectives](/guardrails/docs/prevention/objectives) to see which objectives each prevention type helps achieve
- Review [Recommendations](/guardrails/docs/prevention/objectives/recommendations) for implementation guidance
