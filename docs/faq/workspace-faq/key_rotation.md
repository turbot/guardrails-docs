---
title: "Configuring Event Handler Key Rotation"
sidebar_label: "Key Rotation"
---

# Configuring Key Rotation for AWS Event Handlers
As a part of deploying Event Handlers on AWS, Azure or GCP, Guardrails automatically generates a [JSON Web Token (JWT)](https://jwt.io) with a security token embedded in it.  On a periodic basis, this token ought to be rotated.  This document describes the policies, best practices and troubleshooting procedures for rotating the JWT.

## Workspace Configuration Policies
These are the __Turbot > Workspace__ policies relevant to event handling for SaaS and Enterprise customers. Ideally, they are configured before enabling event handling for the first time but can be changed at any time.
- [Turbot > Workspace > Webhook Secrets > Rotation](mods/turbot/turbot/policy#turbot--workspace--webhook-secrets--rotation) - Instructs Guardrails to regularly rotate the secrets used to sign the JWTs.  Defaults to 'Skip'.
- [Turbot > Workspace > Webhook Secrets > Expiration Period](mods/turbot/turbot/policy#turbot--workspace--webhook-secrets--expiration-period) - Specifies the interval for secret rotation. Default value is 'Never'.
- [Turbot > Workspace > Webhook Secrets](mods/turbot/turbot/policy#turbot--workspace--webhook-secrets) - Use this policy only when there is a requirement for specific secrets to be used. Otherwise, the default setting will auto-generate new secrets as required.
- [AWS > Account > Regions](https://hub.guardrails.turbot.com/mods/aws/mods/aws/policy#aws--account--regions) - Specifies the list of regions that Guardrails will monitor. By default, Guardrails monitors all regions that do not require an opt-in. If there are regional restrictions through SCPs, then the regions list should not exceed those permitted by the SCP.
- [Turbot > Workspace > Gateway Domain Name](mods/turbot/turbot/policy#turbot--workspace--gateway-domain-name) - Enterprise Only: Specifies the API gateway address to use for the Event Handlers.

## Initial Setup Process
This process assumes that Event Handlers have already been enabled and deployed. If not, follow these configuration steps then enable Event Handling.
1. Decide how often the JWT will rotate for the Event Handlers. It can be as often as 1 month or as long as 5 years.
2. Set __Webhook Secrets > Expiration Period__ to a value that meets your organizational needs.
3. Only if specific secrets are required, set __Webhook Secrets__. Otherwise, Guardrails will automatically generate new secrets. Setting specific secrets is an uncommon requirement.
4. Set __Webhook Secrets > Rotation__ to __Enforce: Rotate webhook secret__.  This will kick off rotation of the JWT for all the event handlers in this workspace.

## Forcing a Key Rotation
In cases where a key has been compromised or a very old key needs to be refreshed, follow these steps to kick off a refresh.

### Preflight Checks
1. Examine all the event handler controls for all platforms in this workspace. 
2. Verify that all event handler controls are in an `ok` state.
3. For AWS: Set the control type filter to __AWS > SNS > Subscription > Configured__. Verify that all Subscription `Configured`  controls for the `turbot_aws_api_handler` topics are in an `ok` state.
4. For Azure: Check that the __Azure > Monitor > Action Group > Configured__ controls are in `ok` for each `turbot_azure_event_handler_action_group` action group in each `turbot_rg` resource group.
5. For GCP: Check that the __GCP > Turbot > Event Handlers > Pub/Sub__ controls are all in `ok`.
6. Resolve any controls in `error`.

### Rotation and Verification
NOTE: In large environments, this can cause significant load on Guardrails.  Schedule this change for off-hours.
1. Set __Webhook Secrets > Rotation__ to  __Enforce: Rotate webhook secret__ if not already set. 
2. Set __Webhook Secrets > Expiration Period__ to __1 month__.  This will cause an immediate recalculation of the __Webhook Secrets__ policy.
   1. If __Expiration Period__ is already set to __1 month__, set to __2 months__ then back to __1 month__.  When you see the activity described in the next step, rotation was successful.
3. Look at the Activity page of the __Webhook Secrets__ policy setting.  You should see the following activity:  
   1. A `Control Updated` notification for the __Turbot > Webhook Secrets Rotation__ control from `ok` to `alarm`.
   2. A `Notify` saying "Rotated Webhook secrets"
   3. A `Policy Setting Updated` notification for __Webhook Secrets__
   4. A `Control Updated` notification for the __Turbot > Webhook Secrets Rotation__ control from `alarm` to `ok`.
4. Go to the __Controls by Control Type__ report in the top Reports tab.
   1. Filter for the Event Handlers for each platform used in this workspace.
   2. Verify that all Event Handler controls are in `ok`.  If there are controls in an `error` state, resolve them immediately.
5. Extended verification that the webhook secret was updated.  Each of the control types listed below are responsible for the cloud resource that holds the JWT. If these controls are in an `error` state, then the webhook hasn't rotated for some reason.  
   1. For AWS: Set the control type filter to __AWS > SNS > Subscription > Configured__. Verify that all Subscription `Configured`  controls for the `turbot_aws_api_handler` topics are in an `ok` state. 
   2. For Azure: Check that the __Azure > Monitor > Action Group > Configured__ controls are in `ok` for each `turbot_azure_event_handler_action_group` action group in each `turbot_rg` resource group.  
   3. For GCP: Check that the __GCP > Turbot > Event Handlers > Pub/Sub__ controls are all in `ok`.
6. Set __Webhook Secrets > Expiration Period__ back to whatever the normal rotation period is.
7. Go to the `Activity Ledger` report. Filter for the `resource` notification type.  In sufficiently busy environments, there should be some activity after the JWT was rotated.   If there is no activity, then generate some in a testing account.

## Troubleshooting
In case event handling has stopped because of a key rotation, try the following steps:
- Was event handling working before the key rotation?
- Are the event handling policies set to __Enforce: Configured__?  Are there any exceptions where event handling is set to __Skip__ or __Enforce: Not configured__?
- Are all the event handlers in an `ok` state?  If not, grab the logs for an Event Handler control that is in `error`.
- Are all the controls listed in the extended verification step above in an `ok` state?
- Have Webhook Secrets been specified?
- Were any other Event Handler policies changed at the same time?
- Is there any environmental change visible in the Guardrails console after the key rotation?
- Are events missing for all cloud accounts in the workspace, or a specific account/sub/project?
- If AWS, is Cloudtrail present and functional in all accounts?

If Webhook Secrets has been set and event handling isn't working, do the following:
1. Delete the Webhook Secrets policy setting. 
2. Follow the [rotation and verification](#rotation-and-verification) steps described above.

If event handling is still not working, gather the above troubleshooting information, then send it to [help@turbot.com](mailto:help@turbot.com) for additional assistance.

## Best Practices
- Rotating the Webhook Secret should be done at least once per year.
- Unless there is a very good reason, stay with the default behavior where Guardrails generates new secrets. This avoids the chances of a silent and accidental event handling outage.
- Be sure to set two Webhook secrets with overlapping expiration periods.
  - Setting a single key may cause Event handling to silently stop working when the secret expires.
  - Setting two keys without overlapping active periods may cause a silent break in event handling too.