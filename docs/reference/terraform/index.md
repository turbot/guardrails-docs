---
title: Terraform
template: Documentation
nav:
  order: 20
---

# Terraform

Terraform is a tool for building, changing, and versioning infrastructure safely
and efficiently. Terraform can manage existing and popular service providers as
well as custom in-house solutions.

<div className="alert alert-info font-weight-bold">
  &raquo; New to Guardrails and Terraform? See our <a href="https://www.terraform.io/docs/providers/turbot/" target="_blank">Turbot Provider documentation</a> &rarr;
</div>

The Turbot Guardrails Terraform provider supports:

- Defining your policy and security posture in code.
- Configuration of policies, resources and the environment.
- Querying the CMDB as data sources to combine with other providers.

For example, to set a policy:

```hcl
resource "turbot_policy_setting" "s3_encryption_at_rest" {
  resource      = "arn:aws:s3:::my-bucket"
  type          = "tmod:@turbot/aws-s3#/policy/types/bucketEncryptionAtRest"
  value         = "Enforce: AWS SSE or higher"
}
```

- Installation and Configuration: [Turbot Guardrails Provider Configuration](reference/terraform/setup)
- Source: [Terraform Provider source on Github](https://github.com/turbot/terraform-provider-turbot)
- License: [Mozilla Public License Version 2.0](https://github.com/turbot/terraform-provider-turbot/blob/master/LICENSE)

### Turbot Guardrails and Terraform: Lab and Setup

For a quick introduction, check out our
[Getting started with Terraform in 7 minutes](7-minute-labs/terraform) lab. The
example walks through setting up a
[Policy Pack](guides/working-with-folders/policy-packs), creating a
[policy](concepts/policies), then applying and subsequently deleting the
Terraform plan.

If you are already familiar with Terraform and would like to get started with
the wonderful world of Terraform and Turbot Guardrails, refer to our setup documentation:

- [Setting up a Turbot Guardrails Terraform environment](reference/terraform/setup)
