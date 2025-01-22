---
title: Destroying Stacks 
sidebar_label: Destroying Stacks 
---

# Destroying Stacks

Guardrails stack controls help you centrally deploy, configure, and manage cloud-based resources using OpenTofu.  This includes destroying the resources if you no longer need them.

In this guide, you will configure stack policies to preview deletion, and then delete all stack resources.

## Prerequisites
- [TE](https://turbot.com/guardrails/docs/guides/hosting-guardrails/updating-stacks/update-workspace) 5.47 or later <!-- ([self-hosted Turbot Guardrails Enterprise](/guardrails/docs/guides/hosting-guardrails) only) -->


## Step 1: Change the Primary Policy to Preview the Deletion

Edit to the `Stack [Native]` policy setting for stack control that you want to destroy, for example `AWS > VPC > Stack [Native]`.  [Change the Policy setting](guardrails/docs/guides/configuring-guardrails/managing-policies#modifyingdeleting-a-policy-setting) to `Check: Configured`.  This will allow you to preview the stack deletion before destroying the resources.


## Step 2: Change the Stack Source to an Empty Plan

Edit the `Source` policy setting for stack control that you want to destroy, for example `AWS > VPC > Stack [Native] > Source`.  [Change the Policy setting](guardrails/docs/guides/configuring-guardrails/managing-policies#modifyingdeleting-a-policy-setting) to `{}`.  Since this is an empty plan, all resources in the stack will be destroyed.

## Step 3: Apply the Updated Policy Pack

When you are ready to update the policy pack, reapply the Terraform plan in your workspace:

```sh
terraform apply
```

## Step 4: Preview the Deletion in the Control Process Log
Because the configuration no longer matches the `Source` policy, the stack controls will move to an `alarm` state

## Step 4: Change the Primary Policy to Enforce the Deletion


Edit to the `Stack [Native]` policy setting for stack control that you want to destroy, for example `AWS > VPC > Stack [Native]`.  [Change the Policy setting](guardrails/docs/guides/configuring-guardrails/managing-policies#modifyingdeleting-a-policy-setting) to `Enforce: Configured`.  This will destroy all the resources managed by the stack.

## Step 5: View the Deletion in the Control Process Log


## Step n: Review


## Next Steps


- Learn more about Guardrails [Stack controls](/guardrails/docs/concepts/guardrails/stacks) 

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |