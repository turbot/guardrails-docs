---
title: 'favorite'
template: Documentation
sidebar_label: favorite
deprecated: false
nav:
  title: 'favorite'
  order: 10
---

# favorite

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">favorite</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/Favorite">Favorite</a></span>
</div>



Get a `favorite` by `id`.

This will retrieve the current favorite, meaning that a deleted favorite will return a not found error.

For more information, please see [Favorites](https://turbot.com/guardrails/docs/guides/interface/favorites).