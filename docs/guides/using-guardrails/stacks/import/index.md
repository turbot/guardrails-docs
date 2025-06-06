---
title: Import Stack Resource
sidebar_label: Import Stack Resource
---

# Importing Stack Resource

In this guide, you'll learn how to:

- Import existing AWS resources into a Guardrails stack (single or multiple resources)
- Configure the *stack modifier policy* with import statements for individual or bulk imports
- Update and manage imported resources through Guardrails
- Apply import configurations at the **folder level** for structured deployment
- Use `for_each` to import multiple resources in a single operation

Guardrails allows you to bring existing AWS resource(s) under stack management using `import` statements. This enables Guardrails to track and enforce configuration policies on the imported resources.


## Prerequisites

- **Turbot/Owner** or **Turbot/Admin** permissions at the required resource level.
- Knowledge of [Stack [Native]](/guardrails/docs/concepts/guardrails/stacks#stack-controls) Guardrails concepts.
- Familiarity with [Terraform](https://www.terraform.io/) and [OpenTofu](https://opentofu.org/) and Guardrails [stack](/guardrails/docs/concepts/guardrails/configured) controls.
- Access to the Guardrails console.
- A *configured Terraform provider* for AWS.
- Knowledge of AWS console & [AWS CLI](https://aws.amazon.com/cli/).


>[!IMPORTANT]
> While this guide demonstrates configuring `AWS > IAM > Stack [Native]` in `Enforce` mode, it is strongly recommended to start with `Check` mode first. Check mode allows you to:
> - Preview the planned changes without modifying resources.
> - Validate that the import configuration is correct.
> - Identify any potential issues before making changes.
> - Gradually transition to enforcement after verifying the expected behavior.
>
> Once you've confirmed everything works as intended in Check mode, you can safely switch to Enforce mode.


## Step 1: Find Existing Resource

Before importing, identify the AWS IAM role that you want to manage using Guardrails.

Log in to the AWS Console and navigate to the IAM service. Search for the role you want to import. In this example, we'll search for a role named `stack-import-demo-role`.

Select the IAM role name.

To get the role details using [AWS CLI](https://aws.amazon.com/cli/), execute the following command:

```bash
aws iam get-role --role-name stack-import-demo-role
```

Expected CLI output:

```json
{
  "Role": {
    "Path": "/",
    "RoleName": "stack-import-demo-role",
    "RoleId": "AROA2AWXV46KEICE3ITXA",
    "Arn": "arn:aws:iam::688720831234:role/stack-import-demo-role",
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

## Step 2: Prepare Import Script

We will make use of the [Import](https://opentofu.org/docs/language/import/) block to import this existing IAM [Role](https://search.opentofu.org/provider/terraform-providers/aws/latest/docs/resources/iam_role#import).

Import block:

```hcl
import {
  to = aws_iam_role.stack_import_demo_role
  id = "stack-import-demo-role"
}
```
> [!NOTE]
> The identifier you use for a resource's import ID is resource-specific. You can find the required ID in the provider's documentation for the resource you wish to import.

To import the IAM role, update the following policies to import the above resource.

## Step 3: Configure AWS > IAM > Stack [Native] > Modifier Policy

1. Login to Guardrails console and navigate to **Policies** tab.
2. Search for **AWS > IAM > Stack [Native] > Modifier**.
3. Select **New Policy Setting**.
4. Apply the following *Terraform import block* in the policy at the *account* level.

Required policy value:

```
import {
  to = aws_iam_role.stack_import_demo_role
  id = "stack-import-demo-role"
}
```
![Set AWS > IAM > Stack [Native] > Modifier](/images/docs/guardrails/guides/using-guardrails/stacks/import/aws-iam-native-stack-modifier.png)

5. Select **Save** to apply the policy.

## Step 4: Configure AWS > IAM > Stack [Native Policy] > Source Policy

Now set the *AWS > IAM > Stack [Native] > Source* policy with the OpenTofu HCL configuration source code of the resource.

1. Go to **Policies** in the Guardrails console.
2. Search for *AWS > IAM > Stack [Native] > Source*.
3. Select **New Policy Setting**.
4. Apply the following **Terraform import block** in the policy at the **account** level.

Required Terraform configuration:

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
![Set AWS > IAM > Stack [Native] > Source](/images/docs/guardrails/guides/using-guardrails/stacks/import/aws-iam-native-stack-source.png)

Select **Update** to apply the policy.

## Step 5 Configure AWS > IAM > Stack [Native] Policy

Now set the *AWS > IAM > Stack [Native]* policy to enforce mode to import and manage the IAM resource. This ensures Guardrails takes control of the resource's lifecycle management.

1. Go to **Policies** in the Guardrails console.
2. Search for **AWS > IAM > Stack [Native]** policy.
3. Click **New Policy Setting**.
4. Select "**Enforce: Configured**"
5. Select **Create** to create the policy setting.

![Set AWS > IAM > Stack [Native]](/images/docs/guardrails/guides/using-guardrails/stacks/import/aws-iam-native-stack-configured-enforced.png)

## Step 6: Validate the AWS > IAM > Stack [Native] Stack Control

Once the necessary policies are set, the **AWS > IAM > Stack [Native]** stack will execute and import the resource. If everything goes well, you should see the below log message "Apply complete! Resources: 1 imported, 0 added, 0 changed, 0 destroyed."

![Set AWS > IAM > Stack [Native]](/images/docs/guardrails/guides/using-guardrails/stacks/import/aws-iam-native-stack-control.png)

View control logs to check the if the stack successfully imported the resource.

![AWS > IAM > Stack [Native] -- Control Logs](/images/docs/guardrails/guides/using-guardrails/stacks/import/1-resource-imported.png)

## Step 7: Manage Stack with Updates

Now that the resource is imported to the Stack. You can manage the resource using the Stack. Try updating the **AWS > IAM > Stack [Native] > Source** and the changes should reflect in the AWS IAM Role.

Let's update by adding a tag to the IAM role.

1. Go to **AWS > IAM > Stack [Native] > Source** in the Guardrails console
2. Update the source with the following code to add tags to the IAM Role:


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

If everything goes well, you should see the following log message, `Apply complete! Resources: 0 added, 1 changed, 0 destroyed.`

![AWS > IAM > Stack [Native] -- Control Logs](/images/docs/guardrails/guides/using-guardrails/stacks/import/1-resource-updated.png)

## Importing Multiple Resources

Follow the same process, but instead use `for_each` to iterate through multiple resources. Here are the policies and required values:

### Step 1: Configure AWS > IAM > Stack [Native] > Modifier

```hcl
import {
  to       = aws_iam_role.demo_roles[each.key]
  id       = each.key
  for_each = var.role_names
}
```

### Step 2: Configure AWS > IAM > Stack [Native] > Source

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

### Step 3: Configure AWS > IAM > Stack [Native] > Variables

> [!TIP]
> - The variables block is required to define the expected input variables that will be used in the Source configuration in above policy.
> - In this case, we define role_names as a set of strings that will be used by the for_each loop to import multiple IAM roles.
> - The each.value in the Source configuration references these role names to set both the name and description of each IAM role.


```hcl
role_names = [
  "stack-import-demo-roles-1",
  "stack-import-demo-roles-2",
  "stack-import-demo-roles-3"
]
```

### Step 4: Configure AWS > IAM > Stack [Native]

Now enforce the changes, select, `Enforce: Configured`.

If everything goes well, you should see the following log message, `Apply complete! Resources: 3 imported, 0 added, 0 changed, 0 destroyed.`

![AWS > IAM > Stack [Native] -- Control Logs](/images/docs/guardrails/guides/using-guardrails/stacks/import/multiple-resources-imported.png)

## Importing Regional Stack Resources

<!-- # Regional Stack [Native] -->

<!-- Similar to the above, you can use the Regional Stack [Native] to import the regional resources like S3 bucket.
For example: In order to import a S3 bucket "stack-import-demo-bucket", use the below policies. -->

Similar to the above, regional Stack [Native] controls are used when you need to manage resources that are region-specific in AWS. This is important because:

>[!TIP]
> - Many AWS resources like S3 buckets, EC2 instances, and VPCs are region-specific and need to be managed in the context of their region.
> - Regional stacks allow you to enforce configurations consistently across specific regions rather than account-wide.
> - You can target resources in specific regions while leaving other regions untouched.
> - The controls automatically handle region-specific API endpoints and credentials.

Here's how to use Regional Stack [Native] to import region-specific resources using below policies with an example to import a S3 bucket `stack-import-demo-bucket`

When importing S3 buckets:
- S3 buckets exist in specific regions even though they have global names
- Using Regional Stack [Native] ensures the import and management happens in the correct region
- You can apply different configurations per region if needed
- The stack will properly handle region-specific bucket policies and configurations

### Step 1: AWS > Region > Stack [Native] > Modifier

```hcl
import {
  to = aws_s3_bucket.example
  id = "stack-import-demo-bucket"
}
```

### Step 2: AWS > Region > Stack [Native] > Source

```hcl
resource "aws_s3_bucket" "example" {
  bucket = "stack-import-demo-bucket"
}
```

### Step 3: AWS > Region > Stack [Native]

To enforce, set the policy to `Enforce: Configured`at the region where you want to import the bucket.

> [!NOTE]
> If this bucket exists in all regions and you want to import all such buckets, then set this policy at the account level.

If everything goes well, you should see the following log message, `Apply complete! Resources: 3 imported, 0 added, 0 changed, 0 destroyed.`

![AWS > Region > Stack [Native] -- Control Logs](/images/docs/guardrails/guides/using-guardrails/stacks/import/s3_bucket_imported.png)


## Resource Stack [Native]

Resource Stack [Native] controls allow you to manage resources that are associated with a specific parent resource. Resource stacks target individual resources, allowing you to configure standard resources that should be associated with them. Resource stacks will run for every resource of that type, and will run whenever new resources of that type are discovered. More info at [Stack [Native]](/guardrails/docs/concepts/guardrails/stacks#stack-controls) Guardrails concepts.

For example, with S3 buckets:
- Each bucket can have its own lifecycle policies, replication rules, and access settings
- The Resource Stack [Native] control runs once for each bucket in scope
- You can customize configurations per bucket while maintaining central management
- The stack automatically handles dependencies between the bucket and its associated resources

<!-- Resources to associate with buckets such as lifecycle policies or replication configuration. -->

Let us walk through an example use-case. To add a lifecycle policy for all the S3 buckets within a `region/account/folder` to delete log files older than a year. This applies to all objects under the **logs/** prefix (i.e. logs/filename.log)

**Use Case:** Delete S3 Logs Older Than One Year

> [!NOTE]
> Please refer to [Stack [Native] Best Practices](/guardrails/docs/concepts/guardrails/stacks#best-practices)

We will use a [calculated policy](/guardrails/docs/concepts/policies/calculated-faq#calculated-policies-faq) for the variables.

### Step 1: Configure AWS > S3 > Bucket > Stack [Native] > Variables

GraphQL Input Query

```hcl
{
  resource {
    Name: get(path:"Name")
  }
}
```

Nunjucks Template

```hcl
bucket_name = "{{ $.resource.Name  }}"
```

### Step 2: Configure AWS > S3 > Bucket > Stack [Native] > Modifier

```hcl
import {
  to = aws_s3_bucket.example
  id = var.bucket_name
}
```

### Step 3: Configure WS > S3 > Bucket > Stack [Native] > Source

```hcl
variable "bucket_name" {
  description = "Name of the bucket"
  type        = string
}

resource "aws_s3_bucket" "example" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_lifecycle_configuration" "logs" {
  bucket = var.bucket_name

  rule {
    id     = "delete-logs-after-365-days"
    status = "Enabled"

    filter {
      prefix = "logs/"
    }

    expiration {
      days = 365
    }
  }
}
```

### Step 4: Configure AWS > S3 > Bucket > Stack [Native]

To enforce, set the policy to `Enforce: Configured` at the `region/account/folder`.

## Review

- [ ] Verify the imported resource shows up in the Related tab of the Stack [Native].

![Validate Resource](/images/docs/guardrails/guides/using-guardrails/stacks/import/validate-stack-native-resource.png)

## Next Steps

- [Import Multiple Stack Resources](/guardrails/docs/guides/using-guardrails/stacks/import/import-multiple-stack-resources)
- [Deploy a Stack](/guardrails/docs/guides/using-guardrails/stacks/deploy)
- [Destroy a Stack](/guardrails/docs/guides/using-guardrails/stacks/destroy)

## Troubleshooting

| Issue                         | Description                                  | Guide                                                         |
| ----------------------------- | -------------------------------------------- | ------------------------------------------------------------- |
| **Resource Not Found**        | Import failed due to an incorrect Role name. | Verify the Role name in AWS Console.                          |
| **Permission Denied**         | Guardrails lacks the required permissions.   | Ensure IAM roles are correctly assigned.                      |
| **Import Fails in Terraform** | The resource is already managed.             | Remove the resource from Terraform state before re-importing. |






