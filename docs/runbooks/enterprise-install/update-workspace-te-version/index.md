---
title: Update Workspace TE Version
sidebar_label: Update Workspace TE Version
---

# Update Workspace TE Version

In this runbook, you will:
- Update a Guardrails workspace to a new TE version using AWS CloudFormation

A Guardrails [Workspace](/guardrails/docs/reference/glossary#workspace) is updated to a new version by referencing a newly installed [TE](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-te) product within the workspace stack. This ensures the workspace benefits from the latest TE features and improvements.

## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Desired TE version(s) installed.
- Familiarity with AWS Console and CloudFormation service.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the CloudFormation service in the region where your workspace is deployed.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-te-version/update-workspace-aws-console.png)

## Step 2: Select Guardrails Workspace Stack

From the left navigation menu choose **Stacks**.

![Stacks Selection](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-te-version/update-workspace-select-stacks.png)

search for the stack named **workspace**.

![Workspace Stack](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-te-version/update-workspace-select-workspace-stack.png)

Then choose Update

![Update Stack](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-te-version/update-workspace-select-update-stack.png)

## Step 3: Update Stack

Select **Use existing template** and click Next.

![Select Existing Template](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-te-version/update-workspace-select-existing.png)

Modify the Version to match the new TE version number used in the TE stack (e.g., 5.45.4), then click Next.

![Select Existing Template](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-te-version/update-workspace-modify-te-version.png)

Click Next on **Configure stack options**. Review the Changes under **Changeset Preview** and click Submit.

![Review Changeset](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-te-version/update-workspace-review-update.png)

## Step 4: Monitor Update

You have initiated the update of a new TE version in the Guardrails workspace. This triggers an update of several nested CloudFormation stacks.

[ ] The workspace CloudFormation stack status should change to `UPDATE_IN_PROGRESS` indicating the update process is in progress.

![Verify Status](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-te-version/update-workspace-in-progress.png)

## Step 5: Review

[ ] The workspace CloudFormation stack status should change to `UPDATE_COMPLETE` indicating the update completed successfully.

![Update Complete](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-te-version/update-workspace-complete.png)

[ ] Updated TE version should reflect in Guardrails console admin panel.

![Guardrails Console Admin Panel](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-te-version/update-workspace-guardrails-console.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [TE architecture](/guardrails/docs/enterprise/architecture).
- Learn about [Installing TE](/guardrails/docs/enterprise/installation/te-installation).

## Troubleshooting

### Stack Update Fails

Identifying the initial error in a `CloudFormation` template's event stream is crucial for effective troubleshooting. It often provides the root cause of the issue, preventing unnecessary investigations into subsequent errors that might be cascading failures.

- Navigate to `CloudFormation` service and select failed stack.
- Open `Events` tab, sort by `Timestamp` descending.
- Identify first event with status `UPDATE_FAILED`.
- Examine error message for failure details such as invalid parameters, resource limits, etc.
- Cross-reference error message with corresponding resource or parameter in CloudFormation template.

### Workspace Displays Incorrect TE Version

To resolve this issue, clear your browser cache and log back into the workspace.

If you encounter any issues, please open a ticket with us at https://support.turbot.com and attach the relevant information to assist you more efficiently.