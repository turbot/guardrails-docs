---
title: Authentication
sidebar_label: Authentication
---

# Authentication

Guardrails supports multiple methods of authentication, including LDAP and
local username/passwords.

### Directories

A directory is a mechanism that allows users and groups to access Guardrails. In the
simplest use case, a directory will allow a user to log into the Guardrails
application, where they can then perform actions entitled to them via the
permissions model.

Guardrails currently allows user/group access from 3 different sources:

| Source                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Guardrails Local Directory | Guardrails provides support for basic user and group management in an internal directory. Guardrails local directories are typically used for bootstrapping and break-glass access. An installation of Guardrails will contain an initial internal directory, with a break-glass/admin user. This user can then be used to create further break-glass users, or add and manage additional directories.                                  |
| Turbot.com Directory       | While named similarly, the Turbot.com directory is the connection of the user profile that exists on turbot.com and workspaces. A Turbot.com directory can be created in a workspace, and when attempting to log in via this directory, the user will get redirected to guardrails.turbot.com and back to the workspace! A profile is created upon the first login and administrators can assign permissions once the user has done so. |
| Google                     | Guardrails integrates with Google domains via a client ID/secret pair, allowing users within that domain to log into Guardrails. Group management can be done from within the Google Admin console.                                                                                                                                                                                                                                     |
| SAML                       | We have integrations with Identity Providers (IDPs) such as Okta, Ping, ADFS and in-house SAML solutions.<br/><br/>SAML is a popular choice, particularly with customers wishing to access Cloud Providers such as AWS, but without needing to provide direct access back to their on-site directory (e.g. Active Directory).<br/><br/>Guardrails also supports the sourcing of user groups in the SAML assertion                       |
| LDAP/ LDAPS                | Guardrails can use a LDAP/ LDAPS directory to sync groups and users and map them to existing profiles.                                                                                                                                                                                                                                                                                                                                  |

To setup a new directory or if there are questions regarding LDAP group sync,
head on over to our [Directories guide](guides/configuring-guardrails/directories).

To get right in and assign grants to user profiles on existing directories,
check out our
[Assigning Permissions in Guardrails](guides/iam/permission-assignment)
documentation.

### Profiles

A profile is simply the Guardrails representation of a user from one or more
directories. Every user that logs into Guardrails via a directory will be
represented as a profile. All subsequent permissions, actions etc will be
attributed to that profile.

By creating an abstraction of a directory user as a profile in Guardrails, this
allows advanced techniques such as multiple directories mapping a user to a
single profile in Guardrails. For example, you can configure a SAML directory used
for user authentication, whilst adding an additional LDAP directory used to
perform searches and other controls against the same user in your corporate
directory.

#### Login names

While a user in a directory can only be represented by a single profile in
Guardrails, that same user may require a different identity in all of the providers
that Guardrails will interact with ( AWS, Azure, GCP, etc.). These mappings can be
controlled using policies that target the profile.

<div className="example"> 
Login name mappings for the Guardrails Profile
   <code>Turbot > Google @ acme.com > John Doe</code> to login to AWS, Azure, and GCP
   are set via the policies <code>Azure > IAM > Login Names</code>,
   <code> GCP > IAM > Login Names</code>, and <code>AWS > IAM > Login User Names</code>
</div>

Typically, these use calculated policies to map users with a standard template.

##### Example: `Azure > IAM > Login Names`

For Acme corp, the `Azure > IAM > Login Names` is set using a calculated policy:

**Input Query**

```graphql
{
  profile {
    email
  }
}
```

**Input Template**

```
{% if $.profile.email %}
- {{$.profile.email.split("@")[0]}}@acme.onmicrosoft.com
{% endif %}
```

This results in user names such as "wiley@acme.onmicrosoft.com"
