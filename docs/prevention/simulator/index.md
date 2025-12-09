---
title: SCP Simulator
sidebar_label: Simulator
---

# SCP Simulator

The SCP Simulator allows you to visualize and test Service Control Policy (SCP) effects against your AWS Organizations and CloudTrail events before deploying them to production. This tool helps you understand how SCPs will impact your environment, identify unintended consequences, and validate that policies work as expected.

![SCP Simulator](./simulator.png)

## Understanding the SCP Simulator

Service Control Policies (SCPs) are AWS Organization-level policies that set permission guardrails for all accounts in an organization. SCPs never grant permissions—they only restrict what actions can be performed, even if IAM policies would otherwise allow those actions.

The simulator helps you:
- **Test SCP policies before deployment** to avoid accidentally blocking critical operations
- **Visualize policy effects** across your AWS Organization hierarchy
- **Validate policy syntax** to catch errors before they cause problems
- **Understand combined policy effects** when multiple SCPs apply
- **Test against real CloudTrail events** to see how policies would have affected actual API calls

## Why Use the Simulator

**Prevent production outages**
SCPs are powerful controls that can block API actions across entire AWS Organizations. Testing before deployment prevents accidentally blocking critical operations like CloudFormation deployments, CI/CD pipelines, or administrative tasks.

**Understand inheritance**
SCPs are inherited down the organization tree. The simulator helps visualize how policies attached at the organization root, organizational units, and account levels combine to affect specific accounts.

**Validate deny statements**
SCP deny statements are permanent—there's no way to override them with IAM allow statements. The simulator helps ensure your denies are scoped correctly.

**Test complex policies**
When multiple SCPs apply (some with explicit denies, some with implicit denies due to lack of allows), understanding the combined effect can be challenging. The simulator shows the net result.

**Reduce trial and error**
Rather than deploying policies to production and observing what breaks, use the simulator to test iteratively in a safe environment.

## Getting Started

### Step 1: Select an AWS Organization

The simulator page displays available AWS Organizations that have been imported into Turbot Guardrails.

Each organization card shows:
- **Organization name**: Friendly identifier (e.g., "GFB - AWS Organization")
- **Organization ID**: AWS organization identifier (e.g., "o-quusfh5fd9")
- **Management account ID**: The root account of the organization
- **Management account email**: Contact email for the management account

Click "Select" on the organization you want to test policies against.

### Step 2: Choose a Testing Method

The simulator offers multiple ways to test SCP policies:

**Test against organization structure**
Visualize how policies apply across the organization hierarchy (root, OUs, accounts).

**Test against CloudTrail events**
Upload CloudTrail logs or specify events to see if they would be allowed or denied by the SCP.

**Test custom policy JSON**
Paste an SCP policy document to validate syntax and see its effects.

### Step 3: Analyze Results

The simulator shows:
- **Allowed actions**: API calls that would be permitted
- **Denied actions**: API calls that would be blocked
- **Which policy caused the deny**: Identifying which SCP in the hierarchy blocked the action
- **Visual representation**: Graphical view of policy effects across the organization

## Use Cases

**Testing a new SCP before deployment**
1. Select your organization in the simulator
2. Paste the SCP policy JSON you want to deploy
3. Test against recent CloudTrail events from accounts that will be affected
4. Identify any critical operations that would be blocked
5. Refine the policy to add exceptions if needed
6. Re-test until confident
7. Deploy to production with minimal risk

**Understanding why an API call was denied**
1. Select the organization
2. Enter the CloudTrail event details (principal, action, resource, conditions)
3. Simulate the API call
4. See which SCP policy denied it
5. Trace the policy through the organization hierarchy
6. Determine if the deny was intentional or if the policy needs adjustment

**Validating compliance controls**
1. Create or obtain an SCP that enforces a compliance requirement (e.g., "Deny all S3:PutObject calls without server-side encryption")
2. Test the policy against sample API calls:
   - S3:PutObject with SSE-S3 (should allow)
   - S3:PutObject without encryption (should deny)
   - S3:GetObject (should allow)
3. Verify the policy behaves as expected
4. Test edge cases to ensure no unintended side effects

**Planning organization restructuring**
1. Simulate how moving accounts between OUs would change their effective permissions
2. Test whether existing workloads would continue to function after the move
3. Identify policies that would need to be adjusted
4. Plan the migration with confidence

