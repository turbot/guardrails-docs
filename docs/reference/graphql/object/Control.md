---
title: 'Control'
template: Documentation
sidebar_label: Control
deprecated: false
nav:
  title: 'Control'
  order: 10
---

# Control

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>Control</span></div>



Represents a `Control` in Turbot.

For more information, please see [Controls](https://turbot.com/guardrails/docs/concepts/controls).

| | | |
| -- | -- | -- |
| `actor` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Actor">Actor</a></span> | The `actor` information for this `Control`. |
| `dependentControls` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Controls">Controls</a></span> |  |
| `dependentPolicyValues` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyValues">PolicyValues</a></span> | The policy values that depend on this `value`. |
| `details` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional `details` provided at the last `state` update of this control. |
| `lastProcess` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Process">Process</a></span> | Returns the `lastProcess` for this `Control`, allowing you to examine the `process`. |
| `process` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Process">Process</a></span> | Returns the current `process` for this `Control`, allowing you to examine the `process` if it is currently running. |
| `reason` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `reason` provided at the last `state` update of this control. |
| `resource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | The `resource` this `Control` targets. |
| `state` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The current `state` of the `Control`. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotControlMetadata">TurbotControlMetadata</a>!</span> | Turbot metadata for this `Control`. |
| `type` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ControlType">ControlType</a></span> | The `type` information for this `Control`. |