---
title: Tag Casing
sidebar_label: Tag Casing
---

# Resource Tagging and Handling Key:Value Casing

Upper and lower case characters can lead to false positives. With Guardrails, we can
use calculated policies to check for tags regardless of casing, reducing false
positives and allowing users and administrators to focus on real business
improvements. Additionally, a calculated policy can be written to automatically
fix values that should be either all lower or all upper case. Note that existing
keys CANNOT be changed (this is done to protect any existing tag).

<div className="alert alert-info">
  This example, along with many others, can be found in the <a href="https://github.com/turbot/guardrails-samples" target="_blank">Guardrails Samples Repo</a>
</div>

## Initial Configuration

For our initial configuration, let us assume we have an AWS S3 bucket called
`turbot-test-bucket` with the following tags:

| Key         | Value    |
| ----------- | -------- |
| Test        | Tag      |
| environment | DEV      |
| owner       | john Doe |

Assume that we have also set the policy
[AWS > S3 > Bucket > Tags](/guardrails/docs/mods/aws/aws-s3/policy#aws--s3--bucket--tags)
to `Check: Tags are correct`. This means that Guardrails will only alarm and not
change any tags on the resource itself.

## Tagging with Guardrails

### Check Tags, Ignoring Casing

Using Guardrails, we can define a policy
[AWS > S3 > Bucket > Tags > Template](/guardrails/docs/mods/aws/aws-s3/policy#aws--s3--bucket--tags--template)
with logic that is case agnostic.

First, let's start with the GraphQL query. We want to just pull in the resource
tags:

```graphql
{
  resource {
    turbot {
      tags
    }
  }
}
```

If our template looked like the following:

```nunjucks
{%- if $.resource.turbot.tags['owner'] == 'john doe' -%}
[]
{%- else -%}
- 'owner': 'invalid_tag'
{%- endif -%}
```

Guardrails would evaluate the control `AWS > S3 > Bucket > Tags` to `Alarm` due to
the casing on the tag value `john Doe`. To get around this, we use
[RegEx](guides/nunjucks#regex) to evaluate the string. If we are confident in
the casing of the key, it is possible to do something simple like so:

```nunjucks
{%- if r/john doe/.test($.resource.turbot.tags['owner'] | lower) -%}
[]
{%- else -%}
- 'owner': 'invalid_tag'
{%- endif -%}
```

However, real applications are usually not so trivial. To account for the casing
differences with the key AND value, we need to add some additional lines of
code:

![](/images/docs/guardrails/calc-policy.png)

```nunjucks
{%- set approved = 'no' -%}

{%- for key,value in $.resource.turbot.tags -%}
	{%- if r/owners/.test(key | lower) -%}
		{%- if r/john doe/.test(value | lower) %}
			{%- set approved = 'yes' -%}
        {%- endif %}
	{%- endif -%}
{%- endfor -%}

{%- if approved == 'no' -%}
- owner: 'Missing_tag'
{%- else -%}
[]
{%- endif -%}
```

First, set a variable that is used to denote if the key: value pair exists.
Then, parse out the key and value pairs using a for loop, check for the key
first, and if the key exists, check for the value. If both the key and value if
statement evaluate to true, we set the dummy variable to `yes` and in the final
if statement, simply pass an empty array denoting the tags are approved. Because
our bucket has the key:value pair `Owners`:`john Doe`, it passes with flying
colors!

### Check Tags, Change Casing

Using Guardrails, we can define a policy
[AWS > S3 > Bucket > Tags > Template](/guardrails/docs/mods/aws/aws-s3/policy#aws--s3--bucket--tags--template)
with logic that is case agnostic.

As above, let's start with the GraphQL query. We want to just pull in the
resource tags:

```graphql
{
  resource {
    turbot {
      tags
    }
  }
}
```

We want to check to make sure the key `owner` exists, then change the value to
be all lower case.

```nunjucks
{%- set regExp = r/owners/ -%}
{%- set set_key = 0 -%}

{%- for key, value in $.resource.turbot.tags -%}
{%- set lower_value = (value | lower) -%}
{%- if regExp.test(key | lower) and lower_value != value -%}
	- {{ key }}: {{ lower_value }}
    {%- set set_key = 1 -%}
{%- endif -%}
{%- endfor -%}

{%- if set_key == 0 -%}
[]
{%- endif -%}
```

In this template, set a variable that can be used as a boolean that changes
value only if the lower case tag change is necessary. If there is no change, we
want to be sure to output a blank array. We can utilize Regex to test the key to
ensure we are looking at the right one, then test the existing value with
another string that has had the `lower` function applied. If those strings don't
match, the result of the template is to change the current value with the lower
case value.
