---
title: 'ResourceCategory'
template: Documentation
sidebar_label: ResourceCategory
deprecated: false
nav:
  title: 'ResourceCategory'
  order: 10
---

# ResourceCategory

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>ResourceCategory</span></div>



Represents a `ResourceCategory` in Turbot.

For more information, please see [Resource Types & Categories](https://turbot.com/guardrails/docs/concepts/resource/types-categories) and [Mods](https://turbot.com/guardrails/docs/mods).

| | | |
| -- | -- | -- |
| `children` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ResourceCategories">ResourceCategories</a></span> | The immediate `children` for this `ResourceCategory`. |
| `controls` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Controls">Controls</a></span> | Returns any `controls` for this `ResourceCategory` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `descendants` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ResourceCategories">ResourceCategories</a></span> | The `descendants` of this `ResourceCategory`. |
| `description` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Short human-friendly description. |
| `icon` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | FontAwesome `icon` reference, used for display in the product and documentation. Will be in the format `fal-<icon>`, `far-<icon>` or `fas-<icon>` for light, regular and solid icon classes respectively. |
| `modUri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Unique identifier for the defining mod. |
| `parent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | The `parent` `ResourceCategory` of this `ResourceCategory`. |
| `policySettings` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicySettings">PolicySettings</a></span> | Returns any `policySettings` for this `ResourceCategory` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `resources` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resources">Resources</a></span> | The `resources` of this `ResourceCategory`, subject to the optional `filter` and `paging` arguments. |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Display title. |
| `trunk` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TrunkItems">TrunkItems</a></span> | The `trunk` for this `ResourceCategory`, subject to the optional `filter` and `paging` arguments. This will show the resource type hierarchy from the root down to this `ResourceCategory`. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotResourceCategoryMetadata">TurbotResourceCategoryMetadata</a>!</span> | Turbot metadata for this `ResourceCategory`. |
| `uri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Mod-specific unique identifier. |