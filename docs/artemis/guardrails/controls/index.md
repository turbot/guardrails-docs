---
title: Controls
sidebar_label: Controls
---

# Controls

A Guardrail configures one or more **Controls**.  The control is responsible for evaluating and enforcing one or more [policies](artemis/guardrails/policies); it "controls" all policy enforcements, either generating alarms or taking action against out-of-compliance cloud resources. 

When you create a guardrail, you add one or more [Control Types](#control-types) that the guardrail will apply and then set the [policies](artemis/guardrails/policies) that govern the controls behavior.  

Controls, like policies, target a resource type.  When you attach a guardrail to an account, Guardrails will create an instance of the control for each of the targeted resources.  For instance, when you attach a guardrail that includes the `AWS > S3 > Bucket > Versioning` control type to your account, Guardrails will create an instance of the control for every bucket in the account, each with its own [control state](#control-state).

The control's behavior is governed by:
- The *policies* on which it depends.  The policy settings essentially represent the desired state of the resource.
- The state of the *resource*.   This reflects the actual state that the control should compare against the policy posture to determine the state of the control.  Whenever the resource state changes, the control will re-run to keep the resource in the desired state.
- The current *phase* of the guardrail.  While the policies may specify to `enforce` the control, it will not run enforcement actions unless the guardrail is in the `enforce` phase.  In prior phases, it will remain in the alarm state but not change the resource.


## Control Types

A **Control Type** is a definition for a particular control. Each different control type is a blueprint that can be configured for resources, such the **Encryption at Rest** control type for AWS S3 buckets. The`AWS > S3 > Bucket > Encryption at Rest` control evaluates the policy settings to determine the desired S3 bucket encryption settings and compares that to the current state of the bucket, and updates the control state.  Depending on the policy settings, the control may merely raise an alarm, or it may automatically fix the resource by applying the appropriate encryption settings.

## Control State

Controls are responsible for enforcing policy values. This introduces the concept of a **Control State**. After a control has completed running, it is assigned a state, which can depend on a variety of factors, such as the IAM permissions (i.e. can Guardrails describe the resource?), pending work (i.e. is a policy waiting to be calculated?), or simply that the evaluated policy tells the control to not do anything.

Controls have six different possible states:

| State | Description
|-------|-------------
| **OK** | Generally, this is the desired state of any control in the environment. It implies that Guardrails and cloud resources are working and within the guidelines set by the organization via a policy set. An OK state is denoted by a green checkmark while on the controls tab.
| **Alarm** | Controls in the alarm state are either waiting to be modified by Guardrails for compliance (this generally clears within a few seconds), or have a policy/ collection of policies configured such that Guardrails is only monitoring cloud resources rather than remediating. Controls in alarm should be investigated by administrators, as enforcement requires review.
| **Error** | The error state signifies that the control cannot enforce the configured policy values on a specific resource, or that a specific resource is misconfigured. This can be for a variety of reasons, such as the Guardrails role in the target account does not have sufficient permissions to describe or modify a resource. Each error will need to be evaluated by an administrator. Often, the control itself will specify what issue occurred, be it a policy misconfiguration or permissions. If there are any questions or concerns regarding controls in error, contact [Guardrails Support](mailto:help@turbot.com).
| **Invalid** | This control state means that Guardrails cannot configure, or possibly describe, a particular resource due to policy misconfigurations. For example, if an administrator has the policy `AWS > EC2 > Key Pair` set to `Check: Active`, but all dependent policies such as `AWS > EC2 > Key Pair > Active > Age` are set to skip, Guardrails does not have the required policy settings to accurately evaluate what `Active` means. In this case, the control `AWS > EC2 > Key Pair > Active` is invalid.
| **Skipped** | A skipped state means that the resource in question is not evaluated by policies by choice. This can range from not enforcing or checking tags on resources to allowing users to build any security group in one or many cloud accounts.
| **To Be Determined (TBD)** | Controls waiting on policies to be calculated will be in the TBD state. When troubleshooting controls in a TBD state, check the policies tab to ensure that no policies are also in the TBD state. This can be accomplished by navigating to the **Policies** tab, then clicking on **Values**, then setting the **State** dropdown menu on the right side to **TBD**.


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

<!--
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

-->
