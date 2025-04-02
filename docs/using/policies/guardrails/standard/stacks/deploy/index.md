---
title: Deploy a Stack
sidebar_label: Deploy a Stack
---

# Deploy a Stack

Guardrails can help you centrally deploy, configure, and manage cloud resources using [Guardrails Stacks](/guardrails/docs/concepts/guardrails/stacks). With Guardrails stacks, you describe your configuration in OpenTofu, an open source Terraform implementation, and Guardrails applies it automatically.  Guardrails can re-apply the configuration at regular intervals or whenever resources change, enforcing your standards and preventing configuration drift.

In this Guide we will use the [Deploy AWS IAM Stack](https://hub.guardrails.turbot.com/policy-packs/aws_iam_deploy_aws_iam_stack) policy pack to deploy an IAM role via OpenTofu.

The `Deploy AWS IAM Stack` policy pack uses the `AWS > IAM > Stack [Native]` control to create and subsequently manage IAM resources across your AWS accounts . This control targets an AWS account; regardless of what level you set the stack policies, the control actually runs once for each account in scope, [in a single region](/guardrails/docs/concepts/guardrails/stacks#primary-regions).  If you need to deploy non-IAM resources, you should use the appropriate service stack (`AWS > VPC > Stack [Native]`, etc) or the general account-level (`AWS > Account > Stack [Native]`) or region-level (`AWS > Region > Stack [Native]`) stack control.

In this example, we will use the example source in the `Deploy AWS IAM Stack` policy pack to deploy a standard IAM role.  You can, however, modify the source, variables, and other policies to meet your needs.


## Prerequisites
- Guardrails: [TE](https://turbot.com/guardrails/docs/guides/hosting-guardrails/updating-stacks/update-workspace) 5.47+, with [aws-iam](https://hub.guardrails.turbot.com/mods/aws/mods/aws-iam) mod 5.39+
- Tools:  [git](git-scm.com), [Terraform](https://developer.hashicorp.com/terraform) or [OpenTofu](https://opentofu.org/), [Guardrails CLI credentials](https://turbot.com/guardrails/docs/reference/cli/installation#set-up-your-turbot-guardrails-credentials) configured
- [One or more AWS accounts imported](/guardrails/docs/guides/aws/import-aws-account)


## Step 1: Get Policy Pack

The  [Deploy AWS IAM Stack](https://hub.guardrails.turbot.com/policy-packs/aws_iam_deploy_aws_iam_stack) policy pack resides in the `guardrails-samples` repo. Let's clone the repo and change to the directory containing the policy pack code:
```sh
git clone https://github.com/turbot/guardrails-samples.git
cd guardrails-samples/policy_packs/aws/stack/deploy_aws_iam_stack
```

## Step 2: Review Stack Source

The `policies.tf` contains the policy settings for this policy pack.  The `AWS > IAM > Stack [Native] > Source` policy contains the OpenTofu configuration code that should be applied in each account. 

In this policy pack, the source is read from the `stack/source.tofu`.  This file contains the OpenTofu source that we will use in our example to create our IAM role.  The `Source` policy is just standard OpenTofu code that creates an IAM role.

You can, of course, modify, extend, or replace this configuration to meet your specific needs - set up IAM roles, users, policies, trust relationships, etc, all using standard OpenTofu!  For the purpose of this guide, however, we will run it as-is.

> [!IMPORTANT]
> Note that the stack expects to continue to manage any resources that are created by the stack - if you delete a resource from the OpenTofu configuration in the `Source` policy, the stack control will destroy the resource. If you modify a resource in the `Source`, the control will modify that AWS resource accordingly.


## Step 3: Set Stack Variables

Like the `Source` policy, the the `AWS > IAM > Stack [Native] > Variables` policy is configured in the `policies.tf`, which in turn reads its value from a file (`stack/variables.auto.tfvars`).  The `Variables` policy allows you to pass variable values to the stack; it is essentially a [tfvars](https://opentofu.org/docs/language/values/variables/#variable-definitions-tfvars-files) for the stack control.

Separating the configuration (`Source`) from the data (`Variables`) is
considered [best practice](/guardrails/docs/concepts/guardrails/stacks#best-practices) when using stacks:
- This makes the source easily testable outside of Guardrails.
- You can modify the behavior on a per-instance basis by simply editing the `Variables` - the
  `Source` does not change.
- You can separate the OpenTofu logic from the nunjucks logic when you need to use calculated policies.  At times, you may wish to use calculated policies to set the configuration based on other data in the Guardrails CMDB.  The best way to accomplish this is to us a calculated policy to set `Variables`, and use a static policy for the `Source`; rendering the input variables in nunjucks is much simpler than rendering the whole OpenTofu source.

In this policy pack example, the source defines a single variable named `trusted_principals` that should contain list of principal ARNs that can assume the role. These will be added to the trust policy.  Edit the `stack/terraform.tfvars` file to include the ARN for any role or user that you would like to be able to assume this role, and then save the file:

```hcl
trusted_principals = ["arn:aws:iam::123456789012:root"]
```


## Step 4: Enforce Stack Control

The `AWS > IAM > Stack [Native]` policy is the primary policy for the `AWS > IAM > Stack [Native]` control.  This policy determines the enforcement behavior:
  - `Skip`:  Do not run this control
  - `Check: Configured`: Run the OpenTofu plan and compare the resources against the plan, but *do not modify them*.  If the cloud resources match the plan, the control will be in `OK` state.  If the resources do not match the plan, the control will go to `Alarm`.
  - `Enforce: Configured`: Run the OpenTofu plan and compare the resources against the plan, and if the cloud resources do not match the plan, then apply it.

By default, the policy is set to `Check: Configured` in the pack's policy settings. To enable automated enforcements, you can switch these policies settings by adding a comment to the `Check: Configured` value and removing the comment from `Enforce: Configured`:

```hcl
# AWS > IAM > Stack [Native]
resource "turbot_policy_setting" "aws_account_stack" {
  resource = turbot_policy_pack.main.id
  type     = "tmod:@turbot/aws#/policy/types/accountStackNative"
  #value    = "Check: Configured"
  value    = "Enforce: Configured"
}
```

> [!TIP]
> If you prefer to preview the changes first, you can leave the setting in `Check: Configured` when you install the policy pack, then edit and re-apply later when you are ready to enforce


## Step 5: Install Policy Pack

> [!IMPORTANT]
> To run install the the policy pack via Terraform, you must [set up your Turbot Guardrails CLI credentials](https://turbot.com/guardrails/docs/reference/cli/installation#set-up-your-turbot-guardrails-credentials).

When you are ready to install the policy pack, run the Terraform commands to create the policy pack in your workspace:

```sh
terraform init
terraform plan
terraform apply
```

## Step 6: Attach Policy Pack

> [!IMPORTANT]
> Attaching this policy pack in Guardrails will result in creation of resources in the target account. However, it is easy to remove those resources later, by setting the contents of the Stack's `Source` policy to `{}`.

Log into your Guardrails workspace and [attach the policy pack to a resource](/guardrails/docs/guides/configuring-guardrails/policy-packs/attach-policy-pack-to-resource).

If this policy pack is attached to a Guardrails folder, its policies will be applied to all accounts and resources in that folder. The policy pack can also be attached to multiple resources.

For more information, please see [Policy Packs](https://turbot.com/guardrails/docs/concepts/policy-packs).


## Step 7: View Control Run

In a few seconds, the stack control will run and create an IAM role for each account in scope.  You can [view the process logs for the control](/guardrails/docs/guides/using-guardrails/troubleshooting/access-control-logs) (even while its running!) to view the the OpenTofu output.

![AWS > IAM > Stack [Native] -- Process Logs](/images/docs/guardrails/guides/using-guardrails/stacks/deploy/aws_iam_stack_control_log_create_top.png)


## Step 8: Review

- [ ] After the stack has run, check the status of the `AWS > IAM > Stack [Native]` controls for the accounts in scope.  When the controls have all completed, they should be in the 'OK' state.  You can check their status individually from the [control detail page](/guardrails/docs/guides/using-guardrails/console/detail-pages#control-details), or view them all from the **Controls** tab by [searching or filtering on the `AWS > IAM > Stack [Native]` type](/guardrails/docs/guides/using-guardrails/searching-filtering).

![AWS > IAM > Stack [Native] -- Process Logs](/images/docs/guardrails/guides/using-guardrails/stacks/deploy/aws_iam_stack_controls_ok.png)


- [ ] Verify that VPCs have been created in the accounts that you specified.

```bash
$ aws iam get-role --role-name read_only_role --profile dmi-scranton
{
    "Role": {
        "Path": "/",
        "RoleName": "read_only_role",
        "RoleId": "AROAQ4Z73DOOGHNJRLKGK",
        "Arn": "arn:aws:iam::061874051996:role/read_only_role",
        "CreateDate": "2025-01-22T21:30:52+00:00",
        "AssumeRolePolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": "arn:aws:iam::061874051996:root"
                    },
                    "Action": "sts:AssumeRole"
                }
            ]
        },
        "MaxSessionDuration": 3600,
        "RoleLastUsed": {}
    }
}
```

## Next Steps
- Learn more about Guardrails [Stack controls](/guardrails/docs/concepts/guardrails/stacks)

## Troubleshooting

| Issue                      | Description                                                                                                                             | Guide                                |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------
| Further Assistance         | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.   | [Open Support Ticket](https://support.turbot.com)