---
title: SCP Simulator
sidebar_label: Simulator
---

# SCP Simulator

The SCP Simulator lets you test Service Control Policies before deploying them to production. Service Control Policies are powerful because they can deny API actions across your entire AWS Organization, but that power makes them risky to deploy without testing. The simulator helps you understand how an SCP will affect your environment, catch unintended consequences, and validate that policies work as expected.

![SCP Simulator interface showing organization hierarchy, SCPs, and CloudTrail events](./simulator-overview.png)

## Why Testing SCPs Matters

Service Control Policies are unusual among AWS controls because they're so broad and so permanent. An SCP attached at your organization root affects every account, every principal, every API call. An SCP deny can't be overridden by an IAM allow—it's absolute. If you deploy an SCP that accidentally denies a critical operation, you've just broken that operation across your entire organization.

The simulator prevents these mistakes. You can paste an SCP, test it against recent CloudTrail events from your accounts, see what would be blocked, refine the policy, and test again, all without touching production. By the time you deploy, you're confident the SCP does what you intend and nothing more.

## Understanding SCP Behavior

SCPs inherit down the organization tree. If you attach an SCP at the organization root, it affects every account. If you attach an SCP to an OU, it affects that OU and all accounts and child OUs beneath it. If any SCP in the hierarchy denies an action, the action is denied. There's no way to override an explicit deny.

The effective permissions for any API call are the intersection of all SCPs in the hierarchy and the IAM policies. Even if IAM policies allow an action, an SCP can deny it. But SCPs don't grant permissions, they only restrict what IAM policies can grant.

Most organizations use one of two SCP patterns. The allowlist pattern explicitly allows specific services (like S3, EC2, RDS) and implicitly denies everything else, useful for restricting which AWS services can be used. The denylist pattern explicitly denies specific dangerous actions (like deleting IAM roles or stopping CloudTrail) while allowing everything else, useful for preventing specific risky operations.

The simulator helps you test both patterns and understand their effects before deployment. You can see which services would be blocked by an allowlist, or which operations would be denied by a denylist, and refine the policy until it matches your intent.



## How to Use the Simulator

The simulator interface has four main sections that work together to help you test SCPs:

