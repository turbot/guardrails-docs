---
title: 'controlSummariesByControlCategory'
template: Documentation
sidebar_label: controlSummariesByControlCategory
deprecated: false
nav:
  title: 'controlSummariesByControlCategory'
  order: 10
---

# controlSummariesByControlCategory

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">controlSummariesByControlCategory</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(filter: [<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!], paging: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/ControlSummariesByControlCategory">ControlSummariesByControlCategory</a></span>
</div>



List summary information for `controls`, aggregated by `controlCategory`, that match the optional `filter`, starting from the optional `paging` token. For more information, please see [Filters](https://turbot.com/guardrails/docs/reference/filter).

The results are limited to `controls` that you have `metadata` permissions to. `Metadata` permissions means any `controls` whose targeted `resource` you have `Turbot/Metadata` permissions or above on. For more information, please see [Permissions](https://turbot.com/guardrails/docs/concepts/iam/permissions).