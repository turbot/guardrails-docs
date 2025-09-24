---
title: Controls
sidebar_label: Controls
---

# Controls

A control is a Guardrails [resource](concepts/resources) that is tasked with enforcing one or more [policies](concepts/policies). Depending on what control objective is being monitored and/or enforced, controls can rely on either one or multiple policies to evaluate cloud resources for compliance.

Controls are where the magic happens with Guardrails. These "control" all policy enforcements, either generating alarms for administrative review or taking action against out-of-compliance cloud resources. Controls also monitor Guardrails to ensure that resources such as [Mods](https://hub.guardrails.turbot.com/#mods) are installed correctly.

Controls rely on resource state and policy settings to operate. Essentially:

```
Resource State + Policy Setting = Control State
```

As a concrete example: A cloud storage resource does not have encryption at rest configured. In Guardrails, the encryption at rest policy asserts that storage should be encrypted at rest. The encryption at rest control evaluates resource state against the policy then acts. In this case, the control will go into an `alarm` state. If the policy is set to check mode then the control will only go into `alarm`. If in enforce mode, the control will go into `alarm` and Guardrails will act to remediate the resource. When the remediation is successful, the control will rerun then go into `ok`.

## Control Creation

Control creation is controlled by the `Turbot > Materialization` policy, which supports two modes:

- **Always**: Controls are created for all resources regardless of whether policy settings exist. This provides comprehensive coverage but may impact performance in large environments.
- **Automatic**: Controls are only created when you explicitly set the primary policy in the resource hierarchy. For example, the `AWS > S3 > Bucket > Approved` control will only appear on your S3 buckets when you have a policy setting for the `AWS > S3 > Bucket > Approved` policy type. However, if you only create policy settings for its sub-policies, like `AWS > S3 > Bucket > Approved > Regions`, the control will **not** be created.

Note that some controls, such as those used to discover resources and configure accounts (like `AWS > EC2 > Instance > Discovery` and `AWS > Turbot > Event Handlers`), are always created regardless of the materialization mode.

## Control Types

A **Control Type** is a definition for a particular control. Each different control type is a blueprint that can be configured for resources, such the **Approved** control type for AWS S3 buckets. In this case, the control `AWS > S3 > Bucket > Approved` evaluates policy settings to determine what it means for an S3 bucket to be "Approved," and will take the action defined in the associated, identically named policy (`AWS > S3 > Bucket > Approved`).

Control types are useful for filtering control objectives. Using the above example, users can drill into the `AWS`, `S3`, `Bucket`, and then `Approved` to see all Approved controls for every bucket managed by Guardrails. This process can be repeated for any control or resource.

## Control Categories

Guardrails control types exist for different resources and cloud providers. **Control Categories** provide an alternative to control types, allowing a vendor agnostic categorization of control types.

For example, the control category `Resource > Encryption at Rest` includes many controls, such as `AWS > S3 > Bucket > Encryption at Rest`, `GCP > Compute > Disk > Encryption at Rest`, and `Azure > Storage > Storage Account > Encryption at Rest`.

Control categories are typically used for reporting as well as useful aggregation and filtering of data.

## Control Types and Categories - Visualized

![control_types_categories](/images/docs/guardrails/control_types_categories-ex.png)

## Control State

Controls are responsible for enforcing policy values. This introduces the concept of a **Control State**. After a control has completed running, it is assigned a state, which can depend on a variety of factors, such as the IAM permissions (i.e. can Guardrails describe the resource?), pending work (i.e. is a policy waiting to be calculated?), or simply that the evaluated policy tells the control to not do anything.

Controls have six different possible states:

1. **OK** - Generally, this is the desired state of any control in the environment. It implies that Guardrails and cloud resources are working and within the guidelines set by the organization via a policy set. An OK state is denoted by a green checkmark while on the controls tab.
2. **Alarm** - Controls in the alarm state are either waiting to be modified by Guardrails for compliance (this generally clears within a few seconds), or have a policy/ collection of policies configured such that Guardrails is only monitoring cloud resources rather than remediating. Controls in alarm should be investigated by administrators, as enforcement requires review.
3. **Error** - The error state signifies that the control cannot enforce the configured policy values on a specific resource, or that a specific resource is misconfigured. This can be for a variety of reasons, such as the Guardrails role in the target account does not have sufficient permissions to describe or modify a resource. Each error will need to be evaluated by an administrator. Often, the control itself will specify what issue occurred, be it a policy misconfiguration or permissions. If there are any questions or concerns regarding controls in error, contact [Guardrails Support](mailto:help@turbot.com).
4. **Invalid** - This control state means that Guardrails cannot configure, or possibly describe, a particular resource due to policy misconfigurations. For example, if an administrator has the policy `AWS > EC2 > Key Pair` set to `Check: Active`, but all dependent policies such as `AWS > EC2 > Key Pair > Active > Age` are set to skip, Guardrails does not have the required policy settings to accurately evaluate what `Active` means. In this case, the control `AWS > EC2 > Key Pair > Active` is invalid.
5. **Skipped** - A skipped state means that the resource in question is not evaluated by policies by choice. This can range from not enforcing or checking tags on resources to allowing users to build any security group in one or many cloud accounts.
6. **To Be Determined (TBD)** - Controls waiting on policies to be calculated will be in the TBD state. When troubleshooting controls in a TBD state, check the policies tab to ensure that no policies are also in the TBD state. This can be accomplished by navigating to the **Policies** tab, then clicking on **Values**, then setting the **State** dropdown menu on the right side to **TBD**.


## Muting Controls

You can **mute** controls if you want to ignore them.  For example, you may want to suppress errors and alarms for specific controls because they have a known, valid reason to be out of compliance.  Or perhaps a fix is pending, so you want to ignore the alarms until they go to an `OK` state.  By muting these controls, you can reduce noise and increase the visibility of the controls that matter.

Control muting helps streamline operations without compromising security policies. It’s a lightweight alternative to adjusting policy settings or creating exceptions, and it’s particularly useful in these scenarios:

- **Planned changes and maintenance**:  During scheduled maintenance or infrastructure updates, muting specific controls reduces unnecessary alerts while preserving visibility into other issues. For example, muting high availability controls during a planned 4-hour failover test, or replication controls during a 2-week regional migration.

- **Known issues under resolution**  When actively addressing an issue, mute controls to focus efforts:
  - Suppress alerts until a fix is deployed (e.g., mute until the control status changes to `OK`).
  - Temporarily silence noisy controls while fixing errors (e.g., mute `ERROR` states).
  - Mute controls for a specific timeframe during fix deployment (e.g., `Mute for 1 Month`).
  - Reduce noise from multiple related controls, focusing on the key issue.

- **False Positive Management** While tuning detection logic, mute controls that generate known false positives. This allows teams to adjust underlying rules without being overwhelmed by irrelevant alerts.


When a control is muted:
- It will be displayed in the console with a gray  `MUTED [{state}]` state (e.g. `MUTED [ERROR]`).
- It will not be "scored."   It will not be shown by default when the display is filtered by state, nor will it be included in the totals for its state.  For example, if the control is in an `ERROR` state but is muted, it will not be reflected in the count of `ERROR` controls, and the control will not appear when filtering on `state:error.`
- Enforcement actions will not run.

<!--
- [Notifications](/guardrails/docs/guides/using-guardrails/notifications) will not be sent when the control changes state.

-->

You can mute or unmute a control from its [detail page](#control-detail-page).  You may mute the control indefinitely, set an expiration date and time, or mute the control until it changes to a specific state or states, e.g.:
- Mute for 1 day
- Mute for 1 month
- Mute until OK
- Mute until Alarm
- Mute Indefinitely


### Muting vs Exceptions

Control muting is sometimes confused with [policy exceptions](/guardrails/docs/concepts/policies/values-settings#exceptions).  Indeed, you can create a resource-level policy exception to set a control to `Skip`, thereby eliminating the alarms or errors for that control.  Muting a control is not the same as skipping it, though. Muting modifies the *visibility* of the control; the control will run and you can view its actual current state. Skipping a control alters its fundamental behavior; *a skipped control will not run at all*.

Policy exceptions are a generalized mechanism that allow you to override a required setting on a resource lower in the policy hierarchy.  You can use them to `Skip` a specific control, but you can create an exception to any policy to alter a control's behavior.  For example, let's say your organization sets the `AWS > S3 > Bucket > Encryption at Rest` policy to `Check: Customer managed key`.  You can create a resource-level policy exception to `Skip` the control, but you could alternatively change it to run with a different value or this instance, perhaps  `Check: AWS SSE or higher`.

Muting, on the other hand, merely suppresses the control.  Unlike exceptions, which can appear anywhere in the resource hierarchy, you can only mute single control instances.


| Control Muting	                                | Policy Exceptions
|-------------------------------------------------|---------------------------------------------------
| Changes *visibility*, e.g. alerts are suppressed, but monitoring continues. |	Changes *behavior*.  Affects the control evaluation logic.
| Applied after the control evaluates its state.  | Applied before the control evaluates its state.
| Suppresses alerts.	                            | Modifies posture evaluation rules.
| Does not impact security posture. Policies remain unchanged. | Adjusts security posture requirements with new policy settings.
| Optional time-based or state-based expiration.   | Optional time-based expiration.
| Set on a control instance.                       | Set anywhere in the policy hierarchy.
| Example: Muting a control in ERROR while resolving an issue.	 | Example: Adding an exception to allow a non-compliant configuration.



#### Use Cases

| I want to....                                          | Recommendation
|--------------------------------------------------------|-------------------------------------------
| Suppress alarms and errors for this control instance.  | Mute the control
| Skip the control for many instances.                   | Create a policy exception to skip the control at the region, account, or folder.
| Run the control, but use different settings for this resource. | Create a policy exception for the setting you wish to change.
| Selectively run the control based on data in the CMDB. | Create a calculated policy setting.
| Stop running some controls to save money.              | Create a policy setting to `Skip` the control.



## Control Detail Page

The **Control Detail Page** contains information that is used to diagnose alarms and errors. Each control type will have different criteria for the final control state.

For example, the control `AWS > Events > Target > Approved` depends on multiple policies for the eventual control state evaluation. The control detail page makes that explicit.

Guardrails provides a snapshot view of what the Approved control checks. In this case the control checks the following policies:

- `AWS > Events > Target > Approved`
- `AWS > Events > Target > Approved > Usage`
- `AWS > Events > Target > Approved > Regions`

Each one of these policies can be seen on the right hand side of the control detail page, including the state of the policy (very similar to the state of the control, but policy states are a result of the policy value calculation, not policy application) and the value of the policy.

On this screen, you will find these criteria will be evaluated and presented in a simple manner. The policy evaluations can either be `Approved` or `Not approved`. If troubleshooting unexpected alarms, errors, or resources changes, the control detail window can help diagnose any policy misconfigurations.
