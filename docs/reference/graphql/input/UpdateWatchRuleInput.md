---
title: 'UpdateWatchRuleInput'
template: Documentation
sidebar_label: UpdateWatchRuleInput
deprecated: false
nav:
  title: 'UpdateWatchRuleInput'
  order: 10
---

# UpdateWatchRuleInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UpdateWatchRuleInput</span></div>



Update a watch rule by `id`. Optionally provide `resource`, `level` and `notificationTypes`

| | | |
| -- | -- | -- |
| `id` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `id` of the watch rule to update, as an id |
| `level` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/enum/WatchRuleResourceLevel">WatchRuleResourceLevel</a>!]</span> | Optional `level` for the watch rule to update |
| `notificationTypes` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/enum/WatchRuleNotificationType">WatchRuleNotificationType</a>!]</span> | Option `notificationTypes` that the watch rule should filter by |
| `resource` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!]</span> | Optional `resource` for the watch rule to updates, as ids |
| `state` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/WatchRuleState">WatchRuleState</a></span> | Optional `state` for the watch rule to update |