---
title: Trusted Access Guardrails
sidebar_label: Trusted Access
---

# Trusted Access Guardrails

## Overview

Trusted Access guardrails allow you to define whom and what you trust and
enforce those limitations on your cloud resources. With Guardrails Trusted Access
policies, you can define which accounts, services, and organizations are allowed
to be granted access your resources. The Trusted Access control can audit or
enforce those policies, giving centralized control over trusted boundaries.

Many examples here will list AWS, but these policies also are available for
Azure and GCP resources.

## Policies and Controls

Trusted Access controls are generally divided into two patterns:

- [Simple List Pattern](#simple-list-pattern)

- [IAM Resource Policy Pattern](#iam-resource-policy-pattern)

## Default Policies

Default policies at the account level allow administrators to define trusted
boundaries centrally for all services. However, these can be overrode by either
defining resource type specific Trusted Access policies, or by setting an
exception for the default policy.

### Account-level Defaults

The value for all of the account-level default policies is to allow everything:
`*`

| Policy                                                 | Description                    |
| ------------------------------------------------------ | ------------------------------ |
| `AWS > Account > Trusted Accounts [Default]`           | A list of AWS account IDs      |
| `AWS > Account > Trusted Organizations [Default]`      | A list of AWS organization IDs |
| `AWS > Account > Trusted Identity Providers [Default]` | A list of Identity providers   |
| `AWS > Account > Trusted Service [Default]`            | A list of AWS services         |

### Service-level Defaults

The value for all of the service-level default policies is to allow everything:
`*`

| Policy                                                   | Description                    |
| -------------------------------------------------------- | ------------------------------ |
| `AWS > {Service} > Trusted Accounts [Default]`           | A list of AWS account IDs      |
| `AWS > {Service} > Trusted Organizations [Default]`      | A list of AWS organization IDs |
| `AWS > {Service} > Trusted Identity Providers [Default]` | A list of Identity providers   |
| `AWS > {Service} > Trusted Service [Default]`            | A list of AWS services         |

### Simple List Pattern

Some resource types allow you to grant access to other accounts.

Guardrails solves this with two policies:

- `Trusted Access`: Allows you check or enforce whether the sharing is allowed
  or not, and to which accounts. Allows administrators to configure if Guardrails
  will check or enforce Trusted Access.
- `Trusted Access > Accounts`: Allows you to specify the list of AWS account IDs
  that are trusted.

For resources that support cross account access, Guardrails can check or enforce to
the list of AWS accounts. These policies can be found directly under the service
in the hierarchy:

- `{Provider} > {Service} > {Resource} > Trusted Access`
- `{Provider} > {Service} > {Resource} > Trusted Access > Accounts`

<div className="alert alert-info" role="alert">
<b>Example:</b> Trusted Access policies for EC2 Snapshots:
  <ul>
    <li><code>AWS > EC2 > Snapshot > Trusted Account </code></li>
    <li><code>AWS > EC2 > Snapshot > Trusted Account > Accounts</code></li>
  </ul>
  </div>

Acceptable Trusted Access policy values are consistent across resource types:

| Value                                | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| `Skip`                               | Skip - no action taken                                     |
| `Check: Trusted Access > Accounts`   | To check access is granted to the list of trusted accounts |
| `Enforce: Trusted Access > Accounts` | To enforce, access to non-trusted accounts are removed     |

### IAM Resource Policy Pattern

Many resources allow users to grant access directly on the resource itself via a
resource policy. The Trusted Access control will evaluate and modify access
granted in said resource policy.

Guardrails allows Trusted Access configurations via this list of policies. Note that
while they all exist, is not necessary to configure all of them in order to
enforce or check resources for unauthorized access:

- `Trusted Access`: Allows administrators to check or enforce whether the
  sharing is allowed or not and to which accounts, services, and federated
  users.
- `Trusted Access > Accounts`: Allows administrators to specify the list of AWS
  account IDs that are trusted to access the resource.
- `Trusted Access > Organization Restrictions`: Allows administrators to specify
  the list of AWS organization IDs that are trusted to access the resource.
- `Trusted Access > Identity Providers`: Allows administrators to specify the
  list of Identity Providers that are trusted to access the resource.
- `Trusted Access > CloudFront Origin Access Identities`: Allows administrators
  to specify the list of CloudFront Origin Access Identities (OAIs) that are
  trusted to access the resource.
- `Trusted Access > Services`: Allows administrators to specify the list of AWS
  Services that are trusted to access the resource.

These policies can be found under the service in the hierarchy:

- `{Provider} > {Service} > {Resource} > Policy > Trusted Access`
- `{Provider} > {Service} > {Resource} > Policy > Trusted Access > Accounts`
- `{Provider} > {Service} > {Resource} > Policy > Trusted Access > Organization Restriction`
- `{Provider} > {Service} > {Resource} > Policy > Trusted Access > Identity Providers`
- `{Provider} > {Service} > {Resource} > Policy > Trusted Access > CloudFront Origin Access Identities`
- `{Provider} > {Service} > {Resource} > Policy > Trusted Access > Services`

<div className="alert alert-info" role="alert">
<b>Example:</b> S3 Trusted Access policy family:
  <ul>
    <li><code>AWS > S3 > Bucket > Policy > Trusted Access</code></li>
    <li><code>AWS > S3 > Bucket > Policy > Trusted Access > Accounts</code></li>
    <li><code>AWS > S3 > Bucket > Policy > Trusted Access > Organization Restriction</code></li>
    <li><code>AWS > S3 > Bucket > Policy > Trusted Access > Identity Providers</code></li>
    <li><code>AWS > S3 > Bucket > Policy > Trusted Access > CloudFront Origin Access Identities</code></li>
    <li><code>AWS > S3 > Bucket > Policy > Trusted Access > Services</code></li>
  </ul>
  </div>

Again, acceptable Trusted Access policy values are consistent across resource
types:

| Value                              | Description                                                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `Skip`                             | Skip - no action taken                                                                                                          |
| `Check: Trusted Access`            | To check access is granted to the list of AWS accounts, Organizations, Services, Identity Providers, and OAIs set on the policy |
| `Enforce: Revoke untrusted access` | To enforce, access to non-trusted members are removed                                                                           |

**Note**:

- The `Trusted Access` control only evaluates access granted to **external
  entities** for the resource in the resource policy.
- All the `Trusted Access` sub-policies might not be applicable for all resource
  types.
- The `Trusted Access` control only applies to policy statements that allow
  access (where effect is allow). Deny statements are ignored by the control.
- Both `Trusted Access > Accounts` and
  `Trusted Access > Organization Restrictions` apply to AWS principals, and are
  evaluated independently. To have access, a principal must be allowed in
  `Trusted Access > Accounts` AND be a member of an Organization that is allowed
  in `Trusted Access > Organization Restrictions`
- A Service Principal that is allowed per `Trusted Access > Services` may also
  restrict the source resource to accounts per
  `Trusted Access > Services > Source Account Restrictions` via a condition.
  - When the service supports `aws:Source*` conditions, Guardrails will evaluate the
    `aws:Source*` conditions on that statement and amend (or add the
    `aws:SourceAccount` condition) to remediate. S3 Bucket notifications to SNS
    are an example of such a situation.
  - When the service (such as CloudTrail) does not support `aws:Source*`
    conditions, Guardrails will not enforce this restriction on that statement.

### Example: AWS > S3 > Bucket > Policy > Trusted Access

First, assume that the bucket policy is trusting the account `123456789210` that
is under the organization `o-c6v5d4wd43`. The identity provider granted access
in the bucket policy is `www.facebook.com`. The service granted access to the
bucket via existing bucket policies is `ec2.amazonaws.com`, and the CloudFront
Origin Access Identity with access is defined as `E1QK6X5E0FOET6`. The following
policies have been configured in Guardrails:

- **AWS > S3 > Bucket > Policy > Trusted Access** is set to
  `Check: Trusted Access`.
- **AWS > S3 > Bucket > Policy > Trusted Access > Accounts** is set to
  `- 123456789210`.
- **AWS > S3 > Bucket > Policy > Trusted Access > Organization Restriction** is
  set to `- o-c6v5d4wd43`.
- **AWS > S3 > Bucket > Policy > Trusted Access > Identity Providers** is set to
  `- www.google.com`.
- **AWS > S3 > Bucket > Policy > Trusted Access > Services** is set to
  `- sns.amazonaws.com`.
- **AWS > S3 > Bucket > Policy > Trusted Access > CloudFront Origin Access
  Identities** is set to `E1QK6X5E0FOET6`.

In order, these policies will evaluate `Accounts`, `Organization Restriction`,
and `CloudFront Origin Access Identities` as trusted, but `Identity Providers`
and `Services` as untrusted. The policy evaluation will result the control being
in the **ALARM** state.

**Sample S3 bucket policy for the above example**:

```json
{
  "Version": "2012-10-17",
  "Id": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadAccess",
      "Effect": "Allow",
      "Principal": {
        "Federated": "www.facebook.com"
      },
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::bucketexample01"
    },
    {
      "Sid": "WriteAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E1QK6X5E0FOET6"
      },
      "Action": "s3:PutBucket",
      "Resource": "arn:aws:s3:::bucketexample01"
    },
    {
      "Sid": "ReadAccess1",
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::bucketexample01"
    },
    {
      "Sid": "WriteAccess1",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789210:root"
      },
      "Action": "s3:PutBucket",
      "Resource": "arn:aws:s3:::bucketexample01",
      "Condition": {
        "StringEquals": {
          "aws:PrincipalOrgID": "o-c6v5d4wd43"
        }
      }
    }
  ]
}
```
