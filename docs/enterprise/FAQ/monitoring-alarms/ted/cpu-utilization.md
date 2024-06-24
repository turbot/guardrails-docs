---
title: "CPU Utilization"
template: Documentation
nav:
  title: "CPU Utilization"
  order: 30
---

# CPU Utilization (Percent)

**AlarmName**: `<prefix>_<hive>_cpu_util_alarm` (example: `turbot_einstein_cpu_util_alarm`)

**Configuration**: You can change the CPU and memory available to a DB instance by changing its
DB [instance class](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.DBInstanceClass.html). The DB
Instance class is configured in the "Database - Configuration" section of TED.

`InstanceClass`: Instance Type for DB. Defaults to db.t3.small but almost all production installations have a basic
graviton instance.

**Condition**: CPUUtilization >= 70 for 3 datapoints within 15 minutes

**Healthy**: The Hive CPU is overloaded when it is consistently above 50% or higher.

**Under-provisioned**: When there are no errors in Guardrails operations and CPU is very high, the Hive instances may be
too small for the workload.

**Over-provisioned**: When CPU is consistently very low and the largest load spikes are below 50%.

## Troubleshooting

If you are seeing spikes in CPU utilization, check the performance insights of the database. Check for the Top SQL
running on the database. See if there are any custom mods in place or any queries that are using free search query.
Share the query with Turbot Support so that the team can fine tune it wherever possible.

### Need help?

Please reach out to [Turbot Support](mailto:support@turbot.com) with the collected information.

* A screenshot of the RDS instance's Configuration tab.
* A screenshot of the RDS instance's Monitoring tab showing the "CPU Utilization (Percent)" metric.
