---
title: User Mode
template: Documentation
nav:
  order: 40
  title: User Mode
---

# Enabling AWS IAM User Mode

## What is User Mode?

User Mode provides a full set of AWS permission management capabilities using
AWS IAM users and groups. User mode is suited for customers that have business
restrictions preventing the use of
[Guardrails Policy-only, or Role  permission modes](integrations/aws/permissions#permissions-modes).

User Mode utilizes AWS IAM users, groups, and policies to assign rights
to user profiles in a Guardrails workspace to log into AWS accounts.

In general, Turbot recommends using Role Mode.

## Enabling User Mode

To enable User Mode, simply set the policy `AWS > Turbot > Permissions`
to `Enforce: User Mode`.

Once this policy is set, a series of actions will be triggered.

1. The policy `AWS > Turbot > Permissions > Source` will automatically run,
   generating a Terraform configuration for the `AWS > Turbot > IAM` stack control.
2. The control `AWS > Turbot > IAM` will run automatically when a change in the
   `AWS > Turbot > Permissions > Source` policy value is detected.
3. Once the necessary cloud resources are created, the `AWS > Turbot > IAM` control should go into an OK state. If there
   are errors, reach out to [Turbot Support](mailto:help@turbot.com).

## Granting Permissions to Users

Granting AWS access to Guardrails console users with User Mode is analogous to Role Mode.
Refer to our [Permissions Guide](guides/iam/permission-assignment) for more
information. Be sure to doublecheck the resource scope prior to assignment!

## AWS IAM User Mode Login Names

Guardrails-created IAM users are derived from the policy
`AWS > IAM > Login User Names`. By default, Guardrails calculates the profile username value using the following
nunjucks template:

```nunjucks
{% if $.profile.profileId %}- '{{ $.profile.profileId }}'{% else %} [] {% endif %}
```

This policy can be modified if desired, but in general the default setting is
sufficient.

Notes:

- Exceptions can be set directly on Guardrails profiles to customize the login username for specific users.
- Login User Names must be unique.

## Enabling AWS/\* Rights

- Use `AWS > {Service} > Enabled` policies to grant user rights to the specific
  service. For example, use `AWS > EC2 > Enabled` to allow EC2 permission
  grants. By default, all AWS services are denied. The `AWS > {Service} > Enabled` policy settings will enable those
  services.
- The policy `AWS > {Service} > Permissions > Levels` can be configured to
  restrict what permission levels can be assigned with respect to a particular
  service. The available options are **Metadata**, **ReadOnly**, **Operator**,
  **Admin**, and **Owner**. Refer to
  [Guardrails Standard Levels](integrations/aws/permissions#standard-levels) for
  more information.
- Allowed permission levels across all services can be defined using the blanket
  policy, `AWS > Turbot > Permissions > Levels [Default]`.
- The [AWS > Turbot > Permissions > Custom Group Levels [Account]](
  guardrails/docs/mods/aws/aws-iam/policy#aws--turbot--permissions--custom-group-levels-account) policy setting can be
  used to add custom IAM groups to the Guardrails standard `AWS/{Permission}` and `AWS/{Service}/{Permission Level}`
  permission assignments.

## Boundary Policy

Turbot can be configured to apply boundary policies to users and super users via
the following two policies:

- `AWS > Turbot > Permissions > Superuser Boundary`
- `AWS > Turbot > Permissions > User Boundary`

For questions regarding AWS Permission boundaries, refer to
[AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html).

Additionally, refer to
[Turbot Lockdown and Boundary Policy](integrations/aws/permissions#lockdown-and-boundary-policies)
documentation for more information on how Turbot utilizes boundary policies to
restrict permissions.

## Name Prefix and Paths

AWS IAM resources can have customized name prefixes as well as
[paths](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html).
This can be beneficial for customers who utilize these parameters for automation
and identification.

To set the Name prefix of an AWS IAM policy, role, or group, set:

- `AWS > Turbot > Permissions > Group > Name Prefix`
- `AWS > Turbot > Permissions > Policy > Name Prefix`
- `AWS > Turbot > Permissions > Role > Name Prefix`

To set a global name prefix. use
`AWS > Turbot > Permissions > Name Prefix [Default]`.

To set the Name path of policy, role, user, or group, set:

- `AWS > Turbot > Permissions > Group > Name Path`
- `AWS > Turbot > Permissions > Policy > Name Path`
- `AWS > Turbot > Permissions > Role > Name Path`
- `AWS > Turbot > Permissions > User > Name Path`

A global path can be defined using the policy
`AWS > Turbot > Permissions > Name Path [Default]`.
