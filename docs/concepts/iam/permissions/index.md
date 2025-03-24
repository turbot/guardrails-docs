---
title: Permissions
sidebar_label: Permissions
---

# Permissions

Guardrails provides a rich set of capabilities for managing authentication of users,
as well as authorization to cloud based services and resources.

Guardrails integrates with the native Identity and Access Management solutions for
the cloud provider but takes a loosely prescriptive approach to managing access
-- we attempt to provide a well-defined framework that allows flexibility in
implementation while greatly simplifying the management of permissions and
policies.

![](/images/docs/guardrails/turbot-iam.png)

<div className="example"> Alice is granted Turbot/Owner at the Guardrails (Workspace) level.  She can set permissions, install and uninstall mods, create sub-folders, and import cloud accounts.  She can perform any Turbot/Owner operation anywhere through the hierarchy.
</div>

<div className="example"> Bob is granted AWS/Metadata in Folder A. He can read metadata for any resources anywhere in FolderA (Account A1 and all its descendants, Account A2 and all its descendants). He has no access to anything in Folder B
</div>

<div className="example"> Carol is granted AWS/S3/ReadOnly in Account A2. She can perform any S3 ReadOnly operation (e.g. ReadOnly, Metadata, Access) in Account A2, but has no access to other services in Account A2 (EC2, etc), and no access to any other AWS accounts
</div>

## Permission Categories, Hierarchy & Inheritance

After a user has been authenticated and granted access, Guardrails Permission Levels
determine what access they should be granted to which Accounts and Resources.

Permissions in Guardrails are designed to be consistent, convenient, secure and
flexible.

&nbsp;

### Permission Levels

Each area of Guardrails (e.g. Folder, AWS, S3) defines a (sub)set of **Permission
Levels** that are consistently defined into specific categories.

The set of possible levels is consistent across services (though not all
services have all levels). Permissions levels are cumulative, where each level
includes all the permissions of the level(s) before it.

Permissions Levels, from lowest to highest are as follows:

- **User**: Can log in, but no rights
- **Metadata**: Read metadata
- **ReadOnly**: Read metadata and data
- **Operator**: Read metadata and data, make low-med risk changes
- **Admin**: Read metadata and data, make high risk changes
- **Owner**: Read metadata and data, make high risk changes, manage access,
  modify IAM resources

At the provider level, there is a special **SuperUser** level. Users assigned
SuperUser permissions have unlimited access.

- SuperUser has full access to all services, even those that Guardrails doesn't
  define permissions for.
- Lockdown policies do not apply to SuperUser.
- There are are no SuperUser levels for individual services, only the AWS
  Account or Google project.

&nbsp;

#### Guardrails Permissions

Guardrails permissions control what users are able to do through the Guardrails Console
and API.
There are 2 types of Guardrails permissions:
- `Turbot` permission levels are used to grant Cloud Governance teams access to manage the Guardrails installation, set permissions, and define policy posture.
- `Account` permission levels are used to grant limited permissions to application teams to provide visibility into the resources and controls in their account and send notifications about events affecting their account.


`Turbot` permissions are usually set at the `Turbot` root level, though they are assignable at any level in the hierarchy.

| Level               | Description                                                                                                                               |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| **Turbot/Owner**    | Manage permissions (including directories), manage mods AND                                                                               |
| **Turbot/Admin**    | Manage Guardrails resources and policies, including managing Guardrails folders, AWS Accounts, GCP Projects, Azure Subscriptions, etc AND |
| **Turbot/Operator** | Run policy values & controls AND                                                                                                          |
| **Turbot/ReadOnly** | View resource data in the CMDB\*\*\* AND                                                                                                  |
| **Turbot/Metadata** | View resource data in the CMDB\*\*\* AND                                                                                                  |
| **Turbot/User**     | Log into the console                                                                                                                      |

\*\*\* At present, all the resource data stored in the Guardrails CMDB is considered
to be metadata, thus **Turbot/ReadOnly** and **Turbot/Metadata** are currently
the same.

The `Account` permission levels are similar in many ways to the `Turbot` levels, but they are intended to be used for application teams that own the account.  Account teams are often responsible for adhering to corporate governance policy in their account but not for defining or enforcing such policies.  As a result, `Account/Admin` can only configure policies that are related to notification routing.

The account team is often the main point of contact for the account, and users with `Account` permissions are often the target of notifications.

`Account` permissions are only assignable on account resources (AWS Accounts, Azure subscriptions, GCP projects, Kubernetes Clusters, etc).


