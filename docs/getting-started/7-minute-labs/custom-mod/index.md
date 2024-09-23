---
title: "Custom Mods"
template: Documentation
nav:
  title: "Custom Mods"
---

# Dunder Mifflin Compliance and Control Framework deployment in 7 minutes

| Goal | Clone the DMI Compliance and Control Framework custom mods, install, run unit tests, then build and upload to your workspace. |
|------|-------------------------------------------------------------------------------------------------------------------------------|
| Time | 7 minutes                                                                                                                     |

## Prerequisites

- You will need Turbot Guardrails API access keys. If you do not have keys for your
  profile, you can [generate new ones](guides/iam/access-keys).
- You will need to know the URL of your Turbot Guardrails workspace(s).

## Install the Turbot Guardrails CLI

- Download the latest Turbot Guardrails CLI. The latest version is available
  from [Turbot Guardrails Releases](releases/cli).
- Unzip the turbot binary into a directory in your PATH (for example
  `/usr/local/bin/turbot`)
- Run `turbot --version` to verify your CLI version.

## Cloning DMI custom mods

[DMI custom mods source code](https://github.com/turbot/guardrails-cli/tree/master/example-mods/@dmi) lives inside the
[Turbot CLI Repository](https://github.com/turbot/cli). First, clone the
Guardrails Sample Repository mod project:

```bash
git clone https://github.com/turbot/cli.git

```

<div class ="alert alert-info" role="alert">Check out the <a href="https://github.com/turbot/cli/blob/master/example-mods/%40dmi" target="_blank">GNB README</a> file.</div>

## Installing dmi-ccf mod

Navigate into the `dmi-ccf` mod folder:

```bash
cd cli/example-mods/@dmi/dmi-ccf
```

Install the `dmi-ccf` mod:

```bash
turbot install
```

<div class ="alert alert-info" role="alert">The <a href="https://turbot.com/guardrails/docs/reference/cli/commands/install" target="_blank">turbot install command</a> installs a mod and all of its dependencies locally.</div>

## Inspecting dmi-ccf mod

To inspect and verify the structure of the mod use the
[turbot inspect command](reference/cli/commands/inspect)

```bash
turbot inspect
```

## Testing dmi-ccf mod

#### Running Unit tests

Running all tests:

```bash
turbot test
```

Running tests of a specific control:

```bash
turbot test --control [control name]
```

## Uploading dmi-ccf mod

> Hint: You don't need to upload dmi-ccf mod to a workspace in order to run the
> dmi-ccf-aws mod locally. So, you might skip to
> [dmi-ccf-aws mod installation](#Installing-dmi-ccf-aws-mod)

<div className="alert alert-primary" role="alert">Hint: You don't need to upload dmi-ccf mod to a workspace in order to run the dmi-ccf-aws mod locally. You can skip to <a href="#installing-dmi-ccf-aws-mod" target="_blank">dmi-ccf-aws mod installation.</a></div>

Before deploying the mod, you first need to install its dependencies on the
workspace.

First check mod dependencies at
[src/turbot.yml](https://github.com/turbot/cli/blob/master/example-mods/%40dmi/dmi-ccf/src/turbot.yml)
file, then follow [this guide](guides/managing-mods/install-mods) to install
them on the workspace.

After that, run the following command to upload the mod into the workspace
defined in the local
[Turbot Guardrails CLI configuration file](reference/cli/installation#named-profiles),
usually located at `[user home]/.turbot/config.yml`

```bash
turbot up --profile=[target workspace profile]
```

## Installing dmi-ccf-aws mod

After having the dmi-ccf mod installed, we may proceed with the dmi-ccf-aws mod.

The turbot-cli argument `--peer-path ../..` will be used here to map all the
custom mods under the
[@dmi](https://github.com/turbot/cli/tree/master/example-mods/%40dmi) folder.
This argument is needed because the dependence dmi-ccf is only available locally
inside the [@dmi](https://github.com/turbot/guardrails-cli/tree/master/example-mods/%40dmi) folder.

```bash
turbot install --peer-path ../..
```

> The turbot [install command](https://turbot.com/guardrails/docs/reference/cli/commands/install) installs a mod
> and all of its dependencies locally

## Inspecting dmi-ccf-aws mod

To inspect and verify the structure of the mod use the
[turbot inspect command](https://turbot.com/guardrails/docs/reference/cli/commands/inspect)

```bash
turbot inspect --peer-path ../..
```

## Testing dmi-ccf-aws mod

#### Running Unit tests

Running all tests:

```bash
turbot test --peer-path ../..
```

Running tests of a specific control:

```bash
turbot test --peer-path ../.. --control [control name]
```

## Uploading dmi-ccf-aws mod

Before deploying the mod, you first need to install its dependencies on the
workspace.

First check mod dependencies at
[src/turbot.yml](https://github.com/turbot/cli/blob/master/example-mods/%40dmi/dmi-ccf-aws/src/turbot.yml)
file, then follow [this guide](guides/managing-mods/install-mods) to install
them on the workspace.

After that, run the following command to upload the mod into the workspace
defined in the local
[Turbot CLI configuration file](https://turbot.com/guardrails/docs/reference/cli/installation#named-profiles),
usually located at `[user home]/.turbot/config.yml`

```bash
turbot up --peer-path ../.. --profile=[target workspace profile]
```

## About DMI Control Framework

At this point you should probably have the dmi-ccf and dmi-ccf-aws mods up and
running on your workspace, or at least installed locally. Now, let's learn more
about the DMI Control Framework

### Overview

[Dunder Mifflin Paper Company, Inc. (DMI)](https://en.wikipedia.org/wiki/Dunder_Mifflin)
is a fictional paper sales company featured in the American television series
The Office.

DMI defines its own compliance framework to ensure security and regulatory
compliance. This compliance framework provides a set of prescriptive controls
for network and data security, user authentication and authorization, and
monitoring.

While Turbot provides capabilities to meet most of DMI's control objectives, DMI
would like to be able to search, filter, and report on compliance to their
specific controls using the Turbot console. DMI employees are already aware of
the DMI framework, and they communicate using the terms and definitions defined
there.

To meet this requirement, DMI has decided to write a Turbot custom mod. This mod
will leverage existing Turbot resources and CMDB data but will present the data
in the native structure of the DMI Control Framework. Note that automated
remediation ("enforce") is out of scope - these controls will be "check" mode
only (existing Turbot controls can be used to remediate the items if desired,
however)

### The DMI Compliance and Control Framework

The Dunder Mifflin Compliance and Control Framework (DMI CCF) is composed of a
set of generalized controls, with separate implementations (benchmarks) that
provide specific technical implementations for each technology platform.

The DMI Control Framework is composed of the following control categories (The
sections are common to all platforms):

1. Authentication & Access Control
2. Data Security & Encryption
3. Network Security
4. Logging & Auditing
5. Data Protection & Business Continuity

The DMI AWS Benchmark provides implementation requirements specific to AWS. The
AWS Benchmark is divided into sections per AWS service.

1. IAM
2. S3
3. CloudTrail
4. RDS

Each section contains multiple numbered control items. Each of these control
items maps back to a control category in the control framework.

| Benchmark Item                                                   | Control Category                      |
|------------------------------------------------------------------|---------------------------------------|
| AWS.IAM.001 - Password policy meets complexity requirements      | Authentication & Access Control       |
| AWS.IAM.002 - Require MFA for console users                      | Authentication & Access Control       |
| AWS.S3.001 - Set Default Encryption on S3 Buckets                | Data Security & Encryption            |
| AWS.S3.002 - Enable Versioning on S3 Buckets                     | Data Protection & Business Continuity |
| AWS.VPC.001 - Disallow access to management ports from 0.0.0.0/0 | Network Security                      |
| AWS.CloudTrail.001 - Enable Cloudtrail in All Regions            | Logging & Auditing                    |
| AWS.RDS.001 - Enable RDS Backups with standard DB retention      | Data Protection & Business Continuity |

### Guidelines

Each control targets the most specific resource for its purpose: For example, a
control targeting user information will target users. A control targeting
security group rule details would target the security group.

All Custom Reporting Framework controls are based on information in the CMDB.
They must work when Turbot is limited to read only credentials for the provider.

### Control/Policy Type Hierarchy

The control and policy type hierarchies map each Turbot policy and control to a
DMI Control item.

The DMI benchmark item IDs follow a consistent structure:
`{provider}.{control section}.{id number}` - for example: `AWS.IAM.001`. The
Turbot type hierarchy mirrors DMI's benchmark structure:

- The top-level type is `Dunder Mifflin`
- The next level is the provider abbreviation
- The next level is the DMI Benchmark Section that the item belongs to:
    - **Dunder Mifflin > AWS > IAM**
    - **Dunder Mifflin > AWS > S3**
    - **Dunder Mifflin > AWS > VPC**
    - **Dunder Mifflin > AWS > CloudTrail**
    - **Dunder Mifflin > AWS > RDS**
- The next level is the individual control item. As in CIS, this contains the
  full control ID as well as the title. For example:
    - DMI Control Item: **AWS.IAM.001 - Password policy meets complexity
      requirements** haves policies and controls: **Dunder Mifflin > AWS > IAM >
      AWS.IAM.001 - Password policy meets complexity requirements**

---

See also
[About Dunder Mifflin Paper Company, Inc.](https://en.wikipedia.org/wiki/Dunder_Mifflin)
