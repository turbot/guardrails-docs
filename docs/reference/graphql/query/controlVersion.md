---
title: 'controlVersion'
template: Documentation
sidebar_label: controlVersion
deprecated: false
nav:
  title: 'controlVersion'
  order: 10
---

# controlVersion

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">controlVersion</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/Control">Control</a></span>
</div>



Get a specific `controlVersion` version by `id`.

This represents a `control` at a point in time, meaning the latest version of the `control` may be deleted and therefore no longer exists.

For more information, please see [Controls](https://turbot.com/guardrails/docs/concepts/controls).