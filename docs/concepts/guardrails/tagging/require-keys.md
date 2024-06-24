---
title: Require Keys
sidebar_label: Require Keys
---

# Requiring Tag Keys with Guardrails Tagging Guardrails

Requiring specific tags on cloud resources is a fundamental control objective
for many organizations. This guide will overview some basics when it comes to
verifying specific keys exist. The first scenario is requiring a key with any
value except `null`, and the second is requiring specific keys with specific
values.

<div className="alert alert-info">
  This example, along with many others, can be found in the <a href="https://github.com/turbot/guardrails-samples" target="_blank">Guardrails Samples Repo</a>
</div>

## Initial Configuration

For our initial configuration, let us assume we have an AWS S3 bucket called
`turbot-test-bucket` with the following tags:

| Key         | Value    |
| ----------- | -------- |
| Test        | `null`   |
| environment | DEV      |
| owner       | john Doe |

Assume that we have also set the policy
[AWS > S3 > Bucket > Tags](/guardrails/docs/mods/aws/aws-s3/policy#aws--s3--bucket--tags)
to `Check: Tags are correct`. This means that Guardrails will only alarm and not
change any tags on the resource itself.

## Tagging with Guardrails

For both scenarios, we will be setting a calculated policy using
[AWS > S3 > Bucket > Tags > Template](/guardrails/docs/mods/aws/aws-s3/policy#aws--s3--bucket--tags--template).

We will also use the same GraphQL query for both calculated policies:

```graphql
{
  resource {
    turbot {
      tags
    }
  }
}
```

### Require Specific Keys with Any Value Except `null`

This is a simple test as an empty string is functionally equivalent to `null`,
so we only need to test for the existence of a value. This can be accomplished
via the following Nunjucks template:

```nunjucks
{%- if $.resource.turbot.tags['Test'] -%}
[]
{%- else -%}
- Test: not approved
{%- endif -%}
```

Note that this test is case sensitive! We can, however, reference our
[guide that ignores casing on tags](concepts/guardrails/tagging/tag-casing) and
adjust our template:

```nunjucks
{%- set approved = 'no' -%}

{%- for key,value in $.resource.turbot.tags -%}
	{%- if r/test/.test(key | lower) -%}
		{%- if $.resource.turbot.tags[key] %}
			{%- set approved = 'yes' -%}
        {%- endif %}
	{%- endif -%}
{%- endfor -%}

{%- if approved == 'no' -%}
- Test: not approved
{%- else -%}
[]
{%- endif -%}
```

Applying these template policies will check the S3 bucket for the tag `Test`,
with the bottom template ignoring casing, and the control will alarm if the tag
`Test` has a `null` value or the key `Test` does not exist.

### Require Specific Keys with Specific Values

This is very similar to the above example, and in fact we can reuse the
templates with a very slight modification. Let's assume we want to check for the
key: value pair `Test`:`example`.

For the case sensitive scenario:

```nunjucks
{%- if $.resource.turbot.tags['Test'] == 'example' -%}
[]
{%- else -%}
- Test: not approved
{%- endif -%}
```

To ignore casing in the key:

```nunjucks
{%- set approved = 'no' -%}

{%- for key,value in $.resource.turbot.tags -%}
	{%- if r/test/.test(key | lower) -%}
		{%- if $.resource.turbot.tags[key] == 'example' %}
			{%- set approved = 'yes' -%}
        {%- endif %}
	{%- endif -%}
{%- endfor -%}

{%- if approved == 'no' -%}
- Test: not approved
{%- else -%}
[]
{%- endif -%}
```

Further, we can ignore casing in the key _and_ value:

```nunjucks
{%- set approved = 'no' -%}

{%- for key,value in $.resource.turbot.tags -%}
	{%- if r/test/.test(key | lower) -%}
		{%- if r/example/.test(value | lower) %}
			{%- set approved = 'yes' -%}
        {%- endif %}
	{%- endif -%}
{%- endfor -%}

{%- if approved == 'no' -%}
- Test: not approved
{%- else -%}
[]
{%- endif -%}
```

### Require a Specific Selection of Values

This example will allow an array of values that a key can be, and if the key
either does not exist or the value is not in the list, we will set the value to
be `Non-Compliant Tag`. This example is very similar to our
[Calculated Policy 7 minute lab](7-minute-labs/calc-policy).

Our query will remain the same as in the other examples:

```graphql
{
  resource {
    turbot {
      tags
    }
  }
}
```

For the sake of this example, we simply want to have the key `Environment` set
to `QA`, `Prod`, `Dev`, or `Temp`. If the existing value is none of those, set
the tag value to `Non-Compliant Tag`. Note how we can use logical expressions
within the quotes. This can be expanded upon to as many tags as required.

```nunjucks
Environment: "{% if $.bucket.turbot.tags['Environment'] in ['Dev', 'QA', 'Prod', 'Temp'] %}{{ $.bucket.turbot.tags['Environment'] }}{% else %}Non-Compliant Tag{% endif %}"
```
