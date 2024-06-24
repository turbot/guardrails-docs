---
title: template
template: Documentation
nav:
  order: 10
---

# Command: template
Manage template based resources.

## Usage

**Usage: `turbot template <subcommand> [options]`**

### Supported Sub-commands
|Command| Description|
|-|-
| `turbot template build` | Render a template.
| `turbot template outdated` | List all template instances which use an outdated version of the template.
| `turbot template cleanup` | Delete git branches created by `turbot template build`.
| `turbot template update` | Update some or all templates for the current mod.


#### `turbot template build` 

Render a template.

The supported options are:
- `--dir or -d` :  A [glob pattern](https://github.com/isaacs/node-glob#glob-primer) to specify template instance root(s). This needs to be surrounded with quotes to prevent shell globbing.
- `--pre-build` : Pre-build shell script.
- `--peer-path` : Path to peer-dependencies.
- `--help` : Shows help.
- `--template` : A [glob pattern](https://github.com/isaacs/node-glob#glob-primer) to specify template . This needs to be surrounded with quotes to prevent shell globbing.
- `--instance` : A [glob pattern](https://github.com/isaacs/node-glob#glob-primer) to  specify the instance(s) to build the template for.  This needs to be surrounded with quotes to prevent shell globbing.
- `--config` : The path of a yaml config file containing additional
parameters to add to the template render context.
- `--version` : A semver range specifying the template version.
- `--yes` : Execute template operations without requiring confirmation.
- `--save` :   Force the re-writing of the template instance config.  This is `false` by default.
- `--template-definitions` :  Path to the template definitions folder.
- `--global-config` : A path to the global template config fileThe default is: `~/.config/turbot/template.yml`
- `--summary` : Show a summary of the template operations before executing.  The default is `false`.
- `--verbose` : Show verbose output The default is `false`.
- `--confirm` : Confirm template operations before executing. The default is `false`.
- `--show` :   Show a summary of the template operations but do not execute. The default is `false`. 
- `--files` : Show all successfully rendered files.
- `--git` :    Use git.... The default is `false`.
- `--branch` : Specify a branch to commit the build results to - only applies if --git flag is passed.
- `--fleet-mode` : The fleet-mode determines how instances are selected for fleet operations. Default to fleet mode `update`.
- `--fleet-branch-tag` : Specify a branch to commit the build results to.
- `--issue` : Specify the issue number to include in the commit message.
- `--use-fleet-branch` : When set, all changes will be committed to a single 'fleet update branch'.
- `--use-instance-root-branch` : When set, changes for each instance root will be committed to different 'instance-root' branch.
- `--push-instance-root-branch` : When set, changes for each instance root will be committed to different 'instance-root' branch which will be pushed.
- `--rebase` : When true, any manual changes which have been applied to the templated data will be reapplied.
- `--force-current-version`: When true, manual changes will be re-applied on the current version of template.
#### `turbot template outdated` 

List all template instances which use an outdated version of the template.

The supported options are:
- `--dir or -d` :  Path to the turbot mod.
- `--pre-build` : Pre-build shell script.
- `--peer-path` : Path to peer-dependencies.
- `--help` : Shows help.
- `--template` : A regex pattern specifying templates to check, The default is ".*".
- `--template-definitions` : Path to the template definitions folder.


#### `turbot template cleanup` 


Render a template and all dependency templates.

The supported options are:
- `--dir or -d` :  Path to the turbot mod.
- `--pre-build` : Pre-build shell script.
- `--peer-path` : Path to peer-dependencies.
- `--help` : Shows help.




#### `turbot template update` 
Update some or all templates for the current mod.

The supported options are:
- `--dir or -d` :  Path to the turbot mod.
- `--pre-build` : Pre-build shell script.
- `--peer-path` : Path to peer-dependencies.
- `--help` : Shows help.
- `--template` : A regex pattern specifying templates to check, The default is ".*".
- `--template-version`: A semver range specifying the template version. The default is "*".
- `--config` : The path of a yaml config file containing additional parameters to add to the template render context. 
- `--template-root` : Select the root template folder.

