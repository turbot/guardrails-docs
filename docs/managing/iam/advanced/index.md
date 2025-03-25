---
title: Advanced IAM Management
sidebar_label: Advanced IAM Management
---

# Advanced Strategies in Guardrails IAM Management

This document describes more advanced topics in managing Guardrails IAM. Each
organization has distinct authentication/authorization requirements. Architects
should incorporate information from the below documentation to build a
resilient, secure Guardrails IAM management system. Additional questions can be
directed to [help@turbot.com](mailto:help@turbot.com).

## Required Reading

- [Authentication](concepts/iam/authentication)
- [Identity](concepts/iam/identity)
- [Permissions](concepts/iam/permissions)
- [Directories in Guardrails](guides/directories)
- [Guide to IAM Management](guides/iam) Read everything under `IAM`.
- [Guardrails Admin Best Practices](guides/iam/administrators)

### Common Configuration

The most common configuration for Guardrails IAM management is to use a Guardrails Local
directory (created by default on workspace initialization) and an external SAML
directory. Guardrails console users authenticate using the SAML directory. The
Guardrails Local directory is used in break-glass situations.

## Disaster Considerations

- At all times, a Guardrails profile with valid credentials and `Turbot/Owner`
  permissions must exist. Even if the `Turbot/Owner` permissions aren't active,
  a profile must have them. Only profiles with `Turbot/Owner` can grant
  permissions to other users.
- Two independent directories should be attached to a workspace at all times.
  The most common approach is to use Guardrails Local and SAML. Customers exploring
  other combinations of directories that exclude the Guardrails Local directory
  should be exceptionally careful to guard against single points of failure.
- **Test all IAM management changes in a non-production workspace before
  deploying to production.**

## Cleanup of User Profiles

By default Guardrails API Access keys don't expire. Enterprise customers with
publicly accessible ALBs or SaaS customers should be aware that even though a
user can't authenticate to the Guardrails Console via SAML, their access keys will
continue to work. Disabling a user's profile will deactivate their API keys.

