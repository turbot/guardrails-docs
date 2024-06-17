---
title: 'ProfileInformation'
template: Documentation
sidebar_label: ProfileInformation
deprecated: false
nav:
  title: 'ProfileInformation'
  order: 10
---

# ProfileInformation

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>ProfileInformation</span></div>



Represents `profile` information for the authenticated user.

| | | |
| -- | -- | -- |
| `accounts` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ProfileAccounts">ProfileAccounts</a></span> | The `accounts` this `profile` has access to |
| `loginNames` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | A dynamic set of login names that represent this `profile` in different login providers e.g. `aws`, `azure` etc. |