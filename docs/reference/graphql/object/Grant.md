---
title: 'Grant'
template: Documentation
sidebar_label: Grant
deprecated: false
nav:
  title: 'Grant'
  order: 10
---

# Grant

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>Grant</span></div>



A `Grant` representing a permission `type` and permission `level` granted to an `identity` at a given `resource`. This `Grant` might not be activated and therefore not in effect. `Grant` Activations are modelled in the `ActiveGrant` type.

For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).

| | | |
| -- | -- | -- |
| `groupName` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional custom `groupName` for this `Grant`, when using existing roles rather than Turbot-managed ones. |
| `identity` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | The `identity` this `Grant` is for. |
| `level` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PermissionLevel">PermissionLevel</a></span> | The permission `level` information for this `Grant`. |
| `permissionLevelId` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a></span> | The unique identifier for the permission `level`. |
| `permissionTypeId` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a></span> | The unique identifier for the permission `type`. |
| `resource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | The `resource` level for this `Grant`. |
| `roleName` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional custom `roleName` for this `Grant`, when using existing roles rather than Turbot-managed ones. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotGrantMetadata">TurbotGrantMetadata</a></span> | Turbot metadata for this `Grant`. |
| `type` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PermissionType">PermissionType</a></span> | The permission `type` information for this `Grant`. |
| `validFromTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional start date for the `Grant`. |
| `validToTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional end date for the `Grant`. |