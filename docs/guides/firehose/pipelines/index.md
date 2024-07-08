---
title: Building Pipelines
sidebar_label: Building Pipelines
---

# Building Notifications Pipelines

The ability to get data out of Guardrails has been greatly enhanced by the introduction of the [firehose-aws-sns](/guardrails/docs/mods/turbot/firehose-aws-sns) mod. To facilitate development of notification pipelines, this document describes a variety of architectural capabilities and considerations. A few example pipelines are also included.

## Exploration
The Guardrails Activity tab will help in getting acquainted with how the environment operates as well as the volume of change Guardrails can create at scale.

1. Create a storage bucket.
2. Set some policy to enforce on this bucket.
3. Examine the Activity tab for that bucket to get a feel for the rate and volume of change.
4. Observe the rate of change of controls from `TBD` &rarr; `Skip` &rarr; `alarm` &rarr; `ok`
5. Make a policy change at the regional level to get a feel for how Guardrails handles change at scale.

## Sources of Change
A few sources of change to Guardrails or the cloud environment may induce high volumes of notifications. At a minimum, the notification pipeline should behave properly in all these scenarios.
- Changes to policy settings at the Guardrails, folder or resource levels.
- New, updated or destroyed cloud resources
- Mod installation
- Mod upgrades
- Turbot Guardrails Enterprise upgrades

## Recommended Architectural Components
The Notifications pipeline should include some or all of the below capabilities:
- Queueing
- Time Delay
- Filter
- Routing / Recipient List
- Rate Limiting / Message Aggregation
- Data Transformation
- Templating
- Validation
- Pipeline Instrumentation
- External Data Lookup
- Global On/Off Switch
- Scheduled Tasks
- Pipeline Heartbeat

Developers can choose which of these architectural components suit their organizational needs and development time constraints.

### Queueing
Queueing helps handle high notifications volumes by buffering . No one likes missed notifications. Queues also facilitate troubleshooting and notification examination.

### Time Delay
Guardrails can generate hundreds or thousands of control alarms when a policy changes or when resources are created in bulk. A time delay step enables the developer to wait for Guardrails to finish processing enforcements. Sending out `alarm` notifications as soon as they appear signals the end user that something is wrong while Guardrails may be still remediating.

### Filter
While Guardrails Watches provide considerable control over which notifications are sent, additional filtering may be required.

### Routing / Recipient List
Introducing a router allows the developer to choose a single or multiple destinations for a given message. Perhaps some notifications are only useful to the SEIM but other should be sent to end users. A router permits that choice to be made. Especially important since Guardrails will only send messages to a single Firehose SNS topic.

### Rate Limiting / Message Aggregation
Rate limiting combined with Message Aggregation prevents sending high volumes of notifications. Instead of sending hundreds of emails when a policy has changed, send a single email with some reasonable message explaining what happened.

Users may also want a "Nothing changed in the last {time period}" notification, just to ensure that the pipeline is still operational.

### Data Transformation
While Guardrails provides JSON, other downstream systems may require CSV, YAML or some other format. A data transform step provides the capability to make these changes.

### Templating
The notifications that come from Guardrails will be in JSON. End users don't typically read JSON, so the raw notification will need to be turned into something readable.

### Validation
As shown in the exploration above, Guardrails can emit `alarm` events then quickly change them to `ok` or `skip`. A validation step checks back with Guardrails to ask "does this control still exist and is in alarm?". A simple GraphQL query to get the current control state would be sufficient. A validation step works closely with a time delay queue to give Guardrails time to process any pending remediations.

### Pipeline Instrumentation
Someone is going to want statistics on how many notifications were sent or a way to know when the notifications pipeline is inoperable (for whatever reason).

### External Data Lookup
A particular notification may require looking up data outside of the pipeline. This may be over HTTP, SQL, local file, etc.

### Global On/Off Switch
There should be a big red Emergency Stop button for the pipeline.

### Scheduled Tasks
Some notifications work best on a periodic interval, such as daily summaries.

### Pipeline Heartbeat
The pipeline should be able to tell the difference between no activity because nothing is happening and no activity because something upstream of the pipeline has failed.

