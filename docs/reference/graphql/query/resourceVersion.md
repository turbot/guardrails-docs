---
title: 'resourceVersion'
template: Documentation
sidebar_label: resourceVersion
deprecated: false
nav:
  title: 'resourceVersion'
  order: 10
---

# resourceVersion

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">resourceVersion</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span>
</div>



Get a specific `resourceVersion` version by `id`.

This represents a `resource` at a point in time, meaning the latest version of the `resource` may be deleted and therefore no longer exists.

For more information, please see [Resources](https://turbot.com/guardrails/docs/concepts/resources).