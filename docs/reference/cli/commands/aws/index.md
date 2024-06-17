---
title: aws
template: Documentation
nav:
  order: 10
---

# Command: aws

Manage credentials for AWS profiles.

## Usage

**Usage: `turbot aws <subcommand> [options]`**

### Supported Sub-commands

| Command                  | Description                                                                   |
|--------------------------|-------------------------------------------------------------------------------
| `turbot aws credentials` | Generate temporary AWS credentials and save them in the AWS credentials file. 

#### `turbot aws credentials`

Generate temporary AWS credentials and save them in the AWS credentials file.

The supported options are:
- `--dir or -d` :   Path to the Turbot Guardrails mod.
- `--pre-build` : Pre-build shell script.
- `--peer-path` : Path to peer-dependencies.
- `--help` : Shows help.
- `--account` :  The AWS account to request credentials for. (required)
- `--level` :  The Turbot permission level of the requested
  credentials. (choices: "user", "operator", "readonly", "superuser", "admin", "metadata", "owner", "role")
- `--aws-profile` : The name of the AWS profile to associate with the credentials.
- `--role` : The custom role name that will be assumed to generate credentials. Should be used together with "--level role".
- `--user`  :   The user for which the credentials are to be generated.
- `--access-key` :  Turbot Guardrails access key.
- `--secret-key` : Turbot Guardrails secret key.
- `--credentials-file`: Path to the Turbot Guardrails credentials file.
- `--workspace` : Turbot Guardrails workspace, for example: production.turbot.customer.com.
- `--profile` : Turbot Guardrails credentials profile. (default: "default")
