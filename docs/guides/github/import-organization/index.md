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

## Step 1: Setting Personal Access Token Policy for Your Organization

Setup the a personal access token policy for your organization prior to importing the organization into Guardrails. Refer steps provided in the GitHub [guide](https://docs.github.com/en/organizations/managing-programmatic-access-to-your-organization/setting-a-personal-access-token-policy-for-your-organization).

Choose `Allow access via fine-grained personal access tokens`.

![Allow Fine-grained Personal Access Tokens](/images/docs/guardrails/guides/github/import-organization/allow-fine-grained-personal-access-tokens.png)

## Step 2: Create Personal Access Token

Turbot Guardrails supports both [Fine-grained](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#fine-grained-personal-access-tokens) or [Classic](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) GitHub token. This token is available in the GitHub portal under Developer settings and provide secure access to your resources.

Follow the GitHub provided steps in [Creating a fine-grained personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

![Create Personal Token](/images/docs/guardrails/guides/github/import-organization/create-personal-token.png)

Copy the personal access token.

![Copy Token](/images/docs/guardrails/guides/github/import-organization/copy-personal-token.png)

> [!IMPORTANT]
> Make sure to copy your personal access token during the creation step as you will not be able to see this again.

## Step 3: Check Permission of Personal Access Token

Once you create an fine-grained token, initially it may not have any associated permission.

> [!TIP]
> Regardless of the chosen policy, Personal access tokens will have access to public resources within the organization.

![Personal Token with No Permission](/images/docs/guardrails/guides/github/import-organization/personal-token-with-no-permission.png)

## Step 4: Grant Permissions

To ensure full functionality of the GitHub integration, we recommend granting the following permissions:

| **Permission**                       | **Access Level**    | **Description**                                                                                       |
|--------------------------------------|---------------------|-------------------------------------------------------------------------------------------------------|
| Organization Administration          | Read and write      | Allows Guardrails to manage settings and configurations at the organization level.                   |
| Organization Webhooks                | Read and write      | Allows Guardrails to manage webhooks for capturing real-time events at the organization level.        |
| Repository Metadata                  | Read-only           | Provides Guardrails with visibility into repository metadata without modifying its content.           |
| Repository Administration            | Read and write      | Grants Guardrails the ability to manage repository settings, including access controls and policies.  |
| Organization Blocking Users          | Read and write      | Enables Guardrails to block and unblock users within the organization.                               |

> [!NOTE]
> The minimum required permissions to import an organization are `Organization Administration` with `Read and write`, `Repository Metadata` with `Read-only`, and `Organization Webhooks` for configuring GitHub event handlers in Guardrails. Additional permissions may be required depending on specific control needs.

Select **Edit**, which allows to make edit in `Permissions` section.

![Edit Personal Token](/images/docs/guardrails/guides/github/import-organization/edit-personal-token.png)

Associate required permissions mentioned in the above table.

![Associated Permission](/images/docs/guardrails/guides/github/import-organization/associated-org-permission.png)

## Step 5: Get Organization ID

Organization ID is mandatory input in Guardrails console. There are various ways to get the GitHub organization ID.

Use [GitHub CLI](https://docs.github.com/en/github-cli/github-cli/quickstart) and run the following command to get the ID of the organization you want to import.

```
gh api orgs/<organization name> --jq '.id'
```

Alternatively, you can use `curl` command.

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
## Step 6: Import Organization in Guardrails Console

Login to your Guardrails workspace console and select the **CONNECT** card.

![Guardrails Console Login](/images/docs/guardrails/guides/github/import-organization/select-connect-card.png)

Select **GitHub** card from the connect panel.

![Connect GitHub Card](/images/docs/guardrails/guides/github/import-organization/connect-github-card.png)

Choose the location where you want to import the organization. Typically this would be done at the `Turbot` root level of your hierarchy, however it can reside in a [Folder](/guardrails/docs/concepts/resources/hierarchy#folders) based on your use-case.

![Choose Location](/images/docs/guardrails/guides/github/import-organization/choose-location.png)

Provide `Organization Name`, `Organization ID`, `Personal Access Token` and choose **Connect**.

![Connect](/images/docs/guardrails/guides/github/import-organization/connect.png)

## Step 7: Verify

Check that the controls are executed by navigating to **Controls** tab and select GitHub.

![Verify Controls](/images/docs/guardrails/guides/github/import-organization/verify-github-controls.png)

## Troubleshooting

| **Issue**                | **Description**                                                                                                                      | **Guide**                                                                                                                                |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Controls in Error    | Controls may enter various states, including errors, which can impact their functionality.                                           | [Learn More About Control States](/guardrails/docs/concepts/controls#control-state)                                                     |
| Message: `Bad Credentials`  | Guardrails GitHub controls may generate errors with a `Bad credentials` message, often caused by invalid or expired tokens.                                | [Token Expiration and Revocation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation) |
| Message: `forbids access via a personal access token with fine-grained permissions`  | Guardrails GitHub controls may generate errors with a `forbids access` error, often caused, in case the used personal token does not have any required permissions.                                | Check the required permissions at [Step 4 Grant Permissions](#step-4-grant-permissions)& [Permissions required for fine-grained personal access tokens](https://docs.github.com/en/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28) |
| Further Assistance   | If issues persist, please open a ticket with us and attach relevant details for more efficient troubleshooting.                      | [Open Support Ticket](https://support.turbot.com)                                                                                       |
