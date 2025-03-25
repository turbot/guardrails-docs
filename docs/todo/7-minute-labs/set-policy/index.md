---
title: Policy Settings in 7 minutes
template: Documentation
nav:
  title: Policy Settings
  order: 10
---

# Policy Settings in 7 minutes

| Goal | Create a policy setting. |
| ---- | ------------------------ |
| Time | 7 minutes                |

## Overview

Automated controls require a large number of configuration settings to determine
their desired behavior. In Turbot Guardrails, [Policies](concepts/policies) are used to
manage these settings.

In this exercise, you will create policy settings to manage S3 Bucket tags using
the Turbot Guardrails Console UI.

By the end of this lab, you will be able to create and view policy settings and
values in the Turbot Guardrails Console.

## Prerequisites

- [Install the aws, aws-iam, aws-kms and aws-s3 mods](mods/install).

- You must have at least one S3 bucket that has been discovered in your
  workspace. It is recommended that you create a test bucket for this lab.

## View a Policy Value

1. In the Turbot Guardrails Console, navigate to the test bucket that you created in the
   [prerequisite step](set-policy#prerequisites). Our test bucket name is
   _turbot-bucket-version_, which we can search for at the main Turbot Guardrails screen.
   Click on the bucket once it is found.
   ![](/images/docs/guardrails/search-bucket-step1.png)
   ![](/images/docs/guardrails/search-bucket-step2.png)
   ![](/images/docs/guardrails/search-bucket-step3.png)

2. Click the **Policies** tab. It shows both
   [Policy Settings](concepts/policies/values-settings#policy-settings) and
   [Policy Values](concepts/policies/values-settings#policy-values).
   ![](/images/docs/guardrails/settings-values.png)

3. From the list of Policy Values for this bucket, click on the **Template
   (Bucket > Tags > Template)** item to bring up the policy value.
   ![](/images/docs/guardrails/default-policy-value.png)

The Policy Value page shows the [Policy Hierarchy](concepts/policies/hierarchy)
on the left, and the current value in the box.

In the example above you can see that the policy value is `[]` (in other words,
a blank array), and that this value comes from the default.

## Create a new Policy Setting

1. In the VALUE box, click the **CREATE SETTING** link to bring up the **Create
   Policy Setting** page.
2. Note that the **Policy Type** field has already been set to
   `AWS > S3 > Bucket > Tags > Template` and the **Resource** is set to your
   bucket.
3. In the **Setting** field, enter some tags and values:

```yaml
Department: "Sales"
Company: "Vandelay Industries"
Cost Center: "314159"
```

![](/images/docs/guardrails/tags-template.png) 4. Click **Create** to create the
setting. Note that the Policy setting is updated to show that the new setting on
the bucket is now the active setting, and the value is updated with the value
for the setting. To see the updated value, go to **Values** tab and click on the
policy value record displayed. ![](/images/docs/guardrails/values-record.png)
![](/images/docs/guardrails/values-detail.png)

## Browse the Hierarchy

You can create or edit policy values anywhere at or above the resource in the
policy hierarchy. In the previous example, we created a setting on the bucket,
thus it applies only to that bucket. You could instead create a policy setting
on a folder, account, or region that would apply to ALL the buckets in that
folder, account, or region.

1. By default, items in the hierarchy that do not affect the value are hidden.
   ![](/images/docs/guardrails/policy-hierarchy.png)
2. Note that you can _View_ and _Edit_ or create a _Setting_ anywhere above the
   bucket in the hierarchy.

## Set Precedence, note and expiration

By default, the policy setting page will create an unannotated, non-expiring,
required setting. You can change these options when creating or editing a policy
setting.

1. Click **EDIT** in the policy setting that you created earlier.
2. Add a note in the **Notes** field
3. Add expiration to `24 hours` to make this policy setting expire.
   ![](/images/docs/guardrails/policy-note-expiration.png)
4. Click **Update**
5. Note that the policy setting now shows the expiration and annotation.
   ![](/images/docs/guardrails/detail-note-expire.png)

## Create a Policy Setting to Enforce Tags

The `AWS > S3 > Bucket > Tags > Template` that you set previously defines the
set of tags that should exist, but to enforce tagging, you must also set the
`AWS > S3 > Bucket > Tags` policy.

1. From the **Policies** tab, click the **New Policy Setting** button marked in
   green.
2. Search and select `AWS > S3 > Bucket > Tags` as **Policy Type**.
3. If you were already filtered on your test bucket, it will be automatically
   selected as the **Resource**. If not, select it. You may search by name, or
   **Browse** for it.
4. In the **Setting** field, select `Enforce: Set Tags`
   ![](/images/docs/guardrails/enforce-tag.png)
5. Click **Create**. A new policy setting will be created. Within a few seconds,
   the **Tags** control will run and set the tags from your tags template to
   your S3 bucket.

## Further Reading

- [Policy Concepts](concepts/policies)
- [Policy Hierarchy](concepts/policies/hierarchy)
- [Managing Policies](guides/managing-policies)
- [7-Minute Labs: Calculated Policies](7-minute-labs/calc-policy)
