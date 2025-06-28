---
title: Disconnect Account from Guardrails Workspace
sidebar_label: Disconnect Account from Guardrails Workspace
---

# Disconnect an AWS account from a Guardrails workspace

In this guide, you will:
- Decommission Guardrails-managed resources in an AWS account.
- Disconnect the AWS account from the Guardrails workspace using the Guardrails console.

As part of regular Guardrails workspace maintenance, it is sometimes necessary to remove AWS accounts. This process involves two key steps: first, [Decommission Guardrails-managed resources](#decommission-guardrails-infrastructure) in the AWS account by updating relevant policy settings—administrators should assess whether to retain resources like S3 buckets or CloudTrail, though Event Handlers must always be removed; second, [Disconnect the AWS account from Guardrails](#disconnect-aws-account-from-guardrails) workspace, which is a change made only on the Guardrails side and does not affect the AWS account itself.

> [!NOTE] Disconnecting an AWS account from Guardrails will remove all child CMDB records and policy settings.

## Prerequisites

- Access to the Guardrails console with **Administrator** privileges.
- Familiarity with the Guardrails Policies.

## Disconnect AWS Account from Guardrails

When a user with sufficient permissions attempts to disconnect an AWS account, Guardrails will try to remove the
account, all child resources, controls, policy settings in a single SQL transactions. This is done for safety. Should
the transaction fail, it's trivial for the database to roll back to a known good state. The effect of this rollback is
that the account remains visible in Guardrails. AWS accounts with larger numbers of resources, the time required to
complete the transaction may exceed the statement timeout limit. 

## Step 1: Navigate to Account

In the Guardrails console, navigate to the account that needs to be removed.

![Select Account](/images/docs/guardrails/guides/aws/decommission/guardrails-select-account.png)

## Step 2: Delete Account

Select **Remove from Turbot** from the **Action** drop down in the top right. If you do not see it, reach out to your Guardrails workspace administrator for proper access.

![Remove from Turbot](/images/docs/guardrails/guides/aws/decommission/guardrails-delete-account.png)

Copy the account ID and paste in the text box and select **Delete**.

![Confirm Delete](/images/docs/guardrails/guides/aws/decommission/guardrails-confirm-delete.png)

> [!WARNING] While this is not irreversible (simply reimport the account), it can be time and resource consuming. Be sure to double and triple check!

Guardrails will begin the delete process. The time to complete the deletion will depend on the number of resources and policies that will be removed. The more resources that are being deleted, the longer the process will take.

> [!IMPORTANT]The disconnection step may time out due to a number of factors including but not limited to overall system load, and the number of resources in the account. The general aim is to reduce the number of resources in the account.

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Account Disconnection Fails | Account cannot be disconnected even after drastic reductions in resource counts. | please open a ticket with [Turbot Support](mailto:help@turbot.com) for further assistance. |
| Remove from Turbot Dropdown Unavailable | The Remove from Turbot action is unavailable on the resource detail page. | Reach out to your Guardrails workspace administrator to validate proper access. |
| Common errors                     | Common issues that may prevent controls from running include network connectivity problems, permission issues, and API rate limits. These can cause controls to enter an error state. | Refer to [Common Troubleshooting](/guardrails/docs/guides/troubleshooting) for detailed resolution steps. |
| Further Assistance                       | If you encounter further issues, please open a ticket with us and attach the relevant information to assist you more efficiently. | [Open Support Ticket](https://support.turbot.com) |