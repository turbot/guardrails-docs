---
title: Service Catalog Out of Sync
sidebar_label: Service Catalog Out of Sync
---

# Service Catalog Out of Sync

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


## Step 2: Check Stack Failure Details

In the selected provisioned product, select the **Events** tab, in `UPDATE_PROVISIONED_PRODUCT` section select **View details**.

![View Details](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/ted-tained-status-view-details.png)

This will bring up `Error` window with **StatusReason**.

![Status Reason Storage Mismatch](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/ted-tained-status-view-details-reason-invalid-storage-size.png)

Select **View more in CloudFormation** to navigate to CloudFormation stack. This will display **Error Message** as

`Resource handler returned message: "Invalid storage size for engine name postgres and storage type gp3: 210 (Service: Rds, Status Code: 400, Request ID: d93b7008-0506-443d-a849-dc1c42b49656)"`

![Update Failed](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/ted-cfn-stack-invalid-storage-size.png)

<!-- `Resource handler returned message: "You can't currently modify the storage of this DB instance. Try again after approximately 1 hours. (Service: Rds, Status Code: 400, Request ID: 204c3dfd-ec84-47fd-9ec8-0f8ddb0d25ba)" (RequestToken: c075be89-6fee-0a9a-8cf7-8b0faa043048, HandlerErrorCode: InvalidRequest)` -->

> [!NOTE]
> The most common cause of this issue is an increase in database storage due to auto-scaling or manual update of DB storage directly in AWS console. Attempting to modify TED while in this state will result in an error.

## Step 3: Review Changes

- [ ] Open the AWS Console and navigate to the **RDS** service in the region where TED is deployed.

![AWS RDS Service](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/aws-rds-service-console.png)

- [ ] Find the **DB Instance** associated with your TED stack.

![TED RDS Instance](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/ted-rds-instance.png)

- [ ] Navigate to the DB Instance **Configuration** and check for `Storage`

![TED RDS Instance Configuration](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/ted-rds-instance-configuration.png)

- [ ] Compare the actual **Configuration** settings of the RDS instance with the CloudFormation **Parameter** values in the TED stack.

![CloudFormation Stack Parameter](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/ted-cfn-service-catalog-stack-paramater.png)

<!-- ## Step 4: Resolution Should we have resolution section?-->

## Step 4: Find Root Cause

Select CloudFormation stack **Events** tab

![CFN Stack Root Cause](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/ted-cfn-stack-root-cause.png)

Select **Detect root cause**

![CFN Stack Root Cause Details](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/ted-cfn-stack-root-cause-details.png)

## Step 5: Check CloudFormation Stack

CloudFormation stack does not allow updates when the **Update** button is `grayed` out. This indicates that the stack is in a state that prevents updates. Any changes attempted during this state will fail.

![CFN Stack Grayed Out](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/ted-cfn-stack-grayed-out.png)

## Step 6: Fix CloudFormation Stack

To proceed with aligning the Service Catalog TED stack with the actual configuration of the RDS instance, fix the CloudFormation stack from `UPDATE_ROLLBACK_FAILED` to `UPDATE_ROLLBACK_COMPLETE`.

From **Stack actions** dropdown select **Continue update rollback**.

![Continue Rollback Action](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/ted-stack-continue-rollback-action.png)

A new window titled **Continue update rollback** will appear. In the **Advanced Troubleshooting** section, select check the box next to **HivePrimary** under `Resources to skip - optional` section to rollback for that specific resource. Select the **Continue update rollback** button.

![Continue Update Rollback](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/continue-update-rollback.png)

This should successfully transition the stack to `Update Rollback Complete`, making it available for further updates with the **Update** now activated.

![Update Rollback Complete](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/ted-cfn-stack-update-rollback-complete.png)

## Step 7: Execute Service Catalog Stack Update

Navigate to Service Catalog and update the TED product. Ensure the parameter values match exactly with the current RDS DB instance storage setting. For instance, if RDS storage auto-scaled or manually updated from 200 GB to 225 GB, update the Service Catalog product's TED stack `Allocated Storage in GB` field to 225 GB to reflect the actual RDS value.

![Service Catalog TED Storage Size](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/ted-stack-rde-updated-storage-size.png)

Initiate Service Catalog [TED **Update**](/guardrails/docs/runbooks/enterprise-install/update-ted). CloudFormation will check for changes. If there are no discrepancies, the stack will transition to `Update Complete`.

![Status Available in Service Catalog](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/service-catalog-status-available.png)

## Step 8: Review CloudFormation Stack

![Update Complete](/images/docs/guardrails/runbooks/troubleshooting/service-catalog-out-of-sync/update-complete.png)

If you continue to encounter issues, please [Open Support Ticket](https://support.turbot.com) and attach the relevant information to assist you more efficiently.

- A screenshot of the CloudFormation Events tab for the TED stack.
- A screenshot of the Service Catalog with provisioned products.
