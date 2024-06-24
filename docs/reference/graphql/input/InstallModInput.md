---
title: 'InstallModInput'
template: Documentation
sidebar_label: InstallModInput
deprecated: false
nav:
  title: 'InstallModInput'
  order: 10
---

# InstallModInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>InstallModInput</span></div>



Install the `mod` for the given `org` and `version`, at the given `parent`

| | | |
| -- | -- | -- |
| `mod` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `mod` to install |
| `org` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `org` for the mod to install |
| `parent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `parent` to install the mod under, either as an id, or an AKA (currently restricted to root resource only) |
| `version` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `version` of the mod to install |