---
title: 'CreateWatchInput'
template: Documentation
sidebar_label: CreateWatchInput
deprecated: false
nav:
  title: 'CreateWatchInput'
  order: 10
---

# CreateWatchInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>CreateWatchInput</span></div>



Create a watch for the given `resource`. Optionally provide `action`, `identity` and `favorite`

| | | |
| -- | -- | -- |
| `action` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a></span> | Optional `action` type for the watch, either as an id, or an AKA |
| `favorite` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a></span> | Optional `favorite` to associate the watch with, as an id |
| `filters` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!]</span> | Mandatory `filters` string array for the watch which populates watch pivots criteria |
| `identity` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a></span> | Optional `identity` type for the watch, either as an id, or an AKA |
| `resource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `resource` to create the watch for, either as an id, or an AKA |