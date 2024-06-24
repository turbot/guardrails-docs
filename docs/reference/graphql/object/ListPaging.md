---
title: 'ListPaging'
template: Documentation
sidebar_label: ListPaging
deprecated: false
nav:
  title: 'ListPaging'
  order: 10
---

# ListPaging

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>ListPaging</span></div>



Paging information for a list type.

| | | |
| -- | -- | -- |
| `next` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `next` token, which if used in a subsequent list query would return the `next` page of items. A null token implies there are no `next` pages of data that can be fetched at the time of this response. |
| `poll` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | The `poll` token, used for polling lists that may change frequently e.g. `processLogs`. The difference between `next` and `poll` is that `next` will only return a token if there is more data available to be fetched, whereas `poll` will always return a token to where the `next` page of data can be fetched from, even if it does not yet exist. This allows consumers of this to `poll` this token and receive the `next` page of data once it is available. |
| `previous` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `previous` token, which if used in a subsequent list query would return the `previous` page of items. A null token implies there are no `previous` pages of data that can be fetched at the time of this response. |