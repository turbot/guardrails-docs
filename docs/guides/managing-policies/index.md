---
title: Managing Policies
sidebar_label: Managing Policies
---

# Managing Policies

## Overview

[Polices](concepts/policies) allow you to define configuration settings in
Guardrails and apply them across your environment. Guardrails' hierarchical structure
providers a powerful but simple mechanism for centralizing policy
administration, along with managing exceptions.

### Best Practices

- Minimize administration by leveraging the
  [Policy Hierarchy](concepts/policies/hierarchy).
  - Create policy settings as high as possible in the hierarchy and manage
    exceptions below.
  - Use [Smart Folders](concepts/resources/smart-folders) to apply a group of
    policies to a resource.
- Review and set ALL sub-policies before enabling a control. Many controls such
  as `Active`, `Approved`, and `Tags` use multiple policies to determine their
  behavior. To avoid unwanted changes, make sure all of these dependent
  sub-policies are configured before enabling the control.
    <div className="alert alert-primary">
    Before setting <code>AWS > EC2 > Instance > Approved</code> to "Enforce: Delete unapproved if new", review and set (if necessary) all of the sub-policies:
    <ul>
        <li><code>AWS > EC2 > Instance > Approved > Instance Types</code></li>
        <li><code>AWS > EC2 > Instance > Approved > Public IP</code></li>
        <li><code>AWS > EC2 > Instance > Approved > Regions</code></li>
        <li><code>AWS > EC2 > Instance > Approved > Usage</code></li>
    </ul>
    </div>
- Preview changes by setting a policy to `Check` before setting to `Enforce`.
  Creating a Guardrails Policy Setting is a powerful action - a single setting may
  affect thousands of resources. Setting the policy to `Check` can help
  determine the impact of the change before enforcement is enabled.

    <div className="alert alert-primary">
    After setting <code>AWS > EC2 > Instance > Approved > *</code> sub-policies, set <code>AWS > EC2 > Instance > Approved</code> to "Check: Approved" and allow the controls to run.  Review the <code>AWS > EC2 > Instance > Approved</code> control alarms to determine which instances will be deleted if you change the setting to "Enforce: Delete unapproved".
    </div>

## Creating Simple Policy Settings

### Policy Settings in the Guardrails Console

You can create a policy setting in the Guardrails Console from the **Policies** tab.

1. Log into Guardrails with `Turbot/Admin` permissions, then click the **Policies**
   tab.

2. Click the **New Policy Setting** button.
   ![create new policy](/images/docs/guardrails/create-new-policy-setting.png)

