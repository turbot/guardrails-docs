---
title: Types & Categories
sidebar_label: Types & Categories
---

# Resource Types & Categories

## Resource Types

Every resource managed by Guardrails is an instance of a **Resource Type**. The
resource type defines the properties that belong to a resource, as well as the
[Policies](concepts/policies) that apply to it. Each
[Policy Type](concepts/policies/types-categories#policy-types) targets one or
more resource types.

<div className="example"> The policy type <code>AWS > S3 > Bucket > Approved</code> targets a resource type of <code>AWS > S3 > Bucket</code>, thus every instance of <code>AWS > S3 > Bucket</code> will have an <code>AWS > S3 > Bucket > Approved</code> policy.
</div>

Resource types are defined in a type hierarchy.

<div className="example"> The <code>AWS > S3 > Bucket</code> resource type is a child of the <code>AWS > S3</code> resource type.  
</div>

Note that the resource type hierarchy is separate and distinct from the
[Resource Hierarchy](hierarchy).

Resource types are defined in [Mods](mods).

## Resource Categories

The Guardrails Resource Type hierarchy provides grouping of resources, but in a
structured, service-oriented manner. **Resource Categories** provide an
alternate, vendor agnostic, categorization of resource types.

<div className="example"> The <code>AWS > S3 > Bucket</code>, <code>Azure > Storage > Storage Account</code>, and <code>GCP > Storage > Bucket</code> resource types all have a resource category of <code>Storage > Object</code>.  
</div>

Resource categories are typically used for reporting, providing useful
aggregation and filtering of data.

### Example - Resource Types and Categories

![](/images/docs/guardrails/resource_types_categories-ex.png)
