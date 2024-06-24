---
title: Filter Rules
sidebar_label: Filter rules
---

# Notification Filter Rules

Filter rules are the heart of the Notification system. They control what types of notifications are sent and where they go. There is one global configuration for all notification filter rules located in the `Turbot > Notifications > Rule-Based Routing` policy setting:

![](/images/docs/guardrails/filter-rules.png)

A rule-based routing policy is a mechanism that allows users to filter notifications based on a set of rules. These rules can specify certain conditions or criteria that must be met in order for a notification to be sent to a particular target audience.

For example, a user may create a rule that specifies that notifications should only be sent for a particular resource or control type. If the condition of the rule is satisfied, then the notification will be sent to the target audience. The target audience can be a specific email address, a group of users, or a webhook URL that triggers an action in another system.

By using the notification filter policy, users can reduce noise and ensure that only relevant notifications are sent to the appropriate recipients. This can help to improve the overall efficiency of the notification system and reduce the amount of time users spend processing notifications that are not relevant to their responsibilities.

