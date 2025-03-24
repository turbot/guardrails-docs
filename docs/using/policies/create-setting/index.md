---
title: Create a Policy Setting
sidebar_label: Create a Policy Setting 🛠
---

# Create a Policy Setting


[Polices](concepts/policies) allow you to define configuration settings in
Guardrails and apply them across your environment. Guardrails' hierarchical structure
providers a powerful but simple mechanism for centralizing policy
administration, along with managing exceptions.

<!--
### Best Practices

- Minimize administration by leveraging the
  [Policy Hierarchy](concepts/policies/hierarchy).
  - Create policy settings as high as possible in the hierarchy and manage
    exceptions below.
  - Use [Policy Packs](concepts/resources/policy-packs) to apply a group of
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
-->

## Policy Settings in the Guardrails Console

You can create a policy setting in the Guardrails Console from the **Policies** tab.

1. Log into Guardrails with `Turbot/Admin` permissions, then click the **Policies**
   tab.

2. Click the **New Policy Setting** button.
   ![create new policy](/images/docs/guardrails/using/policies/create-setting/create-new-policy-setting.png)

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
   ![policy setting](/images/docs/guardrails/using/policies/create-setting/policy-setting-created.png)

7. If desired, click **Add note**. Often this is used to designate change
   control identifiers such as change order ticket numbers.

8. If desired, click **Add expiration** to set an expiration date. The policy
   will expire after the defined time elapses.

9. Click **Create** to create your new setting. The policy will immediately go
   into effect. Be careful when applying policies that are capable of changing
   or removing cloud resources!
   ![](/images/docs/guardrails/using/policies/create-setting/policy-setting-detail.png)

<!-- <div className="alert alert-info">
  <span style="font-weight:bold">Tip! </span> The policy setting dialog will pre-fill the <b>Scope</b> and <b>Policy Type</b> based on the current filter - When setting multiple policies, add a <b>Resource</b> filter and a <b>Policy Type</b> filter to browse the available policy types.
</div> -->

## Policy Settings with Terraform

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

<!--
## Modifying/Deleting a Policy Setting

You can delete or modify a policy setting on the **Policy Setting** page.

1. On the **Policies** tab, click **POLICY SETTINGS** card towards top right
   corner. Search for the policy setting, for example: **AWS > S3 > Bucket >
   Versioning**. ![](/images/docs/guardrails/using/policies/create-setting/policy-setting-search-result.png)
2. Click on the policy setting.
   ![](/images/docs/guardrails/using/policies/create-setting/policy-setting-detail.png)
3. To modify the setting, click **Edit** towards top right corner of the page.
   This will launch the **Update Policy Setting** page. Make any desired changes
   and click the **Update** button.
   ![](/images/docs/guardrails/using/policies/create-setting/policy-setting-updated.png)
4. To delete the setting, click **Delete** next to the policy setting that you
   wish to delete.
-->
