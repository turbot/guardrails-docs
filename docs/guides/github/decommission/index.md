---
title: Decommission Organization
sidebar_label: Decommission Organization
---

# Decommission Organization

In this guide, you will:

- Learn how to decommission a GitHub organization from a Guardrails workspace while managing associated resources effectively.

Guardrails allows administrators to remove a [GitHub Organization](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/about-organizations) from a workspace. The delete action removes all associated policies and references from the Guardrails database, but `does not delete any resources` from the target GitHub organization.

<!-- Careful consideration should be made when managing resources such as webhooks, as once removed, these changes cannot be undone. -->

> [!IMPORTANT]
> Before starting the process, administrators should determine whether Guardrails-managed resources (e.g., [webhooks](https://docs.github.com/en/webhooks/about-webhooks)) should remain in the organization. The following policies can be configured in Guardrails to facilitate cleanup. Ensure that these changes are applied **only to the target GitHub organization**.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Familiarity with the Guardrails console.
- Familiarity with the GitHub.

<!-- DISCUSS THE SEQUENCE, WEBHOOKS SETUP WITH SD -->

## Disable Event Handlers

Disable Event Handlers associated with `GitHub > Organization > Event Handlers` with value set to `Enforce: Disabled`. This removes Guardrails-configured webhooks. Once these policies have been applied and the associated controls have completed their cleanup, the GitHub organization can be safely removed from the Guardrails workspace.

## Remove Credentials Policies

Delete the policy `GitHub > Config > Personal Access Token` configured for the target GitHub organization. This ensures that Guardrails no longer has access to the organization.

## Delete Organization

Login to the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/github/decommission-github-organization/guardrails-console-login.png)

Navigate to the `Organization` that needs to be removed.

Image

Select the **Actions** button in the top-right corner and choose **Actions** button in the top-right corner.

Image

Select the **Remove from Turbot**.

> [!NOTE]
> If you don’t see this button, contact your Guardrails administrator for the required permissions.

In the popup window, copy the `Organization ID` and paste it into the text box. Select **Delete**.

Image

> [!IMPORTANT]
> While the deletion is reversible by re-importing the organization, it can be resource-intensive. Double-check all configurations before proceeding.

## Verify

Guardrails will begin the deletion process. The time to complete the process depends on the number of policies and resources associated with the organization. Larger organizations may take longer.

After completing the steps above, verify that the GitHub organization no longer appears in the Guardrails console. Ensure that no residual event handlers or configurations remain.

## Next Steps

Please see the following resources to learn more about Turbot Guardrails:

- Learn more about [Managing GitHub Organizations](guides/github/manage-organizations).

## Troubleshooting

| Issue                  | Description                                                                                                                                  | Guide                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Deletion Errors**    | Errors may occur due to database locks or incomplete cleanup. Ensure all event handlers and policies have been removed before retrying.      | [Troubleshoot Deletion Issues](/guardrails/docs/github/troubleshooting#deletion-errors) |
| **Further Assistance** | If issues persist after troubleshooting, open a support ticket with details such as screenshots and error messages for efficient resolution. | [Open Support Ticket](https://support.turbot.com)                                       |
