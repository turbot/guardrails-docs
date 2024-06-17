---
title: 'watchRule'
template: Documentation
sidebar_label: watchRule
deprecated: false
nav:
  title: 'watchRule'
  order: 10
---

# watchRule

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">watchRule</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/WatchRule">WatchRule</a></span>
</div>



Get a `watchRule` by `id`.

This will retrieve the current watch rule, meaning that a deleted watch rule will return a not found error.

For more information, please see [Notifications](https://turbot.com/guardrails/docs/concepts/notifications).