---
title: Disconnect Account from Guardrails Workspace Using Script
sidebar_label: Disconnect Account from Guardrails Workspace Using Script
---

# Disconnect an AWS account from a Guardrails workspace Using Script

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

## Step 1: Clone Guardrails Samples Github Repo

Go to [guardrails-samples](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/remove_aws_account) and clone the repository.

![Clone Repository](/images/docs/guardrails/guides/aws/decommission/github-guardrails-samples-repo.png)

## Step 2: Navigate to Remove AWS Account Directory

In the cloned repository, navigate to the following folder:

`guardrails_utilities/python_utils/remove_aws_account`

## Step 3: Run AWS Remove Account Script

Refer to the [README](https://github.com/turbot/guardrails-samples/blob/main/guardrails_utilities/python_utils/remove_aws_account/README.md) for further instructions on how to set up and run the `remove_aws_account` script.

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Account Disconnection Fails | Account cannot be disconnected even after drastic reductions in resource counts. | please open a ticket with [Turbot Support](mailto:help@turbot.com) for further assistance. |
| Remove from Turbot Dropdown Unavailable | The Remove from Turbot action is unavailable on the resource detail page. | Reach out to your Guardrails workspace administrator to validate proper access. |
| Common errors                     | Common issues that may prevent controls from running include network connectivity problems, permission issues, and API rate limits. These can cause controls to enter an error state. | Refer to [Common Troubleshooting](/guardrails/docs/guides/troubleshooting) for detailed resolution steps. |
| Further Assistance                       | If you encounter further issues, please open a ticket with us and attach the relevant information to assist you more efficiently. | [Open Support Ticket](https://support.turbot.com) |