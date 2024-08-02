---
title: Mod Auto Update
sidebar_label: Mod Auto Update
---

# Setting up Mod Auto Update

In this runbook, you will:

- Use Guardrails console for setting up Turbot > Mod > Auto Update

**Turbot > Mod > Auto Update**  policy provides, if the mod should be automatically updated from the Turbot registry. The current version is checked against the `Turbot > Mod > Desired Version policy`, which is calculated from the `Turbot > Mod > Version Range policy`.

`Check` will `alarm` if the version is out of date, while `Enforce` will attempt to automatically update the mod.

## Prerequisites

- Turbot/Admin permissions at Turbot resource level.
- Familiarity with Guardrails Console, Terraform, and Guardrails CLI

## Step 1: Access the Guardrails Console & Auto Update Policy

Browse the Guardrails console e.g.https://abc-turbot.cloud.turbot-dev.com/apollo and log in with your required authentication credentials.

Navigate to the Policies tab in the dashboard and search `Turbot > Mod > Auto Update`

![Locating Policy](/images/docs/guardrails/runbooks/configuring-guardrails/auto-mod-update/guardrails-policy-search.png)

**Note**: The policy is applied at the Turbot level.

## Step 2: Setting up Policy

Once you select the displayed policy from above step, it renders the set of sub-policies along with the option to create a `New Policy Setting`

![Setting up Policy](/images/docs/guardrails/runbooks/configuring-guardrails/auto-mod-update/guardrails-create-new-policy-settings.png)

It provides below settings

![Policy Options](/images/docs/guardrails/runbooks/configuring-guardrails/auto-mod-update/guardrails-create-autoupdate-options.png)

**Note:**
- In the above image the `Resource` is selected as `Turbot` and the `Setting` is selected as `Enforce`. This indicates that all mods in Guardrails are enforced to auto-updates.
- In case you want to take exception for any specific mod, that you desire not to auto-update, [Creating an Exception](https://turbot.com/guardrails/docs/guides/managing-policies#creating-an-exception)

## Step 3: Understanding Auto Update Policy Options

Policy value with

- `Check` will alarm if the version is out of date.
- `Enforce` will attempt to automatically update the mod as soon as a new version of the mod is available.
- `Enforce within Mod Change Window` will schedule mod updates based on the specified UTC format time.

## Step 4: Setting up Sub-policies

The main policy evaluation process checks against the `Turbot > Mod > Desired Version policy`, which is calculated from the `Turbot > Mod > Version Range policy`.

![Setting up Sub-policies](/images/docs/guardrails/runbooks/configuring-guardrails/auto-mod-update/guardrails-create-autoupdate-policies.png)

**Turbot > Mod > Auto Update > Desired Version:** The desired version of the mod, is usually calculated by matching Turbot > Mod > Auto Update > Version Range against mod versions currently available in the Turbot Registry.
  - The desired version is then used by Turbot > Mod > Auto Update to determine if an update is available, and the target version to use.


**Turbot > Mod > Auto Update > Version Range:** Specify the allowed range of versions for this mod. This version range is used to calculate Turbot > Mod > Desired Version, so the mod can be automatically updated per Turbot > Mod > Auto Update parent policy.

  - The default value is set to `^{{MAJOR}`: The latest version in the same major release that is installed

**Turbot > Mod > Auto Update > Schedule:** The period when Turbot is permitted to apply changes to Mod using Mod's Auto Update control. This is only used when `Turbot > Mod > Auto Update` parent policy is set to `Enforce within Mod Change Window`

  - Turbot assumes UTC format.
  - The format of this policy is a list of yaml object, each with a name, description, start time, and duration (in hours). For example:

    ```
    - name: Weekly
    description: 'Weekly, Sundays 2am-8am'
    cron: '0 02 * * SUN'
    duration: 6
    ```

## Step 6: Review

You have successfully updated the `Mod Auto Update` policy. To validate the policy settings,

- [ ] Follow the `Step 1` and select **Settings** tab to validate the setting(s) applied

![Policy Review](/images/docs/guardrails/runbooks/configuring-guardrails/auto-mod-update/guardrails-autoupdate-policy-settings-review.png)

Here you can see the

- `Auto Update` is set to `Enforce` at `Turbot` level
- `Auto Update > Schedule` is set to Weekly Sunday 02 AM
- Rest of the `Auto Update` are policy exceptions for specific Mods

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn about [Managing Policies](https://turbot.com/guardrails/docs/guides/managing-policies#managing-policies).
- Learn more about [TE architecture](https://turbot.com/guardrails/docs/enterprise/architecture).

