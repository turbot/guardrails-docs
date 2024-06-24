---
title: 'Identity'
template: Documentation
sidebar_label: Identity
deprecated: false
nav:
  title: 'Identity'
  order: 10
---

# Identity

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>Identity</span></div>





| | | |
| -- | -- | -- |
| `picture` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> |  |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> |  |
| `trunk` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TrunkItems">TrunkItems</a></span> | The `trunk` for this `Identity`. This will show the resource type hierarchy from the root down to this `Identity`. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotResourceMetadata">TurbotResourceMetadata</a>!</span> |  |
| `type` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ResourceType">ResourceType</a></span> | The `type` information for this `Identity`. |