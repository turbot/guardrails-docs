---
title: 'CreateLocalDirectoryInput'
template: Documentation
sidebar_label: CreateLocalDirectoryInput
deprecated: false
nav:
  title: 'CreateLocalDirectoryInput'
  order: 10
---

# CreateLocalDirectoryInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>CreateLocalDirectoryInput</span></div>



Input type to create a local directory

| | | |
| -- | -- | -- |
| `description` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `description` of the local directory to create |
| `parent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `parent` of the local directory to create, either as an id, or an AKA |
| `profileIdTemplate` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `profileIdTemplate` of the local directory to create |
| `status` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/DirectoryStatus">DirectoryStatus</a>!</span> | The `status` of the local directory to create |
| `tags` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional `tags` for the local directory to create |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `title` of the local directory to create |