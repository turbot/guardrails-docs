---
title: '[Deprecated] watchRuleList'
template: Documentation
sidebar_label: watchRuleList
deprecated: true
nav:
  title: '<span class="text-muted" title="Deprecated - watchRuleList">&osol; <em>watchRuleList</em></span>'
  order: 20
---

# watchRuleList

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">watchRuleList</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/WatchRuleList">WatchRuleList</a></span>
</div>

<span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `watchRules`.</span>

List all `watchRules` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `watchRules` that you have `metadata` permissions to. `Metadata` permissions means any `watchRules` whose parent `watch`'s `resource` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).