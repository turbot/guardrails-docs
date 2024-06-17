---
title: "Freeable Memory"
template: Documentation
nav:
  title: "Freeable Memory"
  order: 60
---

# Freeable Memory (MB)

**AlarmName**: `<prefix>_<hive>_primary_freeable_memory_alarm` (
example: `turbot_einstein_primary_freeable_memory_alarm`)

**Configuration**: You can change the CPU and memory available to a DB instance by changing its
DB [instance class](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.DBInstanceClass.html). The DB
Instance class is configured in the "Database - Configuration" section of TED.

`InstanceClass`: Instance Type for DB. Defaults to db.t3.small but almost all production installations have a basic
graviton instance.

**Condition**: FreeableMemory <= 1024 for 1 datapoints within 15 minutes

**Healthy**: Available memory is in a consistent range with plenty of extra space to absorb spikes Sawtooth patterns are
also common.

**Memory Starved**: When a DB instance has consistently low memory available, there can be significant performance
penalties as the DB uses swap disk space.

## Troubleshooting

To increase the DB memory allocation, please increase the database to a higher instance type through the TED parameter
Instance Type for DB.

If there is enough memory available with low CPU utilization but the workspace is still performing slow, try increasing
the shared_buffer from default 25% to 40%. In order to do so, update the TED parameter "Shared Buffers"
from `{DBInstanceClassMemory/32768}` to `{DBInstanceClassMemory/20480}`. Flip the TE "Parameter Deployment Trigger"
switch from Blue <-> Green once the TED changes are done. PostgreSQL relies heavily on the operating system for its
caching (double buffering). As a result, allocating more than 40% of RAM to shared_buffers is unlikely to perform better
than a smaller value.

Increasing the shared_buffer to 40% on an installation where there are multiple large workspaces running on a same
database, might not help. This may require to split the workspace to its own database.

### Need help?

Please reach out to [Turbot Support](mailto:support@turbot.com) with the collected information.

* A screenshot of the RDS instance's Configuration tab.
* A screenshot of the RDS instance's Monitoring tab showing the "Freeable Memory (MB)" metric.
