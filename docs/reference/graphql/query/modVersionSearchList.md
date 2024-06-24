---
title: '[Deprecated] modVersionSearchList'
template: Documentation
sidebar_label: modVersionSearchList
deprecated: true
nav:
  title: '<span class="text-muted" title="Deprecated - modVersionSearchList">&osol; <em>modVersionSearchList</em></span>'
  order: 20
---

# modVersionSearchList

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">modVersionSearchList</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(orgName: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, modName: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, search: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, status: [<a href="/guardrails/docs/reference/graphql/enum/ModVersionStatus">ModVersionStatus</a>!]) &rarr; <a href="/guardrails/docs/reference/graphql/object/ModVersionSearchList">ModVersionSearchList</a></span>
</div>

<span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `modVersionSearches`.</span>

Search `modVersions` by `search` phrase, optionally restricted by `modName` and `orgName`. Use `status` (optional) to restrict mod versions by their current status, defaults to [RECOMMENDED,AVAILABLE]. For more information, please see [Mods](https://turbot.com/guardrails/docs/mods).