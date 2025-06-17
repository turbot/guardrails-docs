---
title: Standard Controls
sidebar_label: Standard Controls
---

# Standard Controls

Turbot Guardrails [Policies](concepts/policies) and [Controls](concepts/controls) provide a
flexible framework for auditing and enforcing configuration across hundreds of
cloud services, networking, OS, and DB tiers. While this model is extensible,
there are many guardrails that are common and consistent across resources.

| Guardrail                                                          | Description                                                                                                                                                         |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Access Logging](using/standard/access-logging)               | Monitor and enable access logging on various cloud resources.                                                                                                       |
| [Active](using/standard/active)                               | Use a variety of criteria to determine if a cloud resource is Active, i.e. number of days the resource has existed, and take action (shutdown, delete, alarm, etc). |
| [Approved](using/standard/approved)                           | Verify whether a particular resource is allowed to exist and take an appropriate action if not (shutdown, delete, alarm, etc).                                      |
| [Audit Logging](using/standard/audit-logging)                 | Audit Logging configuration tools for cloud resources.                                                                                                              |
| [Budget](using/standard/budget)                               | A mechanism for tracking current spend against a planned target and taking appropriate action to control cost.                                                      |
| [CMDB](using/standard/cmdb)                                   | Responsible for populating and updating all the attributes for that resource type in the Guardrails CMDB.                                                           |
| [Discovery](using/standard/discovery)                         | Mechanism by which Guardrails initially adds a resource to the CMDB.                                                                                                |
| [Encryption at Rest](using/standard/encryption-at-rest)       | A mechanism to manage data encryption at rest (i.e. AWS S3 Buckets).                                                                                                |
| [Encryption in Transit](using/standard/encryption-in-transit) | A mechanism to manage data encryption in transit (i.e. AWS S3 Buckets).                                                                                             |
| [Public Access](using/standard/public-access)                 | Configure public access settings on cloud resources.                                                                                                                |
| [Scheduling](using/standard/scheduling)                       | Define schedules to control cloud resource usage.                                                                                                                   |
| [Stacks/ Configured](using/standard/configured)               | [DEPRECATED] Manage resource configuration using Terraform.                                                                                                                      |
| [Stacks [Native]](using/standard/stacks)               | Manage resource configuration using OpenTofu (open source Terraform).                                                                                                                  |
| [Tagging](using/standard/tagging)                             | Tagging of both Guardrails resources, such as a folder, and Cloud Provider resources, such as an Azure Subscription or AWS EC2 instance.                            |
| [Trusted Access](using/standard/trusted-access)               | Trusted Access allow you to define whom and what you trust and enforce those limitations on your cloud resources.                                                   |
| [Usage](using/standard/usage)                                 | Generate alarms if the number of resources in a specific service exceeds a set amount.                                                                              |

![Standard Controls](/images/docs/guardrails/standard_controls.png)
