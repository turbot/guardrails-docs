---
title: 'PermissionLevel'
template: Documentation
sidebar_label: PermissionLevel
deprecated: false
nav:
  title: 'PermissionLevel'
  order: 10
---

# PermissionLevel

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>PermissionLevel</span></div>



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
| `trunk` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TrunkItems">TrunkItems</a></span> | The `trunk` for this `PermissionLevel`. This will show the resource type hierarchy from the root `PermissionLevel` down to this `PermissionLevel`. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotPermissionMetadata">TurbotPermissionMetadata</a></span> | Turbot metadata for this `PermissionLevel`. |
| `uri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Mod-specific unique identifier. |