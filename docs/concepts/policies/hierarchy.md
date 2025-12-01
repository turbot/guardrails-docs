---
title: Policy Hierarchy
sidebar_label: Hierarchy
---

# Policy Hierarchy

The **Policy Hierarchy** is a superset of the
[Resource Hierarchy](concepts/resources/hierarchy), expanding it with
[Policy Packs](/guardrails/docs/concepts/policy-packs) and Guardrails defaults.

All policy and permission evaluations are based on the policy hierarchy.

## Policy Packs are injected into the Resource Hierarchy

Each resource may have zero or more policy packs attached in a defined order.
Policy packs are injected (in order) into the resource hierarchy, forming a
policy hierarchy.

Consider an S3 bucket `my-bucket` in the resource hierarchy for ACME:

`Turbot > Folder A > AWS 1111 > us-east-1 > my-bucket`

which has two policy packs `X` and `Y` attached to it (in that order).

![](/images/docs/guardrails/sf-inject.png)

The policy hierarchy would be:

`Turbot > Folder A > AWS 1111 > us-east-1 > X > Y > my-bucket`

## Policy Type Defaults

Each policy type has a default value and precedence which are used until a
specific setting is defined in the policy hierarchy. The policy default is
automatically injected into the policy hierarchy at the top level once a mod is
installed.

Consider the mod `@turbot/aws-s3` installed in `Turbot`, which defines a number
of policy types:

### Example

The effective policy value as default setting would be:

| Type                                   | Default Value |
| -------------------------------------- | ------------- |
| AWS > S3 > Enabled                     | "Disabled"    |
| AWS > S3 > Bucket > Approved           | "Skip"        |
| AWS > S3 > Bucket > Approved > Budget  | "Skip"        |
| AWS > S3 > Bucket > Encryption at Rest | "Skip"        |
| AWS > S3 > Bucket > Usage > Limit      | "100"         |

![](/images/docs/guardrails/default-policy.png)

The policy hierarchy for `my-bucket` above would now be:
`Default > Turbot > Folder A > AWS 1111 > us-west-1 > my-bucket`

## Precedence rules: Required vs Recommended

Each policy has a precedence, which determines how policies may be overridden on
descendent resources in the hierarchy:

- **Recommended:** Sets a default value, used by descendant resources unless
  they specify an alternative. Recommended policies can be overridden by users
  that have Turbot/Admin permissions on the descendent resources.

- **Required:** Settings are mandated on descendant resources, unless an
  exception has been granted by a Turbot/Admin at a higher level.

The value of a policy is calculated down through the Turbot resource
hierarchy,from most general (e.g. default defined by the Mod) to most specific
(e.g. setting for my-bucket). The most specific Required setting wins. If there
are no **Required** settings, then the most specific **Recommended** setting
wins.

| parent      | child       | Status                                                         |
| ----------- | ----------- | -------------------------------------------------------------- |
| Recommended | None        | parent recommended setting is in effect.                       |
| Required    | None        | parent required setting is in effect.                          |
| Required    | Required    | child required (Exception ) beats the the higher level setting |
| Required    | Recommended | parent required beats the the lower level recommended setting  |
| Recommended | Recommended | child recommended setting beats higher level recommended       |
| Recommended | Required    | child setting beats higher level recommended                   |

---

#### Policy recommendations are inherited through the resource hierarchy

![](/images/docs/guardrails/inherit-1.png)

#### Lower level recommendations take precedence over inherited recommendations

![](/images/docs/guardrails/inherit-2.png)

#### Required settings always take precedence over recommendations

![](/images/docs/guardrails/inherit-3.png)

#### Required settings create exceptions to inherited required settings

![](/images/docs/guardrails/inherit-4.png)

#### Exceptions can be set at any level, even individual resources

![](/images/docs/guardrails/inherit-5.png)

#### Policy Packs in the hierarchy

Policies set on [Policy Packs](/guardrails/docs/concepts/policy-packs) are injected into the hierarchy and evaluated in order, just like folders and resources. For more details, see the [Policy Packs documentation](/guardrails/docs/concepts/policy-packs).

## Permissions and Policy Management

To manage the policy settings for a resource, the user must have `Turbot/Admin`
permission for both:

- The resource itself; and
- Any higher level resources where the policy type already has a required
  setting.

<div className="example"> 
The policy type <code>AWS > S3 > Bucket >
Encryption at Rest</code> is <code>Recommended</code> to be <code>Enforce: AWS SSE</code> at <code>Turbot</code>
level. This recommended setting is used for all S3 buckets in the entire
environment unless a more specific setting is provided. To override this recommendation
for a specific AWS account 1234 the user only requires <code>Turbot/Admin</code> permission for that AWS account.
</div>

<div className="example">
The policy type <code>AWS > S3 > Bucket >
Encryption at Rest</code> has a setting of <code>Required</code> to be <code>Enforce: AWS SSE</code> at
<code>Turbot</code> level. This required setting is in force for all S3 buckets in the
entire environment. To create an exception for this policy on a specific
S3 bucket <code>my-bucket</code> the user would need <code>Turbot/Admin</code> permission at <code>Turbot</code>
level.
</div>