**[Organization Hierarchy Visualization](#organization-hierarchy-visualization)** - The left panel displays your AWS Organization structure as an interactive graph, showing the organization root, OUs, accounts, and how SCPs flow down through the hierarchy. Use this to understand your organizational structure and see which entities are affected by each SCP.

**[Service Control Policies Panel](#service-control-policies-panel)** - The middle panel lists all SCPs currently attached to your organization. Here you can view policy details, disable SCPs temporarily for testing, duplicate policies to create variations, and add draft SCPs to test what-if scenarios before deploying to production.

**[CloudTrail Events Panel](#cloudtrail-events-panel)** - The right panel is where you add CloudTrail events to test against your SCP configuration. You can paste actual CloudTrail event JSON, manually construct API call scenarios, or upload log files containing multiple events.

**[Evaluation Results](#evaluation-results)** - When you select an event, the simulator evaluates it against all active SCPs and displays whether the action would be allowed or denied, which SCP caused the denial, and the reasoning behind the decision. Denied actions are highlighted visually in the organization diagram.

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

![Full SCP policy JSON displayed in the simulator](./scp-policy-view.png)

**Actions on existing SCPs**:
- **Disable SCP**: Temporarily disable an SCP to see how it affects your evaluation results
- **Duplicate SCP**: Create a copy to modify and test variations
- **Copy JSON**: Copy the policy document to your clipboard
- **View Full Policy**: Expand to see the complete JSON policy document

**Add Draft SCPs**: The "Add Draft" button lets you create temporary SCPs to test what-if scenarios. You don't need to deploy these to your actual organization. They exist only in the simulator for testing.

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

![CloudTrail Events Panel showing added events ready for testing](./cloudtrail-events-panel.png)

#### Adding Events

Click the "Add Event" button to open the event creation dialog. The dialog provides multiple ways to add events for testing:

![Add Event dialog showing available tabs](./add-event-dialog.png)

##### Adding Events from a File

Upload JSON files containing CloudTrail event records. The simulator will parse multiple events from the file, allowing you to test a batch of operations at once. This is useful for testing how an SCP would affect recent activity from your production accounts.

##### Adding Mock Events

Select from pre-built event templates organized by AWS service and common scenarios. This is the fastest way to test typical API calls without constructing events manually.

![Mock Events tab showing service categories](./add-event-mock.png)

Click any service category to expand and see available event templates:

![Expanded S3 category showing mock event templates](./add-event-mock-expanded.png)

Select an event template to automatically populate all required fields with realistic values. You can use these values as-is or modify them to match your specific testing scenario:

![Selected mock event with populated fields](./add-event-mock-selected.png)

##### Adding Events Manually

![Manual Entry tab showing fields for constructing custom events](./add-event-manual.png)

Paste actual CloudTrail event JSON directly from CloudTrail logs (from the AWS Console, CloudWatch Logs Insights, or downloaded log files). The simulator will parse the event and extract the relevant fields (eventName, awsRegion, sourceIPAddress, userIdentity, requestParameters, etc.).

After adding events, they appear in the events list in the CloudTrail Events panel. Click any event to evaluate it against your current SCP configuration and view the results in the Evaluation Results section.

### Evaluation Results

When you select an event from the CloudTrail Events panel, the simulator evaluates it against all active SCPs and displays comprehensive results showing whether the action would be allowed or denied.

The Evaluation Results panel shows:
- Whether the action would be **Allowed** or **Denied**
- Which SCP caused the denial (if applicable)
- The specific statement within the SCP that matched the action
- The effective permissions chain through the organization hierarchy
- Detailed reasoning for the evaluation decision

This is particularly valuable when multiple SCPs apply to an account (from the organization root, from parent OUs, and from the account itself), because understanding the combined effect can be challenging.

#### Viewing Denied Actions

When an event is denied by an SCP, the simulator provides visual feedback to help you understand exactly why:

![Simulator showing a denied S3 action with highlighted path and evaluation details](./simulator-denied-1600.png)

The simulator highlights the evaluation path in the organization diagram, showing:
- **Red highlighting** on the path from the organization root through OUs to the target account
- **The specific SCP** that denied the action (shown in the middle panel)
- **Evaluation Results panel** (right side) displaying:
  - The final decision: "Denied" with a red indicator
  - Which SCP statement caused the denial (e.g., "Statement S3" in "Data-Compute-Controls" SCP)
  - The specific deny rule that matched (e.g., denying `s3:PutObject` without encryption)
  - The account and principal that attempted the action
  - The full context of the API call

This visual representation makes it immediately clear which policy is blocking an action and why, helping you quickly identify whether the block is intentional or if the policy needs adjustment.

## Common Use Cases

- **When testing a new SCP before deployment**: Draft a policy meant to block dangerous actions or enforce regional restrictions, paste it into the simulator, test it against recent CloudTrail events from accounts that will be affected, and see what would be blocked. If the simulator shows you're about to deny legitimate CloudFormation deployments or CI/CD operations, you refine the policy to add exceptions before any damage is done.

- **When diagnosing why something's being blocked**: If developers report that an API call is being denied and you suspect an SCP is responsible, recreate the API call in the simulator and see exactly which SCP policy is causing the deny. This helps you understand if the block is intentional (working as designed) or if the policy needs adjustment.

- **When training team members on SCPs**: SCPs are conceptually different from IAM policies. They only restrict, they inherit down the organization tree, and explicit denies can't be overridden. The simulator provides a safe environment to demonstrate these behaviors and let team members experiment without affecting production.


## Next Steps

- Return to [Preventions](/guardrails/docs/prevention/preventions) to see which SCPs are currently deployed
- Review [Objectives](/guardrails/docs/prevention/objectives) to understand which security goals SCPs can achieve
- Visit [Recommendations](/guardrails/docs/prevention/objectives/recommendations) to find SCP policies recommended for your environment
