---
title: Global Event Handler
sidebar_label: Global Event Handler
---

# Setup Global Event Handler(GEH)

In this guide, you will:

- Setup Global Event Handlers in the Guardrails workspace using the Guardrails UI.
- Monitor and troubleshoot the GEH update process.

Guardrails is designed to enable organizations to selectively install policies, controls, and guardrails tailored to specific services. The Global [Event Handler](/guardrails/docs/reference/glossary#event-handler) simplifies cloud management by providing a unified framework for responding to and managing events, ensuring proactive governance and security across cloud environments.

## Prerequisites

- **Turbot/Owner** permissions at the Turbot resource level.
- Familiarity with Guardrails console.
- EventBridge IAM role required in GEH secondary regions, which helps to pass events to the primary region.

## Configuring CloudTrail

<div className="alert alert-warning"> <strong>You are not required to use the Guardrails Audit Trail</strong> to configure CloudTrail, but <strong>there must be a CloudTrail configured in each region or a global trail.</strong>
</div>

The [Guardrails Audit Trail](/guardrails/docs/mods/aws/aws/policy#aws--turbot--audit-trail)
policy provides a convenient mechanism for setting up CloudTrail in AWS
accounts.

### Creating logging buckets using the default configuration

CloudTrail requires an S3 bucket to store logs. The Guardrails Logging Bucket policy
can simplify creation of logging buckets.

To set up logging buckets in the default configuration, simply set the
[AWS > Turbot > Logging > Bucket](/guardrails/docs/mods/aws/aws/policy#aws--region--logging-bucket-default)
policy to **Enforce: Configured**.

```hcl
# Create AWS logging buckets
# AWS > Turbot > Logging > Bucket
resource "turbot_policy_setting" "loggingBucket" {
  resource    = "id of parent folder or policy pack"   //highlight-line
  type        = "tmod:@turbot/aws#/policy/types/loggingBucket"
  value       = "Enforce: Configured"
}
```

The default configuration will create a logging bucket in each region of your
AWS account. If desired, you can modify the behavior of this stack to match your
logging strategy through the **AWS > Turbot > Logging > Bucket > \***
sub-policies.

Verify the state of **AWS > Turbot > Logging > Bucket** control for each region.
They will be in the **OK** state when completed.

**Note**: If using `AWS > Turbot > Logging > Bucket` in preparation for
`AWS > Turbot > Audit Trail`, be aware that logging buckets will be deployed in
all regions specified in the
[AWS > Account > Approved Regions \[Default\]](/guardrails/docs/mods/aws/aws/policy#aws--account--approved-regions-default)
policy. The Turbot Audit Trail will only be deployed in a single region. Use
[AWS > Turbot > Logging > Bucket > Regions](/guardrails/docs/mods/aws/aws/policy#aws--turbot--logging--bucket--regions)
to specify which regions will get logging buckets.

### Set up CloudTrail with the default configuration

Once the logging buckets have been created, it is time to set up the **Audit
Trail** stack:

```hcl
# AWS > Turbot > Audit Trail
resource "turbot_policy_setting" "auditTrail" {
  resource    = "id of parent folder or policy pack"   //highlight-line
  type        = "tmod:@turbot/aws#/policy/types/auditTrail"
  value       = "Enforce: Configured"
}
```

The default configuration will create a global trail in **us-east-1**, though
users can use the **AWS > Turbot > Audit Trail > \*** sub-policies to customize
the CloudTrail configuration to meet requirements.

Verify the state of **AWS > Turbot > Audit Trail** control for each region. They
will be in the **OK** state when completed.

## Step 1: Login Guardrail Console

Log into the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/hosting-guardrails/updating-stacks/update-mod/guardrails-console-login.png)

## Step 2: Enable Service Role

IAM role is required for Global Event handler. This can be created manually by customer or can be done by AWS Turbot Service Role

![Enable Service Role](/images/docs/guides/configuring-guardrails/global-event-handler/1-geh-aws-turbot-service-roles.png)

Check if all the related controls are in `OK` state

![Service Role Control](/images/docs/guides/configuring-guardrails/global-event-handler/2-geh-check-control-status.png)

If you wish to create the IAM Roles manually, please make sure the Role contains the policies shown in below Terraform sample.

```
resource "aws_iam_role" "event-handlers-global-role" {
  name = "turbot_aws_api_events_global"
  path = "/turbot/"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "events.amazonaws.com"
        }
      },
    ]
  })
  inline_policy {
    name = "aws_api_events_policy"
    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = ["events:PutEvents"]
          Effect   = "Allow"
          Resource = "arn:${PARTITION}:events:${GLOBAL_EVENTS_PRIMARY_REGION}:${AWS_ACCOUNT_ID}:event-bus/default"
        },
      ]
    })
  }
}
```

## Step 3: Enable Global Event Handler

![Enable GEH](/images/docs/guides/configuring-guardrails/global-event-handler/3-gen-aws-turbot-event-handler-global-enabled.png)

Validate that the setting is applied successfully

![Validate Setting](/images/docs/guides/configuring-guardrails/global-event-handler/4-validate-post-setting.png)

Check if all the related controls for `AWS > Turbot > Event Handlers [Global]` are in `OK` state

### Verify

Congrats! Global Event handlers are now configured in the target account. To verify that they are working correctly, create a new resource or change an existing resource in both Primary region and Secondary region. Turbot will receive the event which will trigger relevant controls. If resource creation or modification events do not get picked up by Turbot, feel free to reach out to [help@turbot.com](mailto:help@turbot.com)

### Troubleshooting

The best source of troubleshooting information is in the **AWS > Turbot > Event
Handler** control logs.

- Permissions Issues: If the permissions granted to the Turbot IAM role do not
  allow configuration of event rules and SNS topics, then the logs will indicate
  access denied.
- SCP Regional Restrictions: Many enterprises use Service Control Policies to
  restrict region usage. SCPs restrictions will appear as "Access Denied" errors
  in the Turbot console. Work with your SCP admins to determine which regions
  are permitted then update the
  [AWS > Account > Regions](/guardrails/docs/mods/aws/aws/policy#aws--account--approved-regions-default)
  policy to match.
- SNS Subscription won't confirm: Check the various **Turbot > Workspace**
  policies that they are properly configured. Ensure that resources in the
  Turbot Master VPC can resolve the ALB's hostname.
