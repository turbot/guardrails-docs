---
title: 'profileSshKeys'
template: Documentation
sidebar_label: profileSshKeys
deprecated: false
nav:
  title: 'profileSshKeys'
  order: 10
---

# profileSshKeys

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">profileSshKeys</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/ProfileSshKeyList">ProfileSshKeyList</a></span>
</div>



List all `profileAccessKeys` that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `profileSshKeys` that you have `metadata` permissions to. `Metadata` permissions means any `profileAccessKeys` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).