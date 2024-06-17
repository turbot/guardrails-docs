---
title: 'profileAccessKey'
template: Documentation
sidebar_label: profileAccessKey
deprecated: false
nav:
  title: 'profileAccessKey'
  order: 10
---

# profileAccessKey

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">profileAccessKey</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(id: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/ProfileAccessKey">ProfileAccessKey</a></span>
</div>



Get a `profileAccessKey` by `id`.

This will retrieve the current profile access key, meaning that a deleted profile access key will return a not found error.

For more information, please see [Authentication](https://turbot.com/guardrails/docs/concepts/iam/authentication).