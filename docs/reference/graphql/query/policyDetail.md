---
title: 'policyDetail'
template: Documentation
sidebar_label: policyDetail
deprecated: false
nav:
  title: 'policyDetail'
  order: 10
---

# policyDetail

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">policyDetail</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>, uri: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, resourceId: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>, resourceAka: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/PolicyDetail">PolicyDetail</a></span>
</div>



Get a `policyDetail` by either policy value `id`, or by policy type `uri` and `resourceId`/`resourceAka`.

This will retrieve the current policy detail, meaning that a deleted policy setting/value will return a not found error.

For more information, please see [Policy Values & Settings](https://turbot.com/guardrails/docs/concepts/policies/values-settings).