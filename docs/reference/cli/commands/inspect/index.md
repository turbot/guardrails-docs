---
title: inspect
template: Documentation
nav:
  order: 10
---

# Command: inspect

The `turbot inspect` command displays summary information about the mod. Navigate to the mod folder that you want to run an `inspect` on, and run the following command. For example, you want to run an `inspect` on the `aws-chime` mod. Navigate to `/turbot-v5/turbot-mods/packages/aws-chime`, and run:

```shell
turbot inspect
```

The Turbot Guardrails CLI will show the details of the `aws-chime` mod and it's dependencies:

```
Turbot mod: tmod:@turbot/aws-chime

Title: @turbot/aws-chime

Resource types:
AWS > Chime
AWS > Chime > Account

Policy types:
AWS > Chime > Account > Active
AWS > Chime > Account > Active > Age
AWS > Chime > Account > Active > Last Modified
AWS > Chime > Account > CMDB
AWS > Chime > Account > Usage
AWS > Chime > Account > Usage > Limit
AWS > Chime > Enabled
AWS > Chime > Permissions

Control types:
AWS > Chime > Account > Active
AWS > Chime > Account > CMDB
AWS > Chime > Account > Discovery
AWS > Chime > Account > Usage

Action types:
AWS > Chime > Account > Delete
```

## Usage

**Usage: `turbot inspect [options]`**

This command displays summary information of a mod. This is useful for testing before using them in configurations.

The `--dir` argument specifies the directory of the root module to use. If a path is not specified, the current working directory is used.

The supported options are:
* `--dir or -d` : Path to the Guardrails mod that you want to run the `inspect` in.
* `--pre-build` : Pre-build shell script.
* `--peer-path` : Path to peer-dependencies.
* `--graphql` : Shows the graphql schema for the mod structure.
* `--watch or -w` : Watch the mod directory recursively and automatically re-run the command when a change is detected.
* `--output-template` : The file path of a nunjucks template used to render the inspect results.
* ` --help` : Shows help.

When writing a nunjuck template to customise the inspect output, the following fields are available in the render context:
* `$id`: sets the base URL for the definition
* `title`: title of a mod
* `author`: author of a mod
* `version`: version of a mod
* `license`: license url
* `peerDependencies`: JSON object of dependent mods
* `scripts`: mod scripts
* `data`: The data field is generally used to store mod permissions. Below are the required fields in a permission.
    - `permission`: permission type,
    - `grant`: grant type,
    - `resourceType`: resource type on which permission type will be given,
    - `operationType`: operation performed by a particular permission type,
    - `fullCmdbUpdate`: boolean value,
    - `dependency`: dependency of permission type,
    - `date`: date in `MM/DD/YY` format,
    - `help`: short description of permission type
* `permission`
    - `types`:        permission type schema definitions
* `action`
    - `types`:          action type schema definitions
* `control`
    - `categories`:     control categories
    - `types`:          control type schema definitions
* `resource`
    - `categories`:       control categories
    - `types`:            resource type schema definitions

* `definitions`: definitions are reusable JSON schema definitions.
* `build`: build id of a mod

For more details of [mod structure](https://github.com/turbotio/turbot-mods/wiki/Turbot-Mod-Format) and [mod composition](https://github.com/turbotio/turbot-mods/wiki/Turbot-Module-Composition)
