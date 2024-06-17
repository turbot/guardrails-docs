---
title: 'activeGrants'
template: Documentation
sidebar_label: activeGrants
deprecated: false
nav:
  title: 'activeGrants'
  order: 10
---

# activeGrants

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">activeGrants</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/ActiveGrants">ActiveGrants</a></span>
</div>



List all `activeGrants` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `activeGrants` that you have `metadata` permissions to. `Metadata` permissions means any `activeGrants` whose `resource` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).