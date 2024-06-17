---
title: login
template: Documentation
nav:
  order: 10
---

# Command: login

The `turbot login` command helps users to log into the Turbot Guardrails mod registry. It is necessary to run `login`
before executing the `publish` or `install` commands. Typically, you will be prompted for the `username` and `password`
before you attempt to log into the registry.

```
✔ Enter your turbot.com username: … ***********
✔ Enter your turbot.com password: … ***********
Logged in to turbot mod registry
```

## Usage

**Usage: `turbot login [options]`**

The `turbot login` command logs you in to the desired Turbot Guardrails mod registry.

The supported options are:

- `--help` : Shows help.
- `--registry` : The registry to log in to. Defaults to `turbot.com`.
- `--username` : Turbot Guardrails mod registry username. If a username is not specified, cached credentials (from `turbot login`) will be used.  If no cached credentials exist, `turbot login` will be run interactively to log you in.
- `--password` : Turbot Guardrails mod registry password.  If a password is not specified, cached credentials (from `turbot login`) will be used.  If no cached credentials exist, `turbot login` will be run interactively to log you in.

