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