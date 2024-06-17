---
title: 'Notification'
template: Documentation
sidebar_label: Notification
deprecated: false
nav:
  title: 'Notification'
  order: 10
---

# Notification

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>Notification</span></div>



Represents an item of activity within the Turbot workspace, such as `Resource` deletion, `PolicySetting` creation etc.

For more information, please see [Notifications](https://turbot.com/guardrails/docs/concepts/notifications).

| | | |
| -- | -- | -- |
| `action` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Action">Action</a></span> | The `action` version for `Action` notifications. |
| `activeGrant` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ActiveGrant">ActiveGrant</a></span> | The `activeGrant` version for `ActiveGrant` notifications. Returns null for `active_grants_deleted` notification types. |
| `actor` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Actor">Actor</a></span> | The `actor` information for this `Notification`. |
| `control` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Control">Control</a></span> | The `control` version for `Control` notifications. Returns null for `control_deleted` notification types. |
| `data` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional `data` for the notification, typically only present for action notifications. |
| `favorite` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Favorite">Favorite</a></span> | The `favorite` version for `Favorite` notifications. Returns null for `favorite_deleted` notification types. |
| `grant` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Grant">Grant</a></span> | The `grant` version for `Grant` notifications. Returns null for `favorite_deleted` notification types. |
| `icon` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional FontAwesome `icon` reference for the notification, typically only present for action notifications. Will be in the format `fal-<icon>`, `far-<icon>` or `fas-<icon>` for light, regular and solid icon classes respectively. |
| `message` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `message` for the notification, typically only present for action notifications. |
| `notificationType` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The type of the notification. |
| `oldActiveGrant` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ActiveGrant">ActiveGrant</a></span> | The `oldActiveGrant` version for `ActiveGrant` notifications. Returns null for `active_grants_created` notification types. |
| `oldControl` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Control">Control</a></span> | The `oldControl` version for `Control` notifications. Returns null for `control_created` notification types. |
| `oldFavorite` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Favorite">Favorite</a></span> | The `oldFavorite` version for `Favorite` notifications. Returns null for `favorite_created` notification types. |
| `oldGrant` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Grant">Grant</a></span> | The `oldGrant` version for `Grant` notifications. Returns null for `grant_created` notification types. |
| `oldPolicySetting` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicySetting">PolicySetting</a></span> | The `oldPolicySetting` version for `PolicySetting` notifications. Returns null for `policy_setting_created` notification types. |
| `oldPolicyValue` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyValue">PolicyValue</a></span> | The `oldPolicyValue` version for `PolicyValue` notifications. Returns null for `policy_value_created` notification types. |
| `oldResource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | The `oldResource` version for `Resource` notifications. Returns null for `resource_created` notification types. |
| `policySetting` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicySetting">PolicySetting</a></span> | The `policySetting` version for `PolicySetting` notifications. Returns null for `policy_setting_deleted` notification types. |
| `policyValue` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyValue">PolicyValue</a></span> | The `policyValue` version for `PolicyValue` notifications. Returns null for `policy_value_deleted` notification types. |
| `processLogs` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ProcessLogs">ProcessLogs</a></span> | The `processLogs` for this notification. |
| `resource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | The `resource` version for `Resource` notifications. Returns null for `resource_deleted` notification types. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotNotificationMetadata">TurbotNotificationMetadata</a>!</span> | Turbot metadata for this `Notification`. |