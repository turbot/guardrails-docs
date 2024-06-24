---
title: 'createGrant'
template: Documentation
sidebar_label: createGrant
deprecated: false
nav:
  title: 'createGrant'
  order: 10
---

# createGrant

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">createGrant</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(input: <a href="/guardrails/docs/reference/graphql/input/CreateGrantInput">CreateGrantInput</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/Grant">Grant</a></span>
</div>



Create a grant for the given `type`, `level`, `resource` and `identity`. Optionally provide `note`, `validFromTimestamp` and `validToTimestamp`