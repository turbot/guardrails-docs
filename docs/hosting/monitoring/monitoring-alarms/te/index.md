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

* [ELB 5xx errors](/guardrails/docs/guides/hosting-guardrails/monitoring/monitoring-alarms/te/elb-5xx-errors)
* [Events Queue Backlog](/guardrails/docs/guides/hosting-guardrails/monitoring/monitoring-alarms/te/events-queue-backlog)
* [Guardrails Response Time](/guardrails/docs/guides/hosting-guardrails/monitoring/monitoring-alarms/te/turbot-response-time)
* [Worker Lambda duration](/guardrails/docs/guides/hosting-guardrails/monitoring/monitoring-alarms/te/worker-lambda-duration)
