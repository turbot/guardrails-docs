---
title: "Configuring Real-Time events"
template: Documentation
nav:
  title: "Event Handlers"
  order: 20
---

# Configuring Real-Time events

In this guide, you will:

- Set up AWS Event Handlers.
- Monitor the setup process and troubleshoot any errors.

The Guardrails **Event Handlers** are responsible for conveying events from AWS
CloudTrail back to Guardrails for processing. This is a requirement for Guardrails to
process and respond in real-time. However, if your organization has more complex
requirements that forbid the use of the Event driven model,
[**Event Pollers**](guides/aws/event-handlers/poller) can be used. Event Handlers and Event
Pollers enable Guardrails' **Event-driven model** of operation.

Guardrails uses the following infrastructure for event handling:

- **CloudTrail** must be enabled in every region where events are to be sent
  from. This can be done with regional, global or Organization trails. An
  additional Cloudtrail just for Guardrails' use is unnecessary cost.
- **EventBridge** is enabled by default and requires no configuration. Guardrails
  uses the 'default' bus.
- **CloudWatch Event Rules** determine which API events to filter for.
- **CloudWatch Event Targets** Direct the events from EventBridge to SNS.
- **SNS Topic** Where the events are published.
- **SNS Subscription** Forwards events to the event ingestion API endpoint where Guardrails will
  process them.

## Guardrails Mods Required for Event Handling

In order to configure real time eventing, the following set of mods must be
installed and up to date in the environment:

### Required for AWS Account Import

- aws
- aws-iam
- aws-kms

### Required for Guardrails configuration of CloudTrail

These mods are required only if using Guardrails to configure CloudTrail.

- aws-cloudtrail
- aws-s3

### Required for Event Handler configuration

- aws-events
- aws-sns

## Configuring CloudTrail

> [!WARNING]
> You are not required to use the Guardrails Audit Trail to configure CloudTrail, but there must be a CloudTrail configured in each region or a global trail.

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

### Set up CloudTrail with the default configuration:

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

## Configuring Event Handlers

### Workspace Configuration

Here are the **Turbot > Workspace** policies relevant to event handling for SaaS
and Enterprise customers. If desired, these policies should be configured before
enabling event handling.

