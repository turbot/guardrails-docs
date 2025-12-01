---
title: Policy Types & Categories
sidebar_label: Types & Categories
---

# Policy Types & Categories

### Policy Types

A **Policy Type** defines a specific policy that may be configured for
resources. For example, `AWS > S3 > Bucket > Approved`.

Each policy type targets a set of
[Resource Types](concepts/resources/types-categories#resource-types).

<div className="example"> 
The policy type <code>AWS > S3 > Bucket > Approved</code> targets a resource type of <code>AWS > S3 > Bucket</code>, thus every instance of <code>AWS > S3 > Bucket</code> will have an <code>AWS > S3 > Bucket > Approved</code> policy.  Each of these instances may have its own policy setting, and will have its own policy value.
</div>

Valid values for a policy type are defined through it's JSON schema.

<div className="example"> 
The policy type <code>AWS > S3 > Bucket > Approved</code> has
a specific enumerated list of valid values: `Skip`, `Check: Approved`, `Enforce: Delete unapproved if new & empty`.
</div>

Policy types are defined in a type hierarchy.

<div className="example"> 
The <code>Approved</code> policy type is actually a child of 
the <code>AWS > S3 > Bucket</code> resource type and has child policies such as <code>Regions</code> with a full path of <code>AWS > S3 > Bucket >
Approved > Regions</code>.
</div>

Policy types are defined in [Mods](https://hub.guardrails.turbot.com/#mods).

### Policy Categories

Guardrails may include hundreds or thousands of policy types covering similar
concepts (e.g. Approved, Data Protection) across various services (e.g. AWS,
Azure). The policy type hierarchy provides grouping of policies, but in a
structured service oriented manner. **Policy Categories** provide an alternate,
vendor agnostic, categorization of policy types.

<div className="example"> 
The policy category <code>Turbot > Approved</code> includes many <code>Approved</code> style policies including <code>AWS > S3 > Bucket > Approved</code>.
</div>

Policy categories are typically used for reporting, providing useful aggregation
and filtering of data.

### Example - Policy Types and Categories

![](/images/docs/guardrails/policy_types_categories-ex.png)
