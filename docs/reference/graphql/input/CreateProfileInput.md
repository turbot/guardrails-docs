---
title: 'CreateProfileInput'
template: Documentation
sidebar_label: CreateProfileInput
deprecated: false
nav:
  title: 'CreateProfileInput'
  order: 10
---

# CreateProfileInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>CreateProfileInput</span></div>



Input type to create a profile

| | | |
| -- | -- | -- |
| `directory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The parent `directory` of the profile to create, either as an id, or an AKA |
| `displayName` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `displayName` of the profile to create |
| `email` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `email` of the profile to create |
| `externalId` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `externalId` of the profile to create. If you are creating a profile for a local directory user, this must be a valid local directory user id |
| `familyName` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `familyName` of the profile to create |
| `givenName` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `givenName` of the profile to create |
| `picture` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `picture` of the profile to create. This must be a publicly accessible URL |
| `profileId` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `profileId` of the profile to create. For new profiles this must be unique for the parent `directory` |
| `status` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/ProfileStatus">ProfileStatus</a>!</span> | The `status` of the profile to create |
| `tags` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional `tags` for the profile to create |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `title` of the profile to create |