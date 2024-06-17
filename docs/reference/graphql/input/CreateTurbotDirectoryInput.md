---
title: 'CreateTurbotDirectoryInput'
template: Documentation
sidebar_label: CreateTurbotDirectoryInput
deprecated: false
nav:
  title: 'CreateTurbotDirectoryInput'
  order: 10
---

# CreateTurbotDirectoryInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>CreateTurbotDirectoryInput</span></div>



Input type to create a Turbot directory

| | | |
| -- | -- | -- |
| `description` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `description` of the Turbot directory to create |
| `parent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `parent` of the Turbot directory to create, either as an id, or an AKA |
| `profileIdTemplate` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `profileIdTemplate` of the Turbot directory to create |
| `server` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The Turbot registry `server` to connect to for authentication |
| `status` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/DirectoryStatus">DirectoryStatus</a>!</span> | The `status` of the Turbot directory to create |
| `tags` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional `tags` for the Turbot directory to create |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `title` of the Turbot directory to create |