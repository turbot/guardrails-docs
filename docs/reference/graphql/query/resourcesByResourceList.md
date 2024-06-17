---
title: '[Deprecated] resourcesByResourceList'
template: Documentation
sidebar_label: resourcesByResourceList
deprecated: true
nav:
  title: '<span class="text-muted" title="Deprecated - resourcesByResourceList">&osol; <em>resourcesByResourceList</em></span>'
  order: 20
---

# resourcesByResourceList

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">resourcesByResourceList</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/ResourcesByResourceList">ResourcesByResourceList</a></span>
</div>

<span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `resourceSummariesByResource`.</span>

List summary information for `resources`, aggregated by `resource`, that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `resources` that you have `metadata` permissions to. `Metadata` permissions means any `resources` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).