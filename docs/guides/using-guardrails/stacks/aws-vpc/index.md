---
title: AWS Landing Zone VPC
sidebar_label: AWS Landing Zone VPC
---

# AWS Landing Zone VPC Stacks


A **Landing Zone VPC** is a pre-configured, user-defined standard network environment in AWS, designed to serve as the foundation for deploying and managing resources. It ensures consistency, governance, and compliance by implementing standard configurations. By centralizing management and adhering to best practices, a Landing Zone VPC minimizes risks, optimizes costs, and provides a solid framework for cloud operations from day one.

Guardrails can help you centrally deploy, configure, and manage your landing zone VPCs using [Guardrails Stacks](/guardrails/docs/concepts/guardrails/stacks). With Guardrails network stacks, you describe your network configuration in OpenTofu, an open source Terraform implementation, and Guardrails applies your configuration automatically.  Guardrails can re-apply the configuration at regular intervals or whenever resources change, enforcing your standards and preventing configuration drift.

<!--
There are 2 classes of network stacks:
- The `AWS > VPC > Stack [Native]` stack target the *region*, and is meant to create standard, landing-zone style networks in appropriate regions of your accounts.
- The `AWS > VPC > VPC > Stack [Native]` and `Azure > Network > Virtual Network > Stack [Native]` controls target the *VPC*, and is meant for creating standard resources that belong in *every* VPC.
-->

In this guide, we will use the `Deploy Landing Zone VPCs` Policy Pack to deploy a landing zone VPC via the `AWS > VPC > Stack [Native]` control:
- Download the **Deploy Landing Zone VPCs** policy pack
- View the stack source code
- Set variables to customize the policy pack with the IP ranges for your environment
- Install and attach the policy pack to run the stack


