---
title: 'watch'
template: Documentation
sidebar_label: watch
deprecated: false
nav:
  title: 'watch'
  order: 10
---

# watch

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">watch</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/Watch">Watch</a></span>
</div>



Get a `watch` by `id`.

This will retrieve the current watch, meaning that a deleted watch will return a not found error.

For more information, please see [Notifications](https://turbot.com/guardrails/docs/concepts/notifications).