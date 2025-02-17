---
title: Permissions
template: Documentation
nav:
  order: 40
  title: Permissions
---

# Managing Azure Permissions

Turbot provides a rich set of capabilities for managing authentication of users,
as well as authorization to Azure services and resources. Turbot integrates with
Azure Role-Based Access Control to provide a simple but flexible model for
managing access to your Azure subscriptions using Azure Custom Roles.

Permissions policies are used to customize which levels are available to assign
permissions, as well as the set of operations that those levels encompass. Refer
to the [permissions core concepts](concepts/iam/permissions) documentation for
more information.

## Enabling Azure permissions

To enable full Azure permissions management through Turbot with a default
configuration, set the
[`Azure > Turbot > Permissions`](https://turbot.com/guardrails/docs/mods/azure/azure-iam/policy#azure--turbot--permissions)
policy to "Enforce: Role Mode".

To set this policy via Terraform:

```hcl
resource "turbot_policy_setting" "azure_permissions" {
  resource        = "id of subscription or parent folder or smart folder"   //highlight-line
  type            = "tmod:@turbot/azure-iam#/policy/types/permissions"
  value           = "Enforce: Role Mode"
}
```

## Standard Levels

The `Permissions > Levels` policies configure which standard Turbot roles will
be created. Levels enabled in this policy will appear in the UI, and can be
assigned to a user in the Turbot console.

This gives you a large degree of control about what rights can be granted in
your organization -- You can choose to disable levels that don't apply. Example
use cases:

- My organization does not use the `Azure/User`, so I don't want it to be
  grantable in the UI
- My organization only assigns access using the subscription level permissions
  (`Azure/Admin`, `Azure/Operator`, etc), and I don't want the overhead of
  creating and managing all of the service-specific options
  (`Azure/Compute/Admin`, `Azure/Compute/Operator`, `Azure/Storage/ReadOnly`,
  etc)

Standard permission levels are:

- **User**
- **Metadata**
- **ReadOnly**
- **Operator**
- **Admin**
- **Owner**
- **SuperUser** [not applicable to individual services]

Subscription-level permission level policies (`Azure/Admin`, `Azure/Metadata`,
etc) can be configured in
[`Azure > Permissions > Levels`](https://turbot.com/guardrails/docs/mods/azure/azure-iam/policy#azure--turbot--permissions--levels).
By default, all levels are enabled.

Permission level policies for each service are disabled by default, but can be
configured in `Azure > {service} > Permissions > Levels`.

<div className="example">
  <ul>
    <li><code> Azure > Storage > Permissions > Levels </code></li>
    <li><code> Azure > Compute > Permissions > Levels </code></li>
  </ul>
</div>

You can use the `Azure > Permissions > Levels [Default]` policy to configure the
default levels for _all_ services. By default, service-level permissions are
_not_ enabled.

<div className="alert alert-warning">
Note that permissions levels will not be created if no permissions are actually effective at that level, even if they are enabled by the <code>Permissions > Levels</code> policies.  For example, if you enable permissions with all levels enabled (the default configuration), but no services are enabled, only the <code>Azure/SuperUser</code> is created - No other levels have any permissions defined, thus they will not be created.  Enabling a service, (<code>Azure > Storage > Enabled</code>, for example) will result in creation of additional levels (<code>Azure/Admin</code>, <code>Azure/Operator</code>, <code>Azure/ReadOnly</code>, etc) which will then be grantable.

</div>

## Modifiers

Permission Level Modifiers provide a simple mechanism to modify the standard
permissions policies generated by Turbot. Modifiers work with Turbot's IAM rules
engine to modify the access directly in the Turbot custom role definitions.

You can use Modifiers to:

- Change what permissions levels a specific api is assigned to
- Remove access at a given permissions level
- Add access to APIs that are not defined by Turbot

Modifier example use-cases include:

- I want to add access to a new API in Azure Storage that Turbot hasn’t added
  yet
- I want to add an entirely new service that Turbot hasn’t added yet
- I want to allow a capability for my `Azure/Compute/Operator` that Turbot
  normally reserves for `Azure/Compute/Admins`.
- Turbot assigns an Azure permission to to `Azure/Storage/Operator` that I
  consider privileged - I want to reassign that permission to
  `Azure/Storage/Admins`

Modifiers leverage the existing Turbot rules engine to modify the roles that
Turbot generates. They do not generate separate roles.

Modifiers can add, remove, and change permissions for any Azure service to any
standard permission level. Modifiers effectively redefine (override) the
permission level to which an api operation is defined -- Permissions defined in
the Modifiers policy override the Turbot defaults

Modifiers are cumulative in the same way that levels are - if you add a
permission to the **Metadata** level, it is also added to **ReadOnly**,
**Operator** and **Admin**

Modifier policies exist for both provider levels and per-service levels

- Modifier policies at the provider level (Azure/Admin, etc) apply ONLY at the
  Azure level
- Modifier policies at the service level will “roll up” to the provider level
  too -- for example if you add
  `microsoft.sql/locations/longtermretentionbackups/read` to
  **Azure/SQL/Operator**, it will be assigned to **Azure/Operator** as well

To set a subscription-level Modifier, edit the
[`Azure > Turbot > Permissions > Levels > Modifiers`](https://turbot.com/guardrails/docs/mods/azure/azure-iam/policy#azure--turbot--permissions--levels--modifiers)
policy.

For a service-level modifier, edit the
`Azure > {service} > Permissions > Levels > Modifiers` policy (for example,
`Azure > Storage > Permissions > Levels > Modifiers`).

These policies should contain an array of `permission: level` assignments. For
example:

```yaml
- "microsoft.sql/locations/longtermretentionbackups/read": "operator"
- "microsoft.sql/locations/longtermretentionbackups/write": "operator"
```

Alternatively, you can set the policy with Terraform:

```hcl
resource "turbot_policy_setting" "azure_permissions_modifiers" {
  resource        = "id of subscription or parent folder or smart folder"   //highlight-line
  type            = "tmod:@turbot/azure-iam#/policy/types/permissionsLevelsModifiers"
  value           =  jsonencode([
                        {"microsoft.sql/locations/longtermretentionbackups/read": "operator"},
                        {"microsoft.sql/locations/longtermretentionbackups/write": "operator"}
                  ])
}
```

<div className="alert alert-warning">
If multiple service-level polices assign an operation to different levels, the operation will be assigned at the lower permission level in the provider permissions.  For example, if <code>microsoft.network/networkwatchers/read</code>  is assigned to <b>Azure/Network/Operator</b> and also <b>Azure/NetworkWatcher/User</b> then it will be assigned to <b>Azure/User</b>
</div>

<div className="alert alert-warning">
If an operation is set to <b>None</b> in a service-level modifier, but another service has the operation defined at that level, it will NOT be removed at the Azure level.  For example, if <code>microsoft.network/networkwatchers/delete</code> is assigned to <b>None</b> in the <b>Azure/Network/Admin</b> level, <b>Azure/Admin</b> will still have <code>microsoft.network/networkwatchers/delete</code> because it is allowed for <b>Azure/NetworkWatcher/Admin</b>
</div>

## Custom Levels

Custom Levels provide another mechanism to provide flexibility in managing Azure
permissions. Whereas Modifiers allow you to customize the rights granted to
Turbot built-in permissions levels, Custom Levels allow you to create _your own_
levels that you can use to assign access through the Turbot console.

Custom Level example use-cases:

- I have existing roles that I would like to leverage instead of / in addition
  to using Turbot’s standard roles/groups, and I would like to grant permissions
  with them from Turbot
- I want to manage access to my subscription with custom roles that I define,
  but make them grantable to my users in Turbot.

The Custom Levels policy allow you to map your existing IAM roles to Turbot
users to provide them access to Azure. The custom roles will appear in the UI in
the subscription as “grantable” to a user. They are named
**Azure/Role/{RoleName}**, for example **Azure/Role/MyCustomRole**

Custom levels can be specified via the
[`Azure > Turbot > Permissions > Custom Levels`](https://turbot.com/guardrails/docs/mods/azure/azure-iam/policy#azure--turbot--permissions--custom-levels)
policy.

```yaml
- "My Custom Role"
- "My Other Custom Role"
```

Alternatively, you can set the policy with Terraform:

```hcl
resource "turbot_policy_setting"  "azure_permissions_custom_levels" {
  resource        = "id of subscription or parent folder or smart folder"   //highlight-line
  type            = "tmod:@turbot/azure-iam#/policy/types/permissionsCustomLevelsSubscription"
  value           =  jsonencode([
                        "My Custom Role",
                        "My Other Custom Role"
                  ])
}
```
