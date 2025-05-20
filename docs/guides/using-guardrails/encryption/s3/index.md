---
title: Enable Encryption in Transit for S3
sidebar_label: Enable Encryption in Transit for S3
guide_type: how-to
---

# Enable Encryption in Transit for S3

This guide helps you enable Encryption in Transit for a specific S3 bucket using Turbot Guardrails. Encryption in Transit ensures that data moving between your applications and S3 is protected using SSL/TLS. This is a critical security control to prevent unauthorized access during data transfer.

You will use the Guardrails console to configure and verify the Encryption in Transit policy for your S3 bucket.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Access to the Guardrails console.
- The S3 bucket you want to secure.

## Step 1: Log In to the Guardrails Console

Log in to the Guardrails console at [https://punisher-turbot.cloud.turbot-dev.com/apollo/login](https://punisher-turbot.cloud.turbot-dev.com/apollo/login).

![Guardrails Console Login](/images/docs/guardrails/guides/using-guardrails/encryption/s3/guardrails-console-login.png)

> [!NOTE]
> If you have trouble logging in, contact your administrator or refer to your organization's SSO instructions.

## Step 2: Navigate to the S3 Bucket

From the navigation menu, go to **Resources** and search for your target **S3 bucket**.

![Navigate to S3 Bucket](/images/docs/guardrails/guides/using-guardrails/encryption/s3/navigate-to-s3-bucket.png)

Search for your bucket name:

![Search testraj2025](/images/docs/guardrails/guides/using-guardrails/encryption/s3/search-testraj2025.png)

Click on the bucket in the results:

![Bucket Resource Detail](/images/docs/guardrails/guides/using-guardrails/encryption/s3/testraj2025-resource-detail.png)

## Step 3: Access Encryption in Transit Policy

In the S3 bucket's page, select the **Policies** tab. Search for **Encryption in Transit**.

![Policies Tab](/images/docs/guardrails/guides/using-guardrails/encryption/s3/testraj2025-policies-tab.png)

![Encryption in Transit Policy](/images/docs/guardrails/guides/using-guardrails/encryption/s3/encryption-in-transit-policy.png)

> [!TIP]
> Use the search bar in the Policies tab to quickly find the policy.

## Step 4: Set Encryption in Transit Policy

Click on the **Encryption in Transit** policy. Set the value to `Enforced` and click **Create**.

![Set Encryption in Transit](/images/docs/guardrails/guides/using-guardrails/encryption/s3/set-encryption-in-transit.png)

![Enforce Encryption in Transit](/images/docs/guardrails/guides/using-guardrails/encryption/s3/enforce-encryption-in-transit.png)

> [!NOTE]
> Setting this policy to `Enforced` ensures all requests to the S3 bucket require SSL/TLS.

## Step 5: Review Policy Enforcement

After saving, verify that the policy state is `OK`. Test access to the S3 bucket to confirm that only encrypted connections are allowed.

![Review Policy Enforcement](/images/docs/guardrails/guides/using-guardrails/encryption/s3/review-policy-enforcement.png)

## Next Steps

- Learn more about [S3 Encryption in Transit Policy](https://hub.guardrails.turbot.com/mods/aws/policies/aws-s3/encryptionInTransit)
- Explore [Managing Policies](/guardrails/docs/guides/configuring-guardrails/managing-policies)

## Troubleshooting

| Issue | Description | Guide |
|-------|-------------|-------|
| Policy not visible | Ensure you have the correct permissions and are viewing the right S3 bucket. | [Open Support Ticket](https://support.turbot.com) |
| Policy state not OK | Check for conflicting policies or inherited settings. | [Open Support Ticket](https://support.turbot.com) |
| Unable to save policy | Verify your permissions and network connectivity. | [Open Support Ticket](https://support.turbot.com) |