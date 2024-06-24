---
title: 'IdentitySearchInput'
template: Documentation
sidebar_label: IdentitySearchInput
deprecated: false
nav:
  title: 'IdentitySearchInput'
  order: 10
---

# IdentitySearchInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>IdentitySearchInput</span></div>



Search for an `identity` of a given `type` in the given `directory`

| | | |
| -- | -- | -- |
| `directory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `directory` to search for the `identity` in, either as an id, or an AKA |
| `identity` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `identity` to search for. |
| `type` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/IdentitySearchType">IdentitySearchType</a>!</span> | The `type` of the `identity` to search for |