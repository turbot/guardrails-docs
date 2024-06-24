---
title: 'UpdateLocalDirectoryInput'
template: Documentation
sidebar_label: UpdateLocalDirectoryInput
deprecated: false
nav:
  title: 'UpdateLocalDirectoryInput'
  order: 10
---

# UpdateLocalDirectoryInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UpdateLocalDirectoryInput</span></div>



Input type to update a local directory

| | | |
| -- | -- | -- |
| `description` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `description` of the local directory to update |
| `id` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `id` of the local directory to update, either as an id, or an AKA |
| `parent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a></span> | Optional new `parent` for the local directory, either as an id, or an AKA |
| `status` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/DirectoryStatus">DirectoryStatus</a></span> | Optional `status` of the local directory to update |
| `tags` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional `tags` for the local directory to update |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `title` of the local directory to update |