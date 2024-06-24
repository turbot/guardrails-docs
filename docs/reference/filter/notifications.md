---
title: Notifications
template: Documentation
nav:
  order: 40
---

# Notifications

## Filtering Notifications

You can use the `notifications` filter to search and filter notifications in the
Turbot Guardrails Console or using GraphQL queries.

- The `notifications` filter supports the standard `sort` and `limit` keywords
- You can search
  [standard Guardrails metadata properties](reference/filter#standard-turbot-properties)
  such as `timestamp`, `actor`. Note that you cannot search `title` because
  notifications do not have a title.
- The `type` keyword can filter on any specific
  [notification types](concepts/notifications#notification-types).
- Use the `notificationType` keyword to filter on the general type of
  notifications. This will filter all create, update, and delete notifications
  of a given class. Supported values are:
- `resource`
- `action`
- `policySetting`
- `policyValue`
- `control`
- `grant`
- `activeGrant`

- You can filter the scope with
  [Hierarchy Scope Filters](reference/filter#hierarchical-filter-scopes). Note
  that these are implicitly set when filtering the notifications page in the
  Guardrails Console.

Supported keywords are:

- `resource`
- `level`
- `resourceType`
- `resourceTypeId`
- `resourceTypeLevel`
- `controlType`
- `controlTypeId`
- `controlTypeLevel`
- `policyType`
- `policyTypeId`
- `policyTypeLevel`

Note the following limitations:

- [Tag filters](reference/filter#tag-filters) do not work with notifications.

- [Full text search](reference/filter#full-text-search) does not work with
  notifications.

- You cannot use `$.` to search and filter notifications

<!-- ### Supported Hierarchy Scope Filters
| Keyword | Value | Purpose
|-|-|-
| `resource` | aka/id of a **Resource** |  Notifications for this resource
| `level` | standard level for the **Resource** | Notifications for this resource only, for this resource and its descendants, etc
| `resourceType` | aka/id of a **Resource Type** |  Filter resource notifications to this resource type
| `resourceTypeId` | aka/id of a **Resource Type** |  Filter resource notifications to this resource type
| `resourceTypeLevel` | standard level for the **Resource Type** | Filter resource notifications for this resource type only, for this resource type and descendant resource types
| `resourceTypeLevelId` | standard level for the **Resource Type** | Filter resource notifications for this resource type only, for this resource type and descendant resource types
| `controlType` |  aka/id of a **Control Type** (Approved, Active, etc) | Filter control notifications to controls of this type
| `controlTypeId` |  aka/id of a **Control Type** (Approved, Active, etc) | Filter control notifications to controls of this type ID
| `controlTypeLevel` | standard level for the **Control Type** | Filter control notifications for this control type only, for this control type and descendent control types
| `controlTypeLevelId` | standard level for the **Control Type** | Filter control notifications for this control type only, for this control type and descendent control types
| `policyType` | aka/id of a **Policy Type** | Filter policy value and policy setting notifications this policy type
| `policyTypeId` | aka/id of a **Policy Type** | Filter policy value and policy setting notifications this policy type ID
| `policyTypeLevel` | standard level for the **Policy Type** | Filter policy value and policy setting notifications for this policy type only, for policy type and descendant policy types, etc
| `policyTypeLevelId` | standard level for the **Policy Type** | Filter policy value and policy setting notifications for this policy type only, for policy type and descendant policy types, etc -->

<!-- Category and descendant resource scopes do not work with notifications - the following keywords have no effect:
- `resourceCategory`
- `resourceCategoryLevel`
- `controlCategory`
- `controlCategoryLevel`
- `descendantResourceType`
- `descendantInterface` -->

### Examples

| Aim                                                                          | Filter text                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Notifications for resources, newest first                                    | `notificationType:resource sort:-timestamp`                                                                                                                                                                            |
| The last 100 deletion notifications of any type                              | `notificationType:resourceDeleted,policySettingDeleted,policyValueDeleted,controlDeleted,actionDeleted,scheduledActionDeleted,grantDeleted,activeGrantsDeleted,favoriteDeleted,watchDeleted sort:-timestamp limit:100` |
| Recent permissions activity                                                  | `notificationType:activeGrant,grant sort:-timestamp`                                                                                                                                                                   |
| Notifications for a resource and its descendants for the last 2 hours        | `resource:162675146433353 timestamp:>T-2h sort:-timestamp`                                                                                                                                                             |
| Notifications for a resource only (NOT its descendants)                      | `resource:162675146433353 level:self sort:-timestamp`                                                                                                                                                                  |
| Control notifications related to `AWS > S3 > Bucket > Approved`              | `notificationType:control controlType:tmod:@turbot/aws-s3#/control/types/bucketApproved sort:-timestamp`                                                                                                               |
| Policy notifications for all `AWS > S3 > Approved` policies and sub-policies | `notificationType:policyValue,policySetting policyType:tmod:@turbot/aws-s3#/policy/types/bucketApproved sort:-timestamp`                                                                                               |
| Notifications for a specific actor (user) with it's profileId                | `actorIdentityId:162674901433086`                                                                                                                                                                                      |
