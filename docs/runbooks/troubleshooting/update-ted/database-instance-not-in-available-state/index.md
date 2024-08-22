---
title: Database Instance Not in Available State
sidebar_label: Database Instance Not in Available State
---

# Database Instance Not in Available State

When working with the TED (Turbot Enterprise Database) stack, you might encounter an issue where the database instance is not in an `available` state. This can prevent you from making necessary changes or updates to the database.

## Issue Description

The most common reason for this issue is that the database is in a state where modifications are not allowed, such as `backing-up`. Attempting to make changes during this time will result in an error.

**Error Message Example**:
- "Database instance is not in available state. (Service: Rds, Status Code: 400, Request ID: 3f4bddc5-e656-4ebe-8efe-3b9bdcfac026)"

## Steps to Resolve

### Step 1: Verify Database State

1. **Access AWS Console**: 
   - Open the AWS Console and navigate to the RDS service.
   - Locate the specific DB instance associated with your TED stack.
   - Check the status of the DB instance. Ensure it is in an `available` state before proceeding with any updates or modifications.

   ![RDS Status](/images/docs/guardrails/runbooks/troubleshooting/ted-update/aws-rds-status.png)

### Step 2: Wait for the Database to Become Available

If the database is in a state such as `backing-up`, you will need to wait until the process is complete and the status changes to `available`. This may take some time depending on the operations being performed on the database.

### Step 3: Proceed with TED Stack Updates

Once the database instance is in an `available` state, you can proceed with any planned updates or modifications to the TED stack without encountering the error.

## Next Steps

After resolving the issue, it's important to monitor the database to ensure it remains in a healthy state. If you continue to experience issues, refer to the other troubleshooting scenarios available or consider reaching out to Turbot Support for further assistance.
