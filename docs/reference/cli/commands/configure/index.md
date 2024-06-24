---
title: configure
template: Documentation
nav:
  order: 10
---

# Command: configure

The `turbot configure` command is used to configure Turbot Guardrails credentials for this
machine. Credentials are required to connect to your workspace when using
commands such as `turbot up` or `turbot graphql`.

For more information on setting up your credentials, refer to the
[CLI Installation](reference/cli/installation#setup-your-turbot-credentials)
section.

This command validates the provided credentials against the provided
`workspace`. If validation fails or the `workspace` is unreachable, the
credentials are not saved.

## Usage

**Usage: `turbot configure [options]`**

To configure the Turbot Guardrails CLI tool to connect to your workspace, run the
`turbot configure` command. When prompted, enter your **Profile Name** (or
create a default profile), as well as your **Workspace URL**, **Turbot Guardrails API
Access Key**, and **Turbot Guardrails API Secret Key**:

```bash
$ turbot configure
Migrating CLI config from /Users/TestUser/.turbot/config.yml to /Users/TestUser/.config/turbot/config.yml
Migrating registry file from /Users/TestUser/.turbot/registry.json to /Users/TestUser/.config/turbot/registry.yml
✔ Profile name [default] …default                                 //highlight-line
✔ Workspace URL … https://hawkeye-turbot.cloud.turbot-dev.com     //highlight-line
✔ Turbot Access Key … ************************************        //highlight-line
✔ Turbot Secret Key … ************************************        //highlight-line
Written profile 'default' to '/Users/TestUser/.config/turbot/credentials.yml'
```

The supported options are:

- `--credentials-file filename` - Path to the shared credentials file. The
  default is `~/.config/turbot/credentials.yml`
- `--profile` : The name of the Turbot Guardrails profile to associate with the
  credentials.
- `--workspace` : The workspace url.
- `--accessKey` : The access key.
- `--secretKey` : The secret key.
- `--help` : Show help.

### Supported Sub-commands

| Command                 | Description                                   |
| ----------------------- | --------------------------------------------- |
| `turbot configure list` | Show a list of the configured turbot profiles |

The supported options are:

- `--credentials-file filename` - Path to the shared credentials file. The
  default is `~/.config/turbot/credentials.yml`
- `--profile` : The name of the Turbot Guardrails profile to display. If omitted, all
  profiles are listed.
- `--help` : Show help.
