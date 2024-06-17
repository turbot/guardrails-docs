---
title: pack
template: Documentation
nav:
  order: 10
---

# Command: pack

Pack the mod into a zipfile.

```bash
$ turbot pack
Running prepack script: ./build.sh
Zipping mod
turbot pack complete, wrote: /Users/jsmyth/src/turbot-v5/turbot-mods/packages/aws-macie/index.zip
$ 

```

## Usage

**Usage: `turbot pack`**

The supported options are:
- `--include-build-number` : Include the build number in the local packed file.  The default is `false`
- `--dir or -d` : Path to the Turbot Guardrails mod that you want to run the `turbot init` in.  The default is `.`.
- `--help` : Show help.
- `--pre-build` : Pre-build shell script.
