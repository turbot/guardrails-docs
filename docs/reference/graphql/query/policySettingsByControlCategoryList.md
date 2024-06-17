---
title: '[Deprecated] policySettingsByControlCategoryList'
template: Documentation
sidebar_label: policySettingsByControlCategoryList
deprecated: true
nav:
  title: '<span class="text-muted" title="Deprecated - policySettingsByControlCategoryList">&osol; <em>policySettingsByControlCategoryList</em></span>'
  order: 20
---

# policySettingsByControlCategoryList

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">policySettingsByControlCategoryList</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/PolicySettingsByControlCategoryList">PolicySettingsByControlCategoryList</a></span>
</div>

<span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `policySettingSummariesByControlCategory`.</span>

List summary information for `policySettings`, aggregated by `controlCategory`, that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `policySettings` that you have `metadata` permissions to, along with any `policySettings` that are the source of a `policyValue` that you have access to. `Metadata` permissions means any `policySettings` whose `resource` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).