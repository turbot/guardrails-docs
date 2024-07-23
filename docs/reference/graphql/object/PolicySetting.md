---
title: 'PolicySetting'
template: Documentation
sidebar_label: PolicySetting
deprecated: false
nav:
  title: 'PolicySetting'
  order: 10
---

# PolicySetting

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>PolicySetting</span></div>





| | | |
| -- | -- | -- |
| `actor` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Actor">Actor</a></span> | The `actor` information for the setting creator. |
| `default` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | If `true` this `value` is derived from the default value of the `type`. |
| `exception` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Int">Int</a></span> | The number of settings that this setting is an `exception` to. |
| `input` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> |  |
| `isCalculated` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | If `true` this setting contains calculated inputs e.g. `templateInput` and `template`. |
| `note` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `note` annotating this setting. |
| `orphan` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Int">Int</a></span> | The number of settings that this setting is orphaned by. |
| `policyHierarchy` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyHierarchy">PolicyHierarchy</a></span> | The resource `policyHierarchy` for this setting, including attached policy packs. |
| `policyValues` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyValues">PolicyValues</a></span> | Returns any `policyValues` for this `PolicySetting` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `precedence` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/PolicySettingPrecedence">PolicySettingPrecedence</a>!</span> | The `precedence` for this setting. |
| `resource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | The `resource` this setting is set on. |
| `secretValue` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | The unencrypted `value` in JSON format. You must have `Turbot/Admin` permissions granted on this setting's `resource` or above to call this field. |
| `secretValueSource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | The unencrypted raw `value` in YAML format. If the setting was made via YAML template including comments, these will be included here. You must have `Turbot/Admin` permissions granted on this setting's `resource` or above to call this field. |
| `template` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | The Nunjucks `template` if this setting is for a calculated value. |
| `templateInput` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | The GraphQL input query if this setting is for a calculated value. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotPolicySettingMetadata">TurbotPolicySettingMetadata</a>!</span> | Turbot metadata for this setting. |
| `type` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyType">PolicyType</a></span> | The `type` information for this setting. |
| `validFromTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | The `validFromTimestamp` for this setting. |
| `validToTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | The `validToTimestamp` for this setting. |
| `value` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/JSON">JSON</a></span> | The `value` in JSON format |
| `valueSource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | The raw `value` in YAML format. If the setting was made via YAML template including comments, these will be included here. |