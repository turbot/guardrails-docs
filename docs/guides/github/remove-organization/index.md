---
title: Remove Organization
sidebar_label: Remove Organization
---

# Removing GitHub Organization

In this guide, you will:

- Learn how to safely remove a GitHub organization from a Guardrails workspace.
- Monitor and troubleshoot the deletion process.

Guardrails enables administrators to remove a [GitHub Organization](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/about-organizations) from a workspace. This action deletes all associated policies and references in the Guardrails database but **does not affect any resources** within the source GitHub organization.

> [!WARNING]
> Removing GitHub organization from Guardrails will remove all it's CMDB records and policy settings.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot level and familiarity with its interface.
- Access to [GitHub](https://github.com/) and familiarity with its interface.

## Step 1: Log in to Guardrails Console

Log into the Guardrails console with provided local credentials or by using any SAML based login.

![Guardrails Console Login](/images/docs/guardrails/guides/github/remove-organization/guardrails-console-login.png)

## Step 2: Disable Event Handlers

To safely remove your GitHub organization from the Guardrails workspace, disable the Event Handlers associated with `GitHub > Organization > Event Handlers` by setting the value to `Enforce: Disabled`. This action removes any Guardrails-configured webhooks in your GitHub organization.

Go to the **Policies** tab. Search for `GitHub > Organization > Event Handlers` and verify the current status as `Enforce: Enabled`, then select the **Edit** button in the top-right corner.

![Enforce Enabled](/images/docs/guardrails/guides/github/remove-organization/current-setting-enforce-enabled.png)

Change the policy setting to `Enforce: Disabled` and select **Update** to save changes.

![Enforce Disabled](/images/docs/guardrails/guides/github/remove-organization/enforce-disabled.png)

## Step 3: Check GitHub Organization Webhooks

The control status for `GitHub > Organization > Event Handlers` is `OK` and no webhooks configured as part of the event handler setup remain in your GitHub organization.

![Removed Webhooks](/images/docs/guardrails/guides/github/remove-organization/removed-webhooks.png)


## Step 4: Remove Credential Policy

Delete the `GitHub > Config > Personal Access Token` policy configured for the target GitHub organization. This ensures that Guardrails no longer has access to the organization.

![Delete Personal Access Token Policy](/images/docs/guardrails/guides/github/remove-organization/delete-github-config-pat-policy.png)


## Step 5: Remove Organization

Select the **Resources** tab in Guardrails console and enter your organization name in the search box to locate the resource. Navigate to the `Organization` that needs to be removed.

![Locate Organization](/images/docs/guardrails/guides/github/remove-organization/locate-organization.png)

Select the **Actions** button in the top-right corner and choose **Remove from Turbot**.

![Remove from Turbot](/images/docs/guardrails/guides/github/remove-organization/remove-from-turbot.png)

In the popup window, copy the resource name i.e. organization name and paste it into the text box. Select **Delete**.

![Delete Organization](/images/docs/guardrails/guides/github/remove-organization/delete-organization.png)

This completes the deletion of the organization from Guardrails.


## Step 6: Review

Guardrails will begin the deletion process. The time required to complete the process depends on the number of policies and resources associated with the organization. Larger organizations may take longer.

After completing the steps above, verify that the GitHub organization no longer appears in the Guardrails console. Ensure that no residual event handlers or configurations remain.


## Troubleshooting

| **Issue**              | **Description**                                                                                                                            | **Guide**                                                                                   |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **Deletion Errors**     | Errors may occur due to database locks or incomplete cleanup. Ensure all event handlers and policies have been removed before retrying.    | [Troubleshoot Deletion Issues](/guardrails/docs/github/troubleshooting#deletion-errors)     |
| **Further Assistance**  | If issues persist after troubleshooting, open a support ticket with details such as screenshots and error messages for efficient resolution. | [Open Support Ticket](https://support.turbot.com)                                           |