---
title: Updating
template: Documentation
nav:
  order: 5
---

# Updating the Turbot Guardrails CLI

The Turbot Guardrails CLI periodically checks for new CLI versions.  If a newer version is available, a notification message will be displayed when any command completes in the Turbot
Guardrails CLI, indicating the `current version` and the available `new version`, along with the necessary information
that is required to update to the new version.

A typical output looks like:

```bash
New patch version of the CLI is available!                
  1.19.1 → 1.19.3                             
Changelog: https://turbot.com/guardrails/docs/releases/cli           
You can update by downloading from https://turbot.com/guardrails/docs/releases/cli   
```

### Information sent to the server

> [!IMPORTANT]
> Only anonymous information, which cannot be used to identify the user or host, is sent to server.

Such information includes:

* The CPU `architecture` and `endianness`
* The Operating System `type` (e.g. `Windows`/`Linux`/`MacOS`) and `version`

Along with these, an `anonymous ID` is sent which helps us in de-duplicating requests.

The `anonymous ID` is a randomly generated string and not based on any personally identifiable information.

### Disabling Update Checks

Use of the feature is optional and can be disabled by setting the `TURBOT_UPDATE_CHECK_DISABLE` environment variable to
**any non-empty value** or by passing `--update-check-disable` in the command-line.

Alternatively, setting `updateCheckDisable: true` in the configuration file (`~/.config/turbot/config.yml`) disables the
feature completely.

> [!IMPORTANT]
> Please note that the feature is enabled by default.
