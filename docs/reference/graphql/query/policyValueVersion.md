---
title: 'policyValueVersion'
template: Documentation
sidebar_label: policyValueVersion
deprecated: false
nav:
  title: 'policyValueVersion'
  order: 10
---

# policyValueVersion

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">policyValueVersion</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/PolicyValue">PolicyValue</a></span>
</div>



Get a specific `policyValueVersion` version by `id`.

This represents a `policyValue` at a point in time, meaning the latest version of the `policyValue` may be deleted and therefore no longer exists.

For more information, please see [Policy Values & Settings](https://turbot.com/guardrails/docs/concepts/policies/values-settings).