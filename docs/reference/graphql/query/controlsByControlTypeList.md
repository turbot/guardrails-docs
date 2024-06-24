---
title: '[Deprecated] controlsByControlTypeList'
template: Documentation
sidebar_label: controlsByControlTypeList
deprecated: true
nav:
  title: '<span class="text-muted" title="Deprecated - controlsByControlTypeList">&osol; <em>controlsByControlTypeList</em></span>'
  order: 20
---

# controlsByControlTypeList

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">controlsByControlTypeList</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/ControlsByControlTypeList">ControlsByControlTypeList</a></span>
</div>

<span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `controlSummariesByControlType`.</span>

List summary information for `controls`, aggregated by `controlType`, that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `controls` that you have `metadata` permissions to. `Metadata` permissions means any `controls` whose targeted `resource` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).