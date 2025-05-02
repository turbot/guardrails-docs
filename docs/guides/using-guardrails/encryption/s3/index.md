---
title: "S3 Bucket Encryption Configuration in Guardrails"
sidebar_label: "S3 Encryption"
guide_type: "guide"
---

# S3 Bucket Encryption Configuration in Guardrails

Guardrails provides automated management of S3 bucket encryption through its Agent and Auto mode capabilities. This guide explains how to configure and manage S3 bucket encryption settings using Guardrails' automated enforcement features.

## Prerequisites

- Guardrails Agent installed and configured
- Auto mode enabled in your Guardrails workspace
- AWS account(s) connected to Guardrails
- Appropriate IAM permissions for S3 encryption operations

## Enable Auto Mode for S3 Encryption

![Navigate to Auto Mode Settings](/images/docs/guardrails/guides/using-guardrails/encryption/s3/navigate-auto-mode-settings.png)

1. Navigate to **Settings** > **Auto Mode** in your Guardrails workspace
2. Enable Auto mode for the `AWS > S3 > Bucket > Encryption at Rest` control

![Enable S3 Encryption Auto Mode](/images/docs/guardrails/guides/using-guardrails/encryption/s3/enable-s3-encryption-auto-mode.png)

3. Select your desired enforcement level:
   - `Enforce: AWS SSE` - Automatically configure AWS Server-Side Encryption
   - `Enforce: AWS managed key` - Automatically configure AWS KMS managed keys
   - `Enforce: Customer managed key` - Automatically configure customer managed KMS keys

![Select Enforcement Level](/images/docs/guardrails/guides/using-guardrails/encryption/s3/select-enforcement-level.png)

> [!NOTE]
> The `Enforce: None` policy value is deprecated as it is no longer supported by AWS.

## Configure Agent Settings

![Agent Configuration](/images/docs/guardrails/guides/using-guardrails/encryption/s3/agent-configuration-settings.png)

1. In your Guardrails workspace, navigate to **Settings** > **Agent Configuration**
2. Ensure the following permissions are included in your agent's IAM role:
   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Effect": "Allow",
               "Action": [
                   "s3:DeleteBucketEncryption",
                   "s3:PutEncryptionConfiguration",
                   "s3:DeleteBucketPolicy",
                   "s3:PutBucketEncryption",
                   "s3:PutBucketPolicy"
               ],
               "Resource": "*"
           }
       ]
   }
   ```

## Set Customer Managed Key (Optional)

![Customer Managed Key Configuration](/images/docs/guardrails/guides/using-guardrails/encryption/s3/customer-managed-key-config.png)

If using customer managed keys:

1. Configure the `AWS > S3 > Bucket > Encryption at Rest > Customer Managed Key` policy
2. Specify the KMS key ARN to be used for bucket encryption
3. Ensure the agent's IAM role has permissions to use the specified KMS key

## Monitor Automated Enforcement

![Controls View](/images/docs/guardrails/guides/using-guardrails/encryption/s3/controls-view-encryption.png)

1. Navigate to the **Controls** view in your Guardrails workspace
2. Filter for `AWS > S3 > Bucket > Encryption at Rest` controls

![Enforcement Status](/images/docs/guardrails/guides/using-guardrails/encryption/s3/enforcement-status-indicators.png)

3. Review the automated enforcement status:
   - Green: Encryption properly configured
   - Yellow: Auto mode is configuring encryption
   - Red: Configuration failed (requires investigation)

## Next Steps

- Configure automated alerts for encryption compliance violations
- Review encryption settings across other AWS services
- Set up automated reporting for encryption status

> [!TIP]
> Use the Controls by Resource report to monitor automated enforcement status across all your S3 buckets.

## Additional Resources

- [Guardrails Agent Installation Guide](link-to-agent-installation)
- [Auto Mode Configuration Guide](link-to-auto-mode)
- [AWS S3 Encryption Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html)

## Troubleshooting

| Issue | Resolution |
|-------|------------|
| Agent shows "Permission Denied" | Verify agent IAM role permissions |
| Auto mode not enforcing | Check Auto mode settings and agent connectivity |
| KMS key access denied | Update KMS key policy to allow agent access |
| Configuration stuck in "In Progress" | Check agent logs for detailed error messages |