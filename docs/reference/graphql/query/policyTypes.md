---
title: 'policyTypes'
template: Documentation
sidebar_label: policyTypes
deprecated: false
nav:
  title: 'policyTypes'
  order: 10
---

# policyTypes

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">policyTypes</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/PolicyTypes">PolicyTypes</a></span>
</div>



List all `policyTypes` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `policyTypes` that you have `metadata` permissions to. `Metadata` permissions means any `resources` that you have `Turbot/Metadata` permissions or above on, you will have access to its `policyType` and any child `policyTypes`. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).