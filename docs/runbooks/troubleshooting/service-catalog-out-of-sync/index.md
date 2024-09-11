---
title: Service Catalog Out of Sync with CloudFormation
sidebar_label: Service Catalog Out of Sync with CloudFormation
---

# Service Catalog Out of Sync with CloudFormation

In this runbook, you will:
- Use AWS Service Catalog to manage Turbot Guardrails Enterprise Database.
- Troubleshoot out-of-sync issues between Service Catalog and CloudFormation.

When working with the [TED (Turbot Enterprise Database)](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) stack, you may encounter an issue where the Service Catalog Provisioned Product, CloudFormation Stack, or the physical RDS instance becomes out of sync. This can prevent you from applying necessary changes or updates to the database, and may result in the TED provisioned product in the Service Catalog changing to a `Tainted` status.

## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.


## Step 1: Check Provisioned Product Status

While executing the [TED update](/guardrails/docs/runbooks/enterprise-install/update-ted#update-turbot-guardrails-enterprise-database-ted), check if the provisioned product in the Service Catalog changing to a `Tainted` status.

![Tainted Status](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/ted-tained-status.png)


The most common cause of this issue is an increase in database storage due to auto-scaling. Attempting to modify TED while in this state will result in an error.

![Update Failed](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/invalid-storage-size.png)

**Error Message**:

`Invalid storage size for engine name postgres and storage type gp3: 200 (Service: Rds, Status Code: 400, Request ID: 342ab11a-04fd-4dcd-b213-7e4cacf7bb8d)`


## Step 2: Verify the Actual Changes


- Open the AWS Console and navigate to the **RDS** service.
- Locate the specific **DB Instance** associated with your TED stack.
- Compare the actual configuration settings of the RDS instance with the parameter values in the TED stack.
- Update the TED stack to align with the actual configuration of the RDS instance.

## Step 3: Move the CloudFormation Stack from FAILED to COMPLETE

- If the CloudFormation stack does not allow updates, and the **Update** button is `grayed` out, this indicates that the stack is in a state that prevents updates. Any changes attempted while in this state will fail.
- To resolve this, select the stack, then select the **Stack actions** dropdown button, and choose **Continue update rollback**.
- A new window titled **Continue update rollback** will appear.
- Under the `Advanced Troubleshooting` section, check the box next to **HivePrimary** under `Resources to skip - optional`. This action will `skip` the rollback for that particular resource.

![Continue Update Rollback](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/continue-update-rollback.png)

- Select the **Continue update rollback** button.

- This should successfully transition the stack to `Update Rollback Complete`, making it available for further updates.

![Update Rollback Complete](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/update-rollback-complete.png)

## Step 4: Proceed with Stack Updates

- Navigate to Service Catalog and update the TED product. Ensure the parameter values match exactly with those on the physical resource. For instance, if RDS storage auto-scaled from 250 GB to 500 GB, update the Service Catalog product's `Allocated Storage in GB` field to 500 GB to reflect the actual RDS value.

- Select **Update** product for TED in Service Catalog.

- CloudFormation will check for changes. If there are no discrepancies, the stack will transition to `Update Complete`.

![Update Complete](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/update-complete.png)

## Facing Issues?

If you're still facing issues, open a ticket at https://support.turbot.com and provide the following information:

- A screenshot of the CloudFormation Events tab for the TED stack.
- A screenshot of the Service Catalog with provisioned products.