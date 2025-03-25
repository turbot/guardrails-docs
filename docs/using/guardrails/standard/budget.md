---
title: Budget Guardrails
sidebar_label: Budget
---

# Budget Guardrails

## Overview

Budget guardrails provide a mechanism for tracking current spend against
a planned target, and taking appropriate actions to help control cost.

Current and forecast spend APIs are used to get information on the budget. This
is currently available for AWS only.

## Policy Types

Budget policies can be broadly classified into two categories:

- Account-level settings for the target and the current spend etc, as well as
  permission settings in lockdown policies to restrict access.
- Service/ Resource-level settings for taking action based on the budget state.
  These are defined in specific services and leverage existing controls such as
  `Active` and `Approved

### Policy Types Description

| Policy                                                              | Description                                                                                                                                              |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AWS > Account > Budget > Enabled`                                  | Determine whether budget reporting is enabled for the account or not.                                                                                    |
| `AWS > Account > Budget > Target`                                   | The budget target for the AWS Account in US Dollars.                                                                                                     |
| `AWS > Account > Budget > State`                                    | Calculates the current status of the set budget. The default policy setting is generally sufficient.                                                     |
| `AWS > Account > Permissions > Lockdown > Budget`                   | Configure lockdown policies to restrict APIs based on the budget state (when the current spend exceeds a defined threshold).                             |
| `AWS > Account > Permissions > Lockdown > Budget > Restricted APIs` | A list of APIs that is restricted when the budget reaches the defined state.                                                                             |
| `{provider} > {service} > {resource type} > Active > Budget`        | The policy allows you to force {resource type} to the inactive status based on the current budget state, as defined in `AWS > Account > Budget > State`. |
| `{provider} > {service} > {resource type} > Approved > Budget`      | The policy allows you to set {resource type} to Not approved based on the current budget state, as defined in `AWS > Account > Budget > State`.          |

### Policy Types Definition

#### Account Level Policies

- Account-level policies appear under `AWS > Account > Budget` in the type
  hierarchies, and are used to set and/ or view settings, values, and
  definitions that are shared by all services.
- The state of the budget is determined by the interaction of several account
  level policies:
  - The `Budget > Enabled` policy allows you to enable or disable budget
    checking. If set to `Skip` (the default), The budget control should not look
    up the budget data in the account.
- The `Budget > State` policy a calculated value by default. It reflects the
  current state of the actual and forecast spend, as compared to the budget
  target set. The resource-level budget policies will use this policy to
  determine the actions to minimize cost.
- The `Budget > Target` policy allows you to set the budget (allowed spend) for
  the account. The `Budget > State` will be set in relation to this amount.

#### Budget States

- Guardrails defines named budget states. The enforcement policies and controls will
  refer to these states and will use the current state to determine when to take
  action.
- The states are as follows:

| State       | Description                                                                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Shutdown`  | Budget is completely spent, or trending significantly over. No more money is available. All spending must cease, even if it results in degraded service. |
| `Critical`  | Budget is completely spent, or trending significantly over. Urgent action is needed to reduce spend.                                                     |
| `Over`      | Current or forecast spend exceeds the budget target.                                                                                                     |
| `On target` | Current and forecast spend are in line with the budget target. No action is required.                                                                    |
| `Under`     | Current and forecast spend are lower than projected.                                                                                                     |
| `Unused`    | Current and forecast spend is so low that it appears that the account may not be in-use.                                                                 |
| `Unknown`   | Current and forecast spend is unknown for the account.                                                                                                   |

**Note**:

- The default value for `AWS > Account > Budget > Target` is -1. If the policy
  value for the `AWS > Account > Budget > Enabled` policy is not Skip, and the
  `AWS > Account > Budget > Target` is < 0, the control should move to an
  `invalid` state, and informing the user to set the
  `AWS > Account > Budget > Target` policy to a positive integer value.

#### Account Level Preventive - Permissions

- Account level preventive policies can be set to enforce preventative controls
  via AWS lockdown policies.
- You can enable lockdowns via the
  `AWS > Account > Permissions > Lockdown > Budget` policy.
- You can specify which api actions will be locked via the
  `AWS > Account > Permissions > Lockdown > Budget > Restricted APIs` policy,
  which allows you to set a list of IAM actions that are prevented for each
  state. For example:

```yaml
critical:
  - ec2:RunInstance
  - ec2:StartInstance
  - rds:StartDB*
  - redshift:createcluster
```

#### Resource Level Policies

- The budget policies defined as part of the `Active` control is used to
  determine whether the resource is `active` or `inactive` based on the current
  budget state of the account.
- The budget policies defined as part of the `Approved` control is used to
  determine whether the resource is `approved` or `unapproved` based on the
  current budget state of the account.

The **Active > Budget** policy has a consistent form: {Provider} > {service} >
{resource} > Active > Budget

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Active > Budget</code></li>
    <li><code>AWS > RDS > DB Cluster > Active > Budget</code></li>
    <li><code>AWS > Redshift > Cluster > Active > Budget</code></li>
  </ul>
</div>

The values for this policy reflect when it should be `inactive`. The basic form
is:

```
    Skip
    Force inactive if Budget > State is Over or higher
    Force inactive if Budget > State is Critical or higher
    Force inactive if Budget > State is Shutdown
```

The **Approved > Budget** policy has a consistent form: {Provider} > {service} >
{resource} > Approved > Budget

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Instance > Approved > Budget</code></li>
    <li><code>AWS > RDS > DB Cluster > Approved > Budget</code></li>
    <li><code>AWS > Redshift > Cluster > Approved > Budget</code></li>
  </ul>
</div>

The values for this policy reflect when it should be `unapproved`. The basic
form is:

```
    Skip
    Unapproved if Budget > State is Over or higher
    Unapproved if Budget > State is Critical or higher
    Unapproved if Budget > State is Shutdown
```

### Example: AWS > Account > Budget > Enabled

First, assume that the monthly actual spent becomes $ 1001. The following
policies have been configured in Guardrails:

- **AWS > Account > Budget > Enabled** is set to
  `Check: Budget > State is on Target or below`.
- **AWS > Account > Budget > Targe** is set to `1000`.
- **AWS > Account > Budget > State** is calculated to `Over`.

In order, these policies will evaluate account spending is over the budget and
has entered the `Over` state. The policy evaluation of `Budget > Enabled`
results the control being in **ALARM** state.
