---
title: Service Catalog Out of Sync with CloudFormation
sidebar_label: Service Catalog Out of Sync with CloudFormation
---

# Service Catalog Out of Sync with CloudFormation

When working with the TED (Turbot Enterprise Database) stack, you may encounter an issue where the Service Catalog Provisioned Product, CloudFormation Stack, or the physical RDS instance becomes out of sync. This can prevent you from applying necessary changes or updates to the database, and may result in the TED provisioned product in the Service Catalog changing to a `Tainted` status.

![Tainted Status](/images/docs/guardrails/runbooks/troubleshooting/update-ted/service-catalog-out-of-sync/ted-tained-status.png)

## Issue

The most common cause of this issue is that database storage has been increased due to auto-scaling. Attempting to modify TED in this state will lead to an error.

![Update Failed](/images/docs/guardrails/runbooks/troubleshooting/update-ted/service-catalog-out-of-sync/invalid-storage-size.png)

**Error Message**:

"Invalid storage size for engine name postgres and storage type gp3: 200 (Service: Rds, Status Code: 400, Request ID: 342ab11a-04fd-4dcd-b213-7e4cacf7bb8d)"

## Steps to Resolve

### Step 1: Verify the Actual Changes

  - Open the AWS Console and navigate to the RDS Service.
  - Locate the specific DB instance associated with your TED stack.
  - Compare the actual configuration settings of the RDS instance with the parameter values of the TED stack.
  - Update the TED stack according to the actual configuration. 

### Step 2: Move the CloudFormation Stack from FAILED to COMPLETE

- You may find that the CloudFormation Stack does not allow updates, with the "Update" button grayed out. Any changes attempted during this state will fail since the stack cannot be updated.
- Select the stack, click the "Stack actions" dropdown button, and choose "Continue update rollback."
- A new window titled "Continue update rollback" will pop up.
- Under the "Advanced Troubleshooting" section, check "HivePrimary" under "Resources to skip - optional." This will skip the rollback operation on that resource.

![Continue Update Rollback](/images/docs/guardrails/runbooks/troubleshooting/update-ted/service-catalog-out-of-sync/continue-update-rollback.png)

- Click the "Continue update rollback" button.

- This should successfully transition the stack to "Update Rollback Complete," making it available for further updates.

![Update Rollback Complete](/images/docs/guardrails/runbooks/troubleshooting/update-ted/service-catalog-out-of-sync/update-rollback-complete.png)

### Step 3: Proceed with Stack Updates

- Navigate to Service Catalog and update the TED product. Ensure the parameter values match exactly with those on the physical resource. For instance, if RDS storage auto-scaled from 250 GB to 259 GB, update the Service Catalog product's "Allocated Storage in GB" field to 259 GB to reflect the actual RDS value.

- Click "Update" product for TED in Service Catalog.

- CloudFormation will check for changes. If there are no discrepancies, the stack will transition to "Update Complete."

![Update Complete](/images/docs/guardrails/runbooks/troubleshooting/update-ted/service-catalog-out-of-sync/update-complete.png)

### Having Issues?

If you're still facing issues, open a ticket at https://support.turbot.com and provide the following information:

- A screenshot of the CloudFormation Events tab for the TED stack.
- A screenshot of the Service Catalog with provisioned products.