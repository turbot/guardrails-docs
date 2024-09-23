---
title: "Azure Polling"
sidebar_label: "Mgmt Event Polling"
template: Documentation
nav:
  title: "Mgmt Event Polling"
  order: 130
---

# Management Group Event Pollers

The Turbot Azure Management Group Poller control will run at specified interval
to run the Management Group discovery to look for changes in the Management
Group hierarchy.

## Azure Management Group Poller Turbot Policies

The following policies will need to be configured to enable Azure Management
Group Polling

| Policy Type                                               | Description                                                              |
| --------------------------------------------------------- | ------------------------------------------------------------------------ |
| Azure > Turbot > Management Group Event Poller            | Enable/ Disable polling                                                  |
| Azure > Turbot > Management Group Event Poller > Interval | The polling interval - how often the Management Group discovery will run |

## Relevant policy schema

### Azure > Turbot > Management Group Event Poller

```yml
description: |
  Configure the Azure Event Poller.  When set to `Enabled`, the poller will run at the interval specified to run the Management Group discovery control to look for changes in the Management Group hierarchy.

targets: Azure Management Group

schema:
  type: string
  enum:
    - Enabled
    - Disabled
  default: Disabled
```

### Azure > Turbot > Management Group Event Poller > Interval

```yml
description: |
  The discovery run interval. This policy determines how often the management group discovery will run.

targets: Azure Management Group

schema:
  type: string
  enum:
    - Every hour
    - Every 2 hours
    - Every 3 hours
    - Every 6 hours
    - Every 12 hours
    - Every day
    - Every 2 days
    - Every 3 days
    - Every week
  default: Every 12 hours
```
