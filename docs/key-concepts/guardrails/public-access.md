---
title: Public Access Guardrails
sidebar_label: Public Access
---

# Public Access Guardrails

## Overview

As the number of cloud resources in environments expands, it becomes
increasingly difficult to ensure a tight network perimeter. Public
Access Guardrails monitor cloud resources for possible misconfigurations, such
as exposed RDS instances or S3 buckets. Not only can the guardrail generate an
alarm for immediate action, it can _take_ the action itself (in the RDS example,
sets the attribute `PubliclyAccessible` on an RDS instance to `False`.)

To Guardrails, a resource is public if it shared in such a way that anyone can
access it - it is not restricted to a discrete list of entities, or from a
limited network boundary. Additionally, many cloud resources, such as the RDS
instance, have an attribute that can be toggled to allow or block public access.

The core Public Access policy has a consistent form:
`{Provider} > {service} > {resource} > Publicly Accessible`

<div className="example">
  <ul>
    <li><code>AWS > Redshift > Cluster > Publicly Accessible</code></li>
    <li><code>AWS > RDS > DB Instance > Publicly Accessible</code></li>
  </ul>
</div>

The basic form of the above policies is as follows:

```
Skip
Check: {resource} is not publicly accessible
Enforce: {resource} is not publicly accessible
```

<div className="example">
<pre>
    # AWS > Redshift > Cluster > Cluster Publicly Accessible
    - Skip
    - Check: Cluster is not publicly accessible
    - Enforce: Cluster is not publicly accessible
</pre>
</div>

### Example: Enforce all RDS instances to be not publicly accessible

RDS instances have a option Publicly Accessible attribute that can be set to
`Publicly Accessible` at any time. In this example, we want to ensure that no
RDS instance is set to `Publicly Accessible`, and if it is, change the value
from `Publicly Accessible` to `Not Publicly Accessible`.

Set the following policy at a level where RDS instances have the setting, either
at a high level so that instances inherit the policy definition or at the RDS
instance level itself:

- **AWS > RDS > DB Instance > Publicly Accessible** set to
  `Enforce: DB Instance is not publicly accessible`.

When Guardrails discovers a RDS instance, the `PubliclyAccessible` will be checked.
If that attribute is set to `True`, Guardrails will modify the value to `False` with
no human action required!

### S3 Public Access Block

S3 accounts and buckets have
[`Public Access Block` settings](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html)
that Guardrails can check for misconfigurations. Administrators can choose to change
the configurations to that which is approved, or simply alarm. In this example,
all public access settings are configured to true.

#### Account Settings

Set the policy `AWS > S3 > Account > Public Access Block` to
`Check: Per 'Public Access Block > Settings'`

Set the policy `AWS > S3 > Account > Public Access Block > Settings` to the
following:

```yaml
- "Block Public ACLs"
- "Block Public Bucket Policies"
- "Ignore Public ACLs"
- "Restrict Public Bucket Policies"
```

#### Bucket Settings

Set the policy `AWS > S3 > Bucket > Public Access Block` to
`Check: Per 'Public Access Block > Settings'`

Set the policy `AWS > S3 > Bucket > Public Access Block > Settings` to the
following:

```yaml
- "Block Public ACLs"
- "Block Public Bucket Policies"
- "Ignore Public ACLs"
- "Restrict Public Bucket Policies"
```
