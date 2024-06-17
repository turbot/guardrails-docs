---
title: 'policyType'
template: Documentation
sidebar_label: policyType
deprecated: false
nav:
  title: 'policyType'
  order: 10
---

# policyType

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">policyType</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!, options: <a href="/guardrails/docs/reference/graphql/input/GetItemOptions">GetItemOptions</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/PolicyType">PolicyType</a></span>
</div>



Get a `policyType` by `id`.

This will retrieve the current policy type, meaning that a deleted policy type will return a not found error.

For more information, please see [Policy Types & Categories](https://turbot.com/guardrails/docs/concepts/policies/types-categories).