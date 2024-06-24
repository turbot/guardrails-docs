---
title: '[Deprecated] resourceCategoryList'
template: Documentation
sidebar_label: resourceCategoryList
deprecated: true
nav:
  title: '<span class="text-muted" title="Deprecated - resourceCategoryList">&osol; <em>resourceCategoryList</em></span>'
  order: 20
---

# resourceCategoryList

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">resourceCategoryList</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/ResourceCategoryList">ResourceCategoryList</a></span>
</div>

<span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `resourceCategories`.</span>

List all `resourceCategories` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `resourceCategories` that you have `metadata` permissions to. `Metadata` permissions means any `resources` that you have `Turbot/Metadata` permissions or above on, you will have access to its `resourceCategory` and any child `resourceCategories`. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).