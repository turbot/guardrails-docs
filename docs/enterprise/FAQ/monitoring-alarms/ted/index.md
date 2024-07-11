---
title: "TED"
template: Documentation
nav:
  title: "TED"
  order: 20
---

# Monitoring and Alarms - TED

The alarms related to TED are forwarded to the SNS Topic `{prefix}_{hive}_alarms` (example: `turbot_einstein_alarms`).
If you have multiple hives, you need to subscribe to each hive's SNS Topic.

Below are the list of supported alarms for the RDS Database.

* [CPU Utilization](enterprise/FAQ/monitoring-alarms/ted/cpu-utilization)
* [DB Connections](enterprise/FAQ/monitoring-alarms/ted/db-connections)
* [Free Storage Space](enterprise/FAQ/monitoring-alarms/ted/free-storage-space)
* [Freeable Memory](enterprise/FAQ/monitoring-alarms/ted/freeable-memory)
* [Queue Depth](enterprise/FAQ/monitoring-alarms/ted/queue-depth)
