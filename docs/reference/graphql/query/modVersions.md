---
title: 'modVersions'
template: Documentation
sidebar_label: modVersions
deprecated: false
nav:
  title: 'modVersions'
  order: 10
---

# modVersions

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">modVersions</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(modName: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, orgName: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, versionRange: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, status: [<a href="/guardrails/docs/reference/graphql/enum/ModVersionStatus">ModVersionStatus</a>!]) &rarr; <a href="/guardrails/docs/reference/graphql/object/ModVersions">ModVersions</a></span>
</div>



List `modVersions`, optionally restricted by `modName` and `orgName`. `versionRange` (optional) is any valid semantic version range, defaults to * (all versions). Use `status` (optional) to restrict mod versions by their current status, defaults to [RECOMMENDED,AVAILABLE]. For more information, please see [Mods](https://turbot.com/guardrails/docs/mods).