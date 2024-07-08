---
title: Turbot Guardrails CLI in 7 minutes
template: Documentation
nav:
  title: CLI
---

# Turbot Guardrails CLI in 7 minutes

| Goal | Install the CLI, query Turbot Guardrails, then build and publish your first mod. |
| ---- |----------------------------------------------------------------------------------|
| Time | 7 minutes                                                                        |

## Overview

The [Turbot Guardrails Command Line Interface (CLI)](reference/cli) ) is a unified tool to
manage your Turbot Guardrails resources.

In this exercise, you will use the `turbot` command to query the Turbot Guardrails API, and
then build and publish your first mod.

By the end of this lab, you will be able to run basic `turbot` CLI commands.

## Prerequisites

- You will need to know the URL of your Turbot Guardrails workspace(s).
- You will need your Guardrails API access keys for each workspace.  If you do not have keys for your profile, you can [generate new ones](guides/iam/access-keys).

## Install the Turbot Guardrails  CLI

- Download the latest Turbot Guardrails CLI. The latest version is available from [Turbot Guardrails CLI releases](https://github.com/turbot/guardrails-cli/releases).
- Unzip the `turbot` binary into a directory in your PATH (for example `/usr/local/bin/turbot`)
- Run `turbot --version` to verify your CLI version.

```shell
$ turbot --version
1.29.0
```

## Set up Your Turbot Credentials

To configure the Turbot Guardrails CLI tool to connect to your workspace, run the
`turbot configure` command. When prompted, enter a profile name, then your
**Workspace URL**, **Turbot Guardrails API Access Key**, and **Turbot Guardrails API Secret Key**:

```bash
$ turbot configure
✔ Profile name [default] … default
✔ Workspace URL … https://turbot-customer.cloud.turbot.com
✔ Turbot Access Key … ************************************
✔ Turbot Secret Key … ************************************
Written profile 'default' to '/Users/TestUser/.config/turbot/credentials.yml'
```

This command will generate a `default` profile and add it to your Turbot Guardrails
credentials file. The Turbot Guardrails Terraform provider and
[scripts in the Guardrails Samples Repo](https://github.com/turbot/guardrails-tools/tree/master/api_examples/graphql/clients)
can use the Turbot Guardrails CLI credentials file.

### Login

Note: This step is only necessary if you are publishing to the central Turbot Guardrails
mod repository.

Login to the Turbot Guardrails mod registry using the `turbot login` command.

```
✔ Enter your turbot-dev.com username: … ***********
✔ Enter your turbot-dev.com password: … ***********
Logged in to turbot mod registry
```

## Query Turbot with 'turbot graphql'

You can use the `turbot graphql` command to execute graphql queries against a
Turbot Guardrails workspace.

1. Run the following command. This executes a query against your workspace that
   returns the most recent controls in alarm or error state.

```bash
$ turbot graphql controls --filter "state:alarm,error sort:-timestamp"
```

```yaml
controls:
  items:
    controls:
  items:
    - type:
        uri: 'tmod:@turbot/turbot#/control/types/controlInstalled'
      state: error
      turbot:
        id: '178116018631614'
    - type:
        uri: 'tmod:@turbot/aws-lex#/control/types/botDiscovery'
      state: error
      turbot:
        id: '178116018444199'
    - type:
        uri: 'tmod:@turbot/aws-lex#/control/types/botDiscovery'
      state: error
      turbot:
        id: '178116018441126'
```

2. Run the same command, adding an `--output` parameter to change the format the
   output:

```bash
turbot graphql controls --filter "state:alarm,error sort:-timestamp" --output '{items { turbot{timestamp} type{title} resource{trunk{title} }}}'
```

```yaml
  - turbot:
        timestamp: '2019-12-10T10:03:44.387Z'
      type:
        title: Control Installed
      resource:
        trunk:
          title: Turbot > @turbot/aws-lex > Usage
    - turbot:
        timestamp: '2019-12-10T10:03:44.164Z'
      type:
        title: Discovery
      resource:
        trunk:
          title: Turbot > vandelay_industries > 876515858155 > us-east-1
    - turbot:
        timestamp: '2019-12-10T10:03:44.164Z'
      type:
        title: Discovery
      resource:
        trunk:
          title: Turbot > vandelay_industries > 876515858155 > us-west-1
```

3. You can run the same query by constructing the entire graphql statement and
   using `--query`.

   - Create a file named `my-query.txt` and add the following GraphQL statement:

   ```graphql
   {
     controls(filter: "state:alarm,error sort:-timestamp") {
       items {
         turbot {
           timestamp
         }
         type {
           title
         }
         resource {
           trunk {
             title
           }
         }
       }
     }
   }
   ```

   - Run the `turbot graphql` command, and pass the file name to the `--query`
     argument:

   ```bash
   turbot graphql --query my-query.txt
   ```

   ```yaml
   controls:
     items:
       - turbot:
           timestamp: "2019-12-10T10:03:44.387Z"
         type:
           title: Control Installed
         resource:
           trunk:
             title: Turbot > @turbot/aws-lex > Usage
       - turbot:
           timestamp: "2019-12-10T10:03:44.164Z"
         type:
           title: Discovery
         resource:
           trunk:
             title: Turbot > vandelay_industries > 876515858155 > us-east-1
       - turbot:
           timestamp: "2019-12-10T10:03:44.164Z"
         type:
           title: Discovery
         resource:
           trunk:
             title: Turbot > vandelay_industries > 876515858155 > us-west-1
   ```

## Build and Publish a Mod

We have included example mods in the `example-mods` folder of the
[Turbot CLI repo](https://github.com/turbot/cli) to get you comfortable with the
Turbot CLI.

Clone the repo:

```bash
git clone git@github.com:turbot/cli.git
cd cli/example-mods/ssl-check/

```

### Install

Use `turbot install` to install your mod dependencies and headers.

```bash
$ turbot install
Installing dependencies for tmod:@turbot/ssl-check
{
  "@turbot/turbot": ">=5.0.0-alpha.1"
}
Registry: turbot.com
Refreshed the mod registry token
Acquired header URLs

* Installing @turbot/turbot version 5.0.0

Installed 1 header to /Users/your_user_folder/archive/trash/cli/example-mods/ssl-check/turbot_mods
```

### Inspect

Inspect and verify the structure of your mod using the `turbot inspect` command.
Make sure you are in the correct mod directory.

```bash
$ turbot inspect

Policy types:
Turbot > SSL Check
Turbot > SSL Check > SSL Input
Turbot > SSL Check Expiration
Turbot > SSL Expiration Warning Period

Control types:
Turbot > SSL Check
Turbot > SSL Check Expiration

```

### Test

Run unit tests with `turbot test`

1. Run `build.sh` to install all the npm dependencies for the mod.

```bash
$ ./build.sh
~/archive/trash/cli/example-mods/ssl-check/functions/checkSSLExpiration ~/archive/trash/cli/example-mods/ssl-check
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN sslCheckExpiration@1.0.0 No repository field.
npm WARN sslCheckExpiration@1.0.0 No license field.

added 205 packages from 237 contributors and audited 522 packages in 9.025s
found 14 high severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details
  adding: index.js (deflated 66%)
  adding: package.json (deflated 35%)
  adding: node_modules/ (stored 0%)
  adding: node_modules/fs-constants/ (stored 0%)
  adding: node_modules/fs-constants/LICENSE (deflated 41%)
  adding: node_modules/fs-constants/index.js (deflated 23%)
  adding: node_modules/fs-constants/README.md (deflated 48%)
  adding: node_modules/fs-constants/package.json (deflated 55%)
  adding: node_modules/fs-constants/browser.js (stored 0%)
  adding: node_modules/asn1/ (stored 0%)
  adding: node_modules/asn1/LICENSE (deflated 41%)
  adding: node_modules/asn1/README.md (deflated 48%)
  adding: node_modules/asn1/package.json (deflated 53%)
  ...
```

2. Run `turbot vcr start` to run the docker container that the tests will run
   against.

```bash
$ turbot vcr start
docker run --name turbot-vcr -p 1080:1080 -d --rm jamesdbloom/mockserver
ae60438d68b8cfe563b08f15308cc1c5e63ce8a7b684c46e927a5687ef44adea
```

3. Run the `turbot test` command to ensure all the test cases are passing
   locally.

```bash
$ turbot test

Policy types:
Turbot > SSL Check
Turbot > SSL Check > SSL Input
Turbot > SSL Check Expiration
Turbot > SSL Expiration Warning Period

Control types:
Turbot > SSL Check
Turbot > SSL Check Expiration

Control log level: warning


  mod
    ✓ is parseable
    Compile mod
      ✓ Mod was successfully compiled
    Policy
      Types
        SSL Check [sslCheck]
          single default
            ✓ default and default template template
            - default or default template template
            ✓ default valid
          example
            ✓ #0 is valid
        SSL Input [sslInput]
          single default
            ✓ default and default template template
            - default or default template template
            ✓ default valid
          example
            ✓ #0 is valid
        SSL Check Expiration [sslCheckExpiration]
          single default
            ✓ default and default template template
            - default or default template template
            ✓ default valid
          example
            ✓ #0 is valid
        SSL Expiration Warning Period [sslExpirationWarningPeriod]
          single default
            ✓ default and default template template
            - default or default template template
    Control
      Types
        SSL Check [sslCheck]
          ✓ input queries use valid graphql
          ✓ input queries have valid policy references
          ✓ Test data validation was executed
          Skip if cmdb policy set to skip
            Setup
              ✓ Test data valid
            Inline
              ✓ run
            Function
              ✓ run (6146ms)
            Output
              ✓ Validate test expectation
              ✓ Assert expected output
        SSL Check Expiration [sslCheckExpiration]
          ✓ input queries use valid graphql
          ✓ input queries have valid policy references
          ✓ Test data validation was executed
          Skip if cmdb policy set to skip
            Setup
              ✓ Test data valid
            Inline
              ✓ run
            Function
              - run
            Output
              ✓ Validate test expectation
              ✓ Assert expected output
          OK with zero warning period
            Setup
              ✓ Test data valid
            Inline
              ✓ run
            Function
              ✓ run (7205ms)
            Output
              ✓ Validate test expectation
              ✓ Assert expected output
          Alarm with large warning period
            Setup
              ✓ Test data valid
            Inline
              ✓ run
            Function
              ✓ run (7325ms)
            Output
              ✓ Validate test expectation
              ✓ Assert expected output
          Error with invalid url
            Setup
              ✓ Test data valid
            Inline
              ✓ run
            Function
              ✓ run (6503ms)
            Output
              ✓ Validate test expectation
              ✓ Assert expected output


  42 passing (29s)
  5 pending
```

### Upload

- Upload and install your mod to your turbot workspace using the `turbot up`
  command.

```bash
$ turbot up

Policy types:
Turbot > SSL Check
Turbot > SSL Check > SSL Input
Turbot > SSL Check Expiration
Turbot > SSL Expiration Warning Period

Control types:
Turbot > SSL Check
Turbot > SSL Check Expiration

Running prepack script: ./build.sh
~/archive/trash/cli/example-mods/ssl-check/functions/checkSSLExpiration ~/archive/trash/cli/example-mods/ssl-check

...

~/archive/trash/cli/example-mods/ssl-check

Zipping mod
Uploading mod {
  dirName: '/Users/jsmyth/archive/trash/cli/example-mods/ssl-check',
  parent: 'tmod:@turbot/turbot#/',
  packedMod: '/Users/jsmyth/archive/trash/cli/example-mods/ssl-check/index.zip',
  workspace: 'https://morales-turbot.cloud.turbot-dev.com/api/latest/graphql'
}
Mod upload started.. { parent: 'tmod:@turbot/turbot#/' }

Build id 20191218230735220

Module successfully uploaded.
Mod resource page: https://morales-turbot.cloud.turbot-dev.com/resource/178871981691555

Check control installed controls to ensure all Lambda based controls have been installed successfully.

Triggering mod install control ...
Check the status of your mod install here: https://morales-turbot.cloud.turbot-dev.com/control/178871982425772
```

- The `turbot up` command provides a link to view the status of the mod install.
  you can visit that link in the Turbot Console to verify that you mod installs
  correctly. Alternately, you can query the control from the cli using the
  control id from the link:

```bash
$ turbot graphql control --id "178871982425772"
control:
  type:
    uri: 'tmod:@turbot/turbot#/control/types/modInstalled'
  state: ok
  turbot:
    id: '178871982425772'
```

## Further Reading

- <a href="reference/cli/commands/inspect" target="_blank">turbot inspect</a>
- <a href="reference/cli/commands/install" target="_blank">turbot install</a>
- <a href="reference/cli/commands/login" target="_blank">turbot login</a>
- <a href="reference/cli/commands/test" target="_blank">turbot test</a>
- <a href="reference/cli/commands/up" target="_blank">turbot up</a>
