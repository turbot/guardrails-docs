---
title: Smart Folders
sidebar_label: Smart Folders
---

# Smart Folders

<!--
Smart Folders allow resources from across the hierarchy to be organized
together as a group. For example, a Smart Folder can be used to group all AWS
VPCs in the us-west-2 region into a single collection.
-->

**Smart Folders** are a flexible container for
[Policy settings](concepts/policies/values-settings#policy-settings). Policies
can be set on smart folders, making it easy to apply collections of policies to
resources across the [Resource Hierarchy](hierarchy).

**Tip**: An unattached smart folder is inert, making it a safe place to practice
applying policies and ensuring that the policy Terraform is working properly.

This example shows an example hierarchy with two smart folders created at the
Turbot level.

```
Turbot
  Enforcement Policies (Smart Folder)
  Check Policies (Smart Folder)
  {Top Level Folder} (Folder)
    {Cloud Account} (Cloud Account)

```

## Smart Folder Attachments

Attaching smart folders to folders and resources "activates" the policies
contained in the smart folder. Notice that the ordering of smart folder
attachment matters a great deal. When evaluating policies, Guardrails starts at the
resource then ascends the resource hierarchy looking for an applicable policy. A
check-mode policy above the same policy in enforce-mode will have no effect. The
enforce-mode policy is closer to the resource, so it wins. Remember, "the
closest policy wins".

Along with the concept of attaching a smart folder to resources, if a smart
folder is attached to any resource, it becomes the **Parent** of that resource
and as such the smart folder _cannot be deleted until all resources have been
detached_.

## Use Case

The resource hierarchy provides a clear model for sharing/inheriting policy
settings and permissions across resources. For example, a policy setting
`AWS > S3 > Bucket > Approved` on `AWS 1111` will be used by all S3 buckets
beneath it in the resource hierarchy.

But consider a situation where we wish to have specific policy settings for VPCs
based on their region (e.g. local DNS servers). VPCs are based in different
accounts, so they exist in different branches of the hierarchy:

![](/images/docs/guardrails/smart-folders-none.png)

In this case, the resource hierarchy is insufficient and would require
duplication of policy settings to every individual region or VPC.

Instead, we define a smart folder `US Network` with US specific settings, and a
second smart folder `EU Network` with EU specific settings. For example:

    US Network:
      AWS > VPC > DNS Servers = 1.1.1.1
      AWS > VPC > NTP Servers = 1.2.3.4

    EU Network:
      AWS > VPC > DNS Servers = 5.5.5.5
      AWS > VPC > NTP Servers = 5.6.7.8

Smart folders are then attached to the region resources:

    Folder A
      AWS 1111
        us-east-1 (+ US Network)
        eu-west-1 (+ EU Network)
      AWS 2222
        us-east-1 (+ US Network)
        eu-west-1 (+ EU Network)

VPCs in each region will now have their region specific policies, while
administrators can maintain those policy settings in a single location.

![](/images/docs/guardrails/smart-folders-updated.png)

### Further Reading

- [Working with Smart Folders](guides/working-with-folders/smart) - Learn how to
  attach and detach a smart folder.
- [Guardrails Samples Repo Calculated Policies](https://github.com/turbot/guardrails-samples/tree/master/calculated_policies) -
  Each set of policies is deployed via Terraform within a customizable Smart
  folder.
- [Guardrails Samples Repo Common Control Objectives](https://github.com/turbot/guardrails-samples/tree/master/control_objectives) -
  Common control objectives deployed via Terraform within a customizable Smart
  folder.
