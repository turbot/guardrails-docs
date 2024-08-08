---
title: "Azure Polling"
sidebar_label: "AD Event Poling"
template: Documentation
nav:
  title: "AD Event Polling"
  order: 130
---

# Active Directory Event Pollers

The Guardrails Azure Directory Poller control will query Audit Logs (Monitor) for relevant events on a schedule, and
forward them to Turbot. No additional configuration is required. They are enabled by default.

## Azure Active Directory Poller Turbot Policies

The following policies will need to be configured to enable Azure AD Polling

| Policy Type                                        | Description                                                                                                                                                                 |
|----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Azure > Turbot > Directory Event Poller            | Enable/ Disable polling                                                                                                                                                     |
| Azure > Turbot > Directory Event Poller > Interval | The polling interval - how often to poll                                                                                                                                    |
| Azure > Turbot > Directory Event Poller > Window   | The polling window - how far back to retrieve events when polling. This must exceed the interval, and is required in case events are received by Azure Monitor out of order |

