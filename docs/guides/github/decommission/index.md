---
title: Decommission Organization
sidebar_label: Decommission Organization
---

# Decommission Organization

In this guide, you will:

- Learn how to safely remove a GitHub organization from a Guardrails workspace while managing associated resources.

Guardrails enables administrators to remove a [GitHub Organization](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/about-organizations) from a workspace. This action deletes all associated policies and references in the Guardrails database but **does not affect any resources** within the source GitHub organization.

> [!WARNING]
> Before starting the process, administrators should determine whether Guardrails-managed resources (e.g., [webhooks](https://docs.github.com/en/webhooks/about-webhooks)) should remain in the organization. The following policies can be configured in Guardrails to facilitate cleanup. Ensure that these changes are applied **only to the target GitHub organization**.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot level.
- Familiarity with the Guardrails console.
- Familiarity with GitHub.

## Step 1: Disable Event Handlers

Disable Event Handlers associated with `GitHub > Organization > Event Handlers` by setting the value to `Enforce: Disabled`. This action removes Guardrails-configured webhooks. Once these policies have been applied and the associated controls have completed their cleanup, the GitHub organization can be safely removed from the Guardrails workspace.


## Step 2: Remove Credentials Policies

Delete the policy `GitHub > Config > Personal Access Token` configured for the target GitHub organization. This ensures that Guardrails no longer has access to the organization.

---

## Step 3: Delete Organization

1. Log in to the Guardrails console.

   ![Guardrails Console Login](/images/docs/guardrails/guides/github/decommission-github-organization/guardrails-console-login.png)

2. Navigate to the `Organization` that needs to be removed.

   ![Navigate to Organization](/images/docs/guardrails/guides/github/decommission-github-organization/navigate-to-organization.png)

3. Select the **Actions** button in the top-right corner and choose **Remove from Turbot**.

   ![Remove from Turbot](/images/docs/guardrails/guides/github/decommission-github-organization/remove-from-turbot.png)

4. In the popup window, copy the `Organization ID` and paste it into the text box. Select **Delete**.

   ![Delete Organization](/images/docs/guardrails/guides/github/decommission-github-organization/delete-organization.png)

> [!IMPORTANT]
> If you don’t see the **Remove from Turbot** button, contact your Guardrails administrator to request the required permissions.

> While the deletion is reversible by re-importing the organization, it can be resource-intensive. Double-check all configurations before proceeding.


## Step 4: Verify

Guardrails will begin the deletion process. The time required to complete the process depends on the number of policies and resources associated with the organization. Larger organizations may take longer.

After completing the steps above, verify that the GitHub organization no longer appears in the Guardrails console. Ensure that no residual event handlers or configurations remain.

## Next Steps

Please see the following resources to learn more about Turbot Guardrails:

- Learn more about [Managing GitHub Organizations](guides/github/manage-organizations).


## Troubleshooting

| **Issue**              | **Description**                                                                                                                            | **Guide**                                                                                   |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **Deletion Errors**     | Errors may occur due to database locks or incomplete cleanup. Ensure all event handlers and policies have been removed before retrying.    | [Troubleshoot Deletion Issues](/guardrails/docs/github/troubleshooting#deletion-errors)     |
| **Further Assistance**  | If issues persist after troubleshooting, open a support ticket with details such as screenshots and error messages for efficient resolution. | [Open Support Ticket](https://support.turbot.com)                                           |