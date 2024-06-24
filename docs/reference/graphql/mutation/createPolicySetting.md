---
title: 'createPolicySetting'
template: Documentation
sidebar_label: createPolicySetting
deprecated: false
nav:
  title: 'createPolicySetting'
  order: 10
---

# createPolicySetting

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">createPolicySetting</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(input: <a href="/guardrails/docs/reference/graphql/input/CreatePolicySettingInput">CreatePolicySettingInput</a>!) &rarr; <a href="/guardrails/docs/reference/graphql/object/PolicySetting">PolicySetting</a></span>
</div>



Create a policy setting for the given `type`, `resource` and `precedence`. Provide the setting in either standard form (either `value` (as JSON) or `valueSource` (as YAML string), or as a calculated setting with `inputTemplate` (as YAML Nunjucks template) and optional `input` (as GraphQL query string). Optionally provide `note`, `validFromTimestamp` and `validToTimestamp`