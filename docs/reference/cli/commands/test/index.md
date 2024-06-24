---
title: test
template: Documentation
nav:
  order: 10
---

# Command: test

The `turbot test` command runs tests for the mods. For example, you want to run a `test` on the `aws-chime` mod. Navigate to `/turbot-v5/turbot-mods/packages/aws-chime`, and run:

```shell
turbot test
```

The Turbot Guardrails CLI will execute the complete test suite for `aws-chime` mod and output the following result:

```
mod
    ✓ is parseable
    Compile mod
      ✓ Mod was successfully compiled
    Resource
      Types
        Chime [chime]
          Metadata map
            ✓ Valid - Base test
        Account [chimeAccount]
          ✓ Valid - All properties (95ms)
          ✓ Invalid - Wrong Account type (94ms)
          ✓ Invalid - Missing turbot data (78ms)
          Metadata map
            ✓ Valid - Base test
    Definitions
      chimeAka
        ✓ base (77ms)
        ✓ invalid aka (77ms)
      chimeAccount
        ✓ Valid - All properties (85ms)
        ✓ Invalid - Wrong Account type (75ms)
        ✓ Invalid - Missing turbot data (72ms)
      accId
        ✓ 8deafd50-6a37-404f-a96a-49acc1eb590b (71ms)
        ✓ invalid - cannot start at (86ms)
      name
        ✓ Valid - Base case (73ms)
        ✓ Invalid - Can not start with special characters (105ms)
      accountType
        ✓ Team (71ms)
        ✓ invalid - not listed in options (70ms)
        ✓ invalid - null value (76ms)
      accountAka
        ✓ Valid - Base case (72ms)
        ✓ Invalid - Region not needed (62ms)
        ✓ Invalid - Incorrect Account name (69ms)


  22 passing (1s)
```

## Usage

**Usage: `turbot test [options]`**

The `turbot test` command runs tests for the mods.

The `--dir` argument specifies the directory of the root module to use. If a path is not specified, the current working directory is used.

The supported options are:

- `--dir or -d` : Path to the Turbot mod that you want to run the `turbot test` in.
- `--pre-build` : Pre-build shell script.
- `--peer-path` : Path to peer-dependencies.
- `--quiet` : Set output verbosity level to quiet (only show failed tests).
- `--watch or -w` : Watch the mod directory recursively and automatically re-run the command when a change is detected.
- `--help` : Shows help.
- `--verbose` : Set output verbosity level to verbose (show log output for all tests).
- `--definitions` : Runs resource and definitions tests only. Does not run control or action tests.
- `--control` : Select the control to run tests for. For example, `turbot test --control chimeAccountCmdb` runs the `CMDB` control for `AWS > Chime > Account`.
- `--action` : Select the action to run tests for. For example, `turbot test --action chimeAccountDelete` runs the `Delete` action for `AWS > Chime > Account`.
- `--policy` : Select the policy to run tests for. For example, `turbot test --policy chimeAccountApproved` runs the `Approved` policy for `AWS > Chime > Account`.
- `--report` : Select the report to run tests for.
- `--test` : Select the control test to run. For example, `turbot test --test "Pagination" --control chimeAccountDiscovery` runs the pagination test for `AWS > Chime > Account`.  The `--test` parameter defaults to a case insensitive match, and also supports specific regular expressions by surrounding the string with `/.../`.
- `--control-log-level` : Set verbosity of inline controls logging output. Supported values are `error`, `warning`, `notice`, `info`, `debug`, and `off`.
- `--test-data` : Runs the test data validation only.
- `--skip-query-validation` : Skip the input graphQL query validation.
- `--skip-test-data-validation` : Skip test data validation.
- `--aws-profile` : Set the profile name to use when fetching aws credentials for the test run. The credentials are read from '~/.aws/credentials'

 

