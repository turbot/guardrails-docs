---
title: Permissions
template: Documentation
nav:
  order: 40
  title: Permissions
---

# Managing GCP Permissions

Turbot Guardrails provides a rich set of capabilities for managing authentication of users,
as well as authorization to GCP services and resources. Guardrails integrates with
GCP IAM Identity and Access Management to provide a simple but flexible model
for managing access to your GCP projects using native GCP IAM Roles.

Permissions policies are used to customize which levels are available to assign
permissions, as well as the set of operations that those levels encompass. Refer
to the [permissions core concepts](concepts/iam/permissions) documentation for
more information.

## Enabling GCP permissions

To enable full GCP permissions management through Guardrails with a default
configuration, set the `GCP > Turbot > Permissions` policy to "Enforce: Role
Mode":

```hcl
resource "turbot_policy_setting" "gcp_permissions" {
  resource        = "id of project or parent folder or policy pack"   //highlight-line
  type            = "tmod:@turbot/gcp-iam#/policy/types/permissions"
  value           = "Enforce: Role Mode"
}
```

### Permissions Modes

Guardrails can be configured to operate in one of 2 permissions modes:

- **None:** Guardrails Managed GCP Permissions defaults to off. This allows you to
  use the other Guardrails controls but manage GCP Authentication and Authorization
  entirely on your own.

- **Role Mode:** Role Mode provides a full set of GCP permissions management
  capabilities using IAM roles. Guardrails will create roles and bindings in each
  project to manage permissions. You can assign permissions to Guardrails console users,
  then Guardrails will map the users the role(s) assigned to them.

## Standard Levels

The `Permissions > Levels` policies configure which standard Guardrails
roles/groups/policies will be created. Levels enabled in this policy will appear
in the Guardrails console, and can be assigned to a user in the Permissions tab.

This gives you a large degree of control about what rights can be granted in
your organization -- You can choose to disable levels that don't apply. Example
use cases:

- My Organization does not use the `GCP/User` permission, so I don't want it to appear in the Guardrails Permissions tab.
- My Organization only assigns access using the `GCP/*` permissions, and I don't
  want the overhead of creating and managing all service-specific options
  (`GCP/Storage/*`, `GCP/Compute/*`, etc.).

Standard permission levels are:

- **User**
- **Metadata**
- **ReadOnly**
- **Operator**
- **Admin**
- **Owner**
- **SuperUser** [not applicable ton individual services]

Project-level permission level policies (GCP/Admin, GCP/Metadata, etc) can be
configured in `GCP > Permissions > Levels`. By default, all levels are enabled.

Permission level policies for each service (GCP/Storage/Admin,
GCP/Storage/Metadata, etc.) can be configured in
`GCP > {service} > Permissions > Levels`.

<div className="example">
  <ul>
    <li><code> GCP > Storage > Permissions > Levels </code></li>
    <li><code> GCP > Compute > Permissions > Levels </code></li>
  </ul>
</div>

You can use the `GCP > Permissions > Levels [Default]` policy to configure the
default levels for _all_ services. By default, service-level permissions are
_not_ enabled.

## Modifiers

Permission Level Modifiers provide a simple mechanism to modify the standard
permissions policies. Modifiers work with Guardrails' IAM rules
engine to modify the access directly in the Guardrails IAM policies.

You can use Modifiers to:

- Change what permissions levels a specific api path is assigned
- Remove access at a give permissions level
- Add access to APIs that are not currently supported by Guardrails 

Modifier example use-cases:

- I want to add access to a new API in Storage that Guardrails doesn't support yet
- I want to add an entirely new service that Guardrails doesn't support yet
- I want to add a capability for my Compute Operators that Guardrails normally
  reserves for Admins
- Guardrails assigns an GCP permission to `Compute/Operator` that I consider
  privileged - I want to reassign that permission to Compute Admins

Modifiers leverage the existing Guardrails rules engine to modify the default Guardrails policies. They do not 
generate separate IAM policies.

Modifiers can add, remove, and change permissions for any GCP service to any
standard permission level. Modifiers effectively redefine (override) the
permission level to which an api operation is defined.

- Permissions defined in the Modifiers policy override the Guardrails defaults
- Permissions defined in the Modifiers policy override the Guardrails Capability
  Modifier Policies

Modifiers are cumulative in the same way that levels are - if you add a
permission to the **Metadata** level, it is also added to **ReadOnly**,
**Operator** and **Admin**

Modifier policies exist for both GCP levels and per-service levels

- Modifier policies at the provider level (GCP/Admin, etc) apply ONLY at the GCP
  level
  - `GCP > Permissions > Levels > Modifiers`
- Modifier policies at the service level will “roll up” to the provider level
  too -- for example if you add a permission to **GCP/Storage/Operator**, it
  will be assigned to **GCP/Operator** as well.
  <div className="example">
    <ul>
      <li><code> GCP > Storage > Permissions> Levels> Modifiers </code></li>
      <li><code> GCP > Computed > Permissions> Levels> Modifiers </code></li>
    </ul>
  </div>

## Capability Modifier Policies

**Capability Modifier** policies allow you to either restrict access to certain
sets of actions to Guardrails, or to allow them to admin users as appropriate.
Capability modifiers are essentially Modifiers that are pre-defined in Guardrails.
These policies are often used to force administration of resources through the
Guardrails control plane, and disallow direct access to the underlying GCP APIs from
users.

The Capability Modifier Policies are applied after the built-in permissions but
before the custom Modifiers:

- Capability Modifier Policies override Guardrails' default permissions assignments
- Custom Modifiers override Capability Modifier Policies

  <div className="example">
    <ul>
      <li><code> GCP > Storage > Permissions > Levels > ACL Administration`</code></li>
      <li><code> GCP > Storage > Permissions > Levels > Access Logging Administration </code></li>
    </ul>
  </div>

## Custom Levels

Custom Levels provide another mechanism to provide flexibility in managing GCP
permissions. Whereas Modifiers and Custom Policies allow you to customize the
rights granted to Guardrails built-in permissions levels, Custom Levels allow you to
create _your own_ levels that you can use to assign access through the Guardrails
console.

Custom Level example use-cases:

- I have existing roles that I would like to leverage instead of / in addition
  to using Guardrails' standard roles/groups
- I want to manage my project at the sub-project level with custom roles
- I don’t want to use Guardrails for authorization at all; I will manage GCP users,
  roles, groups, and policies

The Custom Levels policy allow you to map your existing IAM roles to Guardrails console
users to provide them access to GCP. The custom roles will appear in the Guardrails Grant Permissions dialog box. They 
are named **{Provider}/Role/{RoleName}**, for example **GCP/Role/NetworksAdminRole**

Custom levels can be specified via the
`GCP > Permissions > Levels > Custom Levels [Project]` policies.
