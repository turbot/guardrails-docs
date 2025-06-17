---
title: Usage Guardrails
sidebar_label: Usage
---

# Usage Guardrails

**Usage** guardrails give administrators the ability to generate alarms
if the number of resources in a specific service exceeds a set amount. These
guardrails exist for a wide number of resources across many services in AWS and
GCP.

Note that the Usage guardrails are not related to the Approved > Usage policy in
the [Approved guardrails](/guardrails/docs/concepts/guardrails/approved) family.

Usage guardrails have a consistent form:

- `{provider} > {service} > {resource} > Usage`

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Usage </code></li>
    <li><code>GCP > Network > Firewall > Usage</code></li>
  </ul>
  </div>

These policies also have consistent options that can be configured:

- `Skip`
- `Check: Usage <= 85% of Limit`
- `Check: Usage <= 100% of Limit`

Note that Guardrails will never destroy resources even if the limit is exceeded, and
will not prevent users from creating resources once the Usage control moves into
the alarm state.

The above policies have a sub setting to determine said limit, again with a
consistent form:

- `{provider} > {service} > {resource} > Usage`

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Usage > Limit</code></li>
    <li><code>GCP > Network > Firewall > Usage > Limit</code></li>
  </ul>
  </div>

The limit policy checks the total number of resource types within a given
account. This value can either be set statically by an administrator or a
[calculated policy](/guardrails/docs/concepts/policies/calculated-faq) can be written to set the value
dynamically.

### Example Guardrail: AWS > EC2 > Instance > Usage

The `AWS > EC2 > Instance > Usage` policy queries an AWS account for the amount
of EC2 instance that exist. The policy `AWS > EC2 > Instance > Usage > Limit`
determines the amount of resources that can exist before the Usage guardrail
triggers an alarm.

Suppose two organizations have a limit of 50 EC2 instance that can be active at
any one time. The first organization has a soft limit, and the second
organization has a hard limit.

<div className="example">
  Assume the organization wants to be notified at 50 instances, but this is a soft limit. The following policies could be set:
  <ul>
    <li><code>AWS > EC2 > Instance > Usage > Limit</code> set to <code>50</code>.</li>
    <li><code>AWS > EC2 > Instance > Usage</code> set to <code>Check: Usage &lt;= 100% of limit</code></li>
  </ul>
  When the number of EC2 instances within said account reaches 50, the Usage control will generate an alert.
</div>

<div className="example">
  Assume the organization wants to be notified at 50 instances, and accounts must not have more than this limit at any one time (aka hard limit). The following policies could be set:
  <ul>
    <li><code>AWS > EC2 > Instance > Usage > Limit</code> set to <code>50</code>.</li>
    <li><code>AWS > EC2 > Instance > Usage</code> set to <code>Check: Usage&lt;= 85% of limit</code></li>
  </ul>
  When the number of EC2 instances within said account reaches 43, the Usage control will generate an alert. This allows administrators to monitor the account prior to reaching the organizational restriction of 50 instances per account.
</div>
