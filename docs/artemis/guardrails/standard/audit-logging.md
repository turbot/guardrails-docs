---
title: Audit Logging Guardrails
sidebar_label: Audit Logging
---

# Audit Logging Guardrails

## Overview

Audit Logging guardrails allow administrators to enable logging on the cluster
and databases. With Turbot Guardrails Audit Logging policies, administrators can define
where to store the logs depending on the resource. The Audit Logging control can
audit or enforce those policies, giving centralized control over data that is
stored, such as data subject to compliance or regulatory requirements.

The core Audit Logging policy has a consistent form:
`{Provider} > {service} > {resource} > Audit Logging`

<div className="example">
  <ul>
    <li><code>AWS > Redshift > Cluster > Audit Logging</code></li>
    <li><code>Azure > PostgreSQL > Server > Audit Logging</code></li>
  </ul>
</div>

Below are the list of allowed values for the Audit Logging policy. Depending on
the resource type it can be different. The basic form is:

```
    Skip
    Check: Disabled
    Check: Enabled
    Check: Enabled to Audit Logging > Bucket
    Enforce: Disabled
    Enforce: Enabled to Audit Logging > Bucket
    Check: Audit Logging > *
    Enforce: Audit Logging > *
```

<div className="example">
<pre>
    # AWS > Redshift > Cluster > Audit Logging
    - Skip
    - Check: Disabled
    - Check: Enabled
    - Check: Enabled to Audit Logging > Bucket
    - Enforce: Disabled
    - Enforce: Enabled to Audit Logging > Bucket
</pre>
<pre>
    # Azure > PostgreSQL > Server > Audit Logging
    - Skip
    - Check: Audit Logging > *
    - Enforce: Audit Logging > *
</pre>
</div>

The Audit Logging guardrail for AWS resources has a number of policy
sub-settings to determine the attributes of the audit logging check. The format
of these policy types is
`{Provider} > {service} > {resource} > Audit Logging > {Items}`:

```
    {Provider} > {service} > {resource} > Audit Logging > User Activity Logging
    {Provider} > {service} > {resource} > Audit Logging > Bucket
    {Provider} > {service} > {resource} > Audit Logging > Key Prefix
```

The Audit Logging guardrail for Azure resources have a number of policy
sub-settings to determine the attributes of the audit logging check. The format
of these policy types is
`{Provider} > {service} > {resource} > Audit Logging > {Items}`:

```
    {Provider} > {service} > {resource} > Audit Logging > Log Checkpoints
    {Provider} > {service} > {resource} > Audit Logging > Log Retention Days
    {Provider} > {service} > {resource} > Audit Logging > Log Duration
    {Provider} > {service} > {resource} > Audit Logging > Log Connections
    {Provider} > {service} > {resource} > Audit Logging > Log Disconnections
```

### Policy Types Description

| Policy                                                                        | Description                                                                            |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `{Provider} > {service} > {resource} > Audit Logging`                         | Allows you to check or enforce audit logging requirement for the resource.             |
| `{Provider} > {service} > {resource} > Audit Logging > User Activity Logging` | Define the user activity audit logging settings required for the resource.             |
| `{Provider} > {service} > {resource} > Audit Logging > Bucket`                | The name of a S3 bucket to which the resource audit logs is stored.                    |
| `{Provider} > {service} > {resource} > Audit Logging > Key Prefix`            | Define a folder(Optional) inside S3 bucket to which the resource audit logs is stored. |
| `{Provider} > {service} > {resource} > Audit Logging > Log Checkpoints`       | Sets desired value for each checkpoint.                                                |
| `{Provider} > {service} > {resource} > Audit Logging > Log Retention Days`    | Sets the number of days a log file is saved for.                                       |
| `{Provider} > {service} > {resource} > Audit Logging > Log Duration`          | Sets the desired value to log the duration of each completed SQL statement.            |
| `{Provider} > {service} > {resource} > Audit Logging > Log Connections`       | Sets the desired value to log each successful connection.                              |
| `{Provider} > {service} > {resource} > Audit Logging > Log Disconnections`    | Sets the desired value to log end of a session, including duration.                    |

**Note**:

- The `Audit Logging` control evaluates and take actions if and only if the
  parameter group of the cluster is not the default and is not shared with any
  other cluster. If these conditions are not met, the control is set in the
  `invalid` state.
- The S3 bucket configured to inject the logs must exist in the same region as
  the cluster and the Redshift service must be allowed write access.
