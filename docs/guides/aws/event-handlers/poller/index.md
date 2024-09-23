---
title: "AWS Polling (optional)"
template: Documentation
nav:
  title: "AWS Polling (optional)"
  order: 130
---

# AWS Event Poller

As an alternative to the Event Handler, Guardrails offers a polling mechanism for obtaining relevant events from AWS and
updating its CMDB. This mechanism is easy to configure and will not require sending events to a public webhook
endpoint (i.e. AWS API Gateway). While it is possible to configure both polling and event handlers, Guardrails highly
recommends using **AWS Event Handlers**. Event Pollers and Event Handlers should never be enabled at the same time.

* Choose **Polling** for ease of configuration. This is the **pull** method.
* Choose **Event Handlers** for efficiency and timeliness. This is the **push** method.

The Guardrails AWS Poller control will query CloudTrail for relevant event on a schedule and forward them to the router for
processing.

## Guardrails Policies for AWS Poller 

The following policies will need to be configured to enable AWS Polling

| Policy Type                            | Description                                                                                                                                                                                                                                 |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AWS > Turbot > Event Poller            | Enable/ Disable polling                                                                                                                                                                                                                     |
| AWS > Turbot > Event Poller > Interval | The polling interval - how often to poll                                                                                                                                                                                                    |
| AWS > Turbot > Event Poller > Window   | The polling window - This policy determines the oldest events the event poller will retrieve. For example, setting the window to '15 minutes' will cause the poller to retrieve all events from the previous 15 minutes every time it runs. 

## Relevant policy schema

### AWS > Turbot > Event Poller

```yml
description: |
  Configure the AWS Event Poller. When set to Enabled, the poller will run at the interval specified to retrieve the latest events and forward them to the Turbot Router.

  Note: The Event Poller and Turbot Event Handler are different mechanisms for sending information to Turbot. You should enable one or the other, but not both.

targets: AWS Account

schema:
  type: String
  enum:
    - Enabled
    - Disabled
  default: Disabled
```

### AWS > Turbot > Event Poller > Interval

```yml
description: |
  The polling interval. This policy determines how often the event poller will run.

targets: AWS Account

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

### AWS > Turbot > Event Poller > Window

```yml
description: |
  The polling window, in minutes. This policies determines the oldest events the event poller will retrieve. For example, setting the window to '15 minutes' will cause the poller to retrieve all events from the previous 15 minutes every time it runs.

  The Window must be greater than the Interval, and it is recommended to be at least twice the Interval. For example, if the Interval is 'Every 5 Minutes', the Window should be at least '10 Minutes'.

targets: AWS Account

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