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

## Importing a single resource

## Step 1: Locate the Existing Resource

Before importing, identify the **AWS IAM Role** that you want to manage using Guardrails.

1. **Log in to AWS Console**.
2. Navigate to **AWS IAM** and list the existing role(s). We plan to import the Role named "stack-import-demo-role" so lets query for that only.

Example AWS CLI command:

```bash
aws iam get-role --role-name stack-import-demo-role
```

Expected output:

```json
{
  "Role": {
    "Path": "/",
    "RoleName": "stack-import-demo-role",
    "RoleId": "AROA2AWXV46KEICE3ITXA",
    "Arn": "arn:aws:iam::688720832404:role/stack-import-demo-role",
    "CreateDate": "2025-04-02T12:20:31+00:00",
    "AssumeRolePolicyDocument": {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "Service": "ec2.amazonaws.com"
          },
          "Action": "sts:AssumeRole"
        }
      ]
    },
    "Description": "stack-import-demo-role",
    "MaxSessionDuration": 3600,
    "RoleLastUsed": {}
  }
}
```

---

## Step 2: Prepare the Import Script

We will make use of the [Import](https://opentofu.org/docs/language/import/) block to import this existing IAM [Role](https://search.opentofu.org/provider/terraform-providers/aws/latest/docs/resources/iam_role#import).

Example import block for an IAM Role:

```hcl
import {
  to = aws_iam_role.stack_import_demo_role
  id = "stack-import-demo-role"
}
```

NOTE: The identifier you use for a resource's import ID is resource-specific. You can find the required ID in the provider's documentation for the resource you wish to import.

## Step 3: Set the Stack [Native] Policies

To import the IAM Role, update the following Policies:

**AWS > IAM > Stack [Native] > Modifier** policy for the resources import.

1. Go to **Policies** in the Guardrails console.
2. Search for **AWS > IAM > Stack [Native] > Modifier**.
3. Click **New Policy Setting**.
4. Apply the following **Terraform import block** in the policy at the **account** level.

Example Terraform configuration:

```hcl
import {
  to = aws_iam_role.stack_import_demo_role
  id = "stack-import-demo-role"
}
```

5. Click **Save** to apply the policy.

**AWS > IAM > Stack [Native] > Source** policy with the OpenTofu HCL configuration source code of the resource.

1. Go to **Policies** in the Guardrails console.
2. Search for **AWS > IAM > Stack [Native] > Source**.
3. Click **New Policy Setting**.
4. Apply the following **Terraform import block** in the policy at the **account** level.

Example Terraform configuration:

```hcl
resource "aws_iam_role" "stack_import_demo_role" {
  name        = "stack-import-demo-role"
  description = "stack-import-demo-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })
}
```

5. Click **Save** to apply the policy.

---

**AWS > IAM > Stack [Native]** policy to to run the stack in enforce mode so that we import and manage the IAM Resource going forward.

1. Go to **Policies** in the Guardrails console.
2. Search for **AWS > IAM > Stack [Native]**.
3. Click **New Policy Setting**.
4. Select "**Enforce: Configured**"
5. Click **Create** to create the policy setting.

## Step 4: Monitor the AWS > IAM > Stack [Native] stack

Once the necessary policies are set, the **AWS > IAM > Stack [Native]** stack will execute and import the resource. If everything goes well, you should see the below log message "Apply complete! Resources: 1 imported, 0 added, 0 changed, 0 destroyed."

![AWS > IAM > Stack [Native] -- Control Logs](/images/docs/guardrails/guides/using-guardrails/stacks/import/1-resource-imported.png)

---

## Manage the Stack

Now that the resource is imported to the Stack. You can manage the resource using the Stack. Try updating the **AWS > IAM > Stack [Native] > Source** and the changes should reflect in the AWS IAM Role.

Example: Update the **AWS > IAM > Stack [Native] > Source** with the following, i.e., adding tags to the IAM Role.

```hcl
resource "aws_iam_role" "stack_import_demo_role" {
  name        = "stack-import-demo-role"
  description = "stack-import-demo-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })

  tags = {
    environment = "development"    ### Add the Tags block
  }
}
```

If everything goes well, you should see the following log message, "Apply complete! Resources: 0 added, 1 changed, 0 destroyed."

![AWS > IAM > Stack [Native] -- Control Logs](/images/docs/guardrails/guides/using-guardrails/stacks/import/1-resource-updated.png)

## Step 5: Review

- [ ] Verify the imported resource shows up in the "Related" tab of the Stack [Native].

## Importing multiple-resources

Follow the same process, but instead use `for_each` to iterate through multiple resources. Here are the policies:

**AWS > IAM > Stack [Native] > Source**

```hcl
variable "role_names" {
  description = "List of IAM role names to import"
  type        = set(string)
}

resource "aws_iam_role" "demo_roles" {
  for_each = var.role_names

  name        = each.value
  description = each.value

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })
}
```

**AWS > IAM > Stack [Native] > Variables**

```hcl
role_names = [
  "stack-import-demo-roles-1",
  "stack-import-demo-roles-2",
  "stack-import-demo-roles-3"
]
```

**AWS > IAM > Stack [Native] > Modifier**

```hcl
import {
  to       = aws_iam_role.demo_roles[each.key]
  id       = each.key
  for_each = var.role_names
}
```

**AWS > IAM > Stack [Native]**: To enforce the changes, select, "Enforce: Configured".

If everything goes well, you should see the following log message, "Apply complete! Resources: 3 imported, 0 added, 0 changed, 0 destroyed."

![AWS > IAM > Stack [Native] -- Control Logs](/images/docs/guardrails/guides/using-guardrails/stacks/import/multiple-resources-imported.png)

## Regional Resources

Similar to the above, you can use the Regional Stack [Native] to import the regional resources like S3 bucket.
For example: In order to import a S3 bucket "stack-import-demo-bucket", use the below policies.

**AWS > Region > Stack [Native] > Modifier**

```hcl
import {
  to = aws_s3_bucket.example
  id = "stack-import-demo-bucket"
}
```

**AWS > Region > Stack [Native] > Source**

```hcl
resource "aws_s3_bucket" "example" {
  bucket = "stack-import-demo-bucket"
}
```

**AWS > Region > Stack [Native]**: To enforce, set the policy to "Enforce: Configured" at the Region where you want to import the bucket. If this bucket exists in all regions and you want to import all such buckets, then set this policy at the account level.

If everything goes well, you should see the following log message, "Apply complete! Resources: 3 imported, 0 added, 0 changed, 0 destroyed."

![AWS > Region > Stack [Native] -- Control Logs](/images/docs/guardrails/guides/using-guardrails/stacks/import/s3_bucket_imported.png)

---

## Troubleshooting

| Issue                         | Description                                  | Guide                                                         |
| ----------------------------- | -------------------------------------------- | ------------------------------------------------------------- |
| **Resource Not Found**        | Import failed due to an incorrect Role name. | Verify the Role name in AWS Console.                          |
| **Permission Denied**         | Guardrails lacks the required permissions.   | Ensure IAM roles are correctly assigned.                      |
| **Import Fails in Terraform** | The resource is already managed.             | Remove the resource from Terraform state before re-importing. |

---

## Next Steps

- [Deploy a Stack](https://turbot.com/guardrails/docs/guides/using-guardrails/stacks/deploy)
- [Destroy a Stack](https://turbot.com/guardrails/docs/guides/using-guardrails/stacks/destroy)
