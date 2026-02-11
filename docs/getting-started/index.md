---
title: Getting Started
sidebar_label: Getting Started
---

# Getting Started with Turbot Guardrails

Your free trial is a **2-week Preventive Security Posture Assessment**. We connect your cloud organization, evaluate your preventive posture, and test controls against your real environment.

You don't need to know exactly what to scope. Guardrails shows you where you stand and recommends what to do next.

## How the Trial Works

### Your Trial Team

Your account rep and a dedicated Customer Success (CS) lead work with your team throughout the trial:

- **Onboarding call** to connect your environment and walk through your first results together
- **Check-in screenshares** to progress through use cases, review findings, and adjust scope
- **Close-out meeting** to review outcomes and decide on next steps

Your CS lead is your direct contact for the duration. No support tickets needed.

### The Assessment Path

The trial follows a natural progression through the Guardrails platform. Each step builds on the last:

| Step | What You'll Do | Learn More |
|------|---------------|------------|
| **1. Visualize** | Connect your org, see your preventive posture | [Visualize Preventive Posture](/features/visualize-preventive-posture) |
| **2. Benchmark** | Score against CIS, NIST, and other frameworks | [Benchmark & Understand Gaps](/features/understand-gaps) |
| **3. Simulate** | Pick a policy, test it against real data | [Simulate & Test Controls](/features/simulate-test) |
| **4. Deploy** | Roll out a control, see the improvement | [Rollout & Expand](/features/rollout-expand) |
| **5. Runtime** | Add accounts, auto-remediate in real time | [Runtime Prevention](/features/prevention-runtime) |

## Step 1: Visualize Your Preventive Posture

Connect your cloud organization in **read-only mode**. Guardrails discovers your org structure, accounts, OUs, SCPs, RCPs, and policy coverage automatically.

<p><img alt="Prevention objectives view showing organizational posture" src="/images/blog/2025-12-visualize-preventive-policies/objectives-view.png" /></p>

**Within minutes, you'll see:**
- Your organization hierarchy and account structure
- Which preventive policies are in place and where
- Inheritance chains showing how policies flow through your org
- Coverage gaps where accounts or OUs lack protection

This is the starting point. No runtime agents, no broad permissions, just a read-only view of where your preventive controls stand today.

**What you need:** Read-only access to your cloud organization management account or tenant. We provide CloudFormation templates and setup guides for IAM role configuration.

| Cloud | Setup Guide |
|-------|------------|
| **AWS** | [Import AWS Organization](/guardrails/docs/guides/aws/import-aws-organization) |
| **Azure** | [Import Azure Tenant](/guardrails/docs/guides/azure/import) |
| **GCP** | [Import GCP Organization](/guardrails/docs/guides/gcp/import-gcp-organization) |
| **GitHub** | [Import GitHub Organization](/guardrails/docs/guides/github/import-organization) |

> [Learn more about visualizing your preventive posture](/features/visualize-preventive-posture)

## Step 2: Benchmark and Get Recommendations

Once your org is connected, Guardrails benchmarks your preventive posture against industry frameworks like **CIS**, **NIST**, and others.

<p><img alt="Dashboard scoring showing prevention posture across the organization" src="/images/blog/2025-12-preventive-posture-assessment/dashboard-scoring.png" /></p>

**You'll see:**
- Prevention scores across your organization
- Objectives ranked by priority and impact
- Specific recommendations to improve your posture
- Which accounts and OUs have the biggest gaps

<p><img alt="Recommendations with specific actions to improve posture" src="/images/blog/2025-12-preventive-posture-assessment/recommendation-expanded.png" /></p>

This turns "we think we have gaps" into a concrete, scored assessment. Your CS lead will walk through the findings with you and help prioritize which recommendations to act on first.

> [Learn more about benchmarking and understanding gaps](/features/understand-gaps)

## Step 3: Simulate and Test a Control

Pick a recommendation from Step 2. Before deploying anything, Guardrails lets you **simulate the policy against your real environment**.

