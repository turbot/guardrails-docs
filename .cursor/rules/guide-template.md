---
title: Example Guide Title
sidebar_label: Example Guide Title
---

# Example Guide Title

In this guide, you will:
- [Briefly list what the user will achieve or learn]
- [Each bullet should be a practical outcome or goal]

[Turbot Guardrails Enterprise Database (TED)](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) is...

## Prerequisites

- [List any required AWS/Azure access, Turbot environment setup, permissions, etc.]
- [Link to docs or FAQs where relevant]

## Step 1: [Start with an Actionable Step]

Describe the first step clearly. Provide relevant screenshots if available.

![Step 1 Screenshot](/images/docs/path-to-image.png)

## Step 2: [Next Action Step]

Same format here.

## Step 3: [Another step]

...

## Step N: Review

- [ ] Validate stack status is `CREATE_COMPLETE`
- [ ] Verify product status is `Available`
- [ ] Other post-install checks

## Next Steps

- Link to related guides
- Example: [Update TED](/guardrails/docs/runbooks/enterprise-install/update-ted)
- Example: [Architecture overview](/guardrails/docs/enterprise/architecture)

## Troubleshooting

| Issue                  | Description                                                                                   | Solution/Guide                                      |
|------------------------|-----------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Permissions error      | User lacks IAM permission to modify stacks                                                    | [Admin Permissions](/guardrails/docs/...)           |
| Installation stuck     | Stack in `CREATE_IN_PROGRESS` for too long                                                    | Check CloudFormation Events                         |
| Product unavailable    | No option to launch product after config                                                      | [Troubleshooting Deployment](/guardrails/docs/...)  |

> Need more help? [Open a Support Ticket](https://support.turbot.com)