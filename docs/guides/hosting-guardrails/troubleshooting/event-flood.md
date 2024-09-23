---
title: "Event Flood"
sidebar_label: "Event Flood"
---

# Troubleshooting Event Flood in the AWS Console

## What is an Event flood?

An event flood is a large and sustained backlog of events in the Guardrails Events queue. The "Events Queue Backlog" graph in the Turbot Guardrails Enterprise (TE) Cloudwatch dashboard is the best place to see if an event flood is underway. Event floods may have several different causes. This document describes where to go looking for the cause. Resolution of the event flood will depend on the cause(s).

## Initial Symptoms

- **Control runs for longer than usual in the Guardrails Console**: A common initial symptom of an event flood appears when a manually run control process takes a long time get out of the `Initializing` or `Handling` states. (You'll see these states in the top left corner of the "View Logs" page that appears after clicking "Run Control" from the Action menu. These states are also different from the normal control states of `ok`, `alarm`, etc.)
- **Cloudwatch Alarms**: As part of normal deployment, TE deploys a number of Cloudwatch Alarms for various run time failures. Event floods would be caught by `turbot_5_{minor}_{patch}_events_queue_messages_visible_alarm`. These alarms should be connected to an organization's normal cloud notification systems.

## Common Causes of Event Floods

Various causes can initiate and sustain an event flood. This list is not exhaustive.

- **Rogue Automation**: An automation gone wild out in an account.
- **Higher than normal workloads**: High volume of events that exhausts the API quota for that service causing excessive retries. Frequently spinning up short-lived but very large compute clusters in AWS EC2 is a common example of this.
- **Guardrails vs Automation**: Guardrails fighting with automation in a managed account.
- **Guardrails vs Guardrails**: Guardrails fighting with itself due to misconfigured/conflicting policies. A common example would be a Stack control that specifies the configuration for some resource. Other Guardrails policies describe a different configuration for the same resource.
  - For example, the `AWS > Region > Stack > Source` policy describes an S3 bucket with a policy that does not include EncryptionInTransit. For the same bucket, the `AWS > S3 > Bucket > Encryption in Transit` policy *does* enforce encryption in transit. The Stack control and Encryption in Transit controls will flip-flop the bucket policy back and forth forever.
- **Guardrails Policy Misconfiguration**: A misconfiguration within Guardrails, example: Setting Event Handlers to **Enforce: Configured** and 'AWS > Events > Rule > CMDB' to **Enforce: Disabled**. The Event Handlers create Event Rules, but the Rule CMDB will delete them from CMDB. Event Handlers don't see the Event Rules so it creates them again. In the TE Cloudwatch dashboard this appears as lot of symmetric 'events:PutRule' and 'events:PutTargets' events.
- **Misconfiguration of Guardrails**: Something about the configuration of Guardrails, the application, that prevents proper processing of incoming events. Common examples include: DB too small for the workload, worker concurrency too low for workload, DB tuned improperly, worker lambda tuned improperly, too few ECS hosts.
- **Guardrails Bug**: There's a bug in Guardrails somewhere.

It's not uncommon for event floods to arise from a combination of factors. Look for simple solutions to start.

## How to look for an event flood?

If you suspect there is an event flood underway, start with these information sources:

**TE Cloudwatch Dashboard**: Start here. The top two graphs on the TE dashboard will show if you're in a flood state. The "Activities" Section at the bottom of the TE dashboard is very helpful too.

**TED Cloudwatch Dashboard**: Check DB and Redis health. While not common, an under-provisioned DB may cause problems.

**RDS Performance Insights**: If you're looking for additional information on what may be slowing down event processing.

In an installation with multiple tenants(workspaces), the first step is to filter/figure out the noisy tenant that is causing problems. The widget "View All Messages By Workspace" in TE Dashboard can be used to filter out the noisy tenant. The number of messages received by the top most tenant for specified duration and the difference between the top 3 tenants could be a good indicator of event flood.

Once the noisy tenant is spotted, the widget "View AWS External Messages by AWS Account ID and Events" should give more details about the troublesome account and the event within the tenant. Try to understand if the high activity of events co-relates with the number of accounts/regions within the workspace, also try to compare the numbers with the most busiest workspace within the environment.

### Tips/Queries?

Navigate to CloudWatch > Logs Insights. Select the appropriate worker log group of the TE version in the drop-down (example: `/aws/lambda/turbot_5_40_0_worker`). Select the duration for which you want to query (example: 1 day or 3 days).

Please note that as the duration increases the Log group size data (in GB) and the time taken to query increases. This will in-turn increase the billing cost for CloudWatch.

You can further saves these queries to your CloudWatch Log Insights and run them on demand.

Please update the tenant accordingly from 'console-turbot.cloud.turbot.com' to your tenant Id.

* Top 10 External Messages by Tenant
```
fields @timestamp, @message
| filter message='received SQS message' and ispresent(data.msgObj.payload.account)
| filter data.msgObj.type='event.turbot.com:External'
| stats count() as Count by data.msgObj.meta.tenantId as Tenant | sort Count desc | limit 10
```

* Top 15 External Messages by Accounts in a Workspace/Tenant
```
fields @timestamp, @message
| filter message='received SQS message' and ispresent(data.msgObj.payload.account) and data.msgObj.meta.tenantId='console-turbot.cloud.turbot.com'
| filter data.msgObj.type='event.turbot.com:External'
| stats count() as Count by data.msgObj.meta.tenantId as Tenant, data.msgObj.payload.account as AccountId
| sort Count desc | limit 15
```

* Top 15 External Messages by Source for a Tenant
```
fields @timestamp, @message
| filter message='received SQS message' and ispresent(data.msgObj.payload.account) and ispresent(data.msgObj.payload.source) and data.msgObj.meta.tenantId='console-turbot.cloud.turbot.com'
| filter data.msgObj.type='event.turbot.com:External'
| stats count() as Count by data.msgObj.meta.tenantId as Tenant, data.msgObj.payload.source as Source
| sort Count desc | limit 15
```

* Top 15 External Messages by Events for a Tenant and an account in Tenant
```
fields @timestamp, @message
| filter message='received SQS message' and ispresent(data.msgObj.payload.account) and ispresent(data.msgObj.payload.source) and data.msgObj.meta.tenantId='console-turbot.cloud.turbot.com' and data.msgObj.payload.account='123456789012'
| filter data.msgObj.type='event.turbot.com:External'
| stats count() as Count by data.msgObj.meta.tenantId as Tenant, data.msgObj.payload.account as AccountId, data.msgObj.payload.source as Source, data.msgObj.meta.eventRaw as EventName
| sort Count desc | limit 15
```

* Top 15 External Messages by Events for a Tenant and an event source(aws.tagging)
```
fields @timestamp, @message
| filter message='received SQS message' and ispresent(data.msgObj.payload.account) and ispresent(data.msgObj.payload.source) and data.msgObj.meta.tenantId='console-turbot.cloud.turbot.com' and data.msgObj.payload.source='aws.tagging'
| filter data.msgObj.type='event.turbot.com:External'
| stats count() as Count by data.msgObj.meta.tenantId as Tenant, data.msgObj.payload.account as AccountId, data.msgObj.payload.source as Source
| sort Count desc | limit 15
```

### How to fix an event flood?
As an immediate fix, you can move the noisy workspace to a separate TE version so that the neighbouring workspaces are not facing any performance issues or throttles.

If the event is coming from Event Poller, update the policy [AWS > Turbot > Event Poller > Excluded Events](https://turbot.com/guardrails/docs/mods/aws/aws/policy#aws--turbot--event-poller--excluded-events) to exclude the event.

Talk to the respective internal team explaining the issue and ask them to look into the internal automations if any, and/or turn off policies wherever applicable.
