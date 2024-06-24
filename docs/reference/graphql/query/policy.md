---
title: 'policy'
template: Documentation
sidebar_label: policy
deprecated: false
nav:
  title: 'policy'
  order: 10
---

# policy

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">policy</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>, uri: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, resourceId: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>, resourceAka: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span>
</div>



Get the value for a `policy` by either `id`, or by policy type `uri` and `resourceId`/`resourceAka`.

This will retrieve the current policy setting, meaning that a deleted policy setting will return a not found error.

For more information, please see [Policy Values & Settings](https://turbot.com/guardrails/docs/concepts/policies/values-settings).