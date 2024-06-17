---
title: 'PermissionsByIdentity'
template: Documentation
sidebar_label: PermissionsByIdentity
deprecated: false
nav:
  title: 'PermissionsByIdentity'
  order: 10
---

# PermissionsByIdentity

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>PermissionsByIdentity</span></div>



Returns `grants` and `activeGrants` for the given `identity`.

| | | |
| -- | -- | -- |
| `activeGrants` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/object/ActiveGrant">ActiveGrant</a>]</span> | List of `activeGrants` for this `identity`. |
| `grants` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/object/Grant">Grant</a>]</span> | List of `grants` for this `identity`. |
| `identity` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | The `identity` information. |