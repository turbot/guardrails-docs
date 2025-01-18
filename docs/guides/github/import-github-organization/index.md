---
title: Import GitHub Organization
sidebar_label: Import GitHub Organization
---

CHANGES TODO

# Import GitHub Organization

In this guide, you will:

- This guide provides step-by-step instructions to import a GitHub organization into a Guardrails folder, ensuring that your GitHub environment is governed according to your organizational policies.

Turbot Guardrails enables seamless integration with GitHub, allowing you to manage your GitHub organizations and repositories effectively. By importing a GitHub organization into Guardrails, you gain the ability to:

- Centralize governance for your GitHub resources within Guardrails.
- Apply policies to enforce security, compliance, and operational best practices.
- Monitor real-time activity within your organization.
- Establish detailed audit logs to track all activities and changes for improved visibility and reporting.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Familiarity with the Guardrails console.
- Ensure access to [GitHub CLI](https://cli.github.com/) to fetch organization id.
- Ensure GitHub organization has allowed access via personal access tokens. For more information [check here](https://docs.github.com/en/organizations/managing-programmatic-access-to-your-organization/setting-a-personal-access-token-policy-for-your-organization).

## Permissions required

## Step 1: Get GitHub Organization ID

Run the following command to get the id of the organization you want to import

```
gh api orgs/<organization name> --jq '.id'
```

## Step 2: Login to Guardrails Console

Log in to the Guardrails console.

![Guardrails Console Login](/images/docs/guardrails/guides/github/import-github-organization/guardrails-console-login.png)

## Step 3: Navigate to Connect

## Step 4: Select parent resource

Fill in the Parent Resource where you'd want your organization; typically this would be done at the `Turbot` root level of your hierarchy, however it can reside in a Folder instead.

## Step 5: Fill in the organization details

- Fill in the organization name used in `Step 1`.
- Fill in the organization id fetched in `Step 1`.
- Fill in the GitHub Personal Access Token

## Verify

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [TODO].
- Learn about [TODO]

## Troubleshooting

| Issue              | Description                                                                                                                           | Guide                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Permission Issues  | TO DO.                                                                                                                                | [Troubleshoot Permission Issues](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators) |
| Further Assistance | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently. | [Open Support Ticket](https://support.turbot.com)                                                                                        |
