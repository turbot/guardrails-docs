---
title: Policies
template: Documentation
nav:
  order: 20
---

# Policies

## Filtering Policy Settings

You can use the `policySettings` filter to search and filter Policy Setting in
the Turbot Guardrails Console or GraphQL queries.

- The `policySettings` filter supports the standard `sort` and `limit` keywords

- You can search
  [Standard Guardrails metadata properties](reference/filter#standard-turbot-properties)
  such as `timestamp`, `updateTimestamp`, etc. Note that you cannot search
  `actorIdentityId` or `title` in `policySettings` queries.

- [Full Text Search](reference/filter#full-text-search) will search/filter both
  the Policy Setting and the Resource

<!--  doesnt work here...
- You can use `$.` to search and filter resources
-->

- You can use [Tag Filters](reference/filter#tag-filters). Note that the tag
  filters are **Resource** filters - they filter Policy Settings on
  **resources** with these tags.

- You can filter the scope with
  [Hierarchy Scope Filters](reference/filter#hierarchical-filter-scopes). Note
  that these are implicitly set when filtering the policies page in the Guardrails
  Console

- You can use `validToTimestamp` to filter py policy expiration
- `is:orphan` will filter to settings that are orphaned by a higher level
  required setting
- `is:exception` will filter to settings that are an exception to a higher level
  required setting

<!-- ### Supported Hierarchy Scope Filters
| Keyword | Value | Purpose
|-|-|-
| `resource` | aka/id of a **Resource** |  Policy Settings on this resource
| `level` | standard level for the **Resource** | Policy Setting for the resource and its descendants, etc
| `resourceType` | aka/id of a **Resource Type** | Policy Settings that exist on resources of this resource type
| `resourceTypeId` | aka/id of a **Resource Type** | Policy Settings that exist on resources of this resource type ID
| `resourceTypeLevel` | standard level for the **Resource Type** | Policy Setting for the resource type only, for this resource type and descendant resource types
| `resourceTypeLevelId` | standard level for the **Resource Type** | Policy Setting for this resource type ID, for this resource type ID and descendant resource type IDs
| `policyType` | aka/id of a **Policy Type** | Policy Settings of this policy type
| `policyTypeId` | aka/id of a **Policy Type** | Policy Settings of this policy type ID
| `policyTypeLevel` | standard level for the **Policy Type** | Policy Setting of this policy type only, of this policy type and descendant policy types, etc
| `policyTypeLevelId` | standard level for the **Policy Type** | Policy Setting of this policy type only, of this policy type and descendant policy types, etc
| `controlType` |  aka/id of a **Control Type** (Approved, Active, etc) | Policy Setting of this control type
| `controlTypeId` | aka/id of a **Control Type** (Approved, Active, etc) | Policy Setting of this control type ID
| `controlTypeLevel` | standard level for the **Control Type** | Policy Setting of this control type only,  of this control type and descendent control types
| `controlTypeLevelId` | standard level for the **Control Type** | Policy Setting of this control type only,  of this control type and descendent control types
| `controlCategory` | aka/id of a **Control Category**  | Policy Setting of this control category
| `controlCategoryId` | aka/id of a **Control Category**  | Policy Setting of this control category ID
| `controlCategoryLevel` | standard level for the **Control Category** | Policy Setting of this control category only, of this control category and descendent control categories
| `controlCategoryLevelId` | standard level for the **Control Category** | Policy Setting of this control category only, of this control category and descendent control categories
| `resourceCategory`  | aka/id of a **Resource Category**  | Policy Settings that exist on resources of this category
| `resourceCategoryId`  | aka/id of a **Resource Category**  | Policy Settings that exist on resources of this category ID
| `resourceCategoryLevel` | standard level for the **Resource Category** | Policy Setting of this resource category only, this resource category and descendant resource categories. etc
| `resourceCategoryLevelId` | standard level for the **Resource Category** | Policy Setting of this resource category only, this resource category and descendant resource categories. etc -->

### Examples

| Aim                                                                                                         | Filter text                                                                        |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Settings that are orphaned by a higher level required setting                                               | `is:orphan`                                                                        |
| Settings that are orphaned by a higher level required setting                                               | `is:exception`                                                                     |
| Settings expiring in the next week, by expiration date descending                                           | `validToTimestamp:<T+7d,>now sort:validToTimestamp`                                |
| Settings created/updated in the last day, newest first                                                      | `timestamp:>T-1d sort:-timestamp`                                                  |
| Settings on a specific resources                                                                            | `resource:162675146433353 level:self`                                              |
| Settings on a specific resource and below                                                                   | `resource:162675146433353`                                                         |
| `AWS > S3 > Bucket > Approved` policy and sub-policy settings                                               | `policyType:tmod:@turbot/aws-s3#/policy/types/bucketApproved`                      |
| `AWS > S3 > Bucket > Approved` policy settings (not `AWS > S3 > Bucket > Approved > *` sub-policy settings) | `policyType:tmod:@turbot/aws-s3#/policy/types/bucketApproved policyTypeLevel:self` |
| Settings on AWS policy types                                                                                | `policyType:aws`                                                                   |
| All settings for bucket policy types                                                                        | `policyType:bucket`                                                                |

---

## Filtering Policy Values

You can use the `policyValues` filter to search and filter Policy Values in the
Guardrails Console or GraphQL.

- The `policyValues` filter supports the standard `sort` and `limit` keywords

- You can search
  [standard Guardrails metadata properties](reference/filter#standard-turbot-properties)
  such as `timestamp`, `updateTimestamp`, etc. Note that you cannot search
  `actorIdentityId` or `title` in `policyValues` queries.

- [Full Text Search](reference/filter#full-text-search) will search/filter both
  the Policy Value and the Resource

<!--  doesnt work here...
- You can use `$.` to search and filter resources
-->

- You can use [Tag Filters](reference/filter#tag-filters). Note that the tag
  filters are **Resource** filters - they filter Policy Values on **resources**
  with these tags.

- You can filter the scope with
  [Hierarchy Scope Filters](reference/filter#hierarchical-filter-scopes). Note
  that these are implicitly set when filtering the policies page in the Guardrails
  Console

- The `value` keyword allows you to filter Policy Values set to a specific value

- You can search and filter policy values by the policy value state using the
  `state` keyword. Possible values are:
  - `error`
  - `invalid`
  - `ok`
  - `tbd`

### Examples

| Aim                                                                                                       | Filter text                                                                         |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Policy values set to 'Check: Enabled'                                                                     | `value:'Check: Enabled'`                                                            |
| Policy values for resources with a department tag set to 'sales'                                          | `tags:department=/^sales$/i`                                                        |
| Policy values that are not in an OK state                                                                 | `state:-ok`                                                                         |
| Policy values created/updated in the last day, newest first                                               | `timestamp:>T-1d sort:-timestamp`                                                   |
| Policy values for a specific resources                                                                    | `resource:162675146433353 level:self`                                               |
| Policy values for a specific resource and descendant resources                                            | `resource:162675146433353`                                                          |
| `AWS > EC2 > Instance > Active` policy and sub-policy values                                              | `policyType:tmod:@turbot/aws-ec2#/policy/types/instanceActive`                      |
| `AWS > EC2 > Instance > Active` policy values (not `AWS > EC2 > Instance > Active > *` sub-policy values) | `policyType:tmod:@turbot/aws-ec2#/policy/types/instanceActive policyTypeLevel:self` |
| Policy values for AWS policy types                                                                        | `policyType:aws`                                                                    |
| Policy values for CIS policy types                                                                        | `policyType:cis`                                                                    |
