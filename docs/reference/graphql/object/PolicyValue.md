---
title: 'PolicyValue'
template: Documentation
sidebar_label: PolicyValue
deprecated: false
nav:
  title: 'PolicyValue'
  order: 10
---

# PolicyValue

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>PolicyValue</span></div>



Represents a `PolicyValue` for a `type` and `resource`.

For more information, please see [Policy Values & Settings](https://turbot.com/guardrails/docs/concepts/policies/values-settings).

| | | |
| -- | -- | -- |
| `actor` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Actor">Actor</a></span> | The `actor` information for the value creator. |
| `category` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ControlCategory">ControlCategory</a></span> | The `category` information for this `value`'s `type`. |
| `default` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | If `true` this `value` is derived from the default value of the `type`. |
| `dependencies` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/RunnableDependencies">RunnableDependencies</a></span> | The `resource`, `control` and `policyValue` `dependencies` for this `value`. |
| `dependentControls` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Controls">Controls</a></span> | The controls that depend on this `value`. |
| `dependentPolicyValues` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyValues">PolicyValues</a></span> | The policy values that depend on this `value`. |
| `details` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional key-value pair `details` for this `value`. Typically used by controls such as approved to indicate the checks that the value was evaluated against. |
| `isCalculated` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | If `true` this `value` is derived from calculated `setting` inputs e.g. `templateInput` and `template`. |
| `lastProcess` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Process">Process</a></span> | The last process created during creation of this `value`. |
| `precedence` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The precedence of the `setting` that this `value` is derived from. |
| `reason` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `reason` for this `value`. |
| `resource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | The `resource` information for this `value`. |
| `secretValue` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | The unencrypted `value` in JSON format. You must have `Turbot/Admin` permissions granted on this setting's `resource` or above to call this field. |
| `setting` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicySetting">PolicySetting</a></span> | The `setting` information for this `value`. |
| `state` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | The `state` of this `value`. For non-calculated values this will always be `ok`. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotPolicyValueMetadata">TurbotPolicyValueMetadata</a>!</span> | Turbot metadata for this `value`. |
| `type` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyType">PolicyType</a></span> | The `type` information for this `value`. |
| `value` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | The `value` to be used by controls/actions/etc. |