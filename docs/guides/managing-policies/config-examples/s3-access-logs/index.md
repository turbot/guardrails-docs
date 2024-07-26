---
title: AWS S3 Access Logs
sidebar_label: AWS S3 Access Logs
---

# AWS S3 Access Logging Policy Configuration

This guide will detail how to enforce S3 access logging, configure the bucket to
send the logs, and adding a prefix to the log. In this example, we will enforce
access logging on every bucket within an AWS account, configure the access
logging such that the logs are shipped to another bucket within the same
account, and add a prefix so the log files are put into a folder called
`Access-Logs`.

<div class = "alert alert-warning">
This example, along with just about any policy pack in Guardrails, can be deployed using Terraform. Check it out at the <a href="https://github.com/turbot/guardrails-samples/tree/main/policy_packs/aws/s3/enforce_access_logging_is_enabled_for_buckets" target="_blank">Guardrails Samples Repo</a>.
</div>

The Guardrails mod `aws-s3` being installed is a prerequisite of this guide.

**NOTE**: This is specifically for account owned S3 buckets. Guardrails will deploy
logging buckets to AWS accounts upon import if the policy
`AWS > Turbot > Logging > Bucket` is set to `Enforce: Configured`.

The same methodology in this guide can be applied to Guardrails logging buckets to
enable access logging. However, to enable access logging on Guardrails logging
buckets, the policy `AWS > Turbot > Logging > Bucket > Access Logging` will need
to be set to `Enabled`, NOT the policy `AWS > S3 > Bucket > Access Logging`!

This will need to be used in conjunction with the policy
`AWS > Turbot > Logging > Bucket > Access Logging > Bucket` and
`AWS > Turbot > Logging > Bucket > Access Logging > Bucket > Key Prefix` to
define the bucket to ship logs to and the S3 prefix to use, respectively.

## Configure Log Destination

Log into Guardrails as an Administrator. Select the **Policies** tab, then click on
the green **New Policy Setting** button.

This opens new page with the title **Create Policy Setting**. Click on the
**Policy Type** field, search for the string `aws S3 access logging key prefix`.
Select the result with the title
`AWS > S3 > Bucket > Access Logging > Key Prefix`.

Select the **Resource** as the AWS account where the policy setting will live.
The setting will affect all resources at the specified level and below in the
[policy hierarchy](concepts/policies/hierarchy).

In the **Setting** text box, the desired prefix for access logs can be defined.
For this example, we want to ship access logs to a folder titled `Access-Logs`.
This can be set by simply adding the text: `Access-Logs/`into the field. Notice
the trailing slash. Without this slash, AWS will simply append any text in this
field to the beginning of the log file name.

For example, if the access logs were titled `aws-access-logs-123` (for
simplicities sake) and the text `Access-Logs` was set as the prefix, the log
files would then become `Access-Logsaws-access-logs-123`. Using multiple slashes
(`/`), it is possible to create nested folders, such as `Access-Logs/foo/bar/`.

Once the policy setting is set, click the **Create** button.

![log-destination](/images/docs/guardrails/log-destination.png)

## Configure Bucket to Receive Access Logs

Select the **Policies** tab, then click on the green **New Policy Setting**
button.

This opens new page with the title **Create Policy Setting**. Click on the
**Policy Type** field, search for the string `aws S3 access logging`. Select the
result with the title `AWS > S3 > Bucket > Access Logging > Bucket`.

Select the **Resource** as the AWS account where the policy setting will live.

In the **Setting** text field, simply input the bucket name for which the logs
should be sent to. If we assume the bucket that should receive the logs is
titled `access-logging-receiving`, simply enter that name into the text field
and click **Create**.

![logging-bucket](/images/docs/guardrails/logging-bucket.png)

## Enforce S3 Access Logging

Select the **Policies** tab, then click on the green **New Policy Setting**
button.

This opens new page with the title **Create Policy Setting**. Click on the
**Policy Type** field, search for the string `aws S3 access logging`. Select the
result with the title `AWS > S3 > Bucket > Access Logging`.

Select the **Resource** as the AWS account where the policy setting will live.

Guardrails provides a few different options for this policy. **Skip** is exactly
that - this will not be enforced on S3 buckets. The three different **Check**
options tells the access logging control to check an S3 bucket for disabled or
enabled access logging (along with checking the bucket which logs are being
shipped to if the **Enabled to Access Logging > Bucket** is selected), but it
will NOT make changes. Finally, the **Enforce** settings will trigger the
control and Guardrails will make changes to the bucket if necessary.

Select the **Enforce: Enabled to Access Logging > Bucket** option, then click
**Create**.

![access-logging](/images/docs/guardrails/access-logging-enabled.png)

## Verify the Configuration

It is important to verify that a policy setting is taking effect in the expected
manner. This can be verified by navigating to any S3 bucket that should now have
access logging configured and checking the metadata. Alternatively, access logs
can be generated by a user (for example, by viewing an object in a bucket) and
subsequently monitor the expected access logging bucket to ensure that the files
are being correctly stored.
