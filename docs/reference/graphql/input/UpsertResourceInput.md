---
title: 'UpsertResourceInput'
template: Documentation
sidebar_label: UpsertResourceInput
deprecated: false
nav:
  title: 'UpsertResourceInput'
  order: 10
---

# UpsertResourceInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UpsertResourceInput</span></div>



Upsert a resource for the given `parent` and `type` and with the given `data`. Optionally provide custom `metadata`, `tags` and `akas`. If `akas` are passed, the first one in the array will be used to look up if the resource already exists. If no `akas` are passed, the first resource type AKA metadata template will be rendered using the resource data and used to look up if the resource already exists

| | | |
| -- | -- | -- |
| `akas` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!]</span> | Optional `akas` for the resource to upsert |
| `data` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a>!</span> | The `data` of the resource to upsert |
| `metadata` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional custom `metadata` of the resource to upsert |
| `parent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a></span> | Optional: The `parent` of the resource to upsert, either as an id, or an AKA |
| `tags` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional `tags` for the resource to upsert |
| `type` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `type` of the resource to upsert, either as an id, or an AKA |