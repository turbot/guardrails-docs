---
title: Real-Time Events
sidebar_label: Real-Time Events
---

# Configuring Real-Time Event Handlers

In this guide, you will:

- Set up Event Handlers in the Guardrails workspace using the Guardrails console.
- Monitor and troubleshoot the Event Handlers setup process.

Guardrails enables organizations to selectively install policies, controls, and guardrails tailored to specific services. The [Event Handler](/guardrails/docs/reference/glossary#event-handler) simplifies cloud management by providing a unified framework for responding to and managing events, ensuring proactive governance and security across cloud environments. Event Handlers for GitHub are responsible for conveying events from GitHub back to Guardrails for processing.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Familiarity with the Guardrails console.
- The GitHub organization is successfully [imported](/guardrails/docs/guides/github/import-organization) into the Guardrails.
- A GitHub personal access token with permissions to create [webhooks](https://docs.github.com/en/webhooks/about-webhooks).


## Step 1: Assign Permission(s)

To ensure full functionality of the GitHub integration, grant the personal access token the `Organization Webhooks: Read and write` permission, which allows Guardrails to manage webhooks for capturing real-time events at the organization level.

Follow the steps provided in [Grant Permissions](/guardrails/docs/guides/github/import-organization#step-4-grant-permissions) of [Import GitHub Organization](/guardrails/docs/guides/github/import-organization#import-github-organization).

## Step 2: Log in to Guardrails Console

Log into the Guardrails console with provided local credentials or by using any SAML based login.

![Guardrails Console Login](/images/docs/guardrails/guides/github/real-time-events/guardrails-console-login.png)

## Step 3: Set Up Event Handlers Policy

The GitHub Event Handlers are configured using the `GitHub > Organization > Event Handlers` control for each organization. This control sets up the required [webhooks](https://docs.github.com/en/webhooks/about-webhooks) components for the organization.

Select the **Policies** tab. Search for `GitHub > Organization > Event Handlers` and select **New Policy Setting**.

![Create Event Handler](/images/docs/guardrails/guides/github/real-time-events/create-event-handler.png)

Select the `Resource` for the imported organization, set the policy to `Enforce: Enabled`, and select **Create**.

![Set Policy to Enforced](/images/docs/guardrails/guides/github/real-time-events/create-policy-setting.png)

## Step 4: Check Control Status

Select the **Controls** tab. Search for `GitHub > Organization > Event Handlers` and check that the control status is `OK`.

![Check Control Status](/images/docs/guardrails/guides/github/real-time-events/organization-event-handlers-control-status.png)


## Step 5: Verify

## Step 5: Verify

- [ ] Check that the control status for the respective organization is `OK` with the message `Configured`.

   ![Check Control Configured](/images/docs/guardrails/guides/github/real-time-events/control-configured-ok.png)

- [ ] Verify that the webhook has been created in the GitHub organization.

   ![GitHub Webhook](/images/docs/guardrails/guides/github/real-time-events/validate-github-org-webhook.png)

- [ ] To verify that the event handlers are working, create a repository in your GitHub organization. Then, check the control `GitHub > Repository > CMDB` and select **Descendant** to ensure the CMDB control displays the newly created repository.

   ![Repository CMDB Controls](/images/docs/guardrails/guides/github/real-time-events/repository-cmdb-controls.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails:

- Learn more about [Managing GitHub Organizations](guides/github/manage-organizations).
- Explore the GitHub supported use cases in Guardrails with [Policy Packs](https://hub.guardrails.turbot.com/policy-packs?providers=github).

## Troubleshooting

| **Issue**                                                           | **Description**                                                                                                                                                   | **Guide**                                                                                                                                                                                                     |
|----------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Controls in Error**                                                | Controls may enter various states, including errors, which can impact their functionality.                                                                        | [Learn More About Control States](/guardrails/docs/concepts/controls#control-state)                                                                                                                         |
| **Message: `Bad Credentials`**                                       | Guardrails GitHub controls may generate errors with a `Bad credentials` message, often caused by invalid or expired tokens.                                       | [Token Expiration and Revocation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation)                                                           |
| **Message: `forbids access via a personal access token with fine-grained permissions`** | Guardrails GitHub controls may generate this error when the personal token lacks the required permissions.                                                        | Check [Step 4 Grant Permissions](#step-4-grant-permissions) and [Permissions Required for Fine-Grained Personal Access Tokens](https://docs.github.com/en/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28). |
| **Message: `Resource not accessible by personal access token .. list-users-blocked-by-an-organization`** | Guardrails GitHub controls may generate this error if the personal token lacks required permissions for the organization.                                          | Check [Step 4 Grant Permissions](#step-4-grant-permissions) and [Permissions Required for Fine-Grained Personal Access Tokens](https://docs.github.com/en/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28). |
| **Further Assistance**                                               | If issues persist, please open a ticket with us and attach relevant details for more efficient troubleshooting.                                                   | [Open Support Ticket](https://support.turbot.com)                                                                                                                                                            |