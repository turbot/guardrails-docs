---
title: 'policies'
template: Documentation
sidebar_label: policies
deprecated: false
nav:
  title: 'policies'
  order: 10
---

# policies

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">policies</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/Policies">Policies</a></span>
</div>



List the value for all `policies` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `policies` that you have `metadata` permissions to. `Metadata` permissions means any `policies` whose targeted `resource` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).