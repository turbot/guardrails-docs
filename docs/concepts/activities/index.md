---
title: Resource Activities
sidebar_label: Activities
---

# Resource Activities

Cloud infrastructure constantly changes to meet the demands of modern
applications. One of the fundamental assumptions of Guardrails is that the
management and governance of these applications must also be dynamic - Guardrails
responds in real time to changes in your environment to assure that your
applications continue to operate securely and reliably. The Activity page
provides visibility into the changes that are occurring in your environment.

Activities represent significant events in the lifecycle of your
infrastructure, including:

- History of change for a resource (e.g. my-bucket).
- A log of state changes and actions performed by a control (e.g. my-bucket
  Tags).
- Changes to policy settings, and the specific policy values they update.
- Records of permission grants, activations, deactivations and revocations.

<div className="example"> Guardrails creates a <code>Bucket created</code> activity when it detects that a new S3 Bucket has been created.  
This activity includes the bucket name, the creation time, and the person who created it, as well as detailed log information.</div>

Guardrails maintains a history of all activities that you can search and filter,
providing an audit trail of everything that occurs in your environment. Guardrails
activities contain detailed information about who made the change, the
state/value before and after, the timestamp, and other important information.
You can use the activity pane to determine who made a change, the difference
between the before and after values, and the subsequent related events. In
addition, you can view patterns in activity to help determine impacts, systemic
problems, and other trends.

## Activity

Activity logs are displayed throughout the Guardrails user interface. These are
available and browsable on demand, including historical information.

Activities may be filtered and queried using the
[Guardrails filter language](reference/filter)

## Activity Types

| Item             | Action  | Activity Type            | Description                                                                                                                                                                                                                                     |
| ---------------- | ------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Action           | Notify  | `action_notify`          | When a Guardrails action invokes a `notify` command during a run.                                                                                                                                                                               |
| Control          | Notify  | `control_notify`         | When a Guardrails control invokes a `notify` command during a run.                                                                                                                                                                              |
| Control          | Updated | `control_updated`        | When a Guardrails control is updated. Notifications will be sent if and only if a control changes state, i.e. `ok` -> `alarm`, `invalid` -> `ok`, etc. If the control updates but the state does NOT change, no notification will be generated. |
| Favorite         | Created | `favorite_created`       | When a favorite is created for a resource.                                                                                                                                                                                                      |
| Favorite         | Deleted | `favorite_deleted`       | When a favorite is deleted for a resource.                                                                                                                                                                                                      |
| Grant Activation | Created | `active_grants_created`  | When a Guardrails grant is activated.                                                                                                                                                                                                           |
| Grant Activation | Deleted | `active_grants_deleted`  | When a Guardrails grant is deleted.                                                                                                                                                                                                             |
| Grant            | Created | `grant_created`          | When a Guardrails grant is created. By default in the UI "Activate for immediate use" is checked. In that case, a `grant_created` notification is generated followed by `active_grants_created`.                                                |
| Grant            | Deleted | `grant_deleted`          | When a Guardrails grant is deleted.                                                                                                                                                                                                             |
| Policy Setting   | Created | `policy_setting_created` | When a new Guardrails policy setting is created.                                                                                                                                                                                                |
| Policy Setting   | Deleted | `policy_setting_deleted` | When an existing Guardrails policy setting is deleted.                                                                                                                                                                                          |
| Policy Setting   | Updated | `policy_setting_updated` | When an existing Guardrails policy setting is updated.                                                                                                                                                                                          |
| Policy Value     | Updated | `policy_value_updated`   | When a Guardrails policy value is updated.                                                                                                                                                                                                      |
| Resource         | Created | `resource_created`       | When a new resource is created in Guardrails.                                                                                                                                                                                                   |
| Resource         | Deleted | `resource_deleted`       | When a resource in Guardrails is deleted.                                                                                                                                                                                                       |
| Resource         | Updated | `resource_updated`       | When a resource in Guardrails is updated.                                                                                                                                                                                                       |
