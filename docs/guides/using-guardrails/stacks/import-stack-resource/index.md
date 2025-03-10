---
title: Importing Stack Resources
sidebar_label: Import Stack Resources
---

# Importing Stack Resources in Guardrails

In this guide, you will:

- Learn how to **import existing AWS resources** into a Guardrails stack.
- Modify the **stack modifier policy** to include import statements.
- Apply the import configuration at the **folder level** for structured deployment.

Guardrails allows you to bring existing AWS resources under stack management using **import statements**. This enables Guardrails to track and enforce configuration policies on the imported resources.

## Prerequisites

- **Turbot/Owner** or **Turbot/Admin** permissions at the required resource level.
- Familiarity with **Terraform/OpenTofu** and Guardrails stack controls.
- Access to the Guardrails console.
- A **configured Terraform provider** for AWS.

---

## Step 1: Locate the Existing Resource

Before importing, identify the **AWS S3 bucket** that you want to manage using Guardrails.

1. **Log in to AWS Console**.
2. Navigate to **Amazon S3** and list the existing buckets.
3. Note down the **S3 bucket name** and **AWS Account ID**.

Example AWS CLI command:
```bash
aws s3 ls
```
Expected output:
```plaintext
2025-01-01 12:30:00 example-s3-bucket
```

---

## Step 2: Retrieve Import Script from Guardrails

Guardrails provides an **import script** for existing resources. To generate it:

1. **Log in to the Guardrails console**.
2. Navigate to **Resources** and locate the S3 bucket.
3. Open the **Developer tab** and find the generated **import script**.
4. Copy the import block.

Example import block for an S3 bucket:
```hcl
import {
  id = "aws_s3_bucket.example-s3-bucket"
}
```

---

## Step 3: Modify the Stack Import Policy

To import the S3 bucket, update the **AWS > S3 > Bucket > Stack [Native] > Modifier** policy.

1. Go to **Policies** in the Guardrails console.
2. Search for **AWS > S3 > Bucket > Stack [Native] > Modifier**.
3. Click **New Policy Setting**.
4. Apply the following **Terraform import block** in the policy at the **folder level**.

Example Terraform configuration:
```hcl
resource "aws_s3_bucket" "example" {
  bucket = "example-s3-bucket"
}

import {
  id = "aws_s3_bucket.example"
}
```
5. Click **Save** to apply the policy.

---

## Step 4: Deploy the Stack in Guardrails

Once the modifier policy is updated, execute the **stack deployment**.

1. Navigate to **Stacks** in Guardrails.
2. Locate the **AWS S3 Bucket Stack**.
3. Click **Deploy Stack**.
4. Confirm the import in the **Terraform plan output**.

Example Terraform CLI command:
```bash
terraform apply
```
Expected output:
```plaintext
aws_s3_bucket.example: Importing...
aws_s3_bucket.example: Import successful
```

---

## Step 5: Review

- [ ] Verify the imported S3 bucket appears in **Guardrails Console > Resources**.
- [ ] Navigate to **Stacks** and ensure the imported bucket is **tracked**.
- [ ] Check the **Policies tab** to confirm the **import statement is applied**.
- [ ] Run a **stack plan** to confirm successful import.

---

## Troubleshooting

| Issue | Description | Guide |
|--------|------------|------|
| **Resource Not Found** | Import failed due to an incorrect bucket name. | Verify the bucket name in AWS Console. |
| **Permission Denied** | Guardrails lacks the required permissions. | Ensure IAM roles are correctly assigned. |
| **Import Fails in Terraform** | The resource is already managed. | Remove the resource from Terraform state before re-importing. |

---

## Next Steps

- [Deploy a Stack](https://turbot.com/guardrails/docs/guides/using-guardrails/stacks/deploy)
- [Destroy a Stack](https://turbot.com/guardrails/docs/guides/using-guardrails/stacks/destroy)
