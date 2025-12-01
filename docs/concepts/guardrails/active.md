---
title: Active Guardrails
sidebar_label: Active
---

# Active Guardrails

## Overview

The Active guardrail flags whether the resource is in active use, and if not,
has the ability to delete/cleanup the resource. When running an automated
compliance environment, it's common to end up with a wide range of alarms that
are difficult and time consuming to clear. The Active guardrail brings
automated, well-defined control to this process.

The Active guardrail is completely independent of the Approved guardrail. For
example, an Approved resource may actually be Inactive - e.g. an S3 bucket
created 2 years ago with no items and no usage. Similarly, an Unapproved
resource may be Active - e.g. an S3 bucket in an unapproved region that is still
receiving active traffic.

In general, Approved is considered more at the point of resource creation while
Active is considered more as the resource reaches the end of it's useful life.

The Active guardrail checks the status of the defined Active policies for the
resource, raises an alarm, and takes the defined enforcement action. Each Active
sub-policy can calculate a status of active, inactive or skipped. Generally, if
the resource appears to be Active for any reason it will be considered Active.
Note the contrast with Approved, where if the resource appears to be Unapproved
for any reason it will be considered Unapproved.

The core Active policy has a consistent form: `{service} > {resource} > Active`

<div className="example">
  <ul>
    <li><code>AWS > S3 > Bucket > Active</code></li>
    <li><code>AWS > SNS > Topic > Active</code></li>
    <li><code>AWS > EC2 > Instance > Active</code></li>
  </ul>
</div>

The values for this policy reflect how it should be checked and the action to
take if the resource is not active. The basic form is:

```
  Skip
  Check: Active
  Enforce: {action} inactive with {period} warning
```

<div className="example">
<pre>
    # AWS > S3 > Bucket Active
      - Skip
      - Check: Active
      - Enforce: Delete with 1 day warning
      - Enforce: Delete with 3 days warning
      - Enforce: Delete with 7 days warning
      - Enforce: Delete with 14 days warning
      - Enforce: Delete with 30 days warning
      - Enforce: Delete with 60 days warning
      - Enforce: Delete with 90 days warning
      - Enforce: Delete with 180 days warning
      - Enforce: Delete with 365 days warning
</pre>
</div>

The alarm lifecycle is as follows:

- If Active, the status is OK.
- If Inactive, the status is ALARM and the warning period starts.
- If Inactive and the warning period has expired, the enforcement action is
  taken.
- The enforcement action is typically a delete, which will then automatically
  cleanup the alarm. If it fails, the alarm will remain in ALARM or ERROR state.

The Active guardrail and policy have a number of sub-settings to determine the
attributes of the Active check. The format of these policy types is
`{service} > {resource} > Active > {Items}`:

```
    {service} > {resource} > Active > Status
    {service} > {resource} > Active > Last Modified
    {service} > {resource} > Active > Recently Used
    {service} > {resource} > Active > Age
```

Each of these policies defines rules or settings to determine if that specific
area or attribute of the resource is Active. Per above, if **any** Active
sub-check returns active then the overall resource is active.

<div className="example">
  <ul>
    <li><code>AWS > IAM > Access Key > Active > Age</code></li>
    <li><code>AWS > IAM > Access Key > Active > Status</code></li>
    <li><code>AWS > IAM > Access Key > Active > Last Modified</code></li>
    <li><code>AWS > IAM > Access Key > Active > Recently Used</code></li>
  </ul>
</div>

## Guardrails Resource Active Evaluation

For an Active control, the status is based on the evaluation of the child policy
conditions. This happens in the following order:

1. If any of the **Active > \*** policies evaluate to `Force Active`, the
   resource is `Active`.
2. If any of the **Active > \*** policies evaluate to `Force Inactive`, the
   resource is `Inactive`.
3. If any of the **Active > \*** policies evaluate to `Active`, the resource is
   `Active`.
4. If any of the **Active > \*** policies evaluate to `Inactive`, the resource
   is `Inactive`.
5. If all **Active > \*** policies evaluates to `Skip`, the control will be in
   `Skipped`.

For example, if one policy evaluates to `Inactive`, but another evaluates to
`Force Active`, the resulting control will deem the resource `Active`.

Active controls are designed to be slow to decide, but forceful in action. This
is in contrast to the `Approved` family of policies, guardrails, and controls,
which are designed to be fast to decide, but weak in action.

### Example: AWS > EC2 > Instance > Active

First, assume that the instance is 60 days old, but it was last modified only 15
days ago (i.e. tags on the instance were changed). The following policies have
been configured in Guardrails:

- **AWS > EC2 > Instance > Active > Age** is set to
  `Force inactive if age > 60 days`.
- **AWS > EC2 > Instance > Active > Last Modified** is set to
  `Active if last modified <= 30 days`.
- **AWS > EC2 > Instance > Active > Budget** is set to
  `Force inactive if Budget > State is Over or higher`.
- **AWS > Account > Budget > State** is set to `Under`.
- **AWS > EC2 > Instance > Active** is set to `Check: Active`.

In order, these policies will evaluate to `Active` (age is equal to 60 days),
`Active` (modified within the last 30 days) and `Active` (As Account spending is
below the budget and the current state is under). Using the rules above, the
final result is that the instance is `Active`. The last policy in the list tells
the `AWS > EC2 > Instance > Active` control how to evaluate the result. In this
case, the control is simply checking the instance for being active or not. The
policy evaluation of `Active` results in the control being in the **OK** state.

### Example: AWS > EC2 > Volume > Active

First, assume that the volume is 170 days old, but it was last modified 58 days
ago (i.e. tags on the volume were changed). The volume is available and not
attached to any instance. The following policies have been configured in Guardrails:

- **AWS > EC2 > Volume > Active > Age** is set to
  `Force inactive if age > 180 days`.
- **AWS > EC2 > Volume > Active > Last Modified** is set to
  `Active if last modified <= 60 days`.
- **AWS > EC2 > Volume > Active > Attached** is set to
  `Force inactive if unattached`.
- **AWS > EC2 > Volume > Active > Budget** is set to `Skip`.
- **AWS > EC2 > Volume > Active** is set to
  `Enforce: Detach, snapshot and delete inactive with 7 days warning`.

In order, these policies will evaluate to `Active` (age is less than 180 days) ,
`Active` (modified within the last 60 days) and `Force inactive` as the volume
is not attached. Using the rules above, the final result is that the volume is
`Force inactive`. The last policy in the list tells the
`AWS > EC2 > Volume > Active` control how to evaluate the result. The policy
evaluation of `Force inactive` results in the control being in the **ALARM**
state. In this case, the control is going to take action and will schedule
volume deletion in 7 days from the date of alarm. A snapshot will get created
prior to deleting the volume.
