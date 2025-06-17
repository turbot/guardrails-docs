---
title: Guardrails
---

# Guardrails

A **Guardrail** is a deployable unit of policy enforcement that implements a control objective, such as enforcing encryption, monitoring access, and securing networking configurations. 

Each guardrail configures one or more [controls](artemis/controls), according the [policy settings](artemis/policies) in the guardrail.  

You can attach guardrails to accounts directly, but its generally recommended to deploy them via [rollouts](artemis/rollouts) instead.  Rollouts allow you to automate the rollout of one or more guardrails, including scheduling the rollout and sending communications to account teams.



## Phases
Guardrail **phases** enable a predictable, reliable, ordered rollout procedure.  Phases allow you to bring visibility to stakeholders at the appropriate time, and allow you to preview the impact of change.

For example, the cloud team can attach a guardrail in `draft` to preview its impact on the account without impacting the account team in anyway.  If the cloud team decides to deploy the change, then they can then move to `preview` to provide visibility to the account team before the change impacts their compliance score.  Subsequently moving to `check` means the guardrail is now scored, but no automatic remediation takes places.  This gives the account team time to manually fix the issue.  Moving to `enforce` will cause Turbot Guardrails to enforce the guardrail, automatically remediating the issues as they are found. 

You can manually attach guardrails and promote them through the phases, but it is generally recommended to deploy guardrails with [rollouts](artemis/rollouts).


When attached, a guardrail will be in exactly one phase at a time for a given account.

| Phase         | Description
|---------------|------------------------------------------------------
| (unattached)  | The guardrail is installed but not yet attached.
| `draft`       | Exactly like check, but doesn't count toward your control score, and is ENTIRELY hidden from the account teams. The purpose is for the **Cloud Team** to evaluate the potential impact and determine whether they want to roll it out. Notices should not be sent in this phase.
| `preview`     | Exactly like check, but doesn't count toward your control score. it's a way for the **account teams** that own the accounts see what a guardrail will do before it impacts their score.  In preview, we start to notify the account teams to let them know this will be rolled out.
| `check`       | Create alarms but do not enforce settings or remediate automatically.  The alarms are scored at this point.
| `enforce`     | Enforce settings where possible/desired


Phases are meant to be ordered / progressive; you start in `draft`, move to `preview`, then `check`, then ideally move to `enforce`.  You are not required to proceed in order, or to proceed through all phases, however.  You may move backward as well - from `enforce` back to `check`, from `check` to `preview`, etc.





## Guardrails vs Policy Packs
Conceptually, a guardrail configures one or more controls via its associated policies.  Guardrails are the successor to [Policy Packs](artemis/policies/policy-packs), and generally should be preferred to policy packs because the they provide additional advantages:
- Guardrails specify which control(s) they configure, allowing Turbot Guardrails to detect and limit conflicts with other guardrails.
- You can deploy guardrails with rollouts.  Rollouts only work with Guardrails, not policy packs.
- You don't have to worry about attachment order for guardrails, since you are prevented from attaching guardrails with the same control to the same account.  Note that Guardrails are alway attached BEFORE policy packs.
- You can only add, remove, or edit a setting to a Guardrail when it’s in unattached, draft or preview phase.

To simplify their behavior, Guardrails also have some limitations that don't apply to policy packs:
- Guardrails may only be created at Turbot level, whereas Policy Packs may be created anywhere in the hierarchy.
- Guardrails may only target accounts (AWS accounts, Azure subscriptions, GCP projects, etc.), and are not attachable to folders or specific resources.
- A guardrail can only include policies that relate to the controls that it targets.





<!--
Turbot Guardrails provides enterprise guardrails for infrastructure platforms, including Amazon Web Services, Microsoft Azure, and Google Cloud.

Balancing agility with controls requires a clear and simple set of beliefs guiding our designs and trade-off decisions. This section outlines how Guardrails thinks about enterprise controls for infrastructure governance and outlines the beliefs, models and assumptions Turbot Guardrails has defined to create those guardrails - providing organizations with a working balance between agility and compliance.

|  Section  | Description |
| ---------------------------------------------------- | ------------------------------------------------------------------------------|
| [Activities](concepts/activities)                    | Activity provides visibility into the changes that are occurring in your environment                                            |
| [Controls](concepts/controls)                        | Controls enforce policies                                                     |
| [Guardrails](concepts/guardrails)                    | Standard guardrails provide a consistent set of controls and policies         |
| [Identity and Access Management (IAM)](concepts/iam) | Guardrails provides a flexible IAM model for authentication and authorization |
| [Policies](concepts/policies)                        | Policies manage configuration settings                                        |
| [Policy Packs](concepts/policy-packs)                | The new and improved way to group resources and policies                      |
| [Processes](concepts/processes)                      | Processes perform work                                                        |
| [Resources](concepts/resources)                      | Resources represent objects that are managed by Guardrails                    |

-->