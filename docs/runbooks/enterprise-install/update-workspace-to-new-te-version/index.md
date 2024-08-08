---
title: Update Workspace to new TE Version
sidebar_label: Update Workspace to new TE Version
---

# Update Workspace To New TE Version

In this runbook, you will:
- Update a workspace to a new TE version using AWS CloudFormation

## Prerequisites

- Access to the Guardrails master account.
- Administrator privileges.
- Desired TE version(s) installed.
- Familiarity with AWS Console and CloudFormation service.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the CloudFormation service in the region where your workspace is deployed.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-to-new-te-version/update-workspace-aws-console.png)

## Step 2: Select the Guardrails Workspace Stack

Select the hamburger menu in the top left and choose **Stacks**.

![Stacks Selection](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-to-new-te-version/update-workspace-select-stacks.png)

Select the **Guardrails workspace stack**, then choose Update.

![Workspace Stack](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-to-new-te-version/update-workspace-select-workspace-stack.png)

## Step 3: Update the Stack

Select **Use existing template** and click Next.

![Select Existing Template](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-to-new-te-version/update-workspace-select-existing.png)

Modify the Version to match the new TE version number used in the TE stack (e.g., 5.x.x), then click Next.

![Select Existing Template](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-to-new-te-version/update-workspace-modify-te-version.png)

Click Next on **Configure stack options**. Review the Changes under **Changeset Preview** and click Submit.

![Review Changeset](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-to-new-te-version/update-workspace-review-update.png)

## Step 4: Review

You have successfully updated the Workspace to point towards the desired TE version. Now you can monitor the workspace for any issues post-update and document any anomalies.

- [ ] The updated workspace stack should appear with the status **UPDATE_IN_PROGRESS**. 

![Verify Status](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-to-new-te-version/update-workspace-in-progress.png)

- [ ] On completion workspace stack should appear with the status **UPDATE_COMPLETE**.

![Update Complete](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-to-new-te-version/update-workspace-complete.png)

- [ ] Open the Guardrails console admin panel to verify the updated TE version.

![Guardrails Console Admin Panel](/images/docs/guardrails/runbooks/enterprise-install/update-workspace-to-new-te-version/update-workspace-guardrails-console.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [TE architecture](https://turbot.com/guardrails/docs/enterprise/architecture).
- Learn about [Installing TE stacks](https://turbot.com/guardrails/docs/enterprise/installation/te-installation).

## Troubleshooting

### Update Fails or Takes Too Long

Check the CloudFormation stack events tab for errors. If there are any errors, create a support ticket and include relevant screenshots of the errors.

### Workspace Shows Old TE version

Clear the browser cache and re-login to the workspace.
