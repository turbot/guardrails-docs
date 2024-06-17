---
title: 'actionTypes'
template: Documentation
sidebar_label: actionTypes
deprecated: false
nav:
  title: 'actionTypes'
  order: 10
---

# actionTypes

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">actionTypes</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/ActionTypes">ActionTypes</a></span>
</div>



List all `actionTypes` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).
The results are limited to `actionTypes` that you have `metadata` permissions to. `Metadata` permissions means any `resources` that you have `Turbot/Metadata` permissions or above on, you will have access to its `actionType` and any child `actionTypes`. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).
The returned `actionTypes` are subject to auto-pagination to avoid excessive load. For more information, please see [Paging](https://turbot.com/guardrails/docs/reference/paging).