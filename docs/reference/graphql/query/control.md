---
title: 'control'
template: Documentation
sidebar_label: control
deprecated: false
nav:
  title: 'control'
  order: 10
---

# control

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">control</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>, uri: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, resourceId: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>, resourceAka: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/Control">Control</a></span>
</div>



Get a `control` by either `id`, or by control `uri` and `resourceId`/`resourceAka`.

This will retrieve the current control, meaning that a deleted control will return a not found error.

For more information, please see [Controls](https://turbot.com/guardrails/docs/concepts/controls).