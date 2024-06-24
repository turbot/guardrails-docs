---
title: Resources
template: Documentation
nav:
  order: 10
---

# Resources

## Filtering Resources

You can use the `resources` filter to search and filter Resources in the Turbot Guardrails
Console or GraphQL.

- The `resources` filter supports the standard `sort` and `limit` keywords
- You can search
  [Standard Guardrails metadata properties](reference/filter#standard-turbot-properties)
  such as `timestamp`, `title`, etc. Note that you cannot search
  `actorIdentityId` in `resources` queries.
- You can use [Full Text Search](reference/filter#full-text-search) to
  search/filter resources.
- You can [use `$.` to Search and filter resources](#searching-resources-with-)
  on any property of the object.
- You can use [Tag Filters](reference/filter#tag-filters) to filter resources.
- You can filter the scope with
  [Hierarchy Scope Filters](reference/filter#hierarchical-filter-scopes). Note
  that these are implicitly set when filtering the controls page in the Guardrails
  Console

<!--
### Supported Hierarchy Scope Filters
| Keyword | Value | Purpose
|-|-|-
| `resource` | aka/id of a **Resource** |  Resource of this aka/id
| `level` | standard level for the **Resource** | Resources for this resource only, for this resource and its descendants, etc
| `resourceType` | aka/id of a **Resource Type** | Resources for this resource type
| `resourceTypeId` | aka/id of a **Resource Type** | Resource for this resource type ID
| `resourceTypeLevel` | standard level for the **Resource Type** | Resources for this resource type only, for this resource type and descendant resource types
| `resourceTypeLevelId` | standard level for the **Resource Type** | Resource for this resource type ID only, for this resource type ID and descendant resources IDs
| `controlType` | aka/id of a **Control Type** (Approved, Active, etc) | Resources of this control type
| `controlTypeId` | aka/id of a **Control Type** (Approved, Active, etc) | Resource of this control type ID
| `controlTypeLevel` | standard level for the **Control Type** | Resources of this control type only,  of this type and descendent control types
| `controlTypeLevelId` | standard level for the **Control Type** | Resource of this control type ID only, of this ID and descendent control type IDs
| `controlCategory` | aka/id of a **Control Category**  | Resources of this control category
| `controlCategoryId` | aka/id of a **Control Category**  | Resource of this control category ID
| `controlCategoryLevel` | standard level for the **Control Category** | Resource of this control category only, of this category and descendent control categories
| `controlCategoryLevelId` | standard level for the **Control Category** | Resource of this control category ID only, of this category ID and descendent control category IDs
| `resourceCategory`  | aka/id of a **Resource Category**  | Resources that target resource types of this category
| `resourceCategoryId`  | aka/id of a **Resource Category**  | Resource that target resource types of this category ID
| `resourceCategoryLevel` | standard level for the **Resource Category** | Resources that target resource types of this category only, this category and descendant categories. etc
| `resourceCategoryLevelId` | standard level for the **Resource Category** | Resources that target resource types of this category ID, this category ID and descendant category IDs etc
| `policyType` | aka/id of a **Policy Type** | Resources that are targeted by this policy type
| `policyTypeId` | aka/id of a **Policy Type** | Resources that are targeted by this policy type ID
| `policyTypeLevel` | standard level for the **Policy Type** | Resources that are targeted by this policy type only, this policy type and descendant policy types, etc
| `policyTypeLevelId` | standard level for the **Policy Type** | Resources that are targeted by this policy type ID only, this policy type ID and descendant policy type IDs, etc
| `descendantResourceType` | aka/id of a **Resource Type** | Resources who's resource type is an ancestor of a given resource type
| `descendantInterface` | aka/id of a **Resource Type** | Resources who's resource type is an ancestor of a given resource interface -->

### Examples

| Aim                                                                | Filter text                                               |
| ------------------------------------------------------------------ | --------------------------------------------------------- |
| Resources that contain "foo" in any aka                            | `resource:foo level:self`                                 |
| AWS account 876515858155                                           | `resource:arn:aws:::876515858155 level:self`              |
| Resources in AWS account 876515858155                              | `resource:arn:aws:::876515858155 level:descendant`        |
| Resources with a "department" tag of "sales"                       | `tags:department=/^sales$/i`                              |
| Resources created in the last week                                 | `createTimestamp:>T-7d`                                   |
| Resources created or updated in the last 15 minutes                | `timestamp:>T-15m`                                        |
| Resources last updated by the user with profile id 170668258072293 | `actorIdentityId:170668258072293`                         |
| EC2 Instances with private IP in the 172.31.6.0/24 range           | `resourceType:instance $.PrivateIpAddress:<172.31.6.0/24` |
| Volumes larger than 1000MB                                         | `resourceType:volume $.Size:>=1000`                       |
| Unattached Volumes                                                 | `resourceType:volume $.Attachments.*.State:!attached`     |
| All compute and storage resources of any type                      | `resourceCategory:compute,storage`                        |
| resources with a data protection control                           | `controlType:dataProtection`                              |
| Resources that have an `Approved > Public IP` policy               | `policyType:approvedPublicIp`                             |

### Searching resources with `$.`

You can search/filter resources using ANY property of the object using `$.` and
then indexing into the object with dotted path. You can search arrays using the
`+` or `*` splats (1 level only). For example, this single level splat will
work: `$.IpPermissions.*.ToPort:22`. This multi-splat search will not:
`$.IpPermissions.*.IpRanges.*.CidrIp:192.168.1.54/32`

#### Example: Search/filter S3 Buckets

```yaml
Acl:
  Grants:
    - Grantee:
        DisplayName: aws+account+aaa
        ID: 9999999999999999999999999999999999999999999999999999999999999999
        Type: CanonicalUser
      Permission: FULL_CONTROL
  Owner:
    DisplayName: aws+account+aaa
    ID: 9999999999999999999999999999999999999999999999999999999999999999
CreationDate: "2019-05-23T11:32:27.000Z"
Encryption:
  ServerSideEncryptionConfiguration:
    Rules:
      - ApplyServerSideEncryptionByDefault:
          SSEAlgorithm: AES256
Name: mybucket-aws-account-aaa-s3-1
Payer: BucketOwner
PublicAccessBlock:
  BlockPublicAcls: true
  BlockPublicPolicy: true
  IgnorePublicAcls: true
  RestrictPublicBuckets: true
Tags: []
Versioning:
  Status: Enabled
turbot:
  akas:
    - "arn:aws:s3:::mybucket-aws-account-aaa-s3-1"
  custom:
    aws:
      accountId: "876515858155"
      regionName: us-east-1
    createTimestamp: "2019-05-23T11:32:27.000Z"
  id: "170962917356427"
  title: mybucket-aws-account-aaa-s3-1
```

| Aim                                 | Filter text                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Buckets with SSE Default Encryption | `resourceType:bucket $.Encryption.ServerSideEncryptionConfiguration.Rules.*.ApplyServerSideEncryptionByDefault.SSEAlgorithm:AES256 ` |
| Buckets that dont block public ACLs | `resourceType:bucket $.PublicAccessBlock.BlockPublicAcls:!true`                                                                      |
| Buckets with versioning not enabled | `resourceType:bucket $.Versioning.Status:!Enabled`                                                                                   |
