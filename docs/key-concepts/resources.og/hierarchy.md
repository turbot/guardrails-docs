---
title: Hierarchy
sidebar_label: Hierarchy
---

# Resource Hierarchy

## Overview

All resources in Guardrails are arranged into a hierarchy. Each resource has one
parent, and zero or more children.

The **Resource Hierarchy** may be many levels deep, but has 3 general tiers:

| Tier                   | Purpose                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------|
| Turbot                 | Root node of the hierarchy.                                                                        |
| Folders                | Hierarchy of folders defined in Guardrails. Typically used to separate resources by business unit. |
| Discoverable Resources | Resources discovered from various sources such as cloud providers, servers and other services.     |

![Resource Hierarchy](/images/docs/guardrails/resource-hierarchy2.png)

## Turbot Root

Turbot Root is the top level resource of the entire hierarchy, and all other
resources are descendants of this node. This resource is the target for various
controls and policies used by the Guardrails system.

## Folders

Folders provide a high level arrangement of resources in Guardrails. Common models
for folders include:

| Model         | Example                                          |
| ------------- | ------------------------------------------------ |
| Business Unit | R&D, Commercial, Admin                           |
| Compliance    | GxP production, GxP Development, PCI, Commercial |
| Environment   | Development, Testing, Production                 |

A typical hierarchy might look something like the following:

```
Turbot
  {Company Folder} (Folder)
     {Top Level Folder} (Folder)
         {Intermediate Folder} (Folder)
```

- Folders can be renamed and moved. Use names that make sense within the
  organization structure.
- Folders are limited to single inheritance only, consider
  [Policy Packs](/guardrails/docs/concepts/policy-packs) for cross-hierarchy organization.
- Folder structure is best configured in such a way that matches control,
  business, and permission requirements!
- Folders can be created an destroyed using the [Turbot Guardrails Terraform
  Provider](https://registry.terraform.io/providers/turbot/turbot/latest/docs/resources/folder).

## Policy Packs

[Policy Packs](/guardrails/docs/concepts/policy-packs) are a collection of
[Policy Settings](concepts/policies/values-settings#policy-settings) that can be
attached to folders. They do not affect the resource hierarchy described above,
but are part of the [Policy Hierarchy](concepts/policies/hierarchy).

## Discoverable Resources

The vast majority of resources in Guardrails are created to represent resources in
other tools or systems. Cloud providers, operating systems, SaaS tools -
virtually any system can be a source of Guardrails Resources.

All discovered resources are added to the Guardrails Resource Hierarchy.
[Mods](https://hub.guardrails.turbot.com/#mods) define the structure of these resources, Guardrails simply ensures they
are valid and structured according to their definition.

<div className="example"> AWS Account 1111 is added as a discoverable resource,
providing Guardrails with permission to query it's resources. The AWS mods in Guardrails then
crawl and discover all resources in that AWS account (e.g. S3 buckets, IAM users, EC2
instances) and add them to the Guardrails Resource Hierarchy.
</div>
