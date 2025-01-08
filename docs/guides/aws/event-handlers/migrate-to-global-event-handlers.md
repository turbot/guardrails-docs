---
title: "Migrating to Global Event Handlers"
template: Documentation
nav:
  title: "Migrating to Global Event Handlers"
  order: 30
---

# Migrating to Global Event Handlers in AWS

<div className="alert alert-warning">
This guide outlines the steps to migrate AWS Event Handlers (EH) to AWS Global Event Handlers (GEH) to streamline event handling across AWS regions.
</div>

## Overview

Global Event Handlers (GEH) simplify event management by consolidating event handling into a single primary AWS region while enabling coverage across all regions. This guide provides a step-by-step approach for deploying GEH, decommissioning Event Handlers, and validating the setup.

### Prerequisites

Before proceeding, ensure the following:

- Access to an AWS account with permissions to create IAM roles and policies.

- A primary region designated for GEH (default is us-east-1).

- Active CloudTrail trails for capturing events.

### Regional vs Global Event Handlers

#### Regional Event Handlers (REH)

Each AWS region independently handles events using its own infrastructure. Events are processed regionally and sent directly to the Guardrails event ingestion endpoint.

Resources Deployed Per Region

- **CloudWatch Event Rules**: Filters specific API events.

- **CloudWatch Event Targets**: Routes events to SNS topics.

- **SNS Topics and Subscriptions**: Publish and forward events to Guardrails.

#### Global Event Handlers (GEH)

A designated primary AWS region manages all event processing, while secondary regions forward their events to the primary region for centralized handling. By default, the primary region is set to `us-east-1`, but this can be customized by configuring the policy `AWS > Turbot > Event Handlers [Global] > Primary Region` with the desired region value.

Resources Deployed

- IAM Role for EventBridge Targets created in secondary regions. This will enable seamless event forwarding from all GEH secondary regions to the primary region.

- Primary Region

  - **EventBridge Rules and Targets**: Custom event patterns and sources, targeting an SNS Topic.

  - **SNS Topics and Subscriptions**: Publish and forward events to Guardrails.

- Secondary Regions

  - **EventBridge Rule**: Captures event sources (default and custom) and forwards them to the primary region.

  - **EventBridge Target**: Sends events to the EventBridge bus in the primary region.

Thus, by migrating to Global Event Handlers, organizations can achieve cost optimization, operational efficiency, and a streamlined approach to event management in AWS.

### Key Steps in Migration

1. Deploy the EventBridge IAM Role to support global event handling
2. Configure the IAM Role ARN policy setting for Event Forwarding
3. Deploy Global Event Handlers (GEH)
4. Decommission Regional Event Handlers (EH)
5. Validate the migration

## Deploying the EventBridge IAM Role

To enable seamless data transfer between regional event buses, the EventBridge IAM role is a critical component of the Global Event Handlers (GEH) setup. This role allows secondary regions to forward events to the primary region for centralized processing. GEH will only use the `default` event bus. There is no need to create second event bus exclusively for GEH.

#### Options for Creating the EventBridge IAM Role

1. **Role Creation by Turbot**: Turbot can create the required IAM roles for you. Simply enable the `AWS > Turbot > Service Roles` control, and Turbot will handle the setup seamlessly.

**NOTE**: The Turbot Service Roles control is designed to configure various roles required for multiple dependent controls. If you are using Turbot Service Roles exclusively for Global Event Handlers, you can disable the other Service Roles that are not needed. Below is a list of policies to enable or disable:

| Policy Type                                                           | Policy Setting      |
| --------------------------------------------------------------------- | ------------------- |
| AWS > Turbot > Service Roles > Configuration Recording                | Disabled            |
| AWS > Turbot > Service Roles > Default EC2 Instance                   | Disabled            |
| AWS > Turbot > Service Roles > Default EC2 Instance > SSM Permissions | Disabled            |
| AWS > Turbot > Service Roles > Flow Logging                           | Disabled            |
| AWS > Turbot > Service Roles > SSM Notifications                      | Disabled            |
| AWS > Turbot > Service Roles > Event Handlers [Global]                | Enabled             |
| AWS > Turbot > Service Roles                                          | Enforce: Configured |

2. **Self-Managed Role Creation**: If you prefer to create the role yourself, follow the steps below to define the required **Assume Role Policy** and **IAM Policy**.

Assume Role Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "events.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

IAM Policy

