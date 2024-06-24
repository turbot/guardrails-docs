---
title: 'policyValueTarget'
template: Documentation
sidebar_label: policyValueTarget
deprecated: false
nav:
  title: 'policyValueTarget'
  order: 10
---

# policyValueTarget

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">policyValueTarget</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(policyTypeUri: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, value: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/Resources">Resources</a></span>
</div>



Perform a `resources` reverse lookup for the given `policyTypeUri` and `value`.

The results are limited to `resources` that you have `metadata` permissions to. `Metadata` permissions means any `resources` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).