---
title: Controls
sidebar_label: Controls
---

# Controls

A control is a Guardrails [resource](concepts/resources) that is tasked with enforcing one or more [policies](concepts/policies). Depending on what control objective is being monitored and/or enforced, controls can rely on either one or multiple policies to evaluate cloud resources for compliance.

Controls are where the magic happens with Guardrails. These "control" all policy enforcements, either generating alarms for administrative review or taking action against out of compliance cloud resources. Controls also monitor Guardrails to ensure that resources such as [Mods](https://hub.guardrails.turbot.com/#mods) are installed correctly.

Controls rely on resource state and policy settings to operate. Essentially:

```
Resource State + Policy Setting = Control State
```

As a concrete example: A cloud storage resource does not have encryption at rest configured. In Guardrails, the encryption at rest policy asserts that storage should be encrypted at rest. The encryption at rest control evaluates resource state against the policy then acts. In this case, the control will go into an `alarm` state. If the policy is set to check mode then the control will only go into `alarm`. If in enforce mode, the control will go into `alarm` and Guardrails will act to remediate the resource. When the remediation is successful, the control will rerun then go into `ok`.

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

## Control Detail Page

The **Control Detail Page** contains information that is used to diagnose alarms and errors. Each control type will have different criteria for the final control state.

For example, the control `AWS > Events > Target > Approved` depends on multiple policies for the eventual control state evaluation. The control detail page makes that explicit.

Guardrails provides a snapshot view of what the Approved control checks. In this case the control checks the following policies:

- `AWS > Events > Target > Approved`
- `AWS > Events > Target > Approved > Usage`
- `AWS > Events > Target > Approved > Regions`

Each one of these policies can be seen on the right hand side of the control detail page, including the state of the policy (very similar to the state of the control, but policy states are a result of the policy value calculation, not policy application) and the value of the policy.

On this screen, you will find these criteria will be evaluated and presented in a simple manner. The policy evaluations can either be `Approved` or `Not approved`. If troubleshooting unexpected alarms, errors, or resources changes, the control detail window can help diagnose any policy misconfigurations.
