---
title: '[Deprecated] policyValueList'
template: Documentation
sidebar_label: policyValueList
deprecated: true
nav:
  title: '<span class="text-muted" title="Deprecated - policyValueList">&osol; <em>policyValueList</em></span>'
  order: 20
---

# policyValueList

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">policyValueList</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/PolicyValueList">PolicyValueList</a></span>
</div>

<span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `policyValues`.</span>

List all `policyValues` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `policyValues` that you have `metadata` permissions to. `Metadata` permissions means any `policyValues` whose `resource` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).