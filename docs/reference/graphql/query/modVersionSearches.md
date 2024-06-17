---
title: 'modVersionSearches'
template: Documentation
sidebar_label: modVersionSearches
deprecated: false
nav:
  title: 'modVersionSearches'
  order: 10
---

# modVersionSearches

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">modVersionSearches</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(orgName: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, modName: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, search: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, status: [<a href="/guardrails/docs/reference/graphql/enum/ModVersionStatus">ModVersionStatus</a>!]) &rarr; <a href="/guardrails/docs/reference/graphql/object/ModVersionSearches">ModVersionSearches</a></span>
</div>



Search `modVersions` by `search` phrase, optionally restricted by `modName` and `orgName`. Use `status` (optional) to restrict mod versions by their current status, defaults to [RECOMMENDED,AVAILABLE]. For more information, please see [Mods](https://turbot.com/guardrails/docs/mods).