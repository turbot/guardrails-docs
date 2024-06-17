---
title: publish
template: Documentation
nav:
  order: 10
---

# Command: publish

Publish the mod to the Turbot Guardrails mod registry.



## Usage

**Usage: `turbot publish [options]`**

The supported options are:
- `--username` : Turbot Guardrails mod registry username. If a username is not specified, cached credentials (from `turbot login`) will be used.  If no cached credentials exist, `turbot login` will be run interactively to log you in.
- `--password` : Turbot Guardrails mod registry password.  If a password is not specified, cached credentials (from `turbot login`) will be used.  If no cached credentials exist, `turbot login` will be run interactively to log you in.
- `--registry` : The registry to which to publish the mod. The default is `turbot.com`
- `--zip-file` : Bypass mod build process and just publish the given file. Must be a fully formed zipped mod.
- `--remove-zip` : Remove the ZIP file after publish completes. This implies that `--zip-file` is being used. Defaults to `false`.
- `--dir or -d` : Path to the Turbot mod that you want to run the `turbot init` in.
- `--strict` : Run inspect before publishing and do not publish if inspect fails. Defaults to `true`
- `--pre-build` : Pre-build shell script.
- `--status` : The status to set the mod after publishing. Allowed values are `AVAILABLE`, `RECOMMENDED` and `UNAVAILABLE`.
- `--force-recommended` : Set selected mod version to `RECOMMENDED` and set any mod version currently set as `RECOMMENDED` to `AVAILABLE`. Overrides `--status`.
- `--wait` : Wait for the mod to be in available state in the registry before returning.
- `--timeout` : Number of seconds to wait before timing out. Defaults to `120 seconds`.
- `--help` : Shows help.
