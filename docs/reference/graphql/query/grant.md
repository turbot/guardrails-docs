---
title: 'grant'
template: Documentation
sidebar_label: grant
deprecated: false
nav:
  title: 'grant'
  order: 10
---

# grant

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">grant</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/Grant">Grant</a></span>
</div>



Get a `grant` by `id`.

This will retrieve the current grant, meaning that a deleted grant will return a not found error.

For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).