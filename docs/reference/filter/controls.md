---
title: Controls
template: Documentation
nav:
  order: 30
---

# Controls

## Filtering Controls

You can use the `controls` filter to search and filter Controls in the Turbot Guardrails
Console or GraphQL.

- The `controls` filter supports the standard `sort` and `limit` keywords
- Filter controls by [Standard Turbot Guardrails metadata properties](reference/filter#standard-turbot-properties)
  such as `timestamp`, `createTimestamp`, etc. Note that you cannot search on 
  `actorIdentityId` or `title` in `controls` filters.
- [Full Text Search](reference/filter#full-text-search) will search/filter both
  the Control and the Resource
- Filter controls by the [Control State](concepts/controls#control-states) using the `state` keyword.
  Possible values are:
  - `error`
  - `invalid`
  - `alarm`
  - `ok`
  - `skipped`
  - `tbd`
  - `active`(`ok`,`alarm`,`invalid`,`error`)
- Filter by [Tag Filters](reference/filter#tag-filters). Note that the tag
  filters are **Resource** filters - they filter controls on **resources** with
  these tags.
- You can filter the scope with
  [Hierarchy Scope Filters](reference/filter#hierarchical-filter-scopes). Note
  that these are implicitly set when filtering the on a controls page in the Turbot Guardrails 
  Console
