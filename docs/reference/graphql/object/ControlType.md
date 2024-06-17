---
title: 'ControlType'
template: Documentation
sidebar_label: ControlType
deprecated: false
nav:
  title: 'ControlType'
  order: 10
---

# ControlType

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>ControlType</span></div>



Represents a `ControlType` defined within a Mod.

For more information, please see [Controls](https://turbot.com/guardrails/docs/concepts/controls).

| | | |
| -- | -- | -- |
| `actionTypes` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ActionTypes">ActionTypes</a></span> | Returns any recommended `actionTypes` for this `ControlType` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `category` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ControlCategory">ControlCategory</a></span> | The `category` information for this `ControlType`. |
| `categoryUri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Unique identifier for the category. |
| `children` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ControlTypes">ControlTypes</a></span> | The immediate `children` for this `ControlType`. |
| `controls` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Controls">Controls</a></span> | Returns any `controls` for this `ControlType` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `descendants` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ControlTypes">ControlTypes</a></span> | The `descendants` of this `ControlType`. |
| `description` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Short human-friendly description. |
| `events` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!]</span> | `events` that trigger a run of instances of this `ControlType`. |
| `icon` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | FontAwesome `icon` reference, used for display in the product and documentation. Will be in the format `fal-<icon>`, `far-<icon>` or `fas-<icon>` for light, regular and solid icon classes respectively. |
| `modUri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Unique identifier for the defining mod. |
| `policySettings` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicySettings">PolicySettings</a></span> | Returns any `policySettings` for this `ControlType` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `resources` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resources">Resources</a></span> | The `resources` of this `ControlType`, subject to the optional `filter` and `paging` arguments. |
| `targets` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!]</span> | Target resource interface / type URIs. |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Display title. |
| `trunk` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TrunkItems">TrunkItems</a></span> | The `trunk` for this `ControlType`, subject to the optional `filter` and `paging` arguments. This will show the resource type hierarchy from the root down to this `ControlType`. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotControlTypeMetadata">TurbotControlTypeMetadata</a>!</span> | Turbot metadata for this `ControlType`. |
| `uri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Mod-specific unique identifier. |