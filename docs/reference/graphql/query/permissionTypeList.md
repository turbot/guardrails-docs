---
title: '[Deprecated] permissionTypeList'
template: Documentation
sidebar_label: permissionTypeList
deprecated: true
nav:
  title: '<span class="text-muted" title="Deprecated - permissionTypeList">&osol; <em>permissionTypeList</em></span>'
  order: 20
---

# permissionTypeList

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">permissionTypeList</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/PermissionTypeList">PermissionTypeList</a></span>
</div>

<span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `permissionTypes`.</span>

List all `permissionTypes` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `permissionTypes` that you have `metadata` permissions to. `Metadata` permissions means any `resources` that you have `Turbot/Metadata` permissions or above on, you will have access to its `permissionType` and any child `permissionTypes`. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).