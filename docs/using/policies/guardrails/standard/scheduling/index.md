---
title: Scheduling in Guardrails
sidebar_label: Schedule
---

# Scheduling in Guardrails

**Scheduling** allow Organizations to control costs. Guardrails provides a simple
and flexible mechanism for starting and stopping cloud resources on a
pre-defined schedule. Using Guardrails `Schedule` and `Schedule Tag` policies, users
and administrators can define schedules to control cloud resource usage.

## Setting a Schedule

Guardrails generally solves these with 2 policies:

- `Schedule`: This policy allows to select a start/stop schedule from a
  pre-defined list of schedules.
- `Schedule Tag`: This allows to specify a custom schedule using the
  `turbot_custom_schedule` tag on the resource.

Both policies are set to `Skip` by default. When both the policies are set to
`Enforce`:

- The policy specified in the `Schedule tag` will be in effect if the
  `turbot_custom_schedule` tag exists.
- The policy specified in the `Schedule` will be in effect if the resource does
  not have a `turbot_custom_schedule` tag.

These policies can be found directly under the supported services in the
hierarchy:

- `{Provider} > {Service} > {Resource} > Schedule`
- `{Provider} > {Service} > {Resource} > Schedule Tag`

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Schedule </code></li>
    <li><code>AWS > EC2 > Instance > Schedule Tag</code></li>
  </ul>
  </div>

The values available for `Schedule` policy provides a simple mechanism that
meets most common cases.

<div className="example">
<pre>
    # AWS > EC2 > Instance > Schedule
    - Skip
    - Enforce: Enforce: Business hours (8:00am - 6:00pm on weekdays)
    - Enforce: Extended business hours (7:00am - 11:00pm on weekdays)
    - Enforce: Stop for night (stop at 10:00pm every day)
    - Enforce: Stop for weekend (stop at 10:00pm on Friday)
</pre>
</div>

### Schedules Description:

| Name                  | Value                                                             | Description                                                                                  |
| --------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| skip                  | `Skip`                                                            | No scheduling enforced.                                                                      |
| businessHours         | `Enforce: Business hours (8:00am - 6:00pm on weekdays)`           | Guardrails will start instances at 8:00 AM and stop them at 6:00 PM from Mon-Fri.            |
| extendedBusinessHours | `Enforce: Extended business hours (7:00am - 11:00pm on weekdays)` | Guardrails will start instances at 7:00 AM and stop them at 11:00 PM from Mon-Fri.           |
| stopForNight          | `Enforce: Stop for night (stop at 10:00pm every day)`             | Guardrails will stop instances every night at 10:00 PM and will not power on them back.      |
| stopForWeekend        | `Enforce: Stop for weekend (stop at 10:00pm on Friday)`           | Guardrails will stop instances at 10:00 PM on Friday night, and will not power on them back. |

## Time Zones

Guardrails will use the resource region to determine the time to start or stop as
per the schedule.

Consider if the schedule for all EC2 instances in an account is set from 8:00 AM
to 6:00 PM and there are instances in `us-east-1` and `us-west-1`, the instances
will not be started together at 8:00 AM ET. The instances in `us-east-1` will be
started at 8:00 AM ET but the instances in `us-west-1` will start at 8:00 AM PT.

## Starting and Stopping the Instance

Guardrails will automatically start and stop instances according to the schedule
set.

Consider if the instance is scheduled to run from 8:00 AM to 6:00 PM, and the
user manually stops the instance at 4:00 PM, Guardrails will not start the instance
again. This allows users to easily manage the starting and stopping of instances
outside the schedule.

If the start and stop expression is invalid, Guardrails will not take any actions
against the instance.

## Scheduling with a Tag

The tagging mechanism is native to the cloud provider to specify a custom
schedule. When the `Schedule Tag` policy is set to
`Enforce: Schedule per turbot_custom_schedule tag`, Guardrails will attempt to use
the tag's value for setting the schedule. A tag with the exact key name as
`turbot_custom_schedule` and value with correct expression should be set for the
instance.

The `turbot_custom_schedule` tag may contain:

- `Skip` to exempt the resource from the schedule.
- A named Schedule (i.e. `businessHours` or `business_hours`)
- A custom Schedule expression ( AWS and Azure only )

A blank tag value is considered as `invalid`. The control moves to `invalid`
state and no action is taken.

## Custom Schedule Expressions

