---
title: "Enabling Services"
template: Documentation
nav:
  title: "Services"
  order: 30
---

# Enabling AWS Services in Guardrails

In this guide, you will:

- Enable service(s) for an AWS Account. Alternatively, you can use the <a href="https://github.com/turbot/guardrails-samples/tree/main/baselines/aws/aws_service_enabled">aws_services</a> baseline which automates this process.

All supported services have an Enabled policy.

<div className="example">
  <ul>
    <li><code> AWS > EC2 > Enabled </code></li>
    <li><code> AWS > S3 > Enabled </code></li>
    <li><code> AWS > DynamoDB > Enabled </code></li>
  </ul>
</div>

You should enable any services that users are allowed to use. By default, the
value of these policies is set to **Disabled**. When a service is disabled,
users granted permissions to cloud accounts via Guardrails will not be able to
manage the service. Additionally, other policies may reference this policy to
determine their behavior. For example, the default behavior of the
`Approved `control is that any resources are unapproved unless the service is
enabled.

### Examples

```hcl
# AWS > IAM > Enabled
resource "turbot_policy_setting" "aws_iam_enabled" {
  resource    = "id of account or parent folder/policy pack"   //highlight-line
  type        = "tmod:@turbot/aws-iam#/policy/types/iamEnabled"
  value       = "Enabled"
}

# AWS > EC2 > Enabled
resource "turbot_policy_setting" "aws_ec2_enabled" {
  resource    = "id of account or parent folder/policy pack"   //highlight-line
  type        = "tmod:@turbot/aws-ec2#/policy/types/ec2Enabled"
  value       = "Enabled"
}

# AWS > S3 > Enabled
resource "turbot_policy_setting" "aws_s3_enabled" {
  resource    = "id of account or parent folder/policy pack"   //highlight-line
  type        = "tmod:@turbot/aws-s3#/policy/types/s3Enabled"
  value       = "Enabled"
}
```
