---
title: Create Workspace
sidebar_label: Create Workspace
---

# Create Workspace

In this guide, you will:

- Use AWS CloudFormation service to create Turbot Guardrails Workspace through `Workspace Manager CloudFormation Template`

A [Workspace](/guardrails/docs/reference/glossary#workspace) is an independent tenant of Guardrails, with its own version and its
own schema (logical shard) in a hive. Each Workspace has its own root resource as [Turbot](/guardrails/docs/reference/glossary#turbot-resource),
its own set of mods, and its own web console endpoint. Workspaces will use the [Collective](/guardrails/docs/reference/glossary#collective), [Hive](/guardrails/docs/reference/glossary#hive), and versions that you deployed previously, using the [TEF](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-foundation-tef), [TED](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted), and [TE](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-te) products in the Service Catalog.

Workspaces are deployed and managed using [**Guardrails Workspace Manager**](/guardrails/docs/guides/hosting-guardrails/installation/workspace-manager#sample-workspace-manager-cloudformation-template),
which is implemented as a CloudFormation custom resource.

## Prerequisites

- Ensure the Guardrails [TEF](/guardrails/docs/guides/hosting-guardrails/installation/install-tef), [TED](/guardrails/docs/guides/hosting-guardrails/installation/install-ted) and [TE](/guardrails/docs/guides/hosting-guardrails/installation/install-te) stacks are successfully installed.
- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).

## Step 1: Access AWS Console

In the AWS Console, navigate to the CloudFormation service in the alpha region.

![CloudFormation Console](/images/docs/guardrails/guides/hosting-guardrails/installation/workspace-manager/cloudformation-console.png)


## Step 2: Download CloudFormation Template

While the sample template provides a simple, out-of-the box mechanism for deploying a single workspace, it is merely a starting point. You may wish to
deploy ALL your workspaces from a single template, so that you can manage versions for all workspaces from a single stack, for instance.

This template is available at Guardrails Samples Repo
[Workspace Manager CloudFormation Template](https://github.com/turbot/guardrails-samples/blob/main/enterprise_installation/workspace_template.yml)

Download

![Download Template](/images/docs/guardrails/guides/hosting-guardrails/installation/workspace-manager/github-guardrails-samples-workspace-template-download.png)


## Step 3: Create New Stack

Create a new stack, using the **Choose existing template** option by uploading the template file in **Choose file**, provide the [Sample Workspace Manager CloudFormation Template](#sample-workspace-manager-cloudformation-template) previously downloaded.

![CloudFormation Create Stack](/images/docs/guardrails/guides/hosting-guardrails/installation/workspace-manager/cloudformation-upload-template.png)

## Step 4: Enter Parameters

Enter the appropriate parameters and select **Next**

- **Name:** The name of workspace, which will be used as the first part of
  the console URL. For instance, if you specify “dev” as the workspace name,
  and you set up the TEF stack using `mycompany.turbot.com` as the domain
  name, the console URL will be `dev.mycompany.turbot.com`

- **Version:** The version of Turbot Guardrails Enterprise to install in the workspace.
  This must match an installed (via TE) version exactly, For example:
  `5.46.0`

- **Hive:** The Hive name where the database is hosted. This should be the
  Hive name that you specified when setting up TED

- **UseRoute53:** If set to `True`, the stack will automatically update the
  DNS alias for the console URL to point to the newly installed version. If
  you do not use Route53 to manage the DNS, choose "False". You will need to
  create (or modify) a CNAME record for your workspace to point to the load
  balancer for the new version (available as `LoadBalancerDNS` in the stack
  output variables).

- **FoundationStackOutputPrefix:** This must match the resource prefix that
  you specified in the Turbot Guardrails Enterprise Foundation stack so that this stack
  can use exported outputs from the TEF stack.

![CloudFormation Update Parameters](/images/docs/guardrails/guides/hosting-guardrails/installation/workspace-manager/cloudformation-update-parameters.png)

## Step 5: Enable Termination Protection

Turbot recommends enabling **Termination Protection** on the Workspace Manager CloudFormation stack. This can be done at creation by expanding the **Stack creation options** and enabling Termination Protection. This can also be configured post CloudFormation stack deployment. Select the stack while viewing the CloudFormation service in the AWS console, click **Stack actions** in the top right, then click **Edit termination protection**. Set this to `Activated` and select **Save**!

![CloudFormation Enable Termination Protection](/images/docs/guardrails/guides/hosting-guardrails/installation/workspace-manager/cloudformation-enable-termination-protection.png)

## Step 6: Complete Stack Creation

Click on **Submit** and wait for the stack creation to complete.

![CloudFormation Stack Creation Complete](/images/docs/guardrails/guides/hosting-guardrails/installation/workspace-manager/cloudformation-creation-complete.png)

## Step 7: Provision Admin Account and Access the Workspace

Once the Workspace Manager CloudFormation stack is created, the Workspace Manager generates the initial Turbot Admin account and password, along with a key pair.
Go to the stack outputs to find:

`Console URL` available in the `WorkspaceUrl` **Outputs** variable. Use this `WorkspaceUrl` link to access the web console.

![Workspace URL](/images/docs/guardrails/guides/hosting-guardrails/installation/workspace-manager/cloudformation-workspace-url.png)


`Admin Credentials` is displayed in the `WorkspaceManagerOutput` variable in the stack outputs.

![Workspace Credentials](/images/docs/guardrails/guides/hosting-guardrails/installation/workspace-manager/cloudformation-workspace-credentials.png)

Login using the generated admin credentials. Once logged in, change the admin password and delete the generated keys.

> [!WARNING]
> The username, password, and keys will appear in plain text in the CloudFormation stack output variables. If you re-run the stack, the stack output variables will be overwritten, so it’s important to secure this information immediately after stack creation.

Navigate to Profile (from the user icon in the top right of the Turbot Console).

Change the admin password and delete the access keys by clicking [X] next to the access key generated during install. New access keys can be created if necessary.

## Next Steps

- Head over to the [Post Installation document](/guardrails/docs/guides/hosting-guardrails/installation/post-installation) for further instructions after setting up the workspace.
- Learn more about managing versions and updating workspaces from [Turbot Guardrails Enterprise Documentation](/guardrails/docs/guides/hosting-guardrails/updating-stacks).


## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Permission Issues                        | If the current logged-in user lacks permission to modify, update, or create resources in the stack, or if IAM roles or SCPs have changed, preventing built-in roles from accessing needed configuration settings.   | [Troubleshoot Permission Issues](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators)             |
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |
