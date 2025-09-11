---
title: "Workspace FAQ"
sidebar_label: "Workspace FAQ"
---

# Workspace FAQs

---

* [Can I rotate the keys embedded in Guardrails' event handlers?](#can-i-rotate-the-keys-embedded-in-guardrails-event-handlers)
* [The Guardrails console session expires at 12 hours. Can it be shorter?](#the-guardrails-console-session-expires-at-12-hours-can-it-be-shorter)
* [When do Guardrails API keys expire?](#when-do-guardrails-api-keys-expire)
* [Is it possible to get an event stream out of Guardrails?](#is-it-possible-to-get-an-event-stream-out-of-guardrails)
* [Can I make mods available for only part of the workspace?](#can-i-make-mods-available-for-only-part-of-the-workspace)
* [When are policy values created in Guardrails?](#when-are-policy-values-created-in-guardrails)
* [Why don't I see policy values for all my resources?](#why-dont-i-see-policy-values-for-all-my-resources)
* [When are control instances created for my resources?](#when-are-control-instances-created-for-my-resources)
* [How can I view all installed control types and policy types?](#how-can-i-view-all-installed-control-types-and-policy-types)
* [What's the difference between a policy having no value vs. being set to 'Skip'?](#whats-the-difference-between-a-policy-having-no-value-vs-being-set-to-skip)

---

## Can I rotate the keys embedded in Guardrails' event handlers?

Sure!  Regular key rotation is a part of any strong security stance. Configuration and troubleshooting instructions can be found on the [key rotation](workspace-faq/key_rotation) page.

## The Guardrails console session expires at 12 hours.  Can it be shorter?

The Guardrails console session timeout period can be adjusted with the [Turbot > Workspace > Console Session Timeout](mods/turbot/turbot-iam/policy#turbot--workspace--console-session-timeout) to as little as 15 minutes.  Keep in mind that this is a global change that affects all users in the Guardrails console. Guardrails API keys are not affected by this change.

## When do Guardrails API keys expire?

By default, Guardrails API keys do not expire.  Guardrails admins can set the [Turbot > IAM > Access Key > Expiration](mods/turbot/turbot-iam/policy#turbot--iam--access-key--expiration) policy to deactivate or delete Guardrails API keys to a range of expiration periods ranging up to 90 days. Ensure that Guardrails console access can be recovered if access keys expire for any break-glass users.  A calculated policy could be written for the `Turbot > IAM > Access Key > Expiration` policy to identify and preserve the API keys for break-glass users but deactivate/destroy keys for other users.

Note that this policy does not affect AWS IAM Access Keys.

## Is it possible to get an event stream out of Guardrails?

The Guardrails Firehose provides a user configurable event stream of cloud environment change, Guardrails control state, and Guardrails permission assignments.  Full details on how to configure the Firehose can be found in the [Firehose guide](guides/firehose).

## Can I make mods available for only part of the workspace?

Installing a Guardrails mod makes the resource types, controls and policies available to the entire workspace.

## When are policy values created in Guardrails?

Policy value creation depends on the type of policy:

**Configuration and account-level policies**: These policy values are created automatically when resources are discovered, using default values from the installed mods. These include settings like regions, budgets, and account notification CC configurations.

**Control-specific policies**: These policy values are only created when you set a policy setting somewhere in the resource hierarchy. These are typically policies that drive specific controls like `AWS > S3 > Bucket > Approved` or `AWS > EC2 > Instance > Active`.

For example, if you set the `AWS > S3 > Bucket > Approved` policy at the AWS account level, Guardrails will create policy values for this policy type and all of its sub-policies, like `AWS > S3 > Bucket > Approved > Regions` for all S3 buckets in that account. Without a policy setting somewhere in the hierarchy, no policy value exists for control-specific policy types.

## Why don't I see policy values for all my resources?

There are two main reasons you might not see certain policy values:

**For control-specific policies**: If you don't see a policy value for policies that drive specific controls (like `AWS > S3 > Bucket > Approved`), it means no policy setting has been created anywhere in the resource hierarchy for that policy type. This is by design - Guardrails only creates these policy values when policy settings exist.

**For configuration policies**: These should appear automatically with default values. If they're missing, it may indicate the relevant mod isn't installed or the resource discovery hasn't completed.

## When are control instances created for my resources?

Control instances are only created when policy settings exist for the primary policy that drives that control.

For example, the `AWS > S3 > Bucket > Approved` control will only appear on your S3 buckets when you have policy settings for the `AWS > S3 > Bucket > Approved` policy type.

This means different resources may show different sets of controls based on which policies have been configured in their hierarchy. Configuration and account-level controls may appear automatically with their related policy values.

## How can I view all installed control types and policy types?

There are several ways to explore what control types and policy types are available in your Guardrails workspace:

**For a specific resource type:**
1. **Navigate to any resource** of the type you're interested in
2. **View available control types**: Go to the **Controls** tab and select **Self** from the level dropdown to see all control types that apply to this resource type
3. **View available policy types**: Go to the **Policies** tab and select **Self** from the level dropdown to see all policy types that apply to this resource type

**For browsing all control and policy types:**
1. **Navigate to the main Controls section** in Guardrails
2. **Use the Explore tab** to browse control types by hierarchy and search for specific control types
3. **Navigate to the main Policies section** in Guardrails  
4. **Use the Explore tab** to browse policy types by hierarchy and search for specific policy types

## What's the difference between a policy having no value vs. being set to 'Skip'?

This distinction is important for control-driving policies:

**No policy value (no policy setting exists)**:
- No policy setting has been created anywhere in the hierarchy for this control-driving policy
- No policy value exists for this policy type on the resource
- No control instance is created
- The policy type is essentially "inactive" for this resource

**Policy value set to "Skip" (policy setting exists)**:
- A policy setting exists and is explicitly set to "Skip"
- A policy value exists on the resource with the value "Skip"
- A control instance is created but is in the "Skipped" state
- The policy type is "active" but the control takes no action

**Note**: Configuration and account-level policies typically always have values (even if using defaults), so this distinction mainly applies to control-driving policies like "Approved", "Active", and "Versioning" policies.

Setting a control-driving policy to "Skip" is useful when you want the control to exist (for reporting, future changes, etc.) but don't want it to take any enforcement action.