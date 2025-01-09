---
title: Stack [Native] Guardrails
sidebar_label: Stack [Native]
---

# Stack [Native] Guardrails 

## Overview

Guardrails **Stack [Native]** controls provide a mechanism for managing resource configuration using OpenTofu, an open source implementation of Terraform.  You can define your configuration using standard Terraform HCL, and Guardrails will apply your configuration at regular intervals or when resources are modified, enforcing your standards and preventing configuration drift.


## Stack Polices

Stack behavior is controlled by the `Stack [Native]` policy and sub-policies.

| Policy                                | Description 
|---------------------------------------|-----------------------------------------------------------------------
| **Stack [Native]**                    | Determine whether to run the stack in check mode, enforce mode, or skip
| **Stack [Native] > Source**           | The OpenTofu HCL configuration source code that should be applied
| **Stack [Native] > Modifier**         | Additional OpenTofu HCL configuration source code that should be applied, typically used for per-instance customization such as [importing resources](https://opentofu.org/docs/language/import/)
| **Stack [Native] > Variables**        | `.tfvar`-style variable overrides
| **Stack [Native] > Secret Variables** | `.tfvar`-style variable overrides for sensitive variables

The `Stack [Native]` primary policy determines what action the control will take:

| Value                   | Description 
| ----------------------- | -----------------------------------------------------------------------------------
| **Skip**                | The control will not run 
| **Check: Configured**   | An OpenTofu plan will be generated. If the planned configuration does not match the current configuration, the control will alarm.
| **Enforce: Configured** | An OpenTofu plan will be generated. If the planned configuration does not match the current configuration, the control will apply the configuration.

The `Source` policy contains the OpenTofu configuration code that should be applied.

Note that the stack expects to continue to manage any resources that were created in the stack - if you delete a resource from the OpenTofu configuration in the `Source` policy, the stack control will destroy the resource. For example, if you wish to destroy all the objects created by the stack, set the `Source` policy to `{}`, and leave the `Stack` policy set to `Enforce: Configured`.

Like the The `Source` policy, the `Modifier` policy may also contain OpenTofu HCL code.  While it may contain any HCL code, its purpose is to allow you to separate instance-specific configuration code, such as [resource import blocks](https://opentofu.org/docs/language/import/), from your standard source definition.


The `Variables` policy can contain variable definitions in OpenTofu HCL, in the same way that they would use a [.tfvars file](https://opentofu.org/docs/language/values/variables/#variable-definitions-tfvars-files).

Like `Variables`, the `Secret Variables` policy can contain variable definitions. This policy will be marked `secret` in Guardrails, and is meant for parameters that are sensitive or confidential.

The `Variables` and `Secret Variables` policies are merged into a single set of variables that are passed as a `tfvars` file to OpenTofu by the stack control.

The `Variables` and `Secret Variables` are not required, however separating the variables from the configuration will simplify using stacks in Guardrails:

- As a best practice, you should only enter an immediate value in the `Source`. If calculated policies are required to get input data for the stack, the `Variables` or `Secret Variables` should use a calculated policy to get the data and pass it in as OpenTofu variables.

  - This makes the source easily testable outside of Guardrails, as it is not a calculated policy
  - Rendering the input variables in nunjucks is much simpler than rendering the whole OpenTofu source
  - This allows you to separate your OpenTofu logic in the `Source` policy from the OpenTofu HCL logic in the `Variables` policies

- Using map or object variables allows you to create a map policy in the `Variables` with configuration information that can be used in all child resource stacks. If a new item is added, the variables can be updated without updating the OpenTofu configuration.


## Stack Control Taxonomy

Guardrails typically provides custom stack policies at the Account/Project/Subscription for managing global resources.  These target the Account/Project/Subscription.  

| Stack                                    | Target   | Intended Purpose
|------------------------------------------|----------|--------------------------------------------
| `AWS > Account > Stack [Native]`         | Account  | Account-level settings and global services like Route53 and CloudFront.
| `Azure > Subscription > Stack [Native]`  | Subscription | Subscription-level settings and global services
| `GCP > Project > Stack [Native]`         | Project  | Project-level settings and global services



Regional stack allow you to manage regionally scoped resources as well.

| Stack                                    | Target   | Intended Purpose
|------------------------------------------|----------|--------------------------------------------
| `AWS > Region > Stack [Native]`          | Region   | Regional resources, like lambda functions, ec2 instances, sns topics, etc.

Guardrails also provides service-level stacks for some services. This allows you to organize and separate your stack configurations by the types of resources that they manage. The service stacks target the region or resource group for regional services, and the "global" region for global services like IAM.

| Stack                                    | Target   | Intended Purpose
|------------------------------------------|----------|--------------------------------------------
| `AWS > IAM > Stack [Native]`             | Account  | IAM resources, like standard users, roles, policies, and identity providers.
| `AWS > VPC > Stack [Native]`             | Region   | VPC resources to setup your standard "landing zone" VPCs - subnets, security groups, gateways, etc 


There are some resource-level stacks as well.  These target individual resources, allowing you to configure standard resources that should be associated with them.

| Stack                           | Target   | Intended Purpose
|-------------------------------------------|----------|--------------------------------------------
| `AWS > S3 > Bucket > Stack [Native]`       | Bucket  | Resources to associate with buckets such as lifecycle policies or replication configuration
| `AWS > VPC > VPC > Stack [Native]`        | VPC     | Standard VPC resources that belong in *every* VPC, like security groups, gateways, NACLs, etc
| `Azure > Network > Virtual Network > Stack [Native]`| Virtual Network | Standard network resources that belong in *every*  Virtual Network



## Example - standard IAM service roles and users

Many organizations rely on 3rd party software or SaaS products that requires IAM
users or roles to access their accounts. Performance monitoring tools are an
example -- typically, an IAM cross-account role has to be created in all AWS
accounts in the enterprise to allow the tool access.

You can use Guardrails Stacks to simplify the creation and management of these
roles across all of your AWS Accounts. Using a Stack targeting AWS accounts,
simply define the configuration for the IAM role using OpenTofu. Guardrails will
create it in all your AWS accounts. If the vendor adds new features that require
additional access for the role, you can simply modify the `Stack [Native] > Source`
policy, and Guardrails will deploy the changes. If you add new AWS Accounts, Guardrails
automatically runs your stack, making it consistent and compliant with your
standards.

1. Enter the OpenTofu configuration in the `AWS > IAM > Stack [Native] > Source`
   policy. For example:

    ```hcl
    resource "aws_iam_role" "monitoring_role" {
      name = "my_monitoring_role"

      assume_role_policy = <<EOF
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "AWS": "arn:aws:iam::111111111111:root"
          },
          "Action": "sts:AssumeRole",
          "Condition": {
            "StringEquals": {
              "sts:ExternalId": "12345678"
            }
          }
        }
      ]
    }
    EOF
    }

    resource "aws_iam_policy" "monitoring_policy" {
      name = "my_monitoring_policy"

      policy = <<EOF
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": [
            "apigateway:GET",
            "autoscaling:Describe*",
            "budgets:ViewBudget",
            "cloudfront:GetDistributionConfig",
            "cloudfront:ListDistributions",
            "cloudtrail:DescribeTrails",
            "cloudtrail:GetTrailStatus",
            "cloudwatch:Describe*",
            "cloudwatch:Get*",
            "cloudwatch:List*",
            "codedeploy:List*",
            "codedeploy:BatchGet*",
            "directconnect:Describe*",
            "dynamodb:List*",
            "dynamodb:Describe*",
            "ec2:Describe*",
            "ecs:Describe*",
            "ecs:List*",
            "elasticache:Describe*",
            "elasticache:List*",
            "elasticfilesystem:DescribeFileSystems",
            "elasticfilesystem:DescribeTags",
            "elasticloadbalancing:Describe*",
            "elasticmapreduce:List*",
            "elasticmapreduce:Describe*",
            "es:ListTags",
            "es:ListDomainNames",
            "es:DescribeElasticsearchDomains",
            "health:DescribeEvents",
            "health:DescribeEventDetails",
            "health:DescribeAffectedEntities",
            "kinesis:List*",
            "kinesis:Describe*",
            "lambda:AddPermission",
            "lambda:GetPolicy",
            "lambda:List*",
            "lambda:RemovePermission",
            "logs:TestMetricFilter",
            "logs:PutSubscriptionFilter",
            "logs:DeleteSubscriptionFilter",
            "logs:DescribeSubscriptionFilters",
            "rds:Describe*",
            "rds:List*",
            "redshift:DescribeClusters",
            "redshift:DescribeLoggingStatus",
            "route53:List*",
            "s3:GetBucketLogging",
            "s3:GetBucketLocation",
            "s3:GetBucketNotification",
            "s3:GetBucketTagging",
            "s3:ListAllMyBuckets",
            "s3:PutBucketNotification",
            "ses:Get*",
            "sns:List*",
            "sns:Publish",
            "sqs:ListQueues",
            "support:*",
            "tag:GetResources",
            "tag:GetTagKeys",
            "tag:GetTagValues",
            "xray:BatchGetTraces",
            "xray:GetTraceSummaries"
          ],
          "Effect": "Allow",
          "Resource": "*"
        }
      ]
    }
    EOF
    }

    resource "aws_iam_role_policy_attachment" "monitoring_policy_attach" {
      role       = "${aws_iam_role.monitoring_role.name}"
      policy_arn = "${aws_iam_policy.monitoring_policy.arn}"
    }
    ```

2. Set the `AWS > IAM > Stack [Native]` policy to `Enforce: Configured`.  Guardrails will apply the OpenTofu source, creating the custom role and policy, and then assigning the policy to the role.


## Drift Detection

Native stacks offer 2 mechanisms for drift detection and correction:
- Run the stack at regular intervals
- Run the stack when the resources it manages are modified

Native stacks can create any OpenTofu resources, and do not require that the resource that create must exist in the CMDB. This makes them more flexible and extensible than the old model, however it does have implications for trigger updates; if the resources are not in the CMDB, then the stack can't be triggered when they are modified and drift will occur.  To mitigate this, we will offer an ability to run the stack at regular intervals.

You may also choose to trigger the stack to run when resources change, but:
- It will only work for supported resources (Guardrails has very good coverage though)
- The resource types must be available in the installation.  This means you must install the mods that contain the resources in your stacks, and you must enable CMDB for those resources.


Drift detection behavior is controlled by the following sub-policies.

| Policy                                | Description 
|---------------------------------------|-----------------------------------------------------------------------
| **Stack [Native] > Drift Detection**  | Specify the mechanism for drift detection.
| **Stack [Native] > Drift Detection > Interval** | Specify the interval at which to run the stack, in minutes.


The `Stack [Native] > Drift Detection` policy allows you to specify the mechanism for drift detection.  You may run the stack at regular intervals to keep the resources up to date, and/or automatically trigger the stack to run whenever a resource that it created is modified.  Note that resource triggering will only be available for resources that exist in the Guardrails CMDB; you may install the supporting mods and enable the CMDB for those resources. 


The `Stack [Native] > Drift Detection > Interval ` allows you to specify the interval at which to run the stack, in minutes. The default is `1440` (Once a day).


## OpenTofu Version


The `Stack [Native] > Version` policy allows you to select which OpenTofu version Turbot should use for the stack.

The policy supports semver semantics, allowing you to use new versions automatically, or to pin to specific versions, depending on your preference.

By default this policy uses the global default value set in the `Turbot > Stack > Native Stack Version [Default]` policy.

The shared default allows you to change only a single setting to change your default version, but still migrate versions over time on a per-stack basis. 


Guardrails native stacks currently support [OpenTofu version 1.8.3](https://opentofu.org/docs/v1.8/), though more versions will be added in the future.


## Legacy Stacks & Configured Controls

`Stack [Native]` controls replace the older [Stack and Configured controls](/guardrails/docs/concepts/guardrails/configured), which are deprecated and will be removed in a future version of guardrails. 

The new native stacks provide the following benefits over the previous stacks:

- Native stacks use open source [OpenTofu](https://opentofu.org/).  When we initially implemented the older stack controls, Terraform was open source.  Hashicorp has subsequently [moved to a closed licensing model](https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license) which prohibits us from using newer versions.  OpenTofu is open-source, community-driven, and managed by the Linux Foundation!
- The previous stack controls only supported specific resources, and mods for all resource types in the stack definitions needed to be installed in Guardrails.  Native stacks do not have this requirement (though resource level drift detection is only available for resources in the CMDB).
- Previous stack controls were not 100% compatible with Terraform; some meta-arguments like `count` and `for_each` were not supported.   Native stacks are fully compatible with OpenTofu - if you can run it on your machine, you can run it in Guardrails.