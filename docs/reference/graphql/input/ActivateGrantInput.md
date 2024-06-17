---
title: 'ActivateGrantInput'
template: Documentation
sidebar_label: ActivateGrantInput
deprecated: false
nav:
  title: 'ActivateGrantInput'
  order: 10
---

# ActivateGrantInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>ActivateGrantInput</span></div>



Activate a `grant` at the given `resource`. Optionally provide `note`, `validFromTimestamp` and `validToTimestamp`

| | | |
| -- | -- | -- |
| `grant` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `grant` of the grant to activate, as an id |
| `note` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `note` for the grant activation, as a string |
| `resource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `resource` level to activate the grant at, either as an id, or an AKA |
| `validFromTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `validFromTimestamp` for the grant activation, as an ISO string |
| `validToTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `validToTimestamp` for the grant activation, as an ISO string |