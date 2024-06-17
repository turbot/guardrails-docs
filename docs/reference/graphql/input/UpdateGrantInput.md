---
title: 'UpdateGrantInput'
template: Documentation
sidebar_label: UpdateGrantInput
deprecated: false
nav:
  title: 'UpdateGrantInput'
  order: 10
---

# UpdateGrantInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UpdateGrantInput</span></div>



Update a grant with the given `id`. Optionally provide `note`, `validFromTimestamp` and `validToTimestamp`

| | | |
| -- | -- | -- |
| `id` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `id` of the grant to update |
| `note` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `note` for the grant, as a string |
| `validFromTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `validFromTimestamp` for the grant, as an ISO string |
| `validToTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `validToTimestamp` for the grant, as an ISO string |