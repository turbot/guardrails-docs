---
title: "General Purpose SSD (gp3)"
template: Documentation
nav:
  order: 30
---

# General Purpose SSD (gp3)

## When to use this guide?

Use this guide to modify your RDS storage type to General Purpose SSD (gp3).

## Why gp3 storage?

AWS announced availability of General Purpose gp3 storage volumes for AWS RDS in November 2022. The new GP3 drives are
cheaper, higher performant and more flexible than `io1` and `gp2` storage.

On gp3 for storage volumes less than 400GB, Amazon RDS provides a baseline storage performance of 3000 IOPS and 125
MiBps, included with the price of storage. For storage volumes of 400GB or higher, the baseline storage performance
increases to 12,000 IOPS and 500 MiBps. This can be further scaled up to 64,000 IOPS for an additional cost. You can
find more details about gp3
storage [here](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html#gp3-storage) and pricing
details [here](
https://aws.amazon.com/rds/postgresql/pricing/#Database_Storage).

## What is the process involved?

The storage type change process is fairly smooth and involves the below steps:

1. Disable the events from being processed.
2. Upgrade the TED product in Service Catalog to 1.28.0 version.
3. Enable the events.
4. Login to the workspace and perform a sanity check.

## Disable the events

We do not want to miss the events for the time period that database is under change. Hence, we hold the events in the
SQS backlog queue by deactivating the Lambda triggers. If you are running a multi TE setup, you need to hold the events
for all the TE versions that are pointing to the concerned hive. Navigate to AWS Lambda service and search for the
functions that have the suffix `_worker`, `_worker_priority` and `_worker_retry`.

Below are some examples of how the Lambda Functions would look like:

* `turbot_5_39_8_worker_priority`
* `turbot_5_39_8_worker`
* `turbot_5_39_8_worker_retry`

In the above example, the installation prefix is "turbot" and the TE version pointing to the hive is 5.39.8. The prefix
or the TE version could be different from case to case.

* Navigate to each of these Lambda functions and click on the "Configuration" tab.
* Select "Triggers" sub-tab. Look for the trigger corresponding to the function.
* Choose the trigger by clicking on the checkbox and click on Edit.
* In the "Trigger configuration" page, uncheck the "Activate trigger" option to disable the events.

## Upgrade TED to 1.28.0

* In the primary (alpha) region of your installation, go to Service Catalog.
* Select the TED stack from the Provisioned products list.
* Select Actions > Update.
* Under Product versions, select the version v1.28.0 or higher.
* Under "Database - Advanced - Storage" section, update the necessary values as shown in the below example.

  If the Allocated Storage is less than 400GB:

    * Storage Type: gp3

    * Provisioned IOPS: 0

    * Storage Throughput: 0

      ![gp3-baseline](/images/docs/guardrails/gp3-baseline.png)

  If the Allocated Storage is 400GB or higher:

    * Storage Type: gp3

    * Provisioned IOPS: 12000

    * Storage Throughput: 500

      ![gp3-baseline-custom](/images/docs/guardrails/gp3-baseline-custom.png)

* Scroll to the bottom of the page and click on "Update" to make the above changes to the provisioned product.

When the storage or IOPS of an instance is changed, the RDS instance goes to "storage-optimization" state for about 6
hours or until the optimization is done. The database is operational at this point but any changes you make to the
database will error out "InvalidDBInstanceState" until the DB comes back to "available" state. The CloudFormation stack
and the Service Catalog product will be in "Updating.." status till the database comes to "available" status. This is
normal. For more details, please visit
this [link](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.StorageTypes.html#USER_PIOPS.ModifyingExisting).

## Enable the events

As soon as the database storage allocation changes are done, navigate to Lambda service and enable the triggers for the
functions which were disabled earlier. It is okay if the database is in "storage-optimization" state, you can enable the
events now.

* Navigate to each of these Lambda functions and click on the "Configuration" tab.
* Select "Triggers" sub-tab. Look for the trigger corresponding to the function.
* Choose the trigger by clicking on the checkbox and click on Edit.
* In the "Trigger configuration" page, check the "Activate trigger" option to enable the events.

This concludes the changes. The Guardrails console should be accessible, login should succeed and controls can be rerun.

## Facing issues?

Open a ticket with us on https://support.turbot.com and attach the below information.

* A screenshot of the RDS instance's Configuration tab.
* A screenshot of the RDS instance's "Logs & events" tab showing the "Recent events".
