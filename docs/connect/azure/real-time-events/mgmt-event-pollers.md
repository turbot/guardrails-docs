---
title: "Azure Management Group Event Polling"
sidebar_label: "Mgmt Event Polling"
template: Documentation
nav:
  title: "Mgmt Event Polling"
  order: 130
---

# Management Group Event Pollers

The Guardrails Azure Management Group Poller control will run at specified interval (defaults to every 12 hours)
to run the Management Group discovery to look for changes in the Management Group hierarchy.

## Azure Management Group Poller Turbot Policies

The following policies dictate the behavior of the Azure Management Group Polling. No additional configuration is
required. They are enabled by default.

| Policy Type                                               | Description                                                              |
|-----------------------------------------------------------|--------------------------------------------------------------------------|
| Azure > Turbot > Management Group Event Poller            | Enable/ Disable polling                                                  |
| Azure > Turbot > Management Group Event Poller > Interval | The polling interval - how often the Management Group discovery will run |