**Training and education**
1. Use the simulator to demonstrate how SCPs work to team members
2. Show the difference between IAM policies and SCPs
3. Illustrate policy inheritance and precedence
4. Provide hands-on experience with SCP syntax and effects

## SCP Policy Concepts

**Effect**
SCPs support only "Deny" or "Allow" effects. Most organizations use deny-based SCPs with implicit denies (by not allowing everything, unspecified actions are denied).

**Action**
The AWS API actions to allow or deny (e.g., "s3:PutObject", "ec2:RunInstances").

**Resource**
The AWS resources the policy applies to (often "*" for organization-wide controls).

**Condition**
Optional conditions that must be met for the policy to apply (e.g., require MFA, restrict to specific regions).

**Inheritance and precedence**
- SCPs are inherited from parent OUs to child OUs and accounts
- If any SCP in the hierarchy denies an action, the action is denied
- Explicit denies cannot be overridden by allows
- The effective permissions are the intersection of all SCPs and IAM policies

## Common SCP Patterns

**Deny all actions except explicitly allowed (allowlist)**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:*",
        "ec2:*",
        "rds:*"
      ],
      "Resource": "*"
    }
  ]
}
```
This pattern allows only specified services. All other services are implicitly denied.

**Deny specific actions (denylist)**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": [
        "iam:DeleteRole",
        "s3:DeleteBucket",
        "ec2:TerminateInstances"
      ],
      "Resource": "*"
    }
  ]
}
```
This pattern blocks specific dangerous actions while allowing everything else.

**Require conditions**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringNotEquals": {
          "aws:RequestedRegion": ["us-east-1", "us-west-2"]
        }
      }
    }
  ]
}
```
This pattern denies all actions outside specified regions.

## Best Practices

**Test thoroughly before deploying**
Always use the simulator to test new or modified SCPs before applying them to production accounts.

**Start with audit mode**
Consider implementing detective controls (CloudWatch alarms, GuardDuty) to monitor for unwanted actions before deploying preventive SCPs.

**Test with real CloudTrail data**
Use recent CloudTrail events from your environment to test policies against actual workloads.

**Exclude break-glass accounts**
Consider excluding specific OUs or accounts from SCPs to maintain emergency access paths.

**Document policy intent**
Add clear descriptions to SCP policies explaining what they're meant to prevent and why.

**Version control**
Store SCP policies in version control (Git) alongside Infrastructure-as-Code to track changes over time.

**Review regularly**
Periodically review SCPs to ensure they still align with organizational needs and don't block legitimate new use cases.

**Coordinate with IAM**
Ensure SCP restrictions align with IAM policies. SCPs restrict what IAM policies can grant, but they don't grant permissions themselves.

## Limitations

**AWS Organizations only**
The simulator currently supports only AWS Service Control Policies. Azure Policies and GCP Organization Policies have separate testing mechanisms in their respective cloud consoles.

**CloudTrail event requirements**
To test against CloudTrail events, you need to provide or upload CloudTrail logs in the correct format.

**Simulation vs. production**
The simulator provides a close approximation of policy effects, but edge cases involving complex conditions or service-specific behaviors may differ slightly from production.

**No runtime testing**
The simulator tests policy syntax and logic but cannot test the actual impact on running workloads. Always plan a gradual rollout and monitoring strategy.

## Troubleshooting

**Policy syntax errors**
If the simulator reports syntax errors, validate your JSON formatting and ensure all required fields (Version, Statement, Effect, Action) are present.

**Unexpected denies**
If the simulator shows an action is denied when you expected it to be allowed:
1. Check all SCPs in the hierarchy (root, OU, account)
2. Remember that any explicit deny cannot be overridden
3. Verify condition keys are correctly specified
4. Ensure IAM action names match AWS service actions exactly

**Unexpected allows**
If the simulator shows an action is allowed when you expected it to be denied:
1. Verify your SCP uses "Deny" effect, not "Allow"
2. Check if a parent OU has an allow policy that grants the action
3. Remember SCPs only restrict—they don't see IAM policies that might also deny

## Next Steps

- Return to [Recommendations](../recommendations/index.md) to find SCP policies recommended for your environment
- Review [Preventions](../preventions/index.md) to see which SCPs are currently deployed
- Check [Objectives](../objectives/index.md) to understand security goals that SCPs can achieve
- Visit [Accounts](../accounts/index.md) to see prevention coverage across your organization
