---
title: 'CreatePolicySettingInput'
template: Documentation
sidebar_label: CreatePolicySettingInput
deprecated: false
nav:
  title: 'CreatePolicySettingInput'
  order: 10
---

# CreatePolicySettingInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>CreatePolicySettingInput</span></div>



Create a policy setting for the given `type`, `resource` and `precedence`. Provide the setting in either standard form (either `value` (as JSON) or `valueSource` (as YAML string), or as a calculated setting with `inputTemplate` (as YAML Nunjucks template) and optional `input` (as GraphQL query string). Optionally provide `note`, `validFromTimestamp` and `validToTimestamp`

| | | |
| -- | -- | -- |
| `note` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `note` for the policy setting, as a string |
| `precedence` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/PolicySettingPrecedence">PolicySettingPrecedence</a></span> | Optional `precedence` of the policy setting. Defaults to `REQUIRED` if not specified |
| `resource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `resource` level to create the policy setting at, either as an id, or an AKA |
| `template` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `template` of a calculated policy setting, as a YAML Nunjucks string |
| `templateInput` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional Graphql `templateInput` query of a calculated policy setting, as a string, or array of strings |
| `type` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `type` of the policy setting to create, either as an id, or an AKA |
| `validFromTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `validFromTimestamp` for the policy setting, as an ISO string |
| `validToTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `validToTimestamp` for the policy setting, as an ISO string |
| `value` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/JSON">JSON</a></span> | Optional `value` of a standard policy setting, as a JSON object |
| `valueSource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `valueSource` of a standard policy setting, as a YAML string |