A custom schedule expression is to start and/or stop expression included in one
line of YAML. Neither the start nor stop expressions are required - You can
schedule stopping but not starting or vice-versa.

For each expression, either a
[5 Item CRON Expression](https://en.wikipedia.org/wiki/Cron#CRON_expression) or
[Later.js Text Expression](https://bunkat.github.io/later/parsers.html#text) can
be used.

```yaml
# Start at 8:00 AM and stop at 4:00 PM on weekdays
CRON exp: {"start": "* 8 * * MON-FRI", "stop": "* 16 * * MON-FRI"}
Text exp: {"start": "at 8:00am every weekday", "stop": "at 4:00pm every weekday"}
# Start at 8:00 AM on weekdays
CRON exp: {"start": "* 8 * * MON-FRI"}
Text exp: {"start": "at 8:00am every weekday"}
# Stop at 5:00 P.M. on Monday, Wednesday, and Friday
CRON exp: {"stop": "* 17 * * MON,WED,FRI"} or
Text exp: {"stop": "at 5:00pm on Mon,Wed and Fri"}
```

CRON and Text expressions can be used together in the same tag:

```yaml
# Start at 8:00 AM and stop at 4:00 PM on weekdays
{ "start": "at 8:00am every weekday", "stop": "* 16 * * MON-FRI" }
```

**Note**:

- Custom schedule expressions via tagging is not supported in GCP due to limited
  list of allowed characters (GCP only allows alphanumeric characters, hyphens,
  and underscores).
- As a fail-safe in case of temporary Guardrails outage or queueing, the control
  checks the current time against the start or stop time before it starts or
  stops the instance. When the current time is more than 1 hour after the start
  or stop time:
  - The control will not take any action - it will not start or stop the
    instance.
  - The control will go to error state.
- Named schedule supports Guardrails defined standard lower camel case as well as
  snake case required to support GCP tagging (labels do not support uppercase
  characters) such as:
  - `business_hours` or `businessHours`
  - `extended_business_hours` or `extendedBusinessHours`
  - `stop_for_night` or `stopForNight`
  - `stop_for_weekend` or `stopForWeekend`

### Example 1: AWS > EC2 > Instance > Schedule

Assume that user has multiple EC2 instances in each region of an account. The
user needs to start all the instances at 8:00 AM and stop them at 6:00 PM on
weekdays. The following policies have been configured in Guardrails at the account
level:

- **AWS > EC2 > Instance > Schedule** is set to
  `Enforce: Business hours (8:00am - 6:00pm on weekdays)`.
- **AWS > EC2 > Instance > Schedule Tag** is set to `Skip`.

Setting the above policies will ensure that all EC2 instances are started at
8:00 AM and stopped at 6:00 PM, (local time in each region) Monday through
Friday.

### Example 2: AWS > EC2 > Instance > Schedule

Assume that the user has an EC2 instance which needs to run 24\*7 and other
instances should start at 7:00 AM and stop at 11:00 PM on weekdays. The
following policies have been configured in Guardrails at the account level:

- **AWS > EC2 > Instance > Schedule** is set to
  `Enforce: Extended business hours (7:00am - 11:00pm on weekdays)`.
- **AWS > EC2 > Instance > Schedule Tag** is set to `Skip`.

The following policy (exception) has been configured in Guardrails at the instance
level which needs to run 24\*7:

- **AWS > EC2 > Instance > Schedule Tag** is set to
  `Enforce: Schedule per turbot_custom_schedule tag`.

The instance has a tag with the key as `turbot_custom_schedule` and a value as
`skip`.

The above policy settings will ensure that the instance requiring 24\*7 uptime
remains up, while the other instances are running between 7:00 AM and 11:00 PM
(local time based on region) and stopped outside of that time window.

### Example 3: GCP > Compute Engine > Instance > Schedule

Assume that the user has multiple VM instances in each region of a project. All
the instances must be stopped at at 10:00 PM every day. To do this, the
following policies have been configured in Guardrails at the project level:

- **GCP > Compute Engine > Instance > Schedule** is set to `Skip`.
- **GCP > Compute Engine > Instance > Schedule Tag** is set to
`Enforce: Schedule per turbot_custom_schedule tag`.
<!-- currently policy is `GCP > Compute Engine > Instance > Schedule > Tag` but expecting will be fixed to `GCP > Compute Engine > Instance > Schedule Tag. -->

The following label is then applied to the instances that must be stopped:
`turbot_custom_schedule`: `stop_for_night`
