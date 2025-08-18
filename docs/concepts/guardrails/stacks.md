---
title: Stack [Native] Guardrails
sidebar_label: Stack [Native]
---

# Stack [Native] Guardrails

## Overview

Guardrails **Stack [Native]** controls provide a mechanism for managing resource configuration using [OpenTofu](https://opentofu.org), an open-source implementation of Terraform.  You can define your configuration using standard Terraform HCL, and Guardrails will apply your configuration at regular intervals or when resources are modified, enforcing your standards and preventing configuration drift.


## Stack Controls

Guardrails provides many `Stack [Native]` controls in multiple mods.  These stacks all behave the same way and have the same policy structure, but they serve different purposes:
- Account/Project/Subscription stacks allow you to manage resources that are global to the account.
- Regional stacks allow you to manage regionally scoped resources.
- Service stacks let you organize and separate your stack configurations by the types of resources that they manage.  The service stacks target the region or resource group for regional services and the "global" region for global services like IAM.
- Resource stacks target individual resources, allowing you to configure standard resources that should be associated with them.  Resource stacks will run for every resource of that type, and will run whenever new resources of that type are discovered.


| **Stack**                                                     | **Target**         | **Intended Purpose**                                                                                           |
|---------------------------------------------------------------|--------------------|-----------------------------------------------------------------------------------------------------------------|
| **AWS > Account > Stack [Native]**                            | Account            | Account-level settings and global services like Route53 and CloudFront.                                        |
| **AWS > Region > Stack [Native]**                             | Region             | Regional resources, like Lambda Functions, EC2 instances, SNS Topics, etc.                                     |
| **AWS > IAM > Stack [Native]**                                | Account            | IAM resources, like standard users, roles, policies, and identity providers.                                   |
| **AWS > VPC > Stack [Native]**                                | Region             | VPC resources to set your standard "landing zone" VPCs - subnets, security groups, gateways, etc.             |
| **AWS > S3 > Bucket > Stack [Native]**                        | Bucket             | Resources to associate with buckets such as lifecycle policies or replication configuration                    |
| **AWS > VPC > VPC > Stack [Native]**                          | VPC                | Standard VPC resources that belong in *every* VPC, like security groups, gateways, NACLs, etc.                |
| **AWS > CloudFront > Distribution > Stack [Native]**          | Distribution       | Resources to associate with CloudFront distributions such as logging, monitoring, or WAF configuration        |
| **AWS > Secrets Manager > Secret > Stack [Native]**           | Secret             | Resources related to secrets such as key rotation, access policies, and tagging                               |
| **Azure > Subscription > Stack [Native]**                     | Subscription       | Subscription-level settings and global services                                                                |
| **Azure > Network > Virtual Network > Stack [Native]**        | Virtual Network    | Standard network resources that belong in *every* Virtual Network                                              |
| **Azure > Resource Group > Stack [Native]**                   | Resource Group     | Resources like diagnostic settings, policies, and tags applied at the resource group level                    |
| **Azure > Key Vault > Vault > Stack [Native]**                | Vault              | Resources to associate with Key Vaults such as access policies, logging, and diagnostic settings              |
| **Azure > Storage > Storage Account > Stack [Native]**        | Storage Account    | Resources to associate with storage accounts such as encryption, access configuration, and diagnostic settings |
| **GCP > Project > Stack [Native]**                            | Project            | Project-level settings and global services                                                                     |


## Example: Standard IAM policy

Many organizations create standard IAM resources in their accounts, such as:
- Standard IAM policies required for your organization
- Roles, users, and policies for 3rd party applications such as monitoring or security tools
- Identity providers, roles, users, and groups for federated authentication via SAML or OpenID Connect

You can use the `AWS > IAM > Stack [Native]` control to simplify the creation and management of these resources across all of your AWS Accounts.  Simply define the configuration for your IAM resources using OpenTofu. Guardrails can run the stack in all your accounts to create and manage these IAM resources.  As your requirements change, simply modify the `Stack [Native] > Source` policy, and Guardrails will deploy the changes.  If you add new AWS Accounts, Guardrails automatically runs your stack, making it consistent and compliant with your standards.


In this example, we will deploy a standard IAM policy via the `AWS > IAM > Stack [Native]` control.  This control targets the `AWS > Account`; It will run once for each account in scope.  You can create these policy settings on an individual account, but more commonly, you will set them on a parent folder.


### Step 1: Set the Source policy

Create a policy setting for the `AWS > IAM > Stack [Native] > Source` policy on an account or folder.  Enter the OpenTofu configuration in the `AWS > IAM > Stack [Native] > Source` policy.  For example:

```hcl
resource "aws_iam_policy" "main" {
  # Boundary policy name that will be applied to the IAM role.
  name        = "myBoundaryPolicy"
  path        = "/"
  description = "Guardrails Managed Boundary policy to prevent actions from unapproved CIDRs"
  policy      = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "*"
        "Resource": "*",
        "Condition": {
          "IpAddress": {
            "aws:SourceIp": [
              "10.0.0.0/8",
              "172.16.0.0/12",
              "192.168.0.0/16"
            ]
            }
        }
      }
    ]
 })
}
```

### Step 2: Enforce the stack

Create a policy setting for the `AWS > IAM > Stack [Native]` policy on an account or folder.  Set the policy value to `Enforce: Configured`.  Guardrails will apply the OpenTofu source, creating the custom role and policy and then assigning the policy to the role!



## Stack Policies

Stack behavior is controlled by the `Stack [Native]` policy and sub-policies.

| Policy                                | Description
|---------------------------------------|-----------------------------------------------------------------------
| **Stack [Native]** | Determine whether to run the stack in check mode, enforce mode, or skip
| **Stack [Native] > Source** | The OpenTofu HCL configuration source code that should be applied
| **Stack [Native] > Modifier** | Additional OpenTofu HCL configuration source code that should be applied, typically used for per-instance customization such as [importing resources](https://opentofu.org/docs/language/import/)
| **Stack [Native] > Variables** | `.tfvar`-style variable overrides
| **Stack [Native] > Secret Variables** | `.tfvar`-style variable overrides for sensitive variables

The `Stack [Native]` primary policy determines what action the control will take:

| Value                   | Description
| ----------------------- | -----------------------------------------------------------------------------------
| **Skip** | The control will not run
| **Check: Configured** | An OpenTofu plan will be generated.  If the planned configuration does not match the current configuration, the control will alarm.
| **Enforce: Configured** | An OpenTofu plan will be generated.  If the planned configuration does not match the current configuration, the control will apply the configuration.

The `Source` policy contains the OpenTofu configuration code that should be applied.

Note that the stack expects to continuously manage any resources that were created in the stack - if you delete a resource from the OpenTofu configuration in the `Source` policy, the stack control will destroy the resource.  For example, if you wish to destroy all the objects created by the stack, set the `Source` policy to `{}`, and leave the `Stack` policy set to `Enforce: Configured`.

Like the The `Source` policy, the `Modifier` policy may also contain OpenTofu HCL code.  While it may contain any HCL code, its purpose is to allow you to separate instance-specific configuration code, such as [resource import blocks](https://opentofu.org/docs/language/import/), from your standard source definition.


The `Variables` policy can contain variable definitions in OpenTofu HCL, in the same way that they would use a [.tfvars file](https://opentofu.org/docs/language/values/variables/#variable-definitions-tfvars-files).

Like `Variables`, the `Secret Variables` policy can contain variable definitions.  This policy will be marked `secret` in Guardrails, and is meant for parameters that are sensitive or confidential.

The `Variables` and `Secret Variables` policies are merged into a single set of variables that are passed as a `tfvars` file to OpenTofu by the stack control.

The `Variables` and `Secret Variables` are not required, however separating the variables from the configuration will simplify using stacks in Guardrails:

- As a best practice, you should avoid using a calculated policy in the `Source`.  If you need to get context dynamically from the CMDB, you should instead use calculated policies to set the `Variables` or `Secret Variables` policy.
  - This makes the source easily testable outside of Guardrails, as it is not a calculated policy
  - Rendering the input variables in nunjucks is much simpler than rendering the whole OpenTofu source
  - This allows you to separate your OpenTofu HCL logic in the `Source` policy from the nunjucks logic in the `Variables` policies

- Using map or object variables allows you to create a map policy in the `Variables` with configuration information that can be used in all child resource stacks.  If a new item is added, the variables can be updated without updating the OpenTofu configuration.



## Drift Detection

Native stacks offer 2 mechanisms for drift detection and correction:
- Run the stack at regular intervals
- Run the stack when the resources it manages are modified

Native stacks can create any OpenTofu resources, and do not require that the resource that create must exist in the CMDB.  This makes them more flexible and extensible than the old model, however it does have implications for trigger updates; if the resources are not in the CMDB, then the stack can't be triggered when they are modified and drift will occur.  To mitigate this, we will offer an ability to run the stack at regular intervals.

You may also choose to trigger the stack to run when resources change, but:
- It will only work for supported resources (Guardrails has very good coverage though)
- The resource types must be available in the installation.  This means you must install the mods that contain the resources in your stacks, and you must enable CMDB for those resources.


### Drift Detection Policies
Drift detection behavior is controlled by the following sub-policies.

| Policy                                | Description
|---------------------------------------|-----------------------------------------------------------------------
| **Stack [Native] > Drift Detection** | Specify the mechanism for drift detection.
| **Stack [Native] > Drift Detection > Interval** | Specify the interval at which to run the stack, in minutes.


The `Stack [Native] > Drift Detection` policy allows you to specify the mechanism for drift detection.  You may run the stack at regular intervals to keep the resources up to date, and/or automatically trigger the stack to run whenever a resource that it created is modified.  Note that resource triggering will only be available for resources that exist in the Guardrails CMDB; you may install the supporting mods and enable the CMDB for those resources.


The `Stack [Native] > Drift Detection > Interval ` allows you to specify the interval at which to run the stack, in minutes.  The default is `1440` (Once a day).


## OpenTofu Version

The `Stack [Native] > Version` policy allows you to select which OpenTofu version Turbot should use for the stack.

The policy supports semver semantics, allowing you to use new versions automatically, or to pin to specific versions, depending on your preference.

By default this policy uses the global default value set in the `Turbot > Stack > Native Stack Version [Default]` policy.  The shared default allows you to change only a single setting to change your default version, but still migrate versions over time on a per-stack basis.

Guardrails native stack containers include standard cloud [providers](https://opentofu.org/docs/language/providers/).  These providers are bundled in the container image, so in practice, the provider versions are tied to the OpenTofu version.  The following versions are currently supported:

### Supported Versions
| OpenTofu  | AWS Provider | AzureRM Provider | Google Provider | AzureAD Provider
|-----------|--------------|------------------|-----------------|-----------------
| **1.8.3** | 5.72.0       | 4.9.0            | 6.10.0          | 3.0.2



## Best practices
- Avoid using calculated policies for the `Stack > Source`.  Instead, calculate the `Variables` and/or `Secret Variables` and use Terraform functions and control structures for conditional logic, iteration, etc.   This makes the stack easier to maintain and test.
- Use `Secret Variables` for inputs that are secrets, like passwords or keys.
- Use `Variables` for non-sensitive information.  Using `Secret Variables` for non-sensitive inputs creates unnecessary operational complexity, as you will not be able to read the existing values.


## Primary Regions

Stack controls that target the account run in a single "primary" region. For AWS account-level stacks (`AWS > Account > Stack [Native]` and `AWS > IAM > Stack [Native]`), this  region varies depending on the partition:

| Partition Name | Partition Id | Region
|----------------|--------------|---------------
| Commercial     | `aws`        | `us-east-1`
| GovCloud       | `aws-gov`    | `us-gov-west-1`
| China          | `aws-cn`     | `cn-north-1`

The `GCP > Project > Stack [Native]` stack runs in `us-east1`.


## Stack [Native] Controls vs Legacy Stacks & Configured Controls

`Stack [Native]` controls will replace the older [Stack and Configured controls](/guardrails/docs/concepts/guardrails/configured).  Native stacks provide the following benefits over the previous stacks:

- Native stacks use open source [OpenTofu](https://opentofu.org/).  When we initially implemented the older stack controls, Terraform was open source.  Hashicorp has subsequently [moved to a closed licensing model](https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license) which prohibits us from using newer versions.  OpenTofu is open-source, community-driven, and managed by the Linux Foundation!
- The previous stack controls only supported specific resources, and mods for all resource types in the stack definitions needed to be installed in Guardrails.  Native stacks do not have this requirement (though resource level drift detection is only available for resources in the CMDB).
- Previous stack controls were not 100% compatible with Terraform; some meta-arguments like `count` and `for_each` were not supported.   Native stacks are fully compatible with OpenTofu - if you can run it on your machine, you can run it in Guardrails.

### Feature Comparison Chart

| Feature                 | Stack/Configured          | Stack [Native]
|-------------------------|---------------------------|----------------------------
| **Version**             | Terraform 0.15 and earlier | OpenTofu 1.8.3 and later
| **Triggering**          | Resource update           | Resource update, interval
| **CMDB Required?**      | Yes                       | No
| **Resources Supported** | Only resources supported in Guardrails | Any resource supported by the [provider](https://opentofu.org/docs/language/providers/)
| **Support for `count`, `for_each` **| No             | Yes

