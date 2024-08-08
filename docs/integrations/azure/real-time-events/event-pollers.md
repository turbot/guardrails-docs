---
title: "Azure Polling"
sidebar_label: "Event Polling"
template: Documentation
nav:
  title: "Event Polling"
  order: 130
---

# Event Pollers

The Guardrails Azure Poller control will query Audit Logs (Monitor) for relevant
events on a schedule, and forward them to the router for processing. No additional configuration is required. Pollers
are enabled by default.

## Azure Poller Turbot Policies

The following policies will need to be configured to enable Azure Polling

| Policy Type                              | Description                                                                                                                                                                 |
|------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Azure > Turbot > Event Poller            | Enable/ Disable polling                                                                                                                                                     |
| Azure > Turbot > Event Poller > Interval | The polling interval - how often to poll                                                                                                                                    |
| Azure > Turbot > Event Poller > Window   | The polling window - how far back to retrieve events when polling. This must exceed the interval, and is required in case events are received by Azure Monitor out of order |


