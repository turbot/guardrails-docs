---
title: Terraform in 7 minutes
template: Documentation
nav:
  title: Terraform
---

# Terraform in 7 minutes

| Goal | Configure and manage Turbot Guardrails using Terraform. |
| ---- | -------------------------------------------- |
| Time | 7 minutes                                    |

## Overview

The [Turbot Guardrails Terraform Provider](reference/terraform) allows you to define
infrastructure as a code to manage the full life cycle of Turbot Guardrails resources —
create new resources, manage existing ones, and destroy those no longer needed.

In this exercise, you will use the Turbot Guardrails Terraform provider to create a new
[Smart Folder](concepts/resources/policy-packs) and set
[Policies](concepts/policies).

By the end of this lab, you will be able to create, modify, and delete Turbot Guardrails
resources using Terraform.

### Prerequisites

- [Install Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html).
  You should have version 0.12 (at minimum) installed for this lab.
- [Install the Turbot Guardrails Terraform Provider](reference/terraform/setup). The
  Turbot Guardrails Terraform provider is available via the Hashicorp provider registry.
- [Set up your Turbot Guardrails Credentials](reference/cli/installation#setup-your-turbot-credentials).
- [Install the aws-s3 mod](mods/install). This lab exercise uses policies in the
  `aws-s3` mod, so it must be installed in your Workspace.

## Creating Resources

### Create the Configuration File

Terraform provides a mechanism for managing infrastructure using code.
Infrastructure is described using
[Terraform HCL](https://www.terraform.io/docs/configuration/syntax.html) defined
in configuration files.

In order to create a Turbot Guardrails resource, we need to create a configuration file. To
get started, create a local directory for your lab configuration files. Inside
your new working directory, create a configuration file.

```bash
mkdir terraform-demo
cd terraform-demo
touch demo.tf
```

### Create a Smart Folder

1. Add the following snippet to the `demo.tf` file that you created in the
   previous step.

```hcl
resource "turbot_smart_folder" "encryption" {
  title          = "Encryption @ ACME"
  description    = "Enforce encryption on a range of resource types per ACME policies."
  parent         = "tmod:@turbot/turbot#/"
}
```

2. Navigate to the `terraform-demo` folder and initialize the working directory
   for Terraform:

```bash
$ terraform init

Initializing the backend...

Initializing provider plugins...

The following providers do not have any version constraints in configuration,
so the latest version was installed.

To prevent automatic upgrades to new major versions that may contain breaking
changes, it is recommended to add version = "..." constraints to the
corresponding provider blocks in configuration, with the constraint strings
suggested below.

* provider.turbot: version = "~> 1.0"

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

The `terraform init` command will initialize the working directory containing
Terraform configuration files and install any required plugins.

  <div className="alert alert-info mt-5">
  <strong>Note:</strong> The <code>terraform init</code> command is safe to run multiple times, to bring the working directory up to date with changes in the configuration.
  </div>

3. Next, create an execution plan to preview the changes: Terraform:

```bash
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.


------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # turbot_smart_folder.encryption will be created
  + resource "turbot_smart_folder" "encryption" {
      + description = "Enforce encryption on a range of resource types per ACME policies."
      + id          = (known after apply)
      + parent      = "tmod:@turbot/turbot#/"
      + parent_akas = (known after apply)
      + title       = "Encryption @ ACME"
    }

Plan: 1 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.

```

The `terraform plan` command provides a preview of the actions that Terraform
will take in order to configure resources per the configuration file. In this
case, a single Smart Folder resource will be added.

4. Having reviewed the changes, apply the configuration to implement them.
   Before applying the change, Terraform will show you the planned changes and
   prompt you for confirmation. Review the changes and type `yes` to confirm and
   apply:

```bash
$ terraform apply

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # turbot_smart_folder.encryption will be created
  + resource "turbot_smart_folder" "encryption" {
      + description = "Enforce encryption on a range of resource types per ACME policies."
      + id          = (known after apply)
      + parent      = "tmod:@turbot/turbot#/"
      + parent_akas = (known after apply)
      + title       = "Encryption @ ACME"
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

turbot_smart_folder.encryption: Creating...
turbot_smart_folder.encryption: Creation complete after 1s [id=178050816325133]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

After Terraform completes, a new Smart Folder named **Encryption @ ACME** will
be created in your workspace.

### Add Encryption Policy Settings

Now that you have created a Smart Folder, you will add Policy Settings to it.

1. Add the highlighted code snippet to the configuration file (demo.tf), to set
   the `AWS > S3 > Bucket > Encryption at Rest` and
   `AWS > S3 > Bucket > Encryption in Transit` policies to the
   `Encryption @ ACME` Smart Folder:

```hcl
resource "turbot_smart_folder" "encryption" {
  title          = "Encryption @ ACME"
  description    = "Enforce encryption on a range of resource types per ACME policies."
  parent         = "tmod:@turbot/turbot#/"
}

// highlight-start
resource "turbot_policy_setting" "s3_encryption_at_rest" {
  resource        = turbot_smart_folder.encryption.id
  type            = "tmod:@turbot/aws-s3#/policy/types/bucketEncryptionAtRest"
  value           = "Check: AWS SSE"
}

resource "turbot_policy_setting" "s3_encryption_in_transit" {
  resource        = turbot_smart_folder.encryption.id
  type            = "tmod:@turbot/aws-s3#/policy/types/encryptionInTransit"
  value           = "Check: Enabled"
}
// highlight-end
```

2. Preview your configuration changes. Note that the output shows that 2
   resources will be added:

```bash
terraform plan
```

3. Apply the configuration to add the policies to the Smart Folder.

```bash
terraform apply
```

The `Encryption at Rest` and `Encryption in Transit` policy settings will be
created. View the Smart Folder in the Turbot Console to confirm.

## Updating the configuration

Resources that are created by Terraform can be modified by changing the
configuration and re-applying. Only the items modified in the configuration will
be updated. In this step we will update `Encryption in Transit` policy to
enforce SSL.

1.  Edit the configuration in `demo.tf`. Modify the value of
    `Encryption at Rest` policy from `Check: Enabled` to `Enforce: Enabled`.

```hcl
resource "turbot_smart_folder" "encryption" {
  title          = "Encryption @ ACME"
  description    = "Enforce encryption on a range of resource types per ACME policies."
  parent         = "tmod:@turbot/turbot#/"
}

resource "turbot_policy_setting" "s3_encryption_at_rest" {
  resource        = turbot_smart_folder.encryption.id
  type            = "tmod:@turbot/aws-s3#/policy/types/bucketEncryptionAtRest"
  value           = "Check: AWS SSE"
}

resource "turbot_policy_setting" "s3_encryption_in_transit" {
  resource        = turbot_smart_folder.encryption.id
  type            = "tmod:@turbot/aws-s3#/policy/types/encryptionInTransit"
  // highlight-start
  value           = "Enforce: Enabled"
  // highlight-end
}
```

2. Preview your configuration changes. Note that 1 resource will be updated, and
   that the output shows both the old and new value:

```bash
terraform plan
```

3. Apply the configuration to update the Policy Setting.

```bash
terraform apply
```

## Destroying Resources

Resources that were created via Terraform can also be destroyed with Terraform.

1. Preview your configuration changes before destroying:

```bash
terraform plan --destroy
```

The output will show the items that will be destroyed and will summarize the
planned changes: `Plan: 0 to add, 0 to change, 3 to destroy.`

3. Destroy the resources.

```bash
terraform destroy
```

This command will remove the resources that you created using Terraform from
your Turbot Workspace. You can confirm that the Smart Folder and associated
Policy Settings have been deleted in the Turbot Console.

## Importing existing resources to a Terraform config file

In the above scenarios, a Terraform plan is created and resources are deployed
based off the Terraform plan. However, there are many situations where a
resource either already exists or is added manually, and as such, admins will
need to add this existing resource into the Terraform state file.

1. Determine the type of resource that exists and needs to be imported into the
   Terraform state file. In this example, an account that already exists in
   Turbot will be used.

2. Create a configuration for the account to be imported within the root module.
   In this example, the following code will be added to the `config.tf` file:

```hcl
resource "turbot_resource" "060977262170" {
  parent   = "202874855518985"
  type     = "tmod:@turbot/aws#/resource/types/account"
  akas     = ["arn:aws:::060977262170"]
  data     = <<EOT
{
  "Id": "060977262170"
}
EOT
  metadata = <<EOT
{
  "aws": {
    "accountId": "060977262170",
    "partition": "aws"
  }
}
EOT
}
```

<div className="alert alert-info">
Note: The parent resource can be defined by the Turbot ID or the AKA (i.e. `tmod:@turbot/turbot#/` would be used if the parent is the root Turbot resource). The `Id` is the Turbot Id of the resource that needs to be imported into the Terraform state file.
</div>

3. Once configured, open a bash terminal and cd into the folder with the
   Terraform `config.tf` file. Once there, run the following command:

```bash
terraform import turbot_resource.060977262170 202875044433112
```

4. The output of the console will show if the import was successful or not. If
   there are any errors, verify that the syntax in the Terraform config file is
   correct. Just like with YAML, spacing in Terraform files can make the
   difference between a successful and unsuccessful import.

## Further Reading

- Explore the
  [Reference Documentation](https://www.terraform.io/docs/providers/turbot/index.html)
  on the official Hashicorp website for detailed information on all supported
  resources and authentication.

- Explore the [Guardrails Samples Repo](https://github.com/turbot/guardrails-samples) for example Terraform
  configurations to manage your Turbot Workspace as code.
