---
title: Permissions
template: Documentation
nav:
  order: 40
  title: Permissions
---

# Managing AWS Permissions

Turbot Guardrails provides a rich set of capabilities for managing authentication of users,
as well as authorization to AWS services and resources. Guardrails integrates with
AWS IAM Identity and Access Management to provide a simple but flexible model
for managing access to your AWS accounts using native AWS IAM Roles.

Permissions policies are used to customize which levels are available to assign
permissions, as well as the set of operations that those levels encompass. Refer
to the [permissions core concepts](concepts/iam/permissions) documentation for
more information.

## Enabling AWS permissions

To enable full AWS permissions management through Guardrails with a default
configuration, set the `AWS > Turbot > Permissions` policy to "Enforce: Role
Mode" or "Enforce: User Mode".

To set this policy via Terraform:

```hcl
resource "turbot_policy_setting" "aws_permissions" {
  resource = "id of account or parent folder or policy pack"   //highlight-line
  type     = "tmod:@turbot/aws-iam#/policy/types/permissions"
  value    = "Enforce: Role Mode"
}
```

### Permissions Modes

Guardrails can be configured to operate in one of 3 permissions modes:

- **None:** Guardrails-managed AWS Permissions are turned off. This allows you to
  use the Guardrails' other AWS IAM related controls but manage AWS Authentication and Authorization
  entirely on your own. Note that if you set permissions mode to `None`, no
  lockdown or boundary policies will be created.

- **Policy-Only Mode:** Policy-Only mode allows you to build your own roles but
  leverage Guardrails policies in them. This is mostly an un-managed permissions
  mode - There is no ability to assign permissions in the Guardrails console at all.
  Policy-Only mode is the minimum required mode to use lockdown policies.

- **Role Mode:** Role Mode provides a full set of AWS permissions management
  capabilities using IAM roles. Guardrails will create roles and policies in each
  account to manage permissions. You can assign permissions to Guardrails workspace users.
  Guardrails will issue login credentials to the end-user to log in to AWS using the
  role(s) assigned to them.

- **User Mode:** User Mode provides a full set of AWS permissions management
  capabilities using IAM users. User Mode includes all the capabilities of Role Mode. This allows organizations to use
  IAM Roles or IAM users as their needs require. Guardrails will create users, groups and policies in each
  account to manage permissions. Guardrails can open AWS console sessions and generate session tokens for each user.
  Guardrails can also manage group membership for Guardrails-managed IAM users with third-party IAM groups.

#### Permission Mode Summary

|      Mode       | Permissions UI | AWS Login through Guardrails | Managed Policies | Managed Roles | Managed Users |
|:---------------:|:--------------:|:----------------------------:|:----------------:|:-------------:|:-------------:|
|    **None**     |                |                              |                  |               |               |
| **Policy-Only** |                |                              |        x         |               |               |
|  **Role Mode**  |       x        |              x               |        x         |       x       |               |
|  **User Mode**  |       x        |              x               |        x         |       x       |       x       |

## Standard Levels

The `Permissions > Levels` policies configure which standard Guardrails
roles/groups/policies will be created. Levels enabled in this policy will appear
in the UI, and can be assigned to a user in the Guardrails console.

This gives you a large degree of control about what rights can be granted in
your organization -- You can choose to disable levels that don't apply. Example
use cases:

- My Organization does not use the `AWS/User` permission level, so I don't want it to appear on the
  Guardrails Permissions page.
- My Organization only assigns access using the `AWS/*` permissions, and I don't
  want the overhead of creating and managing the service-specific permission levels.
  (`AWS/S3/*`, `AWS/RDS/*`, etc)

Standard permission levels are:

- **User**
- **Metadata**
- **ReadOnly**
- **Operator**
- **Admin**
- **Owner**
- **SuperUser** [not applicable on individual services]

Account-level permission level policies (AWS/Admin, AWS/Metadata, etc) can be
configured in `AWS > Permissions > Levels`. By default, all levels are enabled.

Permission level policies for each service (AWS/S3/Admin, AWS/S3/Metadata, etc)
can be configured in `AWS > {Service} > Permissions > Levels`.

