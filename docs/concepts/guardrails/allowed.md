---
title: Allowed Guardrails
sidebar_label: Allowed
---

# Allowed Guardrails

## Overview

The Allowed guardrails verify whether specific attributes of a resource meet your organization's requirements, taking appropriate enforcement actions when they don't (alarm, stop, delete, etc.).

Allowed guardrails replace the monolithic [Approved](concepts/guardrails/approved) control with multiple independent controls, each addressing a single control objective. This design enables:

- **Independent deployment** - Deploy, update, or remove each control objective separately
- **Granular enforcement** - Configure different enforcement actions for each attribute
- **Flexible timing** - Enforce immediately or only for newly created resources (`if new`)

> [!NOTE]
> The Allowed guardrails supersede the Approved guardrails. While Approved controls remain available, they are deprecated and will be removed in a future major version. New implementations should use Allowed controls.

## Allowed vs Approved

| Aspect | Approved | Allowed |
|--------|----------|---------|
| Structure | Single control with multiple sub-policies | Multiple independent controls |
| Deployment | All-or-nothing | Deploy each objective independently |
| Enforcement | Single enforcement action for all checks | Per-objective enforcement actions |
| Age-based enforcement | Only `if new` options | Both `if new` and immediate enforcement |

### Migration from Approved to Allowed

Each `Approved` sub-policy maps to a corresponding `Allowed` control:

| Approved Sub-Policy | Allowed Control |
|---------------------|-----------------|
| `Approved > Regions` | `Allowed > Region` |
| `Approved > Instance Types` | `Allowed > Instance Type` |
| `Approved > Public IP` | `Allowed > Public IP` |
| `Approved > Image` | `Allowed > Image` |
| `Approved > Custom` | `Allowed > Custom` |
| `Approved > Budget` | [Budget](concepts/guardrails/budget) (separate control) |
| `Approved > Usage` | `Allowed > Custom` (Usage is deprecated) |

## Policy Structure

The Allowed guardrail follows a consistent naming pattern:

**Control (Primary Policy):**
```
{service} > {resource} > Allowed > {Objective}
```

**Sub-Policies:**
```
{service} > {resource} > Allowed > {Objective} > {Setting}
```

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Allowed > Region</code></li>
    <li><code>AWS > EC2 > Instance > Allowed > Region > Regions</code></li>
    <li><code>AWS > EC2 > Instance > Allowed > Instance Type</code></li>
    <li><code>AWS > EC2 > Instance > Allowed > Instance Type > Types</code></li>
  </ul>
</div>

## Enforcement Actions

Each Allowed control supports granular enforcement options:

| Action | Description |
|--------|-------------|
| `Skip` | Don't run the control |
| `Check: Allowed` | Raise an alarm if not allowed |
| `Enforce: Stop if not allowed` | Stop the resource if not allowed |
| `Enforce: Stop if not allowed and new` | Stop only if resource is new (< 60 minutes) |
| `Enforce: Delete if not allowed` | Delete the resource if not allowed |
| `Enforce: Delete if not allowed and new` | Delete only if resource is new (< 60 minutes) |

## Example: AWS > EC2 > Instance > Allowed

The EC2 Instance Allowed controls provide granular governance over instance attributes:

### Allowed > Region

Control instances based on their deployed region.

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Allowed > Region</code> - Primary control policy</li>
    <li><code>AWS > EC2 > Instance > Allowed > Region > Regions</code> - List of allowed regions</li>
  </ul>
</div>

**Example enforcement options:**
- `Skip`
- `Check: Allowed region`
- `Enforce: Stop if region not allowed`
- `Enforce: Stop if region not allowed and instance is new`
- `Enforce: Delete if region not allowed`
- `Enforce: Delete if region not allowed and instance is new`

### Allowed > Instance Type

Control instances based on their instance type (e.g., `t3.micro`, `m5.large`).

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Allowed > Instance Type</code> - Primary control policy</li>
    <li><code>AWS > EC2 > Instance > Allowed > Instance Type > Types</code> - List of allowed instance types</li>
  </ul>
</div>

### Allowed > Public IP

Control whether instances can have public IP addresses.

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Allowed > Public IP</code> - Primary control policy</li>
  </ul>
</div>

**Example enforcement options:**
- `Skip`
- `Check: Not public`
- `Enforce: Stop if public`
- `Enforce: Stop if public and instance is new`
- `Enforce: Delete if public`
- `Enforce: Delete if public and instance is new`

### Allowed > Image

Control instances based on their AMI ID or AMI publisher.

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Allowed > Image</code> - Primary control policy</li>
    <li><code>AWS > EC2 > Instance > Allowed > Image > AMI IDs</code> - List of allowed AMI IDs</li>
    <li><code>AWS > EC2 > Instance > Allowed > Image > Publishers</code> - List of allowed AMI publishers</li>
  </ul>
</div>

### Allowed > Root Volume Encryption at Rest

Control instances based on root volume encryption settings.

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Allowed > Root Volume Encryption at Rest</code> - Primary control policy</li>
    <li><code>AWS > EC2 > Instance > Allowed > Root Volume Encryption at Rest > Level</code> - Required encryption level</li>
    <li><code>AWS > EC2 > Instance > Allowed > Root Volume Encryption at Rest > Customer Managed Key</code> - Specific CMK requirement</li>
  </ul>
</div>

**Encryption level options:**
- `None`
- `None or higher`
- `AWS managed key`
- `AWS managed key or higher`
- `Customer managed key`
- `Encryption at Rest > Customer Managed Key`

### Allowed > Custom

Create custom checks against any resource attribute using calculated policies.

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Allowed > Custom</code> - Primary control policy</li>
    <li><code>AWS > EC2 > Instance > Allowed > Custom > Rules</code> - Custom validation rules</li>
  </ul>
</div>

The Custom policy uses the same syntax as `Approved > Custom`. Both `Allowed`/`Not Allowed` and `Approved`/`Not approved` result values are supported for backward compatibility.

**Example custom check** - Verify instance has required metadata options:

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
  result: Allowed
  message: IMDSv2 is required
  title: Metadata Security
{% else %}
  result: Not Allowed
  message: IMDSv2 should be required
  title: Metadata Security
{% endif %}
```

## Configuring Allowed Controls

When configuring Allowed controls, set the sub-policies first, then enable the primary control policy:

1. **Configure the sub-policies** with your allowed values (regions, instance types, etc.)
2. **Enable the primary control** with your desired enforcement action

This approach prevents false positives during configuration, as enabling the control before setting the allowed values would trigger alarms on all resources.

**Example: Restrict EC2 instances to specific regions**

1. Set `AWS > EC2 > Instance > Allowed > Region > Regions` to your allowed regions:
   ```yaml
   - us-east-1
   - us-west-2
   - eu-west-1
   ```

2. Enable `AWS > EC2 > Instance > Allowed > Region` with your enforcement action:
   ```
   Enforce: Stop if region not allowed
   ```

## Controls Not Changed

Some resource governance patterns remain unchanged:

- **Active controls** - Still evaluate resource lifecycle holistically
- **Trusted Access controls** - Require evaluating all policies together
- **Tags controls** - Must consider all tag rules together
- **Security Group Rules > Approved** - List-based approvals evaluated together
- **CIS controls** - Read-only reporting controls
