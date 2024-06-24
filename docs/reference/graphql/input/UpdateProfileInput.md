---
title: 'UpdateProfileInput'
template: Documentation
sidebar_label: UpdateProfileInput
deprecated: false
nav:
  title: 'UpdateProfileInput'
  order: 10
---

# UpdateProfileInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UpdateProfileInput</span></div>



Update an existing profile by `id`

| | | |
| -- | -- | -- |
| `displayName` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `displayName` of the profile to update |
| `email` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `email` of the profile to update |
| `familyName` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `familyName` of the profile to update |
| `givenName` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `givenName` of the profile to update |
| `id` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `id` of the profile to update, either as an id, or an AKA |
| `picture` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `picture` of the profile to update. This must be a publicly accessible URL |
| `status` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/ProfileStatus">ProfileStatus</a></span> | Optional `status` of the profile to update |
| `tags` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional `tags` for the profile to update |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `title` of the profile to update |