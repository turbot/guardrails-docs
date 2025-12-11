---
title: Recommendations
sidebar_label: Recommendations
---

# Recommendations

The Recommendations page provides prioritized, actionable guidance for implementing preventions across your cloud environment. This page helps you identify which preventions to implement first based on security impact, compliance requirements, and implementation effort.

![Recommendations List](./recommendations-list.png)

## Understanding Recommendations

Recommendations are your prioritized to-do list for improving cloud security. Each one tells you a specific prevention to implement, explains why it matters, and shows you the security impact you'll get. Unlike the Objectives page (which shows what's possible) or the Preventions page (which shows what's already active), Recommendations focuses on what you should do next based on your current gaps.

Every recommendation has a priority level (P1 through P4) indicating how critical it is, belongs to a security category (like Data Governance or Identity & Access), and includes implementation guidance so you can actually deploy it. The page sorts recommendations by opportunity—considering both the security impact and how many resources currently lack the control—so the most valuable work surfaces first.

## Recommendation Detail View

Clicking into any recommendation reveals specific, actionable implementation guidance tailored to your environment. The system generates concrete prevention policies ready to deploy, showing you exactly what to implement and how.

![Recommendation detail showing generated implementation guidance for EBS volume encryption](./recommendation-detail-overview.png)

When you open a recommendation like "Implement 'Require encryption at rest for AWS EBS volumes'," the page analyzes your environment and generates specific preventions that will achieve the objective. This isn't generic advice—the recommendations are based on your actual account structure, existing controls, and identified gaps.

The detail view shows:
- **Summary**: Explains what the objective requires and why it matters—"Require encryption for all EBS volumes to protect block storage data at rest"
- **Current State**: Identifies existing gaps—"Existing rules enforce EBS encryption by default in specific accounts and regions, but not comprehensively across the organization. Gaps include lack of enforcement during CloudFormation operations and incomplete regional settings, risking unencrypted data exposure."
- **Specific Recommendations**: Lists multiple prevention approaches at different layers for defense-in-depth

For EBS volume encryption, the system generates six specific recommendations:
1. **Deny Unencrypted EBS Volume Creation** (AWS SCP Deny Statement) - Access layer prevention
2. **Enable EBS Encryption by Default** (AWS EC2 Account Attribute) - Config layer setting
3. **Enforce EBS Encryption by Default for EC2 Accounts** (Turbot Guardrails Control) - Runtime monitoring
4. **Require Encryption for EBS Volumes in CloudFormation** (AWS Control Tower Proactive Control) - Build layer prevention
5. **Require Encryption for Launch Template EBS Volumes** (AWS Control Tower Proactive Control) - Build layer prevention
6. **Ensure Attached EBS Volumes Are Encrypted** (AWS Control Tower Preventive Control) - Access layer prevention

Each recommendation includes the complete policy definition or configuration guidance. Expand any recommendation to see the full details:

![Expanded SCP recommendation showing complete policy JSON and deployment guidance](./recommendation-expanded.png)

The expanded view shows everything you need to deploy the prevention:
- **How to Deploy**: Specific instructions like "Deploy this SCP at the root level (ID: 369550743463500) to enforce encryption across all AWS accounts in the organization"
- **Complete Policy JSON**: The exact SCP policy document ready to copy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyUnencryptedEBSVolumes",
      "Effect": "Deny",
      "Action": ["ec2:CreateVolume"],
      "Resource": "arn:aws:ec2:*:*:volume/*",
      "Condition": {
        "Bool": {
          "ec2:Encrypted": "false"
        }
      }
    }
  ]
}
```
- **Simulate Button**: For SCP recommendations, a button to test the policy before deployment

You can copy this policy directly into your AWS Organization's SCPs or your Infrastructure-as-Code templates. The recommendations are specific to your environment—they identify the exact organizational units or accounts where the prevention should be deployed based on your current gaps.

### Testing Recommendations with the Simulator

For Service Control Policy recommendations, you'll find a "Simulate" button that takes you directly to the Simulator with the recommended policy pre-loaded. This lets you test the policy against your CloudTrail events before deploying it, ensuring it blocks what you want blocked without breaking legitimate operations.

![Simulator with pre-loaded SCP policy from recommendation](./recommendation-simulator.png)

The Simulator workflow:
1. Click "Simulate" on an SCP recommendation
2. The Simulator loads with the recommended policy pre-populated in the URL
3. The policy is ready to test against your organization's structure and CloudTrail events
4. You can verify expected allows and denies before deployment
5. Refine the policy if needed based on test results
6. Deploy with confidence knowing exactly what the policy will do

This testing capability is critical—SCPs affect entire accounts or OUs, and mistakes can break production systems. The Simulator ensures you understand exactly what the policy will do before you deploy it broadly. You can test against real CloudTrail events from your environment to see which API calls would be allowed or denied, helping you identify any unintended impacts before they affect production. See the [Simulator](/guardrails/docs/prevention/simulator) documentation for details on testing preventions.

## What Makes This Useful

The real value of Recommendations is focus. You might have 200 prevention objectives across AWS, Azure, and GCP, but you can't implement everything at once. Which ones matter most right now? Which ones protect the most resources? Which ones address your biggest compliance gaps? Recommendations answers these questions by analyzing your current environment, identifying where you lack preventive controls, and prioritizing what to fix.

The default sorting—Opportunity (High to Low)—weighs several factors. A P1 objective protecting 50 unprotected accounts ranks higher than a P4 objective protecting 100 accounts. A control required by multiple compliance frameworks you're pursuing ranks higher than one that's not. This intelligent prioritization helps you spend your limited time on work that actually reduces risk rather than randomly picking from a long list of possibilities.

You can search to find recommendations for specific services ("S3", "Lambda", "Azure Storage"), filter to focus on P1 recommendations or specific accounts, or sort by category to tackle one security domain at a time. The page adapts to how you prefer to work—whether you're chasing compliance certifications, securing specific accounts, or just trying to knock out the highest-impact work each sprint.

## Recommendation Priorities

Recommendations are organized by [priority](/guardrails/docs/prevention/objectives/priorities) (P1 through P4) indicating how critical they are. P1 recommendations are foundational controls that prevent common, high-severity attacks and should be implemented immediately. P2 recommendations provide strong security improvements for sensitive data and common attack vectors. P3 recommendations enhance posture through defense-in-depth and operational resilience. P4 recommendations are optimization and hygiene controls that provide incremental improvements.

Focus on P1 recommendations first—these are often straightforward to implement (a simple SCP or account setting) but provide massive risk reduction. Once your P1 foundation is solid, move to P2. Most organizations should aim for strong P2 coverage within 90 days of establishing P1 baselines.

## Recommendation Categories

Recommendations organize by [security domain](/guardrails/docs/prevention/objectives/categories) so you can tackle related controls together or identify imbalanced coverage. The seven categories are Core Infrastructure, Data Governance, Identity & Access, Trust & Sharing, Network Perimeter, Audit & Logging, and Feature Restrictions.

Filtering to a single category helps when you want to focus effort. Implementing all Data Governance recommendations together often requires similar expertise and tooling, making it more efficient than jumping between unrelated controls. The category view also reveals blind spots—if you have ten P1 Identity & Access recommendations but only two P1 Data Governance recommendations, you might be over-focusing on one domain while neglecting another.

## Understanding "Opportunity"

The default sort puts recommendations providing the most security value at the top. Opportunity scoring considers how much risk the prevention reduces (higher-impact controls protecting more resources or preventing more severe threats rank higher), how many accounts or resources currently lack the control (widespread gaps rank higher), whether it's required by compliance frameworks you're pursuing, and how feasible implementation is (easier controls rank higher when they provide similar value to complex alternatives).

This means a P1 control protecting 50 unprotected accounts typically ranks above a P4 control protecting 100 accounts—the priority weighting recognizes that fixing critical gaps matters more than comprehensive coverage of nice-to-haves. The scoring adapts to your environment, so two organizations might see different top recommendations based on their specific gaps and compliance needs.

## Common Use Cases

If you're starting a prevention initiative, review the default Opportunity sort and focus on P1 recommendations first. Click into each one to understand what objective it achieves, which accounts need it, and how to implement it. Recommendations include policy templates and configuration guidance. Build an implementation plan prioritizing high-opportunity P1 and P2 recommendations, then track progress by watching recommendations disappear as you implement them.

For compliance certification, search for your target framework ("CIS", "NIST", "PCI") and filter to P1 and P2 recommendations. Each recommendation shows which compliance objectives it satisfies, so you can implement controls systematically by benchmark section and track overall compliance progress in the Benchmarks view.

When securing a specific account, filter to that account and sort by priority. Knock out P1 recommendations first, then move to P2. Return to the account detail page to see your prevention score improve as you implement controls.

For category-focused work, filter to a domain like Data Governance or Identity & Access, review all recommendations, and identify patterns. If you see many encryption-related gaps, that's your theme. Implementing category-specific controls together is often more efficient than jumping between unrelated domains since you're using similar expertise and tooling.

Some teams set monthly security improvement goals—maybe implementing 5-10 recommendations per sprint. Focus on highest-opportunity recommendations each month, balance across categories to maintain broad coverage, and track progress by watching total recommendations decrease and prevention scores increase.

## Tracking Implementation Progress

As you implement recommendations, they disappear from the list once you've achieved the objective across all applicable accounts. Your prevention scores improve—at the account level, objective level, and benchmark level—reflecting the reduced risk. New recommendations might appear as you add accounts or enable services, and opportunity rankings can shift as your environment evolves, re-prioritizing what provides the most value given your current state.

Each recommendation includes an impact statement explaining what will be prevented or enforced and why it matters. For example: "Prevent Lambda functions from being invoked by unauthorized principals to prevent unauthorized invocation and data exfiltration. This is critical because public Lambda resource policies can enable unauthorized access, data exfiltration, and abuse of computational resources." These statements help you communicate the security value to stakeholders who might not understand the technical implementation details.

## Best Practices

Start with P1 recommendations—critical preventions provide the most security value and are often prerequisites for P2 and P3 controls. For important objectives, implement preventions at multiple layers (Build, Access, Config, Runtime) for defense-in-depth. Consider focusing on one category at a time since implementing all Data Governance recommendations together often requires similar expertise and tooling.

Use the policy templates provided in recommendations—ready-to-use SCPs, Azure Policies, and other controls accelerate implementation. Always test before deploying broadly—start with a test account, verify the prevention works as expected, then roll out to production. Document any recommendations you choose not to implement, noting why (conflicts with business requirements, alternative control in place, etc.).

Automate deployment using Infrastructure-as-Code so preventions are consistently applied across accounts and can be version controlled. Return to the Recommendations page regularly—as your environment evolves with new accounts and services, new recommendations will appear, and addressing them promptly prevents security drift.

## Next Steps

- Click into any recommendation to see detailed implementation guidance
- Visit [Objectives](/guardrails/docs/prevention/objectives) to understand the security goals behind recommendations
- Check [Preventions](/guardrails/docs/prevention/preventions) to see all active prevention controls
- Review [Accounts](/guardrails/docs/prevention/accounts) to see prevention coverage by account
- Use the [Simulator](/guardrails/docs/prevention/simulator) to test Service Control Policies before deployment
