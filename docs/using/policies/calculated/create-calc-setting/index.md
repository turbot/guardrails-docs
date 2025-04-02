---
title: Create a Calculated Policy Setting
sidebar_label: Create a Calculated Policy Setting 🛠
---

# Create a Calculated Policy Setting

While most policy settings can be set with a simple static value, there may be
instances where more flexibility is needed in determining the correct option.
[Calculated policies](concepts/policies/values-settings#calculating-policy-values-for-a-resource)
allow you to dynamically compute the policy value using information available in
the Guardrails CMDB.

Any policy in Guardrails can use a calculated policy instead of a static value!

## Calculated Policy Taxonomy

What defines a calculated policy?

1. A [GraphQL](reference/graphql) query. This query automatically pivots to the
   current resource, simplifying the query syntax. For example, if you query
   `resource`, Guardrails knows you mean _this (the current) resource_, and querying
   `region` means _the region for this (the current) resource_:

```graphql
{
  resource {
    tags
  }
  region {
    Name
  }
}
```

2. A [Nunjucks](https://mozilla.github.io/nunjucks/) template to define logic,
   parse the query response, and eventually output a value. For example:

```
{% if $.resource.tags['data-classification'] == "temp" %}
"Enforce: Disabled"
{% else %}
"Enforce: Enabled"
{% endif %}
```

## Create a Calculated Policy Setting [Guardrails Console]

You can create a policy setting in the Guardrails Console in the same way that you
can
[create a simple policy setting](guides/managing-policies#creating-simple-policy-settings),
however instead of entering a value for the **Setting**, click **Enable
calculated mode** and click **Launch calculated policy builder**.

To create a calculated policy, navigate to the **Create Policy Setting** page.
Select **Enable calculated mode** then **Launch calculated policy builder**.

1. Select a **Test Resource** that is used to verify the query.
2. Enter a valid **GraphQL Input Query**. The query Output box will update in
   real time.
3. Enter a valid **Nunjucks Template**. Once again, this is logic that can be
   used to parse the query and then output a value based on template logic.
4. Verify that the final computed policy value in the **Result** box is correct
   and has passed validation.
   ![policy builder](/images/docs/guardrails/using/policies/create-setting/calculated-policy-builder.png)

5. If desired, change the **Test Resource** to verify against other resources.
6. Click **Update** to set the calculated policy.
7. Click **Create** to create your new policy setting.
   ![calculated policy setting](/images/docs/guardrails/using/policies/create-setting/calculated-policy-setting.png)

## Creating a Policy Setting [Terraform]

You can manage policy settings with Terraform using the
[turbot_policy_setting](https://www.terraform.io/docs/providers/turbot/r/policy_setting.html)
resource by specifying a `template` and `template_input`. Syntax here is VERY
important. Note the `EOT` encapsulating both the template and template_input!

```hcl
# AWS > S3 > Bucket > Versioning
resource "turbot_policy_setting" "s3_bucket_versioning" {
  resource   = turbot_policy_pack.baseline.id
  type       = "tmod:@turbot/aws-s3#/policy/types/bucketVersioning"
  template_input = <<EOT
    {
        resource {
            tags
        }
    }
  EOT

  template      = <<EOT
    {% if $.resource.tags['data-classification'] == "temp" %}
    "Enforce: Disabled"
    {% else %}
    "Enforce: Enabled"
    {% endif %}
  EOT
}
```
