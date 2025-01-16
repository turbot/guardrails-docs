---
title: "Event Pollers (Optional)"
template: Documentation
nav:
  title: "Event Pollers (Optional)"
  order: 20
---

# GCP Event Pollers

Turbot Guardrails offers a polling mechanism for obtaining relevant events from GCP and
updating its CMDB. This mechanism is easy to configure and will not require
sending events to a Guardrails public event ingestion endpoint. While it is
possible to configure both event poller and event handlers, Turbot Support highly
recommends using the **GCP event handlers**. Event Pollers and Event Handlers
should never be enabled at the same time.

- Choose **Event Poller** for ease of configuration. This is the **pull**
  method.
- Choose **Event Handler** for efficiency and timeliness. This is the **push**
  method.

In the case of the Guardrails GCP Event Poller, StackDriver is queried for relevant
events on a schedule.  Events are then based back to Guardrails router for processing.

<div className="alert alert-info font-weight-bold">
  <p>Be aware of <a href="https://cloud.google.com/logging/quotas">logging limits and quotas</a>, including:</p>
<ul>
  <li>Limited to 1 <a href="https://cloud.google.com/logging/docs/reference/v2/rest/v2/entries/list">entries.list</a> call per second, per project.</li>
  <li>Log retention is 400 days for system and admin activity logs, 30 days for data
access logs.</li>
</ul>
</div>

## Configuration of GCP Pollers

The following policies will need to be configured in the environment to enable
event polling:

| Policy Type                            | Description                                                                                                                                                             |
| -------------------------------------- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GCP > Turbot > Event Poller            | Enable/Disable polling. Enabled by default.  Automatically switches off when Event Handlers are enabled                                                                 |
| GCP > Turbot > Event Poller > Interval | The polling interval - how often to poll                                                                                                                                |
| GCP > Turbot > Event Poller > Window   | The polling window - how far back to retrieve events when polling. This must exceed the interval, and is required in case events are recieved by stackdriver out of order |
| GCP > Turbot > Event Poller > Filter   | The GCP Logging filter to use when querying events (same as GCP > Turbot > Event Handlers > Logging > Sink > Compiled Filter )                                          |

## Relevant policy schema

### GCP > Turbot > Event Poller

```yml
description: |
  Configure the GCP Event Poller. When set to Enabled, the poller will run at the interval specified to retrieve the latest events and forward them to Guardrails for further processing.

  Note: Event Poller and Event Handlers are different mechanisms for sending information to Guardrails. You should enable one or the other, but not both.

targets: GCP Project

schema:
  type: String
  enum:
    - Enabled
    - Disabled
  default: Enabled
```

### GCP > Turbot > Event Poller > Interval

```yml
description: |
  The polling interval. This policy determines how often the event poller will run.

targets: GCP Project

schema:
  type: String
  enum:
    - Every 1 minute
    - Every 2 minutes
    - Every 3 minutes
    - Every 4 minutes
    - Every 5 minutes
    - Every 6 minutes
    - Every 7 minutes
    - Every 8 minutes
    - Every 9 minutes
    - Every 10 minutes

  default: Every 2 minutes
```

### GCP > Turbot > Event Poller > Window

```yml
description: |
  The polling window, in minutes. This policies determines the oldest events the event poller will retrieve. For example, setting the window to '5 minutes' will cause the poller to retrieve all events from the previous 5 minutes every time it runs.

  The Window must be greater than the Interval, and it is recommended to be at least twice the Interval. For example, if the Interval is 'Every 5 Minutes', the Window should be at least '10 Minutes'.

targets: GCP Project

schema:
  type: String
  enum:
    - 5 minutes
    - 6 minutes
    - 7 minutes
    - 8 minutes
    - 9 minutes
    - 10 minutes
    - 11 minutes
    - 12 minutes
    - 13 minutes
    - 14 minutes
    - 15 minutes
    - 16 minutes
    - 17 minutes
    - 18 minutes
    - 19 minutes
    - 20 minutes
  default: 5 minutes
```

### GCP > Turbot > Event Poller > Filter

```yml
description: |
  A GCP logs [advanced filter](https://cloud.google.com/logging/docs/view/advanced-queries) used to specify a subset of log entries that will be queried by the event poller.

  This is a read-only policy that is used internally by Guardrails

targets: GCP Project

schema:
  type: String
  default:
    calculated - value of `GCP > Turbot > Event Handlers > Logging > Sink >
    Compiled Filter`
```
