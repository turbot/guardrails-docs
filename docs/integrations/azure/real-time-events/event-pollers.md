---
title: "Azure Polling"
sidebar_label: "Event Polling"
template: Documentation
nav:
  title: "Event Polling"
  order: 130
---

# Event Pollers

The Turbot Azure Poller control will query Audit Logs (Monitor) for relevant
events on a schedule, and forward them to the router for processing.

## Azure Poller Turbot Policies

The following policies will need to be configured to enable Azure Polling

| Policy Type                              | Description                                                                                                                                                                 |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Azure > Turbot > Event Poller            | Enable/ Disable polling                                                                                                                                                     |
| Azure > Turbot > Event Poller > Interval | The polling interval - how often to poll                                                                                                                                    |
| Azure > Turbot > Event Poller > Window   | The polling window - how far back to retrieve events when polling. This must exceed the interval, and is required in case events are received by Azure Monitor out of order |

## Relevant policy schema

### Azure > Turbot > Event Poller

```yml
description: |
  Configure the Azure Event Poller.  When set to `Enabled`, the poller will run at the interval specified to retrieve the latest events and forward them to the Turbot Router.

  Note: The Event Poller and Turbot Event Handler are different mechanisms for sending the same information to Turbot. You should enable one or the other, but typically not both. If you feel like you need to enable both, please contact Turbot support and we'll discuss your use case with you in depth.

targets: Azure Subscription

schema:
  type: string
  enum:
    - Enabled
    - Disabled
  default: Enabled
```

### Azure > Turbot > Event Poller > Interval

```yml
description: |
  The polling interval. This policy determines how often the event poller will run.

targets: Azure Subscription

schema:
  type: string
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
  default: Every 1 minute
```

### Azure > Turbot > Event Poller > Window

```yml
description: |
  The polling window, in minutes. This policies determines the oldest events the event poller will retrieve. For example, setting the window to '5 minutes' will cause the poller to retrieve all events from the previous 5 minutes every time it runs.

  The Window must be greater than the Interval, and it is recommended to be at least twice the Interval. For example, if the Interval is 'Every 5 Minutes', the Window should be at least '10 Minutes'.

targets: Azure Subscription

schema:
  type: string
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
  default: 10 minutes
```
