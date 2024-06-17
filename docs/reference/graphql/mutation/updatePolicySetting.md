---
title: 'updatePolicySetting'
template: Documentation
sidebar_label: updatePolicySetting
deprecated: false
nav:
  title: 'updatePolicySetting'
  order: 10
---

# updatePolicySetting

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">updatePolicySetting</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(input: <a href="/guardrails/docs/reference/graphql/input/UpdatePolicySettingInput">UpdatePolicySettingInput</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/PolicySetting">PolicySetting</a></span>
</div>



Update the policy setting with the given `id`. Provide the setting in either standard form (either `value` (as JSON) or `valueSource` (as YAML string), or as a calculated setting with `inputTemplate` (as YAML Nunjucks template) and optional `input` (as GraphQL query string). Optionally provide `precedence`, `note`, `validFromTimestamp` and `validToTimestamp`