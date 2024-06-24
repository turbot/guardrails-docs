---
title: up
template: Documentation
nav:
  order: 10
---

# Command: up


The `turbot up` command deploys the mod to a Turbot Guardrails workspace. Using `up` is distinct from `publish`. For
example, you want to upload the `aws-macie` mod. Navigate to
`/turbot-v5/turbot-mods/packages/aws-macie`, and run:

```bash
$ turbot up

Turbot mod: tmod:@turbot/aws-macie

Title: @turbot/aws-macie

Resource types:
AWS > Macie

Policy types:
AWS > IAM > Permissions > Compiled > Levels > @turbot/aws-macie
AWS > IAM > Permissions > Compiled > Service Permissions > @turbot/aws-macie
AWS > Macie > Approved Regions [Default]
AWS > Macie > Enabled
AWS > Macie > Permissions
AWS > Macie > Permissions > Levels
AWS > Macie > Permissions > Levels > Modifiers
AWS > Macie > Regions [Default]

Permission types:
AWS > Macie
Running prepack script: ./build.sh
Zipping mod
Uploading mod { dirName: '/Users/ankurpanja/turbot-delivery/turbot-v4/turbot-mods/packages/aws-macie',
  parentResource: '162167737252865',
  packedMod: '/Users/ankurpanja/turbot-delivery/turbot-v4/turbot-mods/packages/aws-macie/index.zip',
  endpointUrl: 'https://stacy-turbot.cloud.turbot-dev.com/api/v5/' }
Mod upload started.. { parentResource: '162167737252865' }

Build id 20190924083621254

Module successfully uploaded.
Mod resource page: https://stacy-turbot.cloud.turbot-dev.com/resource/171298187007908

Check control installed controls to ensure all Lambda based controls have been installed successfully.

Triggering mod install control ...
Check the status of your mod install here: https://stacy-turbot.cloud.turbot-dev.com/control/171298187084715
```

## Usage

**Usage: `turbot up [options] [dir]`**

The supported options are:

- `--dir or -d` : Path to the Turbot mod that you want to upload, and it
  defaults to `"."`.
- `--pre-build` : Pre-build shell script.
- `--peer-path` : Path to peer-dependencies.
- `--help` : Shows help.
- `--parent` : Set the resource aka of the mod upload location, The default is
  `tmod:@turbot/turbot#/`
- `--mode` : How to auto-increment version in package.json. The choices
  available are a subset of a valid semver string, major release should not be
  auto incremented using turbot up. Possible values are `prerelease`, `patch`
  and `minor`. The default value is `prerelease`.
- `--build-script` : Build script to use. The default value is `make`.
- `--pack` : pack the mod before uploading to the server. The default value is
  `true`.
- `--zip-file` :Bypass mod build process and just upload the given file. The
  argument must be a completely formed zipped mod.
- `--include-build-number` : Include the build number in the local packed file.
  The default value is `false`.
- `--profile` : The Turbot credentials profile to use.
- `--credentials-file` : Path to the shared credentials file. The default is
  `~/.config/turbot/credentials.yml`.
- `--access-key`: Turbot Guardrails access key for the workspace. If not specified, Turbot Guardrails
  credentials will be read from your Guardrails CLI
  [credentials file](reference/cli/installation#setup-your-turbot-credentials)
  or [environment variables](reference/cli/installation#environment-variables)
- `--secret-key`: Turbot Guardrails secret access key id. If not specified, Turbot Guardrails
  credentials will be read from your Guardrails CLI
  [credentials file](reference/cli/installation#setup-your-turbot-credentials)
  or [environment variables](reference/cli/installation#environment-variables)
- `--workspace`: Turbot Guardrails workspace, for example:
  `parker-turbot.cloud.turbot-dev.com`. If not specified, Turbot Guardrails credentials
  will be read from your Guardrails CLI
  [credentials file](reference/cli/installation#setup-your-turbot-credentials)
  or [environment variables](reference/cli/installation#environment-variables)
