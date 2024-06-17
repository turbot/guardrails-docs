---
title: '[Deprecated] resourcesByResourceTypeList'
template: Documentation
sidebar_label: resourcesByResourceTypeList
deprecated: true
nav:
  title: '<span class="text-muted" title="Deprecated - resourcesByResourceTypeList">&osol; <em>resourcesByResourceTypeList</em></span>'
  order: 20
---

# resourcesByResourceTypeList

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">resourcesByResourceTypeList</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/ResourcesByResourceTypeList">ResourcesByResourceTypeList</a></span>
</div>

<span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `resourceSummariesByResourceType`.</span>

List summary information for `resources`, aggregated by `resourceType`, that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `resources` that you have `metadata` permissions to. `Metadata` permissions means any `resources` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).