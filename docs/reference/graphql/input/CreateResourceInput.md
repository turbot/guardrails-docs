---
title: 'CreateResourceInput'
template: Documentation
sidebar_label: CreateResourceInput
deprecated: false
nav:
  title: 'CreateResourceInput'
  order: 10
---

# CreateResourceInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>CreateResourceInput</span></div>



Create a resource for the given `parent` and `type` and with the given `data`. Optionally provide custom `metadata`, `tags` and `akas`

| | | |
| -- | -- | -- |
| `akas` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!]</span> | Optional `akas` for the resource to create |
| `data` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a>!</span> | The `data` of the resource to create |
| `metadata` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional custom `metadata` of the resource to create |
| `parent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a></span> | Optional: The `parent` of the resource to create, either as an id, or an AKA |
| `tags` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Options `tags` for the resource to create |
| `type` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `type` of the resource to create, either as an id, or an AKA |