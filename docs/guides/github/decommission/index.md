---
title: Decommission GitHub Organization
sidebar_label: Decommission GitHub Organization
---

# Decommission GitHub Organization

In this guide, you will:
- Learn how to decommission a GitHub organization from a Guardrails workspace while managing associated resources effectively.

Guardrails allows administrators to remove a GitHub organization from a workspace. The delete action removes all associated policies and references from the Guardrails database, but **does not delete any resources** from the target GitHub organization. Careful consideration should be made when managing resources such as webhooks, permissions, and audit logs, as once removed, these changes cannot be undone.

Before starting the process, administrators should determine whether Guardrails-managed resources (e.g., webhooks, event subscriptions) should remain in the organization. The following policies can be configured in Guardrails to facilitate cleanup. Ensure that these changes are applied **only to the target GitHub organization**.

1. `GitHub > Turbot > Permissions` set to `Enforce: None`. This removes Guardrails-managed roles and permissions in the organization.
2. `GitHub > Turbot > Event Handlers > Webhooks` set to `Enforce: Not Configured`. This removes Guardrails-configured webhooks.
3. `GitHub > Turbot > Event Poller` set to `Disabled`. This disables the polling of events into Guardrails.

Once these policies have been applied and the associated controls have completed their cleanup, the GitHub organization can be safely removed from the Guardrails workspace. You can customize these policies to target specific resources while retaining essential audit data.


## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Familiarity with the Guardrails console.


## Step 1: Remove Credentials Policies
Delete the policies `GitHub > Client Secret` and `GitHub > App Key` configured for the target GitHub organization. This ensures that Guardrails no longer has access to the organization.

## Step 2: Log in to the Guardrails Console
Log in to the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/github/decommission-github-organization/guardrails-console-login.png)

## Step 3: Navigate to the Organization
Using the Guardrails console, navigate to the GitHub organization that needs to be removed.

## Step 4: Delete the Organization
1. Click the **Delete** button in the top-right corner. If you don’t see this button, contact your Guardrails administrator for the required permissions.
2. In the popup window, copy the organization ID and paste it into the text box.
3. Click **Delete**. While the deletion is reversible by re-importing the organization, it can be resource-intensive. Double-check all configurations before proceeding.

## Step 5: Verify Deletion
Guardrails will begin the deletion process. The time to complete the process depends on the number of policies and resources associated with the organization. Larger organizations may take longer.

After completing the steps above, verify that the GitHub organization no longer appears in the Guardrails console. Ensure that no residual event handlers or configurations remain.


## Next Steps

Please see the following resources to learn more about Turbot Guardrails:

- Learn more about [Managing GitHub Organizations](guides/github/manage-organizations).
- Learn about [Permissions Policies for GitHub](guides/github/permissions).


## Troubleshooting

| Issue                                      | Description                                                                                                                                                                      | Guide                                |
|-------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------|
| **Deletion Errors**                        | Errors may occur due to database locks or incomplete cleanup. Ensure all event handlers and policies have been removed before retrying.                                          | [Troubleshoot Deletion Issues](/guardrails/docs/github/troubleshooting#deletion-errors) |
| **Further Assistance**                     | If issues persist after troubleshooting, open a support ticket with details such as screenshots and error messages for efficient resolution.                                     | [Open Support Ticket](https://support.turbot.com)   |