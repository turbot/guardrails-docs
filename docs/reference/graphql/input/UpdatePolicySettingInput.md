---
title: 'UpdatePolicySettingInput'
template: Documentation
sidebar_label: UpdatePolicySettingInput
deprecated: false
nav:
  title: 'UpdatePolicySettingInput'
  order: 10
---

# UpdatePolicySettingInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UpdatePolicySettingInput</span></div>



Update the policy setting with the given `id`. Provide the setting in either standard form (either `value` (as JSON) or `valueSource` (as YAML string), or as a calculated setting with `inputTemplate` (as YAML Nunjucks template) and optional `input` (as GraphQL query string). Optionally provide `precedence`, `note`, `validFromTimestamp` and `validToTimestamp`

| | | |
| -- | -- | -- |
| `id` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `id` of the policy setting to update |
| `note` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `note` for the policy setting, as a string |
| `precedence` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/PolicySettingPrecedence">PolicySettingPrecedence</a></span> | Optional `precedence` of the policy setting. Defaults to `REQUIRED` if not specified |
| `template` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `template` of a calculated policy setting, as a YAML Nunjucks string |
| `templateInput` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional Graphql `templateInput` query of a calculated policy setting, as a string, or array of strings |
| `validFromTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `validFromTimestamp` for the policy setting, as an ISO string |
| `validToTimestamp` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `validToTimestamp` for the policy setting, as an ISO string |
| `value` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/JSON">JSON</a></span> | Optional `value` of a standard policy setting, as a JSON object |
| `valueSource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `valueSource` of a standard policy setting, as a YAML string |