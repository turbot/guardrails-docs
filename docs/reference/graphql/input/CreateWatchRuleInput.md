---
title: 'CreateWatchRuleInput'
template: Documentation
sidebar_label: CreateWatchRuleInput
deprecated: false
nav:
  title: 'CreateWatchRuleInput'
  order: 10
---

# CreateWatchRuleInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>CreateWatchRuleInput</span></div>



Create a watch rule for the given `watch`. Optionally provide `resource`, `level` and `notificationTypes`

| | | |
| -- | -- | -- |
| `level` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/enum/WatchRuleResourceLevel">WatchRuleResourceLevel</a>!]</span> | Optional `level` for the watch rule to create |
| `notificationTypes` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/enum/WatchRuleNotificationType">WatchRuleNotificationType</a>!]</span> | Option `notificationTypes` that the watch rule should filter by |
| `resource` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!]</span> | Optional `resource` for the watch rule to create, as ids |
| `state` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/WatchRuleState">WatchRuleState</a></span> | Optional `state` for the watch rule to create |
| `watch` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `watch` to create the rule for, as an id |