**How it works:**
- Select a preventive control (e.g., "require S3 encryption in transit")
- Guardrails tests it against actual activity data
- See the blast radius: which resources would be affected, which are already compliant
- Modify and compare scenarios before committing

<p><img alt="Comparing policy scenarios side by side" src="/images/blog/2025-12-simulate-preventive-policies/compare-events.png" /></p>

This is the dry run. You see the impact before anything changes. Your CS lead can help you pick a good first control to test, something easy to validate like S3 public access blocks, bucket versioning, or IAM access key policies.

> [Learn more about simulating and testing controls](/features/simulate-test)

## Step 4: Deploy and See the Improvement

When you're confident in the simulation results, deploy the control. Your prevention score updates to reflect the improvement, and Guardrails monitors for drift going forward.

<p><img alt="CIS benchmark score improving after deploying controls" src="/images/blog/2025-12-preventive-posture-assessment/cis-score-improved.png" /></p>

Start with a single policy on a focused scope. Once you see it working, expanding to more controls follows the same pattern. Return to the [benchmark dashboard](/features/understand-gaps) to see your posture improve and identify the next recommendation to act on.

> [Learn more about rolling out and expanding controls](/features/rollout-expand)

## Step 5: Runtime Controls

Want to go beyond org-level prevention? Add your [AWS](/solutions/aws), [Azure](/solutions/azure), [GCP](/solutions/gcp), or [GitHub](/solutions/github) accounts to test preventive runtime controls that auto-remediate misconfigurations in real time.

**To get started with runtime:**
- Connect a sandbox or dev account with broader permissions
- Your CS lead will pre-configure policy packs for your use cases
- Deploy a control in **check mode** to see findings without changing anything
- Switch to **enforce mode** to auto-remediate and keep resources compliant

<p><img alt="Auto-remediation activity log showing controls enforced in real time" src="/images/blog/2025-12-runtime-prevention-guardrails/activity-auto-remediation.png" /></p>

**Common runtime use cases:**

| Category | Examples |
|----------|----------|
| **Security** | Encryption enforcement, public access blocking, overpermissive security groups, IAM access key rotation |
| **FinOps** | Orphaned volumes, old snapshots, previous-generation instance types, long-running unused resources |
| **Tagging** | Auto-tag creator and timestamp, enforce casing standards, lookup and apply values by context |
| **Compliance** | CIS benchmark controls, NIST alignment, continuous audit readiness |

### Identifying Your Next Use Case

Use the recommendations in Guardrails to identify which runtime controls to work on next. Already have visibility from a CNAPP or CSPM tool? Bring your biggest finding categories in as runtime controls to stop those findings from growing, and burn them down with auto-remediation.

Don't have visibility into problems in your environment yet? [Turbot Pipes](https://turbot.com/pipes) can scan your accounts and run CIS benchmark reports to surface the biggest gaps before you start.

> [Learn more about runtime prevention](/features/prevention-runtime)

## Ready to Convert?

If the assessment met your evaluation criteria, converting is straightforward:

