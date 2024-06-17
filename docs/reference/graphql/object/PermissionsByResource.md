---
title: 'PermissionsByResource'
template: Documentation
sidebar_label: PermissionsByResource
deprecated: false
nav:
  title: 'PermissionsByResource'
  order: 10
---

# PermissionsByResource

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>PermissionsByResource</span></div>



Returns `grants` and `activeGrants` for the given `resource`.

| | | |
| -- | -- | -- |
| `activeGrants` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/object/ActiveGrant">ActiveGrant</a>]</span> | List of `activeGrants` for this `resource`. |
| `grants` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/object/Grant">Grant</a>]</span> | List of `grants` for this `resource`. |
| `resource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | The `resource` information. |