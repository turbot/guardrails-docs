---
title: Tags in Guardrails
sidebar_label: Tags
---

# Tags in Guardrails

Tags are a fundamental concept for many organizations. Identification of cloud
resources across many accounts is trivial, but only if tagging processes are in
place and understood by users. With Guardrails, we can enforce tags on various
resource types. This includes, but is not limited to, checking for the following
scenarios:

- Ensuring all resources have at least one tag.
- Ensuring all tags are lower (or upper) case to allow for automation.
- Specific keys must exist.
- Specific keys AND values must exist.

Guardrails can both check and remediate resources that do not have compliant tags.
Metadata about the resource stored in CMDB or information from a
[Guardrails File](/guardrails/docs/guides/configuring-guardrails/files) can be referenced when checking and applying tags.

If you are not familiar with Calculated Policies, check out the
[Calculated Policies FAQ](concepts/policies/calculated-faq) as well as our
[7 minute lab](7-minute-labs/calc-policy).

## Tagging Cloud Resources

For any cloud resource that can be tagged, an associated policy in Guardrails exists
(note that tags are called "Labels" in Google Cloud):

- `AWS > Service > Resource > Tags`
- `Azure > Service > Resource > Tags`
- `GCP > Service > Resource > Labels`

For example, if an administrator wanted to enforce tags on an AWS EC2 instance,
the policy would become `AWS > EC2 > Instance > Tags`. This set of policies is
the driving mechanism to determine if tags should be checked for violations by
Guardrails, and if action should be taken when a resource is found to not have the
correct set of tags.

## Tag Value Reserved Strings

Guardrails uses tag values of `null` and `undefined` as indicators that a tag key
should be removed. If a user sets these reserved keywords as tag values, in some
cases this can result in unintentional tag key removal. For this to happen, the
following conditions must be met:

- Tags policy is set to `Enforce`.
- The tag key most be specified in the Tags Template policy.
- The tag value set by the user is `null` or `undefined`. If the tag keys aren't
  specified in the template, then Guardrails will ignore them.

## Tagging Templates

Tagging templates allow flexibility in assigning tags for various resources
across a wide number of accounts. A policy will check all resources within the
scope for the correct tags. If a tag exists but should not, it is removed. Tags
that do not exist but should will be added by Guardrails.

A basic tagging template is a YAML list with static values. Consider the policy
`AWS > EC2 > Instance > Tags > Template`. In this example, instances are
required to have a `Cost Center`, `Environment`, and `Account Owner` tags. These
tags do not change throughout the account, and thus the policy can be set at the
folder level of which the AWS account is a child of (recommended) or on the AWS
account within Guardrails.

```yaml
- Cost Center: "Security"
- Environment: "Dev"
- Account Owner: "John Doe"
```

If the policy `AWS > EC2 > Instance > Tags` is set to `Enforce: Set tags`,
Guardrails will take action on any EC2 instance without the required set of tags.

## Add, Update or Remove Tags using Tagging Templates

Adding, updating or removing tags can be done in a straightforward way. The tags
template asserts which tags that should or should not be set on the resource.
NOTE: If a resource has tags that are not described in the Tags Template, then
Guardrails will ignore those tags. Only tags defined in the template are processed.

### Add

To add a new tag, specify it in the template. If the tag already exists on the
resource, then Guardrails will update that tag to the specified value.

```yaml
- SomeTag: ReallyImportantTagValueV1
```

### Remove Tag

To remove a tag, set the value to `null`.

```yaml
- SomeTag: null
```

### Update Tag Value

Updating a tag value on a resource is done by updating the tag value in the tags
template. The approach is the same as adding a new tag.

```yaml
- SomeTag: ReallyImportantTagValueV2
```

### Update Tag Key

To change a tag key, one must destroy the old tag then create a new one. Use the
approach described in "Remove Tag" to proceed.

```yaml
- SomeTag: null
- SomeNewTag: NewReallyImportantTagValue
```

## Dynamic Tagging

Using the tagging template example above, it becomes trivial to enforce a set of
tags on a variety of resources. However, many organizations have more complex
tagging requirements, such as not only ensuring that AWS IAM users have an email
tag, but also validating that the tag is in fact an email.

Continuing to use the above example, the
`AWS > EC2 > Instance > Tags > Template` in the new policy view has the option
to `Switch to calculated mode`. The policy window then changes to allow users to
write custom [Calculated Policies](/guardrails/docs/concepts/policies/calculated-faq).

### Examples

For all the examples, use the following query in the calculated policy, using
`AWS > EC2 > Instance > Tags > Template`:

```grapqhql
{
  resource {
    turbot {
      tags
    }
  }
}
```

### Alarm if key does not exist

If the key `cost_center` does not exist, output `cost_center`:`missing_tag`.
Else, simply output a blank array. Guardrails will alarm if the tag is not correct.

Template:

```nunjucks
{%- if 'cost_center' not in $.resource.turbot.tags -%} {# Check for the key cost_center #}
- cost_center: 'missing_tags'
{%- else -%}
[]
{%- endif -%}
```

### Alarm if key:value pair does not exist

If the key:value pair `cost_center`:`Security` does not exist, output
`cost_center`:`Security`. Else, simply output a blank array. Guardrails will alarm
if the tag is not correct.

Template:

```nunjucks
{%- if 'costcenter' not in $.resource.turbot.tags-%} {# Check for the key cost_center #}
- cost_center: 'Security'
{%- elif 'Security' != $.resource.turbot.tags.costcenter  -%} {# Check for the value of key cost_center #}
- cost_center: 'Security'
{%- else -%}
[]
{%- endif -%}
```

### Alarm if a Resource has no Tags

A simple use case for Guardrails tagging controls is to check resources for the
existence of tags.

Template:

```nunjucks
{# Checks if there are any tags #}
{% if $.resource.turbot.tags | length == 0 -%}
"tag_compliance": "untagged_resource" {# temp placeholder to mark it untagged #}
{% else -%}
[] {# if there are tags, do nothing #}
{%- endif %}
```

If there are tags, the template policy returns a blank array (`[]`). If there
are no tags, the tagging control will alarm saying that a new tag must be added.
