---
title: 'PolicyType'
template: Documentation
sidebar_label: PolicyType
deprecated: false
nav:
  title: 'PolicyType'
  order: 10
---

# PolicyType

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>PolicyType</span></div>



Represents a `PolicyType` defined within a Mod.

For more information, please see [Policy Types & Categories](https://turbot.com/guardrails/docs/concepts/policies/types-categories) and [Mods](https://turbot.com/guardrails/docs/mods).

| | | |
| -- | -- | -- |
| `category` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ControlCategory">ControlCategory</a></span> | The `category` information for this `PolicyType`. |
| `categoryUri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Unique identifier for the category. |
| `children` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyTypes">PolicyTypes</a></span> | The immediate `children` for this `PolicyType`. |
| `controls` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Controls">Controls</a></span> | Returns any `controls` for this `PolicyType` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `defaultTemplate` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional Nunjucks template used to calculate the default policy value for any targeted resources. |
| `defaultTemplateInput` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional GraphQL query used to calculate the default policy value for any targeted resources. |
| `descendants` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyTypes">PolicyTypes</a></span> | The `descendants` of this `PolicyType`. |
| `description` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Short human-friendly description. |
| `icon` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | FontAwesome `icon` reference, used for display in the product and documentation. Will be in the format `fal-<icon>`, `far-<icon>` or `fas-<icon>` for light, regular and solid icon classes respectively. |
| `input` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>]</span> |  |
| `modUri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Unique identifier for the defining mod. |
| `policySettings` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicySettings">PolicySettings</a></span> | Returns any `policySettings` for this `PolicyType` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `policyValues` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyValues">PolicyValues</a></span> | Returns any `policyValues` for this `PolicyType` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `readOnly` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | If `true` user-defined policy settings are blocked from being created. |
| `resolvedSchema` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | JSON schema with fully-resolved URI references, defining the allowed schema for policy values for any targeted resources. |
| `resources` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resources">Resources</a></span> | The `resources` of this `PolicyType`, subject to the optional `filter` and `paging` arguments. |
| `schema` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | JSON schema defining the allowed schema for policy values for any targeted resources. |
| `secret` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | If `true` any non-calculated policy settings and policy values for targeted resources will be encrypted at rest. |
| `secretLevel` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/SecretLevel">SecretLevel</a></span> |  |
| `targets` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!]</span> | Target resource interface / type URIs. |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Display title. |
| `trunk` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TrunkItems">TrunkItems</a></span> | The `trunk` for this `PolicyType`, subject to the optional `filter` and `paging` arguments. This will show the resource type hierarchy from the root down to this `PolicyType`. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotPolicyTypeMetadata">TurbotPolicyTypeMetadata</a>!</span> | Turbot metadata for this `PolicyType`. |
| `uri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Mod-specific unique identifier. |
| `hidden` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | <span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Unused field. Will be removed in a forthcoming release.</span> |