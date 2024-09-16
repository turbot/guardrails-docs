---
title: Update TED
sidebar_label: Update TED
---

# Update Turbot Guardrails Enterprise Database (TED)

In this runbook, you will:
- Use AWS Service Catalog to update Turbot Guardrails Enterprise Database (TED).
- Monitor and troubleshoot the TED update process.

[Turbot Guardrails Enterprise Database (TED)](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) is an AWS Service Catalog product that provides automated configuration and management of the infrastructure needed to run the enterprise version of Turbot Guardrails in your AWS account.

TED is the database layer of a Turbot Guardrails Enterprise deployment. Creates and manages the Guardrails database infrastructure [Hive](https://turbot.com/guardrails/docs/reference/glossary#hive), which defines physical database and caching resources shared by multiple workspaces.

## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with AWS Console, Service Catalog and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region where TED is deployed.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/update-ted/ted-update-aws-console.png)

## Step 2: Navigate Provisioned Products

Choose **Provisioned Products** from the left navigation menu.

![Provisioned Product](/images/docs/guardrails/runbooks/enterprise-install/update-ted/ted-update-service-catalog.png)

## Step 3: View Provisioned Products

Change the **Access Filter** in AWS Service Catalog from **User** to **Account** to view all TED provisioned products across the entire account.

![Access Filter](/images/docs/guardrails/runbooks/enterprise-install/update-ted/ted-update-access-filter.png)

## Step 4: Find Provisioned Product

The TED provisioned product is identifiable by a postfix that matches the database Hive name.

![Find TED](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-find-ted.png)

From the **Actions** menu, select **Update**

![Select Update](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-actions-update.png)

## Step 5: Find Version

Sort the Product versions section by **Created time** (descending) to see the latest available version.

![Find TED Version](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-find-versions.png)

## Step 6: Select Version

Select the desired TED version under **Product Versions**.

![Select TED Version](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-select-version.png)

## Step 7: Verify Parameters

The values of the parameters will initially be set to match previous run of the product. Review the [release notes](https://turbot.com/guardrails/changelog?tag=ted) for the TED versions between the existing version and the version you are updating to, and identify any new parameters that require a decision about how they will be set. Generally, new parameters will be created in a way to have the least disruption on an existing environment, but care should still be taken to understand these and read any new parameter descriptions to understand their impact.

![Parameters Verification](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-verify-parameters.png)

> [!NOTE]
> A frequent issue arises when databases employ auto-scaling storage. Discrepancies in storage figures between the stack and the product can occur if the database has expanded since installation.
> Upgrading to a major version can introduce significant changes and potential risks. You should not upgrade to a new major version without first consulting with Turbot Support.
> To ensure cost-efficiency, review and update instance types and Elasticache Versions at least annually to align with the latest supported options.

## Step 8: Update TED

After verifying any changes to existing parameters, select **Update** at the bottom of the screen.

![Select Update](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-select-update.png)

## Step 9: Monitor Update

You have initiated the installation of the new TED version. This triggers an update of several nested CloudFormation stacks.

> [!NOTE]
> Depending on the changes selected, the database resource can remain in an updating state for an extended period of time. Viewing the state of the RDS instance(s) in the RDS web console can often provide some context about what is happening at any given time.

Select the TED Provisioned Product, select the **Outputs** tab, and use the **CloudFormationStackARN** **Value** link to navigate to the CloudFormation stack and monitor the update progress.

![Navigate ](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-navigate-cfn.png)

The TED CloudFormation stack status should change to `UPDATE_IN_PROGRESS` indicating the update process is in progress.

![Update Progress ](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-update-cfn-progress.png)

## Step 10: Review

- [ ] The TED CloudFormation stack status should change to `UPDATE_COMPLETE` indicating the update completed successfully.

![Verify Status](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-cfn-complete.png)

- [ ] The TED `Provisioned product` status should change to `Available`.

![TED Provisioned Product Complete Status](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-update-complete.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Turbot Guardrails Enterprise - Architecture](/guardrails/docs/enterprise/architecture).
- Learn about [TED Installation](/guardrails/docs/enterprise/installation/ted-installation)

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Permission Issues                        | If the current logged-in user lacks permission to modify, update, or create resources in the stack, or if IAM roles or SCPs have changed, preventing built-in roles from accessing needed configuration settings.   | [Troubleshoot Permission Issues](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators)             |
| Stack Rollback Failure Due to Database State                   | If the CloudFormation stack attempts to roll back but fails because the database is in a state (e.g., Upgrading, Backing Up) that prevents a successful rollback.                                                  | [Troubleshoot Rollback Failures](/guardrails/docs/runbooks/troubleshooting/database-instance-not-in-available-state#database-instance-not-in-available-state)                  |
| Service Catalog Sync Issue               | If the Service Catalog Provisioned product, CloudFormation Stack, or the physical RDS instance becomes out of sync, causing issues with updates or resource management.                                              | [Troubleshoot Sync Issues](/guardrails/docs/runbooks/troubleshooting/service-catalog-out-of-sync#service-catalog-out-of-sync-with-cloudformation)                            |
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |

