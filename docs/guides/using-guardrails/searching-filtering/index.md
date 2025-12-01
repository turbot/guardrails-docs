---
title: Searching & Filtering
sidebar_label: Searching & Filtering
---

# Searching & Filtering

## Overview

Guardrails' powerful [discovery](concepts/resources/discovery) mechanism crawls
your infrastructure and builds a structured, hierarchical representation of your
assets in the Guardrails CMDB.

Guardrails' ability to Discover Everything is powerful, but its only truly valuable
if you can find what you're looking for.

Guardrails provides a powerful advanced query syntax to search and query the CMDB.
This filter syntax can be used to search and filter results in the Guardrails
Console UI, as well as in GraphQL queries, providing a single, consistent
interface for querying the CMDB.

## Basic searching and filtering

Guardrails' basic search capability is intuitive - simply enter text and Guardrails
will perform a case-insensitive search against all the properties of all
objects.

If multiple search terms are specified, Guardrails will search for items that
contain both terms.

<div className="example"> 
A search for <code>bucket demo</code> will return all resources that contain both <code>bucket</code> <b>AND</b> <code>demo</code>
</div>

The Guardrails filter syntax can be used to search across all items in the CMDB
using the **Search resource...** field in the Guardrails Console.

![](/images/docs/guardrails/search.png)

This same syntax may be used in filter lists in the console. These filters are
implicitly scoped to the list type - A filter list on the **Resources** page
only contains resources, the **Controls** list only contains controls, etc.

Additionally, users can drill into resource explore pages and search from there,
restricting the results to only child resources of the currently selected
resource. Here we show an example of searching `bucket` at the AWS account
level. This returns only buckets within the account.

![](/images/docs/guardrails/search2.png)

The GraphQL API uses the exact same filter syntax for list queries (`resources`,
`controls`, `notifications`, etc).

![](/images/docs/guardrails/query.png)

![](/images/docs/guardrails/results.png)

### Advanced Full Text Search

Refer to the [Guardrails Filter Reference Page](reference/filter) for a complete
overview of Guardrails filters.

A filter can be negated with the `-` or `!` character

<div className="example"> 
To find resources that <b>do not</b> contain <code>demo</code> you can search for  <code>!demo</code> or <code>-demo</code>
</div>

The `search` keyword may be used to explicitly specify a full text search. In
addition to the full text filtering behavior described previously, `search`
allows you to specify "OR" conditions using a comma separated list of terms.

<div className="example"> 
To find resources that contain either <code>bucket</code> <b>OR</b> <code>demo</code>, use the <code>search</code> keyword: <code>search:bucket,demo</code>
</div>

Regular Expressions are also supported, and should be delimited with forward
slashes. Note that regular expressions will search the title only.

<div className="example"> 
To find resources whose title begins with <code>demo</code> use a regular expression: <code>/^demo/</code>
</div>

#### More full text examples

| Aim                                            | Filter text      |
| ---------------------------------------------- | ---------------- |
| Require foo                                    | `foo`            |
| Exclude foo                                    | `-foo`           |
| Exclude foo                                    | `!foo`           |
| Require "foo" and "bar"                        | `foo bar`        |
| Require "foo bar"                              | `"foo bar"`      |
| Exclude "foo bar"                              | `!"foo bar"`     |
| Require foo or bar                             | `search:foo,bar` |
| title starts with "foo"                        | `/^foo/`         |
| title contains "foo", case insensitive         | `/foo/i`         |
| title does not contain "foo", case insensitive | `!/foo/i`        |

## Filtering on specific properties

Guardrails allows searching and filtering on specific properties of an object.

The general format of a condition is: `{property}:{operator}{value}`:

