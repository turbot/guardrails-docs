---
title: SCP Simulator
sidebar_label: Simulator
---

# SCP Simulator

The SCP Simulator lets you test Service Control Policies before deploying them to production. Service Control Policies are powerful—they can deny API actions across your entire AWS Organization—but that power makes them risky to deploy without testing. The simulator helps you understand how an SCP will affect your environment, catch unintended consequences, and validate that policies work as expected.

![SCP Simulator interface showing organization hierarchy, SCPs, and CloudTrail events](./simulator-overview.png)

## Why Testing SCPs Matters

Service Control Policies are unusual among AWS controls because they're so broad and so permanent. An SCP attached at your organization root affects every account, every principal, every API call. An SCP deny can't be overridden by an IAM allow—it's absolute. If you deploy an SCP that accidentally denies a critical operation, you've just broken that operation across your entire organization.

The simulator prevents these mistakes. You can paste an SCP, test it against recent CloudTrail events from your accounts, see what would be blocked, refine the policy, and test again—all without touching production. By the time you deploy, you're confident the SCP does what you intend and nothing more.

## How to Use the Simulator

The simulator interface has three main sections that work together to help you test SCPs:

### Organization Hierarchy Visualization

The left panel shows your AWS Organization structure as an interactive graph. You'll see:
- The organization root at the top
- Organizational Units (OUs) organized by hierarchy
- Individual AWS accounts grouped under their respective OUs
- Visual connections showing how SCPs flow down through the hierarchy
- SCP attachment points indicated by connecting lines

![Simulator showing organization hierarchy with SCP attachments](./simulator-main-view.png)

You can interact with the graph using the zoom controls (+/-), fit view (⊡), and reset layout (↻) buttons in the bottom left. Use the search bar at the top to quickly find specific accounts or OUs.

### Service Control Policies Panel

The middle panel lists all SCPs currently attached to your organization. For each SCP, you can:

