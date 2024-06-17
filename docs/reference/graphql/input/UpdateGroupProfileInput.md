---
title: 'UpdateGroupProfileInput'
template: Documentation
sidebar_label: UpdateGroupProfileInput
deprecated: false
nav:
  title: 'UpdateGroupProfileInput'
  order: 10
---

# UpdateGroupProfileInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UpdateGroupProfileInput</span></div>



Update an existing group profile by `id`

| | | |
| -- | -- | -- |
| `id` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `id` of the group profile to update, either as an id, or an AKA |
| `status` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/ProfileStatus">ProfileStatus</a></span> | Optional `status` of the group profile to update |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `title` of the group profile to update |