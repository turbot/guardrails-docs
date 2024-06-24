---
title: 'resourceType'
template: Documentation
sidebar_label: resourceType
deprecated: false
nav:
  title: 'resourceType'
  order: 10
---

# resourceType

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">resourceType</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!, options: <a href="/guardrails/docs/reference/graphql/input/GetItemOptions">GetItemOptions</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/ResourceType">ResourceType</a></span>
</div>



Get a `resourceType` by `id`.

This will retrieve the current resource type, meaning that a deleted resource type will return a not found error.

For more information, please see [Resource Types & Categories](https://turbot.com/guardrails/docs/concepts/resources/types-categories).