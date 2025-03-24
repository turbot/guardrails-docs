---
title: Guardrails
---

# Concepts

​Turbot Guardrails provides a comprehensive governance platform designed to automate the discovery and remediation of compliance, security, financial, and operational objectives across enterprise cloud environments. It supports major public cloud providers and platforms, including AWS, Azure, Google Cloud, Kubernetes, and Github. ​

Guardrails inventories your cloud [accounts], discovering [resources] on demand and tracking changes in your environment as they occur, providing a near realtime [CMDB] and an [audit log] of change activity.

Once your inventory is set up, you can create [guardrails] to define your security, compliance, and operational posture.  Each guardrail implements a [control] objective, such as enforcing encryption, monitoring access, and securing networking configurations.  Turbot Guardrails provides over 9,000 prebuilt [policies], allowing you to customize the behavior of these controls to meet your standards and priorities.

[Campaigns] help you deploy your guardrails to your enterprise in an organized, predictable, collaborative manner.  Guardrails can be rolled out to your cloud accounts in phases, allowing you to preview and communicate potential issues and to warn of potential changes before they occur.

Once guardrails are deployed, Guardrails can detect misconfigurations in real-time and automatically correct them ensuring that your environment remains compliant.




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