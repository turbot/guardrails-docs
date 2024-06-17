---
title: download
template: Documentation
nav:
  order: 10
---

# Command: download

Download a mod zip file from the registry.



## Usage

**Usage: `turbot download <mod> [options]`**

The supported options are:

- `--mod-version` : The mod version to download. By default, the latest version will be downloaded.
- `--output` :  Output path for the downloaded mod zip, The default is `./<mod-name>.zip`.
- `--username` : Turbot Guardrails mod registry username. If a username is not specified, cached credentials (from `turbot login`) will be used.  If no cached credentials exist, `turbot login` will be run interactively to log you in.
- `--password` : Turbot Guardrails mod registry password.  If a password is not specified, cached credentials (from `turbot login`) will be used.  If no cached credentials exist, `turbot login` will be run interactively to log you in.
- `--registry` : The registry from which to download the mod. The default is `turbot.com`
- `--help` : Show help.