- [Turbot > Workspace > Webhook Secrets > Rotation](/guardrails/docs/mods/turbot/turbot/policy#turbot--workspace--webhook-secrets--rotation) -
  Instructs Turbot to regularly rotate the secrets used to sign the JWTs.
- [Turbot > Workspace > Webhook Secrets > Expiration Period](/guardrails/docs/mods/turbot/turbot/policy#turbot--workspace--webhook-secrets--expiration-period) -
  Specifies the interval for secret rotation. Turbot recommends secret rotation
  at least once a year.
- [Turbot > Workspace > Webhook Secrets](/guardrails/docs/mods/turbot/turbot/policy#turbot--workspace--webhook-secrets) -
  Use this policy only when there is a requirement for specific secrets to be
  used. Otherwise, the default setting will auto-generate new secrets as
  required.
- [AWS > Account > Regions](/guardrails/docs/mods/aws/aws/policy#aws--account--regions) -
  Specifies the list of regions that Turbot will monitor. By default, Turbot
  monitors all regions that do not require an opt-in. If there are regional
  restrictions through SCPs, then the regions list should not exceed those
  permitted by the SCP.

#### Enterprise Specific Policies

- [Turbot > Workspace > Gateway Domain Name](/guardrails/docs/mods/turbot/turbot/policy#turbot--workspace--gateway-domain-name)
  Used by enterprise customers with private Turbot consoles.
  [Instructions below](#enterprise-api-gw-configuration)

### Enterprise API GW Configuration

For enterprises with a private Turbot console, an API gateway must be used. The
hostname of the API Gateway must be specified in the
[Turbot > Workspace > Gateway Domain Name](/guardrails/docs/mods/turbot/turbot/policy#turbot--workspace--gateway-domain-name)
policy. Typically, the domain name will be `gateway.{installation_domain_name}`.
(The installation domain name is taken from the value specified in the Turbot
Enterprise Foundation (TEF) stack.)

However, some enterprise environments cannot use
`gateway.{installation_domain_name}`, usually because of DNS resolution
complexity or enterprise policy. A viable option is to use the AWS API Gateway
domain name instead, since it is always publicly resolvable. Follow these steps
to retrieve the appropriate hostname then set it in Turbot:

1. In the Turbot Master's account, go to the AWS API Gateway console. Find the
   Turbot API Gateway.
2. Go to APIs. Click into `turbot-api` or `{resource_prefix}-api`. Click into
   Stages then click the `turbot` stage.
3. From the top of the `turbot` stage page, grab the "Invoke URL". It will be in
   the form of `https://{uniqueId}.execute-api.{region}.amazonaws.com/turbot`.
   The `/turbot` path is required. Do not add a `/` after `/turbot`. Strip off
   `https://`
4. Copy the stage URL to the Gateway Domain Name policy. It should be in this
   form: `{uniqueId}.execute-api.{region}.amazonaws.com/turbot`
5. If Event Handling has been enabled, let the event handler source policies
   recalculate then Event Handler control run again. Otherwise, complete the
   steps outlined in the rest of this document then return to this procedure.
6. Examine the SNS Subscription in the Event Handler control logs to make sure
   it confirmed properly.

### Enabling Event Handlers

To set up AWS Event Handlers in the default configuration, in the Turbot
console, set the **AWS > Turbot > Event Handler** policy to **Enforce:
Configured**. The below Terraform can also be used.

```hcl
# AWS > Turbot > Event Handlers
resource "turbot_policy_setting" "eventHandlers" {
  resource = "id of parent folder or policy pack"   //highlight-line
  type     = "tmod:@turbot/aws#/policy/types/eventHandlers"
  value    = "Enforce: Configured"
}
```

The default configuration will set up event handlers in all enabled regions.
Users can use the **AWS > Turbot Event Handlers > \*** sub-policies to customize
the configuration to meet requirements.

Verify that the **AWS > Turbot > Event Handlers** controls are in `ok` for each
region. Deployment often takes a minute or two per region. If not in `ok` then
use the information in [How Event Handlers Work](#how-event-handlers-work) to
get a sense of what may have gone wrong in the deployment.

## Decomissioning Event Handlers

Event handlers can be shut-off by setting the
[AWS > Turbot > Event Handler](/guardrails/docs/mods/aws/aws/policy#aws--turbot--event-handlers)
policy to **Enforce: Not configured**. Turbot will perform the required
Terraform runs to destroy the event handler infrastructure. **Note:** Deleting
an AWS account out of Turbot will not automatically decommission the event
handlers. Event Handlers must be set explicitly destroyed before removing the
account from Turbot.

## When to decommission Event Handlers

Event Handlers should be decommissioned before:

- Destroying the AWS account itself
- Removing the account from Turbot supervision.
- Switching to AWS Event Pollers. Processing of duplicate events is highly
  undesirable.
- Event Handling is no longer desired for this account or region.

## Relationship to AWS Event Pollers

Note that
[AWS Event Pollers](/guardrails/docs/mods/aws/aws/policy#aws--turbot--event-poller)
operate based on the value of
[AWS > Turbot > Event Handler](/guardrails/docs/mods/aws/aws/policy#aws--turbot--event-handlers)
policy setting, not on the state of the Event Handler controls themselves. By
default, Event Handling is disabled so the event pollers run automatically.
After Event Handling is enabled, the event pollers will stop running.

### Event Handlers in Error

It is possible for the event handler controls to be in an **error** state
because of incorrect configuration, permissions issues, etc. With event handling
enabled, the event pollers won't run. Until these problems are resolved, events
from the environment may be lost. Resolve problems with event handlers as
quickly as possible.

### Duplicate Events

It is also possible to get duplicate events if Event Pollers are explicitly
enabled along with Event Handlers. **Event Handlers and Event Pollers should
never be enabled at the same time.**

### Event Handlers Bulk Changes

Occasionally, event handler configuration needs a bulk change. This can come
from a number of sources:

- Initial rollout of event handlers.
- Workspace configuration change.
- Installation, update or removal of a new AWS mod.
- Changes to EC2 or VPC CMDB policies. Other mods may have specific event
  handling based on CMDB policies but not always.
- Websecret Key Rotation

Turbot will make these changes as fast as possible. Each update to the event
handlers requires at least one Terraform run, sometimes more. For changes in
larger environments, it's possible that a particular event handler control
cannot get a Terraform container before the timeout. When this happens, the
event handler control will go into an `error` state. Turbot will retry these
errors over time.

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

### Verify

Congrats! Event handlers are now configured in the target account. To verify
that they are working correctly, create a new resource or change an existing
resource. Turbot will receive the event which will trigger relevant controls. If
resource creation or modification events do not get picked up by Turbot, feel
free to reach out to [help@turbot.com](mailto:help@turbot.com)

## How Event Handlers Work

When troubleshooting events handlers, it helps to know how they work. This
section will describe the Turbot and AWS halves of event handlers.

### Turbot Policies and Stacks

Turbot uses Terraform to deploy the various pieces of AWS event handling
infrastructure. The Terraform source that defines all event handling
infrastructure is compiled from several sources. They are:

- **Workspace configuration policies**: These policies specify information like
  the HTTPS endpoint that event handlers should point to, or the webhook secrets
  that should be sent with each event.
- **Regions**: AWS event handlers are deployed on a per-region basis. If some
  regions are locked out by SCP, or are just out of scope, these regions should
  be excluded from the
  [AWS > Account > Regions](/guardrails/docs/mods/aws/aws/policy#aws--account--approved-regions-default)
  policy. (Note, **AWS > Account > Regions** is a different policy than **AWS >
  Account > Approved Regions [Default]**. The **Regions** policy defines the
  scope of where Turbot will look for resources. The **Approved Regions** policy
  states where resources are allowed to exist.)
- **Event Handler configuration policies**: Enable event handlers. Specify
  resource prefixes for SNS topics, and Event Rules. Specify SNS encryption at
  rest. See **AWS > Turbot > Event Handlers > \*** for more configuration
  options.
- **Installed mods**: Turbot will interrogate the list of mods then build a set
  of event rules to capture the relevant events. See the Mods tab on the Admin
  page for a full list of installed mods.
- **Resource CMDB policies**: In the case of EC2 and VPC, disabling certain CMDB
  policies will remove the relevant events from the CloudWatch event rules.

All of these input sources are brought together in the read-only
`AWS > Turbot > Event Handlers > Source` policy value. Looking at the "Depends
On" tab of the `Event Handlers > Source` policy shows all the dependent policies
and values. Errors in any of these policies may prevent event handlers from
deploying or updating properly. The value of
`AWS > Turbot > Event Handlers > Sources` is Terraform.

### AWS Resources (CloudTrail through to Turbot Events Container)

Events in an AWS region pass through several services on their way to Turbot.
The path is:

1. **CloudTrail**: If CloudTrail isn't setup for a region, event handling cannot
   happen. CloudTrail is the source of events to be sent to Turbot.
2. **CloudWatch Event Rules**: Event Rules filter the raw CloudTrail events down
   to those that Turbot needs. (For example, if the `aws-cloudfront` mod is not
   installed, there's no need to get `cloudfront:*` events. Some events such as
   `s3:PutObject` can be extremely high volume but worthless to Turbot.)
3. **SNS Topic**: After filtering by CloudWatch Event Rules, events are placed
   on the `turbot_event_handler` SNS topic to send back to Turbot.
4. **SNS Subscription**: An HTTPS subscription sends events back to the Turbot.
5. **(optional) API Gateway and Events Proxy**: Some enterprise customers with
   private ALBs will deploy an API Gateway to make the transition from a public
   API endpoint to a private ALB. The Events Proxy Lambda function passes an
   event from the non-VPC API gateway to the VPC bound ALB. Turbot SaaS
   customers do not have this step.
6. **Turbot ALB**: The common entry point for events and API calls.
7. **Turbot Events Container**: Events are processed here, triggering CMDB
   updates, or control runs.
