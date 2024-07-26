---
title: Installation
template: Documentation
nav:
  order: 5
---

# Installing and Configuring the Turbot Guardrails CLI

## Prerequisites

- You will need Turbot Guardrails API access keys. If you do not have keys for your profile, you
  can [generate new ones](guides/iam/access-keys).
- You will need to know the URL of your Turbot Guardrails workspace(s).

## Install the Turbot Guardrails CLI

## Downloads
- Download the latest Turbot Guardrails CLI from [Turbot Guardrails CLI Releases](https://github.com/turbot/guardrails-cli/releases).
Download the CLI that matches your target platform.  Windows, MacOS and Linux are supported.

- Unzip the `turbot` binary into a directory in your PATH (Linux example: `/usr/local/bin/turbot`)
- Run `turbot --version` to verify your CLI version.

<div className="alert alert-info">If the ALB is using a self-signed certificate (Enterprise only), it is necessary to set the environment variable <b>NODE_TLS_REJECT_UNAUTHORIZED</b> to 0. It is possible to update the node certificate store with third party CA root certs using environment variable <a href="https://nodejs.org/api/cli.html#cli_node_extra_ca_certs_file">NODE_EXTRA_CA_CERTS.</a></div>

## Set up Your Turbot Guardrails Credentials

Turbot Guardrails follows a similar approach to the AWS CLI for authentication and
authorization. The format and structure of the Turbot Guardrails credentials file
resembles the credentials file structure used by the AWS CLI.

To configure the Turbot Guardrails CLI tool to connect to your workspace, run the
`turbot configure` command. When prompted, enter your **Workspace URL**,
**Turbot Guardrails API Access Key**, and **Turbot Guardrails API Secret Key**:

```bash
$ turbot configure
✔ Profile name [default] … default
✔ Workspace URL … https://turbot-customer.cloud.turbot.com
✔ Turbot Access Key … ************************************
✔ Turbot Secret Key … ************************************
Written profile 'default' to '/Users/TestUser/.config/turbot/credentials.yml'
```

This command will generate a default profile and add it to your Turbot Guardrails
credentials file. The default profile is used when you run the `turbot` command
without explicitly specifying a `--profile` .

The default location for the credentials file is referenced by the Turbot Guardrails CLI, the Turbot Guardrails Terraform
provider and the Python scripts in the [Guardrails Samples Repo](https://github.com/turbot/guardrails-samples/tree/main/api_examples/python).

### Named Profiles

The Turbot Guardrails CLI supports the use of multiple named profiles that are stored in
the credentials file. Having multiple named profiles helps you switch between
workspaces at ease. Make the profile names meaningful and easy to remember.

```bash
$ turbot configure
✔ Profile name [default] … production
✔ Workspace URL … https://prod-customer.cloud.turbot.com
✔ Turbot Access Key … ************************************
✔ Turbot Secret Key … ************************************
Written profile 'default' to '/Users/TestUser/.config/turbot/credentials.yml'
```

The above example creates a profile named `production`. To run `turbot` commands in this context, add
the `--profile production` argument to `turbot`.

<div className="example">
Find controls in error or alarm state in the <code>prod-customer.cloud.turbot.com</code> workspace using the command:  <code>turbot --profile production graphql controls --filter "state:alarm,error"</code>
</div>

### A Sample Credentials File

The `turbot configure` command generates a text file that contains your access
keys. By default, this file will be named `credentials.yml` and will be located
in the `.config/turbot/` folder in your home directory. Note that the
`turbot configure` output will tell you the location where the credentials file
is written.

The format of the Turbot Guardrails credentials file should look something like the
following.

```ruby
default:
  accessKey: 14ab*****-****-****-****-**********998c
  secretKey: t54d*****-****-****-****-**********876e
  workspace: 'https://turbot-customer.cloud.turbot.com'
production:
  accessKey: ab41*****-****-****-****-**********978c
  secretKey: t74e*****-****-****-****-**********846f
  workspace: 'https://prod-customer.cloud.turbot.com'
```

The above example shows a credentials file with two profiles. The first is used when you run a CLI command with no
profile. The second is used when you run a CLI command with the `--profile production` parameter.

## Environment Variables

Environment variables provide another way to specify default Turbot CLI
credentials:

```
export TURBOT_SECRET_KEY=xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
export TURBOT_ACCESS_KEY=xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
export TURBOT_WORKSPACE=https://prod-customer.cloud.turbot.com
```

If environment variables are set, they will be used when no `--profile` is
specified.

You can also change the default profile to a named profile with the
`TURBOT_PROFILE` environment variable:

```
export TURBOT_PROFILE=production
```

CLI commands that do not specify a `--profile` will now default to the `production` profile

## Precedence

The Turbot CLI searches for credentials in the following order:

1. `workspace`,`accessKey`,`secretKey` passed on the command line. Please note
   that all three of these must be given together.
1. `profile` passed on the command line.
1. `TURBOT_WORKSPACE`, `TURBOT_ACCESS_KEY` and `TURBOT_SECRET_KEY` in the
   environment.
1. `TURBOT_PROFILE` in the environment.
1. `workspace`,`accessKey`,`secretKey` in `config.yml`.
1. `profile` in `config.yml` .
1. `default` profile.
