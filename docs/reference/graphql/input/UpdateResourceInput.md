---
title: 'UpdateResourceInput'
template: Documentation
sidebar_label: UpdateResourceInput
deprecated: false
nav:
  title: 'UpdateResourceInput'
  order: 10
---

# UpdateResourceInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UpdateResourceInput</span></div>



Optionally provide a new `parent`, provide `data` updates, or update custom `metadata`, `tags` and `akas`

| | | |
| -- | -- | -- |
| `akas` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!]</span> | Optional `akas` of the resource to update |
| `data` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional `data` of the resource to update |
| `id` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `id` of the resource to update, either as an id, or an AKA |
| `metadata` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional custom `metadata` of the resource to update |
| `parent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a></span> | Optional `parent` of the resource to update, either as an id, or an AKA |
| `tags` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional `tags` for the resource to update |