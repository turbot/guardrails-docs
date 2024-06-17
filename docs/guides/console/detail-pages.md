---
title: Detail pages
sidebar_label: Detail pages
---

## Detail pages

Clicking on a Control, Policy, or Resource may take you to its respective pages.
For Control, there are different information available on different tabs such as **Policies**, **Depends On**, **Activity**, and **Developer** etc. And each tab provides more information.

For Policy setting, there are different information available on different tabs such as **Hierarchy**, **Values**, **Activity**, and **Developer** etc.

For Resources, there are different information available on different tabs such as **Details**, **Controls**, **Policies**, **Activity**, **Report** and **Developer** etc.

### Control Details

The **Control** page provides extensive information about a single control. In addition to the color-coded control state, composite controls such as **Approved** and **Active** provide a summarized view of the evaluation criteria from which the state is derived. **VIEW LOG** provides detailed process log information. On the right, `Actions -> Run control` allows you to force a control run.

**Policies** tab provides information about policy value, primary policies, and other policies used by the Control. **Depends On** tab provides information about resources used by the control. The **Activity** tab shows the notifications related to the control. And the **Developer** tab provides information about Terraform, GraphQL, CLI, and resource AKA/ID etc.
![control](/images/docs/guardrails/control-details.png)

### Policy Setting Details

The **Policy Setting** page allows users to create, delete, or update policy settings, as well as to view policy information. The **Hierarchy** tab provides a view of the resource hierarchy for this policy, including the effective setting.  Users can view, edit, or delete policy settings here, as well as view descendent settings for this policy.

The **Values** tab provides a view of the effective policy values for the resources. The **Activity** tab shows the notifications and the the **Developer** tab provides information about Terraform, GraphQL, CLI, and policy URI etc.
![policy](/images/docs/guardrails/policy-setting.png)

### Resource Details

The **Resource Detail** page provides a view of the resource as it appears in the Guardrails CMDB. On the right, you can see the tags, AKAs and Smart Folders for this resource. In the **Controls** tab, you can see the primary controls for this resource and policy type are displayed in the **Policies** tab. In the **Activity** tab it shows the notifications related to this resource.

In **Reports** tab, you can see `Top Resource Types`, `Control alerts by descendant`, `Controls by Resource Type`, and `Oldest alerts` etc. **Developer** tab shows information about Terraform, GraphQL, CLI, and resource AKA/ID etc.
![resource detail](/images/docs/guardrails/resource-details.png)
