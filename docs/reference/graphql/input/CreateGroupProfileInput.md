---
title: 'CreateGroupProfileInput'
template: Documentation
sidebar_label: CreateGroupProfileInput
deprecated: false
nav:
  title: 'CreateGroupProfileInput'
  order: 10
---

# CreateGroupProfileInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>CreateGroupProfileInput</span></div>



Input type to create a group profile

| | | |
| -- | -- | -- |
| `directory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The parent `directory` of the group profile to create, either as an id, or an AKA |
| `groupProfileId` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `groupProfileId` of the group profile to create. For new group profiles this must be unique for the parent `directory` |
| `status` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/ProfileStatus">ProfileStatus</a>!</span> | The `status` of the group profile to create |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `title` of the group profile to create |