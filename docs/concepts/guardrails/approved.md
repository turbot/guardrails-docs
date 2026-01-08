---
title: Approved Guardrails
sidebar_label: Approved
---

# Approved Guardrails

> [!IMPORTANT]
> The Approved guardrails are deprecated and will be removed in a future major version. New implementations should use the [Allowed](concepts/guardrails/allowed) guardrails, which provide the same functionality with more granular, independent controls. See the [migration guide](concepts/guardrails/allowed#migration-from-approved-to-allowed) for details.

## Overview

The Approved guardrail is used to verify whether a particular resource is
allowed to exist, and to take an appropriate action if required (shutdown,
delete, etc).

The Approved guardrail is completely independent of the Active guardrail. For
example, an Approved resource may actually be Inactive - e.g. an S3 bucket
created 2 years ago with no items and no usage. Similarly, an Unapproved
resource may be Active - e.g. an S3 bucket in an unapproved region that is still
receiving active traffic.

In general, Approved is considered more at the point of resource creation, while
Active is considered more as the resource reaches the end of its useful life.

The Approved guardrail checks the status of the defined Approved sub-policies
for the resource. If the resource is not approved according to _any_ of these
policies, this control raises an alarm and takes the defined enforcement action.

For any enforcement actions that specify `if new`, e.g.,
`Enforce: Delete unapproved if new`, this control will only run the enforcement
actions for resources created within the last 60 minutes.

The core Approved policy has a consistent form:
`{service} > {resource} > Approved`

<div className="example">
  <ul>
    <li><code>AWS > S3 > Bucket > Approved</code></li>
    <li><code>AWS > SNS > Topic > Approved</code></li>
    <li><code>AWS > EC2 > Instance > Approved</code></li>
  </ul>
</div>

The Approved guardrail and policy have a number of sub-settings to determine the
attributes of the Approved check. The format of these policy types is
`{service} > {resource} > Approved > {Items}`:

```
    {service} > {resource} > Approved > Regions
    {service} > {resource} > Approved > Usage

```

Each of these policies defines rules or settings to determine if that specific
area or attribute of the resource is Approved. Per above, **all** approval tests
must pass - if any Approved sub-check returns `unapproved` then the overall
resource is unapproved.

### Example Guardrail: AWS > EC2 > Instance > Approved

The `AWS > EC2 > Instance > Approved` policy determine the action to take if an
instance is not approved. You can set the policy to skip (don't run at all), to
check whether unapproved instances exist and raise an alarm, or to enforce that
unapproved instances are stopped and/or terminated.

The Approved sub-policies allow you to set the rules for which instance types,
regions, encryption settings, AMI IDs, Publishers of AMIs etc are approved:

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Approved > Instance Types</code></li>
    <li><code>AWS > EC2 > Instance > Approved > Public IP</code></li>
    <li><code>AWS > EC2 > Instance > Approved > Regions</code></li>
    <li><code>AWS > EC2 > Instance > Approved > Usage</code></li>
    <li><code>AWS > EC2 > Instance > Approved > Image > AMI IDs</code></li>
    <li><code>AWS > EC2 > Instance > Approved > Image > Publishers</code></li>
  </ul>
</div>

### Example Guardrail: AWS > VPC > Security Group > Egress Rules > Approved

Organizations need to keep a close eye on egress security group rules, but at
scale it can become difficult to track, check, and remediate security groups.
Using Guardrails' egress approved policies, we can define allowed ports, CIDR
blocks, minimum bitmask, and more. Guardrails will check or remediate when
violations are detected.

<div className="example">
  <ul>
    <li><code>AWS > VPC > Security Group > Egress Rules > Approved</code></li>
    <li><code>AWS > VPC > Security Group > Egress Rules > Approved > Rules</code></li>
    <li><code>AWS > VPC > Security Group > Egress Rules > Approved > Minimum Bitmask</code></li>
    <li><code>AWS > VPC > Security Group > Egress Rules > Approved > Prohibited Ports</code></li>
    <li><code>AWS > VPC > Security Group > Egress Rules > Approved > CIDR Ranges</code></li>
    <li><code>AWS > VPC > Security Group > Egress Rules > Approved > Maximum Port Range</code></li>
    <li><code>AWS > VPC > Security Group > Egress Rules > Approved > Compiled Rules</code></li>
  </ul>
</div>

The base policy, `AWS > VPC > Security Group > Egress Rules > Approved`, is
usually the last one to be set, but is also the most important. This tells
Turbot Guardrails HOW to act - the rest of the policies tell Turbot Guardrails what is valid and what
is not within security group egress rules.

Let's assume that we want to reject any egress rule pointing to 0.0.0.0/0 and
approve anything else. Additionally, we want to set a minimum bitmask of 4 and
maximum port range as 10.

First, set the approved sub policies. Doing this allows us to enable all of the
sub policies at once. If we had enabled the approved policy first, each
subsequent setting triggers control runs. This can get noisy, messy, and could
generate false positives (or negatives).

- `AWS > VPC > Security Group > Egress Rules > Approved > Minimum Bitmask` set
  to `4`.
- `AWS > VPC > Security Group > Egress Rules > Approved > Maximum Port Range`
  set to `10`.

For the `AWS > VPC > Security Group > Egress Rules > Approved > Rules` policy,
we will define the following block:

```ocl
# Reject any rule from 0.0.0.0/0
REJECT $.turbot.cidr:0.0.0.0/0

# Approve everything else.
APPROVE *
```

Once these are created, we are ready to enable Guardrails' auto remediation of
security group egress rules! Simply set the policy
`AWS > VPC > Security Group > Egress Rules > Approved` to
`Enforce: Delete unapproved`.

Immediately following the creation of the `Approved` policy, Guardrails will begin
running controls against all security groups that have the setting applied!
Guardrails will continue to monitor new and existing security groups and take
remediation action if necessary!

### Custom Checks

You can create your own custom checks against resource attributes in the
Approved control using the `Approved > Custom` policy. These custom checks would
be a part of the evaluation of the Approved control. Custom messages can also be
added which are then displayed in the control details table.

For instance, let's assume we want to have the `AWS > KMS > Key > Approved`
control to alarm if automatic key rotation is not enabled for the key by
checking the `KeyRotationStatus` attribute.

Using the calculated policy builder, set the
`AWS > KMS > Key > Approved > Custom` policy to:

Input query:

```graphql
{
  resource {
    KeyRotationStatus: get(path: "KeyRotationStatus")
  }
}
```

Template:

```nunjucks
{% if $.resource.KeyRotationStatus %}
  "Approved"
{% else %}
  "Not approved"
{% endif %}
```

To add a custom key and message, both of which will then show up in the details
table, update the template to:

```nunjucks
{% if $.resource.KeyRotationStatus %}
  result: Approved
  message: Key rotation is enabled
  title: Key Rotation Status
{% else %}
  result: Not approved
  message: Key rotation is disabled
  title: Key Rotation Status
{% endif %}
```

The Custom policy can be used to check multiple attributes as well by setting
the policy value to a list of objects. For instance, to check if the key is
enabled and automatic key rotation is enabled, use the following input query and
template:

Input query:

```graphql
{
  resource {
    KeyRotationStatus: get(path: "KeyRotationStatus")
    KeyState: get(path: "KeyState")
  }
}
```

Template:

```nunjucks
{% if $.resource.KeyRotationStatus %}
  - result: Approved
    message: Key rotation is enabled
    title: Key Rotation Status
{% else %}
  - result: Not approved
    message: Key rotation is disabled
    title: Key Rotation Status
{% endif %}
{% if $.resource.KeyState === "Enabled" %}
  - result: Approved
    message: Key is enabled
    title: Key State
{% else %}
  - result: Not approved
    message: Key is disabled
    title: Key State
{% endif %}
```
