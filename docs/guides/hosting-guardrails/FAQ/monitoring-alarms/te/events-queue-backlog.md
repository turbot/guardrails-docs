---
title: "Events Queue Backlog"
template: Documentation
nav:
  title: "Events Queue Backlog"
  order: 60
---

# Events Queue Backlog (Count)

**AlarmName**: `<prefix>_<te_version>_events_queue_messages_visible_alarm`
(example: `turbot_5_40_0_events_queue_messages_visible_alarm`).

**Configuration**: The Lambda reserved concurrency is configured in the
"Advanced - Worker" section of TEF. All the new TE installations will pick the
value from the TEF. You can also over ride this value at the TE by giving it a
new value. When making any changes to the `WorkerLambdaReservedConcurrency` at
the TEF, please remember to flip the "Parameter Deployment Trigger" of the TE
from Blue to Green or vice-versa.

**Condition**: ApproximateNumberOfMessagesVisible >= 5000 for 3 datapoints
within 15 minutes.

**Healthy**: Backlog (red) and running tasks (orange) are low (often zero) with
short buildups (< 30 mins) associated with events like resource imports, mod
updates, etc.

**Overloaded**: Sustained backlog growth (red) indicating that ECS workers
cannot keep up with incoming events. Increase capacity or check for a flood of
unnecessary events.

**Stalled processing**: Running tasks (orange) appear for long periods.
Typically indicates a misconfigured mod failing to terminate the task.

## Troubleshooting

- **How many events are in the events queue?**: 10K, 100K, 1 million?
- **When did the event backlog start?**: To the nearest 15 minutes, when did the
  backlog start?
- **Worker Concurrency**: Is the worker concurrency maxed out?
- **Policy Changes**: Were any policy changes made before the start of the
  backlog?
- **Guardrails Master Changes**: Were any changes made to the Guardrails application?

Answer to these questions will come from the Turbot Guardrails Enterprise (TE) CloudWatch
dashboard.

If the backlog is not consistent and can be co-related to an activity that was
just performed on the workspace, then no action is needed. Give it some time for
the backlog to clear. Activities such a installing/upgrading a mod, importing an
account, setting a policy that effects thousands of resources usually generates
a lot of queue backlog and should settle down soon.

Crosscheck the settings of the environment and make sure there is no
misconfiguration. The Lambda Concurrency should not be too high and should be
fine tuned by observing for a couple of days. Lambda concurrency of 80 is a safe
number, but depends on the size of the installation. Also look for the TEF
parameters `WorkerLambdaMessageBatch` and `WorkerLambdaMaxDBConnections`, these
should be the same value and most of the time it is 2. It is configured to 4 in
rare occasions. The lambda concurrency should not be too high to overwhelm the
DB connections. Keep an eye on the number of DB connections when you are
increasing the lambda concurrency.

If the backlog is consistent and you see a pattern in the backlog queue getting
flooded, please refer to the
[event flood](enterprise/troubleshooting/event-flood) documentation.

### Need help?

Please reach out to [Turbot Support](mailto:support@turbot.com) with the
following information on your Guardrails environment:

- Turbot Guardrails Enterprise (TE) Version(s)?: (e.g. v5.40.0)
- Turbot Guardrails Master Account: (e.g. 111222333444)
- The `WorkerLambdaMessageBatch`, `WorkerLambdaMaxDBConnections` and
  `WorkerLambdaReservedConcurrency` parameter values from TEF.
- A screenshot of the events queue backlog in CloudWatch.