## Gotchas
### Volume of Change for Policy Values
Making changes to policy settings can induce really high messages volumes for the `policy_values` notification type. It's easy to have a few hundred policy settings but hundreds of thousands of policy values. Make sure the message volume can be handled by the notifications pipeline.

### False Positives on Alarms
It is normal for Guardrails to set a control to `alarm` when processing a new resource or on a policy change. Avoid the situation where Guardrails sets a control to `alarm`, the notification pipeline sends a nasty-gram, then Guardrails resolves the control by setting it to `skip` or `ok`.  The Time Delay and Validation steps mentioned above should reduce or eliminate these kind of false positive notifications.

## Example Pipelines
### General Design Requirements
- Don't spam the user with duplicates or high volume for the "same problem".
- Notify of controls in 'alarm' state for at least 1 minute.
- Notify when Guardrails takes an action on a cloud resource.
- No interest in changes to resources, permissions, or favorites as these are controlled by a different pipeline or only of interest to individual Guardrails Admins.
- Guardrails is in Enforce mode.

### Pipeline
#### Queues with different delays
In this case, requirements state that validation should be done on different delays.

Guardrails &rarr; Firehose &rarr; SNS &rarr; Lambda Subscription &rarr; Router (1)(2)(3)
* (1) &rarr; Queue (with time delay (1m)) &rarr; Validation &rarr; Rate Limit &rarr; Rate Limit/Data Aggregate &rarr; Template &rarr; Final Delivery to user via email
* (2) &rarr; Queue (with time delay (10m)) &rarr; Validation &rarr; Transform (JSON to CSV) &rarr; Final Delivery to BI dashboard that only accepts CSV.
* (3) &rarr; Queue (with time delay (5m)) &rarr; Validation &rarr; Data Lookup &rarr; Transform (JSON to YAML) &rarr; Final Delivery to Ticketing system

#### Validate all Notifications
A slightly more efficient pipeline. Since we want to validate all notifications, we can just swap the order of the queue with the router. Since all our sub-pipelines don't require super fast responses/actions, a single small delay is fine.

Guardrails &rarr; Firehose &rarr; SNS &rarr; SQS Queue (with time delay) &rarr; Validation > Router (1)(2)(3)
* (1) Rate Limit &rarr; Rate Limit/Data Aggregate &rarr; Template &rarr; Final Delivery to user via email
* (2) Transform (JSON to CSV) &rarr; Final Delivery to BI dashboard that only accepts CSV.
* (3) Data Lookup &rarr; Transform (JSON to YAML) &rarr; Final Delivery to Ticketing system

#### Simple Pipeline for Email Notifications
A simple approach where each action Guardrails takes will result in one notification to the user.

Guardrails &rarr; Firehose &rarr; SNS &rarr; SQS Queue (with time delay) &rarr; Validation &rarr; Router (1)
* (1) Rate Limit/Data Aggregate &rarr; Template &rarr; Email Address Lookup &rarr; Final Delivery to user via email


## Troubleshooting
Refer to the Cloudwatch logs for `/aws/lambda/turbot-turbotfirehoseawssnssender-{hash}` if messages don't appear as expected. These logs only cover publishing to the topic by the firehose. Activity after publishing to the topic cannot be covered here.

## Reference
- [Firehose Installation Instructions](/guardrails/docs/mods/turbot/firehose-aws-sns#setup): Basic overview and capabilities
- [Firehose Terraform Bootstrap](https://github.com/turbot/guardrails-tools/tree/master/mod_examples/firehose-aws-sns/setup/terraform): Terraform for setting up the SNS topic then configuring the appropriate Guardrails policies.  Requires AWS and Guardrails credentials to execute.
- [Firehose Notification Templates](/guardrails/docs/mods/turbot/firehose-aws-sns/policy#turbot--firehose--aws-sns--notification-template): Each Notification type has a template.  These can be altered to include or exclude required information. These templates exclusively alter the formatting and included info that is sent to the Firehose SNS topic. Be conservative with changes here.
