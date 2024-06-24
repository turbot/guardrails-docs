---
title: Taxonomy
sidebar_label: Taxonomy
---

# Taxonomy of Policies

There's a number of dimensions that can be used to describe a policy. They are:

- the values the policy accepts
- whether it depends on other policies
- and if it's calculated or not.

Respectively, these are Simple policies, Compound policies and Calculated
policies. In the course of building policies to satisfy a particular control
objective, all three types may be used

In ascending order of complexity: Simple, Compound, Calculated, Calculated
Simple, Calculated Compound.

- **Simple**: A policy that takes a single value without any dependent policies.

  - Simple policies can have the following values:
    - Enumerated values
    - Text field
    - [OCL](guides/managing-policies/OCL) [OCL Reference](reference/ocl)
    - [YAML](guides/managing-policies/YAML)
    - [HCL/Terraform](guides/network-stack)

- **Compound**: A policy that depends on values in other policies to determine
  what to do. A common examples is the `Active` collections of policies. (Other
  examples of policy collections are `Approved`, `Configured`, `Logging`, and
  `Permissions` to name a few.) On its own the `Active` policy dictates what to
  do when an inactive resource is found. It relies on the `Active > Age` and
  `Active > Last Modified` child policies to determine if the resource is
  active.

- **Calculated**: Calculated policies are most often used when a customer needs
  to implement business logic when evaluating a resource. In contrast to Simple
  and Compound policies, a calculated policy can implement custom logic based on
  CMDB information. Any policy in Guardrails can be made into a calculated policy.

- **Multi-query Calculated**: Some calculated policies benefit from or require
  multiple stages of refinement of input data. For example: A control objective
  on a particular network resource type depends on the presence of other
  resources in the same virtual network. A single-query calc policy approach
  would grab all resources of that resource type for the entire workspace then
  filter that huge list in the Nunjucks template. Essentially asking "Return all
  resources of this resource type everywhere." In large environments, this can
  result in thousands or tens of thousands of `items`. Calc policy GraphQL
  results are hard limited to 300 results with no paging possible. The
  multi-query approach instead starts with the question "What Virtual Network is
  this resource in?" then asks "In this virtual network specifically, what
  network resources are available?". Now, instead of thousands of `items`, the
  calc policy only has to deal with a few relevant resources. The benefit of
  multi-query is that policy developers are assured they get exactly the data
  they need with the cost of some added complexity in their policies.

## Examples

### Simple Policy Example

Consider
[`AWS > CloudWatch > Alarm > CMDB`](mods/turbot/aws-cloudwatch/inspect#/policy/types/alarmCmdb)
as an example of a simple policy. It accepts one of three policy values: `Skip`,
`Enforce: Enabled`, `Enforce: Disabled`. Selecting one of these values is all
that's required.

### Compound Policy Example

Let's look at the
[`AWS > CloudWatch > Alarm > Active`](mods/turbot/aws-cloudwatch/inspect#/policy/types/alarmActive)
policy collection. The patterns described below will hold for other compound
policies. The collection includes with these (truncated for readability) value
sets:

- `AWS > CloudWatch > Alarm > Active`

```
Skip
Check: Active
Enforce: Delete inactive with 1 day warning
Enforce: Delete inactive with 3 days warning
Enforce: Delete inactive with 7 days warning
```

- `AWS > CloudWatch > Alarm > Active > Age`

```
Skip
Force inactive if age > 1 day
Force inactive if age > 3 days
Force inactive if age > 7 days
```

- `AWS > CloudWatch > Alarm > Active > Last Modified`

```
Skip
Active if last modified <= 1 day
Active if last modified <= 3 days
Active if last modified <= 7 days
```

We can see that the `Active` policy is the only one that asserts what Guardrails
should do with an out of compliance resource. It will `Skip`, `Check` or
`Enforce`. The `Age` and `Last Modified` policies make assertions about the
state of the resource itself. Remember that `Skip` means "ignore" or "do not
evaluate" to Guardrails, and that almost all policies default to `Skip`.

Setting the `Active` policy alone will put the `Active` control into an
`Invalid` state because dependent policies of `Active > Age` and
`Active > Last Modified` are in `Skip`. There's no information for the `Active`
policy to make a decision on. If we set `Active > Age` to some value other than
`Skip`, then `Active` can make a decision.

## Calculated Policies

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
  [Guardrails Samples Repo](https://github.com/turbot/guardrails-samples/tree/master/calculated_policies/aws_s3_approved_static_website_hosting_requires_cloud_front).

## Additional Information

- [Calculated Policy 7 minute lab](7-minute-labs/calc-policy)
- [Guardrails Samples Repo with calculated policy examples](https://github.com/turbot/guardrails-samples/tree/master/calculated_policies)
- [Policies concepts page](concepts/policies)
- [Azure resource tagging example with calculated policies and Terraform](guides/managing-policies/config-examples/azure-tags)
- [Calculated Policy FAQ](calculated-faq)
