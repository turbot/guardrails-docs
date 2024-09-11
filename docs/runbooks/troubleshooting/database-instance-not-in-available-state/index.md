---
title: Database Instance Not in Available State
sidebar_label: Database Instance Not in Available State
---

# Database Instance Not in Available State

When working with the [TED (Turbot Enterprise Database)](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) stack, you might encounter an issue where the database instance is not in an `Available` state. This can prevent you from making necessary changes or updates to the database and may cause the TED provisioned product in Service Catalog to change to a `Tainted` status.


## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Check Provisioned Product Status

While executing the [TED update](/guardrails/docs/runbooks/enterprise-install/update-ted#update-turbot-guardrails-enterprise-database-ted), check if the provisioned product in the Service Catalog changing to a `Tainted` status.

![Tainted Status](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/ted-tained-status.png)


The most common reason for this issue is that the database is in a state where modifications are not allowed, such as `Backing-up`. Attempting to make changes during this time will result in an error.

![Update Failed](/images/docs/guardrails/runbooks/troubleshooting/update-ted/database-instance-not-in-available-state/update-failed.png)

**Error Message**:

`Database instance is not in available state. (Service: Rds, Status Code: 400, Request ID: 3f4bddc5-e656-4ebe-8efe-3b9bdcfac026)`


## Step 2: Verify Database State

   - Open the AWS Console and navigate to the RDS service.
   - Locate the specific DB instance associated with your TED stack.
   - Check the status of the DB instance. Ensure it is in  is in an `Available` state before proceeding with any updates or modifications.

   ![RDS Status](/images/docs/guardrails/runbooks/troubleshooting/update-ted/database-instance-not-in-available-state/rds-status.png)

## Step 3: Wait for the Database to Become Available

If the database is in a state such as `Backing-up`, you will need to wait until the process is complete and the status changes to `Available`. This may take some time depending on the operations being performed on the database.

## Step 4: Proceed with TED Stack Updates

Once the database instance is in `Available` state, you can proceed with any planned updates or modifications to the TED stack without encountering the error.

## Facing issues?

Open a ticket with us on https://support.turbot.com and attach the below information.

* A screenshot of the RDS instance's Summary and Configuration tab.
* A screenshot of the CloudFormation Events tab for TED stack.
* A screenshot of the Service Catalog with provisioned products.
