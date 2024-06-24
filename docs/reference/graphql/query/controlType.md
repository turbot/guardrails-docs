---
title: 'controlType'
template: Documentation
sidebar_label: controlType
deprecated: false
nav:
  title: 'controlType'
  order: 10
---

# controlType

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">controlType</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!, options: <a href="/guardrails/docs/reference/graphql/input/GetItemOptions">GetItemOptions</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/ControlType">ControlType</a></span>
</div>



Get a `controlType` by `id`.

This will retrieve the current control type, meaning that a deleted control type will return a not found error.

For more information, please see [Control Types & Categories](https://turbot.com/guardrails/docs/concepts/controls/types-categories).