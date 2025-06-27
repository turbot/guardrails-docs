---
title: Policy Pack Development with AI Tools
sidebar_label: Using AI for Policy Pack Development
---

# Policy Pack Development with AI Tools

In this guide, you will learn how to:

- Use the MCP server's AI assistant to generate a production-ready Turbot policy pack
- Configure Terraform files, policy settings, and README according to Turbot best practices
- Test and validate your policy pack before deploying to production

This step-by-step guide will help you streamline policy pack development using AI, ensuring all required components are created and validated efficiently.

## Prerequisites

Before you begin, ensure you have the following:

- Guardrails MCP server installed and configured.
  Follow the [Install Guardrails MCP guide](/guardrails/docs/guides/using-guardrails/ai/install-mcp) to set up the Model Context Protocol (MCP) server.
- Access to your Guardrails workspace URL (e.g., `https://your-workspace.cloud.turbot.com`).
- Familiarity with the [Guardrails console](https://turbot.com/guardrails/docs/getting-started/).
- A clear policy objective (for example, `Enforce EKS Public Endpoint Access`).
- Resource IDs available for testing your policy pack.

## Step 1: Clone *guardrails-samples* Repository

Before starting, clone the [guardrails-samples](https://github.com/turbot/guardrails-samples) repository locally. This repository contains example policy packs, recommended directory structure, and a README template. Use this as your working directory for creating and testing your new policy pack.

```bash
git clone https://github.com/turbot/guardrails-samples.git
cd guardrails-samples/policy_packs
```
>[!NOTE]
> Create a new branch to make sure you use this branch to raise PR against the main branch.

Let AI create your new policy pack as a subdirectory here, following the structure and examples provided.

## Step 2: Define Goal

Clearly state the policy objective. For example:

- Enforce EKS endpoint access security:
  - Public access is disabled by default.
  - If public access is enabled, restrict to specific CIDRs (e.g., `203.0.113.0/24`, `10.0.0.0/8`).
  - Private access must always be enabled.

### Identify Policies

List the relevant Turbot policies to include in your policy pack. You can explore the [Guardrails Hub](https://hub.guardrails.turbot.com/) to find policies specific to your chosen cloud provider's mod.

As an example, let's consider the following policies:

- [AWS > EKS > Cluster > Endpoint Access](https://hub.guardrails.turbot.com/mods/aws/policies/aws-eks/clusterEndpointAccess)
- [AWS > EKS > Cluster > Endpoint Access > CIDR Ranges](https://hub.guardrails.turbot.com/mods/aws/policies/aws-eks/clusterEndpointAccessCidrRanges)

## Step 3: Prepare LLM Prompt

Use the template below to guide the LLM when working in your new branch within the Cursor AI IDE or any AI-assisted development environment.

```
Goal:
- Enforce EKS endpoint access security:
  - Public access should be disabled by default.
  - If public access is enabled, restrict it to specific CIDRs (e.g., 203.0.113.0/24, 10.0.0.0/8).
  - Private access must always be enabled.
- Policies must be visible in the Guardrails UI as part of the policy pack.
- Support a production workflow where customers attach the policy pack manually.

Instructions:
1. Create a policy pack (Terraform) for AWS EKS endpoint access, following Turbot best practices and directory structure.
2. Define the policies as part of the policy pack (not as standalone policy settings). Use `turbot_policy_setting` resources with `resource = turbot_policy_pack.<name>.id`.
3. For testing:
   - Add a `turbot_policy_pack_attachment` resource to attach the policy pack to a real resource (provide a test resource ID).
   - After a successful test, prompt the user to validate in the Guardrails console that the policies are visible and correct.
   - Once the user confirms, remove the `turbot_policy_pack_attachment` resource for production readiness.
4. For production:
   - The policy pack should NOT include any `turbot_policy_pack_attachment` resource.
   - Customers will attach the policy pack to their desired resources manually via the Guardrails console.
5. README:
   - Generate a README for the policy pack following the rules in https://github.com/turbot/guardrails-samples/blob/main/policy_packs/README.md (categories, primary_category, type, usage, etc.).
   - Validate the README and policy pack structure against all best practices. If any rule fails, revise and revalidate until all are green/OK.
6. Test:
   - Initialize and apply the policy pack using Terraform, attaching it to the provided test resource.
   - Confirm that the policies are visible in the Guardrails UI under the policy pack and that the resource is compliant.
   - After user validation, remove the attachment for production.

Configuration Input:
- Approved CIDR ranges: `["203.0.113.0/24", "10.0.0.0/8"]`
- Test Resource ID: (provide your real resource ID, e.g., `355421285155896`)

Example Terraform Structure:
- `main.tf`: Defines the `turbot_policy_pack` (and, for testing only, the `turbot_policy_pack_attachment`).
- `policies.tf`: Defines `turbot_policy_setting` resources with `resource = turbot_policy_pack.<name>.id`.
- `providers.tf`: Provider block.
- `variables.tf`: Variable for the target resource.
- `README.md`: As per best practices.

Do not proceed if no real resource is available.
Do not use standalone policy settings attached directly to the resource.
All policies must be visible in the UI as part of the policy pack.

Workflow:
1. Develop and test with the attachment.
2. Prompt user to validate in the Guardrails console.
3. After confirmation, remove the attachment for production readiness.
```

## Step 4: Optimize the Feedback Loop

Work collaboratively with the AI assistant to review, validate, and improve your policy pack. Use an iterative approach: check the generated files, provide clear feedback, and request specific changes until the policy pack meets your requirements and best practices.

### Review the generated files

- `README.md`
- `main.tf`
- `policies.tf`
- `providers.tf`
- `variables.tf`

### Checklist

- Do the policy settings match your objectives?
- Are all required files present and following the recommended structure?
- Is the documentation clear and complete?
- Are there any errors or missing configurations?

### How to provide feedback

You can use prompts like:

```
Please update the following:
- Add more detail to the usage section in README.md
- Change the approved CIDR ranges in variables.tf to ["198.51.100.0/24"]
- Add tags to the policy pack in main.tf
- Ensure all policies are visible in the Guardrails UI
- Fix the resource reference in policies.tf to use the correct variable
```
### Iterate as needed
Repeat the review and feedback process until you are satisfied with the results. Don't hesitate to ask the AI assistant for clarifications, best practice checks, or additional examples.

## Step 5: Actionable Execution

Take your validated policy pack and apply it in a test environment to ensure everything works as expected.

### Apply the Policy Pack

1. **Plan the Deployment:**

   Lets initialize and run terraform plan.

   - Example prompt:
     ```
     - Initialize the Terraform configuration
     - Run terraform plan and wait for me to confirm terraform apply
     ```

2. **Apply to a Test Resource:**
   - Run `terraform apply` to deploy the policy pack, attaching it to your test resource (e.g., `355421285155896`).
   - Example prompt:
     ```
     - Apply the policy pack to resource 355421285155896
     ```
#### Example Prompts

In case any error or further validation use below

```
- Help me troubleshoot a Terraform apply error
- Confirm that the policy pack is visible in the Guardrails UI
- Check if the resource is compliant after applying the policy pack
```

### Review

- Log in to the Guardrails Console.
- Navigate to the test resource and confirm:
  - The policy pack and its policies are visible.
  - The resource is in a compliant or expected state (no alarms unless intended).

Manually review to make sure execution is successful

- [ ] Terraform apply completed without errors.
- [ ] Policy pack and all policies are visible in the Guardrails UI.
- [ ] Resource compliance status is as expected.
- [ ] No unexpected alarms or errors.



<!-- ## Step 6: Cleanup

After testing is completed, instruct the LLM to remove the attachment.

**Example Prompt**

   ```
   - Remove the test attachment for the generated policy pack.
   - Verify final structure matches existing policy pack structure `<provide relative path of existing policy pack>`
   ``` -->

## Step 6: Finalize for Production

After you have successfully tested your policy pack and validated the results, it's important to prepare your configuration for release by removing any test-specific resources or attachments.

### Remove Test Attachments

- Instruct the AI assistant (or manually update your Terraform files) to remove the `turbot_policy_pack_attachment` resource used for testing.
- Ensure your policy pack is now ready for release, where customers will attach it to their own resources via the Guardrails Console.

#### Example Prompts

```
- Remove the test attachment for the generated policy pack.
- Update documentation for production use.
- Verify final structure matches existing policy pack structure <provide relative path of existing policy pack>
```
### Review

- [ ] All test attachments have been removed from your Terraform configuration.
- [ ] The policy pack structure matches the recommended format and best practices.
- [ ] Documentation is updated for release.