| Level	             | Description
|--------------------|---------------------------------------------------------
| **Account/Owner**    |	Manage `Account/*` permissions (only); AND
| **Account/Admin**    |	Manage account-level policies around notification and issue routing ; AND
| **Account/Operator** |	Run specific quick actions (cloud provider actions like start/stop instance, set tags, etc); AND
| **Account/ReadOnly** |	View resource data in the CMDB for the account



&nbsp;

#### Cloud Provider Example - AWS Permissions

AWS permissions are specific to the service they are granting permissions for
while following the general guidelines listed above. For instance, AWS/EC2/Admin
allows users to launch and terminate instances (high risk changes) while
AWS/EC2/Operator allows users to stop and start instances (medium risk changes):

The Guardrails-standard roles described below automatically accounts for any `AWS > {Service} > Enabled` policy
settings. By default, access is denied to all AWS services.

| Level             | Description                                                                                                        |
|-------------------|--------------------------------------------------------------------------------------------------------------------|
| **AWS/SuperUser** | Allows full access permissions to the service with no preventative controls.                                       |
| **AWS/Owner**     | Manage permissions in AWS, e.g., management of AWS IAM users, groups, roles, and policies AND                      |
| **AWS/Admin**     | Perform high to medium risk changes, e.g., creating and deleting resources, policy management AND                  |
| **AWS/Operator**  | Perform medium to low risk changes, e.g., stopping and starting resources, tag management, snapshot management AND |
| **AWS/ReadOnly**  | Read data, e.g., S3 key contents AND                                                                               |
| **AWS/Metadata**  | Read configuration data and metadata, e.g., describe instance configurations, list buckets.                        |

Guardrails also supports permission assignments to Custom Roles and to Custom Groups.

| Level                     | Description                                                  |
|---------------------------|--------------------------------------------------------------|
| **AWS/Role/{RoleName}**   | Grants access to a custom IAM role                           |
| **AWS/Group/{GroupName}** | Attaches a custom IAM group to a Guardrails-provisioned user |

&nbsp;

### Permission Types

The permissions levels are applied to **permission types**, which define the
types of resources or services to which they will apply. For example, **AWS**
permissions types apply to all the resources within an AWS account, whereas
**AWS/S3** permissions apply only resource in the S3 service.

### Permissions & Grants

A **permission** is the combination of a permission type and level, for example:
`AWS/Admin`, `AWS/S3/ReadOnly`, `AWS/EC2/Operator`.

A **grant** is the assignment of a permission to a Guardrails user or group on a
resource or resource group. For instance:

- Nathan is granted `AWS/Admin` on folder `Operations`
- The Ops group is granted `AWS/EC2/Operator` on AWS account `aab`

Note that a **grant** does not have to be an **active grant**: a grant can be
explicitly activated or deactivated. A grant activation can be set to expire at
a specific time, allowing for time-bound temporary privilege escalation.

---

## Note to Mod Authors

While Guardrails provides a centralized mechanism for granting permissions, as well
as a framework for defining permissions, it is up to the mod author to determine
how to apply the Guardrails permission levels to their resources and APIs. To
maintain consistency with other Guardrails mods, you should follow the same
guidelines for defining which level to assign a given action:

- Does the action read, list or describe only metadata properties? If so, this
  is likely a **Metadata** permission. Examples include:
  - Listing the buckets in an account or project
  - Viewing information about whether a virtual machine is running
- Does the action read (but not write) data within a resource? If so, this is
  likely a **ReadOnly** permission. Examples include:
  - Getting or listing the objects inside a bucket
  - Reading log file entries
  - Querying a database
- Can the operation be considered low-medium risk? Does it change the state of
  resources in ways that are reversible, have no impact on how the resource
  operates, and don't permanently destroy primary data? If so, this is likely an
  **Operator** permission. Examples include:
  - Powering up/down VM instances
  - Managing tags
  - Managing snapshots / backups
- Can the operation be considered med-high risk, potentially permanently
  changing or deleting resources or data? If so, this is likely an
  **Administrator** permission. Examples include:
  - Creating or deleting VM instances, databases or other cloud resources
  - Modifying network routing or gateways
  - Managing policies
- Does the operation manage permissions? If so, this is likely an **Owner**
  permission. Examples include:
  - Managing Users, Roles and Policies
  - Managing directories and authentication
- Does the technology have a mode that is completely unrestricted? If so, this
  should be reserved for the **SuperUser** level. Examples include:
  - Root Login / sudo to root
