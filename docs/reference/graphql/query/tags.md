---
title: 'tags'
template: Documentation
sidebar_label: tags
deprecated: false
nav:
  title: 'tags'
  order: 10
---

# tags

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">tags</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/ResourceTags">ResourceTags</a></span>
</div>



List all `tags` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to tags for `resources` that you have `user` permissions to. `User` permissions means any `resources` that you have `Turbot/Metadata` permissions or above on, along with any `resources` in their trunk. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).