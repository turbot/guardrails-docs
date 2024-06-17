---
title: 'PolicyDetail'
template: Documentation
sidebar_label: PolicyDetail
deprecated: false
nav:
  title: 'PolicyDetail'
  order: 10
---

# PolicyDetail

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>PolicyDetail</span></div>



Represents details about a policy, such as its `value`, `type` and `settings` in the `resource` hierarchy.

For more information, please see [Policy Values & Settings](https://turbot.com/guardrails/docs/concepts/policies/values-settings).

| | | |
| -- | -- | -- |
| `dependencies` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/RunnableDependencies">RunnableDependencies</a></span> | The `resource`, `control` and `policyValue` `dependencies` for this `value`. |
| `policyTypeUri` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | Mod-specific unique identifier for the `type`. |
| `resource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | The `resource` this `value` is for. |
| `resourceId` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | Unique identifier for the `resource`. |
| `settings` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicySettings">PolicySettings</a></span> | Returns all `settings` evaluated in calculating the `value`. |
| `type` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyType">PolicyType</a></span> | The `type` information this `value` is for. |
| `value` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyValue">PolicyValue</a></span> | Details for the `value`. |