Attach the following IAM policy to grant necessary permissions to the EventBridge role. This can be a separate policy or an inline policy.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["events:PutEvents"],
      "Resource": "arn:${partition}:events:${GLOBAL_EVENTS_PRIMARY_REGION}:${AWS_ACCOUNT_ID}:event-bus/default"
    }
  ]
}
```

Terraform Example for the same.

```terraform
resource "aws_iam_role" "event_handlers_global_role" {
  name = "${var.event_handlers_global_role_name}"
  path = "${var.service_roles_path}"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = { Service = "events.amazonaws.com" },
        Action = "sts:AssumeRole"
      }
    ]
  })
  inline_policy {
    name   = "aws_api_events_policy"
    policy = jsonencode({
      Version = "2012-10-17",
      Statement = [
        {
          Effect   = "Allow",
          Action   = ["events:PutEvents"],
          Resource = "arn:${var.partition}:events:${var.primary_region}:${var.account_id}:event-bus/default"
        }
      ]
    })
  }
}
```

## Configure the IAM Role ARN policy setting for Event Forwarding

If you are using Turbot Service Roles, this step is automatically handled, and no further action is required. However, if you are manually creating the roles, you need to configure the `AWS > Turbot > Event Handlers [Global] > Events > Target > IAM Role ARN` policy. This can be done through the Turbot UI or using the Terraform configuration provided below.

**Terraform Configuration**

The following Terraform resource sets the IAM Role ARN policy for EventBridge in Global Event Handlers:

```terraform
resource "turbot_policy_setting" "aws_event_handlers_global_events_target_iam_role_arn" {
  resource       = "RESOURCE_ID" # or the policy pack that holds the other GEH policies
  type           = "tmod:@turbot/aws#/policy/types/eventHandlersGlobalEventsTargetIamRoleArn"
  template_input = <<EOT
{
  account
  {
    # Look for the name of the EventBridge IAM role.
    event_bridge_role: children(filter:"$.RoleName:${EVENTBRIDGE_IAM_ROLE}"){
      role:items
      {
        akas
      }
    }
  }
}
EOT
  template       = <<EOT
{% if $.account.event_bridge_role.role | length == 1 -%}
{{ $.account.event_bridge_role.role[0].akas[0] }}
{% else -%}
{#  if something weird happens, the GEH control will go into `error` because the ARN isn't well-formed. #}
"missing or too many eventbridge roles"
{% endif -%}
EOT
}
```

## Deploy Global Event Handlers (GEH)

1. In the Guardrails console navigate to the **Policies** and search for `AWS > Turbot > Event Handlers [Global]` policy. Select **New Policy Setting**
2. Choose Resource as `Turbot` and Setting as `Enforce: Configured`
3. Validate the deployment using the Global Event Handler Report link
    https://{workspace}/apollo/reports/controls-by-state?filter=controlTypeId%3A%27tmod%3A%40turbot%2Faws%23%2Fcontrol%2Ftypes%2FeventHandlersGlobal%27
4. Ensure all GEH controls are in the ok state with the message "All required resources exist".

## Decommission Regional Event Handlers (EH)

1. Set the `AWS > Turbot > Event Handlers` policy to `Enforce: Not configured` to trigger cleanup of legacy event handler infrastructure.

- **WARN**: Setting the event handlers to `Skip` at this point will leave event handler infrastructure deployed concurrent to global event handlers; effectively doubling the events sent back to Guardrails for processing.

2. Validate the cleanup using the Event Handler Report link
    https://{workspace}/apollo/reports/controls-by-state?filter=controlTypeId%3A%27tmod%3A%40turbot%2Faws%23%2Fcontrol%2Ftypes%2FeventHandlers%27
3. Ensure all `AWS > Turbot > Event Handlers` controls are in the ok state with the message ""Empty configuration - no action needed".
4. Delete the Event Handler policy settings to complete decommissioning. This will change the Event Handler controls to `Skipped`.

## Validate the migration

1. Event Handler Cleanup: Confirm that legacy EH resources are removed from the Guardrails CMDB.
2. Primary Region Testing: Create a resource in the primary region and verify its detection in the Guardrails console.
3. Secondary Region Testing: Create a resource in a secondary region and verify its detection.

### Troubleshooting

- Residual EH Resources in CMDB:

  - [Rerun CMDB controls](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/run_controls_batches) using this filter `controlTypeId:'tmod:@turbot/aws-sns#/control/types/topicCmdb','tmod:@turbot/aws-events#/control/types/ruleCmdb'`

- Missed Events from Regions:

  - Verify CloudTrail is active and correctly configured.
  - Check permissions for the EventBridge IAM role.
  - Confirm SNS encryption policies allow proper event handling.
