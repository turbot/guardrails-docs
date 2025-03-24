---
title: Access Logging Guardrails
sidebar_label: Access Logging
---

# Access Logging Guardrails

## Overview

Access logging guardrails allow administrators to enable and store access
logging information for cloud resources. Access logs are great to help
understand the nature of requests to a particular resource, though it must be
noted that they are
[often not guaranteed delivery](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerLogs.html).
From a best practices security standpoint, it is almost always recommended to
have access logging configured if there is an option to do so.

Guardrails Access Logging policies can be found directly under the service in the
hierarchy:

- `{Provider} > {service} > {resource} > Access Logging`

<div className="example">
  <ul>
    <li><code>AWS > S3 > Bucket > Access Logging</code></li>
    <li><code>AWS > EC2 > Application Load Balancer > Access Logging</code></li>
    <li><code>AWS > EC2 > Classic Load Balancer > Access Logging</code></li>
    <li><code>AWS > EC2 > Network Load Balancer > Access Logging</code></li>
  </ul>
</div>

Below is the list of allowed values for a generic Access Logging policy. This is
not comprehensive as different resource types might have slightly different
verbage:

```
    Skip
    Check: Disabled
    Check: Enabled
    Check: Enabled to Access Logging > Bucket
    Enforce: Disabled
    Enforce: Enabled to Access Logging > Bucket
```

The Access Logging guardrail has a number of policy sub-settings to determine
what Guardrails is checking for. The format of these policy types is
`{Provider} > {service} > {resource} > Access Logging > {Items}`. For example:

```
    {Provider} > {service} > {resource} > Access Logging > Bucket
    {Provider} > {service} > {resource} > Access Logging > Key Prefix
```

### Policy Types Description

| Policy                                                             | Description                                                                              |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `{Provider} > {service} > {resource} > Audit Logging`              | Allows you to check or enforce access logging requirement for the resource.              |
| `{Provider} > {service} > {resource} > Audit Logging > Bucket`     | The name of a S3 bucket to which the resource access logs is stored.                     |
| `{Provider} > {service} > {resource} > Audit Logging > Key Prefix` | Define a folder (optional) inside S3 bucket to which the resource access logs is stored. |

**Notes**:

- The `AWS > S3 > Bucket > Access Logging` control will skip any buckets that
  are created as part of the `AWS > Turbot > Logging > Bucket` stack.
- For S3 access logs, the target bucket must be in the same region as the source
  bucket.
- Server access logs are delivered to the target bucket by a delivery account
  called the
  [Log Delivery group](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerLogs.html).
  The S3 log delivery group must have access to `write objects` and
  `read bucket ACL`.
- Similarly for EC2 load balancers, the bucket must have proper access granted.
  AWS provides documentation for
  [Application Load Balancers (ALB)](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html),
  [Network Load Balancers (NLB)](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-access-logs.html),
  and
  [Classic Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/access-log-collection.html)
  for prerequisite steps prior to enabling Access Logging.
- For more details refer
  [Enabling Amazon S3 server access logging](https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-server-access-logging.html).
- [Access log requests are delivered on a best-effort basis](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerLogs.html).
  AWS recommends that you use access logs to understand the nature of the
  requests, not as a complete accounting of all requests. It is good to keep
  this in mind when dealing with access logging in other cloud providers, too.

## Access Logging for Guardrails Managed Buckets

Guardrails provides policies to allow the automatic creation of logging buckets for
use in services that require them. Guardrails logging bucket creation is managed by
a stack, `AWS > Turbot > Logging > Bucket`, and is targeted at AWS regions. For
more information, refer
[Stacks and Configured guardrail](concepts/guardrails/configured).

The Guardrails Access Logging guardrail has a number of policy sub-settings to
determine the attributes of the access logging check. The format of these policy
types is `{Provider} > Turbot > Logging > Bucket > Access Logging > {Items}`:

```
    {Provider} > Turbot > Logging > Bucket > Access Logging
    {Provider} > Turbot > Logging > Bucket > Access Logging > Bucket
    {Provider} > Turbot > Logging > Bucket > Access Logging > Key Prefix
```

Example family of policies:

<div className="example">
  <ul>
    <li><code>AWS > Turbot > Logging > Bucket > Access Logging</code></li>
    <li><code>AWS > Turbot > Logging > Bucket > Access Logging > Bucket</code></li>
    <li><code>AWS > Turbot > Logging > Bucket > Access Logging > Key Prefix</code></li>
  </ul>
</div>

Example policy values:

<div className="example">
<pre>
    # AWS > Turbot > Logging > Bucket > Access Logging
      - Disabled
      - Enabled
</pre>
</div>

| Policy                                                                 | Description                                                                             |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `{Provider} > Turbot > Logging > Bucket > Access Logging`              | Allows you to enable or disable access logging requirement for the services.            |
| `{Provider} > Turbot > Logging > Bucket > Access Logging > Bucket`     | The name of a S3 bucket to which the services access logs is stored.                    |
| `{Provider} > Turbot > Logging > Bucket > Access Logging > Key Prefix` | Define a folder(Optional) inside S3 bucket to which the services access logs is stored. |

**Note**:

- Server access logs are delivered to the target bucket by a delivery account
  called the
  [Log Delivery group](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerLogs.html).
  The S3 log delivery group must have access to `write objects` and
  `read bucket ACL`.
