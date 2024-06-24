---
title: file
template: Documentation
nav:
  order: 10
---

# Command: file

The `turbot file` set of commands is used to manage file resources in a Turbot Guardrails workspace.

## Usage

**Usage: `turbot file <subcommand> [options]`**

### Supported Sub-commands

| Command           | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `turbot file cp`  | Copy local `json` or `yml` file to a Guardrails workspace or vice versa. |
| `turbot file rm`  | Remove a file from Guardrails workspace.                                 |
| `turbot file cat` | Type out a file from Guardrails workspace.                               |

---

#### `turbot file cp <source> <destination> [options]`

Copy a `json` or `y(a)ml` file from the local machine to a Turbot Guardrails workspace or vice versa.

The `source` or `destination` can be either local a local file or a _file resource_ in a Guardrails workspace, denoted by prefixing the _resource aka_ with `turbot://` (for example: `turbot://valid_aka`.).

If the `destination` already exists (be it a Turbot Guardrails resource or a local file), then the CLI prompts for a confirmation before overwriting. This behaviour can be overridden with `--force`.

The supported options are:

- `--credentials-file filename` - Path to the shared credentials file. The default is `~/.config/turbot/credentials.yml`
- `--profile` : The name of the Turbot Guardrails profile to associate with the credentials.
- `--workspace` : The workspace url.
- `--accessKey` : The access key.
- `--secretKey` : The secret key.
- `--force` : Remove existing destinations without prompting.
- `--recursive`: Recursively copy files from the `source` to the `destination`
- `--format` : Format of the local file in the command. Can be either `json` or `yaml`. If omitted, `yaml` is assumed by default.
- `--help` : Show help.

Depending on the `source` and `destination` the command has different outcomes:

##### `turbot file cp local.json|local.yml turbot://<file resource aka>`

Copies the contents of `local.json` to `turbot://<file resource aka>`.

##### `turbot file cp local.json|local.yml turbot://<folder resource aka>`

Creates a file resource with the contents of the local file with the `folder resource` with the given `aka` as parent.

##### `turbot file cp turbot://<file resource aka> local.json|local.yml`

Copies the contents of the _file resource_ with the given `aka` into `local.json` or `local.yml` in the `current directory`.

##### `turbot file cp turbot://<file resource aka> local_folder`

Copies the _file resource_ with the `<file resource aka>` into `local_folder`. Uses the `title` of the _resource_ as the name of the file in the local filesystem.

##### `turbot file cp turbot://<folder resource aka> local.json|local.yml`

This is invalid. The CLI does not support copying contents of an entire workspace `folder resource` into a local file.

---

#### `turbot file rm turbot://<file resource aka>`

Removes existing file from Guardrails workspaces. Prompts for confirmation before deleting the resource.

The supported options are:

- `--credentials-file filename` - Path to the shared credentials file. The default is `~/.config/turbot/credentials.yml`
- `--profile` : The name of the Turbot Guardrails profile to associate with the credentials.
- `--workspace` : The workspace url.
- `--accessKey` : The access key.
- `--secretKey` : The secret key.
- `--force` : Remove resource without prompting.
- `--help` : Show help.

---

#### `turbot file cat turbot://<file resource aka>`

Types the contents of the resource onto the `console`.

The supported options are:

- `--credentials-file filename` - Path to the shared credentials file. The default is `~/.config/turbot/credentials.yml`
- `--profile` : The name of the Turbot Guardrails profile to associate with the credentials.
- `--workspace` : The workspace url.
- `--accessKey` : The access key.
- `--secretKey` : The secret key.
- `--format` : The format to use when writing to console. Can be `json` or `yaml`. If omitted, `yaml` is assumed.
- `--help` : Show help.
