---
title: Calculated Policies
sidebar_label: Calculated Policies
---

# Calculated Policies

Any policy in Guardrails can be turned into a
[calculated policy](faq/calculated-policies). A calculated policy is used
anytime the basic action provided by Guardrails needs to be dependent on some other
information. A common example is to make a resource's tag key/value dependent on
whether the resource is in a production or nonproduction environment. More
complex organizational business rules are often implemented in calculated
policies.

Calculated policies rely on three things: The information contained in the CMDB
for the target resource, the GraphQL query to access that information and the
Nunjucks template to evaluate it.

CMDB: Definitions for a resource's CMDB entry can be found in the Mods
Repository documentation. For our CloudWatch Alarm example, we would start with
the [Alarm](mods/turbot/aws-cloudwatch/inspect#/resource/types/alarm) resource
summary then go to the
[Alarm resource definition](mods/turbot/aws-cloudwatch/inspect#/definitions/alarm).
The easiest way to explore is to create an instance of the resource you want to
work on, then look at the data provided in the Overview tab.

GraphQL: Use the Developer console in your Guardrails workspace to explore the
`resource` query. Under the hood, the calculated policy dialog is making a
similar query. Provided you have an example resource already, navigate to that
resource in the Guardrails console. Go to the Overview tab then look for `id` under
the `turbot` section. Include that long number in the `id` field of the resource
query in the Developer Console.

When working on calculated policies, make sure to select a target resource. The
below examples won't make sense if you don't pick a resource.

A simple starter query in the Developer Console might look like:

```
query SimpleResourceQuery {
  resource(id: "196925434872486") {
    data
    turbot {
      id
      akas
    }
  }
}
```

The equivalent calculated policy query is:

```
{
  resource {
    data
    turbot {
      id
      akas
    }
  }
}
```

Note the implicit inclusion of the resource ID that the calculated policy takes
care of for you.

Nunjucks: The
[Nunjucks docs](https://mozilla.github.io/nunjucks/templating.html) describe the
full capabilities of what it can do. Developers familiar with string
manipulation, `if-else`, `for` and `range` should be able to orient quickly. A
deep discussion of how to script with Nunjucks is outside the scope of this
guide.

Familiarity with the CMDB data for the target resource, GraphQL and Nunjucks is
essential to quickly making progress on calculated policies. Be aware that
sometimes a deep understanding of how the cloud provider represents a resource
is required. Data that appears in intuitive places in the provider's UI may not
be intuitively placed in the underlying data structure.

## Compound Calculated Policies

Calculated compound policies: Any policy in Guardrails can be made into a calculated
policy. A common compound policy configuration is to have the `Active` policy
statically set to `Check` or `Enforce` then have the `Active > Age` policy be
calculated. However, this can sometimes result in the `Active` control going
into an `invalid` state, as they require at least one of the sub policies not be
in `Skip`. To solve this problem, a calc policy can be placed on the `Active`
policy with similar logic to the `Active > Age` policy. This way, evaluation of
the `Active` control as a whole will go to `Skipped` and avoid the `invalid`
state.

## Multi-query Calculated Policies

The below Terraform excerpt shows the YAML array of GraphQL+Nunjucks templates.

```yaml
- |
  {
    account {
      turbot {
        id
      }
    }
  }
- |
  {
    account {
      turbot {
        id
      }
    }
    trails: resources(filter: "resourceId:{{ $.account.turbot.id }} resourceTypeId:'tmod:@turbot/aws-cloudtrail#/resource/types/trail' $.Status.IsLogging:true $.IsMultiRegionTrail:true limit:300") {
      items {
        trailName: get(path: "Name")
        cloudWatchLogsLogGroupArn: get(path: "CloudWatchLogsLogGroupArn")
        eventSelectors: get(path: "EventSelectors")
      }
    }
  }
```

Notes:

- The YAML `- |` symbols are essential as this indicates that this is an array
  of queries and the strings in each array element are multi-line. These `- |`
  array indicators should be on their own lines. YAML is also particular about
  indentation.
- Only the results of the final query are sent to the control. Any intermediate
  results must also be included in the final query. The example shows how this
  is done.
- GraphQL permits multiple `resources()` queries when they have labels. The
  `trails:` label shows how this is done.
- A full example can be found in the
  [Guardrails Samples Repo](https://github.com/turbot/guardrails-samples/blob/main/policy_packs/aws/ec2/enforce_encryption_at_rest_is_enabled_for_ebs_volumes/README.md).

## Additional Information

- [Calculated Policy 7 minute lab](7-minute-labs/calc-policy)
- [Guardrails Samples Repo with Policy Packs](https://github.com/turbot/guardrails-samples/tree/main/policy_packs)
- [Policies concepts page](concepts/policies)
- [AWS resource tagging example with calculated policies and Terraform](https://github.com/turbot/guardrails-samples/tree/main/policy_packs/aws/ec2/enforce_instances_use_amis_with_approved_tags)
- [Calculated Policy FAQ](/guardrails/docs/concepts/policies/calculated-faq)
