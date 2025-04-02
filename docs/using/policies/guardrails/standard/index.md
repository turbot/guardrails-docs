---
title: Standard Guardrails
sidebar_label: Standard Guardrails
---

# Standard Guardrails

Turbot Guardrails [Policies](concepts/policies) and [Controls](concepts/controls) provide a
flexible framework for auditing and enforcing configuration across hundreds of
cloud services, networking, OS, and DB tiers. While this model is extensible,
there are many guardrails that are common and consistent across resources.

| Guardrail                                                          | Description                                                                                                                                                         |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Access Logging](concepts/guardrails/access-logging)               | Monitor and enable access logging on various cloud resources.                                                                                                       |
| [Active](concepts/guardrails/active)                               | Use a variety of criteria to determine if a cloud resource is Active, i.e. number of days the resource has existed, and take action (shutdown, delete, alarm, etc). |
| [Approved](concepts/guardrails/approved)                           | Verify whether a particular resource is allowed to exist and take an appropriate action if not (shutdown, delete, alarm, etc).                                      |
| [Audit Logging](concepts/guardrails/audit-logging)                 | Audit Logging configuration tools for cloud resources.                                                                                                              |
| [Budget](concepts/guardrails/budget)                               | A mechanism for tracking current spend against a planned target and taking appropriate action to control cost.                                                      |
| [CMDB](concepts/guardrails/cmdb)                                   | Responsible for populating and updating all the attributes for that resource type in the Guardrails CMDB.                                                           |
| [Discovery](concepts/guardrails/discovery)                         | Mechanism by which Guardrails initially adds a resource to the CMDB.                                                                                                |
| [Encryption at Rest](concepts/guardrails/encryption-at-rest)       | A mechanism to manage data encryption at rest (i.e. AWS S3 Buckets).                                                                                                |
| [Encryption in Transit](concepts/guardrails/encryption-in-transit) | A mechanism to manage data encryption in transit (i.e. AWS S3 Buckets).                                                                                             |
| [Public Access](concepts/guardrails/public-access)                 | Configure public access settings on cloud resources.                                                                                                                |
| [Scheduling](concepts/guardrails/scheduling)                       | Define schedules to control cloud resource usage.                                                                                                                   |
| [Stacks/ Configured](concepts/guardrails/configured)               | [DEPRECATED] Manage resource configuration using Terraform.                                                                                                                      |
| [Stacks [Native]](concepts/guardrails/stacks)               | Manage resource configuration using OpenTofu (open source Terraform).                                                                                                                  |
| [Tagging](concepts/guardrails/tagging)                             | Tagging of both Guardrails resources, such as a folder, and Cloud Provider resources, such as an Azure Subscription or AWS EC2 instance.                            |
| [Trusted Access](concepts/guardrails/trusted-access)               | Trusted Access allow you to define whom and what you trust and enforce those limitations on your cloud resources.                                                   |
| [Usage](concepts/guardrails/usage)                                 | Generate alarms if the number of resources in a specific service exceeds a set amount.                                                                              |

![Standard Controls](/images/docs/guardrails/standard_controls.png)
