---
title: "Guardrails FAQ"
sidebar_label: "Guardrails FAQ"
---

# Guardrails FAQ

---

- [What is Turbot Guardrails?](#what-is-turbot-guardrails)
- [What public cloud providers does Guardrails support?](#what-public-cloud-providers-does-guardrails-support)
<!-- * [Where can I find information on pricing?](#where-can-i-find-information-on-pricing) -->
- [How is Guardrails deployed?](#how-is-guardrails-deployed)
- [Where can I find the latest information about mods?](#where-can-i-find-the-latest-information-about-mods)
- [What are the benefits of upgrading workspace versions?](#what-are-the-benefits-of-upgrading-workspace-versions)
- [What is needed to configure Guardrails Firehose?](#what-is-needed-to-configure-guardrails-firehose)
- [Is there a way to create a Guardrails File in the console?](#is-there-a-way-to-create-a-guardrails-file-in-the-console)
- [Can I use Active Directory or SAML groups to assign permissions rather than assigning permissions to individual users?](#can-i-use-active-directory-or-saml-groups-to-assign-permissions-rather-than-assigning-permissions-to-individual-users)
- [Does the Turbot/Operator role have Create, Read, Update and Delete permissions for Files?](#does-the-turbotoperator-role-have-create-read-update-and-delete-permissions-for-files)
- [How do I change the local directory user password?](#how-do-i-change-a-local-directory-user-password)
- [Is there a way to generate an API key for a different Guardrails user profile other than my own?](#is-there-a-way-to-generate-an-api-key-for-a-different-guardrails-user-profile-other-than-my-own)
- [How can I check control states for resources that have been deleted?](#how-can-i-check-control-states-for-resources-that-have-been-deleted)
- [Can I use cli/graphql command to get the list of current users and their associated grants?](#can-i-use-cligraphql-command-to-get-the-list-of-current-users-and-their-associated-grants)
- [Can I generate AWS Access Keys programmatically?](#can-i-generate-aws-access-keys-programmatically)
- [How does Guardrails protect my AWS account from the confused Deputy problem?](#how-does-guardrails-protect-my-aws-account-from-the-confused-deputy-problem)
- [What is Guardrails AWS IAM Role External ID Protection?](#what-is-guardrails-aws-iam-role-external-id-protection)
- [What causes Guardrails Event Handler policies to re-run?](#what-causes-guardrails-event-handler-policies-to-re-run)
- [How can I delete AWS accounts from Guardrails with a large number of resources?](#how-can-i-delete-accounts-from-guardrails-with-large-a-number-of-resources)
- [What data does Guardrails store?](#what-data-does-guardrails-store)
- [How is data protected on Guardrails Cloud](#how-is-data-protected-on-guardrails-cloud)

---

## What is Turbot Guardrails?

Turbot Guardrails is a full-stack governance platform. Our software automates discovery and
remediation of your organization’s compliance, security, and operational
objectives.

Discover everything, remediate anything!

## What public cloud providers does Guardrails support?

Guardrails has support for [AWS](integrations/aws), [Azure](integrations/azure), and
[Google Cloud](integrations/gcp), as well as Operating Systems (and Kubernetes
coming soon!).

If Guardrails does not currently support your platform, it can! Guardrails' extensible
platform allows you to build your own [mods](mods) with the
[Guardrails CLI!](reference/cli)

## How is Guardrails deployed?

You can host Guardrails as a single tenant platform within your own VPC or Guardrails
can host it for you (single tenant or multi-tenant) as a managed service.

## Where can I find the latest information about mods?

Our [Mods](mods/) page has a full list of mods published by Turbot Guardrails. Searching
the list is as easy as typing in the service name and pressing enter! Clicking
the mod will render the mod information page, which can include a README (some
are self explanatory, i.e. AWS-Amplify), an inspect tab, dependencies, and a
version history.

The inspect tab contains all of the defined resource types, policy types, and
control types, as well as the schema definitions. Expanding any of the links
provides more details.

The dependency tab shows which other mods must be installed, and their versions,
prior to installing the selected mod.

The versions tab shows the change history for the selected mod.

While some mods are static, others can change with updates and features, so be
sure to keep an eye out for new mod versions!

## What are the benefits of upgrading workspace versions?

**Benefits for the account owners**:

- Less Guardrails API calls in their account
- subscribable notifications
- Support for more AWS services
- Searchable CMDB
- See detailed configuration change over time

**Benefits for the cloud team**:

- Lower cost to run Guardrails
- Real-time dashboard
- Modular (only install what you are using)
- Extensible, via calculated policies/custom mods
- Configuration as code... use terraform to configure Guardrails
- Easier API for reporting and data extraction
- Change control: see who changed what in Guardrails without looking through audit
  logs

## What is needed to configure Guardrails Firehose?

Install `firehose-aws-sns` mod on your workspace and a service user for the
email. Refer to the [Guardrails Firehose](guides/firehose) guide for more
information. A full configuration script can be found in the
[Guardrails Samples](https://github.com/turbot/guardrails-samples/tree/master/mod_examples/firehose-aws-sns/setup/terraform).

## Is there a way to create a Guardrails File in the console?

Yes. Go to the folder where you want to create the file and click `New`. Select
resource type as `File`, enter the details, and click `Create`. Head over to our
[Guardrails Files](guides/files) guide for more information.

## Can I use Active Directory or SAML groups to assign permissions rather than assigning permissions to individual users?

We do support the use of Active Directory and SAML groups to assign permissions.
Keep in mind that SAML groups do not sync automatically - the groups are created
when a user who is in said group logs in for the first time. Users in that group
who log in after the initial group creation will be automatically assigned to
that group. Check out our [Directories](guides/directories) guide for more
information.

## Does V5 allow the ability to monitor and alert on who is using AWS services?

Yes! This is a feature of the [Guardrails Firehose](mods/turbot/firehose-aws-sns)
mod. Watches can be configured to notify based on defined criteria, such as
admin and user activity. The inspect tab on the mod page has additional
information, as does our [Guardrails Firehose](guides/firehose) guide page.

## Does the Turbot/Operator role have Create, Read, Update and Delete permissions for Files?

The `Turbot/Operator` role has the ability to read Files, but can not create,
update, or delete them. This is using the default `turbot/operator` permission.

## How do I change a local directory user password?

- Login as a `Turbot/Owner`.
- Click on `Permissions` tab in the header.
- Click on `DIRECTORIES` card.
- Click on the local directory that contains the user and then the `Users` tab.
- Click `Reset Password` option for the desired user, which is a key icon. A new
  password will be displayed that can be used immediately.

Check out our [IAM guide](guides/iam) for more information.

## Is there a way to generate an API key for a different Guardrails user profile other than my own?

This is not currently possible from the security point of view. Hence it is
limited to the user profile itself only.

Based in cyber security best practices, this is not possible in Guardrails. Users
can only generate access keys for themselves. If a service user needs a new
access key, an administrator must log into the Guardrails console with the service
role to delete the old key and create a new one.

## How can I check control states for resources that have been deleted?

Using the `Activity Ledger` report in Apollo, you can check control states for
resources that have been deleted. Click the `Reports` tab, then click
`Activity Ledger` in the `Activity` section. Once the list loads, click the
`Type` drop down menu on the right and select `Control`. This gives a history of
all controls for existing and past resources. Using [filters](reference/filter),
users can curate the data for the desired information.

![report](/images/docs/guardrails/activity-ledger-1.png)

![activities](/images/docs/guardrails/activity-ledger-2.png)

Check out our [Searching and Filtering](guides/searching-filtering) guide for
more helpful tips, tricks, and information.

## Can I use cli/graphql command to get the list of current users and their associated grants?

1. By using below GraphQL, you can get the list of users and their permissions.
   Change the `resourceId` in the below query according to the resource level
   where you want to see the list.

```graphql
{
  listUsers: resources(
    filter: "resourceTypeId:tmod:@turbot/turbot-iam#/resource/types/profile limit:5000"
  ) {
    metadata {
      stats {
        total
      }
    }
  }
  activeGrantToUser: activeGrantList(
    filter: "resourceId:173249879813121 level:self,descendant permissionTypeLevel:self,descendant limit:5000"
  ) {
    metadata {
      stats {
        total
      }
    }
    items {
      grant {
        identity {
          profileId: get(path: "profileId")
        }
        type {
          uri
        }
        level {
          uri
        }
      }
    }
  }
}
```

Check out our [7-minutes-labs-GraphQL](7-minute-labs/graphql) for more helpful
tips and tricks.

2. By using Guardrails CLI, you can get the list of users and their permissions. You
   can save the above query as a `.txt` file in your local drive and pass the
   file path. Example to run Guardrails CLI for the above query is:
   `turbot graphql --query /Users/ABC/graphql/listuserwithgrant.txt`. Please
   refer to [Guardrails CLI](reference/cli) for installation and commands.

## Can I generate AWS Access Keys programmatically?

Yes! This can be accomplished by a GraphQL query or
[Guardrails CLI aws command](reference/cli/commands/aws).

**GraphQL Query**: Passing in [consoleLoginUrl](reference/graphql/object/Aws)
and [AwsCredentials](reference/graphql/object/AwsCredentials) information,
Guardrails will respond with an access and secret access key. This can be done via a
preferred scripting language - you can find additional scripting examples on our
[Guardrails Samples](https://github.com/turbot/guardrails-samples/tree/master/api_examples).

Refer to
[AWS IAM documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_use-resources.html)
for instructions on using the temporary access keys.

```graphql
# Console Login Example for Custom Role "example_role" to login to the "123456789012" AWS Account
{
  aws {
    consoleLoginUrl(
      account: "arn:aws:::123456789012"
      permissionType: "tmod:@turbot/aws#/permission/types/aws"
      permissionLevel: "tmod:@turbot/turbot-iam#/permission/levels/role"
      role: "example_role"
    )
    credentials(
      account: "arn:aws:::123456789012"
      permissionType: "tmod:@turbot/aws#/permission/types/aws"
      permissionLevel: "tmod:@turbot/turbot-iam#/permission/levels/role"
      role: "example_role"
    ) {
      sessionToken
      expiration
      accessKeyId
      secretAccessKey
    }
  }
}
```

**Guardrails CLI**: Start by ensuring the
[Guardrails CLI is configured](reference/cli/installation). Once that is done, we
can run the [aws](reference/cli/commands/aws) command to generate temporary AWS
credentials and save them to the AWS credentials file.

```cli
turbot aws credentials --account 123456789012 --level superuser
```

Note that in both of these cases we are generating credentials to assume into
the account using the **Superuser** role. The `permissionLevel` attribute in the
GraphQL command and `level` flag with the CLI are used to designate the
[permission level](concepts/iam/permissions#permission-levels).

## How does Guardrails protect my AWS account from the confused Deputy problem?

By default, Guardrails suggests an External ID to be used for your AWS Account
import. The generated ID is in a protected format,
turbot:{TurbotWorkspaceResourceId}{UserDefinedName}; e.g.
`turbot:123456789012345:foo`. When using the protected format of
`turbot:{TurbotWorkspaceResourceId}:`, Guardrails will make sure the resource ID
matches the Guardrails Workspace the account is being imported with. If the Guardrails root
resource ID does not match, credentials will not be generated for the account to
be associated to Guardrails.

By default, Guardrails IAM Role External ID Protection is set to `Open` where Guardrails
suggests a protected name, however the user can replace with their own external
ID.

When set to `Protected`, the external ID must be in the protected format for
credentials to be generated for the account to be associated to Guardrails.

More information about the
[External ID Protection Policy](mods/aws/aws/policy#aws--account--turbot-iam-role--external-id--protection).
More information about the
[confused Deputy problem](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html).

## What is Guardrails AWS IAM Role External ID Protection?

During an [AWS Account Import](integrations/aws/import-aws-account), Guardrails will
suggest an auto-generated external ID that is unique to your Guardrails Workspace
(e.g. `turbot:123456789012345:26c29c72-4406-44a6-ac53-bd8b6e4d1437`). You can
use the generated external ID for your IAM role to prevent the
[confused deputy problem](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html#confused-deputy).

The `turbot:123456789012345:` prefix is derived from your unique Guardrails
Workspace resource ID. When using this external ID format, if the IAM role is
attempted to be imported to another Guardrails Workspace, Guardrails will validate the
unique Workspace resource ID in the external ID and block the import to protect
unauthorized use of the IAM Role outside of the intended Guardrails Workspace.

The suffix `26c29c72-4406-44a6-ac53-bd8b6e4d1437` (This is just an example. Your
real external ID will be a similar randomly generated string) is always optional
in the protected format. Common use cases are to keep the generated suffix for a
unique external ID per account, or a custom defined suffix for each account.

By default, the Guardrails Workspace sets the following policy
`AWS > Account > Turbot IAM Role > External ID > Protection` to `Open`. While
the Guardrails suggested external ID is generated for use, the entire value can be
replaced with your own external ID instead (e.g. `mySpecialExternalId123`).
Guardrails recommends you use the generated format to protect against the confused
deputy problem (see above). However, any valid formatted external ID is accepted
for the import.

To enforce the use of the protected auto-generated format, the policy mentioned
above can be set to `Protected`. Guardrails will block any custom external ID
values, only allowing a protected format for the prefix
`turbot:123456789012345:`. The suffix will still be optional to use the
generated value or a custom value.

Note that while AWS allows most traditional characters to be a part of the
external ID, there are restrictions as to which external ID actually work for
Guardrails:

> The external ID value that a third party uses to assume a role must have a
> minimum of 2 characters and a maximum of 1,224 characters. The value must be
> alphanumeric without white space. It can also include the following symbols:
> plus (+), equal (=), comma (,), period (.), at (@), colon (:), forward slash
> (/), and hyphen (-).

Refer to
[AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html)
for more info.

## What causes Guardrails Event Handler policies to re-run?

Guardrails event handler policies are initially calculated at the time of mod
installation. However, some actions can trigger event handler policy
re-calculation, and with a large amount of accounts imported and regions
enabled, this can generate a significant amount of events.

Updates and actions that can cause event handler policy re-calculations:

- Updating mods such as aws-events, aws-sns, aws-ec2, and aws-cloudwatch.
- Updating Turbot Guardrails Enterprise.
- Modifications to
  `AWS > Turbot > Event Handlers > Events > Rules > Event Sources > @mod-name`
  policies.

It is recommended to wait at least 15-20 minutes in the case of a large event
handler policy re-run. If errors are generated and do not clear on their own in
up to 30 minutes, reach out to [Guardrails Support](mailto:help@turbot.com).

## How can I delete AWS accounts from Guardrails with a large number of resources?

In rare circumstances, attempting to delete an AWS account can result in a
timeout. This is usually due to a large amount of resources within an account.
To delete large accounts, a delete account script lives in the Guardrails Samples Repo.

- [Guardrails AWS account delete script](https://github.com/turbot/guardrails-samples/tree/master/guardrails-utilities/python-utils/remove_aws_account)

Be sure to change the Guardrails data resource `deleteThisAwsAccount` id value to
the arn of the account that must be deleted.

Some important notes taken from the readme:

1. With no flags set, the script will check connectivity and report back the
   number of CMDB policies and resources currently cataloged in the Guardrails CMDB.

2. With the --disable flag set, the script will disable all CMDB controls in the
   account which will result in deletion of Guardrails CMDB records.

3. With the --delete flag set, the script will delete any child resources in the
   Guardrails CMDB.

4. With the --delete-acct flag set, the script will attempt to delete the AWS
   account from Guardrails.

There is also an optional terraform template to remove the Guardrails event handlers
in the account. If the account will remain active after removing from Guardrails,
this script must be run, and you must wait for the controls to return to an OK
state before deleting the account.

### What version of Python, Terraform, and the Guardrails CLI is required?

Python version 3.5.0 or greater. Terraform version 0.13 or greater. Guardrails
recommends that the latest Guardrails CLI version is used, which you can find in the
[reference section](reference/cli).

Please reach out to [Guardrails support](mailto:support@turbot.com) if there are
questions or issues in deploying the script.

## What data does Guardrails store?

Guardrails stores the following information about imported cloud resources:

1. Configuration data about cloud resources. For example, Guardrails keeps track of
   a database instance, but not the data in the instance.
2. A history of resource change. As the database configuration changes (disk
   size, instance type, etc), Guardrails will record this.
3. Identity information provided in SAML / SSO authentication requests. Commonly
   this is names & email address for each Guardrails user.

No business data (e.g. Object in S3, data in CosmosDB tables, rows on BigTable,
etc.) is stored anywhere in Guardrails. Guardrails is not programmatically setup to read
this information, and also customers are in full control of what permissions
they grant Guardrails (e.g. do not grant Guardrails `s3:GetObject`, or explicitly deny
this permission to Guardrails).

## How is data protected on Guardrails Cloud?

Guardrails Cloud is audited annually as part of Turbot's
[SOC2 Type II certification](https://turbot.com/security). As part of these
controls all layers of the product are encrypted in transit and any persistent
storage is encrypted at rest. Any elevated access to SREs to support the Guardrails
Cloud Infrastructure is only granted in time of need based on a critical issues,
all audit trailed and audited by our SOC2 requirements.