- The `{property}` may be a
  [standard turbot property](reference/filter#standard-turbot-properties) or
  [any field using the `$.` syntax](reference/filter/resources#searching-resources-with-).
- The `{operator}` that may be used depends on the data type of the property
  being searched:
  - [Text/String Filters](reference/filter#text-filters)
  - [Numeric Filters](reference/filter#numeric-filters)
  - [IP Address & CIDR filters](reference/filter#ipcidr-filters)
  - [Date/Time Filters](reference/filter#datetime-filters)
  - [Tag Filters](reference/filter#tag-filters)
- The `{operator}` is optional, and the default behavior depends on the data
  type of the property being searched.

A condition can be negated by preceding the operator with `!` or `-`. Multiple
`{values}` can be joined with a comma to specify an "OR" condition. Multiple
whitespace separated conditions are joined as "AND" conditions.

## Scoping with `Levels`

Many Guardrails lists display resources from multiple levels of the resource
hierarchy. For example, it is possible to show all Control alarms for an
Account, or to show all the alarms for itself and it’s descendants. You can use
a[`levels` filter](reference/filter#hierarchical-filter-scopes) to specify the
scope of your search/filter.

| Aim                             | Filter text             |
| ------------------------------- | ----------------------- |
| Self only                       | `level:self`            |
| Descendants only                | `level:descendant`      |
| Immediate children only         | `level:children`        |
| Ancestors only                  | `level:ancestor`        |
| Self or Descendants             | `level:self,descendant` |
| Self or Descendants (alternate) | `level:all`             |

## More Examples

##### Resource filters

| Aim                                                      | Filter text                                               |
| -------------------------------------------------------- | --------------------------------------------------------- |
| AWS account 876515858155                                 | `resource:arn:aws:::876515858155 level:self`              |
| Resources in AWS account 876515858155                    | `resource:arn:aws:::876515858155 level:descendant`        |
| Resources with a "department" tag of "sales"             | `tags:department=/^sales$/i`                              |
| Resources created in the last week                       | `createTimestamp:>T-7d`                                   |
| Resources created or updated in the last 15 minutes      | `timestamp:>T-15m`                                        |
| EC2 Instances with private IP in the 172.31.6.0/24 range | `resourceType:instance $.PrivateIpAddress:<172.31.6.0/24` |
| Volumes larger than 1000MB                               | `resourceType:volume $.Size:>=1000`                       |
| Unattached Volumes                                       | `resourceType:volume $.Attachments.*.State:!attached`     |
| All compute and storage resources of any type            | `resourceCategory:compute,storage`                        |

#### Policy Settings

| Aim                                                               | Filter text                                         |
| ----------------------------------------------------------------- | --------------------------------------------------- |
| Settings that are orphaned by a higher level required setting     | `is:orphan`                                         |
| Settings that are orphaned by a higher level required setting     | `is:exception`                                      |
| Settings expiring in the next week, by expiration date descending | `validToTimestamp:<T+7d,>now sort:validToTimestamp` |
| Settings created/updated in the last day, newest first            | `timestamp:>T-1d sort:-timestamp`                   |

#### Policy Values

| Aim                                                              | Filter text                  |
| ---------------------------------------------------------------- | ---------------------------- |
| Policy values set to 'Check: Enabled'                            | `value:'Check: Enabled'`     |
| Policy Values for resources with a department tag set to 'sales' | `tags:department=/^sales$/i` |
| Policy Values that are not in an OK state                        | `state:-ok`                  |
| Policy values for CIS policy types                               | `policyType:cis`             |

#### Controls

| Aim                                         | Filter text                                     |
| ------------------------------------------- | ----------------------------------------------- |
| Controls in alarm or error                  | `state:alarm,error`                             |
| Approved controls for any bucket (AWS, GCP) | `resourceType:bucket controlType:approved`      |
| All alarms in the last hours                | `state:alarm timestamp:>T-1h`                   |
| All storage related tag controls            | `resourceCategory:storage controlCategory:tags` |
| All CIS controls                            | `controlCategory:cis`                           |

#### Notifications

| Aim                                                           | Filter text                                                                                                                                                                                                            |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Notifications for resources, newest first                     | `notificationType:resource sort:-timestamp`                                                                                                                                                                            |
| The last 100 deletion notifications of any type               | `notificationType:resourceDeleted,policySettingDeleted,policyValueDeleted,controlDeleted,actionDeleted,scheduledActionDeleted,grantDeleted,activeGrantsDeleted,favoriteDeleted,watchDeleted sort:-timestamp limit:100` |
| Recent permissions activity                                   | `notificationType:activeGrant,grant sort:-timestamp`                                                                                                                                                                   |
| Notifications for a specific actor (user) with it's profileId | `actorIdentityId:162674901433086`                                                                                                                                                                                      |

## Further Reading

See the [Filter Reference Documentation](reference/filter) for more detailed
information and examples, including filters for:

- [Resources](reference/filter/resources)
- [Policies](reference/filter/policies)
- [Controls](reference/filter/controls)
- [Notifications](reference/filter/notifications)
