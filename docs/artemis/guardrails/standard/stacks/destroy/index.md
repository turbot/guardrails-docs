---
title: Destroy a Stack
sidebar_label: Destroy a Stack
---

# Destroy a Stack

Guardrails stack controls help you centrally deploy, configure, and manage cloud-based resources using OpenTofu.  This includes destroying the resources if you no longer need them.

In this guide, you will configure stack policies to preview deletion and then delete all stack resources.

## Prerequisites
- Guardrails: [TE](https://turbot.com/guardrails/docs/guides/hosting-guardrails/updating-stacks/update-workspace) 5.47+, with [aws-iam](https://hub.guardrails.turbot.com/mods/aws/mods/aws-iam) mod 5.39+
- Tools: [git](https://git-scm.com/), [Terraform](https://developer.hashicorp.com/terraform) or [OpenTofu](https://opentofu.org/), [Guardrails CLI credentials](https://turbot.com/guardrails/docs/reference/cli/installation#set-up-your-turbot-guardrails-credentials) configured
- [One or more AWS accounts imported](/guardrails/docs/guides/aws/import-aws-account)
- Install and attach the [Deploy AWS IAM Stack](https://hub.guardrails.turbot.com/policy-packs/aws_iam_deploy_aws_iam_stack) policy pack, per the [Running Stacks guide](/guardrails/docs/guides/using-guardrails/stacks/deploy)


## Step 1: Change Primary Policy to Preview Deletion

The `AWS > IAM > Stack [Native]` policy is the primary policy for the `AWS > IAM > Stack [Native]` control.  This policy determines the enforcement behavior.  To preview the changes before enforcing them, set the policy to the `Check: Configured`.

Edit the `policies.tf` for the [Deploy AWS IAM Stack](https://hub.guardrails.turbot.com/policy-packs/aws_iam_deploy_aws_iam_stack) policy pack. Uncomment the `Check: Configured` value and comment out `Enforce: Configured`:

```hcl
# AWS > IAM > Stack [Native]
resource "turbot_policy_setting" "aws_account_stack" {
  resource = turbot_policy_pack.main.id
  type     = "tmod:@turbot/aws#/policy/types/accountStackNative"
  value    = "Check: Configured"
  # value    = "Enforce: Configured"
}
```

## Step 2: Change Stack Source to Empty Plan

The `Source` policy setting for stack control contains the OpenTofu HCL that describes the resources to configure.  The stack control manages the OpenTofu state and expects to continue to manage any resources that it creates.  As a result, removing a resource from the source will cause it to be destroyed.  To destroy *all* resources that are managed by this stack control, simply remove them all from the plan and replace them with an empty plan.

The `policies.tf` file in the policy pack includes a commented-out example value for destroying the stack.  Comment the current value, and uncomment the empty source (`value = "{}"`):

```hcl
# AWS > IAM > Stack [Native] > Source
resource "turbot_policy_setting" "aws_iam_stack_source" {
  resource = turbot_policy_pack.main.id
  type     = "tmod:@turbot/aws-iam#/policy/types/iamStackNativeSource"

  # Create a stack using the ./stack/source.tofu
  # value    = file("./stack/source.tofu")

  # Destroy all resources in the stack
  value = "{}"
}
```

## Step 3: Apply Updated Policy Pack

When you are ready to update the policy pack, reapply the Terraform plan in your workspace:

```sh
terraform apply
```


## Step 4: Preview Deletion in Control Process Log

The `AWS > IAM > Stack [Native]` will run automatically because the policies have changed.  Since the AWS configuration no longer matches the `Source`, the controls will go to an `Alarm` state.  Because we set the primary control to `Check: Configured`, however, the stack will not delete the resources at this time. 

You can check the control status individually from the [control detail page](/guardrails/docs/guides/using-guardrails/console/detail-pages#control-details), or view them all from the **Controls** tab by [searching or filtering on the `AWS > IAM > Stack [Native]` type](/guardrails/docs/guides/using-guardrails/searching-filtering). 


![AWS > IAM > Stack [Native] -- Process Logs](/images/docs/guardrails/guides/using-guardrails/stacks/destroy/aws_iam_stack_controls_alarm.png)

You can [view the process logs for the control](/guardrails/docs/guides/using-guardrails/troubleshooting/access-control-logs) to view the the OpenTofu output and preview the deletion

![AWS > IAM > Stack [Native] -- Process Logs](/images/docs/guardrails/guides/using-guardrails/stacks/destroy/aws_iam_stack_control_log_delete_preview.png)


## Step 5: Change Primary Policy to Enforce Deletion

Now, let's change the `AWS > IAM > Stack [Native]` policy to enforce the configuration and destroy the resources.  Edit the `policies.tf` for the `Deploy AWS IAM Stack` policy pack. Uncomment the `Enforce: Configured` value and comment out `Check: Configured`:

```hcl
# AWS > IAM > Stack [Native]
resource "turbot_policy_setting" "aws_account_stack" {
  resource = turbot_policy_pack.main.id
  type     = "tmod:@turbot/aws#/policy/types/accountStackNative"
  #  value    = "Check: Configured"
  value    = "Enforce: Configured"
}
```


## Step 6: Apply Updated Policy Pack

Reapply the Terraform plan in your workspace:

```sh
terraform apply
```


## Step 7: View Control Run

In a few seconds, the stack control will run and destroy the IAM resources in each account.  You can [view the process logs for the control](/guardrails/docs/guides/using-guardrails/troubleshooting/access-control-logs) to view the OpenTofu output and confirm.

![AWS > IAM > Stack [Native] -- Process Logs](/images/docs/guardrails/guides/using-guardrails/stacks/destroy/aws_iam_stack_control_log_destroy.png)


## Step 8: Review

- [ ] After the stack has run, check the status of the `AWS > IAM > Stack [Native]` controls for the accounts in scope.  When the controls have all finished running, they should be in the 'OK' state.  You can check the control status individually from the [control detail page](/guardrails/docs/guides/using-guardrails/console/detail-pages#control-details), or view them all from the **Controls** tab by [searching or filtering on the `AWS > IAM > Stack [Native]` type](/guardrails/docs/guides/using-guardrails/searching-filtering).


![AWS > IAM > Stack [Native] -- Process Logs](/images/docs/guardrails/guides/using-guardrails/stacks/deploy/aws_iam_stack_controls_ok.png)


- [ ] Verify that VPCs have been destroyed in the accounts that you specified.

```bash
$ aws iam get-role --role-name read_only_role --profile dmi-scranton

An error occurred (NoSuchEntity) when calling the GetRole operation: The role with name read_only_role cannot be found.
```

## Next Steps

- Learn more about Guardrails [Stack controls](/guardrails/docs/concepts/guardrails/stacks)

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |