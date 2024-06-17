---
title: IAM
sidebar_label: IAM
---

# Identity and Access Management (IAM)

Identity and Access Management (IAM) is a core concept of Guardrails and is
responsible for key features such as:

- Management of user/group directory sources for Guardrails
- Attributing actions to a directory user/group
- Management of permissions in Guardrails
- Management of permissions in Cloud Providers

The [Authentication](concepts/iam/authentication) concepts page details
different ways to grant users access to the Guardrails console - Turbot directory
(local or via an organization directory), SAML (Azure AD, Okta, Ping, etc), and
Google. Guardrails does support
[LDAP/LDAPS directories](guides/directories/ldap-ldaps). These directories can
be created to sync active directory groups with Guardrails profiles.

[Identities](concepts/iam/identity) is the mapping of events in the cloud to
Guardrails entities. Every Guardrails event contains an Actor object with this
identifying information.

Finally, [Permissions](concepts/iam/permissions) tie together authentication to
resource access. Using Guardrails' robust permission structure, administrators can
grant users access to a broad and/or specific set of resources.

## Guides

|                                                                             |                                                                                                                                                                                          |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Setting up a directory](guides/directories)                                | This page includes instructions on creating a Local directory (both a local and organizational directory), Google, Okta, Azure AD, as well as configuring LDAP/LDAPS to sync groups.     |
| [Best practice for Guardrails provisioned admin](guides/iam/administrators) | Upon workspace creation, a local administrator is provisioned in the local directory. This guide details the steps to take after initial login.                                          |
| [Adding users to a local Turbot directory](guides/iam/user-mgt)             | SAML and Google directories in Guardrails automatically provision profiles when users login, but administrators must create profiles for a local Turbot directory.                       |
| [API Access keys](guides/iam/access-keys)                                   | Create API access keys in Guardrails.                                                                                                                                                    |
| [Assigning permissions](guides/iam/permission-assignment)                   | Assigning permissions in Guardrails.                                                                                                                                                     |
