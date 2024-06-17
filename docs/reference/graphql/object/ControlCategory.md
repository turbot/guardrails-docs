---
title: 'ControlCategory'
template: Documentation
sidebar_label: ControlCategory
deprecated: false
nav:
  title: 'ControlCategory'
  order: 10
---

# ControlCategory

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>ControlCategory</span></div>



Represents a `ControlCategory` defined within a Mod.

For more information, please see [Controls](https://turbot.com/guardrails/docs/concepts/controls).

| | | |
| -- | -- | -- |
| `children` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ControlCategories">ControlCategories</a></span> | The immediate `children` for this `ControlCategory`. |
| `controls` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Controls">Controls</a></span> | Returns any `controls` for this `ControlCategory` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `descendants` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ControlCategories">ControlCategories</a></span> | The `descendants` of this `ControlCategory`. |
| `description` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Short human-friendly description. |
| `icon` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | FontAwesome `icon` reference, used for display in the product and documentation. Will be in the format `fal-<icon>`, `far-<icon>` or `fas-<icon>` for light, regular and solid icon classes respectively. |
| `modUri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Unique identifier for the defining mod. |
| `parent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | The `parent` mod-specifuc URI for this `ControlCategory`. |
| `policySettings` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicySettings">PolicySettings</a></span> | Returns any `policySettings` for this `ControlCategory` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `resourceParent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | The `resourceParent` mod-specifuc URI for this `ControlCategory` in the static category hierarchy. |
| `resources` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resources">Resources</a></span> | The `resources` of this `ControlCategory`, subject to the optional `filter` and `paging` arguments. |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Display title. |
| `trunk` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TrunkItems">TrunkItems</a></span> | The `trunk` for this `ControlCategory`, subject to the optional `filter` and `paging` arguments. This will show the resource type hierarchy from the root down to this `ControlCategory`. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotControlCategoryMetadata">TurbotControlCategoryMetadata</a>!</span> | Turbot metadata for this `ControlCategory`. |
| `uri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Mod-specific unique identifier. |