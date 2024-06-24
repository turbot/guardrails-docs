---
title: 'PutResourceInput'
template: Documentation
sidebar_label: PutResourceInput
deprecated: false
nav:
  title: 'PutResourceInput'
  order: 10
---

# PutResourceInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>PutResourceInput</span></div>



Optionally provide new `data`, custom `metadata`, `tags` or `akas`

| | | |
| -- | -- | -- |
| `akas` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!]</span> | Optional `akas` for the resource to put |
| `data` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional `data` of the resource to put |
| `id` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `id` of the resource to put, either as an id, or an AKA |
| `metadata` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional custom `metadata` of the resource to put |
| `tags` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional `tags` for the resource to put |