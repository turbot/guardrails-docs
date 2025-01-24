---
title: Decommission Organization
sidebar_label: Decommission Organization
---

# Decommission Organization

In this guide, you will:

- Learn how to safely remove a GitHub organization from a Guardrails workspace while managing associated resources.
- Monitor and troubleshoot the event deletion process.

Guardrails enables administrators to remove a [GitHub Organization](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/about-organizations) from a workspace. This action deletes all associated policies and references in the Guardrails database but **does not affect any resources** within the source GitHub organization.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot level.
- Familiarity with the Guardrails console.
- Familiarity with GitHub.

## Step 1: Log in to Guardrails Console

Log into the Guardrails console with provided local credentials or by using any SAML based login.

![Guardrails Console Login](/images/docs/guardrails/guides/github/decommission/guardrails-console-login.png)

## Step 2: Disable Event Handlers

> [!WARNING]
> Before starting the process, administrators should determine whether Guardrails-managed resources (e.g., [webhooks](https://docs.github.com/en/webhooks/about-webhooks)) should remain in the organization. This policy is configured in Guardrails to facilitate cleanup. Ensure that these changes are applied **only to the target GitHub organization**.

Disable Event Handlers associated with `GitHub > Organization > Event Handlers` by setting the value to `Enforce: Disabled`. This action removes Guardrails-configured webhooks in your GitHub organization, allowing the organization to be safely removed from the Guardrails workspace.

Select the **Policies** tab. Search for `GitHub > Organization > Event Handlers` and check the current status as `Enforce: Enabled`, then select the **Edit** button in the top-right corner.

![Enforce Enabled](/images/docs/guardrails/guides/github/decommission/current-setting-enforce-enabled.png)

Set the policy to `Enforce: Disabled` and select **Update**.

![Enforce Disabled](/images/docs/guardrails/guides/github/decommission/enforce-disabled.png)

## Step 3: Check GitHub Organization Webhooks

Ensure the `GitHub > Organization > Event Handlers` control status is `OK`, and verify that your GitHub organization no longer has any webhooks created as part of the event handler setup. Refer to the verification steps provided in [Configuring Real-Time Event Handlers](/guardrails/docs/guides/github/real-time-events#step-5-verify).

![Removed Webhooks](/images/docs/guardrails/guides/github/decommission/removed-webhooks.png)


## Step 4: Remove Credential Policy

Delete the `GitHub > Config > Personal Access Token` policy configured for the target GitHub organization. This ensures that Guardrails no longer has access to the organization.

![Delete Personal Access Token Policy](/images/docs/guardrails/guides/github/decommission/delete-github-config-pat-policy.png)


## Step 5: Delete Organization

Select the **Resources** tab in Guardrails console and type your organization name in the search box to locate the resource. Navigate to the `Organization` that needs to be removed.

![Locate Organization](/images/docs/guardrails/guides/github/decommission/locate-organization.png)

Select the **Actions** button in the top-right corner and choose **Remove from Turbot**.

![Remove from Turbot](/images/docs/guardrails/guides/github/decommission/remove-from-turbot.png)

In the popup window, copy the resource name i.e. organization name and paste it into the text box. Select **Delete**.

![Delete Organization](/images/docs/guardrails/guides/github/decommission/delete-organization.png)

This completes the deletion of the organization from Guardrails.

> [!IMPORTANT]
> If you don’t see the **Remove from Turbot** button, contact your Guardrails administrator to request the required permissions.

> While the deletion is reversible by re-importing the organization, it can be resource-intensive. Double-check all configurations before proceeding.


## Step 6: Verify

Guardrails will begin the deletion process. The time required to complete the process depends on the number of policies and resources associated with the organization. Larger organizations may take longer.

After completing the steps above, verify that the GitHub organization no longer appears in the Guardrails console. Ensure that no residual event handlers or configurations remain.


## Troubleshooting

| **Issue**              | **Description**                                                                                                                            | **Guide**                                                                                   |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **Deletion Errors**     | Errors may occur due to database locks or incomplete cleanup. Ensure all event handlers and policies have been removed before retrying.    | [Troubleshoot Deletion Issues](/guardrails/docs/github/troubleshooting#deletion-errors)     |
| **Further Assistance**  | If issues persist after troubleshooting, open a support ticket with details such as screenshots and error messages for efficient resolution. | [Open Support Ticket](https://support.turbot.com)                                           |