---
title: workspace
template: Documentation
nav:
  order: 10
---

# Command: workspace

The `turbot workspace` set of commands is used to manage Turbot Guardrails workspace
credentials for this machine.

Turbot credentials are required to connect to your workspaces when using
commands such as `turbot up` or `turbot graphql`.

For more information on setting up your credentials, refer to the
[CLI Installation](reference/cli/installation#setup-your-turbot-credentials)
section.

## Usage

**Usage: `turbot workspace <subcommand> [options]`**

### Supported Sub-commands

| Command                      | Description                       |
| ---------------------------- |-----------------------------------|
| `turbot workspace configure` | Configure workspace credentials   |
| `turbot workspace list`      | List locally configured workspaces |

---

#### `turbot workspace configure`

Create a new Guardrails workspace configuration or update an existing workspace configuration.

This command validates the provided credentials against the provided Guardrails
workspace. If validation fails or the `workspace` is unreachable, the
credentials are not saved.

The supported options are:

- `--credentials-file filename` - Path to the shared credentials file. The
  default is `~/.config/turbot/credentials.yml`
- `--profile` : The name of the Turbot profile to associate with the
  credentials.
- `--workspace` : The workspace url.
- `--accessKey` : The access key.
- `--secretKey` : The secret key.
- `--help` : Show help.

---

#### `turbot workspace list`

List existing workspaces in this machine

The supported options are:

- `--credentials-file filename` - Path to the shared credentials file. The
  default is `~/.config/turbot/credentials.yml`
- `--profile` : The name of the Turbot profile to display. If omitted, all
  profiles are listed.
- `--help` : Show help.
