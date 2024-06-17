---
title: 'resource'
template: Documentation
sidebar_label: resource
deprecated: false
nav:
  title: 'resource'
  order: 10
---

# resource

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">resource</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!, options: <a href="/guardrails/docs/reference/graphql/input/GetItemOptions">GetItemOptions</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span>
</div>



Get a `resource` by `id`.

This will retrieve the current resource, meaning that a deleted resource will return a not found error.

For more information, please see [Resources](https://turbot.com/guardrails/docs/concepts/resources).