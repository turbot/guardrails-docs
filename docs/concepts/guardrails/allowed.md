---
title: Allowed Guardrails
sidebar_label: Allowed
---

# Allowed Guardrails

## Overview

The Allowed guardrails verify whether specific attributes of a resource meet
your organization's requirements, and take an appropriate action if required
(alarm, stop, delete, etc.).

The Allowed guardrails provide independent controls for each control objective,
replacing the monolithic [Approved](concepts/guardrails/approved) control. Each
Allowed control addresses a single attribute or requirement, enabling you to
deploy, update, or remove each control objective separately without affecting
others.

Unlike Approved controls where all sub-policy checks must pass together, each
Allowed control operates independently. This means you can enforce different
actions for different attributes - for example, stopping instances in
unapproved regions while only alarming on unapproved instance types.

For any enforcement actions that specify `if new`, e.g.,
`Enforce: Delete if not allowed and new`, this control will only run the
enforcement actions for resources created within the last 60 minutes. Allowed
controls also support enforcement regardless of resource age, which Approved
controls do not.

The core Allowed policy has a consistent form:
`{service} > {resource} > Allowed > {Objective}`

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Allowed > Region</code></li>
    <li><code>AWS > EC2 > Instance > Allowed > Instance Type</code></li>
    <li><code>AWS > EC2 > Instance > Allowed > Public IP</code></li>
    <li><code>AWS > EC2 > Instance > Allowed > Image</code></li>
  </ul>
</div>

Each Allowed control has sub-policies to configure the specific rules. The
format of these policy types is
`{service} > {resource} > Allowed > {Objective} > {Setting}`:

```
    {service} > {resource} > Allowed > Region > Regions
    {service} > {resource} > Allowed > Instance Type > Types
    {service} > {resource} > Allowed > Image > AMI IDs
    {service} > {resource} > Allowed > Image > Publishers
```

### Example Guardrail: AWS > EC2 > Instance > Allowed > Region

The `AWS > EC2 > Instance > Allowed > Region` policy determines the action to
take if an instance is not in an allowed region. You can set the policy to skip
(don't run at all), to check whether instances exist in unapproved regions and
raise an alarm, or to enforce that instances in unapproved regions are stopped
and/or terminated.

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Allowed > Region</code> - Primary control policy</li>
    <li><code>AWS > EC2 > Instance > Allowed > Region > Regions</code> - List of allowed regions</li>
  </ul>
</div>

To restrict EC2 instances to specific regions, first set the
`AWS > EC2 > Instance > Allowed > Region > Regions` policy to your allowed
regions:

```yaml
- us-east-1
- us-west-2
- eu-west-1
```

Then enable enforcement by setting `AWS > EC2 > Instance > Allowed > Region` to
your desired action, such as `Enforce: Stop if region not allowed`.

### Example Guardrail: AWS > EC2 > Instance > Allowed > Instance Type

The `AWS > EC2 > Instance > Allowed > Instance Type` policy determines the
action to take if an instance is using an unapproved instance type. This allows
you to restrict which instance types (e.g., `t3.micro`, `m5.large`) are
permitted in your environment.

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Allowed > Instance Type</code> - Primary control policy</li>
    <li><code>AWS > EC2 > Instance > Allowed > Instance Type > Types</code> - List of allowed instance types</li>
  </ul>
</div>

### Example Guardrail: AWS > EC2 > Instance > Allowed > Image

The `AWS > EC2 > Instance > Allowed > Image` policy determines the action to
take if an instance is using an unapproved AMI. You can control instances based
on specific AMI IDs or by AMI publisher.

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Allowed > Image</code> - Primary control policy</li>
    <li><code>AWS > EC2 > Instance > Allowed > Image > AMI IDs</code> - List of allowed AMI IDs</li>
    <li><code>AWS > EC2 > Instance > Allowed > Image > Publishers</code> - List of allowed AMI publishers</li>
  </ul>
</div>

### Example Guardrail: AWS > EC2 > Instance > Allowed > Public IP

The `AWS > EC2 > Instance > Allowed > Public IP` policy determines the action
to take if an instance has a public IP address. This is useful for enforcing
that instances remain private and are not directly accessible from the
internet.

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Allowed > Public IP</code> - Primary control policy</li>
  </ul>
</div>

### Example Guardrail: AWS > EC2 > Instance > Allowed > Root Volume Encryption at Rest

The `AWS > EC2 > Instance > Allowed > Root Volume Encryption at Rest` policy
determines the action to take if an instance's root volume does not meet
encryption requirements.

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Allowed > Root Volume Encryption at Rest</code> - Primary control policy</li>
    <li><code>AWS > EC2 > Instance > Allowed > Root Volume Encryption at Rest > Level</code> - Required encryption level</li>
    <li><code>AWS > EC2 > Instance > Allowed > Root Volume Encryption at Rest > Customer Managed Key</code> - Specific CMK requirement</li>
  </ul>
</div>

The encryption level policy supports the following values:
- `None`
- `None or higher`
- `AWS managed key`
- `AWS managed key or higher`
- `Customer managed key`
- `Encryption at Rest > Customer Managed Key`

### Custom Checks

You can create your own custom checks against resource attributes in the
Allowed control using the `Allowed > Custom` policy. These custom checks would
be a part of the evaluation of the Allowed control. Custom messages can also be
added which are then displayed in the control details table.

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Allowed > Custom</code> - Primary control policy</li>
    <li><code>AWS > EC2 > Instance > Allowed > Custom > Rules</code> - Custom validation rules</li>
  </ul>
</div>

For instance, let's assume we want to have the `AWS > EC2 > Instance > Allowed > Custom`
control to alarm if IMDSv2 is not required for the instance by checking the
`MetadataOptions` attribute.

Using the calculated policy builder, set the
`AWS > EC2 > Instance > Allowed > Custom > Rules` policy to:

Input query:

```graphql
{
  resource {
    MetadataOptions: get(path: "MetadataOptions")
  }
}
```

Template:

```nunjucks
{% if $.resource.MetadataOptions.HttpTokens === "required" %}
  "Allowed"
{% else %}
  "Not allowed"
{% endif %}
```

To add a custom key and message, both of which will then show up in the details
table, update the template to:

```nunjucks
{% if $.resource.MetadataOptions.HttpTokens === "required" %}
  result: Allowed
  message: IMDSv2 is required
  title: Metadata Security
{% else %}
  result: Not allowed
  message: IMDSv2 should be required
  title: Metadata Security
{% endif %}
```

The Custom policy uses the same syntax as `Approved > Custom`. Both
`Allowed`/`Not allowed` and `Approved`/`Not approved` result values are
supported for backward compatibility.
