---
title: '[Deprecated] favoriteList'
template: Documentation
sidebar_label: favoriteList
deprecated: true
nav:
  title: '<span class="text-muted" title="Deprecated - favoriteList">&osol; <em>favoriteList</em></span>'
  order: 20
---

# favoriteList

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">favoriteList</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/FavoriteList">FavoriteList</a></span>
</div>

<span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `favorites`.</span>

List all `favorites` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `favorites` that you have `metadata` permissions to. `Metadata` permissions means any `favorites` whose `resource` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).