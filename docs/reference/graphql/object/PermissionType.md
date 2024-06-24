---
title: 'PermissionType'
template: Documentation
sidebar_label: PermissionType
deprecated: false
nav:
  title: 'PermissionType'
  order: 10
---

# PermissionType

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>PermissionType</span></div>



For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).

| | | |
| -- | -- | -- |
| `category` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Category URI. |
| `categoryUri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Category URI. |
| `modUri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Unique identifier for the defining mod. |
| `parent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Parent URI. |
| `parentUri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Parent URI. |
| `targets` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>]</span> | Target resource interface / type URIs. |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Display title. |
| `trunk` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TrunkItems">TrunkItems</a></span> | The `trunk` for this `PermissionType`. This will show the resource type hierarchy from the root `PermissionType` down to this `PermissionType`. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotPermissionMetadata">TurbotPermissionMetadata</a></span> | Turbot metadata for this `PermissionType`. |
| `uri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Mod-specific unique identifier. |