- **Payment options:** Credit card, ACH, invoice, or [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-xhmht6ul72y2q)
- **Pricing:** Usage-based at [$0.05 per active control per month](https://turbot.com/guardrails/pricing) for Cloud/SaaS, metered daily

Your account rep will work with you on contract and procurement next steps.

**If it's not the right time:** No pressure. We'll confirm and decommission the trial environment. You're welcome to revisit later.

## FAQ

<details id="faq-start-trial">
<summary><strong>How do I start a trial?</strong></summary>

[Schedule a discussion](https://turbot.com/start) with our team to scope your assessment and define use cases. We'll provision your workspace and schedule an onboarding call.

</details>

<details id="faq-workspace-access">
<summary><strong>How do I get access to my workspace?</strong></summary>

Before your onboarding call, [sign up for a guardrails.turbot.com account](https://guardrails.turbot.com/user/sign-up). We'll add you to your workspace. Other team members can sign up and be added the same way, or we can set everyone up together during the onboarding call.

</details>

<details id="faq-add-team-members">
<summary><strong>How do I add more team members?</strong></summary>

If you are using the Turbot SAML authentication method, first have your team member create a free account on the [User Sign Up Page](https://guardrails.turbot.com/user/sign-up).

1. Ask your team member to login to the Workspace using Turbot SAML with the newly created account.
2. Immediately upon logging in, a new user profile is created. As `Turbot/Owner` of the workspace, you can now assign permissions to your team member.
3. Go to the **Permissions** tab designated by user icon.
4. Click the green **Grant Permissions** button.
5. Leave the resource scope as `Turbot`.
6. In the **Identities** field, type in the user name of your team member. Select the profile in the drop down menu.
7. Click the **Permissions** field and select `Turbot/Owner`.
8. Click the **Grant** button.
9. Your team member will now have the same level of permissions as yourself. These can be modified in the future to be more specific.

</details>

<details id="faq-trial-cost">
<summary><strong>What does the trial cost?</strong></summary>

The 2-week assessment is free. No credit card required. There's no cost until you convert to a paid environment.

</details>

<details id="faq-extend-trial">
<summary><strong>Can I extend my trial?</strong></summary>

Yes. If you're actively evaluating and need more time, we're happy to extend to 3-4 weeks. We want a clear outcome, not a rushed one.

</details>

<details id="faq-accounts-orgs">
<summary><strong>How many accounts or organizations can I connect?</strong></summary>

Start with what matters. We recommend 1-2 accounts per cloud provider to keep the evaluation focused. You can add more as you progress through use cases. For org-level assessment, one management account gives you visibility across your entire organization.

</details>

<details id="faq-multiple-clouds">
<summary><strong>Can I trial multiple clouds?</strong></summary>

Yes. Guardrails supports [AWS](/solutions/aws), [Azure](/solutions/azure), [GCP](/solutions/gcp), and [GitHub](/solutions/github). Connect whichever providers are relevant to your environment.

</details>

<details id="faq-trial-support">
<summary><strong>What support do I get during the trial?</strong></summary>

Your account rep and CS lead are your direct contacts throughout. You also have access to our [public Slack community](https://turbot.com/community/join) for best-effort support.

</details>

<details id="faq-sign-anything">
<summary><strong>Do we need to sign anything?</strong></summary>

A Mutual NDA is not required. If your organization requires one, our pre-signed MNDA is [available here](https://turbot.com/legal/mnda) for countersignature. We also accept your organization's NDA. We recommend closing this out before the trial begins if applicable.

</details>

<details id="faq-turbot-pipes">
<summary><strong>What about Turbot Pipes?</strong></summary>

[Turbot Pipes](https://turbot.com/pipes) is available as a free trial as well. It provides cross-cloud visibility, dashboards, and benchmarking that complements Guardrails. Ask your account rep to include Pipes in your assessment.

</details>

<details id="faq-kubernetes">
<summary><strong>What about Kubernetes Security Posture Management (KSPM)?</strong></summary>

Guardrails includes [Kubernetes security posture management](/solutions/kubernetes) capabilities. These can be included in your free trial. Discuss with your account rep during the planning call to scope this into your assessment.

</details>

<details id="faq-servicenow">
<summary><strong>What about ServiceNow integration?</strong></summary>

Guardrails integrates with [ServiceNow](/solutions/servicenow) for real-time CMDB sync and inventory tracking. This can be included in your free trial. Discuss with your account rep during the planning call.

</details>

<details id="faq-convert-to-paid">
<summary><strong>How do I convert to paid?</strong></summary>

Provide a payment method: credit card, ACH/invoice, or purchase through [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-xhmht6ul72y2q). See [Guardrails Pricing](https://turbot.com/guardrails/pricing) for full details.

</details>

<details id="faq-not-continue">
<summary><strong>What if I decide not to continue?</strong></summary>

We confirm you want to end the trial and decommission the environment. No pressure, no obligation.

</details>