## Prerequisites
- [TE](https://turbot.com/guardrails/docs/guides/hosting-guardrails/updating-stacks/update-workspace) 5.47 or later <!-- ([self-hosted Turbot Guardrails Enterprise](/guardrails/docs/guides/hosting-guardrails) only) -->
- [aws-vpc-core](https://hub.guardrails.turbot.com/mods/aws/mods/aws-vpc-core) mod, version 5.19 or later
- [One or more AWS accounts imported](/guardrails/docs/guides/aws/import-aws-account)



## Scenario

In this Guide we will use the **Deploy Landing Zone VPCs** policy pack to deploy a standard VPC configuration via OpenTofu.

The **Deploy Landing Zone VPCs** policy pack uses the `AWS > VPC > Stack [Native]` control to create and subsequently manage VPCs and related objects across your AWS accounts and regions. This control targets an AWS region; regardless of what level you set the stack policies, the control actually runs once for each region in scope.

The stack control can automate the deployment and ongoing updates to your standard VPCs. Note that this control is NOT intended to manage existing VPCs that were created outside of the stack. You should leverage the other Guardrails standard guardrails (`Active`, `Approved`, `Tags`, etc) to manage these resources.

In this example, we will define a simple, standard VPC configuration with 2 public and 2 private subnets. Because we would like to deploy this across all of our accounts, will use a map variable to define what ip ranges are assigned to which regions for each account.

In this example, we will assume:

We have 4 AWS Accounts with the following AWS account aliases:
  - `gnb-aaa`
  - `gnb-bbb`
  - `gnb-ccc`
  - `gnb-ddd`

We only use 2 regions:
  - `us-east-1`
  - `us-west-2`


## Step 1: Get the policy pack

The  **Deploy Landing Zone VPCs** policy pack resides in the `guardrails-samples` repo. Let's clone the repo and change to the directory containing the policy pack code:
```sh
git clone https://github.com/turbot/guardrails-samples.git
cd guardrails-samples/policy_packs/aws/stack/deploy_landing_zone_vpc
```

## Step 2: Review the stack source
<!--
## Step 3: Review the AWS > VPC > Stack [Native] > Source Policy
-->
The `policies.tf` contains the policy settings for this policy pack.  The `AWS > VPC > VPC > Stack [Native] > Source` policy contains the OpenTofu configuration code that should be applied in each region. 

In this policy pack, the source is read from the `stack-source.hcl`.  This file contains the OpenTofu source that we will use in our example to create our landing zone VPC.  The `Source` policy is just standard OpenTofu code. It uses data providers to determine which account and region it is running in, and uses that information to look up IP address range specific to this account/region in variables defined at the top of the configuration. This configuration will create a VPC, an internet gateway, as well public subnets, private subnets, and NAT gateways across multiple availability zones.

You can, of course, extend this configuration to meet your specific needs - set up VPN connectivity, create VPC endpoints, security groups, transit gateway attachments, etc, all using standard OpenTofu!  For the purpose of this guide, however, we will run it as-is.

> [!NOTE]
> Note that the stack expects to continue to manage any resources that are created by the stack - if you delete a resource from the OpenTofu configuration in the `Source` policy, the stack control will destroy the resource. If you modify a resource in the `Source`, the control will modify that AWS resource accordingly.



## Step 3: Set the stack variables
<!--
## Step 3: Set the AWS > VPC > Stack [Native] > Variables Policy
-->

The `policies.tf` contains the policy settings for this policy pack, including the `AWS > VPC > VPC > Stack [Native] > Variables` policy.  The `Variables` policy allows you to pass variables values to the stack; it is essentially a [tfvars](https://opentofu.org/docs/language/values/variables/#variable-definitions-tfvars-files) for the stack control.

Separating the configuration (`Source`) from the data (`Variables`) is
considered best practice when using stacks:
- This makes the source easily testable outside of Guardrails.
- You can add new VPC IP assignments by simply editing the `Variables` - the
  `Source` does not change.
- At times, you may wish to use calculated policies to set the configuration
  based on other data in the Guardrails CMDB.  The best way to accomplish this is to us a calculated policy to set variables, and use a static policy for the source; rendering the input variables in nunjucks is much simpler than rendering the whole OpenTofu source.

In this policy pack, the source looks up the IP assignment information specific to
each account/region in the `ip_assignments` variable. The value in the policy pack matches our [fictional scenario](#scenario):

```hcl
## map of ip addresses to assign, by account-alias, then region
ip_assignments = {
    gnb-aaa-us-east-1 = "10.100.8.0/22"
    gnb-aaa-us-west-2 = "10.104.8.0/22"
    gnb-bbb-us-east-1 = "10.108.8.0/22"
    gnb-bbb-us-west-2 = "10.112.8.0/22"
    gnb-ccc-us-east-1 = "10.116.8.0/22"
    gnb-ccc-us-west-2 = "10.120.8.0/22"
    gnb-ddd-us-east-1 = "10.124.8.0/22"
    gnb-ddd-us-east-2 = "10.128.8.0/22"
}
```

*You must override this value in the `Variables` policy with the IP address assignments for your account aliases and regions.*   Edit the `ip_assignments` map for your aliases and regions and then save the `policies.tf` file.  The CIDR ranges may be any size.  The example `Source` will divide them evenly based on the number of subnets you choose to create.

> [!NOTE]
> In the example in the policy pack, if an entry isn't found in the map for a given account/region, it will not create any resource but the control will remain in OK state.

By default, the policy pack will create 2 public subnets and 2 private subnets across 2 availability zones, and will prefix all resource names with `guardails_`, buy you can change these options by editing the variables.


## Step 4: Enforce the stack

<!--
## Step 4: Review the `AWS > VPC > VPC > Stack [Native]` primary policy
-->

The `AWS > VPC > VPC > Stack [Native]` policy is the primary policy for the control.  This policy determines the enforcement behavior:
  - `Skip`:  Do not run this control
  - `Check: Configured`: Run the OpenTofu plan and compare the resources against the plan, but *do not modify them*.  If the cloud resources match the plan, the control will be in `OK` state.  If the resources do not match the plan, the control will go to `Alarm`.
  - `Enforce: Configured`: Run the OpenTofu plan and compare the resources against the plan, and if the cloud resources do not match the plan, then apply it.

By default, the policy is set to `Check: Configured` in the pack's policy settings. To enable automated enforcements, you can switch these policies settings by adding a comment to the `Check: Configured` value and removing the comment from `Enforce: Configured`:

```hcl
resource "turbot_policy_setting" "aws_vpc_stack" {
  resource = turbot_policy_pack.main.id
  type     = "tmod:@turbot/aws-vpc-core#/policy/types/vpcServiceStackNative"
  #value    = "Check: Configured"
  value    = "Enforce: Configured"
}
```

> [!TIP]
> If you prefer to preview the changes first, you can leave the setting in `Check: Configured` when you install the policy pack, then edit and re-apply later when you are ready to enforce


## Step 5: Install the policy pack
<!--
***should these be opentofu commands instead of terraform??***
-->

> [!IMPORTANT]
> To run install the the policy pack via Terraform, you must [set up your Turot Guardrails CLI credentials](https://turbot.com/guardrails/docs/reference/cli/installation#set-up-your-turbot-guardrails-credentials).

When you are ready to install the policy pack, run the Terraform commands to create the policy pack in your workspace:

```sh
terraform init
terraform plan
```

Then apply the changes:

```sh
terraform apply
```

## Step 6: Attach the policy pack

> [!IMPORTANT]
> Attaching this policy pack in Guardrails will result in creation of resources in the target account. However, it is easy to remove those resources later, by setting the contents of the Stack's `Source` policy to `{}`.

Log into your Guardrails workspace and [attach the policy pack to a resource](https://turbot.com/guardrails/docs/guides/policy-packs#attach-a-policy-pack-to-a-resource).

If this policy pack is attached to a Guardrails folder, its policies will be applied to all accounts and resources in that folder. The policy pack can also be attached to multiple resources.

For more information, please see [Policy Packs](https://turbot.com/guardrails/docs/concepts/policy-packs).



## Step 7: View the control run

In a few seconds, the stack control will run for each region in scope, and will
create new VPCs in each of the regions of all accounts in the folder that have been added to the `ip_assignments` map.  You can view the process logs for the control (even while its running!) to view the the OpenTofu output.

From the control's detail page, click the `Last Run` link at the top to view the process logs, including the OpenTofu output. 

![AWS > VPS > Stack Process Logs](/images/docs/guardrails/guides/using-guardrails/stacks/aws-vpc/aws_vpc_landing_zone_stack_logs.png)

<!--
- how do we **find** an appropriate control  ?
- link to a guide on viewing control process logs (cant find one??)

Screenshot????  sanitize?  what accounts/ workspace, etc do we use for screenshots?
-->


## Step 8: Review


After the stack has run, You can verify that VPCs have been created in the accounts and regions that you specified.  


![AWS > VPS > Stack Review](/images/docs/guardrails/guides/using-guardrails/stacks/aws-vpc/aws_vpc_landing_zone_stack_review.png)


<!--
view it in AWS.....  
- in the UI?   or aws CLI commands?
-->


## Next Steps

## Troubleshooting

| Issue                      | Description                                                                                                                             | Guide                                |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Further Assistance         | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.   | [Open Support Ticket](https://support.turbot.com)   |