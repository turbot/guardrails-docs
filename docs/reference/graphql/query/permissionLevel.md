---
title: 'permissionLevel'
template: Documentation
sidebar_label: permissionLevel
deprecated: false
nav:
  title: 'permissionLevel'
  order: 10
---

# permissionLevel

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">permissionLevel</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/PermissionLevel">PermissionLevel</a></span>
</div>



Get a `permissionLevel` by `id`.

This will retrieve the current permission level, meaning that a deleted permission level will return a not found error.

For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).