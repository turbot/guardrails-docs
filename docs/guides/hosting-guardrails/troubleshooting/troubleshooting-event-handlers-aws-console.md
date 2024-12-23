---
title: "AWS Event Handlers in the AWS Console"
sidebar_label: "AWS Event Handlers in the AWS Console"
---

# Troubleshooting AWS Event Handlers in the AWS Console

## When to use this guide?

Use this guide to verify that the Turbot Guardrails Event Handling infrastructure in AWS is
present, enabled and properly configured. This guide focuses on a single region
in an account. In most cases, fixes identified by this guide will apply to other
regions.

## Common scenarios

1. An individual event was missed: Pick an event that you expected to cause a
   change to a resource in the Guardrails console but didn’t. This event must be
   recent enough to show up in Cloudtrail search.
2. Overall event handling isn’t working: A new resource or change on an existing
   resource doesn’t show up in the Guardrails console.

## Prep Work

1. Choose an account and region to investigate.
2. Choose a specific event or type of event. If necessary, generate a new event
   by creating, updating or deleting the resource of interest. (For example, if
   troubleshooting an RDS instance update, change the RDS instance so as to
   create a new event in CloudTrail. This will make troubleshooting much
   easier.)
3. Log into the AWS console for the region from step 1.

## Verify Infrastructure using the AWS Console

### CloudTrail Service

1. Navigate to the CloudTrail service in the AWS console.
2. Check that an Org, Global or Regional trail is present and logging. Guardrails
   does not need its own dedicated trail. As long as at least one Regional,
   Global or Org trail is functioning in a region then Guardrails will use it.
   1. If not present then one will need to be created. Create trails
      automatically using
      [Guardrails Audit Trails](guides/aws/event-handlers#configuring-cloudtrail)
      or any other method that results in the creation of a functional
      cloudtrail.
3. If a trail is present, use the CloudTrail console to search for the specific
   event that should have been captured by Guardrails.
   1. If the event cannot be found, then try to reproduce a similar event. If
      the event continues to not show up in the CloudTrail console, please
      contact AWS support.
   2. If found, save a copy of the entire event. Guardrails Support will need this
      information to determine if the event was handled properly.
   3. Troubleshooting steps in the Events, SNS and IAM consoles will determine
      whether the event could have made it to Guardrails for processing.

### EventBridge Service

1. Navigate to the Eventbridge service in the AWS console.
2. Browse to "Rules". Check that the `turbot_aws_api_events` Event Rule is
   present. In most environments there will also be a set of other Event Rules
   that follow the pattern of: `turbot_aws_api_events_{aws_service}`. Please
   document a list of all Guardrails event rules to provide to Guardrails Support.
   1. If no Guardrails Event Rules are present, it’s possible that event handlers
      have never been deployed in this region. Refer to the
      [AWS Event Handler Deployment guide](guides/aws/event-handlers) for
      next steps.
3. In the Rules search bar, enter the name of the service associated with the
   event of interest. For our RDS example, we would search for "rds". We expect
   to see an Event Rule called `turbot_aws_api_events_rds`.
   1. Many, but not all, AWS services have their own Event Rule.
   2. If no service specific event rule exists then look for the service inside
      the “turbot_aws_api_events” rule.
   3. If there is no service specific rule and no entry in the
      “turbot_aws_api_events” rule then the Guardrails mod for that service is not
      installed. Install the appropriate mod, let the event handlers run then
      test again.
4. If a service specific event rule exists, examine the event pattern. An event
   pattern should match up with the event type previously identified. If
   missing, report this to Guardrails Support.
5. The Target for all Guardrails Event Rules should be the `turbot_aws_api_handler`
   SNS Topic.

### SNS Service

1. Navigate to the SNS service in the AWS console.
2. Check that the `turbot_api_event_handler` SNS topic is present and enabled.
   1. If SNS topic isn’t present then it either was never deployed in the first
      place (access denied errors are the common cause), or something/someone
      has removed it. To fix, please follow the steps in the companion guide:
      Guardrails Troubleshooting: Event Handlers - Guardrails Console
   2. If the SNS topic was removed, identify the source of the removal and
      educate the user or fix the automation that performed the removal.
3. Check that an HTTPS subscription is present for the Event Handler topic. The
   subscription should be confirmed.
   1. If not confirmed then note down the entire URL that the subscription
      points to. Guardrails Support will need this information for further
      troubleshooting.
   2. To fix, please follow the steps in the companion guide: **Guardrails
      Troubleshooting: Event Handlers - Guardrails Console**

### IAM Service

1. Navigate to the IAM service in the AWS console.
2. Find the Turbot Guardrails IAM role.
3. Verify that it has sufficient permissions to deploy SNS topics, SNS
   subscriptions, Event Rules and Event Targets in the desired regions. See
   [What Permissions to Grant](guides/aws/import-aws-account#what-permissions-to-grant)
   for more info.
4. If using SCPs, ensure they grant sufficient permissions for Guardrails to manage
   event handlers in the desired regions.

## Still not working

If the above steps haven't fixed the problem, follow the companion guide:
**Guardrails Troubleshooting: Event Handlers - Guardrails Console**
