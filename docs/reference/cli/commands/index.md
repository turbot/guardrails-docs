---
title: Commands
template: Documentation
nav:
  order: 10
---

# Turbot Guardrails CLI Commands

Turbot Guardrails CLI supports the following commands:

| Command                                           | Description                                                                                               |
| ------------------------------------------------- |-----------------------------------------------------------------------------------------------------------|
| [aws](reference/cli/commands/aws)                 | Manage credentials for AWS profiles                                                                       |
| [completion](reference/cli/commands/completion)   | Generate CLI auto-complete script                                                                         |
| [compose](reference/cli/commands/compose)         | Compose a mod. Resolve all inclusion directives starting from 'package.source', output to 'package.main.' |
| [configure](reference/cli/commands/configure)     | Alias for [`turbot workspace configure`](reference/cli/commands/workspace)                                |
| [download](reference/cli/commands/download)       | Download mod zip file from registry                                                                       |
| [graphql](reference/cli/commands/graphql)         | Execute GraphQL queries and mutations against the Turbot Guardrails API                                   |
| [init](reference/cli/commands/init)               | Create a new mod and initialise with common controls                                                      |
| [inspect](reference/cli/commands/inspect)         | Display summary information about the mod                                                                 |
| [install](reference/cli/commands/install)         | Download mod header files for all dependencies and install in turbot_mods folder                          |
| [login](reference/cli/commands/login)             | Login to Turbot Guardrails mod registry. Required before running 'publish' or 'install'                   |
| [pack](reference/cli/commands/pack)               | Pack the mod into a zipfile                                                                               |
| [publish](reference/cli/commands/publish)         | Publish the mod to the Turbot Guardrails mod registry                                                     |
| [template](reference/cli/commands/template)       | Manage template based resources                                                                           |
| [test](reference/cli/commands/test)               | Run tests for the mod                                                                                     |
| [up](reference/cli/commands/up)                   | Deploy the mod to a Turbot Guardrails workspace                                                           |
| [vcr &lt;command&gt;](reference/cli/commands/vcr) | Background process to record and mock HTTP requests. Commonly used with 'turbot test'                     |
| [workspace](reference/cli/commands/workspace)     | Manage Turbot Guardrails workspace credentials for this machine                                           |

## Global Options

- `--version` | Show CLI version
- `--help` | Show help
