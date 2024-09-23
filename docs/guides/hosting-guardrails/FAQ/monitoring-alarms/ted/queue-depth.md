---
title: "Queue Depth"
template: Documentation
nav:
  title: "Queue Depth"
  order: 70
---

# Queue Depth (Count)

**AlarmName**: `<prefix>_<hive>_primary_disk_queue_depth_alarm` (
example: `turbot_einstein_primary_disk_queue_depth_alarm`)

**Configuration**: The number of I/O requests in the queue waiting to be serviced. These are I/O requests that have been
submitted by the application but have not been sent to the device because the device is busy servicing other I/O
requests. Time spent waiting in the queue is a component of latency and service time (not available as a metric). This
metric is reported as the average queue depth for a given time interval. Amazon RDS reports queue depth in 1-minute
intervals. Typical values for queue depth range from zero to several hundred. A higher queue-depth indicates a slower
storage performance. If you are seeing higher values of queue depth, you should review your storage and IOPS
configurations.

**Condition**: DiskQueueDepth > 50 for 1 datapoints within 45 minutes

**Healthy**: There is fewer number of I/O requests waiting in the queue before they can reach the disk.

## Troubleshooting

If the Queue depth is high and stays high, that mean insufficient IOPS to process the requests. If you are not
already using GP3 storage type which gives 12000 IOPS for storage allocation greater than 399GB, you should move to GP3
immediately.

If you are on GP3 or allocated 12000 IOPS already, and you still see the Queue Depth greater than 50 then check for trends in the IOPS requests.

* Is the Queue Depth high all day or is it only during a specific hour? Like a daily job or automation that runs or
  spins up lot of resources in no time and Guardrails is trying to keep up with it?
  Is it a one time activity that you can co-relate to the changes made in the workspace, like an account import, or a
  policy setting changed/added at top level in the hierarchy.
* If you observe that this is a one time activity then, give the system few minutes to settle down and let the retry
  logic take care of the rest. If this has a pattern then see what is the automation trying to do and work with Turbot
  Support to figure out how it can be optimized. If this is something that is happening all day, then navigate to
  Performance Insights of the database and capture the Top SQL and share the complete query with Turbot Support to
  troubleshoot further.

### Need help?

Please reach out to [Turbot Support](mailto:support@turbot.com) with the collected information.

* A screenshot of the RDS instance's Configuration tab.
* A screenshot of the RDS instance's Monitoring tab showing the "Write IOPS (Count/Second)", "Read IOPS (
  Count/Second)", "Total IOPS (Count/Second)" and "Queue Depth (Count)" metrics.
