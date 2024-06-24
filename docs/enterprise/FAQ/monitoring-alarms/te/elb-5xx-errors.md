---
title: "ELB 5xx errors"
template: Documentation
nav:
  title: "ELB 5xx errors"
  order: 30
---

# ELB 5xx errors

**AlarmName**: `<prefix>_<te_version>_elb_5xx_error_alarm` (example: `turbot_5_40_0_elb_5xx_error_alarm`).

**Description**: Incoming requests to the ALB, including both UI and events.

**Condition**: HTTPCode_ELB_5XX_Count >= 3 for 1 datapoints within 1 minute.

**Healthy**: Steady low traffic with occasional bursts for online users.

**Event flood**: Sustained high volume of requests, indicating a noisy publisher.

**Instability**: Many 5XX errors, continuing over time.

## Troubleshooting

We can get 5XX errors when the status checks for underlying EC2 host machine fail or the instance loses network
connectivity. Though these are rare, once the health check of the instance fails, the autoscaling will immediately
launch a new instance and replace the faulty instance.

If the 5XX errors have nothing to do with the status checks of the EC2 instance then navigate to CloudWatch and search
for the API log group of the current TE installation (example: `/turbot/5_40_0/api`). For the given time period, please
check if there are any errors in the API log group and share the same with Turbot Support.

### Need help?

Please reach out to [Turbot Support](mailto:help@turbot.com) with the collected information.

* The current TE version being used.
* CloudWatch logs from API log group `/turbot/5_40_0/api`.
* A screenshot of the CloudWatch TE Dashboard with the widgets "Load Balancer" and "Guardrails Response Time" under
  the "API" section.
* A screenshot of the `Instance Management` tab from the `EC2 > Auto Scaling groups > turbot-auto-scaling-group` window.
