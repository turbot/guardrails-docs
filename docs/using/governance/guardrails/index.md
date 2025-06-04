---
title: Guardrails
---

# Guardrails

A **Guardrail** is a deployable unit of policy enforcement that implements a control objective, such as enforcing encryption, monitoring access, and securing networking configurations. 

Each guardrail configures one or more [controls](using/controls), according the [policy settings](using/policies) in the guardrail.  

You can attach guardrails to accounts directly, but its generally recommended to deploy them via [campaigns](using/campaigns) instead.  Campaigns allow you to automate the rollout of one or more guardrails, including scheduling the rollout and sending communications to account teams.



## Guardrails vs Policy Packs
Conceptually, a guardrail configures one or more controls via its associated policies.  Guardrails are the successor to [Policy Packs](using/policies/policy-packs), and generally should be preferred to policy packs because the they provide additional advantages:
- Guardrails specify which control(s) they configure, allowing Turbot Guardrails to detect and limit conflicts with other guardrails.
- You can deploy guardrails with campaigns.  Campaigns only work with Guardrails, not policy packs.
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