<div className="example">
  <ul>
    <li><code> AWS > S3 > Permissions > Levels </code></li>
    <li><code> AWS > EC2 > Permissions > Levels </code></li>
  </ul>
</div>

You can use the `AWS > Permissions > Levels [Default]` policy to configure the
default levels for _all_ services. By default, service-level permissions are
_not_ enabled.

## Modifiers

Permission Level Modifiers provide a simple mechanism to modify the standard
permissions policies generated by Guardrails. Modifiers work with the Guardrails IAM rules
engine to modify the access directly in the Guardrails-managed IAM policies.

You can use Modifiers to:

- Change what permissions levels a specific API path is assigned
- Remove access at a given permissions level
- Add access to APIs that are not defined by Guardrails

Modifier example use-cases:

- I want to add access to a new API in S3 that Guardrails hasn’t added yet
- I want to add an entirely new service that Guardrails hasn’t added yet
- I want to add a capability for my EC2 Operators that Guardrails normally reserves
  for Admins
- Guardrails assigns an AWS permission to EC2/Operator that I consider
  privileged - I want to reassign that permission to EC2 Admins.

Modifiers leverage the existing Guardrails rules engine to modify the policies that
Guardrails generates. They do not generate separate policies.

Modifiers can add, remove, and change permissions for any AWS service to any
standard permission level. Modifiers effectively redefine (override) the
permission level to which an API operation is defined.

- Permissions defined in the Modifiers policy override the Guardrails defaults
- Permissions defined in the Modifiers policy override the Guardrails Capability
  Modifier Policies

Modifiers are cumulative in the same way that levels are - if you add a
permission to the **Metadata** level, it is also added to **ReadOnly**,
**Operator** and **Admin**

Modifier policies exist for both AWS levels and per-service levels

- Modifier policies at the provider level (AWS/Admin, etc) apply ONLY at the AWS
  level
- Modifier policies at the service level will “roll up” to the provider level
  too -- for example if you add glacier:CreateVault to **S3/Operator**, it will
  be assigned to **AWS/Operator** as well
    - If multiple service-level polices assign an operation to different levels,
      the operation will be assigned at the lower permission level in the provider
      permissions. For example, if S3:CreateBucket is assigned to **S3/Operator**,
      and also **ElasticBeanstalk/User**, then it will be assigned to **AWS/User**
    - If an operation is set to **None** in a service-level modifier, but another
      service has the operation defined at that level, it will NOT be removed at
      the AWS level. For example, if S3:CreateBucket is assigned to **None** in
      the **ElasticBeanstalk/Admin** level, **AWS/Admin** will still have
      S3:CreateBucket because it is allowed for **S3/Admin**

