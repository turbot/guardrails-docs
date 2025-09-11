---
title: Policy Values & Settings
sidebar_label: Values & Settings
---

# Policy Values & Settings

### Policy Settings

Each policy type may have many settings for different resources.

<div className="example">  The policy type <code>AWS > S3 > Bucket > Approved</code> may be set to <code>Enforce: Delete unapproved if new & empty</code> for development accounts, but deliberately limited to <code>Check: Approved</code> for production accounts.
</div>

**Policy Settings** are inherited down through the hierarchy of resources.

<div className="example"> <code>AWS > S3 > Bucket > Approved</code> may be set
to <code>Enforce: Delete unapproved if new & empty</code> at Turbot level - ensuring all buckets are deleted if they don't meet the approval criteria (e.g. in approved region).
</div>

Policy settings are only valid for target resources and their ancestors.

<div className="example"> The Policy Type
<code>AWS > S3 > Bucket > Approved</code> may be set at any resource level from Turbot
down to the specific S3 Bucket such as <code>Turbot > Folder A > AWS 1111 > us-east-1 > my-bucket</code>.
</div>

### Policy Values

A **Policy Value** is the effective policy setting on an instance of a resource
type. Every resource that is targeted by a given policy setting will have its
own value for that policy, which will be the resultant calculated policy for the
"winning" policy in the hierarchy.

Policy settings are inherited through the resource hierarchy, and values for a
resource are calculated according to policy settings at or above it in the
resource hierarchy. For example, a policy setting at the Turbot level will be
inherited by all resources below.

While policy settings can exist above the target in the resource hierarchy,
policy values exist only on the target.

<div className="example">
  <strong>AWS > S3 > Bucket > Approved</strong>
  <ul>
    <li> A <strong>Policy Setting</strong> for <code>AWS > S3 > Bucket > Approved</code> can be made on an AWS Account, Region, or individual bucket.</li>
    <li> <strong>Every</strong> S3 bucket that has a <strong>Policy Setting</strong> for <code>AWS > S3 > Bucket > Approved</code> will have a <strong>Policy Value</strong> for <code>AWS > S3 > Bucket > Approved</code>. The policy value may have been set at the AWS account, region, and/or individual bucket - this is the effective value for this instance.</li>
  </ul>
</div>

## Expiration

Policy settings can be set to only be valid for a period of time. This is often
useful for setting temporary exceptions. You can, for instance, specify that an
exception should expire in 30 days, or that a policy should only be in effect
this Saturday from 1:00am to 4:00am to coincide with your organization's change
control policy.

## Calculating Policy Values for a Resource

Policy settings are defined as templates. Policy values are calculated from the
policy setting. In most cases the policy setting is a static data value (e.g.
"Check: Approved") which is simply copied to the policy value. But, in some
cases, the template may include variables or calculations allowing the policy
value to change dynamically - e.g. tag templates that pull information about the
AWS Account or Region.

To create a calculated policy value, you must specify:

- An **Input Query**. This must be a valid graphql query. For example:
  ```graphql
  {
    resources(filter: "resourceType:bucket") {
      items {
        title
      }
    }
  }
  ```
- A **Template**. The template can use the results of the input query (reference
  with the `$` variable) and transform them into the format expected by the
  policy. For example:
  ```jinja
  {% for item in $.resourceList.items %}
  - {{item.title}}
  {% endfor %}`
  ```

## Exceptions

Policies often have settings that are applicable to a wide number of resources.
There are, however, inevitably **exceptions** that exist, where the account wide
policy does not apply to that specific resource.

For example, an AWS account might house S3 buckets that have public access
disabled. This account also has a bucket that must have public access enabled.
In Guardrails, we accomplish this with the concept of exceptions.

**Exceptions** allow you to override a required setting on a resource lower in
the policy hierarchy. In the above example, S3 public access policies are set to
block, but we can set one specific bucket to allow public access.

![](/images/docs/guardrails/exception.png)

When set, the overriding policy setting will be signified with **Effective
Setting** and a check mark.

Head over to our guide detailing
[how to create an exception as an example](/guardrails/docs/getting-started/getting-started-aws/create-static-exception#step-8-create-the-policy-exception).
