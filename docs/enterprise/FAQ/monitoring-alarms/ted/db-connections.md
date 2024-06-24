---
title: "DB Connections"
template: Documentation
nav:
  title: "Database Connections"
  order: 40
---

# Database Connections (Count)

**AlarmName**: `<prefix>_<hive>_db_max_connections_alarm` (example: `turbot_newton_db_max_connections_alarm`)

**Configuration**: The maximum concurrent connections allowed to a specific database(hive) and the threshold limit can
be configured in the "Database - Advanced - Parameters" section of TED.

`MaxConnections`: Maximum number of concurrent connections. Defaults to 600.

`MaxConnectionsAlarmThreshold`: Alarm threshold for maximum number of concurrent connections. Defaults to 500.

**Condition**: DatabaseConnections >= 500 for 3 datapoints within 15 minutes

**Details**: Connection counts should roughly correlate with the number of ECS Tasks and invoked Lambdas.

**Healthy**: Connections should slowly churn over time as Lambdas and Guardrails ECS Tasks spin up and down.

**Abnormal Spike**: An abrupt spike in connections may indicate a failure in the Tasks or Lambdas that caused lots of
reconnections.

**Connections Flood**: Should the connections count continually increase over time, this may indicate stale connections
from processes that can't finish.

## Troubleshooting

If you see a sudden spike, please check if there were any recent changes to the Lambda Concurrency in the TE. Also look
for the TEF parameters WorkerLambdaMessageBatch and WorkerLambdaMaxDBConnections, these should be the same value and
most of the time it is 2. It is configured to 4 in rare occasions. For immediate fix, try reducing the lambda
concurrency as this does not require and downtime.

To permanently make changes to increase the number of connections, please update the TED and increase the value for
MaxConnections to a desirable number along with the MaxConnectionsAlarmThreshold. This will reboot the database and you
do not want to miss the events when the instance is not available, hence it is highly recommended to stop the events
from flowing to the system and backed up in the queue during the database changes.

### Need help?

Please reach out to [Turbot Support](mailto:support@turbot.com) with the collected information.

* A screenshot of the RDS instance's Configuration tab.
* A screenshot of the RDS instance's Monitoring tab showing the "DB Connections (Count)" metric.
* The configuration values of the parameters `MaxConnections` and `MaxConnectionsAlarmThreshold` for the database.
