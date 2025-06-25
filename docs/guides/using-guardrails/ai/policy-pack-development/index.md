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

List the Turbot policies to include:

- [AWS > EKS > Cluster > Endpoint Access](https://hub.guardrails.turbot.com/mods/aws/policies/aws-eks/clusterEndpointAccess)
- [AWS > EKS > Cluster > Endpoint Access > CIDR Ranges](https://hub.guardrails.turbot.com/mods/aws/policies/aws-eks/clusterEndpointAccessCidrRanges)

## Step 4: Prepare LLM Prompt

Use the following template to instruct the LLM while in the new branch within the Cursor AI IDE

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
## Step 5:  Interact and Refine

When working with an AI assistant to develop policy packs, you'll need to provide clear inputs and context based on self validation

- Review the generated files:
   - README.md
   - main.tf
   - policies.tf
   - providers.tf
   - variables.tf
- Ensure policy settings match your requirements.
- Request adjustments as needed. You may prompt e.g.
   ```
   Please adjust the following:
   - Add more detail to README usage section
   - Update CIDR ranges in variables.tf
   - Add tags to policy pack in main.tf
   ```

## Step 6. Apply and Validate

- Apply the policy pack using Terraform, attaching it to the test resource.
- Confirm policies are visible in the Guardrails Console under the policy pack.
- Check for compliant or alarm states.

Request specific test scenarios prompt as example:

   ```
   Please help me:
   - Initialize the Terraform configuration
   - Apply the policy pack to resource 355421285155896
   - Check compliance status
   ```
<!-- ## Outcome

You will have a production-ready policy pack, following Turbot best practices, with all policies visible in the Guardrails UI. The pack will be ready for manual attachment to resources in production environments. -->

## Step 7: Cleanup

After testing is completed, instruct the LLM to remove the attachment.

   ```

   - Remove the test attachment for the generated policy pack.
   - Update documentation for production use
   - Verify final structure matches existing policy pack structure `<provide relative path of existing policy pack>`
   ```
