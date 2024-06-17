---
title: registry
template: Documentation
nav:
  order: 10
---

# Command: registry


The `turbot registry` set of commands is used to manage mods in the Turbot Guardrails mod registry.


## Usage

**Usage: `turbot registry <subcommand> [options]`**

### Supported Sub-commands

| Command                   | Description                                                |
| ------------------------- | ---------------------------------------------------------- |
| `turbot registry publish` | Publish the mod to the Turbot Guardrails mod registry.                |
| `turbot registry modify`  | Modify a mod already published to the Turbot Guardrails mod registry. |

---

#### `turbot registry publish`

Publishes a mod to the Turbot Guardrails mod registry.

The supported options are:

- `--username` : Mod registry username.
- `--password` : Mod registry password.
- `--registry` : Registry to publish Mod to. (default: `turbot.com`)
- `--zip-file` : Bypass mod build process and just publish the given file. Must be a fully formed zipped mod.
- `--wait` : Wait for the mod to be in 'available' state in the registry before returning.
- `--strict` : Run inspect before publishing and do not publish if inspect fails.
- `--status` : The status to set the mod after publishing. Can be one of `available`, `recommended`, `unavailable`.
- `--force-recommended` : Set selected mod version to `RECOMMENDED` and set any mod version currently set as `RECOMMENDED` to `AVAILABLE`. Overrides `--status`.
- `--help` : Show help.

---

#### `turbot registry modify`

Modifies a mod already present in Turbot Guardrails mod registry.

The supported options are:

- `--credentials-file filename` - Path to the shared credentials file. The default is `~/.config/turbot/credentials.yml`
- `--profile` : The name of the Turbot profile to display. If omitted, all profiles are listed.
- `--help` : Show help.
- `--username` : Turbot Guardrails mod registry username.
- `--password` : Turbot Guardrails mod registry password.
- `--registry` : Turbot Guardrails mod registry to use. (default: `turbot.com`)
- `--mod` : The full mod name, _e.g. `@turbot/aws`_.
- `--mod-version` : Turbot mod version to modify.
- `--status` : The status to set the mod after publishing. Can be one of `available`, `recommended`, `unavailable`.
- `--force-recommended` : Set selected mod version to `RECOMMENDED` and set any mod version currently set as `RECOMMENDED` to `AVAILABLE`. Overrides `--status`.
- `--description` : Mod description.
