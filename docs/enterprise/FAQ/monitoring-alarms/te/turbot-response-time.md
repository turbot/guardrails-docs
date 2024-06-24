---
title: "Guardrails Response Time"
template: Documentation
nav:
  title: "Guardrails Response Time"
  order: 90
---

# Guardrails Response Time

**AlarmName**: `<prefix>_<te_version>_turbot_response_time_alarm` (example: `turbot_5_40_0_turbot_response_time_alarm`).

**Description**: Response Time for API & UI requests to the ALB.

**Condition**: TargetResponseTime >= 3 for 1 datapoints within 1 minute.

**Healthy**: Steady, low response times below 1s. Includes periods with no data / traffic.

**Hot Spots**: Spikes of slow performance, indicating overloading or slow handling.

## Troubleshooting

Go to CloudWatch Insights and filter for the log group `/turbot/{hive}/api/audit` and run the following query. The below
will give long-running queries, please share the same with Turbot Support so that we can troubleshoot further and
fine tune the queries.

```
fields @timestamp,  detail.request.body.operationName as Operation, detail.request.host as workspace, toMillis(@ingestionTime-@timestamp) as duration, @message
| filter toMillis(@ingestionTime-@timestamp) > 2000
| sort @timestamp desc
| limit 100
```

### Need help?

Please reach out to [Turbot Support](mailto:support@turbot.com) with the collected information.

* The current TE version being used.
* A screenshot of the widget "Guardrails Response Time" under the "API" section of the CloudWatch TE Dashboard.