Customers can use the
[Turbot > IAM > Profile > Expiration](mods/turbot/turbot-iam/inspect#/policy/types/profileExpiration)
and
[Turbot > IAM > Profile > Expiration > Days](mods/turbot/turbot-iam/inspect#/policy/types/profileExpirationDays)
policies to force user profile expiration after a specified period. This should
be a calculated policy to exclude break-glass user profiles. **Failure to
exclude break-glass user profiles could result in a complete lock-out.**

### Auditing the Guardrails API for Enterprise Customers

Being able to trace a user's activity in the Guardrails console and in the Guardrails
API is essential to accountability and security. These logs should be forwarded
to a central logging solution or SIEM for storage and analysis.

The logs can be found in the `/turbot/<hive_name>/api/audit` log group in the
CloudWatch in the Turbot Guardrails Master account. The hive name is specified in the
Turbot Guardrails Enterprise Database (TED) stack. All API traffic for all workspaces
hosted by a particular hive can be found in that hive's log group.

Another approach for extracting usage data is the Guardrails
[Firehose](mods/turbot/firehose-aws-sns/readme). Watches can be set up to send
notifications on updated grants and policy changes. Of particular interest are
the `active_grants_created`, `active_grants_deleted`, `grant_created`,
`grant_deleted`, `policy_setting_created`, `policy_setting_deleted`,
`policy_setting_updated` and `policy_value_updated`. (Be aware that the
`policy_value_updated` notification can be extremely high volume. Setting a
single policy that applies to 100K resources will result in a single
`policy_setting_created` notification and 100K `policy_value_updated`
notifications.)

### Trade-offs between Guardrails Local vs SAML/LDAP directories

Guardrails Local directories are always available as long as the Guardrails console is
accessible, but do not support MFA. SAML/Google/LDAP directories support MFA but
are vulnerable to network outages and misconfigurations. Both capabilities are
required.

### Pre-approved privileges

From the [Permissions Docs](concepts/iam/permissions)

> [!IMPORTANT]
> A grant does not have to be an active grant: a grant can be
> explicitly activated or deactivated. A grant activation can be set to expire
> at a specific time, allowing for time-bound temporary privilege escalation.

Architects have the option of pre-approving Guardrails users with specific
permissions that can be activated and deactivated as needed. Deactivated
permissions have similar function to `sudo` on Linux systems or "Execute as
Administrator" on Windows. If elevated access is required, it's available but
required deliberate effort to enable and disable.

## Case Study 1: Pre-Approved Permissions

This customer identified a set of trusted administrators who would be granted
elevated privileges in Guardrails. Their Guardrails environment was completely
configured by Terraform. Any changes should be committed to source control then
run through the usual approval processes. However, emergency changes must
sometimes be made.

Their environment included:

- Guardrails configured with a Guardrails Local and SAML directory. Group sync is not
  configured.
- A mix of AWS accounts and GCP projects.
- Shipping of API audit logs to the SIEM.

All Guardrails admins have active `Turbot/Operator` and deactivated `Turbot/Admin`
permission grants. The manager responsible for Guardrails and their backup are the
only ones to hold `Turbot/Owner`. With these permissions, the Guardrails admins are
able to perform common tasks such as running controls and policy values. In
emergency situations, they can activate their `Turbot/Admin` permissions to make
immediate changes. After the emergency is complete, they deactivate their
elevated privileges. Post-emergency commits ensure proper synchronization
between Guardrails and change control.

Making any changes to grants will show up in the logs. Administrators that
misuse their `Turbot/Admin` permissions can be held accountable for that action.
A coming improvement will be for the SIEM to automatically open a ticket
whenever it detects a user has elevated their privileges.

## Case Study 2: Permissions provisioned by Ticketing System

The customer wished to prevent write access to Guardrails and AWS accounts except in
cases where a ticket has been opened and assigned. They used Guardrails managed
roles through `AWS > Turbot > Permissions` to provide access to the targeted AWS
account.

Their environment included:

- ServiceNow
- Guardrails configured with a Guardrails Local and SAML directory. Group sync is
  configured for the SAML directory.
- A number of AWS accounts.
- Shipping of API audit logs to the SIEM.

ServiceNow had access to Guardrails via a service user with `Turbot/Owner`. A
break-glass user in the Guardrails Local directory also had `Turbot/Owner`
permissions. Administrators in the `AWSOperations` SAML group have
`Turbot/ReadOnly` and `AWS/ReadOnly` at the Guardrails level. At any time, they can
authenticate to Guardrails then provision read-only access into any imported
account. They can also read the state of any policy or control in Guardrails.

In the event of an emergency:

1. A ticket is opened in ServiceNow about a problem in a specific account. The
   ticket is assigned to an operator in the `AWSOperations` group.
2. A workflow step in ServiceNow makes a GraphQL call to Guardrails to provision
   `Turbot/Operator` and `AWS/Operator` for the assigned operator in the
   specified account. The grant is time limited to 6 hours.
3. The operator can now log into Guardrails and get an AWS console session with
   their elevated permissions. They are able to resolve the problem in 15
   minutes.
4. The ticket is closed. ServiceNow makes another GraphQL call to remove the
   operator's elevated permissions.
5. If the ticket took longer than 6 hours to resolve, the operator must renew
   their permissions.

## Case Study 3: Multi-team policy development

The customer has a set of teams to manage various cloud resources. Each team has
a specific set of resources they manage. All teams have access to the Guardrails
console and API with `Turbot/Operator`. Guardrails Administrators have
`Turbot/Owner`. All policies and workspace changes must be reviewed before
deployment. Creating or altering policy packs, creating new folders, importing
accounts and other high risk activities are reserved for the Guardrails Admins.

Their environment included:

- Guardrails configured with a Guardrails Local and SAML directory. Group sync is not
  configured for the SAML directory.
- A number of AWS accounts spread across several production workspaces.
- A CodeDeploy pipeline per team per workspace. Each pipeline has a Guardrails user
  with `Turbot/Admin`.
- A collection of policy packs per team per workspace to provide flexibility in
  scoping policy assignment.

To enforce least privilege, all CodeDeploy pipelines were consolidated into a
single pipeline per workspace. Pre-deploy checks ensured that team members only
created policies in their assigned policy packs and only on their assigned
resource types.

Policy Checks on Resource Team:

- Reject any commit that performs operations other than creating/updating
  policies.
- Reject any commit that enables or alters policies outside each team's assigned
  policy packs.
- Reject any commit that sets policies for services and resources outside each
  team's assigned set.
- Reject any commit that fails to pass terraform linting rules.

Guardrails Admin team have no such checks on their commits.

API auditing was also implemented.
