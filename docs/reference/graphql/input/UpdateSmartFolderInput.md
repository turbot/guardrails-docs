---
title: 'UpdateSmartFolderInput'
template: Documentation
sidebar_label: UpdateSmartFolderInput
deprecated: false
nav:
  title: 'UpdateSmartFolderInput'
  order: 10
---

# UpdateSmartFolderInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UpdateSmartFolderInput</span></div>



Update a policy pack with the given `id` Optionally provide  `title`, `description` and `filter`

| | | |
| -- | -- | -- |
| `akas` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!]</span> | Optional `akas` for the resource to upsert |
| `color` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `color` of the policy pack to update, that will be used to highlight the Policy Pack in the Guardrails console, in 3 or 6-character hexadecimal format e.g. #1CB640. |
| `description` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `description` of the policy pack to update |
| `filter` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `filter` of the policy pack to update, used for auto-attachment |
| `id` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `id` of the policy pack to update |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `title` of the policy pack to update |