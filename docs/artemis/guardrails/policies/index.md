---
title: Policies
sidebar_label: Policies
---

# Policies

Each guardrail comprises one or more **Policy Settings** that determine its intended behavior.  Policies are essentially the settings and options that allow you to configure the Guardrail to meet your requirements.

Guardrails Policies can be managed using the Guardrails UI, Guardrails API or Terraform.


## Policy Types

A **Policy Type** defines a specific setting that may be configured for resources. For example, `AWS > S3 > Bucket > Versioning`.

Each policy type targets one or more [Resource Types](concepts/resources/types-categories#resource-types).

Policy types are defined in [Mods](https://hub.guardrails.turbot.com/#mods).


## Policy Settings

A **Policy Setting** represents the intended configuration of the policy type for a given guardrail.  When you create a guardrail, you configure policy settings to control the behavior of the controls for the guardrail. 

For example, to create a guardrail to enforce bucket versioning, add the `AWS > S3 > Bucket > Versioning` control to the guardrail and configure its `Versioning` policy setting to `Enforce: Enabled`.  


## Policy Values

A **Policy Value** is the effective policy setting for a given resource. Every resource that is targeted by a given policy setting will have its own value for that policy.  For example, if you apply a guardrail to your account that has the `AWS > S3 > Bucket > Versioning` set to `Enforce: Enabled`, every bucket in the account will have its own policy value for `AWS > S3 > Bucket > Versioning` that is set to `Enforce: Enabled`.

In most cases the policy setting is a static data value, so the policy values are the same as the policy setting in the guardrail.  The distinction between a setting and the resulting values becomes significant when using [calculated policies](#calculated-policies); the calculated policy setting defines a template for dynamically determining the value for each resource.


## Calculated Policies

Policy settings may be defined as calculated policies to dynamically set their values.  You can look up data in the CMDB and then apply logic to determine the appropriate value on a per-resource basis.  For example, you could create a calculated policy setting that looks up the tags on a bucket and enforces versioning unless there is a `classification` tag with a value of `temp`.  Guardrails will calculate this policy for each bucket that the guardrail is attached to, and each will have its own value.



To create a calculated policy value, you must specify:

- An **Input Query**. The input query allows you to query the guardrails CMDB for information about the resource.  The input query must be a valid graphql query. For example:
  ```graphql
  {
    bucket {
      turbot {
        tags
      }
    }
  }
  ```
- A nunjucks **Template**. The template can use the results of the input query (referenced with the `$` variable) and transform them into the format expected by the policy. For example:
  ```jinja
  {% if $.bucket.turbot.tags.classification == "temp" -%}
  'Skip'
  {% else -%}
  'Enforce: Enabled'
  {%- endif %}
  ```


<!--

### Expiration

Policy settings can be set to only be valid for a period of time. This is often
useful for setting temporary exceptions. You can, for instance, specify that an
exception should expire in 30 days, or that a policy should only be in effect
this Saturday from 1:00am to 4:00am to coincide with your organization's change
control policy.



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


-->