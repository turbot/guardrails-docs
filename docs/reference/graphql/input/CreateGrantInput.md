---
title: 'CreateGrantInput'
template: Documentation
sidebar_label: CreateGrantInput
deprecated: false
nav:
  title: 'CreateGrantInput'
  order: 10
---

# CreateGrantInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>CreateGrantInput</span></div>



Create a grant for the given `type`, `level`, `resource` and `identity` or `identitySearch`. Optionally provide `note`, `validFromTimestamp` and `validToTimestamp`

| | | |
| -- | -- | -- |
| `groupName` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `groupName` for the grant, as a string |
| `identity` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a></span> | The `identity` to create the grant for, either as an id, or an AKA |
| `identitySearch` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/input/IdentitySearchInput">IdentitySearchInput</a></span> | The `identitySearch` to create the grant for, specifying the `directory`, `type` and `identity` to search for. |
| `level` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The permission `level` of the grant to create, either as an id, or an AKA |
| `note` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `note` for the grant, as a string |
| `resource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `resource` level to create the grant at, either as an id, or an AKA |
| `roleName` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `roleName` for the grant, as a string |
| `type` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The permission `type` of the grant to create, either as an id, or an AKA |
| `validFromTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `validFromTimestamp` for the grant, as an ISO string |
| `validToTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `validToTimestamp` for the grant, as an ISO string |