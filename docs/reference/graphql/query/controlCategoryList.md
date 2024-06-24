---
title: '[Deprecated] controlCategoryList'
template: Documentation
sidebar_label: controlCategoryList
deprecated: true
nav:
  title: '<span class="text-muted" title="Deprecated - controlCategoryList">&osol; <em>controlCategoryList</em></span>'
  order: 20
---

# controlCategoryList

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">controlCategoryList</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/ControlCategoryList">ControlCategoryList</a></span>
</div>

<span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `controlCategories`.</span>

List all `controlCategories` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `controlCategories` that you have `metadata` permissions to. `Metadata` permissions means any `resources` that you have `Turbot/Metadata` permissions or above on, you will have access to its `controlCategory` and any child `controlCategories`. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).