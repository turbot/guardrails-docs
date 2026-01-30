---
title: Setup With Custom IAM Role
sidebar_label: Setup With Custom IAM Role
---

# Setting Up With Custom IAM Role

In this guide, you will:

- Setup Global Event Handlers in the Guardrails workspace using the Guardrails UI.
- Create the EventBridge IAM role manually.
- Monitor and troubleshoot the GEH update process.

The Guardrails [Event Handler](/guardrails/docs/reference/glossary#event-handler) are responsible for conveying events from AWS CloudTrail back to Guardrails for processing. This is a requirement for Guardrails to process and respond in real-time. However, if your organization has more complex requirements that forbid the use of the Event driven model, Event Pollers can be used. Event Handlers and Event Pollers enable Guardrails' Event-driven model of operation.

Global Event Handlers (GEH) simplify event management by consolidating event handling into a single primary AWS region while enabling coverage across all regions. By migrating to Global Event Handlers, organizations can achieve cost optimization, operational efficiency, and a streamlined approach to event management in AWS.

## Prerequisites

Before proceeding, ensure the following:

- Access to an AWS account with permissions to create IAM roles and policies.
- A primary region designated for GEH (default is us-east-1).
- Active CloudTrail trails for capturing events.

## Step 1: Create EventBridge IAM Role

The EventBridge IAM role allows events to be forwarded from secondary regions to the primary region.

### 1.1 Create IAM Permissions Policy

First, create a policy that grants permission to forward events to the default event bus in the primary region.

1. Go to **IAM > Policies > Create policy** in the AWS Management Console.
2. Select the **JSON** tab and paste the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["events:PutEvents"],
      "Resource": "arn:<PARTITION>:events:<PRIMARY_REGION>:<ACCOUNT_ID>:event-bus/default"
    }
  ]
}
```

Replace the placeholder values:
- `<PARTITION>` - Use `aws`, or `aws-gov` for GovCloud, or `aws-cn` for China regions
- `<PRIMARY_REGION>` - Your GEH primary region (default is `us-east-1`)
- `<ACCOUNT_ID>` - The 12-digit AWS account ID where you are creating this role

3. Click **Next**.
4. Name the policy (e.g., `turbot_guardrails_geh_eventbridge_policy`).
5. Click **Create policy**.

### 1.2 Create IAM Role with Custom Trust Policy

1. Go to **IAM > Roles > Create role**.
2. Select **Custom trust policy** as the trusted entity type.
3. Replace the default JSON with the following trust policy:

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

4. Click **Next**.
5. Search for and select the policy you created in step 1.1 (e.g., `turbot_guardrails_geh_eventbridge_policy`).
6. Click **Next**.
7. Name the role (e.g., `turbot_guardrails_geh_eventbridge_role`).
8. Click **Create role**.

### 1.3 Terraform Example

```hcl
resource "aws_iam_role" "event_handlers_global_role" {
  name = var.event_handlers_global_role_name
  path = var.service_roles_path
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = { Service = "events.amazonaws.com" },
        Action    = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy" "turbot_guardrails_geh_eventbridge_policy" {
  name = var.event_handlers_global_policy_name

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

resource "aws_iam_role_policy_attachment" "turbot_guardrails_role_policy_attachment" {
  role       = aws_iam_role.event_handlers_global_role.name
  policy_arn = aws_iam_policy.turbot_guardrails_geh_eventbridge_policy.arn
}
```

## Step 2: Configure Guardrails to Use EventBridge Role

You need to set the IAM Role ARN for cross-region forwarding in Guardrails. This can be done via the Turbot UI or Terraform.

### Option 1: Configure in Guardrails

1. Navigate to the AWS Account (or applicable folder in the hierarchy) in Turbot Guardrails Console.
2. Click on the **Policies** tab and select **New Policy Setting**.
3. In the Policy Type dropdown, search for and select `AWS > Turbot > Event Handlers [Global] > Events > Target > IAM Role ARN`.
4. Click the **Enable calculated mode** link.
5. Click **+ Add** in the Input query field.
6. Paste the following into the Input field under Step 2. The account ID for the current AWS account should appear in the Output field to the right.

   ```graphql
   {
     account {
       Id
     }
   }
   ```

7. Paste the following into the Template field in Step 3:

   ```nunjucks
   {%- if $.account.Id -%}
   "arn:<PARTITION>:iam::{{ $.account.Id }}:role/<ROLE_NAME>"
   {%- endif -%}
   ```

   Replace the placeholder values:
   - `<PARTITION>` - Your AWS partition (`aws`, `aws-gov`, or `aws-cn`)
   - `<ROLE_NAME>` - The name of the role you created in step 1.2 (e.g., `turbot_guardrails_geh_eventbridge_role`)

8. The calculated IAM Role ARN should appear in the Result field in Step 4.
9. Click **Create**.

### Option 2: Configure Using Terraform

Use the following Terraform configuration to set the policy programmatically:

```hcl
resource "turbot_policy_setting" "aws_event_handlers_global_events_target_iam_role_arn" {
  resource       = "RESOURCE_ID" # or the policy pack that holds the other GEH policies
  type           = "tmod:@turbot/aws#/policy/types/eventHandlersGlobalEventsTargetIamRoleArn"
  template_input = <<EOT
{
  account
  {
    # Look for the name of the EventBridge IAM role.
    event_bridge_role: children(filter:"$.RoleName:${var.eventbridge_iam_role_name} resourceTypeId:tmod:@turbot/aws-iam#/resource/types/role level:self"){
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

## Step 3: Deploy Global Event Handlers

Once the IAM Role is configured, enable and deploy Global Event Handlers.

1. In the Guardrails console navigate to the **Policies** and search for `AWS > Turbot > Event Handlers [Global]` policy. Select **New Policy Setting**
2. Choose Resource as `Turbot` and Setting as `Enforce: Configured`
3. Validate the deployment using the Global Event Handler Report link
   `https://<WORKSPACE>/apollo/reports/controls-by-state?filter=controlTypeId%3A%27tmod%3A%40turbot%2Faws%23%2Fcontrol%2Ftypes%2FeventHandlersGlobal%27`
4. Ensure all GEH controls are in the ok state with the message "All required resources exist".

## Step 4: Verify Events

The global event handlers are now configured in the target account. To verify they are functioning correctly:

1. **Primary Region Testing**:
   Create a resource in the primary region and verify its detection. Confirm that the associated controls are triggered and executed based on the policies set in the Guardrails console.

2. **Secondary Region Testing**:
   Create a resource in a secondary region and verify its detection. Ensure that the associated controls are triggered and executed according to the policies set in the Guardrails console.

## Troubleshooting

| Issue                      | Description                                                                                                                           | Guide                                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Missed Events from Regions | In case the events are not flowing to Guardrails.                                                                                     | [1] Verify CloudTrail is active and correctly configured. [2] Check permissions for the EventBridge IAM role. [3] Confirm SNS encryption policies allow proper event handling. |
| Further Assistance         | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently. | [Open Support Ticket](https://support.turbot.com)                                                                                                                              |
