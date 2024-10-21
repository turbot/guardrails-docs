---
title: "Monitoring and Alarms"
template: Documentation
nav:
  order: 40
---

# Monitoring and Alarms

As a part of effective monitoring, the TEF, TED and TE products include
CloudWatch dashboards and alarms. This guide will walk through some of the
CloudWatch Alarms as well pointers to the alarm SNS topics.

You can find the complete list of CloudWatch Alarms in
`AWS > CloudWatch > All Alarms` under the alpha region of the installation. Upon
opening the CloudWatch Alarm Details, it will give you information about what
the alarm is looking for, the interval and the threshold.

Based on the Alarm conditions, all the alarms have an action to send a
notification to a SNS Topic. The notifications for TEF and TE alarms are pushed
to the SNS Topic `turbot_alarms` whereas the notifications for TED alarms are
pushed to the SNS Topic `turbot_<hive>_alarms` (example:
`turbot_newton_alarms`). Please make sure to subscribe to these two SNS Topics.

Details for each product.

- [TE](enterprise/FAQ/monitoring-alarms/te)
- [TED](enterprise/FAQ/monitoring-alarms/ted)
