---
title: 'ResourceType'
template: Documentation
sidebar_label: ResourceType
deprecated: false
nav:
  title: 'ResourceType'
  order: 10
---

# ResourceType

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>ResourceType</span></div>



Represents a `ResourceType` defined within a Mod.

For more information, please see [Resource Types & Categories](https://turbot.com/guardrails/docs/concepts/resource/types-categories) and [Mods](https://turbot.com/guardrails/docs/mods).

| | | |
| -- | -- | -- |
| `category` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ResourceCategory">ResourceCategory</a></span> | The `category` information for this `ResourceType`. |
| `categoryUri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Unique identifier for the category. |
| `children` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ResourceTypes">ResourceTypes</a></span> | The immediate `children` for this `ResourceType`. |
| `controls` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Controls">Controls</a></span> | Returns any `controls` for this `ResourceType` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `descendants` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ResourceTypes">ResourceTypes</a></span> | The `descendants` of this `ResourceType`. |
| `description` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Short human-friendly description. |
| `graphQL` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/GraphqlResourceTypeMetadata">GraphqlResourceTypeMetadata</a></span> | Returns compiled `graphQL` typedefs for this `ResourceType`, used for generating strongly-typed custom resource schemas in runnable input queries. |
| `icon` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | FontAwesome `icon` reference, used for display in the product and documentation. Will be in the format `fal-<icon>`, `far-<icon>` or `fas-<icon>` for light, regular and solid icon classes respectively. |
| `metadataTemplates` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional `metadataTemplates` for the `ResourceType`. |
| `modUri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Unique identifier for the defining mod. |
| `policySettings` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicySettings">PolicySettings</a></span> | Returns any `policySettings` for this `ResourceType` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `resources` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resources">Resources</a></span> | The `resources` of this `ResourceType`, subject to the optional `filter` and `paging` arguments. |
| `terraform` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TerraformResourceTypeMetadata">TerraformResourceTypeMetadata</a></span> | Contains property mappings and other metadata to allow Turbot to manage `resources` of this the `ResourceType` using `terraform`. |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Display title. |
| `trunk` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TrunkItems">TrunkItems</a></span> | The `trunk` for this `ResourceType`, subject to the optional `filter` and `paging` arguments. This will show the resource type hierarchy from the root down to this `ResourceType`. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotResourceTypeMetadata">TurbotResourceTypeMetadata</a>!</span> | Turbot metadata for this `ResourceType`. |
| `uri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Mod-specific unique identifier. |