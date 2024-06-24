---
title: 'resourceSummariesBySmartFolder'
template: Documentation
sidebar_label: resourceSummariesBySmartFolder
deprecated: false
nav:
  title: 'resourceSummariesBySmartFolder'
  order: 10
---

# resourceSummariesBySmartFolder

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">resourceSummariesBySmartFolder</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/ResourceSummariesByResource">ResourceSummariesByResource</a></span>
</div>



List summary information for `resources`, aggregated by `smartFolder`, that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `smartFolders` that you have `metadata` permissions to. `Metadata` permissions means any `resources` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).