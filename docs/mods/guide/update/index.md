---
title: Updating Mods
sidebar_label: Updating Mods
---

# Updating Mods

Guardrails Mods are designed with the ability to be upgraded in place. This can be done via the Guardrails UI or using Terraform.

## Guardrails UI

1. Navigate to the **Admin** page by clicking the gear icon in the top right after logging in.
2. Use the text box to search for the mod that will be upgraded. 
3. Once found, either click the **pencil icon** to the right of the mod name, or select the mod name to bring up the mod page.
4. If the pencil icon was clicked, a new window will pop up and load all of the available mod versions. Select the desired version, then click **Update Mod**. If looking at the mod page, click the **Update** button in the top right to bring up the available versions, select the desired version, then click **Update Mod**.
5. Thats it! Once the mod is updated, the version will change in real time. Alternatively, the icon just to the left of the mod name can be selected. This will take you to the `Turbot > Mod > Installed` control managing the mod install. Any errors that arise during the install will be displayed here. This is often very quick, but can sometimes last a minute or so.

## Terraform

Assuming the mod already exists in the state file, simply update the defined mod version in the configuration file. `Terraform apply` will automatically update the mod!

## Auto Mod Update

Managing a few mods is easy. Managing a lot is hard. Say hello to Guardrails Mod auto update!

Each mod has an associated `Turbot > Mod > Auto Update` control that checks the current mod version against the Guardrails recommended version. This is the preferred way to manage mod updates - it requires no intervention from administrators.

Auto update is on by default. However, this can be toggled off. Note that in doing so, all future mod updates must be manually triggered. Turning off the auto mod update feature can be good for troubleshooting, but be sure to flip the auto mod update policy back to `Enforce` when troubleshooting is over.

* To turn off the auto update feature on a specific mod, navigate to the specific mod's page, then select the `Turbot > Mod > Auto Update` control. Click on the Policies tab while viewing the control, select the `Auto Update` option (should be auto selected), then click the **Setting** option on the right. Click **Edit** in the top right, set the Setting to skip, then click **Update**.

* To turn off the auto mod update feature on the entire workspace, and thus every mod currently installed, simply set the `Turbot > Mod > Auto Update` policy to either check or skip at the root, Turbot level.

**NOTE**: VERY IMPORTANT! Remember to turn Auto Update back on once finished! Failure to turn auto update on can result in mods getting significantly behind in versions and can result in difficulties down the road.

### Using `Turbot > Mod > Auto Update > Schedule` to Define Mod Update Schedules

**NOTE**: This policy can be set at the Turbot level to apply to every mod in the workspace, or applied to a specific mod, such as `@turbot/aws`.

## To create a mod update schedule for all mods installed

1. Navigate to the **Policies** tab and click the green **New Policy Setting** button.
2. In the **Policy Type** drop down menu, type the following: `mod schedule`. Select the `Turbot > Mod > Auto Update > Schedule` option.
3. Click the **Resource** drop down menu and select `Turbot`.
4. The right side of your screen will have some formatting examples. In our example, we want to have mods update only on Saturday, between 9 AM and 10 PM Eastern:

```yaml
- name: Weekly
  description: 'Weekly, Saturdays 9am-10pm'
  cron: '0 09 * * SAT'
  duration: 13
```

    Add this to the settings text box.

5. Click create. Mods will now automatically update (assuming there is one to update to) on Saturdays, between 9 AM and 10 PM Eastern.

## To create a mod update schedule for one mod

1. Navigate to the **Policies** tab and click the green **New Policy Setting** button.
2. In the **Policy Type** drop down menu, type the following: `mod schedule`. Select the `Turbot > Mod > Auto Update > Schedule` option.
3. Click the **Resource** drop down menu. Type the mod name that you'd like to set the auto update schedule on. For example, `@turbot/aws-ec2`. Click the checkbox next to the mod name.
4. The right side of your screen will have some formatting examples. In our example, we want to have mods update only on Saturday, between 9 AM and 10 PM Eastern:

```yaml
- name: Weekly
  description: 'Weekly, Saturdays 9am-10pm'
  cron: '0 09 * * SAT'
  duration: 13
```

    Add this to the settings text box.

5. Click create. The aws-ec2 mod will now automatically update (assuming there is one to update to) on Saturdays, between 9 AM and 10 PM Eastern.

Find more info on cron and even create test cron expressions at [crontab.guru](https://crontab.guru/).