To set an account-level Modifier, edit the
[`AWS > Turbot > Permissions > Levels > Modifiers`](/guardrails/docs/mods/aws/aws-iam/policy#aws--iam--permissions--levels--modifiers)
policy.

For a service-level modifier, edit the
`AWS > {service} > Permissions > Levels > Modifiers` policy (for example,
`AWS > S3 > Permissions > Levels > Modifiers`).

These policies should contain an array of `permission: level` assignments. For
example:

```yaml
- "ec2:DescribeInstance": "admin"
- "s3:PutObject": "admin"
```

Alternatively, you can set the policy with Terraform:

```hcl
resource "turbot_policy_setting" "aws_permissions_modifiers" {
  resource = "id of account or parent folder or policy pack"   //highlight-line
  type     = "tmod:@turbot/aws-iam#/policy/types/permissionsLevelsModifiers"
  value    = jsonencode([
    { "s3:PutObject" : "admin" },
    { "ec2:DescribeInstance" : "admin" }
  ])
}
```

<div className="alert alert-warning">
If multiple service-level polices assign an operation to different levels, the operation will be assigned at the lower permission level in the provider permissions.  For example, if <code>ec2:DescribeInstance</code>  is assigned to <b>AWS/EC2/Operator</b> and also <b>EAWS/EC2/User</b> then it will be assigned to <b>AWS/User</b>
</div>

<div className="alert alert-warning">
If an operation is set to <b>None</b> in a service-level modifier, but another service has the operation defined at that level, it will NOT be removed at the AWS level.
</div>

## Capability Modifier Policies

**Capability Modifier** policies allow you to either restrict access to certain
sets of actions to Guardrails, or to allow them to admin users as appropriate.
Capability modifiers are essentially Modifiers that are pre-defined by Guardrails.
These policies are often used to force adminstration of resources through the
Guardrails control plane, and disallow direct access to the underlying AWS APIs from
users.

The Capability Modifier Policies are applied after the built-in permissions but
before the custom Modifiers:

- Capability Modifier Policies override the Guardrails default permissions assignments
- Custom Modifiers override Capability Modifier Policies

  <div className="example">
    <ul>
      <li><code> AWS > S3 > Permissions > Levels > ACL Administration</code></li>
      <li><code> AWS > S3 > Permissions > Levels > Access Logging Administration </code></li>
    </ul>
  </div>

## Custom Role Levels

Custom Role Levels provide another mechanism to provide flexibility in managing AWS
permissions. Whereas Modifiers and Custom Policies allow you to customize the
rights granted to Guardrails built-in permissions levels, Custom Role Levels allow you to
create _your own_ levels that you can use to assign access through the Guardrails
console.

### Custom Role Level example use-cases:

- I have existing roles that I would like to leverage instead of / in addition
  to using the standard Guardrails standard roles/groups.
- I want to manage my account at the sub-account level with custom roles.
- I have many categories of users in an account that each need special handling.
- I don’t want to use Guardrails for authorization at all; I will manage
  AWS/Azure/GCP users, roles, groups, and policies

The Custom Levels policy allow you to map your existing IAM roles to Guardrails-managed
users to provide them access to AWS. The custom roles will appear in the UI in
the account as “grantable” to a user. They are named
**{Provider}/Role/{RoleName}**, for example **AWS/Role/MyCustomRole**

Custom levels can be specified as YAML lists of IAM roles in the
[AWS > Turbot > Permissions > Custom Levels [Account]](/guardrails/docs/mods/aws/aws-iam/policy#aws--turbot--permissions--custom-levels-account)
or
[AWS > Turbot > Permissions > Custom Levels [Folder]](/guardrails/docs/mods/aws/aws-iam/policy#aws--turbot--permissions--custom-levels-folder)
policies. For custom roles that exist only in a single account, set
`Custom Levels [Account]` on the target account. For roles that exist across
multiple accounts, set the `Custom Levels [Folder]` policy on a Turbot folder
that holds the target accounts.

### Custom Level Setup Requirements

The assume role policy must allow access to the Guardrails IAM role. Look at the
[AWS > Account > Turbot IAM Role](/guardrails/docs/mods/aws/aws/policy#aws--account--turbot-iam-role)
policy setting for this account to see which role Guardrails is using. Guardrails only
gains access to the account through the Guardrails IAM role, so giving same assume
role policy to the Guardrails IAM role and to the custom role won't work.

Be sure that the assume role policy on the custom IAM role is restricted to the
required Principals. It's very easy to set a policy that permits anyone in the
account to assume the role. Each custom role will have requirements but as a
safe start, the assume role policy should only grant access to the Guardrails IAM
role.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::${account_id}:role/${turbot_iam_role}"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
```

### Assume Role Path

This is the sequence of assume role calls that are made for Guardrails to grant
access to a custom role to an end user.

```
Turbot Master Account -[assume into]-> Guardrails IAM Role -[assume into]-> Custom Role
```

### Guardrails Managed IAM Session Duration

Using one role to assume into another role is called "role chaining". AWS sets
the [maximum duration](https://aws.amazon.com/premiumsupport/knowledge-center/iam-role-chaining-limit/) for chained
roles at 1 hour.

### Troubleshooting Custom Roles Levels

1. Ensure that `AWS > Turbot > Permissions` is enabled with at least
   `Enforce: Role Mode`.
2. Ensure the Turbot IAM Role has sufficient permissions to assume into a custom
   role.
3. Ensure the custom role exists in the account. Guardrails should have a CMDB entry
   for each custom role.
4. Ensure the spelling of the custom role is correct in the `Custom Levels`
   policy. Full ARNs are not required, just the name of the role.
5. If using the `Custom Levels [Account]` policy, ensure the policy is set on
   the appropriate account. The custom role will not appear in the Grant
   Permission dialog unless the Resource Scope is the account. It will not
   appear in the grantable permission on folders. Use the
   `Custom Levels [Folder]` policy to make the role appear at a folder level.
6. Ensure the end user has a profile in Guardrails. Profiles are created on first
   login to the Guardrails console or provisioned by Terraform.
7. If the custom level has been granted, but Guardrails displays an error saying it
   cannot assume into the custom role, then check the assume role policy to
   ensure that the Turbot IAM role can assume into it.

## Custom Group Levels

Custom Group Levels offer another mechanism for managing AWS permissions. Whereas `Custom (Role) Levels` policy settings
allow organizations to manage access to custom IAM roles through Guardrails, the Custom Group Levels allow organizations
to attach *their own* custom IAM groups to Guardrails-managed users. The permission assignments process for Custom Group
Levels works the same way as Guardrails-standard permissions and Custom Role Levels. Note that Custom Group Levels are
only available in **User mode**. They cannot be used when **AWS > Turbot > Permissions** is set to **None**, *
*Policy-Only** or **Role Mode**.

The [AWS > Turbot > Permissions > Custom Group Levels [Account]](
guardrails/docs/mods/aws/aws-iam/policy#aws--turbot--permissions--custom-group-levels-account) policy setting references
IAM groups that already exist in an account. It is not capable of creating those IAM groups. If you would like
Guardrails to provision IAM groups in an account, please refer to the [Stack](concepts/guardrails/configured)
and [AWS > IAM > Stack](https://turbot.com/guardrails/docs/mods/aws/aws-iam/policy#aws--iam--stack) policy settings.
Guardrails makes no automatic exceptions for IAM groups listed in the Custom Group Levels policy setting. Guardrails
will not manage the "Custom" groups any differently than any other user-defined IAM groups. They will be subject to
whatever AWS > IAM > Group controls have been configured. This includes the Approved, Active, Tags, etc. controls.

### Custom Group Level Example Use-cases:

- I have existing groups that I would like to assign to an IAM user instead of/in addition to using Guardrails' standard
  groups.
- I have IAM groups that define access to data sets that I would like to manage concurrently with the Guardrails groups
  that focus on specific AWS services.

### Granting Permissions to Custom Group Levels

There's a couple of things to be aware of when granting Custom Group Level permissions.

- Be aware that Custom group levels are NOT cumulative - they don't inherit any permissions from any Guardrails-defined
  levels. They are completely independent of the Guardrails levels. On the Guardrails Permissions page, Custom Group
  Levels follow the naming convention of **{Provider}/Group/{GroupName}**, for example **AWS/Group/MyCustomGroup**.
- Custom Group Levels permission grants can only be specified at the AWS account level. They cannot be granted on a
  folder that holds multiple accounts.
- Once a custom group has been assigned to a Turbot profile on the Guardrails Permissions page, the `AWS > Turbot > IAM`
  stack control will add the group membership for the user indicated.

### Configuration Steps

To configure Custom Group Levels:

1. Set the `AWS > Turbot > Permissions > Custom Group Levels [Account]` on the target folder or account. Specify a list
   of IAM groups to be managed by the Guardrails `AWS > Turbot > IAM` control.
2. Grant Custom Group permissions to the target user(s) on Guardrails Permissions page.
3. Allow some time for the `AWS > Turbot > IAM` control to push out the changes. Successful grants will show a new group
   membership on the target user in the AWS IAM console.

A Terraform example:

```hcl
    resource "turbot_policy_setting" "aws_iam_permissions_custom_group_levels_account" {
  resource = "id of account or parent folder or policy pack"   //highlight-line
  type     = "tmod:@turbot/aws-iam#/policy/types/permissionsCustomGroupLevelsAccount"
  value    = <<EOT
    - data_oxford
    - data_cambridge
    - data_harvard
    EOT
}
```

### Troubleshooting Custom Roles Levels

1. Ensure that `AWS > Turbot > Permissions` is enabled with at least
   `Enforce: User Mode`.
2. Ensure the Turbot IAM Role has sufficient permissions to assume into a custom
   role.
3. Ensure the custom groups exist in the account. Guardrails should have a CMDB entry
   for each custom group.
4. Ensure the spelling of the custom groups are correct in the `Custom Group Levels [Account]`
   policy. Full ARNs are not required, just the name of the group.
5. Ensure the end user has a profile in the Guardrails console. Profiles are created on first
   login to the Guardrails console or provisioned by Terraform.
6. Inspect the controls for the `AWS > Turbot > IAM` control in the target account. Resolve the problems based on the
   errors found in the logs.

## Lockdown and Boundary Policies

Guardrails uses IAM policies to enforce restrictions on Guardrails-managed users and
roles (`AWS/Admin`, `AWS/Owner`, `AWS/EC2/Admin`, etc.) as well as
customer-managed users and roles (the users and roles you create outside of
Guardrails).

Lockdown and boundary policies are commonly used to implement Guardrails polices for
enabling/disabling services, regions, instance types, etc., as well as to
protect Guardrails resources from modification outside of Guardrails.

For lockdown and boundary policies to be in effect:

- You must have the aws-iam mod installed
- You must enable the IAM service (AWS > IAM > Enabled)
- You must enable AWS permissions in policy-only mode, role mode or user mode.

### Key Differences

Guardrails allows you to enforce a **_hard boundary_** to enable and disable
services and regions.

- Guardrails creates and applies an
  [AWS Boundary Policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html)
  to enforce hard boundaries.
- Hard boundaries include only service-level API whitelist and region whitelist
  policies.
- Boundary policies are always applied to Guardrails-managed roles and users created
  in the permissions stack - you cannot disable them.
- The hard boundary is set to `skip` by default for customer-managed users and
  roles (_Note that this behavior was changed in `aws-iam 5.4.1` - prior
  versions enforced the boundary by default_). To enforce the Guardrails boundary
  policy for users and roles that are not created by Guardrails, you must explicitly
  enforce the `AWS > IAM > Role > Boundary` and `AWS > IAM > User > Boundary`
  policies.
- Hard boundaries can apply to ALL users and roles - customer-managed and
  Guardrails-managed, including SuperUser and the Turbot Service Role
- If a region or service is not enabled in the boundary, there will be no access
  at all, **_even for Guardrails or Superuser_**.
    - You may want to set `AWS > IAM > Role > Boundary` to `Skip` for the service
      account that Guardrails uses to connect to your account.
    - If you do not want to apply the boundary to Superusers, you can set the
      `AWS > Turbot > Permissions > Superuser Boundary` policy to `No boundary`.
- Services disabled in the hard boundary are disabled entirely - there are no
  exceptions for specific APIs within the service.

Guardrails also defines **_soft restrictions_** on services and regions, as well as
specific instance types and API operations.

- Guardrails creates and applies **Lockdown Policies** to implement these soft
  restrictions. Lockdown policies are implemented as IAM Managed Policies that
  contain "deny" statements.
- Guardrails can attach lockdown policies on all users and roles **except the Turbot
  IAM role and Superuser**.
- In addition to `Enabled` and `Disabled`, services may be enabled for
  `Metadata only` in the lockdown policies.
- Lockdown policies are more granular than boundary policies, and are used to
  implement additional Guardrails features, such as budget or instance type
  restrictions.
- By default, lockdown policies are applied to Guardrails-managed users and roles,
  but not customer-managed users and roles. To enforce lockdown policies on
  customer-managed users and roles:
    - Set `AWS > IAM > Role > Policy Attachments > Required` and
      `AWS > IAM > User > Policy Attachments > Required` to `Enforce`
    - Set `AWS > IAM > Role > Policy Attachments > Required > Turbot Lockdown` and
      `AWS > IAM > User > Policy Attachments > Required > Turbot Lockdown` to
      `Enabled`

### Guardrails Polices for Configuring Boundary and Lockdown Policies

| Purpose                  | Hard Boundary Policies                                                                                                                                         | Soft Lockdown Policies                                                                                                                                                                                                                                              |
|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Enable/Disable Regions   | `AWS > Turbot > Permissions > Lockdown > Region Boundary`                                                                                                      | `AWS > Turbot > Permissions > Lockdown > Regions`                                                                                                                                                                                                                   |
| Enable/Disable Services  | `AWS > {service} > API Enabled`                                                                                                                                | `AWS > {service} > Enabled`                                                                                                                                                                                                                                         |
| Enforce Attaching Policy | `AWS > IAM > Role > Boundary` <br /> `AWS > IAM > Role > Boundary > Policy` <br /> `AWS > IAM > User > Boundary` <br /> `AWS > IAM > User > Boundary > Policy` | `AWS > IAM > Role > Policy Attachments > Required ` <br />`AWS > IAM > Role > Policy Attachments > Required > Turbot Lockdown` <br />`AWS > IAM > User > Policy Attachments > Required ` <br />`AWS > IAM > User > Policy Attachments > Required > Turbot Lockdown` |

### Scenarios

The following scenarios assume that you have installed the `aws-iam` mod,
enabled the iam service, and enforced `AWS > Turbot > Permissions` in
policy-only mode or higher, and have enforced the Boundary and Lockdown policies
as explained above.

##### I want to allow permissions for a service that Guardrails does not support, or for which I have not installed a Guardrails mod

- Add the APIs to the `AWS > Turbot > Permissions > Lockdown > API Boundary`
  policy. This will allow the API in both the boundary and lockdown policies.

##### I want to only enable specific regions. I do not want anyone, including Guardrails to be able to use them.

- Edit the `AWS > Turbot > Permissions > Lockdown > Region Boundary` policy to
  only include the regions you would like enabled.

##### I want to only enable specific regions, but allow Guardrails and `AWS/SuperUser` to be able to access ALL regions

- Leave the `AWS > Turbot > Permissions > Lockdown > Region Boundary` policy at
  the default (`[*]`)
- Edit the `AWS > Turbot > Permissions > Lockdown > Regions` policy to only
  include the regions you would like enabled.

##### I don't want the boundary policy to apply to the Guardrails role - Guardrails should be able to access all the regions and APIs.

- Set the `AWS > IAM > Role > Boundary` policy on the Guardrails IAM role to `Enforce: No Boundary`

##### I want disable a service. I do not want anyone, including Guardrails or Superuser to be able to use it.

- Set `AWS > {service} > Enabled` to `Disabled`
- Leave `AWS > {service} > API Enabled` at the default setting:
  `Enabled if AWS > {service} > Enabled` OR
- Set `AWS > {service} > API Enabled` to `Disabled`

##### I want disable a service for users, but allow Guardrails and Superuser to be able to use it.

- Set `AWS > {service} > Enabled` to `Disabled`
- Set `AWS > {service} > API Enabled` to `Enabled`

##### I want to enforce the lockdown policies on ALL roles

- Set `AWS > IAM > Role > Policy Attachments > Required` to
  `Enforce: Required > Items`
- Set `AWS > IAM > Role > Policy Attachments > Required > Turbot Lockdown` to
  `Enabled`
- Set `AWS > IAM > User > Policy Attachments > Required` to
  `Enforce: Required > Items`
- Set `AWS > IAM > User > Policy Attachments > Required > Turbot Lockdown` to
  `Enabled`

##### I want to set an exception to the boundary policy for a user so it is not applied

- Set the `AWS > IAM > User > Boundary` policy on the user to
  `Enforce: No Boundary`

##### I want to set an exception to the lockdown policy for a user so it is not applied

- Set `AWS > IAM > User > Policy Attachments > Required > Turbot Lockdown` to
  `Disabled` for the user

##### I want to use my own boundary policy

- Set the `AWS > IAM > User > Boundary > Policy` and
  `AWS > IAM > Role > Boundary > Policy` policies to the name of your boundary
  policy.
    - Note that the Guardrails `Region Boundary` and `API Enabled` policies will have
      a no effect if you do not apply the Guardrails boundary policy.
    - Your policy must exist - it will be be created by this policy. You can use
      the `AWS > Account > Stack` to manage this policy if you desire.
