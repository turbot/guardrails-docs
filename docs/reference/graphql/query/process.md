---
title: 'process'
template: Documentation
sidebar_label: process
deprecated: false
nav:
  title: 'process'
  order: 10
---

# process

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">process</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/Process">Process</a></span>
</div>



Get a `process` by `id`.

This will retrieve the current process, meaning that a terminated process will return a not found error.

For more information, please see [Processes](https://turbot.com/guardrails/docs/concepts/processes).