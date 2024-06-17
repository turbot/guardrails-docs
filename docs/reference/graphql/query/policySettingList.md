---
title: '[Deprecated] policySettingList'
template: Documentation
sidebar_label: policySettingList
deprecated: true
nav:
  title: '<span class="text-muted" title="Deprecated - policySettingList">&osol; <em>policySettingList</em></span>'
  order: 20
---

# policySettingList

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">policySettingList</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/PolicySettingList">PolicySettingList</a></span>
</div>

<span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `policySettings`.</span>

List all `policySettings` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `policySettings` that you have `metadata` permissions to, along with any `policySettings` that are the source of a `policyValue` that you have access to. `Metadata` permissions means any `policySettings` whose `resource` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).