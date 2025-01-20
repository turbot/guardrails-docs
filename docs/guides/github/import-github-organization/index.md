---
title: Import GitHub Organization
sidebar_label: Import GitHub Organization
---

# Import GitHub Organization

In this guide, you will:

- Learn how to import an entire GitHub organization into Turbot Guardrails. This process allows Guardrails to discover and manage resources across your organization in real-time.
- Monitor and troubleshoot the process.

<!-- - Centralize governance for your GitHub resources within Guardrails.
- Apply policies to enforce security, compliance, and operational best practices.
- Monitor real-time activity within your organization.
- Establish detailed audit logs to track all activities and changes for improved visibility and reporting. -->

Importing a [GitHub Organization](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/about-organizations) into Guardrails involves these key steps:

- Configuring a GitHub with appropriate permissions at the Organization level.
- Importing the Organization via the Guardrails Console.

## Prerequisites

- Access to the Guardrails console with *Turbot/Owner* or *Turbot/Admin* permissions at the Turbot resource level.
- GitHub mod should be installed in your Guardrails workspace.
- Ensure access to [GitHub CLI](https://cli.github.com/) to fetch organization id.
- Ensure GitHub organization has allowed access via personal access tokens. See [Setting a personal access token policy for your organization](https://docs.github.com/en/organizations/managing-programmatic-access-to-your-organization/setting-a-personal-access-token-policy-for-your-organization) for more information.

<!-- ## Supported Authentication -->

## What Permissions to Grant

<!-- To make sure all functionality of GitHub integration work, we suggest you to provide all the following permissions.

- Organization Administration - Read and write
- Organization Blocking users - Read and write
- Organization Webhooks - Read and write
- Repository Administration - Read and write
- Repository Metadata - Read-only -->

To ensure full functionality of the GitHub integration, we recommend granting the following permissions:

| **Permission**                       | **Access Level**    | **Description**                                                                                       |
|--------------------------------------|---------------------|-------------------------------------------------------------------------------------------------------|
| Organization Administration          | Read and write      | Allows Guardrails to manage settings and configurations at the organization level.                   |
| Organization Blocking Users          | Read and write      | Enables Guardrails to block and unblock users within the organization.                               |
| Organization Webhooks                | Read and write      | Allows Guardrails to manage webhooks for capturing real-time events at the organization level.        |
| Repository Administration            | Read and write      | Grants Guardrails the ability to manage repository settings, including access controls and policies.  |
| Repository Metadata                  | Read-only           | Provides Guardrails with visibility into repository metadata without modifying its content.           |

## Get GitHub Organization ID

There are various ways to get the GitHub organization ID

Use [GitHub CLI](https://docs.github.com/en/github-cli/github-cli/quickstart) and run the following command to get the id of the organization you want to import.

```
gh api orgs/<organization name> --jq '.id'
```

Alternatively, you can use `curl` command to render the ID

```
curl -H "Authorization: Bearer ghp_iio5FzBF4OLbbes3AKasdre5f4mps50s7YXE" https://api.github.com/orgs/<your-org-name>
```
The result will be shown as below

```json
{
  "login": "your-org-name",
  "id": 94844722,
  "node_id": "O_kgDOBac5MQ",
  "url": "https://api.github.com/orgs/your-org-name",
  ....
}
```
## Import Organization into Guardrails

Login to your Guardrails workspace console and select the **CONNECT** card.

![Guardrails Console Login](/images/docs/guardrails/guides/github/import-github-organization/select-connect-card.png)

Select **GitHub** card from the connect panel.

![Connect GitHub Card](/images/docs/guardrails/guides/github/import-github-organization/connect-github-card.png)

Choose the location where you want to import the organization. Typically this would be done at the `Turbot` root level of your hierarchy, however it can reside in a [Folder](/guardrails/docs/concepts/resources/hierarchy#folders) based on your use-case.

![Choose Location](/images/docs/guardrails/guides/github/import-github-organization/choose-location.png)

Provide `Organization Name`, `Organization ID`, `Personal Access Token` and choose **Connect**

![Connect](/images/docs/guardrails/guides/github/import-github-organization/connect.png)

Verify that the controls are executed by navigating to **Controls** tab and select GitHub

![Verify Controls](/images/docs/guardrails/guides/github/import-github-organization/verify-github-controls.png)


## Troubleshooting

| **Issue**                | **Description**                                                                                                                      | **Guide**                                                                                                                                |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Controls in Error    | Controls may enter various states, including errors, which can impact their functionality.                                           | [Learn More About Control States](/guardrails/docs/concepts/controls#control-state)                                                     |
| Message: `Bad Credentials` | Guardrails GitHub controls may generate errors with a `Bad credentials` message, often caused by invalid or expired tokens.                                | [Token Expiration and Revocation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation) |
| Further Assistance   | If issues persist, please open a ticket with us and attach relevant details for more efficient troubleshooting.                      | [Open Support Ticket](https://support.turbot.com)                                                                                       |