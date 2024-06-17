---
title: 'policyValue'
template: Documentation
sidebar_label: policyValue
deprecated: false
nav:
  title: 'policyValue'
  order: 10
---

# policyValue

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">policyValue</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>, uri: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, resourceId: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>, resourceAka: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/PolicyValue">PolicyValue</a></span>
</div>



Get a `policyValue` by either `id`, or by policy type `uri` and `resourceId`/`resourceAka`.

This will retrieve the current policy value, meaning that a deleted policy value will return a not found error.

For more information, please see [Policy Values & Settings](https://turbot.com/guardrails/docs/concepts/policies/values-settings).