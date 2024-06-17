---
title: "Guardrails Admin Permissions"
template: Documentation
nav:
  order: 10
---

# AWS Permissions for Turbot Guardrails Administrators

## Overview

Turbot Guardrails Administrators require fairly extensive access to the Turbot Guardrails Master AWS account. To help conform with the principle
of least-privilege, the following AWS IAM policy statement should form a starting place for enterprises to establish
their own standards. Turbot Support's expectations are that anyone identified as a "Guardrails Administrator" will be
able to fix any aspect of the application except perhaps for networking outside the Guardrails Master VPC or DNS
management.  (No one wants to wait on a prod outage because of missing permissions.)

A common point of discussion is the creation and management of IAM roles in the Guardrails Master account. Turbot Guardrails
Enterprise creates new ECS and Lambda execution roles with each new deployment. An administrator without this capability
cannot effectively manage or upgrade the Guardrails application.

## AWS Services Used by Guardrails

| Service                  | Purpose                                                                                                                   |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------|
| ACM                      | Manage Certificates for the Guardrails ALBs                                                                               |
| API Gateway              | Enable event handling when the Guardrails ALB is internal-only.                                                           |
| Application-Autoscaling  | Used for scaling ECS containers.                                                                                          |
| Billing                  | Monitoring of Guardrails operating costs                                                                                  |
| CloudFormation           | Review events, resources and parameters for deployed products.  Also used for minor parameter updates.                    |
| CloudWatch               | Events, Dashboards, and Logs                                                                                              |
| EC2                      | Guardrails uses EC2 instances for ECS.  Also used for DB bastion hosts.                                                       |
| ECR                      | Repository for Guardrails Container Images  (read-only since Guardrails doesn't create ECR images, merely consumes them.) |
| ECS	                     | Used to run various Guardrails containers.                                                                                | 
| ElastiCache              | Instance to cache frequently used or short lived data                                                                     |
| IAM	                     | Execution roles for Guardrails                                                                                            | 
| KMS	                     | Encryption Keys for DBs, S3 buckets                                                                                       |
| Lambda                   | Used for Guardrails  application management and mod controls.                                                             |
| RDS                      | Postgresql Database for data storage                                                                                      |
| RDS Performance Insights | Keep track of top queries and overall DB behavior                                                                         |
| Route 53                 | Hosted zone with records for Guardrails Workspaces                                                                        |
| S3                       | Bucket for logging                                                                                                        |
| Service Catalog          | Management deployment of TEF, TED and TE.                                                                                 |
| SNS                      | Topics used for communication within the Guardrails application.                                                          |
| SQS                      | Event Queues used to manage task backlogs.                                                                                |
| SSM Parameter Store      | Used to store configuration information.  Used to communicate between the TEF, TED and TE stacks.                         |

## Areas of Variation

- Guardrails creates and destroys IAM roles with the deployment of TEF, TED and TE. Manipulation of Roles and Role Policies
  have been included. Blanket denial of read/write permissions on IAM roles prevents Guardrails upgrades from happening.
- In addition to TEF/TED/TE deployments, in emergency troubleshooting situations, a Guardrails bastion in the Guardrails VPC may be required to
  directly access to the Guardrails DB. The ability to spin up and manage an EC2 instances is required.
- For Enterprises that use Guardrails Firehose, the ability to create and manage an IAM user is required. This has been
  included in the below permissions.
- When deploying Guardrails, read calls must be made against a central Turbot-owned ECR. Permissions to create, update and
  write ECR repositories are not required.
- Enterprises with restrictions on specific resources in the Guardrails Master account, should adapt the below baseline to
  their needs.
- Billing read-only access is really handy, but not necessary, when questions about costs come up.

## IAM Policy

The following permissions are recommended for Guardrails Administrators in the Guardrails Master AWS Account

```
   {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "acm:*",
                "apigateway:*",
                "application-autoscaling:*",
                "aws-portal:ViewAccount",
                "aws-portal:ViewBilling",
                "aws-portal:ViewPaymentMethods",
                "aws-portal:ViewUsage",
                "cloudformation:*",
                "cloudwatch:*",
                "ec2:*",
                "ecr:BatchCheckLayerAvailability",
                "ecr:BatchGetImage",
                "ecr:DescribeImages",
                "ecr:DescribeImageScanFindings",
                "ecr:DescribeRegistry",
                "ecr:DescribeRepositories",
                "ecr:GetAuthorizationToken",
                "ecr:GetDownloadUrlForLayer",
                "ecr:GetLifecyclePolicy",
                "ecr:GetLifecyclePolicyPreview",
                "ecr:GetRegistryPolicy",
                "ecr:GetRepositoryPolicy",
                "ecr:ListImages",
                "ecr:ListTagsForResource",
                "ecs:*",
                "elasticache:*",
                "elasticloadbalancing:*",
                "events:*",
                "iam:AttachRolePolicy",
                "iam:AttachUserPolicy",
                "iam:CreateAccessKey",
                "iam:CreatePolicy",
                "iam:CreateRole",
                "iam:CreateUser",
                "iam:DeleteAccessKey",
                "iam:DeletePolicy",
                "iam:DeleteRole",
                "iam:DeleteRolePolicy",
                "iam:DeleteUserPolicy",
                "iam:DetachRolePolicy",
                "iam:GetAccountSummary",
                "iam:GetPolicy",
                "iam:GetPolicyVersion",
                "iam:GetRole",
                "iam:GetRolePolicy",
                "iam:GetServiceLinkedRoleDeletionStatus",
                "iam:GetUser",
                "iam:GetUserPolicy",
                "iam:ListGroups",
                "iam:ListGroupsForUser",
                "iam:ListPolicies",
                "iam:ListPoliciesGrantingServiceAccess",
                "iam:ListPolicyTags",
                "iam:ListPolicyVersions",
                "iam:ListRolePolicies",
                "iam:ListRoles",
                "iam:ListRoleTags",
                "iam:ListUserPolicies",
                "iam:ListUsers",
                "iam:ListUserTags"
                "iam:PassRole",
                "iam:PutRolePolicy",
                "iam:PutUserPolicy",
                "iam:SimulateCustomPolicy",
                "iam:SimulatePrincipalPolicy",
                "iam:TagInstanceProfile",
                "iam:TagMFADevice",
                "iam:TagOpenIDConnectProvider",
                "iam:TagPolicy",
                "iam:TagRole",
                "iam:TagSAMLProvider",
                "iam:TagServerCertificate",
                "iam:TagUser",
                "iam:UntagInstanceProfile",
                "iam:UntagMFADevice",
                "iam:UntagOpenIDConnectProvider",
                "iam:UntagPolicy",
                "iam:UntagRole",
                "iam:UntagSAMLProvider",
                "iam:UntagServerCertificate",
                "iam:UntagUser",
                "iam:UpdateAccessKey",
                "iam:UpdateRole",
                "iam:UpdateUser",
                "kms:*",
                "lambda:*",
                "logs:*",
                "pi:*",
                "rds:*",
                "rds-db:*",
                "route53:*",
                "s3:*",
                "servicecatalog:*",
                "sns:*",
                "sqs:*",
                "ssm:*",
            ],
            "Resource": "*"
        }
    ]
}
```