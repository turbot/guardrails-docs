---
title: '[Deprecated] webHookUrl'
template: Documentation
sidebar_label: webHookUrl
deprecated: true
nav:
  title: '<span class="text-muted" title="Deprecated - webHookUrl">&osol; <em>webHookUrl</em></span>'
  order: 20
---

# webHookUrl

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">webHookUrl</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(resource: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>, action: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>, actionAka: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span>
</div>

<span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `webhook`.</span>

Generate a `webHookUrl` for sending external raw events to.

Please note: `actionAka` is deprecated and will be removed in a future build. Please use `action` instead.