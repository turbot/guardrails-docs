---
title: 'activeGrant'
template: Documentation
sidebar_label: activeGrant
deprecated: false
nav:
  title: 'activeGrant'
  order: 10
---

# activeGrant

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">activeGrant</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/ActiveGrant">ActiveGrant</a></span>
</div>



Get an `activeGrant` by `id`.

This will retrieve the current active grant, meaning that a deleted active grant will return a not found error.

For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).