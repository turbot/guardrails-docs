---
title: GovCloud & China Accounts
sidebar_label: GovCloud & China Accounts
---

# Importing a AWS Gov Cloud or AWS China account

In this guide, you will:

- Import an AWS Account into a Guardrails Folder.


## Prerequisites to import AWS GovCloud or AWS China Account

To onboard your Amazon Web Services AWS China or AWS GovCloud account, you must
create a user and a role using AWS IAM.

- The user must be attached with a IAM policy (Allowing sts:AssumeRole
  Permission for the role), attach Customer managed policy :

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AssumeRolePolicy",
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": "arn:aws-us-gov:iam::520317836431:role/turbot-import-role"
    }
  ]
}
```

- If you wish to take advantage of every AWS integration offered by Guardrails
  (recommended), attach the Amazon Managed AdministratorAccess Policy to the
  Role:
  - `arn:aws:iam::aws:policy/AdministratorAccess`
- Check **Require External ID** and enter an
  [External ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html).
  You can choose any valid external ID. You will need this ID later, when you
  import the account into Guardrails.

- The role must allow access for the user created above in it's trust policy.
  For example, the trust policy of the role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws-us-gov:iam::123456789012:user/turbot-import-user"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "turbot"
        }
      }
    }
  ]
}
```

### Install all required mods

Most mods are optional. However, the AWS mod is required to import AWS accounts
into Guardrails. If you are having trouble getting the initial import going, ensure
that the AWS mod is installed and the `Mod installed` control is in the green,
ok state. The installation of additional mods will depend on the organizations
control objectives. If there are no control objectives regarding AppStream,
simply do not install the mod! Check out our
[Mods recommendation](mods#recommended-baseline-mods) page for more info on
suggested mods to install.

Recommended Mods:

1. [aws](https://hub.guardrails.turbot.com/mods/aws/mods/aws)
2. [aws-iam](https://hub.guardrails.turbot.com/mods/aws/mods/aws-iam)
3. [aws-kms](https://hub.guardrails.turbot.com/mods/aws/mods/aws-kms)
4. [aws-ec2](https://hub.guardrails.turbot.com/mods/aws/mods/aws-ec2)
5. aws-vpc-\*
   - [aws-vpc-core](https://hub.guardrails.turbot.com/mods/aws/mods/aws-vpc-core)
   - [aws-vpc-internet](https://hub.guardrails.turbot.com/mods/aws/mods/aws-vpc-internet)
   - [aws-vpc-connect](https://hub.guardrails.turbot.com/mods/aws/mods/aws-vpc-connect)
   - [aws-vpc-security](https://hub.guardrails.turbot.com/mods/aws/mods/aws-vpc-security)
6. [aws-sns](https://hub.guardrails.turbot.com/mods/aws/mods/aws-sns)
7. [aws-cloudtrail](https://hub.guardrails.turbot.com/mods/aws/mods/aws-cloudtrail)
8. [aws-events](https://hub.guardrails.turbot.com/mods/aws/mods/aws-events)

## Importing an AWS GovCloud or China account into a Guardrails folder

While you can import an AWS account at the Turbot level, it is recommended that
you import accounts into Guardrails Folders, as it provides greater flexibility and
ease of management.
Define a [Folder hierarchy](/guardrails/docs/concepts/resources/hierarchy) prior to import.

#### Importing the account via Terraform

```hcl
#### Create the AWS > Account resource in Guardrails
resource "turbot_resource" "account_resource" {
  parent = id-of-parent-folder
  type   = "tmod:@turbot/aws#/resource/types/account"
  akas     = ["arn:aws-us-gov:::123456789012"]
  metadata = jsonencode({
    "aws" : {
      "accountId" : "your aws account id",    // highlight-line
      "partition" : "aws-us-gov"
    }
  })
  data = jsonencode({
    "Id" : "your aws account id" //highlight-line
  })
}

#### Set the credentials (Access key, Secret access key, Credential type, Role and external id) for the account via Guardrails policies
# AWS > Account > Turbot IAM Access Key ID
resource "turbot_policy_setting" "turbotIamAccessKeyId" {
  resource = turbot_resource.cn-turbot-tfs.id
  type     = "tmod:@turbot/aws#/policy/types/turbotIamAccessKeyId"
  value    = "Access key ID of the trusted user"  //highlight-line
}

# AWS > Account > Turbot IAM Secret Access Key
resource "turbot_policy_setting" "turbotIamSecretAccessKey" {
  resource = turbot_resource.cn-turbot-tfs.id
  type     = "tmod:@turbot/aws#/policy/types/turbotIamSecretAccessKey"
  value    = "Secret access key of the trusted user"  //highlight-line
}

# AWS > Account > Turbot IAM Credential Type
resource "turbot_policy_setting" "turbotIamCredentialType" {
  resource = turbot_resource.cn-turbot-tfs.id
  type     = "tmod:@turbot/aws#/policy/types/turbotIamCredentialType"
  value    = "credential type that turbot use to access AWS account"  //highlight-line
}


# AWS > Account > Turbot IAM Role > External ID
resource "turbot_policy_setting" "turbotIamRoleExternalId" {
  resource   = turbot_resource.account_resource.id
  type       = "tmod:@turbot/aws#/policy/types/turbotIamRoleExternalId"
  value      = "external id for your turbot role"  //highlight-line
}

# AWS > Account > Turbot IAM Role
resource "turbot_policy_setting" "turbotIamRole" {
  resource   = turbot_resource.account_resource.id
  type       = "tmod:@turbot/aws#/policy/types/turbotIamRole"
  value      = "arn of your turbot role"  //highlight-line
}
```

#### Importing the account via the Turbot Console (UI)

1. At the main Turbot screen after logging in with `Turbot/Admin` permissions,
   click the **IMPORT** card in the top right.

2. Select **AWS Account** on the left.

3. Use the **Parent Resource** dropdown menu to select where the AWS account
   will be imported to..

4. Enter the **Account ID** in the field.

5. Copy the **IAM Role ARN** that was created earlier and paste into the field.
   Do the same with the **IAM Role External ID**.

6. Click the **Add access key pair** link and input the access key as well as
   the secret.

7. Click import!

8. CMDB and Discovery controls are enabled by default and Turbot will begin
   discovering the resources in your AWS account. Resources will start appearing
   right away, and resource discovery will continue to run in the background.