3. Select the
   **[Policy Type](concepts/policies/types-categories#policy-types)**. For
   example, `AWS > EC2 > Instance > Approved`.

4. Select the **Resource** where the policy setting will live. The setting will
   affect all resources at the specified level and below in the
   [policy hierarchy](concepts/policies/hierarchy).

5. Select the appropriate setting. Some policies have predefined settings, but
   others accept arrays with strings. The format and acceptable values depend on
   the policy type. The right side of the window contains the policy overview,
   recommendations, as well as the allowed values.

6. Select the
   **[Precedence](concepts/policies/hierarchy#precedence-rules-required-vs-recommended)**
   for this setting. Default setting is `Required`.
   ![policy setting](/images/docs/guardrails/policy-setting-created.png)

7. If desired, click **Add note**. Often this is used to designate change
   control identifiers such as change order ticket numbers.

8. If desired, click **Add expiration** to set an expiration date. The policy
   will expire after the defined time elapses.

9. Click **Create** to create your new setting. The policy will immediately go
   into effect. Be careful when applying policies that are capable of changing
   or removing cloud resources!
   ![](/images/docs/guardrails/policy-setting-detail.png)

<!-- <div className="alert alert-info">
  <span style="font-weight:bold">Tip! </span> The policy setting dialog will pre-fill the <b>Scope</b> and <b>Policy Type</b> based on the current filter - When setting multiple policies, add a <b>Resource</b> filter and a <b>Policy Type</b> filter to browse the available policy types.
</div> -->

### Policy Settings with Terraform

<div className="alert alert-info font-weight-bold">
  &raquo; New to Terraform? Get started with <a href="7-minute-labs/terraform">Terraform in 7 minutes &rarr;</a>
</div>

You can manage policy settings with Terraform using the
[turbot_policy_setting](https://www.terraform.io/docs/providers/turbot/r/policy_setting.html)
resource.

```hcl
# Setting value to "Enforce: Enabled" to enable versioning for buckets
# AWS > S3 > Bucket > Versioning
resource "turbot_policy_setting" "s3_bucket_versioning" {
  resource   =  turbot_folder.id
  type       = "tmod:@turbot/aws-s3#/policy/types/bucketVersioning"
  value      = "Enforce: Enabled"
}
```

## Using Calculated Polices

While most policy settings can be set with a simple static value, there may be
instances where more flexibility is needed in determining the correct option.
[Calculated policies](concepts/policies/values-settings#calculating-policy-values-for-a-resource)
allow you to dynamically compute the policy value using information available in
the Guardrails CMDB.

Any policy in Guardrails can use a calculated policy instead of a static value!

### Calculated Policy Taxonomy

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

### Create a Calculated Policy Setting [Guardrails Console]

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
   ![policy builder](/images/docs/guardrails/calculated-policy-builder.png)

5. If desired, change the **Test Resource** to verify against other resources.
6. Click **Update** to set the calculated policy.
7. Click **Create** to create your new policy setting.
   ![calculated policy setting](/images/docs/guardrails/calculated-policy-setting.png)

### Creating a Policy Setting [Terraform]

You can manage policy settings with Terraform using the
[turbot_policy_setting](https://www.terraform.io/docs/providers/turbot/r/policy_setting.html)
resource by specifying a `template` and `template_input`. Syntax here is VERY
important. Note the `EOT` encapsulating both the template and template_input!

```hcl
# AWS > S3 > Bucket > Versioning
resource "turbot_policy_setting" "s3_bucket_versioning" {
  resource   = turbot_smart_folder.baseline.id
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

## Modifying/Deleting a Policy Setting

You can delete or modify a policy setting on the **Policy Setting** page.

1. On the **Policies** tab, click **POLICY SETTINGS** card towards top right
   corner. Search for the policy setting, for example: **AWS > S3 > Bucket >
   Versioning**. ![](/images/docs/guardrails/policy-setting-search-result.png)
2. Click on the policy setting.
   ![](/images/docs/guardrails/policy-setting-detail.png)
3. To modify the setting, click **Edit** towards top right corner of the page.
   This will launch the **Update Policy Setting** page. Make any desired changes
   and click the **Update** button.
   ![](/images/docs/guardrails/policy-setting-updated.png)
4. To delete the setting, click **Delete** next to the policy setting that you
   wish to delete.

## Creating an Exception

The Guardrails [Resource Hierarchy](concepts/policies/hierarchy) allows you to
define a policy setting in a single place and have it enforced on all descendant
resources. However, there are occasions when the policy setting should not (or
cannot) be enforced on specific resources. **Exceptions** allow you to override
a required setting on a resource lower in the policy hierarchy.

<div class = "alert alert-warning">
To create an exception, you must have Turbot/Admin permission on the resource where the required setting is defined.
</div>

Exceptions can be created in the Guardrails Console from the **Policy Setting
Hierarchy** page:

1.  From the home page, search the resource for which you wish to create an
    exception. Click on the **Resource**. Resource details page displayed.
    ![](/images/docs/guardrails/exception-1.png)
2.  Click **Policies** tab for the resource (under the resource name, not at the
    top of the window). Note that this page is filtered to show only the
    policies at the resource level. ![](/images/docs/guardrails/exception-2.png)
3.  Search and click on the policy setting to open the **Policy Value** page.
    ![](/images/docs/guardrails/exception-3.png)
    ![](/images/docs/guardrails/exception-4.png)

        Notice that the detail page for a policy value shows the current value as well as where the value is inherited from (if it is inherited).

4.  From the policy value page, click the **Create Setting** link.
5.  Enter the information in the **Create Policy Setting** page, and click
    **Create**. This creates the policy setting on the resource.
6.  The policy type will automatically fill, but be sure to verify that it is as
    expected and that the resource in the resource field is correct.
7.  Once verified, select the correct setting (or input the value if required)
    and click **Create**! Once created, you will see a page showing both the
    `Required` setting as well as the new `Exception`.
    ![](/images/docs/guardrails/exception-5.png)
