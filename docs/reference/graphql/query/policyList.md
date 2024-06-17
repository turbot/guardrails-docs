---
title: '[Deprecated] policyList'
template: Documentation
sidebar_label: policyList
deprecated: true
nav:
  title: '<span class="text-muted" title="Deprecated - policyList">&osol; <em>policyList</em></span>'
  order: 20
---

# policyList

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">policyList</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/PolicyList">PolicyList</a></span>
</div>

<span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `policies`.</span>

List the value for all `policies` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `policies` that you have `metadata` permissions to. `Metadata` permissions means any `policies` whose targeted `resource` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).