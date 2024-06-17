---
title: 'notifications'
template: Documentation
sidebar_label: notifications
deprecated: false
nav:
  title: 'notifications'
  order: 10
---

# notifications

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">notifications</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>, dataSource: <a href="/guardrails/docs/reference/graphql/enum/NotificationDataSource">NotificationDataSource</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/Notifications">Notifications</a></span>
</div>



List all `notifications` that match the optional `filter`, starting from the optional `paging` token. Use `dataSource` (optional) to restrict the data from DB, defaults to [ALL], accepted value `ALL` & `DB`. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `notifications` that you have `metadata` permissions to. `Metadata` permissions means any `notifications` whose `resource` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).