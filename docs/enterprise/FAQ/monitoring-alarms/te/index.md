---
title: "TE"
template: Documentation
nav:
  title: "TE"
  order: 10
---

# Monitoring and Alarms - TE

The alarms related to TE are forwarded to the SNS Topic `{prefix}_alarms` (example: `turbot_alarms`). Please make sure to subscribe to the SNS Topic for notifications.

Below are the list of supported alarms for Turbot Guardrails Enterprise.

* [ELB 5xx errors](te/elb-5xx-errors)
* [Events Queue Backlog](te/events-queue-backlog)
* [Guardrails Response Time](te/turbot-response-time)
* [Worker Lambda duration](te/worker-lambda-duration)
