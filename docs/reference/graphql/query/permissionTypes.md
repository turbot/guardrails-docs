---
title: 'permissionTypes'
template: Documentation
sidebar_label: permissionTypes
deprecated: false
nav:
  title: 'permissionTypes'
  order: 10
---

# permissionTypes

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">permissionTypes</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/PermissionTypes">PermissionTypes</a></span>
</div>



List all `permissionTypes` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `permissionTypes` that you have `metadata` permissions to. `Metadata` permissions means any `resources` that you have `Turbot/Metadata` permissions or above on, you will have access to its `permissionType` and any child `permissionTypes`. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).