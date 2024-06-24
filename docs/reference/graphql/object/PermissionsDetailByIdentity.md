---
title: 'PermissionsDetailByIdentity'
template: Documentation
sidebar_label: PermissionsDetailByIdentity
deprecated: false
nav:
  title: 'PermissionsDetailByIdentity'
  order: 10
---

# PermissionsDetailByIdentity

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>PermissionsDetailByIdentity</span></div>



A list of `permissions` for an `identity`.

| | | |
| -- | -- | -- |
| `identity` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | The `identity` for this `PermissionsDetailByIdentity`. |
| `permissions` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/object/PermissionsByResource">PermissionsByResource</a>]</span> | The `permissions` for this `PermissionsDetailByIdentity`. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotIdentityPermissionsDetailMetadata">TurbotIdentityPermissionsDetailMetadata</a>!</span> | Turbot metadata for this `PermissionsDetailByIdentity`. |