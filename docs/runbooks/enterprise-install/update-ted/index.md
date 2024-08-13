---
title: Updating TED
sidebar_label: Updating TED
---

# Update Turbot Guardrails Enterprise Database (TED)

In this runbook, you will:
- Use AWS Service Catalogue to update Turbot Guardrails Enterprise Database (TED)
- Learn how to monitor installations

**Turbot Guardrails Enterprise Database (TED)** provides an automated configuration and management of Turbot Guardrails database infrastructure to be used when installing/upgrading an enterprise deployment of the Turbot Software.

TED deploys a Turbot Hive, which defines physical database and caching resources shared by multiple workspaces.

## Prerequisites

- Access to the Guardrails master account.
- Administrator privileges.
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region where TED is deployed.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/update-ted/ted-update-aws-console.png)

## Step 2: Navigate To Provisioned Products

Choose **Provisioned Products** from the left navigation menu.

![Provisioned Product](/images/docs/guardrails/runbooks/enterprise-install/update-ted/ted-update-service-catalog.png)

## Step 3: Find TED Provisioned Product

The TED provisioned product is identifiable by a postfix that matches the database hive name.

![Find TED](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-find-ted.png)

Select **Actions** then select **Update**.

![Select Update](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-actions-update.png)

## Step 4: Find TED Version

Sort the Product versions section by Created time (descending) to see the latest available version.

![Find TED Version](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-find-versions.png)

## Step 5: Select TED Version

Select the desired TED version under `Product Versions`.

![Select TED Version](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-select-version.png)

## Step 6: Verify Parameters

The values of the parameters will initially be set to match previous run of the product. Review the [release notes](https://turbot.com/guardrails/changelog?tag=ted) for the TED versions between the existing version and the version you are updating to, and identify any new parameters that require a decision about how they will be set. Generally, new parameters will be created in a way to have the least disruption on an existing environment, but care should still be taken to understand these and read any new parameter descriptions to understand their impact.

![Parameters Verification](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-verify-parameters.png)

**Note**
```
- A frequent issue arises when databases employ auto-scaling storage. Discrepancies in storage figures between the stack and the product can occur if the database has expanded since installation.

- Updating to a major version number can introduce significant changes. It's recommended to upgrade to the highest available minor version within your current major version to minimize risks.

- To ensure cost-efficiency, review and update instance types at least annually to align with the latest supported options."
```

## Step 7: Update TED

After verifying any changes to existing parameters, select **Update** at the bottom of the screen.

![Select Update](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-select-update.png)

## Step 8: Review

You have initiated the installation of the new TED version. This triggers an update of several nested CloudFormation stacks.

```
Note: Depending on the changes selected, the database resource can remain in an updating state for an extended period of time. Viewing the state of the RDS instance(s) in the RDS web console can often provide some context about what is happening at any given time.
```

Select the TED Provisioned Product, click the Outputs tab, and use the `CloudFormationStackARN` link to navigate to CloudFormation and monitor the update progress.

![Navigate ](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-navigate-cfn.png)

- [ ] Upon completion the TED CloudFormation stack status should change to **UPDATE_COMPLETE** indicating the update completed successfully.

![Verify Status](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-cfn-complete.png)

- [ ] The TED provisioned product status should change to **Available**.

![TED Provisioned Product Complete Status](/images/docs/guardrails/runbooks/enterprise-install/update-ted/update-ted-update-complete.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Turbot Guardrails Enterprise - Architecture](https://turbot.com/guardrails/docs/enterprise/architecture).
- Learn about [TED Installation](https://turbot.com/guardrails/docs/enterprise/installation/ted-installation)

## Troubleshooting

Common errors with a TED update:

### Instance Type and Disk Size Mismatch
    - Problem: The selected instance type might not be available in the specified region or partition, or the database disk size might not align with the stack configuration.
    - Solution:
        Review the CloudFormation stack events to find the initial failure.
        Look for error messages related to instance type or disk size limitations.
        Resolve the issue by modifying the CloudFormation template to use a compatible instance type or adjust the disk size.

### Stack Rollback Failure Due to Database State
    - Problem: The CloudFormation stack attempts to roll back, but the database is in a state (Upgrading, Backing Up, etc.) that prevents successful rollback.  
    - Solution: 
        - Navigate to the CloudFormation console, select the failed stack, and go to the "Events" tab. Look for error messages related to the database or rollback failure.
        - Ensure the database is in a healthy and suitable state.
        - Choose the "Rollback" option and confirm the action.