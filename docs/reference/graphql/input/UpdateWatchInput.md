---
title: 'UpdateWatchInput'
template: Documentation
sidebar_label: UpdateWatchInput
deprecated: false
nav:
  title: 'UpdateWatchInput'
  order: 10
---

# UpdateWatchInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UpdateWatchInput</span></div>



Update a watch by `id`. Optionally provide `action`, `identity` and `favorite`

| | | |
| -- | -- | -- |
| `action` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a></span> | Optional `action` type for the watch, either as an id, or an AKA |
| `favorite` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a></span> | Optional `favorite` to associate the watch with, as an id |
| `filters` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!]</span> | Mandatory `filters` string array for the watch which populates watch pivots criteria |
| `id` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `id` of the watch to update |
| `identity` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a></span> | Optional `identity` type for the watch, either as an id, or an AKA |