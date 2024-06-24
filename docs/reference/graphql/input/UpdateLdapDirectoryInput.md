---
title: 'UpdateLdapDirectoryInput'
template: Documentation
sidebar_label: UpdateLdapDirectoryInput
deprecated: false
nav:
  title: 'UpdateLdapDirectoryInput'
  order: 10
---

# UpdateLdapDirectoryInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UpdateLdapDirectoryInput</span></div>



Input type to update an LDAP directory

| | | |
| -- | -- | -- |
| `base` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `base` DN of the LDAP directory to connect to |
| `connectivityTestFilter` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `connectivityTestFilter` of the LDAP directory to store a test filter to be used by the connectivity control for testing LDAP connections. |
| `description` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `description` of the LDAP directory to update |
| `disabledGroupFilter` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `disabledGroupFilter` of the LDAP directory to filter out disabled groups in the LDAP server. If not specified then `(description=disabled)` is used. |
| `disabledUserFilter` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `disabledUserFilter` of the LDAP directory to connect to. If not specified then `!(userAccountControl:1.2.840.113556.1.4.803:=2)` is used |
| `distinguishedName` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `distinguishedName` of the LDAP directory account to connect as |
| `groupCanonicalNameAttribute` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `groupCanonicalNameAttribute` of the LDAP directory to connect to. If not specified then `cn` is used |
| `groupMemberOfAttribute` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `groupMemberOfAttribute` of the LDAP directory to store the attribute name where parent groups of a group/user are stored. |
| `groupMembershipAttribute` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `groupMembershipAttribute` of the LDAP directory to store the attribute name where member groups/users of a group are stored. |
| `groupObjectFilter` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `groupObjectFilter` of the LDAP directory to connect to. If not specified then `(objectCategory=group)` is used |
| `groupSearchFilter` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `groupSearchFilter` of the LDAP directory to connect to. The provided filter is Nunjucks rendered with `groupname` provided as a data parameter. If not specified then `(|(sAMAccountName={{groupname}}*)(mail={{groupname}}*)(cn={{groupname}}*))` is used |
| `groupSyncFilter` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `groupSyncFilter` of the LDAP directory to connect to. This filter will find groups to sync, subject to the `base` and `groupObjectFilter`. |
| `id` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `id` of the LDAP directory to update, either as an id, or an AKA |
| `password` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `password` of the LDAP directory account to connect as |
| `rejectUnauthorized` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | Optional `rejectUnauthorized` of the LDAP directory indicating whether unauthorized LDAP server requests should be rejected or not. |
| `status` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/DirectoryStatus">DirectoryStatus</a></span> | Optional `status` of the LDAP directory to update |
| `tags` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional `tags` for the LDAP directory to update |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `title` of the LDAP directory to update |
| `tlsEnabled` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | Optional `tlsEnabled` of the LDAP directory indicating whether server side TLS encryption is enabled for the LDAP Connection. |
| `tlsServerCertificate` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `tlsServerCertificate` of the LDAP directory to store the root certificate for TLS encryption. |
| `url` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `url` of the LDAP directory to connect to |
| `userCanonicalNameAttribute` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `userCanonicalNameAttribute` of the LDAP directory to connect to. If not specified then `cn` is used |
| `userDisplayNameAttribute` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `userDisplayNameAttribute` of the LDAP directory to connect to. If not specified then `displayName` is used |
| `userEmailAttribute` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `userEmailAttribute` of the LDAP directory to connect to. If not specified then `mail` is used |
| `userFamilyNameAttribute` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `userFamilyNameAttribute` of the LDAP directory to connect to. If not specified then `sn` is used |
| `userGivenNameAttribute` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `userGivenNameAttribute` of the LDAP directory to connect to. If not specified then `givenName` is used |
| `userMatchFilter` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `userMatchFilter` of the LDAP directory to connect to. |
| `userObjectFilter` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `userObjectFilter` of the LDAP directory to connect to. If not specified then `(objectCategory=user)` is used |
| `userSearchAttributes` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!]</span> | Optional `userSearchAttributes` of the LDAP directory to connect to. If not specified then this defaults to `["*"]`. If attributes other than `"*"` are specified, then additionally the values for `userDisplayNameAttribute` and `userAccountNameAttribute` are included |
| `userSearchFilter` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `userSearchFilter` of the LDAP directory to connect to. The provided filter is Nunjucks rendered with `username` provided as a data parameter. If not specified then `(|(sAMAccountName={{username}}*)(mail={{username}}*)(givenName={{username}}*)(sn={{username}}*))` is used |