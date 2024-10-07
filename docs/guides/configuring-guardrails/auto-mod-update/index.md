---
title: Auto Mod Update
sidebar_label: Auto Mod Update
---

# Automated Mod Updates

In this guide, you will:
- Setup automated mod update from the Turbot registry.

## Prerequisites

- **Turbot/Owner** permissions at the Turbot resource level.
- Familiarity with Guardrails console.

## Step 1: Login to Guardrails Console

Log into the Guardrails console with provided local credentials or by using any SAML based login.

![Guardrails Console Login](/images/docs/guardrails/guides/configuring-guardrails/auto-mod-update/guardrails-console-login.png)

## Step 2: Find Policy

Navigate to **Policies** tab, search for `Auto Update` text.

![Find Auto Update Policy](/images/docs/guardrails/guides/configuring-guardrails/auto-mod-update/guardrails-console-policies-auto-update.png)

On selecting the `Turbot > Mod > Auto Update`, it shows sub-policies along with the main policy.

![Set of Sub-Policies](/images/docs/guardrails/guides/configuring-guardrails/auto-mod-update/guardrails-console-policies-auto-update-sub-policies.png)


| Settings                      | Description                                                                                   |
|---------------------------------------------|-----------------------------------------------------------------------------------------------|
| Desired Version                         | The desired version of the mod, is usually calculated by matching Turbot > Mod > Auto Update > Version Range against mod versions currently available in the Turbot Registry. The desired version is then used by Turbot > Mod > Auto Update to determine if an update is available, and the target version to use.|
| Version Range                       | Specify the allowed range of versions for this mod. This version range is used to calculate Turbot > Mod > Desired Version, so the mod can be automatically updated per Turbot > Mod > Auto Update parent policy. The default value is set to `^{{MAJOR}`: The latest version in the same major release that is installed|
| Schedule | The period when Turbot is permitted to apply changes to Mod using Mod's Auto Update control. This is only used when Turbot > Mod > Auto Update parent policy is set to Enforce within Mod Change Window. See detailed information [here](https://hub.guardrails.turbot.com/mods/turbot/policies/turbot/modChangeWindowSchedule)                           |

> [!IMPORTANT]
> The policy evaluation process checks against the `Turbot > Mod > Desired Version` policy, which is calculated from the `Turbot > Mod > Version Range` policy. If not set, it picks up the latest recommended version.

## Step 3: Create Policy Setting

Select **New Policy Setting**, which brings up `Create Policy Setting`.

![Create New Policy](/images/docs/guardrails/guides/configuring-guardrails/auto-mod-update/guardrails-console-policies-auto-update-create-new-policy.png)

Assign the policy values, with `Resource` selected as `Turbot`.

> [!NOTE]
> The policy is applied at the `Turbot` resource level.

![Assign Policy Values](/images/docs/guardrails/guides/configuring-guardrails/auto-mod-update/guardrails-console-policies-auto-update-assign-policy-values.png)


| Settings                      | Description                                                                                   |
|-------------------------------|-----------------------------------------------------------------------------------------------|
| Check                         | Will alarm if the version is out of date.                                                     |
| Enforce                       | Will attempt to automatically update the mod as soon as a new version of the mod is available.|
| Enforce within Mod Change Window | Will schedule mod updates based on the specified UTC format time.                             |


## Step 4: Setting up Schedule

Select `Turbot > Mod > Auto Update` **Schedule** policy.

![Select Schedule Policy](/images/docs/guardrails/guides/configuring-guardrails/auto-mod-update/guardrails-console-policies-auto-update-select-schedule-policy.png)

Create new policy by selecting **New Policy Setting**.

![Create Schedule Policy](/images/docs/guardrails/guides/configuring-guardrails/auto-mod-update/guardrails-console-policies-auto-update-select-schedule-create-policy.png)

Set the desired schedule for the `Turbot > Mod > Auto Update` to check and execute the mod update to the recommended version.

![Schedule Policy Value](/images/docs/guardrails/guides/configuring-guardrails/auto-mod-update/guardrails-console-policies-auto-update-select-schedule-policy-value.png)

> [!Note]
> Turbot assumes UTC.
> The format of this policy is a list of yaml object, each with a name, description, a start time, and duration (in hours).

## Step 5: Review

- [ ] Check if the above policies are reflected.

![Check Settings](/images/docs/guardrails/guides/configuring-guardrails/auto-mod-update/guardrails-console-policies-auto-update-settings-check.png)


## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn about [Policy Exception](/guides/configuring-guardrails/managing-policies#creating-an-exception)
- Learn about [Updating Mod](/guardrails/docs/guides/configuring-guardrails/update-mod)

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |