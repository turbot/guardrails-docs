---
title: "Free Storage Space"
template: Documentation
nav:
  title: "Free Storage Space"
  order: 50
---

# Free Storage Space (MB)

**AlarmName**: `{prefix}_{hive}_free_storage_alarm` (example: `turbot_einstein_free_storage_alarm`)

**Configuration**: The DB allocated storage and the max allocated storage are configured in the "Database - Advanced -
Storage" section of the TED in Service Catalog. Once the storage is allocated, you can not reduce it.

**AllocatedStorage**: The initial storage (in GB) that will be allocated to the database. To enable storage auto-scaling
specify Max Allocated Storage parameter higher than the Allocated Storage. AWS will automatically resize the allocated
storage up to the Max Allocated Storage capacity.

**MaxAllocatedStorage**: To enable storage autoscaling, specify the maximum DB Storage limit to which the instance can
be auto-scaled, this should be greater than the Allocated Storage size but less than 65536 (GB). Leave the value to
default 0, to disable storage autoscaling. Note that storage autoscaling is supported only for General Purpose SSD or
Provisioned IOPS SSD storage type.

**Condition**: FreeStorageSpace <= 100000 for 3 datapoints within 15 minutes

**Healthy**: There is sufficient storage headroom for future growth.

**Low Space**: Low free space may cause errors in Guardrails. Zero free space may lead to data loss and missed events.

## Troubleshooting

### What is the usual storage growth?

You should see a gradual increase in the storage(in GB) utilization over the months. In other words, you should notice a
gradual decrease in the Free Storage Space. You may also observe a small drop and raise in the free storage at regular
intervals. This is due to recreation of the indexes as part of the maintenance cleanup job.

### What does the maintenance cleanup job do?

The Maintenance Cleanup job re-creates the indexes (based on bloat factor) and when the indexes are re-created, it
shrinks the indexes and thus prevents the database from unbounded growth. The cleanup job logs can be found in the
maintenance log group. Example: `CloudWatch > Log groups > /turbot/5_39_6/maintenance > All events`. The drop and
reclaim size may vary from one environment to another. If you have multiple TE versions running simultaneously, check
the maintenance logs of the latest TE version. If you find any errors in the maintenance logs, please report to [Turbot
Support](mailto:help@turbot.com) with the TE version and the log files.

### What is the recommended setting?

Storage type of `gp3` with storage autoscaling and adequate free storage space is recommended. Please consider the below
points as well.

Storage once allocated can not be reduced, so make sure the max allocated storage is neither too high nor too low. Turn
on the storage autoscaling with a considerable max limit.

The TED parameter `AllocatedStorage` is the allocated storage and `MaxAllocatedStorage` is the maximum allocation it can
autoscale to. If the parameter `MaxAllocatedStorage` is not set, then the autoscaling is turned off.

If the Autoscaling is turned on, the Storage autoscaling can happen based on the following criteria. The additional
storage is in increments of whichever of the following is greater:

* 5 GiB
* 10 percent of currently allocated storage
* Storage growth prediction for 7 hours based on the FreeStorageSpace metrics change in the past hour. For more
  information on metrics, see Monitoring with Amazon CloudWatch.

If storage autoscaling happens, the Service Catalog, CloudFormation stack and the actual RDS resource will go out of
sync. Make sure to update the Service Catalog with the new storage allocation value to sync the resource with the stack.
If the disk size in in Service Catalog is less than RDS, Cloudformation will error out in an attempt to decrease the
disk size.

### Can I increase the storage without using Autoscaling?

To increase the storage on demand, update the parameter `AllocatedStorage` in TED to a new desired value.

### Things to Note before making changes to Storage/IOPS?

When the storage or IOPS of an instance is changed, the RDS instance goes to "storage-optimization" state for about 6
hours or until the optimization is done. The database is operational at this point but any changes you make to the
database will error out "InvalidDBInstanceState" until the DB comes back to "available" state. Hence, make the Storage
related changes at the end if you have any other TED changes to make.

When the database is down for storage increase, you do not want to miss the events, hence it is highly recommended to
stop the events from flowing to the system and backed up in the queue during the database changes. Event flow can be
halted by disabling the triggers of the worker lambdas. Halting event processing will cause a backlog in the Events
queue but this will come down after restoring worker lambda concurrency.

### Need help?

Please reach out to [Turbot Support](mailto:support@turbot.com) with the collected information.

* A screenshot of the RDS instance's Configuration tab.
* A screenshot of the RDS instance's Monitoring tab showing the "Free Storage Space (MB)" metric.
