---
title: Policies
sidebar_label: Policies
---

# Policies

Automated controls require a large number of configuration settings from the
biggest decisions (e.g. allowed services) right down to small, but critical,
details (e.g. automated tags for cost management). In Guardrails, **Policies** are
used to manage these settings.

In Guardrails, policies provide:

- Clearly defined, validated and managed definitions for all
  [Resources](concepts/resources) managed by Guardrails
- Secure enforcement of required settings across large environments.
- Exception management, including automatic expiration
- Shared defaults via recommended settings

Guardrails Policies can be managed using the Guardrails UI, Guardrails API or software
configuration management tools.


<!--
The [v5 mods directory](https://hub.guardrails.turbot.com/#mods) is an invaluable resource for looking up policy
URIs, policy values and policy defaults. (A free, self-registered account is
required.)

A **control objective** is a business need, for example at rest enforcement for
[S3](https://hub.guardrails.turbot.com/mods/aws/mods/aws-s3), [EC2](https://hub.guardrails.turbot.com/mods/aws/mods/aws-ec2/), and
[RDS](https://hub.guardrails.turbot.com/mods/aws/mods/aws-rds/). Note that a control objective may require
one or many policies to fully implement.
-->


## Key Concepts

A [Policy Type](concepts/policies/types-categories) targets one of more resource types.
This defines which type of resources the setting applies to.

<div className="example">
 The <code>GCP > Storage > Bucket > Approved</code> policy applies to <code>GCP > Storage > Bucket</code> resource types.
</div>

While the policy type targets a specific resource type, you may set the policy
at any scope in the [Policy Hierarchy](concepts/policies/hierarchy) at or above the
resource. Organizations can define policies such as restricted regions for a
folder in Guardrails which are then inherited by accounts and resources within said
folder.

<div className="example">
Setting the <code>GCP > Storage > Bucket > Approved</code> policy at the Project scope will impact all of the buckets in that Project.
</div>

Policy settings have a precedence, which defines whether they are required or
recommended on descendent resources.

The [Policy Setting](concepts/policies/values-settings) is the desired value for the
policy. For example, an organization could define
[specific approved RDS database engine types](guides/managing-policies/config-examples/rds-db-approved),
which are three simple policies. Alternatively, another organization might want
to
[tag Azure resources with Terraform](guides/managing-policies/config-examples/azure-tags),
where the power of policies are flexed, utilizing Terraform deployment,
[Guardrails Files](guardrails/docs/guides/configuring-guardrails/files), and
[Calculated policies](faq/calculated-policies).

Every policy can have an expiration, after which the policy will no longer be in
effect.

[Controls](concepts/controls/) implement policies. The policy setting is created, an
applicable resource inherits the value, and the relevant control will check and/
or remediate the resource.

<!--
## Example

Consider an S3 bucket Resource called `my-bucket`, an instance of the Resource
Type `AWS > S3 > Bucket`. To define the correct configuration of `my-bucket`, a
few policy settings are required. For example:

| Type                                   | Setting to define for `my-bucket` |
| -------------------------------------- | --------------------------------- |
| AWS > S3 > Bucket > Approved           | "Enforce: Delete if new & empty"  |
| AWS > S3 > Bucket > Approved > Regions | [ "us-*" ]                        |
| AWS > S3 > Bucket > Encryption at Rest | "Enforce: AWS SSE or higher"      |

The above policy settings are then applied directly to the bucket (if the
policies were set at the bucket resource level) as a value or are inherited as a
value (the typical situation). In this case, we are telling Guardrails to
`Enforce: Delete if new & empty` if either encryption is not configured to be
`AWS: SSE or higher` OR the bucket is created in a region outside of the US.


-->


## Policy Types & Categories

### Policy Types

A **Policy Type** defines a specific policy that may be configured for
resources. For example, `AWS > S3 > Bucket > Approved`.

Each policy type targets a set of
[Resource Types](concepts/resources/types-categories#resource-types).

<div className="example"> The policy type <code>AWS > S3 > Bucket > Approved</code> targets a resource type of <code>AWS > S3 > Bucket</code>, thus every instance of <code>AWS > S3 > Bucket</code> will have an <code>AWS > S3 > Bucket > Approved</code> policy.  Each of these instances may have its own policy setting, and will have its own policy value.
</div>

Valid values for a policy type are defined through it's JSON schema.

<div className="example"> The policy type <code>AWS > S3 > Bucket > Approved</code> has
a specific enumerated list of valid values: `Skip`, `Check: Approved`, `Enforce: Delete unapproved if new & empty`.
</div>

Policy types are defined in a type hierarchy.

<div className="example"> The <code>Approved</code> policy type is actually a child of 
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

<div className="example"> The policy category <code>Turbot > Approved</code> includes many <code>Approved</code> style policies including <code>AWS > S3 > Bucket > Approved</code>.
</div>

Policy categories are typically used for reporting, providing useful aggregation
and filtering of data.

### Example - Policy Types and Categories

![](/images/docs/guardrails/policy_types_categories-ex.png)
