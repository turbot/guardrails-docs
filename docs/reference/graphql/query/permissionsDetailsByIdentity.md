---
title: 'permissionsDetailsByIdentity'
template: Documentation
sidebar_label: permissionsDetailsByIdentity
deprecated: false
nav:
  title: 'permissionsDetailsByIdentity'
  order: 10
---

# permissionsDetailsByIdentity

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">permissionsDetailsByIdentity</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/PermissionsDetailsByIdentity">PermissionsDetailsByIdentity</a></span>
</div>



List summary information for `grants`/`activeGrants`, aggregated by `identity`, that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `grants` that you have `metadata` permissions to, along with any `grants` that you have `metadata` permissions to any activations of and the `activeGrants` themselves. `Metadata` permissions means any `grants`/`activeGrants` whose `resource` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).