---
title: Custom Roles
sidebar_label: Custom Roles
---

# Using External IAM Roles to Install Turbot

Organizations with strict role requirements will be unable to use the
pre-defined roles in the TEF, TED, and TE stacks. This guide provides
instructions for creating roles using AWS CloudFormation templates.

## Create Turbot Parameters Custom Resource IAM Role

Start by creating the role required for Turbot Parameters. The link below
contains the necessary CloudFormation template:

- <a href="https://github.com/turbot/guardrails-samples/blob/main/enterprise_installation/custom_role_templates/turbot-parameters-lambda-role.yml" target="_blank">Turbot
  Parameters Custom IAM Roles YAML</a>

Refer to
<a href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html" target="_blank">AWS
Documentation</a> for how to create a new CloudFormation stack.

Once the template is downloaded, create a new CloudFormation stack in the AWS
account designated as the install account. Label the stack to make it
recognizable, such as **Turbot Parameter IAM Role**.

## Create Turbot Guardrails Enterprise Foundation (TEF) Customer IAM Roles

Again, Turbot provides a CloudFormation template that can be used to deploy
roles required for a successful installation. Both the above Turbot Guardrails Parameters
Custom Resource IAM role and the TEF customer IAM role **MUST BE CREATED PRIOR
TO BEGINNING THE TURBOT INSTALL!** Follow the below link for the TEF Custom IAM
Roles CloudFormation template:

- <a href="https://github.com/turbot/guardrails-samples/blob/main/enterprise_installation/custom_role_templates/tef-custom-iam-roles.yml" target="_blank">TEF
  Custom IAM Roles YAML</a>

Refer to
<a href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html" target="_blank">AWS
Documentation</a> for how to create a new CloudFormation stack.

Once the template is downloaded, create a new CloudFormation stack in the AWS
account designated as the install account. Label the stack to make it
recognizable, such as **TEF IAM Role**.

## Install TEF Stack with Custom Options

Install TEF using the
[Turbot Guardrails Enterprise Foundation Installation Guide](enterprise/installation/tef-installation)
with the following custom options:

- **Turbot Parameter Role**: The ARN of the Turbot Parameters Custom Resource
  IAM Roles
- **Role Creation Scheme**: `None`

## Install Turbot Guardrails Enterprise Database (TED) Stack

No custom options are necessary for the TED stack. Follow the
[Turbot Guardrails Enterprise Database Installation Guide](enterprise/installation/ted-installation)
to complete this step.

## Create IAM Roles and Policies For Turbot Guardrails Enterprise (TE) Stack

Use the below provided CloudFormation template to create the required roles and
policies for the TE stack. This step is **REQUIRED** to successfully install the
TE stack:

- <a href="https://github.com/turbot/guardrails-samples/blob/main/enterprise_installation/custom_role_templates/te-custom-iam-roles.yml" target="_blank">TE
  IAM Roles and Policies YAML</a>

Refer to
<a href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html" target="_blank">AWS
Documentation</a> for how to create a new CloudFormation stack.

Once the template is downloaded, create a new CloudFormation stack in the AWS
account designated as the install account. Label the stack to make it
recognizable, such as **TE Custom Roles and Policies**.

## Install the Turbot Guardrails Enterprise (TE) Stack

After the TEF and TED stack, along with all IAM roles and policies, are created,
it is time to move onto installing the TE stack. Refer to our
[Turbot Guardrails Enterprise Installation Guide](enterprise/installation/te-installation),
setting the following custom option:

- **Role Creation Scheme**: `None`

## Completing the Turbot Install

Once the TEF, TED, and TE stacks are successful and in the OK state, the
Workspace stack can be configured and subsequent post installation steps taken
care of. Post installation steps can include updating internal DNS records,
[installing and updating mods](https://hub.guardrails.turbot.com/#mods) and
[creating a new directory](guides/directories) for authentication.

- [Guide to install the Workspace Manager](enterprise/installation/workspace-manager)
- [Post Installation](enterprise/installation/post-installation)

### Additional Resources

- [Guardrails Samples Repo](https://github.com/turbot/guardrails-samples) - Public
  repository with Terraform and GraphQL examples.
- [7-Minute Labs](7-minute-labs) - Labs to help further the understanding of
  Turbot and its features.
- [Turbot Guides](guides) - Multitude of guides covering a wide range of topics,
  from policy examples, Turbot files, and folders.
