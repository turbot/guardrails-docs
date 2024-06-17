---
title: "Worker Lambda Duration"
template: Documentation
nav:
  title: "Worker Lambda Duration"
  order: 100
---

# Worker Lambda duration

**AlarmName**: `<prefix>_<te_version>_worker_lambda_duration_alarm` (example: `turbot_5_40_0_worker_lambda_duration_alarm`).

**Configuration**: The amount of time that worker lambda function code spends processing an event. The billed duration for an invocation is the value rounded up to the nearest millisecond. The "Timeout for Worker Lambda" is configured in the "Advanced - Worker" section of TEF. All the new TE installations will pick the value from the TEF. You can also over ride this value at the TE by giving it a new value. When making any changes to the `WorkerLambdaTimeout` at the TEF, please remember to flip the "Parameter Deployment Trigger" of the TE from Blue to Green or vice-versa.

**Condition**: Duration >= 350000 for 1 datapoints within 1 minute.

**Healthy**: All metrics are consistently low with a relatively small difference from Average to p90 and p99. Occasional, non-periodic spikes on the Max metric are okay.

**Periodic Slow Running Queries**: If the max metric is high but all other metrics are low, this indicates that a single or small set of queries are taking a long time. Investigate by looking at the Worker Lambda CloudWatch for durations matching the Max metric.

**Large Spread in Metrics**: A large spread in metrics from Avg to p90, p99 and Max indicates a greater portion of Worker Lambda runs are taking longer.

## Troubleshooting

This is the duration taken for Lambda function execution. The worker lambda has a max timeout in seconds defined by the parameter `WorkerLambdaTimeout` (defaults to 350 seconds) and the executions are supposed to finish within these 350 seconds.

* The function duration take take long for various reasons. Always make sure the DB is not overwhelmed and there is enough room for CPU/memory.
* The lambda concurrency is too high and trying to process to many executions than the DB can actually handle.
* The SQS queue is pushing too many messages to the lambda causing a delay in executions. Try to make use of the "SQS Trigger concurrency" to set the concurrency for Lambda SQS Triggers. This should not be higher than the Lambda concurrency.
* If there are too many messages at all times, probably the environment is too busy and there are multiple workspaces pointing to the same TE version. It is recommended to use multiple TEs to split the load evenly.
* There could be a mod or a query that is consuming too much time to finish, though the DB utilization is under threshold. Please pass on the query to Turbot Support so that we can fine tune the query.

### Need help?
Please reach out to [Turbot Support](mailto:support@turbot.com) with the collected information.

* The current TE version being used.
* The `WorkerLambdaTimeout` parameter value from TEF and `WorkerLambdaTimeoutSsmValue` parameter value from TE.
* A screenshot of the CloudWatch TE Dashboard with the widgets "Events Queue Activity", "Events Queue Backlog" and "Worker Lambda - Duration".
* A screenshot of the CloudWatch TE Dashboard with all the widgets/tables under the "Activities" section.
