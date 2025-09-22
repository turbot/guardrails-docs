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
* [Why don't I see all controls for my resources?](#why-dont-i-see-all-controls-for-my-resources)
* [Why do some policy types have no values?](#why-do-some-policy-types-have-no-values)

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

## Why don't I see all controls for my resources?

> [!NOTE]
> Control creation based on policy settings is only enabled if the `Turbot > Materialization` policy is set to `Automatic`. If the `Turbot > Materialization` policy is set to `Always` or your workspace doesn't have the `Turbot > Materialization` policy type installed, all controls will appear regardless of policy settings.

Most controls are only created when policy settings exist for the primary policy that drives that control.

For example, the `AWS > S3 > Bucket > Approved` control will only appear on your S3 buckets when you have a policy setting for the `AWS > S3 > Bucket > Approved` policy type. However, if you only create policy settings for its sub-policies, like `AWS > S3 > Bucket > Approved > Regions`, the control will **not** be created.

Controls used to discover resources and configure accounts, like `AWS > EC2 > Instance > Discovery` and `AWS > Turbot > Event Handlers`, are always created with their related policy values.

## Why do some policy types have no values?

> [!NOTE]
> Policy value creation based on policy settings is only enabled if the `Turbot > Materialization` policy is set to `Automatic`. If the `Turbot > Materialization` policy is set to `Always` or your workspace doesn't have the `Turbot > Materialization` policy type installed, all policy values will be created regardless of policy settings.

Most policy types only create policy values when you explicitly set a policy setting somewhere in the resource hierarchy. These are typically policies that drive specific controls like `AWS > S3 > Bucket > Approved` or `AWS > EC2 > Instance > Active`.

For example, if you create a policy setting for the `AWS > S3 > Bucket > Approved` policy type at the AWS account level, Guardrails will create policy values for this policy type and all of its sub-policies (like `AWS > S3 > Bucket > Approved > Regions`) for all S3 buckets in that account.

Some policy types, like those related to CMDB and event handler configuration, always have values created when resources are discovered.