---
title: 'ActiveGrant'
template: Documentation
sidebar_label: ActiveGrant
deprecated: false
nav:
  title: 'ActiveGrant'
  order: 10
---

# ActiveGrant

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>ActiveGrant</span></div>



An `ActiveGrant` representing a `grant` and a `resource` at which it is activated.

For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).

| | | |
| -- | -- | -- |
| `accounts` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ProfileAccounts">ProfileAccounts</a></span> | The `accounts` that fall within the scope of the `resource` on which the grant was given |
| `grant` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Grant">Grant</a></span> | The `grant` that this `ActiveGrant` is an activation of. |
| `resource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | The `resource` level that this `grant` is activated at. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotActiveGrantMetadata">TurbotActiveGrantMetadata</a></span> | Turbot metadata for this `ActiveGrant`. |
| `validFromTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional start date for the `ActiveGrant`. |
| `validToTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional end date for the `ActiveGrant`. |