**View SCP Details**: Click "Expand details" on any SCP to see:
- Attachment ID and target (which OU or account it's attached to)
- Status (Active or Disabled)
- Policy statistics: total statements, allow vs. deny statements, whether conditions are present
- Full policy JSON document

![Expanded SCP showing attachment details and policy statistics](./scp-details-expanded.png)

![Full SCP policy JSON displayed in the simulator](./scp-policy-view.png)

**Actions on existing SCPs**:
- **Disable SCP**: Temporarily disable an SCP to see how it affects your evaluation results
- **Duplicate SCP**: Create a copy to modify and test variations
- **Copy JSON**: Copy the policy document to your clipboard
- **View Full Policy**: Expand to see the complete JSON policy document

**Add Draft SCPs**: The "Add Draft" button lets you create temporary SCPs to test what-if scenarios. You don't need to deploy these to your actual organization—they exist only in the simulator for testing.

![Dialog for adding a custom draft SCP with target selection](./add-draft-scp.png)

When adding a draft SCP, you can:
- Name your policy for easy identification
- Choose the target type: Root, Organizational Unit, or Account
- Select the specific target from a dropdown
- Write or paste your policy JSON
- Use pre-built templates for common scenarios

![SCP templates including Full Access, Deny Root Access, and Deny Region](./scp-templates.png)

Available templates include:
- **Full Access**: Allow all actions on all resources (useful as a baseline)
- **Deny Root Access**: Prevent root user from performing actions
- **Deny Region**: Block actions in specific AWS regions

### CloudTrail Events Panel

The right panel is where you test SCPs against actual or simulated CloudTrail events. This is how you verify whether API calls would be allowed or denied under your SCP configuration.

**Adding Events**: Click "Add Event" to manually specify CloudTrail events you want to test. You can either:
- Paste CloudTrail event JSON from actual logs
- Manually construct API call scenarios
- Upload CloudTrail log files containing multiple events

**Evaluation Results**: When you select an event, the simulator evaluates it against all active SCPs and shows:
- Whether the action would be **Allowed** or **Denied**
- Which SCP caused the denial (if applicable)
- The effective permissions chain through the organization hierarchy
- Detailed reasoning for the evaluation decision

This is particularly valuable when multiple SCPs apply to an account (from the organization root, from parent OUs, and from the account itself), because understanding the combined effect can be challenging.

## Common Use Cases

- **When testing a new SCP before deployment** - Draft a policy meant to block dangerous actions or enforce regional restrictions, paste it into the simulator, test it against recent CloudTrail events from accounts that will be affected, and see what would be blocked. If the simulator shows you're about to deny legitimate CloudFormation deployments or CI/CD operations, you refine the policy to add exceptions before any damage is done.

- **When diagnosing why something's being blocked** - If developers report that an API call is being denied and you suspect an SCP is responsible, recreate the API call in the simulator and see exactly which SCP policy is causing the deny. This helps you understand if the block is intentional (working as designed) or if the policy needs adjustment.

- **When training team members on SCPs** - SCPs are conceptually different from IAM policies—they only restrict, they inherit down the organization tree, explicit denies can't be overridden. The simulator provides a safe environment to demonstrate these behaviors and let team members experiment without affecting production.

## Understanding SCP Behavior

SCPs inherit down the organization tree. If you attach an SCP at the organization root, it affects every account. If you attach an SCP to an OU, it affects that OU and all accounts and child OUs beneath it. If any SCP in the hierarchy denies an action, the action is denied—there's no way to override an explicit deny.

The effective permissions for any API call are the intersection of all SCPs in the hierarchy and the IAM policies. Even if IAM policies allow an action, an SCP can deny it. But SCPs don't grant permissions—they only restrict what IAM policies can grant.

Most organizations use one of two SCP patterns. The allowlist pattern explicitly allows specific services (like S3, EC2, RDS) and implicitly denies everything else—useful for restricting which AWS services can be used. The denylist pattern explicitly denies specific dangerous actions (like deleting IAM roles or stopping CloudTrail) while allowing everything else—useful for preventing specific risky operations.

The simulator helps you test both patterns and understand their effects before deployment. You can see which services would be blocked by an allowlist, or which operations would be denied by a denylist, and refine the policy until it matches your intent.

## Best Practices

Always test with real CloudTrail data from your environment. Theoretical testing is valuable, but testing against actual API calls from your workloads catches real-world issues. Export recent CloudTrail logs from accounts that will be affected by the SCP, upload them to the simulator, and verify nothing critical gets blocked.

Start conservatively. Your first SCP should be narrowly scoped—maybe just restricting regions, or just blocking one specific dangerous action. Test thoroughly. Deploy. Monitor for issues. Once you're confident in your process, you can deploy broader policies.

Store SCP policies in version control alongside your Infrastructure as Code. This provides an audit trail of changes, makes it easy to roll back if needed, and allows for code review before deployment.

Document why each SCP exists. An SCP that denies certain actions might be obvious today, but six months from now when requirements change, having a clear explanation of the intent helps determine if the policy should be modified or if the new requirement should be implemented differently.

## Limitations

The simulator currently supports only AWS Service Control Policies. Azure Policies and GCP Organization Policies have their own testing mechanisms in their respective cloud consoles. If you're using Guardrails controls, those can be tested in non-production accounts before enabling enforcement.

The simulator provides a close approximation of policy effects, but complex conditions or service-specific behaviors might differ slightly from production. Always plan for gradual rollout—deploy to a test OU first, monitor for issues, then expand to production OUs.

## Next Steps

- Return to [Preventions](/guardrails/docs/prevention/preventions) to see which SCPs are currently deployed
- Check [Examples](/guardrails/docs/prevention/preventions/examples) for tested SCP templates you can adapt
- Review [Objectives](/guardrails/docs/prevention/objectives) to understand which security goals SCPs can achieve
- Visit [Recommendations](/guardrails/docs/prevention/recommendations) to find SCP policies recommended for your environment
