---
title: 'upsertResource'
template: Documentation
sidebar_label: upsertResource
deprecated: false
nav:
  title: 'upsertResource'
  order: 10
---

# upsertResource

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">upsertResource</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(input: <a href="/guardrails/docs/reference/graphql/input/UpsertResourceInput">UpsertResourceInput</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span>
</div>



Upsert a resource for the given `parent` and `type` and with the given `data`. Optionally provide custom `metadata`, `tags` and `akas`. If `akas` are passed, the first one in the array will be used to look up if the resource already exists. If no `akas` are passed, the first resource type AKA metadata template will be rendered using the resource data and used to look up if the resource already exists