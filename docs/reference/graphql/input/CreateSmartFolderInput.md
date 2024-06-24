---
title: 'CreateSmartFolderInput'
template: Documentation
sidebar_label: CreateSmartFolderInput
deprecated: false
nav:
  title: 'CreateSmartFolderInput'
  order: 10
---

# CreateSmartFolderInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>CreateSmartFolderInput</span></div>



Create a smart folder for the given `parent` Optionally provide  `title`, `description` and `filter`

| | | |
| -- | -- | -- |
| `akas` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!]</span> | Optional `akas` for the resource to upsert |
| `color` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `color` of the smart folder to create, that will be used to highlight the Smart Folder in the Turbot console, in 3 or 6-character hexadecimal format e.g. #1CB640. If not set one will be chosen at random. |
| `description` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `description` of the smart folder to create |
| `filter` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `filter` of the smart folder to create, used for auto-attachment |
| `parent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `parent` of the smart folder to create, either as an id, or an AKA |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `title` of the smart folder to create |