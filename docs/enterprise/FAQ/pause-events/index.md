---
title: "Pause Event Processing"
template: Documentation
nav:
  order: 50
---

# Pause Event Processing

## When to use this guide?

This guide describes how to pause processing of events during maintenance windows. These pauses are most often used when
making changes to a Guardrails database(s) to avoid lost events.

The central hub of the Guardrails application are the Worker Lambdas, identified with the `_worker_*` suffixes. When the triggers for
these Lambdas are disabled, event processing halts.

This document will assume the resource prefix is `turbot_`. Your environment may use a different resource prefix.

## Implications of Paused Event Processing

When event processing is disabled, Guardrails will be unable to run controls, apply policy settings nor make remediations in
managed cloud accounts. After processing has restarted, the backlog of changes will be processed. How long will depend on
Guardrails' provisioned throughput capacity and the amount of environment change during the pause. The Guardrails console will
still be available during the outage except for the periods where the database is unresponsive.

## Disable Event Processing

Disabling the SQS triggers for the TE worker Lambdas are sufficient to pause processing. (No changes should be made to
mod lambdas.)  In environments with multiple TE deployments, event processing must be halted for all TE versions using
the concerned hive/database. (Get a list of which TEs are associated with which databases by examining the TE and Hive
parameters in all Workspace CloudFormation templates.)

Navigate to AWS Lambda service and search for the functions with suffix `_worker`, `_worker_priority`
and `_worker_retry`. No changes are required to any other Guardrails deployed Lambdas.

Below are some examples of such Lambda functions:

* `turbot_5_39_12_worker_priority`
* `turbot_5_39_12_worker`
* `turbot_5_39_12_worker_retry`

![](/images/docs/guardrails/function_overview.png)

* Navigate to each of these Lambda functions and click on the "Configuration" tab.
* Select "Triggers" sub-tab and look for the trigger corresponding to the function.
* Choose the trigger by clicking on the checkbox and click on Edit.
* In the "Trigger configuration" page, uncheck the "Activate trigger" option to push the events to backlog queue.

![](/images/docs/guardrails/disable-trigger.png)

## Enable Event Processing

As soon as the database changes are done, navigate to Lambda service and enable the triggers for the functions which
were disabled earlier. If the changes are related to database storage, the database can be in "storage-optimization"
state, you can still enable the lambda triggers.

* Navigate to each of these Lambda functions and click on the "Configuration" tab.
* Select "Triggers" sub-tab. Look for the trigger corresponding to the function.
* Choose the trigger by clicking on the checkbox and click on Edit.
* In the "Trigger configuration" page, check the "Activate trigger" option to enable the events.

![](/images/docs/guardrails/enable-trigger.png)

### Need help?

Please reach out to [Turbot Support](mailto:support@turbot.com) if there are questions or issues.
