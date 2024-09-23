---
title: Change Window
sidebar_label: Change Window
---

# Guardrails Change Window

## Overview
Guardrails change window policies allows admins to define when enforcement actions can take place. These are commonly designated during off hour times.


## Change Window Policies

* `Turbot > Change Window`: Determines which (if any) changes are allowed outside of the change window. By default, all changes are allowed.

    If this policy is not set to `All Changes`, then Guardrails will not automatically run any actions that would alter a resource. Instead, it will queue them to run during the next change windows.

    If set to allow `Forced Changes Only`, actions will not run automatically, however a user may choose to run a control manually.

* `Turbot > Change Window > Schedule`: The period of time when Guardrails is permitted to apply changes to resources. This policy allows you to define recurring schedules and durations in which changes are allowed to occur. During change windows, all changes are allowed, and any queued actions will run.

    Guardrails assumes UTC.

    The format of this policy is a list of yaml object, each with a name, description, a start time, and duration (in hours).

When both the policies are set to default, Guardrails will remediate resources generating an alarm - automatically.

`Turbot > Change Window` has the following possible settings:

| Value | Description |
|-|-|
|`No Changes` | Don't run enforcement actions.
|`Forced Changes Only` | Actions will not run automatically, however an user may choose to run a control manually.
|`Turbot Event Handlers Only` | Event handler stack control is allowed to run to set up, and modify the event handler components.
|`Turbot Event Handlers Only and Forced Changes Only` | Event handler stack control is allowed to run and users can run the controls manually.
|`All Changes` | Run any enforcement actions.

**Note**: Currently `Mod Auto Update` has no restriction or dependency on Change Window policies.

`Turbot > Change Window > Schedule` accepts a list of yaml objects, each with a name, description, a start time, and duration (in hours). For example:

```yaml
# Daily window
- name: Daily
  description: 'Daily, 10pm - 2am'
  start: 'at 10:00pm'
  duration: 4
# Weekly on sunday
- name: Weekly
  description: 'Weekly, Sundays 2am-8am'
  start: 'every sunday at 10pm'
  duration: 6
```

## Set the Change Window Schedule

The Change Window policies can be set at any level in Guardrails. Let's assume we want to restrict all changes to between 12 AM and 5 AM UTC every day for the entire environment. Outside of these hours, only administrators can force resource changes.

1. Log into the console with a user that has `Turbot/Admin` permissions at the Turbot level.
2. Click the **Policies** tab at the top, then the green **Create Policy Setting** button.
3. Either navigate to the policy `Turbot > Change Window > Schedule` using the **Policy Type** drop down menu, or paste in this string: `Turbot > Change Window > Schedule`.
4. We want to restrict all changes to between 12 AM and 5 AM UTC every day. Copy paste the following YAML object into the policy setting field:

```yaml
- name: Daily
  description: 'Daily, 12am - 5am'
  start: 'at 12:00am'
  duration: 5
```

5. Click **Create**.

## Set Guardrails Action Limits

Once the Change Window Schedule policy is set, we can define what actions Guardrails (and admins) are allowed to take outside of the defined change window schedule.

1. Log into the console with a user that has `Turbot/Admin` permissions at the Turbot level.
2. Click the **Policies** tab at the top, then the green **Create Policy Setting** button.
3. Either navigate to the policy `Turbot > Change Window` using the **Policy Type** drop down menu, or paste in this string: `Turbot > Change Window`.
4. Select the `Forced Changes Only` option, then click **Create**.

**Note**: The change window will go into effect immediately.