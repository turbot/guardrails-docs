---
title: 'webhook'
template: Documentation
sidebar_label: webhook
deprecated: false
nav:
  title: 'webhook'
  order: 10
---

# webhook

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">webhook</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(resource: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>, action: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>, actionAka: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/Webhook">Webhook</a></span>
</div>



Generate a `webhook` response, containing the `url` for sending external raw events to, along with the `token` (JWT) encoded in the `url`.

Please note: `actionAka` is deprecated and will be removed in a future build. Please use `action` instead.