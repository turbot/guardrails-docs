---
title: Import Organization
sidebar_label: Import Organization
---

# Import GitHub Organization

In this guide, you will:

- Learn how to import an entire GitHub organization into Turbot Guardrails. This process allows Guardrails to discover and manage resources across your organization in real-time.
- Monitor and troubleshoot the process.

Importing a [GitHub Organization](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/about-organizations) into Guardrails involves these key steps:

- Configuring a GitHub with appropriate permissions at the Organization level.
- Importing the Organization via the Guardrails Console.

## Prerequisites

- Access to the Guardrails console with *Turbot/Owner* or *Turbot/Admin* permissions at the Turbot resource level.
- Availability of [GitHub mod](https://hub.guardrails.turbot.com/mods/github/mods) in your Guardrails workspace.
- Familiarity with the [GitHub](https://github.com/).
- [GitHub CLI](https://docs.github.com/en/github-cli/github-cli/quickstart) setup.
- [Access to personal token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

<!-- ## Supported Authentication -->

## Step 1: Setup Personal Token

Turbot Guardrails supports both [Fine-grained](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#fine-grained-personal-access-tokens) or [Classic](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) GitHub token. This token is available in the GitHub portal under Developer settings and provide secure access to your resources.

Follow the GitHub provided steps in [Creating a fine-grained personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)


## Step 2: Grant Permission to Personal Token

Once you create an fine-grained token, initially it may not have any associated permission. Tokens always include read-only access to all public repositories on GitHub.

![Personal Token](/images/docs/guardrails/guides/github/import-organization/personal-token.png)

To ensure full functionality of the GitHub integration, we recommend granting the following permissions:

| **Permission**                       | **Access Level**    | **Description**                                                                                       |
|--------------------------------------|---------------------|-------------------------------------------------------------------------------------------------------|
| Organization Administration          | Read and write      | Allows Guardrails to manage settings and configurations at the organization level.                   |
| Organization Blocking Users          | Read and write      | Enables Guardrails to block and unblock users within the organization.                               |
| Organization Webhooks                | Read and write      | Allows Guardrails to manage webhooks for capturing real-time events at the organization level.        |
| Repository Administration            | Read and write      | Grants Guardrails the ability to manage repository settings, including access controls and policies.  |
| Repository Metadata                  | Read-only           | Provides Guardrails with visibility into repository metadata without modifying its content.           |

<!-- Image / Steps to refer -->

Select **Edit**, which allows to make edit in `Permissions` section.

![Edit Personal Token](/images/docs/guardrails/guides/github/import-organization/edit-personal-token.png)

Associated required permissions mentioned in the above table.

![Associated Permission](/images/docs/guardrails/guides/github/import-organization/associated-permission.png)

CHECK SD HOW WE ASSOCIATE ORG

> [!IMPORTANT]
> Regardless of the chosen policy, Personal access tokens will have access to public resources within the organization.

## Step 3: Get Organization ID

There are various ways to get the GitHub organization ID.

Use [GitHub CLI](https://docs.github.com/en/github-cli/github-cli/quickstart) and run the following command to get the ID of the organization you want to import.

```
gh api orgs/<organization name> --jq '.id'
```

Alternatively, you can use `curl` command to get the organization ID.

```
curl https://api.github.com/orgs/<your-org-name>
```
The result will be shown as below:

```json
{
  "login": "your-org-name",
  "id": 94844722,
  "node_id": "O_kgDOBac5MQ",
  "url": "https://api.github.com/orgs/your-org-name",
  ....
}
```
## Step 4: Import Organization in Guardrails Console

Login to your Guardrails workspace console and select the **CONNECT** card.

![Guardrails Console Login](/images/docs/guardrails/guides/github/import-organization/select-connect-card.png)

Select **GitHub** card from the connect panel.

![Connect GitHub Card](/images/docs/guardrails/guides/github/import-organization/connect-github-card.png)

Choose the location where you want to import the organization. Typically this would be done at the `Turbot` root level of your hierarchy, however it can reside in a [Folder](/guardrails/docs/concepts/resources/hierarchy#folders) based on your use-case.

![Choose Location](/images/docs/guardrails/guides/github/import-organization/choose-location.png)

Provide `Organization Name`, `Organization ID`, `Personal Access Token` and choose **Connect**.

![Connect](/images/docs/guardrails/guides/github/import-organization/connect.png)

## Step 5: Verify

Check that the controls are executed by navigating to **Controls** tab and select GitHub.

![Verify Controls](/images/docs/guardrails/guides/github/import-organization/verify-github-controls.png)


## Troubleshooting

| **Issue**                | **Description**                                                                                                                      | **Guide**                                                                                                                                |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Controls in Error    | Controls may enter various states, including errors, which can impact their functionality.                                           | [Learn More About Control States](/guardrails/docs/concepts/controls#control-state)                                                     |
| Message: `Bad Credentials` | Guardrails GitHub controls may generate errors with a `Bad credentials` message, often caused by invalid or expired tokens.                                | [Token Expiration and Revocation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation) |
| Further Assistance   | If issues persist, please open a ticket with us and attach relevant details for more efficient troubleshooting.                      | [Open Support Ticket](https://support.turbot.com)                                                                                       |